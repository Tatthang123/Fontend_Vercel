import React, { useState, useEffect, useCallback } from 'react'
import { transform } from '@babel/standalone'
import * as ReactRouterDOM from 'react-router-dom'
import * as Recharts from 'recharts'
import * as LucideReact from 'lucide-react'

const DynamicReactRenderer = ({ code }) => {
  const [Component, setComponent] = useState(null)
  const [error, setError] = useState(null)

  const renderComponent = useCallback(async () => {
    try {
      // Remove import statements and 'export default'
      // const cleanedCode = code
      //   .replace(/import\s+.*?from\s+.*?;?/g, '')
      //   .replace(/export\s+default\s+/, '')
      //   .replace(/['"]use strict['"];?\s*/, '')
      //   .replace(
      //     /Object\.defineProperty\(exports,\s*["']__esModule["'],.*?\);/,
      //     ''
      //   )
      //   .replace(/exports\.default\s*=\s*/, '')
      //   .replace(/module\.exports\s*=\s*/, '')
      //   .trim()

      // console.log('cleanedCode', cleanedCode)

      const cleanedCode = `

const ShoesStore = () => {
  const [shoes, setShoes] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Giả lập fetch dữ liệu giày
    setShoes([
      { id: 1, name: 'Giày thể thao Nike', price: 1200000, image: 'https://example.com/nike.jpg' },
      { id: 2, name: 'Giày chạy bộ Adidas', price: 1500000, image: 'https://example.com/adidas.jpg' },
      { id: 3, name: 'Giày da công sở', price: 800000, image: 'https://example.com/leather.jpg' },
    ]);
  }, []);

  const addToCart = (shoe) => {
    setCart([...cart, shoe]);
  };

  return (
    <div className="container mx-auto px-4">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold">Cửa hàng giày online</h1>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shoes.map((shoe) => (
          <div key={shoe.id} className="bg-white rounded-lg shadow-md p-6">
            <img src={shoe.image} alt={shoe.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-xl font-semibold mb-2">{shoe.name}</h2>
            <p className="text-gray-600 mb-4">{shoe.price.toLocaleString('vi-VN')} đ</p>
            <button
              onClick={() => addToCart(shoe)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        ))}
      </main>
      <footer className="mt-12 text-center text-gray-600">
        <p>© 2023 Cửa hàng giày online. Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  );
};

`
      // Transform the code
      const output = transform(
        `
        (function(React, useState, useEffect, ReactRouterDOM, Recharts, LucideReact) {
          let Component;
          ${cleanedCode}
          return Component;
        })
        `,
        {
          presets: ['react'],
          filename: 'dynamic.js'
        }
      )

      console.log('output.code', output.code)

      // Create a function that returns the component
      const createComponent = new Function(
        'React',
        'useState',
        'useEffect',
        'ReactRouterDOM',
        'Recharts',
        'LucideReact',
        `return ${output.code}`
      )

      // Execute the function to get the component
      const DynamicComponent = createComponent(
        React,
        React.useState,
        React.useEffect,
        ReactRouterDOM,
        Recharts,
        LucideReact
      )

      if (typeof DynamicComponent !== 'function') {
        throw new Error('Component is not a valid React component')
      }

      setComponent(() => DynamicComponent)
      setError(null)
    } catch (err) {
      console.error('Error rendering component:', err)
      setError(err.message)
      setComponent(null)
    }
  }, [code])

  useEffect(() => {
    renderComponent()
  }, [renderComponent])

  if (error) {
    return (
      <div className='border p-4 rounded-lg shadow-lg bg-red-100 text-red-700'>
        <h2 className='text-xl font-bold mb-2'>Error Rendering Component</h2>
        <p>{error}</p>
      </div>
    )
  }

  if (!Component) {
    return (
      <div className='border p-4 rounded-lg shadow-lg'>
        <h2 className='text-xl font-bold mb-2'>Loading...</h2>
      </div>
    )
  }

  return (
    <div className='border p-4 rounded-lg shadow-lg'>
      <h2 className='text-xl font-bold mb-4'>Demo UI</h2>
      <React.Suspense fallback={<div>Loading component...</div>}>
        <Component />
      </React.Suspense>
    </div>
  )
}

export default DynamicReactRenderer

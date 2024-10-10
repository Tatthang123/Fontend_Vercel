import React, { useEffect, useState } from 'react'
import * as ReactHooks from 'react'
import * as ReactIcons from 'react-icons/fa'
import * as ReactChart from 'recharts'
import ReactDOMServer from 'react-dom/server'

import CodePreviewTabs from '../components/CodeReviewTab'
import { transform } from '@babel/standalone'
import { MdLocalMovies } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import Footer from '../components/Footer'
const iframeContent = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cửa hàng hoa tươi</title>
    <style>
        /* CSS variables for consistent color scheme */
        :root {
            --primary-color: #ff69b4;
            --secondary-color: #98fb98;
            --text-color: #333;
            --background-color: #fff;
        }

        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background-color: var(--background-color);
        }

        /* Header styles */
        header {
            background-color: var(--primary-color);
            color: white;
            text-align: center;
            padding: 1rem;
        }

        h1 {
            font-size: 2rem;
        }

        /* Navigation styles */
        nav {
            background-color: var(--secondary-color);
            padding: 0.5rem;
        }

        nav ul {
            list-style-type: none;
            display: flex;
            justify-content: center;
        }

        nav ul li {
            margin: 0 1rem;
        }

        nav ul li a {
            color: var(--text-color);
            text-decoration: none;
            font-weight: bold;
        }

        /* Main content styles */
        main {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }

        .product-card {
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 1rem;
            text-align: center;
            transition: transform 0.3s ease;
        }

        .product-card:hover {
            transform: translateY(-5px);
        }

        .product-card img {
            max-width: 100%;
            height: auto;
            margin-bottom: 1rem;
        }

        .product-card h3 {
            margin-bottom: 0.5rem;
        }

        .product-card p {
            margin-bottom: 1rem;
        }

        .btn {
            background-color: var(--primary-color);
            color: white;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .btn:hover {
            background-color: #ff1493;
        }

        /* Footer styles */
        footer {
            background-color: var(--primary-color);
            color: white;
            text-align: center;
            padding: 1rem;
            margin-top: 2rem;
        }

        /* Media queries for responsiveness */
        @media (max-width: 768px) {
            nav ul {
                flex-direction: column;
                align-items: center;
            }

            nav ul li {
                margin: 0.5rem 0;
            }

            .product-grid {
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>Cửa hàng hoa tươi</h1>
    </header>

    <nav>
        <ul>
            <li><a href="#home">Trang chủ</a></li>
            <li><a href="#products">Sản phẩm</a></li>
            <li><a href="#about">Giới thiệu</a></li>
            <li><a href="#contact">Liên hệ</a></li>
        </ul>
    </nav>

    <main>
        <section id="products">
            <h2>Sản phẩm hoa tươi</h2>
            <div class="product-grid">
                <!-- Product cards will be dynamically added here -->
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2023 Cửa hàng hoa tươi. All rights reserved.</p>
    </footer>

    <script>
        // Sample product data
        const products = [
            { name: 'Hoa hồng', price: 150000, image: 'https://example.com/rose.jpg' },
            { name: 'Hoa cúc', price: 100000, image: 'https://example.com/daisy.jpg' },
            { name: 'Hoa lan', price: 200000, image: 'https://example.com/orchid.jpg' },
            { name: 'Hoa tulip', price: 180000, image: 'https://example.com/tulip.jpg' },
        ];

        // Function to create product cards
        function createProductCard(product) {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = \`\
                <img src="\${product.image}" alt="\${product.name}">
                <h3>\${product.name}</h3>
                <p>\${product.price.toLocaleString('vi-VN')} VND</p>
                <button class="btn add-to-cart">Thêm vào giỏ hàng</button>
            \`;
            return card;
        }

        // Function to display products
        function displayProducts() {
            const productGrid = document.querySelector('.product-grid');
            products.forEach(product => {
                const card = createProductCard(product);
                productGrid.appendChild(card);
            });
        }

        // Event listener for add to cart buttons
        document.addEventListener('click', function(e) {
            if (e.target && e.target.classList.contains('add-to-cart')) {
                const productName = e.target.parentElement.querySelector('h3').textContent;
                alert(\`Đã thêm \${productName} vào giỏ hàng!\`);
            }
        });

        // Initialize the page
        displayProducts();
    </script>
</body>
</html>
`

const DemoUIPage = () => {
  const stateComponent = useSelector(state => state.anthropic)

  const { response, loading } = stateComponent
  console.log('response', response)
  // const dataMatch = response?.match(/```jsx([\s\S]*?)```/) ?? ''
  // const regex = /<code>([\s\S]*?)<\/code>/

  // const dataMatch = response?.match(regex) ?? ''

  function extractAndPrepareCodeContent (responseText) {
    const regex = /```html([\s\S]*?)```/
    const match = responseText?.match(regex)
    if (match) {
      const extractedCode = match[1]
      return escapeSpecialChars(extractedCode)
    }
    return ''
  }

  function escapeSpecialChars (codeContent) {
    return codeContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')
  }

  const hmtlCode = extractAndPrepareCodeContent(response)
  console.log('hmtlCode', hmtlCode)

  // const reactCode = dataMatch[1]

  // if (!reactCode) {
  //   toast.error('Không tìm thấy khối mã JSX hợp lệ trong phản hồi')
  // }
  const reactCode = `
import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Đăng nhập</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-gray-400 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
              <span className="ml-2 text-sm text-gray-600">Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">Quên mật khẩu?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Đăng nhập
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <a href="#" className="text-blue-600 hover:underline">Đăng ký ngay</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
`

  function renderComponentToHTML (Component, props) {
    return ReactDOMServer.renderToString(<Component {...props} />)
  }

  function createFullHTML (componentHTML) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rendered Component</title>
        <script src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
        <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/recharts/2.1.9/Recharts.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-icons/4.3.1/index.min.js"></script>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body>
        <div id="root">${componentHTML}</div>
      </body>
      </html>
    `
  }

  const customModules = {
    ...ReactHooks,
    ...ReactIcons,
    ...ReactChart,

    MdLocalMovies
    // You can add any additional dependencies or components here if needed
  }

  return (
    <>
      <div className='p-4'>
        <h1 className='text-3xl font-bold mb-6'>Code Preview Demo</h1>
        {/* <CodePreviewTabs code={code} customModules={customModules} /> */}

        {hmtlCode ? (
          <CodePreviewTabs code={hmtlCode} customModules={customModules} />
        ) : (
          // <iframe
          //   title='Register Form'
          //   srcDoc={hmtlCode}
          //   style={{ width: '100%', height: '100vh', border: 'none' }}
          //   sandbox='allow-scripts allow-same-origin'
          // />
          // <p>No React code available. Please generate a new demo.</p>
          <div className='border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600' />
          // <iframe
          //   title='Register Form'
          //   srcDoc={hmtlCode}
          //   style={{ width: '100%', height: '100vh', border: 'none' }}
          //   sandbox='allow-scripts allow-same-origin'
          // />
        )}
      </div>
    </>
  )
}

export default DemoUIPage

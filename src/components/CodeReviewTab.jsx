import React, { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { LiveProvider, LivePreview, LiveError } from 'react-live'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { FaCopy } from 'react-icons/fa'
import ReactDOMServer from 'react-dom/server'

const iframeContent = `
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Đăng ký tài khoản</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Font Awesome CDN for icons -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    integrity="sha512-papYzQf+SXz6IbE7DvOeI0Vb8c49+IMCzE7NpM3zJ6LV/mEKawqY5y7YVzJdXBB5K3Q56LkNg1LuKJf2A5YQag=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <style>
    /* Additional custom styles if necessary */
  </style>
</head>
<body class="bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center min-h-screen">
  <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Đăng ký tài khoản
      </h2>
    </div>
    <form class="mt-8 space-y-6" id="registerForm">
      <div class="rounded-md shadow-sm -space-y-px">
        <!-- Tên đăng nhập -->
        <div class="mb-4">
          <label for="username" class="sr-only">Tên đăng nhập</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fa fa-user text-gray-400"></i>
            </div>
            <input
              id="username"
              name="username"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Tên đăng nhập"
            />
          </div>
        </div>
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="sr-only">Email</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fa fa-envelope text-gray-400"></i>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Địa chỉ email"
            />
          </div>
        </div>
        <!-- Mật khẩu -->
        <div class="mb-4">
          <label for="password" class="sr-only">Mật khẩu</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fa fa-lock text-gray-400"></i>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Mật khẩu"
            />
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <i
                id="togglePassword"
                class="fa fa-eye text-gray-400 cursor-pointer"
              ></i>
            </div>
          </div>
        </div>
        <!-- Xác nhận mật khẩu -->
        <div>
          <label for="confirmPassword" class="sr-only">Xác nhận mật khẩu</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fa fa-lock text-gray-400"></i>
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Xác nhận mật khẩu"
            />
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Đăng ký
        </button>
      </div>
    </form>
    <div class="text-center">
      <p class="mt-2 text-sm text-gray-600">
        Đã có tài khoản?{' '}
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
          Đăng nhập ngay
        </a>
      </p>
    </div>
  </div>

  <script>
    // JavaScript để xử lý hiển thị/ẩn mật khẩu
    document.addEventListener('DOMContentLoaded', function () {
      const togglePassword = document.getElementById('togglePassword');
      const password = document.getElementById('password');

      togglePassword.addEventListener('click', function () {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
      });

      // Xử lý gửi form
      const registerForm = document.getElementById('registerForm');
      registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // Thực hiện xử lý gửi dữ liệu ở đây
        alert('Đăng ký thành công!');
      });
    });
  </script>
</body>
</html>
`

const SmartCodePreview = ({ code: initialCode, customModules = {} }) => {
  const [copied, setCopied] = useState(false)
  const [code, setCode] = useState(initialCode)
  const [scope, setScope] = useState({})

  console.log('code ne', code)
  useEffect(() => {
    const processCode = async inputCode => {
      const importRegex =
        /import\s+(?:{([^}]+)}\s+from\s+)?['"]([@\w\/-]+)['"]/g
      const imports = new Set()
      let match

      while ((match = importRegex.exec(inputCode)) !== null) {
        const [, namedImports, packageName] = match
        imports.add(packageName)

        if (namedImports) {
          const names = namedImports.split(',').map(name => name.trim())
          names.forEach(name => {
            const aliasMatch = name.match(/(\w+)\s+as\s+(\w+)/)
            if (aliasMatch) {
              imports.add(`${packageName}:${aliasMatch[1]}:${aliasMatch[2]}`)
            } else {
              imports.add(`${packageName}:${name}`)
            }
          })
        }
      }

      const newScope = { React, ...customModules }

      for (const importItem of imports) {
        const [packageName, exportName, alias] = importItem.split(':')

        if (customModules[packageName]) {
          if (exportName) {
            newScope[alias || exportName] =
              customModules[packageName][exportName]
          } else {
            Object.assign(newScope, customModules[packageName])
          }
        } else {
          console.warn(`Module not provided: ${packageName}`)
        }
      }

      setScope(newScope)

      // Remove import statements
      let processedCode = inputCode.replace(/import.*?;?\n/g, '')

      // Remove export statements
      processedCode = processedCode.replace(/export\s+default\s+\w+;?/g, '')

      // Find the main component name
      const componentRegex =
        /export\s+(?:default\s+)?(?:(?:function|const|class|let|var)\s+([A-Z][a-zA-Z0-9]*)|([A-Z][a-zA-Z0-9]*)(?=\s*;))/g

      function extractComponentNames (sourceCode) {
        const componentNames = []
        let match
        while ((match = componentRegex.exec(sourceCode)) !== null) {
          componentNames.push(match[1] || match[2])
        }
        return componentNames
      }
      // Trích xuất và in ra tên các component

      const componentName = extractComponentNames(initialCode)[0]

      if (componentName) {
        // Add render call at the end
        processedCode += `\n\nrender(<${componentName} />);`
      }

      return processedCode
    }

    processCode(initialCode).then(setCode)
  }, [initialCode, customModules])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(initialCode).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Wrapper component to provide Tailwind context
  const TailwindWrapper = ({ children }) => (
    <div className=' min-h-screen bg-gray-100 flex items-center justify-center"'>
      {children}
    </div>
  )

  return (
    <div className='w-full mx-auto p-4'>
      <Tab.Group>
        <Tab.List className='flex p-1 space-x-1 bg-blue-900/20 rounded-xl'>
          {['Code', 'Preview'].map(tab => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `w-full py-2.5 text-sm leading-5 font-medium rounded-lg
                focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60
                ${
                  selected
                    ? 'bg-white shadow text-blue-700'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-2'>
          <Tab.Panel className='bg-white rounded-xl p-3'>
            <div className='relative'>
              <button
                onClick={copyToClipboard}
                className='absolute top-2 right-2 p-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400'
                title='Copy code'
              >
                <FaCopy />
              </button>
              {copied && (
                <span className='absolute top-2 right-12 px-2 py-1 bg-green-500 text-white rounded-md text-sm'>
                  Đã sao chép!
                </span>
              )}
              <SyntaxHighlighter
                language='jsx'
                style={tomorrow}
                showLineNumbers
              >
                {initialCode}
              </SyntaxHighlighter>
            </div>
          </Tab.Panel>
          <Tab.Panel className='bg-white rounded-xl p-3'>
            {/* <LiveProvider code={code} scope={scope} noInline={true}> */}
            <TailwindWrapper>
              {/* <LivePreview /> */}

              <iframe
                title='Register Form'
                srcDoc={initialCode}
                style={{ width: '100%', height: '100vh', border: 'none' }}
                sandbox='allow-scripts allow-same-origin'
              />
            </TailwindWrapper>
            {/* <LiveError /> */}
            {/* </LiveProvider> */}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default SmartCodePreview

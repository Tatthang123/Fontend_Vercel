import React from 'react'
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-gray-100 py-8'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap justify-between items-center'>
          <div className='w-full md:w-1/3 mb-4 md:mb-0'>
            <h3 className='text-lg font-semibold mb-2'>ASUPER</h3>
            <p className='text-sm text-gray-600'>
              Websites designed & built faster with AI
            </p>
          </div>
          <div className='w-full md:w-1/3 mb-4 md:mb-0'>
            <h4 className='text-md font-semibold mb-2'>Quick Links</h4>
            <ul className='text-sm'>
              <li className='mb-1'>
                <a href='#' className='text-gray-600 hover:text-gray-900'>
                  Home
                </a>
              </li>
              <li className='mb-1'>
                <a href='#' className='text-gray-600 hover:text-gray-900'>
                  Products
                </a>
              </li>
              <li className='mb-1'>
                <a href='#' className='text-gray-600 hover:text-gray-900'>
                  Pricing
                </a>
              </li>
              <li className='mb-1'>
                <a href='#' className='text-gray-600 hover:text-gray-900'>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className='w-full md:w-1/3'>
            <h4 className='text-md font-semibold mb-2'>Follow Us</h4>
            <div className='flex space-x-4'>
              <a href='#' className='text-gray-600 hover:text-gray-900'>
                <Twitter size={20} />
              </a>
              <a href='#' className='text-gray-600 hover:text-gray-900'>
                <Facebook size={20} />
              </a>
              <a href='#' className='text-gray-600 hover:text-gray-900'>
                <Instagram size={20} />
              </a>
              <a href='#' className='text-gray-600 hover:text-gray-900'>
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className='mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600'>
          © {currentYear} ASUPER. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer

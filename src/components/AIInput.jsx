import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { createComponent } from '../redux/feature/anthropicSlice'

const AIInput = () => {
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleInputChange = e => {
    setInput(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('handleSubmit')

    dispatch(createComponent({ input }))
    navigate('/preview')
    // try {
    //   const response = await axios.post(
    //     'http://localhost:5000/api/anthropic/generate',
    //     {
    //       input
    //     }
    //   )
    //   console.log('response ne', response)
    //   // Chuyển hướng đến trang demo với dữ liệu React
    //   const data = response.data.data ?? ''
    //   console.log('data ne', data)

    //   const reactCode = data.response.match(/```jsx([\s\S]*?)```/)

    //   if (!reactCode || !reactCode[1]) {
    //     throw new Error('Không tìm thấy khối mã JSX hợp lệ trong phản hồi')
    //   }

    //   console.log('reactCode', reactCode)
    //   navigate('/preview', {
    //     state: { reactCode }
    //   })
    // } catch (error) {
    //   console.error('Error updating project input:', error)
    //   // Xử lý lỗi ở đây nếu cần
    // }
  }

  return (
    <div className='max-w-2xl mx-auto mt-12'>
      <div className='flex border rounded-full overflow-hidden shadow-lg'>
        <input
          type='text'
          value={input}
          onChange={handleInputChange}
          placeholder='Describe a company in a sentence or two...'
          className='flex-grow p-4 outline-none'
        />
        <button
          onClick={handleSubmit}
          className='bg-indigo-600 text-white px-6 py-4 hover:bg-indigo-700 transition duration-300 ease-in-out'
        >
          Generate
        </button>
      </div>
    </div>
  )
}

export default AIInput

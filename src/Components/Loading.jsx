import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

const Loading = ({ title }) => {
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <div data-aos='zoom-in-up' className='flex justify-center'>
      <div
        aria-label='Loading...'
        role='status'
        className='flex items-center h-[300px] space-x-2'
      >
        <svg
          className='h-20 w-20 animate-spin opacity-80 stroke-primary'
          viewBox='0 0 256 256'
        >
          <line
            x1='128'
            y1='32'
            x2='128'
            y2='64'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='24'
          ></line>
          <line
            x1='195.9'
            y1='60.1'
            x2='173.3'
            y2='82.7'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='24'
          ></line>
          <line
            x1='224'
            y1='128'
            x2='192'
            y2='128'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='24'
          ></line>
          <line
            x1='195.9'
            y1='195.9'
            x2='173.3'
            y2='173.3'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='24'
          ></line>
          <line
            x1='128'
            y1='224'
            x2='128'
            y2='192'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='24'
          ></line>
          <line
            x1='60.1'
            y1='195.9'
            x2='82.7'
            y2='173.3'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='24'
          ></line>
          <line
            x1='32'
            y1='128'
            x2='64'
            y2='128'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='24'
          ></line>
          <line
            x1='60.1'
            y1='60.1'
            x2='82.7'
            y2='82.7'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='24'
          ></line>
        </svg>
        <span className='text-4xl font-medium opacity-80 text-primary'>
          {title}
        </span>
      </div>
    </div>
  )
}

export default Loading

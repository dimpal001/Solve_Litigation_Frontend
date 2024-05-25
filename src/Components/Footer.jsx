// import { Link } from "react-router-dom"

import { Link } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <div>
      <div className='bg-primary py-5 text-white text-base'>
        <p className='text-center'>
          &copy; {year} Solve Litigation. All rights reserved
        </p>
        <p className='text-center'>
          Design and developed by{' '}
          <Link
            className='hover:text-gray-300 underline'
            target='_blank'
            to={'https://www.trinitycybertech.com'}
          >
            Trinity Cyber Tech
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Footer

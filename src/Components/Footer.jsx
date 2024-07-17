import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-10'>
      <div className='container mx-auto px-5'>
        <div className='flex flex-wrap justify-between'>
          <div className='w-full flex justify-center flex-col max-md:items-center lg:w-1/4 mb-10 lg:mb-0'>
            <Link to='/'>
              <img src={logo} alt='Logo' className='w-32 mb-3' />
            </Link>
          </div>
          <div className='w-full lg:w-1/4 mb-10 lg:mb-0'>
            <h3 className='text-lg font-semibold mb-3'>Quick Links</h3>
            <ul className='text-base'>
              <li className='mb-2'>
                <Link to='/' className='hover:text-primary'>
                  Home
                </Link>
              </li>
              <li className='mb-2'>
                <Link to='/services' className='hover:text-primary'>
                  Facilities
                </Link>
              </li>
              <li className='mb-2'>
                <Link to='/contact-us' className='hover:text-primary'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className='w-full lg:w-1/4 mb-10 lg:mb-0'>
            <h3 className='text-lg font-semibold mb-3'>Legal Resources</h3>
            <ul className='text-base'>
              <li className='mb-2'>
                <Link to='/citations' className='hover:text-primary'>
                  Judgments
                </Link>
              </li>
              {/* <li className='mb-2'>
                <Link to='/legal-advice' className='hover:text-primary'>
                  Legal Advice
                </Link>
              </li> */}
              <li className='mb-2'>
                <Link to='/study-material' className='hover:text-primary'>
                  Study Material
                </Link>
              </li>
            </ul>
          </div>
          <div className='w-full lg:w-1/4'>
            <h3 className='text-lg font-semibold mb-3'>Contact Us</h3>
            <p className='mb-2 text-base'>
              Email: supportteam@solvelitigation.com
            </p>
            <p className='mb-2 text-base'>Phone: +916909115355</p>
            <p className='mb-2 text-base'>
              Address: Police Bazar, Shillong 793001, Meghalaya
            </p>
          </div>
        </div>
        <div className='mt-10 max-md:text-sm border-t pt-5 text-center'>
          <p>
            &copy; {new Date().getFullYear()} Solve Litigation.{' '}
            <br className='lg:hidden' /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

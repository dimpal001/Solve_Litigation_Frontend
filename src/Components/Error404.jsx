import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Img from '../assets/server down.svg'
import { PrimaryButton } from './Customs'
import { useToast } from '@chakra-ui/react'

const Error404 = () => {
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate('/')
    }, 3000)

    const showToast = setTimeout(() => {
      toast({
        title: 'You are redirecting to homepage',
        status: 'info',
        duration: 1500,
        isClosable: true,
        position: 'bottom',
      })
    }, 400)

    return () => {
      clearTimeout(redirectTimeout)
      clearTimeout(showToast)
    }
  }, [navigate])

  return (
    <div>
      <div className='container flex px-10 lg:px-32 flex-col md:flex-row items-center justify-between text-gray-700'>
        <div className='w-full max-md:flex flex-col items-center lg:w-1/2 mx-8'>
          <div className='text-7xl text-primary font-dark font-extrabold mb-8'>
            404
          </div>
          <p className='text-2xl max-md:text-center md:text-3xl font-light leading-normal mb-8'>
            Sorry we couldn&apos;t find the page you&apos;re looking for
          </p>
          <Link title='Home Page' to={'/'}>
            <PrimaryButton title={'Back to Homepage'} />
          </Link>
        </div>
        <div className='w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12'>
          <img width={'100%'} src={Img} className='' alt='Page not found' />
        </div>
      </div>
    </div>
  )
}

export default Error404

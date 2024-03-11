import { useEffect, useState } from 'react'
import { Center, Checkbox, Input, useToast } from '@chakra-ui/react'
import Logo from '../../assets/logo.svg'
import { PrimaryButton } from '../../Components/Customs'
import { Colors } from '../../Components/Colors'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

const LoginPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    registrationType: '',
  })
  const toast = useToast()

  const handleLogin = () => {
    toast({
      title: '.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    })
    console.log('Form data:', formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const isSubmitDisabled = () => {
    const isEmailEmpty = formData.email.trim() === ''
    const isPasswordEmpty = formData.password.trim() === ''

    return isEmailEmpty || isPasswordEmpty
  }

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <Center className='flex justify-center w-full'>
      <div
        data-aos='fade-up'
        className='shadow-xl border w-[420px] p-10 rounded-xl'
      >
        <div className='flex-col gap-10'>
          <Center>
            <img style={{ width: '100px' }} src={Logo} alt='' />
          </Center>

          <div>
            <p className='text-center font-extrabold pt-5'>Login here</p>
            <div className='text-center flex-col flex gap-3 p-1 py-4'>
              <Input
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder={'Email address'}
              />
              <Input
                type={isShowPassword ? 'text' : 'password'}
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder={'Password'}
              />
              <Checkbox
                style={{
                  bgColor: Colors.secondary,
                }}
                onChange={() => {
                  setIsShowPassword(!isShowPassword)
                }}
              >
                Show Password
              </Checkbox>
              <div className='w-full flex justify-between pt-7'>
                <PrimaryButton
                  width={'100%'}
                  title={'Login'}
                  onClick={handleLogin}
                  isDisabled={isSubmitDisabled()}
                />
              </div>
              <p className='text-center text-base pt-5'>
                Don&apos;t have an account ?{' '}
                <Link className='text-primary hover:underline' to={'/register'}>
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Center>
  )
}

export default LoginPage

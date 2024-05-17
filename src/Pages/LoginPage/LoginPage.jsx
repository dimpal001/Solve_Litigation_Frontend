import { useContext, useEffect, useState } from 'react'
import { Center, Checkbox } from '@chakra-ui/react'
import Logo from '../../assets/logo.svg'
import { CustomInput, PrimaryButton } from '../../Components/Customs'
import { Colors } from '../../Components/Colors'
import { Link, useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import { UserContext } from '../../UserContext'
import { api } from '../../Components/Apis'
import { MdRefresh } from 'react-icons/md'
import { enqueueSnackbar } from 'notistack'

const LoginPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    emailOrPhoneNumber: '',
    password: '',
    captcha: '',
  })
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const randomString = Math.random().toString(36).slice(8)
  const [captcha, setCaptcha] = useState(randomString)

  const refreshString = () => {
    setCaptcha(Math.random().toString(36).slice(8))
  }

  const handleLogin = async () => {
    refreshString()
    try {
      const enteredCaptcha = formData.captcha
      // if (enteredCaptcha !== captcha) {
      //   enqueueSnackbar('Incorrect captcha entered!', { variant: 'error' })
      //   return
      // }
      setIsLoading(true)
      const response = await axios.post(
        `${api}/api/solve_litigation/auth/login`,
        formData
      )
      const { token, message, user } = response.data
      localStorage.setItem('token', token)
      const expirationTime = new Date().getTime() + 10 * 1000
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('tokenExpiration', expirationTime)

      setUser(user)
      enqueueSnackbar(message, { variant: 'success' })

      user.isVerified
        ? user.userType === ('admin' || 'staff')
          ? navigate('/admin-dashboard/')
          : navigate('/')
        : navigate('/verify-email')
    } catch (error) {
      setIsLoading(false)
      if (error.response) {
        console.error('Login failed:', error.response.data.message)
        enqueueSnackbar(error.response.data.message, { variant: 'error' })
      } else if (error.request) {
        console.error('Server is not responding')
        enqueueSnackbar('No response received from server!', {
          variant: 'error',
        })
      } else {
        console.error('Error occurred while making request:', error.message)
        enqueueSnackbar('Error occurred while making request', {
          variant: 'error',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const isSubmitDisabled = () => {
    const isEmailOrPhoneNumberEmpty = formData.emailOrPhoneNumber.trim() === ''
    const isPasswordEmpty = formData.password.trim() === ''

    return isEmailOrPhoneNumberEmpty || isPasswordEmpty
  }

  useEffect(() => {
    AOS.init()
    window.document.title = 'Login Form - Solve Litigation'
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <Center className='justify-center w-full'>
      <div
        data-aos='fade-up'
        className='shadow-xl max-sm:mt-20 border lg:w-[500px] p-10 rounded-xl'
      >
        <div className='flex-col gap-10'>
          <Center>
            <img
              className='max-sm:hidden'
              style={{ width: '100px' }}
              src={Logo}
              alt=''
            />
          </Center>

          <div>
            <p className='text-center font-extrabold pt-5'>Login here</p>
            <div>
              <form className='text-center flex-col flex gap-3 p-1 py-4'>
                <CustomInput
                  name='emailOrPhoneNumber'
                  value={formData.emailOrPhoneNumber}
                  onChange={handleChange}
                  placeholder={'Email address or Phone number'}
                />
                <CustomInput
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
                <div>
                  <div className='flex items-center justify-center gap-5'>
                    {/* <p>{captcha}</p> */}
                    {/* <MdRefresh
                      onClick={refreshString}
                      color='red'
                      className='cursor-pointer'
                    /> */}
                  </div>
                  {/* <CustomInput
                    name='captcha'
                    value={formData.captcha}
                    onChange={handleChange}
                    placeholder={'Enter the captcha'}
                  /> */}
                </div>
                <div className='w-full flex justify-between pt-3'>
                  <PrimaryButton
                    type={'submit'}
                    isLoading={isLoading}
                    loadingText={'Signing in...'}
                    width={'100%'}
                    title={'Login'}
                    onClick={handleLogin}
                    isDisabled={isSubmitDisabled()}
                  />
                </div>
                <div>
                  <Link to={'/reset-password'}>
                    <p className='text-sm pt-3 text-primary cursor-pointer'>
                      Forgot Password ?
                    </p>
                  </Link>
                </div>
                <p className='text-center text-base pt-5'>
                  Don&apos;t have an account ?{' '}
                  <Link
                    className='text-primary hover:underline'
                    to={'/register'}
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Center>
  )
}

export default LoginPage

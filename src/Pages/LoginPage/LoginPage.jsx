import { useContext, useEffect, useState } from 'react'
import Logo from '../../assets/logo.svg'
import { CustomInput, SLButton } from '../../Components/Customs'
import { Link, useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import { UserContext } from '../../UserContext'
import { api } from '../../Components/Apis'
import { MdRefresh } from 'react-icons/md'
import { enqueueSnackbar } from 'notistack'

const LoginPage = () => {
  const [captcha, setCaptcha] = useState(null)
  const [captchaToken, setCaptchaToken] = useState(null)

  useEffect(() => {
    fetchCaptcha()
  }, [])

  const fetchCaptcha = async () => {
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/verification/generate-captcha`
      )
      setCaptcha(response.data.captcha)
      setCaptchaToken(response.data.token)
    } catch (error) {
      enqueueSnackbar(error.response.data.error, {
        variant: 'error',
      })
    }
  }

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    emailOrPhoneNumber: '',
    password: '',
    captcha: '',
  })
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('tokenExpiration')
    localStorage.removeItem('loginTimestamp')
    setUser(null)
    enqueueSnackbar('Session expired ! Please Login again', {
      variant: 'error',
    })
    navigate('/login')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    // refreshString()

    if (formData.emailOrPhoneNumber === '') {
      enqueueSnackbar('Enter a valid email or phone number!', {
        variant: 'error',
      })
      return
    }

    if (formData.password === '') {
      enqueueSnackbar('Enter a valid password!', {
        variant: 'error',
      })
      return
    }

    try {
      // const enteredCaptcha = formData.captcha
      // if (enteredCaptcha !== captcha) {
      //   enqueueSnackbar('Incorrect captcha entered!', { variant: 'error' })
      //   return
      // }
      setIsLoading(true)
      const response = await axios.post(
        `${api}/api/solve_litigation/auth/login`,
        { ...formData, captchaInput: formData.captcha, captchaToken }
      )
      const { token, message, user } = response.data
      localStorage.setItem('token', token)
      const expirationTime = new Date().getTime() + 10 * 1000
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('tokenExpiration', expirationTime)

      setUser(user)
      enqueueSnackbar(message, { variant: 'success' })

      setTimeout(() => {
        handleLogout()
      }, 60 * 60 * 1000)

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
      fetchCaptcha()
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

  useEffect(() => {
    AOS.init()
    window.document.title = 'Login Form - Solve Litigation'
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <div className='justify-center flex w-full'>
      <div
        data-aos='fade-up'
        className='shadow-xl max-sm:mt-20 border lg:w-[500px] p-10 rounded-sm'
      >
        <div className='flex-col gap-10'>
          <div className='flex justify-center'>
            <img
              className='max-sm:hidden'
              style={{ width: '100px' }}
              src={Logo}
              alt=''
            />
          </div>

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
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    className='form-checkbox'
                    onChange={() => {
                      setIsShowPassword(!isShowPassword)
                    }}
                  />
                  <span className='ml-2'>Show Password</span>
                </label>
                <div>
                  <div className='flex items-center justify-center gap-5'>
                    <div dangerouslySetInnerHTML={{ __html: captcha }} />
                    <MdRefresh
                      onClick={() => fetchCaptcha()}
                      color='red'
                      className='cursor-pointer'
                    />
                  </div>
                  <CustomInput
                    autoComplete={'off'}
                    name='captcha'
                    value={formData.captcha}
                    onChange={handleChange}
                    placeholder={'Enter the captcha'}
                  />
                </div>
                <div className='w-full flex justify-between pt-3'>
                  <SLButton
                    width={'full'}
                    type={'submit'}
                    iconColor={'white'}
                    isLoading={isLoading}
                    loadingText={'Please wait...'}
                    onClick={handleLogin}
                    title={'Login'}
                    variant={'primary'}
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
    </div>
  )
}

export default LoginPage

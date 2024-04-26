import { useEffect, useState } from 'react'
import { Center, Checkbox, useToast } from '@chakra-ui/react'
import Logo from '../../assets/logo.svg'
import {
  CustomInput,
  PrimaryButton,
} from '../../Components/Customs'
import { Colors } from '../../Components/Colors'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import StateData from './states-and-districts.json'
import axios from 'axios'
import { api } from '../../Components/Apis'

const RegisterPage = () => {
  const [selectedState, setSelectedState] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    registrationType: '',
    state: '',
    district: '',
  })
  const toast = useToast()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    console.log(formData)
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Password mismatched.',
        description: 'Password and Confirm Password should be the same.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      return
    }

    try {
      setIsSubmitting(true)
      const response = await axios.post(
        `${api}/api/solve_litigation/auth/register`,
        formData
      )
      const { message } = response.data
      toast({
        title: message,
        description: 'An email containing a verification link has been sent to your registered email address to verify your account.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      console.log(message)
      navigate('/login')
    } catch (error) {
      console.error('Login failed:', error.response.data.message)
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    } finally {
      setIsSubmitting(false)
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
    const isEmailEmpty = formData.email.trim() === ''
    const isPasswordEmpty = formData.password.trim() === ''
    const isConfirmPasswordEmpty = formData.confirmPassword.trim() === ''
    const isPasswordValid = formData.password.length >= 8

    return (
      isEmailEmpty ||
      isPasswordEmpty ||
      isConfirmPasswordEmpty ||
      !isPasswordValid
    )
  }

  useEffect(() => {
    AOS.init()
    console.log(StateData)
    window.document.title = 'Registration Form - Solve Litigation'
    scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])

  const handleStateChange = (e) => {
    const selectedState = e.target.value
    setSelectedState(selectedState)
    setFormData((prevFormData) => ({
      ...prevFormData,
      state: selectedState,
    }))
  }

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value
    setSelectedDistrict(selectedDistrict)
    setFormData((prevFormData) => ({
      ...prevFormData,
      district: selectedDistrict,
    }))
  }

  return (
    <Center className='flex justify-center w-full'>
      <div
        data-aos='fade-up'
        className='shadow-xl max-sm:mt-10 border lg:w-[640px] p-10 rounded-xl'
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

          <div data-aos='fade-up'>
            <p className='text-center font-extrabold pt-5'>
              Sign Up Information
            </p>
            <div className='text-center flex-col flex gap-3 p-1 py-4'>
              <div>
                <CustomInput
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={'Full Name'}
                />
              </div>
              <div className='flex max-sm:flex-col gap-3'>
                <CustomInput
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={'Email address'}
                />
                <CustomInput
                  type='number'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder={'Phone Number'}
                />
              </div>
              <div className='flex max-sm:flex-col gap-3'>
                <CustomInput
                  type='text'
                  name='state'
                  placeholder={'State name'}
                  list='state'
                  onChange={handleStateChange}
                  value={selectedState}
                />
                <datalist id='state'>
                  {StateData.states.map((state, index) => (
                    <option key={index} value={state.state}>
                      {state.state}
                    </option>
                  ))}
                </datalist>
                <CustomInput
                  isDisabled={selectedState ? false : true}
                  type='text'
                  name='district'
                  placeholder='District name'
                  list='district'
                  onChange={handleDistrictChange}
                  value={selectedDistrict}
                />
                <datalist id='district'>
                  {(
                    StateData.states.find(
                      (state) => state.state === selectedState
                    )?.districts || []
                  ).map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </datalist>
              </div>
              <div className='flex max-sm:flex-col gap-3'>
                <CustomInput
                  type={isShowPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={'Password'}
                />
                <CustomInput
                  type={isShowPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={'Confirm Password'}
                />
              </div>
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
              <div className='w-full flex justify-center pt-3'>
                <PrimaryButton
                  width={{ base: '45%', md: '35%' }}
                  title={'Submit'}
                  isLoading={isSubmitting}
                  loadingText={'Submitting...'}
                  onClick={handleSubmit}
                  isDisabled={isSubmitDisabled()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Center>
  )
}

export default RegisterPage

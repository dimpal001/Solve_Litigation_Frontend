import { useEffect, useState } from 'react'
import { Button, Center, Checkbox, useToast } from '@chakra-ui/react'
import Logo from '../../assets/logo.svg'
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md'
import {
  CustomInput,
  PrimaryButton,
  SecondaryButton,
} from '../../Components/Customs'
import { Colors } from '../../Components/Colors'
import { Link, useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import StateData from './states-and-districts.json'
import axios from 'axios'
import { api } from '../../Components/Apis'

const RegisterPage = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [isClickedNext, setIsClickedNext] = useState(null)
  const [selectedState, setSelectedState] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [showSignUpForm, setShowSignUpForm] = useState(false)
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

  const handleOptionClick = (option) => {
    setSelectedOption(option)

    setFormData((prevFormData) => ({
      ...prevFormData,
      registrationType: option,
    }))
  }

  const handleNextClick = () => {
    console.log('Next button clicked with selected option:', selectedOption)

    setShowSignUpForm(true)
    setIsClickedNext(true)
  }

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
        status: 'success',
        duration: 3000,
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
        className='shadow-xl max-sm:mt-10 border lg:w-[500px] p-10 rounded-xl'
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

          {/* Before clicking the next button  */}
          {!showSignUpForm ? (
            <div data-aos='fade-up'>
              <p className='text-center font-extrabold pt-5'>Register for ?</p>
              <div className='text-center flex-col flex gap-3 p-1 py-4'>
                <Button
                  onClick={() => handleOptionClick('Legal Research')}
                  color={
                    selectedOption === 'Legal Research'
                      ? 'white'
                      : Colors.secondary
                  }
                  _hover={{
                    bgColor: Colors.secondary,
                    color: 'white',
                  }}
                  bgColor={
                    selectedOption === 'Legal Research' && Colors.secondary
                  }
                >
                  Legal Research
                </Button>
                <Button
                  onClick={() => handleOptionClick('Legal Advice and Services')}
                  color={
                    selectedOption === 'Legal Advice and Services'
                      ? 'white'
                      : Colors.secondary
                  }
                  _hover={{
                    bgColor: Colors.secondary,
                    color: 'white',
                  }}
                  bgColor={
                    selectedOption === 'Legal Advice and Services' &&
                    Colors.secondary
                  }
                >
                  Legal Advice and Services
                </Button>
                <div className='w-full flex justify-between pt-7'>
                  <SecondaryButton
                    width={{ base: '45%', md: '35%' }}
                    leftIcon={<MdKeyboardDoubleArrowLeft />}
                    title={'Previous'}
                    isDisabled={!isClickedNext}
                  />
                  <SecondaryButton
                    width={{ base: '45%', md: '35%' }}
                    rightIcon={<MdKeyboardDoubleArrowRight />}
                    title={'Next'}
                    isDisabled={!selectedOption}
                    onClick={handleNextClick}
                  />
                </div>
              </div>
              <p className='text-center text-base pt-5'>
                Already registered?{' '}
                <Link className='text-primary hover:underline' to={'/login'}>
                  Login
                </Link>
              </p>
            </div>
          ) : null}

          {/* After clicking the next button  */}
          {showSignUpForm ? (
            <div data-aos='fade-up'>
              <p className='text-center font-extrabold pt-5'>
                Sign Up Information
              </p>
              <p className='text-center text-sm pt-1'>
                Register for{' '}
                <span className='text-primary'>{selectedOption}</span>
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
                <div className='w-full flex justify-between pt-3'>
                  <SecondaryButton
                    width={{ base: '45%', md: '35%' }}
                    leftIcon={<MdKeyboardDoubleArrowLeft />}
                    title={'Previous'}
                    onClick={() => {
                      setSelectedOption(null)
                      setIsClickedNext(null)
                      setShowSignUpForm(false)
                    }}
                  />
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
          ) : null}
        </div>
      </div>
    </Center>
  )
}

export default RegisterPage

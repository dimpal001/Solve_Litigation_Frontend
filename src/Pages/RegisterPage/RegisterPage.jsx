import { useEffect, useState } from 'react'
import { Button, Center, Checkbox, Input, useToast } from '@chakra-ui/react'
import Logo from '../../assets/logo.svg'
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md'
import { PrimaryButton, SecondaryButton } from '../../Components/Customs'
import { Colors } from '../../Components/Colors'
import { Link, useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

const RegisterPage = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [isClickedNext, setIsClickedNext] = useState(null)
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [showSignUpForm, setShowSignUpForm] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    registrationType: '',
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

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Password missmatched.',
        description: 'Password and Confirm Password should be same.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      return
    }

    toast({
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    })
    navigate('/login')
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

          {/* Before clicking next button  */}
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
                    width={'35%'}
                    leftIcon={<MdKeyboardDoubleArrowLeft />}
                    title={'Previous'}
                    isDisabled={!isClickedNext}
                  />
                  <SecondaryButton
                    width={'35%'}
                    rightIcon={<MdKeyboardDoubleArrowRight />}
                    title={'Next'}
                    isDisabled={!selectedOption}
                    onClick={handleNextClick}
                  />
                </div>
              </div>
              <p className='text-center text-base pt-5'>
                Already registered ?{' '}
                <Link className='text-primary hover:underline' to={'/login'}>
                  Login
                </Link>
              </p>
            </div>
          ) : null}

          {/* After clicking next button  */}
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
                <Input
                  type={isShowPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={'Confirm Password'}
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
                  <SecondaryButton
                    width={'40%'}
                    leftIcon={<MdKeyboardDoubleArrowLeft />}
                    title={'Previous'}
                    onClick={() => {
                      setSelectedOption(null)
                      setIsClickedNext(null)
                      setShowSignUpForm(false)
                    }}
                  />
                  <PrimaryButton
                    width={'40%'}
                    title={'Submit'}
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

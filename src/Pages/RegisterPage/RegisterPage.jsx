import { useEffect, useState } from 'react'
import Logo from '../../assets/logo.svg'
import { CustomInput, SLButton } from '../../Components/Customs'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import StateData from './states-and-districts.json'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { enqueueSnackbar } from 'notistack'

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
    userType: '',
    state: '',
    district: '',
    specialist: '',
  })
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      enqueueSnackbar(
        'Password mismatched ! Password and Confirm Password should be the same',
        { variant: 'error' }
      )
      return
    }

    if (formData.userType === '') {
      enqueueSnackbar('Select a valid user type!', { variant: 'error' })
      return
    }

    if (formData.state === '') {
      enqueueSnackbar('State name should not be empty!', { variant: 'error' })
      return
    }

    if (formData.district === '') {
      enqueueSnackbar('District name should not be empty!', {
        variant: 'error',
      })
      return
    }

    if (
      formData.phoneNumber.length < 10 ||
      !/^\d+$/.test(formData.phoneNumber)
    ) {
      enqueueSnackbar('Phone number should have 10 numeric characters!', {
        variant: 'error',
      })
      return
    }
    console.log(formData)

    try {
      setIsSubmitting(true)
      const response = await axios.post(
        `${api}/api/solve_litigation/auth/register`,
        formData
      )
      const { message } = response.data
      enqueueSnackbar(
        'An email containing a verification link has been sent to your registered email address to verify your account.',
        { variant: 'success' }
      )
      console.log(message)
      navigate('/login')
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
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
      behavior: 'smooth',
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
    <div className='flex justify-center w-full'>
      <div
        data-aos='fade-up'
        className='shadow-xl mt-10 border w-full max-w-xl p-10 rounded-xl'
      >
        <div className='flex flex-col gap-10'>
          <div className='flex justify-center'>
            <img
              className='hidden sm:block'
              style={{ width: '100px' }}
              src={Logo}
              alt='Logo'
            />
          </div>

          <div data-aos='fade-up'>
            <p className='text-center font-extrabold'>Sign Up Information</p>
            <div className='text-center flex flex-col gap-3 p-1 py-4'>
              <div>
                <select
                  required
                  title='Select User Type'
                  name='userType'
                  value={formData.userType}
                  onChange={handleChange}
                  className='w-full p-2 bg-transparent border mb-3'
                  id='userType'
                >
                  <option value=''>Select a user type</option>
                  <option value='guest'>Individual</option>
                  <option value='lawyer'>Lawyer</option>
                  <option value='ca'>Chartered Accountant</option>
                  <option value='cs'>Company Secratery</option>
                  <option value='cf'>Company/Firm</option>
                  <option value='student'>Student</option>
                </select>
                <CustomInput
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder='Full Name'
                />
              </div>
              <div className='flex flex-col sm:flex-row gap-3'>
                <CustomInput
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Email address'
                />
                <CustomInput
                  type='number'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder='Phone Number'
                />
              </div>
              <div className='flex flex-col sm:flex-row gap-3'>
                <CustomInput
                  type='text'
                  name='state'
                  placeholder='State name'
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
                  disabled={!selectedState}
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
              {formData.userType === 'lawyer' && (
                <div className='flex flex-col sm:flex-row gap-3'>
                  <select
                    required
                    title='Select Specialization'
                    name='specialist'
                    value={formData.specialist}
                    onChange={handleChange}
                    className='w-full p-2 bg-transparent border mb-3'
                    id='specialist'
                  >
                    <option value=''>Select Specialization</option>
                    <option value='criminal'>Criminal</option>
                    <option value='civil'>Civil</option>
                    <option value='corporate'>Corporate</option>
                    <option value='family'>Family</option>
                  </select>
                </div>
              )}
              <div className='flex flex-col sm:flex-row gap-3'>
                <CustomInput
                  type={isShowPassword ? 'text' : 'password'}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Password'
                />
                <CustomInput
                  type={isShowPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder='Confirm Password'
                />
              </div>
              <div className='flex flex-col'>
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
              </div>
              <div className='w-full flex justify-center pt-3'>
                <SLButton
                  className={`${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  isLoading={isSubmitting}
                  loadingText={'Please wait...'}
                  iconColor={'white'}
                  onClick={handleSubmit}
                  title={'Submit'}
                  variant={'primary'}
                  disabled={isSubmitDisabled() || isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

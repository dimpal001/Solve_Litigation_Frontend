import { CustomInput, SLButton } from '../../Components/Customs'
import { useState } from 'react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { Colors } from '../../Components/Colors'
import { enqueueSnackbar } from 'notistack'

const CreateStaffpage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (
      fullName.length === 0 ||
      address === 0 ||
      email === 0 ||
      phoneNumber === 0 ||
      password === 0
    ) {
      enqueueSnackbar('Fields are should not be empty!', { variant: 'error' })
      return
    }
    if (password !== confirmPassword) {
      enqueueSnackbar('Password and Confirm Password should be same!', {
        variant: 'error',
      })
      return
    }
    if (password.length < 8) {
      enqueueSnackbar('Password must be at least 8 characters long!', {
        variant: 'error',
      })
      return
    }
    try {
      setIsCreating(true)
      const response = await axios.post(
        `${api}/api/solve_litigation/auth/create-staff`,
        {
          fullName,
          address,
          email,
          phoneNumber,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      console.log(response.data)
      enqueueSnackbar(response.data.message, { variant: 'success' })
      navigate('/admin-dashboard/manage-users/users-list')
    } catch (error) {
      console.error(error)
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div data-aos='fade-up' className='px-7'>
      <div>
        <Link to={'/admin-dashboard/manage-users'}>
          <FaArrowLeft
            size={20}
            className='cursor-pointer'
            color={Colors.primary}
          />
        </Link>
        {/* <p className='text-3xl font-extrabold pb-5 text-center'>Create Staff</p> */}
      </div>
      <div>
        <form>
          <div className='border border-slate-100 bg-slate-50 rounded-sm p-7 mx-44'>
            <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
              <div>
                <label>Full name</label>
                <CustomInput
                  bgColor={'white'}
                  placeholder={'Enter full name'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label>Address</label>
                <CustomInput
                  bgColor={'white'}
                  placeholder={'Enter full address'}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label>Email address</label>
                <CustomInput
                  bgColor={'white'}
                  placeholder={'Enter email address'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>Phone number</label>
                <CustomInput
                  bgColor={'white'}
                  placeholder={'Enter phone number'}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <label>Password</label>
                <CustomInput
                  bgColor={'white'}
                  type={showPassword ? 'text' : 'password'}
                  placeholder={'Enter password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label>Confirm Password</label>
                <CustomInput
                  bgColor={'white'}
                  type={showPassword ? 'text' : 'password'}
                  placeholder={'Enter confirm password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <label className='inline-flex items-center'>
                <input
                  type='checkbox'
                  className='form-checkbox'
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span className='ml-2'>Show Password</span>
              </label>
            </div>
            <div className='flex justify-center pt-8'>
              <SLButton
                variant={'primary'}
                onClick={handleSubmit}
                isLoading={isCreating}
                loadingText={'Creating...'}
                type='submit'
                title={'Create staff'}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateStaffpage

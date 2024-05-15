import axios from 'axios'
import { CustomInput, PrimaryButton } from '../../Components/Customs'
import Logo from '../../assets/logo.svg'
import { Center } from '@chakra-ui/react'
import { useState } from 'react'
import { api } from '../../Components/Apis'
import { enqueueSnackbar } from 'notistack'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState('')

  const handleSubmit = async (e) => {
    setResult('')
    e.preventDefault()
    if (email === '') {
      enqueueSnackbar('Enter a valid email address!', { variant: 'error' })
      return
    }

    try {
      setIsSubmitting(true)
      const response = await axios.post(
        `${api}/api/solve_litigation/auth/reset-password/${email}`
      )

      console.log(response.data)
      if (response.data.status === 'sent') {
        setResult('sent')
        setEmail('')
      }
      setEmail('')
    } catch (error) {
      console.log(error)
      if (error.response.data.status === 'userNotFound') {
        setResult('userNotFound')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <p className='text-center font-extrabold pt-5'>Forgot password</p>
            <div>
              <form className='text-center flex-col flex gap-3 p-1 py-4'>
                <CustomInput
                  name='emailOrPhoneNumber'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={'Registered email address '}
                />
                <p
                  className={`text-base text-left ${
                    result === 'sent' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {result === 'userNotFound'
                    ? 'Provided mail address is not registered.'
                    : result === 'sent'
                    ? 'Password reset mail has been sent to the mail address.'
                    : ''}
                </p>
                <div className='w-full flex justify-between'>
                  <PrimaryButton
                    type={'submit'}
                    isLoading={isSubmitting}
                    loadingText={'Sending...'}
                    width={'100%'}
                    onClick={handleSubmit}
                    title={'Send verification mail'}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Center>
  )
}

export default ResetPassword

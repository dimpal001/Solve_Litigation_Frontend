import { Center } from '@chakra-ui/react'
import { SLButton } from './Customs'
import { useState } from 'react'
import axios from 'axios'
import { api } from './Apis'
import { Link, useParams } from 'react-router-dom'
import { MdMarkEmailRead } from 'react-icons/md'
import { Colors } from './Colors'
import { FaRegCheckCircle } from 'react-icons/fa'
import { MdErrorOutline } from 'react-icons/md'

const EmailVerify = () => {
  const [isVerifying, setIsVerifying] = useState(false)
  const [result, setResult] = useState('notVerified')
  const { token } = useParams()
  console.log(token)

  const handleVerify = async () => {
    try {
      setIsVerifying(true)
      const response = await axios.post(
        `${api}/api/solve_litigation/verification/verify-email/${token}`
      )
      setResult(response.data.message)
      if (response.data.status === 'verified') {
        setResult('verified')
      }
      if (response.data.status === 'alreadyVerified') {
        setResult('alreadyVerified')
      }
      if (response.data.status === 'invalid') {
        setResult('invalid')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div>
      <Center className='justify-center w-full'>
        <div className='max-sm:mt-20 lg:w-[500px] p-10 rounded-xl'>
          {result === 'notVerified' && (
            <div className='flex-col gap-10'>
              <div className='flex justify-center'>
                <MdMarkEmailRead size={100} color={Colors.primary} />
              </div>
              <div>
                <p className='text-center text-3xl font-bold pt-1'>
                  Verify your mail address
                </p>
                <p className='text-base text-center py-5'>
                  Thanks for signing up at <strong>Solve Litigation</strong>.{' '}
                  <br /> Please proceed to verify your account.
                </p>
                <div>
                  <div className='w-full py-3 flex justify-center'>
                    <SLButton
                      variant={'primary'}
                      type={'submit'}
                      isLoading={isVerifying}
                      loadingText={'Verifying...'}
                      width={'100%'}
                      onClick={handleVerify}
                      title={'Click to verify your account'}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {(result === 'verified' || result === 'alreadyVerified') && (
            <div className='flex-col gap-10'>
              <div className='flex justify-center'>
                <FaRegCheckCircle size={150} color={'green'} />
              </div>
              <div>
                <p className='text-center text-3xl py-5 font-bold'>
                  Email has been verified.
                </p>
                <div>
                  <div className='w-full py-3 flex justify-center'>
                    <Link to={'/login'}>
                      <SLButton
                        variant={'primary'}
                        type={'submit'}
                        width={'100%'}
                        title={'Login'}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {result === 'invalid' && (
            <div className='flex-col gap-10'>
              <div className='flex justify-center'>
                <MdErrorOutline size={150} color={'red'} />
              </div>
              <div>
                <p className='text-center text-xl py-5 font-bold'>
                  Verification link has been expired!
                </p>
                <div>
                  <div className='w-full py-3 flex justify-center'></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Center>
    </div>
  )
}

export default EmailVerify

import { CustomInput, PrimaryButton } from '../../Components/Customs'
import Logo from '../../assets/logo.svg'
import { Center, useToast } from "@chakra-ui/react"
import { useState } from 'react'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const toast = useToast()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email === '') {
            toast({
                title: 'Enter a valid email address',
                isClosable: true,
                status: 'error',
                duration: 2000,
                position: 'top'
            })
            return
        }
        console.log(email)
        setIsSent(true)
        setIsSubmitting(true)

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
                        <div >
                            <form className='text-center flex-col flex gap-3 p-1 py-4'>
                                <CustomInput
                                    name='emailOrPhoneNumber'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={'Registered email address '}
                                />
                                <div className='w-full flex justify-between'>
                                    <PrimaryButton type={'submit'}
                                        isLoading={isSubmitting}
                                        loadingText={'Sending...'}
                                        width={'100%'}
                                        onClick={handleSubmit}
                                        title={'Send verification mail'}
                                    />
                                </div>
                            </form>
                        </div>
                        <p className={`text-sm p-3 ${isSent ? 'block' : 'hidden'} mx-1 mt-3 bg-green-200 text-center rounded-[3px]`}>Password reset link has been <br className='lg:hidden' /> sent to your registered mail</p>
                    </div>
                </div>
            </div>
        </Center>
    )
}

export default ForgotPassword
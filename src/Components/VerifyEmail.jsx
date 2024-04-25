import { Center } from "@chakra-ui/react"
import Logo from '../assets/logo.svg'
import { PrimaryButton } from "./Customs"
import { useState } from "react"

const VerifyEmail = () => {
    const [isSending, setIsSending] = useState(false)

    const handleSending = () => {
        setIsSending(true)
    }

    return (
        <Center className='justify-center lg:h-[500px] w-full'>
            <div
                // data-aos='fade-up'
                className='max-sm:mt-20 lg:w-[500px] p-10 rounded-xl'
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
                        <p className='text-center font-extrabold pt-5'>Your account is not verified</p>
                        <div >
                            <form className='text-center flex-col flex gap-3 p-1 py-4'>
                                <div className='w-full flex justify-between'>
                                    <PrimaryButton type={'submit'}
                                        isLoading={isSending}
                                        loadingText={'Sending...'}
                                        width={'100%'}
                                        onClick={handleSending}
                                        title={'Send reverification mail'}
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

export default VerifyEmail
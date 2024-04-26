import { Center, useToast } from "@chakra-ui/react"
import { PrimaryButton } from "./Customs"
import { useContext, useState } from "react"
import axios from 'axios'
import { MdErrorOutline } from "react-icons/md";
import { api } from "./Apis";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const ReVerifyEmail = () => {
    const [isSending, setIsSending] = useState(false)
    const { user, setUser } = useContext(UserContext)
    const toast = useToast()
    const navigate = useNavigate()

    const handleSending = async () => {
        try {
            setIsSending(true)
            const response = await axios.post(`${api}/api/solve_litigation/auth/reverify-email/${user.email}`)
            toast({
                title: response.data.message,
                description: 'Login again',
                status: 'success',
                position: 'top',
                duration: 4000,
                isClosable: true
            })

            setUser(null)
            sessionStorage.removeItem('jwtToken')
            sessionStorage.removeItem('user')
            navigate('/')
        } catch (error) {
            console.log(error)
        } finally {
            setIsSending(false)
        }
    }

    return (
        <Center className='justify-center lg:h-[500px] w-full'>
            <div
                // data-aos='fade-up'
                className='max-sm:mt-20 lg:w-[500px] p-10 rounded-xl'
            >
                <div className='flex-col gap-10'>
                    <div className="flex justify-center">
                        <MdErrorOutline size={150} color="red" />
                    </div>

                    <div>
                        <p className='text-center font-extrabold pt-5'>Your account is not verified</p>
                        <div >
                            <form className='text-center flex-col flex gap-3 p-1 py-4'>
                                <div className='w-full flex justify-center'>
                                    <PrimaryButton type={'submit'}
                                        isLoading={isSending}
                                        loadingText={'Sending...'}
                                        onClick={handleSending}
                                        title={'Resend verification mail'}
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

export default ReVerifyEmail
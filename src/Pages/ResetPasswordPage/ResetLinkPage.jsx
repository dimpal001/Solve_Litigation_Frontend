import { Center, useToast } from "@chakra-ui/react"
import { CustomInput, PrimaryButton } from "../../Components/Customs"
import { RiLockPasswordLine } from "react-icons/ri";
import { Colors } from "../../Components/Colors";
import { useState } from "react";
import axios from "axios";
import { api } from "../../Components/Apis";
import { useNavigate, useParams } from "react-router-dom";

const ResetLinkPage = () => {
    const { token } = useParams()
    const [isReseting, setIsReseting] = useState(false)
    const [isChanging, setIsChanging] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState(false)
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const toast = useToast()
    const navigate = useNavigate()

    const handleReset = async (e) => {
        e.preventDefault()
        try {
            setIsReseting(true)
            const response = await axios.get(`${api}/api/solve_litigation/auth/verify-reset-token/${token}`)
            console.log(response.data.userId)
            setIsVerified(true)
            setUser(response.data.userId)
        } catch (error) {
            if (error.response.status === 404) {
                setError(true)
            }
        } finally {
            setIsReseting(false)
        }
    }

    const handleChangePassword = async (e) => {
        e.preventDefault()
        if (password === '') {
            toast({
                title: 'Enter a new password',
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: true
            })
            return
        }
        if (password !== confirmPassword) {
            toast({
                title: 'Password and Confirm password must be same',
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: true
            })
            return
        }
        try {
            setIsChanging(true)
            const response = await axios.post(`${api}/api/solve_litigation/auth/change-password/${user}`, {
                newPassword: password
            })
            toast({
                title: response.data.message,
                status: 'success',
                duration: 4000,
                position: 'top',
                isClosable: true
            })
            navigate('/login')
        } catch (error) {
            console.log(error)
        } finally {
            setIsChanging(false)
        }
    }

    return (
        <div>
            <Center className='justify-center lg:h-[500px] w-full'>
                <div className='max-sm:mt-20 lg:w-[500px] p-10 rounded-xl'>
                    {!error ? (
                        <div className='flex-col gap-10'>
                            {!isVerified ? (
                                <div>
                                    <div className="flex justify-center">
                                        <RiLockPasswordLine size={150} color={Colors.primary} />
                                    </div>
                                    <p className='text-center font-extrabold pt-5'>Click the button below to reset your password</p>
                                    <div >
                                        <form className='text-center flex-col flex gap-3 p-1 py-4'>
                                            <div className='w-full flex justify-center'>
                                                <PrimaryButton type={'submit'}
                                                    isLoading={isReseting}
                                                    loadingText={'Reseting...'}
                                                    onClick={handleReset}
                                                    title={'Reset Password'}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-center">
                                    <div className="flex flex-col lg:w-[300px] gap-5">
                                        <p className="text-2xl text-center py-5 font-bold">Enter a new password</p>
                                        <CustomInput value={password} onChange={(e) => setPassword(e.target.value)} type={'password'} placeholder={'Password'} />
                                        <CustomInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type={'password'} placeholder={'Confirm Password'} />
                                        <PrimaryButton title={'Change Password'} onClick={handleChangePassword} isLoading={isChanging} loadingText={'Changing...'} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-red-600 text-center">Reset link is not valid or expired!</p>
                    )}
                </div>
            </Center>
        </div>
    )
}

export default ResetLinkPage
import { Link, useNavigate } from 'react-router-dom'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
} from '../../Components/Customs'
import Image from '../../assets/hero_thumbnail.svg'
import { useContext, useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { UserContext } from '../../../src/UserContext'
import SelectServiceModal from '../../Components/SelectServiceModal'
import Marquee from 'react-fast-marquee'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { enqueueSnackbar } from 'notistack'

const HomePage = () => {
  const { user, setUser } = useContext(UserContext)
  const [isSelectServiceModalOpen, setIsSelectServiceModalOpen] =
    useState(false)
  const [notifications, setNotifications] = useState([])
  const [isBioOpenModal, setIsBioModalOpen] = useState(false)
  const navigate = useNavigate()

  const fetchNotification = async () => {
    handleCheckAuth()
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/notification`
      )
      setNotifications(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    if (user) {
      setUser(null)
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('user')
      navigate('/')
      enqueueSnackbar('Session Expired! Please Login again', {
        variant: 'error',
      })
    }
  }

  const handleCheckAuth = async () => {
    try {
      await axios.get(`${api}/api/solve_litigation/check-auth`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    } catch (error) {
      if (error.response.status === 401) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    // if (user && user.userType === 'lawyer') {
    //   setIsBioModalOpen(true)
    // }
    fetchNotification()
    const userData = JSON.parse(localStorage.getItem('user'))
    if (
      userData &&
      userData.userType === 'guest' &&
      userData.selectedService.length === 0
    ) {
      setIsSelectServiceModalOpen(true)
    }
    window.document.title = 'Solve Litigation'
    AOS.init()
  }, [])

  return (
    <div>
      {isSelectServiceModalOpen && user && user.isVerified && (
        <SelectServiceModal
          isOpen={true}
          setIsOpen={setIsSelectServiceModalOpen}
        />
      )}
      <div>
        <Marquee pauseOnHover>
          <div className='flex pt-5 gap-14 pl-7 justify-around overflow-hidden min-w-screen'>
            {notifications &&
              notifications.map((item, index) => (
                <a
                  key={index}
                  className='text-primary capitalize hover:underline'
                  href={item.link}
                  target='_blank'
                >
                  {item.title}
                </a>
              ))}
          </div>
        </Marquee>
      </div>
      <Modal size={'xl'} isOpen={isBioOpenModal}>
        <ModalContent>
          <ModalCloseButton onClick={() => setIsBioModalOpen(false)} />
          <ModalHeader>{user && user.fullName}, add your bio</ModalHeader>
          <ModalBody>
            <div>
              <textarea
                name=''
                autoFocus
                placeholder='Type your bio here...'
                className='p-2 mt-1 focus:border-primary focus:outline-none border w-full'
              ></textarea>
            </div>
            <ModalFooter>
              <SLButton
                title={'Close'}
                onClick={() => setIsBioModalOpen(false)}
                variant={'secondary'}
              />
              <SLButton title={'Update'} variant={'primary'} />
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className='lg:flex flex-row-reverse lg:h-[500px] max-sm:pb-[100px] items-center gap-10 px-10 lg:px-32'>
        {/* <div className='lg:w-[50%] flex max-md:pt-10 justify-center relative z-[5] items-center'>
          <img
            style={{ width: '100%' }}
            className='relative z-[3]'
            src={Image}
            alt=''
          />
          <div className='absolute h-[200px] lg:right-[120px] filter blur-[150px] lg:blur-[200px] rounded-full w-[200px] z-[2] bg-primary'></div>
        </div> */}
        <div data-aos='fade-up' className=' container mx-auto lg:px-[150px]'>
          <div className='py-10'>
            <p className='lg:text-3xl text-lg py-2 font-extrabold leading-tight'>
              Surest way to solve any legal challenges with
            </p>
            <p className='lg:text-5xl bg-primary text-center py-3 text-white -skew-x-6 text-3xl font-extrabold leading-tight'>
              Solve Litigation
            </p>
          </div>
          <p className='text-lg pb-10'>
            <strong>Solve Litigation</strong>, a comprehensive tool and its
            devotion to navigate a piece of general infomation to pave the way
            how to find infomation for research on Law out of the complex
            genesis of legal systems.
          </p>
          <Link to={user ? '/citations' : '/register'}>
            <SLButton variant={'primary'} title={'Get Started'} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage

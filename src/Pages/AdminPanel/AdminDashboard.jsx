import { Divider, Spinner, useToast } from '@chakra-ui/react'
import { PrimaryButton } from '../../Components/Customs'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useContext, useEffect, useState } from 'react'
import AddLawModal from './AddLawModal'
import AddPointsOfLawModal from './AddPointsOfLawModal'
import axios from 'axios'
import { FiCheckCircle } from 'react-icons/fi'
import { Colors } from '../../Components/Colors'
import AddCourtModal from './AddCourtModal'
import { api } from '../../Components/Apis'
import AddApellateTypeModal from './AddApellateTypeModal'
import { UserContext } from '../../UserContext'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const { user } = useContext(UserContext)
  const [isAddLawModalOpen, setIsAddLawModalOpen] = useState(false)
  const [isAddApellateTypeModalOpen, setIsAddApellateTypeModalOpen] =
    useState(false)
  const [isAddCourtModalOpen, setIsAddCourtModalOpen] = useState(false)
  const [isAddPointsOfLawModalOpen, setIsAddPointsOfLawModalOpen] =
    useState(false)
  const [listPOL, setListPOL] = useState([])
  const [listLaw, setListLaw] = useState([])
  const [listCourt, setListCourt] = useState([])
  const [listApellateTypes, setListApellateTypes] = useState([])
  const [statistics, setStatistics] = useState({
    noOfApprovedCitation: '',
    noOfPendingCitation: '',
    noOfGuestUser: '',
    noOfStaffUser: '',
  })

  const toast = useToast()
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('user')
    navigate('/')
    toast({
      title: 'Session Expired !',
      description: 'Please login again',
      status: 'error',
      duration: 10000,
      isClosable: true,
      position: 'top',
    })
  }

  const handleAddLawModal = () => {
    setIsAddLawModalOpen(true)
  }

  const handleAddPointsOfLawModal = () => {
    setIsAddPointsOfLawModalOpen(true)
  }

  const handleAddCourtModal = () => {
    setIsAddCourtModalOpen(true)
  }

  const handleApellateTypeModal = () => {
    setIsAddApellateTypeModalOpen(true)
  }

  const fetchStatistics = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/contents/statistics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const {
        noOfApprovedCitation,
        noOfPendingCitation,
        noOfGuestUser,
        noOfStaffUser,
      } = response.data
      console.log(statistics)

      setStatistics({
        noOfApprovedCitation: noOfApprovedCitation,
        noOfPendingCitation: noOfPendingCitation,
        noOfGuestUser: noOfGuestUser,
        noOfStaffUser: noOfStaffUser,
      })
    } catch (error) {
      if (error.response.status === 401) {
        handleLogout()
      }

    }
  }

  const fetchPOL = async () => {
    const token = sessionStorage.getItem('token')
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/contents/pol-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response)
      setListPOL(response.data)
      console.log(listPOL)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCourts = async () => {
    const token = sessionStorage.getItem('token')
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/contents/court-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response)
      setListCourt(response.data)
      console.log(listCourt)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchLaw = async () => {
    const token = sessionStorage.getItem('token')
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/contents/law-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response)
      setListLaw(response.data)
      console.log(listPOL)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchApellateTypes = async () => {
    const token = sessionStorage.getItem('token')
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/contents/apellate-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response)
      setListApellateTypes(response.data)
      console.log(listPOL)
    } catch (error) {
      console.log(error)
    }
  }

  const RelodeData = () => {
    fetchPOL()
    fetchLaw()
    fetchCourts()
    fetchApellateTypes()
  }

  useEffect(() => {
    fetchStatistics()
    fetchPOL()
    fetchLaw()
    fetchCourts()
    fetchApellateTypes()
  }, [])

  return (
    <div className='flex flex-col gap-y-8'>
      <div className='grid lg:grid-cols-4 gap-x-6'>
        <DetailsCard
          title={'No. of approved citation'}
          number={statistics.noOfApprovedCitation}
          color={'bg-green-500'}
        />
        <DetailsCard
          title={'No. of pending citation'}
          number={statistics.noOfPendingCitation}
          color={'bg-red-400'}
        />
        <DetailsCard
          title={'No. of User'}
          number={statistics.noOfGuestUser}
          color={'bg-blue-500'}
        />
        <DetailsCard
          title={'No. of Staff'}
          number={statistics.noOfStaffUser}
          color={'bg-teal-500'}
        />
      </div>
      <div data-aos='zoom-in-up' className={`gap-x-4 flex ${user.userType === 'staff' && 'hidden'}`}>
        <PrimaryButton
          leftIcon={<IoIosAddCircleOutline size={20} />}
          title={'Add Law'}
          onClick={handleAddLawModal}
        />
        <PrimaryButton
          leftIcon={<IoIosAddCircleOutline size={20} />}
          title={'Add Point of Law'}
          onClick={handleAddPointsOfLawModal}
        />
        <PrimaryButton
          leftIcon={<IoIosAddCircleOutline size={20} />}
          title={'Add Court'}
          onClick={handleAddCourtModal}
        />
        <PrimaryButton
          leftIcon={<IoIosAddCircleOutline size={20} />}
          title={'Add Apellate Type'}
          onClick={handleApellateTypeModal}
        />
      </div>
      <div className='grid lg:grid-cols-4 gap-x-6'>
        {listLaw && <DetailsCard2 data={listLaw} title={'Laws'} />}
        {listPOL && <DetailsCard2 data={listPOL} title={'Point of Laws'} />}
        {listCourt && <DetailsCard2 data={listCourt} title={'Courts'} />}
        {listApellateTypes && (
          <DetailsCard2 data={listApellateTypes} title={'Apellate Types'} />
        )}
      </div>
      {isAddLawModalOpen && (
        <AddLawModal
          RelodeData={RelodeData}
          isOpen={true}
          onClose={() => setIsAddLawModalOpen(false)}
        />
      )}
      {isAddPointsOfLawModalOpen && (
        <AddPointsOfLawModal
          RelodeData={RelodeData}
          isOpen={true}
          onClose={() => setIsAddPointsOfLawModalOpen(false)}
        />
      )}
      {isAddCourtModalOpen && (
        <AddCourtModal
          RelodeData={RelodeData}
          isOpen={true}
          onClose={() => setIsAddCourtModalOpen(false)}
        />
      )}
      {isAddApellateTypeModalOpen && (
        <AddApellateTypeModal
          RelodeData={RelodeData}
          isOpen={true}
          onClose={() => setIsAddApellateTypeModalOpen(false)}
        />
      )}
    </div>
  )
}

const DetailsCard = ({ color, title, number }) => {
  return (
    <div data-aos='zoom-in-up'
      className={`p-5 py-7 ${color} text-white shadow-primary hover:shadow-2xl rounded-md`}
    >
      <div>
        <p className='text-base'>{title}</p>
        <p className='text-4xl font-extrabold'>
          {number === '' ? <Spinner /> : number}
        </p>
      </div>
    </div>
  )
}

const DetailsCard2 = ({ title, data }) => {
  return (
    <div data-aos='zoom-in-up'>
      <div className='border hover:shadow-2xl transition-all delay-[0.05s] rounded-md p-3'>
        <div>
          <p>{title}</p>
          <div className='py-2'>
            <Divider />
          </div>
        </div>
        <div>
          {data ? (
            <ul className='text-base'>
              {data.map((item) => (
                <li className='capitalize py-1' key={item._id}>
                  <div className='flex items-baseline gap-1'>
                    <FiCheckCircle
                      color={Colors.primary}
                      className='pt-[3px]'
                    />
                    {item.name}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

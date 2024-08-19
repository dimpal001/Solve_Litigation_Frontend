import { useContext, useEffect, useState } from 'react'
import { api } from '../../Components/Apis'
import { Avatar, SLButton } from '../../Components/Customs'
import axios from 'axios'
import Loading from '../../Components/Loading'
import { Link, useNavigate } from 'react-router-dom'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { UserContext } from '../../UserContext'
import { enqueueSnackbar } from 'notistack'

const ReviewCitationPage = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [searchedJudgements, setSearchedJudgements] = useState([])
  const [pendingjudgements, setpendingjudgements] = useState([])
  const [approvedjudgements, setapprovedjudgements] = useState([])
  const [filterJudgements, setFilterJudgements] = useState([])
  const [courtList, setCourtList] = useState([])
  const [filterType, setFilterType] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [judgementType, setjudgementType] = useState('pending')
  const [date, setDate] = useState(new Date())
  const [searching, setSearching] = useState(false)

  const onChange = (date) => {
    setDate(date)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('user')
    navigate('/')
    enqueueSnackbar('Session Expired ! Please login again', {
      variant: 'error',
    })
  }

  const fetchPendingjudgements = async () => {
    try {
      setSearchedJudgements([])
      setIsLoading(true)
      setFilterJudgements([])
      setFilterType('all')
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/pending-citations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setpendingjudgements(response.data.pendingCitations)
      setIsLoading(false)
      setFilterJudgements(response.data.pendingCitations)
    } catch (error) {
      if (error.response.status === 401) {
        handleLogout()
      }
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchApprovedjudgements = async () => {
    try {
      setSearchedJudgements([])
      setIsLoading(true)
      setFilterJudgements([])
      setFilterType('all')
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/approved-citations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setapprovedjudgements(response.data.approvedCitations)
      setIsLoading(false)
      setFilterJudgements(response.data.approvedCitations)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCourts = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/contents/court-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setCourtList(response.data)
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    }
  }

  const searchByDate = async () => {
    try {
      setSearching(true)
      setFilterJudgements([])
      setapprovedjudgements([])
      setpendingjudgements([])
      const token = localStorage.getItem('token')
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/search-by-date/${year}/${month}/${day}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setjudgementType('')
      setSearchedJudgements(response.data)
      setFilterJudgements(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setSearching(false)
    }
  }

  const handleChangejudgementType = (type) => {
    console.log(type)
    setjudgementType(type)
    if (type === 'pending') {
      fetchPendingjudgements()
      setapprovedjudgements([])
      setFilterJudgements([])
    } else {
      fetchApprovedjudgements()
      setpendingjudgements([])
      setFilterJudgements([])
    }
  }

  useEffect(() => {
    fetchPendingjudgements()
    fetchCourts()
  }, [])

  const handleCourtFilter = (type) => {
    setFilterType(type)
    let judgements = null
    setFilterJudgements([])
    if (type === 'all') {
      judgements =
        judgementType === 'pending' ? pendingjudgements : approvedjudgements
    } else {
      judgements =
        judgementType === 'pending' ? pendingjudgements : approvedjudgements
      judgements = judgements.filter((item) =>
        item.citationNo.toLowerCase().includes(type.toLowerCase())
      )
    }
    setFilterJudgements(judgements)
  }

  const handleFilerCourtName = (name) => {
    setFilterType('')
    let judgements = null
    console.log(searchedJudgements.length)
    if (searchedJudgements.length > 0) {
      console.log('working')
      judgements = searchedJudgements
      judgements = judgements.filter(
        (item) => item.institutionName.toLowerCase() === name.toLowerCase()
      )
    } else {
      judgements =
        judgementType === 'pending' ? pendingjudgements : approvedjudgements
      judgements = judgements.filter(
        (item) => item.institutionName.toLowerCase() === name.toLowerCase()
      )
    }
    setFilterJudgements(judgements)
  }

  return (
    <div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className='py-3 flex flex-col gap-y-3'>
            <div className='flex justify-between gap-3'>
              <div className='lg:w-3/4'>
                <div className='flex gap-3'>
                  <div className='relative'>
                    <SLButton
                      className={`${
                        judgementType === 'pending'
                          ? 'bg-primary text-white border border-primary'
                          : 'bg-white text-primary border border-primary'
                      }`}
                      title={'Pending Judgments'}
                      onClick={() => handleChangejudgementType('pending')}
                    />
                    {pendingjudgements && pendingjudgements.length > 0 && (
                      <span className='absolute -top-3 -right-2 text-sm bg-orange-700 text-white font-extrabold w-8 h-8 flex justify-center items-center border rounded-full'>
                        {pendingjudgements && pendingjudgements.length}
                      </span>
                    )}
                  </div>
                  {user && user.userType === 'admin' && (
                    <div className='relative'>
                      <SLButton
                        className={`${
                          judgementType === 'approved'
                            ? 'bg-primary text-white border border-primary'
                            : 'bg-white text-primary border border-primary'
                        }`}
                        title={'Approved Judgments'}
                        onClick={() => handleChangejudgementType('approved')}
                      />
                      {approvedjudgements && approvedjudgements.length > 0 && (
                        <span className='absolute -top-3 -right-2 text-sm bg-green-700 text-white font-extrabold w-8 h-8 flex justify-center items-center border rounded-full'>
                          {approvedjudgements && approvedjudgements.length}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className='flex gap-3 pt-2'>
                  <div className='relative'>
                    <SLButton
                      title={'All'}
                      onClick={() => handleCourtFilter('all')}
                      className={
                        'text-sm px-2 py-[5px] focus:bg-primary focus:text-white'
                      }
                      variant={filterType === 'all' ? 'primary' : 'outline'}
                    />
                    <span
                      className={`w-3 h-3 absolute -top-2 -right-2 bg-blue-900 p-3 font-extrabold text-white ${
                        filterType === 'all' ? 'flex' : 'hidden'
                      } justify-center items-center rounded-full text-xs`}
                    >
                      {filterJudgements.length}
                    </span>
                  </div>
                  <div className='relative'>
                    <SLButton
                      title={'Tribunal'}
                      onClick={() => handleCourtFilter('tr')}
                      className={
                        'text-sm px-2 py-[5px] focus:bg-primary focus:text-white'
                      }
                      variant={filterType === 'tr' ? 'primary' : 'outline'}
                    />
                    <span
                      className={`w-3 h-3 absolute -top-2 -right-2 bg-blue-900 p-3 font-extrabold text-white ${
                        filterType === 'tr' ? 'flex' : 'hidden'
                      } justify-center items-center rounded-full text-xs`}
                    >
                      {filterJudgements.length}
                    </span>
                  </div>
                  <div className='relative'>
                    <SLButton
                      title={'Supreme Court'}
                      onClick={() => handleCourtFilter('sc')}
                      className={
                        'text-sm px-2 py-[5px] focus:bg-primary focus:text-white'
                      }
                      variant={filterType === 'sc' ? 'primary' : 'outline'}
                    />
                    <span
                      className={`w-3 h-3 text-white absolute -top-2 -right-2 bg-blue-900 p-3 font-extrabold ${
                        filterType === 'sc' ? 'flex' : 'hidden'
                      } justify-center items-center rounded-full text-xs`}
                    >
                      {filterJudgements.length}
                    </span>
                  </div>
                  <div className='relative'>
                    <SLButton
                      title={'High Court'}
                      onClick={() => handleCourtFilter('hc')}
                      className={
                        'text-sm px-2 py-[5px] focus:bg-primary focus:text-white'
                      }
                      variant={filterType === 'hc' ? 'primary' : 'outline'}
                    />
                    <span
                      className={`w-3 h-3 text-white absolute -top-2 -right-2 bg-blue-900 p-3 font-extrabold ${
                        filterType === 'hc' ? 'flex' : 'hidden'
                      } justify-center items-center rounded-full text-xs`}
                    >
                      {filterJudgements.length}
                    </span>
                  </div>
                  {courtList && courtList.length > 0 && (
                    <div>
                      <select
                        name=''
                        id=''
                        className='py-[7px] focus:bg-primary focus:text-white capitalize px-5 text-sm font-semibold rounded-sm'
                      >
                        <option value=''>Select a Court</option>
                        {courtList.map((item, index) => (
                          <option
                            style={{ textTransform: 'capitalize' }}
                            onClick={() => handleFilerCourtName(item.name)}
                            key={index}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className='grid grid-cols-2 pt-5 gap-5'>
                  {filterJudgements &&
                    filterJudgements.map((data, index) => (
                      <div key={index}>
                        <Citation data={data} />
                      </div>
                    ))}
                </div>
              </div>
              <div className='lg:w-1/4'>
                <div>
                  {/* <CustomInput type='text' placeholder='Search here...' /> */}
                </div>
                <div className='p-5'>
                  <Calendar onChange={onChange} value={date} />
                  <div>
                    <p className='text-center p-2'>
                      {date.toLocaleDateString()}
                    </p>
                  </div>
                  <SLButton
                    isLoading={searching}
                    iconColor={'white'}
                    loadingText={'Searching...'}
                    onClick={searchByDate}
                    title={`Search by Date of Order`}
                    variant={'primary'}
                    width={5}
                  />
                </div>
              </div>
            </div>
            {judgementType === 'pending' && pendingjudgements.length === 0 && (
              <p className='text-center text-lg'>No data to show</p>
            )}
            {judgementType === 'approved' &&
              approvedjudgements.length === 0 && (
                <p className='text-center text-lg'>No data to show</p>
              )}
          </div>
        )}
      </div>
    </div>
  )
}

const Citation = ({ data }) => {
  return (
    <div>
      <div className='p-2 relative max-sm:px-5 border rounded-sm border-slate-100 bg-slate-50 cursor-auto hover:bg-slate-100'>
        <Link to={`/admin-dashboard/detailed-citation/${data._id}`}>
          <div className='flex items-center'>
            <div>
              <Avatar />
            </div>
            <div className='px-2 w-full'>
              <p className='text-base uppercase'>{data.citationNo}</p>
            </div>
          </div>
          <div>
            <p className='text-primary py-1'>{data.title}</p>
          </div>
          <div className='flex gap-2 py-1'>
            <div
              className={`${
                data.status === 'pending' ? 'bg-orange-500' : 'bg-green-600'
              } text-sm capitalize font-bold py-1 px-2 rounded-sm text-white`}
            >
              {data.status}
            </div>
            <div
              className={`bg-primary text-sm capitalize font-bold py-1 text-white px-2 rounded-sm`}
            >
              {data.type}
            </div>
          </div>
          <div className='flex mt-3 w-full gap-6'>
            <p className='text-xs'>
              Created : {new Date(data.createdAt).toLocaleDateString()}
            </p>
            <p className='text-xs'>
              Last modified :{' '}
              {new Date(data.lastModifiedDate).toLocaleDateString()}
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ReviewCitationPage

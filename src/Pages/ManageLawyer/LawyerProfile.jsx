import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../../Components/Apis'
import { SLButton } from '../../Components/Customs'

const LawyerProfile = () => {
  const id = useParams().id
  const [lawyer, setLawyer] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchLawyer = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${api}/api/solve_litigation/legal-advice/lawyer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setLawyer(response.data.lawyer)
      console.log(response.data)
      console.log(lawyer)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLawyer()
  }, [])

  return (
    <div className='container flex items-center mx-auto md:p-4'>
      {!loading ? (
        <div className='bg-white border border-zinc-100 mx-auto max-md:pt-10 shadow-lg rounded-lg overflow-hidden'>
          <div className='bg-cover bg-center p-4'>
            <div className='flex gap-10 max-md:gap-3 max-md:flex-col items-center p-5'>
              <img
                src='https://via.placeholder.com/150'
                alt={lawyer.fullName}
                className='rounded-full border-solid border-white border-2 h-52 w-52'
              />

              <div>
                <h2 className='text-2xl font-bold max-md:text-center mb-2'>
                  {lawyer.fullName}
                </h2>
                <p className='text-gray-700 mb-2 max-md:text-center'>
                  {lawyer.specialist}
                </p>
                <p className='text-gray-600 max-md:text-center'>{lawyer.bio}</p>
              </div>
            </div>
          </div>
          <div className='px-6 py-4 bg-gray-100 text-center'>
            <h3 className='text-lg font-semibold mb-2'>Contact Information</h3>
            <p className='text-gray-700'>{lawyer.email}</p>
            <p className='text-gray-700'>{lawyer.phoneNumber}</p>
          </div>
          <div className='px-6 py-4 bg-gray-100 max-md:flex-col flex justify-center max-md:gap-2 gap-5'>
            <Link to={'/lawyer/1'}>
              <SLButton
                className={'max-md:w-full'}
                title={`Chat with ${lawyer.fullName}`}
                variant={'primary'}
              />
            </Link>
            <SLButton title={`Report Lawyer`} variant={'secondary'} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default LawyerProfile

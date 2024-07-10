import axios from 'axios'
import { api } from '../../Components/Apis'
import { useEffect, useState } from 'react'
import Editor from '../CreateCitationPage/Editor'
import { CustomInput } from '../../Components/Customs'

const ActField = ({ data, setData }) => {
  const [listCourt, setListCourt] = useState([])
  const { institutionName, index, title, judgements, notification } = data

  const fetchCourt = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/contents/court-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setListCourt(response.data)
    } catch (error) {
      console.error('Error fetching court:', error)
    }
  }

  useEffect(() => {
    fetchCourt()
  }, [])

  const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div className='flex flex-col border border-slate-100 gap-y-7 my-3 p-10 bg-slate-50 rounded-sm'>
      <div>
        <label className='text-red-500'>
          <span className='text-lg font-extrabold'>
            Court (Institution) Name *
          </span>
        </label>
        <select
          className='w-full p-2 rounded-sm bg-transparent border'
          value={institutionName}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              institutionName: e.target.value,
            }))
          }
        >
          <option value=''>Select Court</option>
          {listCourt.map((court, index) => (
            <option key={index} value={court.name}>
              {capitalizeString(court.name)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>
          <span className='text-lg font-extrabold'>Index</span>
        </label>
        <Editor
          value={index}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              index: newContent,
            }))
          }
        />
      </div>

      <div>
        <label className='text-red-500'>
          <span className='text-lg font-extrabold'>Title *</span>
        </label>
        <CustomInput
          value={title}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              title: e.target.value,
            }))
          }
        />
      </div>
      <div>
        <label className='text-red-500'>
          <span className='text-lg font-extrabold'>Judgements *</span>
        </label>
        <Editor
          value={judgements}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              judgements: newContent,
            }))
          }
        />
      </div>
      <div>
        <label className=''>
          <span className='text-lg font-extrabold'>Notification</span>
        </label>
        <Editor
          value={notification}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              notification: newContent,
            }))
          }
        />
      </div>
    </div>
  )
}

export default ActField

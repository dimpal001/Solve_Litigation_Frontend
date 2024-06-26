import { FormControl, FormLabel, Select, Input } from '@chakra-ui/react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { useEffect, useState } from 'react'
import Editor from '../CreateCitationPage/Editor'

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
      <FormControl>
        <FormLabel className='text-red-500'>
          <span className='text-lg font-extrabold'>
            Court (Institution) Name *
          </span>
        </FormLabel>
        <Select
          rounded={'sm'}
          bgColor={'white'}
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
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>
          <span className='text-lg font-extrabold'>Index</span>
        </FormLabel>
        <Editor
          value={index}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              index: newContent,
            }))
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel className='text-red-500'>
          <span className='text-lg font-extrabold'>Title *</span>
        </FormLabel>
        <Input
          rounded={'sm'}
          bgColor={'white'}
          value={title}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              title: e.target.value,
            }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel className='text-red-500'>
          <span className='text-lg font-extrabold'>judgements *</span>
        </FormLabel>
        <Editor
          value={judgements}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              judgements: newContent,
            }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel className=''>
          <span className='text-lg font-extrabold'>Notification</span>
        </FormLabel>
        <Editor
          value={notification}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              notification: newContent,
            }))
          }
        />
      </FormControl>
    </div>
  )
}

export default ActField

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../Components/Apis'
import SingleCitationPage from '../ReviewCitationPage/SingleCitationPage'
import Loading from '../../Components/Loading'

const ViewCitation = () => {
  const { id } = useParams()
  const [citation, setCitation] = useState(null)

  const fetchCitation = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/citation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setCitation(response.data.citation)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchCitation()
  }, [])
  return (
    <div>
      <div>
        {citation ? (
          <div>
            <SingleCitationPage data={citation} />
          </div>
        ) : (
          <Loading title={'Loading...'} />
        )}
      </div>
    </div>
  )
}

export default ViewCitation

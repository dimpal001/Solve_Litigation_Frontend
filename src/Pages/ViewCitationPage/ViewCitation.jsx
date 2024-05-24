import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../../Components/Apis'
import SingleCitationPage from '../ReviewCitationPage/SingleCitationPage'
import Loading from '../../Components/Loading'
import { UserContext } from '../../UserContext'

const ViewCitation = () => {
  const { id } = useParams()
  const { user } = useContext(UserContext)
  const [citation, setCitation] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const fetchCitation = async () => {
    try {
      setIsLoading(false)
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/citation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      await setCitation(response.data.citation)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchCitation()
  }, [])
  return (
    <div>
      <div>
        {isLoading ? (
          <Loading title={'Loading...'} />
        ) : (
          citation && (
            <div
              className={`${
                user && user.userType !== 'admin' && 'lg:px-[260px]'
              } ${!user && 'lg:px-[260px]'}`}
            >
              <SingleCitationPage data={citation} />
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default ViewCitation

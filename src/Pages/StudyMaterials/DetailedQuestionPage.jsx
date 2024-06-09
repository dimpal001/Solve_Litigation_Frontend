import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { useSnackbar } from 'notistack'

const DetailedQuestionPage = () => {
  const { topicId, questionId } = useParams()
  const [questionData, setQuestionData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axios.get(
          `${api}/api/solve_litigation/study-material/topics/${topicId}/questions/${questionId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        setQuestionData(response.data)
      } catch (error) {
        console.error(error)
        enqueueSnackbar('Failed to fetch question details', {
          variant: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchQuestionData()
  }, [topicId, questionId, enqueueSnackbar])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!questionData) {
    return <div>No question data found</div>
  }

  return (
    <div className='p-5 lg:px-[250px]'>
      <div className='bg-gray-100 rounded-sm p-5'>
        <h1 className='text-2xl font-bold'>
          <span className='underline text-base text-primary'>
            Question : <br />
          </span>
          {questionData.question}
        </h1>
        <p className='mt-4'>
          <span className='underline text-base font-bold text-primary'>
            Answer : <br />
          </span>
          {questionData.answer}
        </p>
      </div>
    </div>
  )
}

export default DetailedQuestionPage

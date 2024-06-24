import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { useSnackbar } from 'notistack'
import { SLSpinner } from '../../Components/Customs'

const DetailedQuestionPage = () => {
  const { topicId, questionId } = useParams()
  const [questionData, setQuestionData] = useState(null)
  const [relatedQuestions, setRelatedQuestions] = useState([])
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
        setQuestionData(response.data.question)
        setRelatedQuestions(response.data.relatedQuestions)
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
    return (
      <div className='w-full h-[500px] flex justify-center items-center'>
        <SLSpinner width={'50px'} />
      </div>
    )
  }

  if (!questionData) {
    return (
      <div className='w-full h-[500px] flex justify-center items-center'>
        <p>No question data found</p>
      </div>
    )
  }

  return (
    <div className='p-2 lg:p-5 lg:px-[250px]'>
      <div className='bg-gray-100 rounded-sm p-5'>
        <h1 className='text-2xl font-bold'>
          <span className=' font-extrabold text-2xl text-primary'>Q : </span>
          {questionData.question}
        </h1>
        <p className='mt-4'>
          <span className='text-2xl font-bold text-primary'>Ans : </span>
          {/* {questionData.answer} */}
          <div
            className='text-justify'
            dangerouslySetInnerHTML={{
              __html: questionData.answer,
            }}
          />
        </p>
      </div>
      <div className='mt-5'>
        <p className='pb-1 text-primary'>Related Questions</p>
        <div className='flex gap-10 max-md:gap-5 flex-wrap'>
          {relatedQuestions.map((item, index) => (
            <div key={index}>
              <Link
                to={`/detailed-question/${item.topicId}/${item._id}`}
                className='p-2 text-sm rounded-sm px-3 hover:text-white hover:bg-primary bg-gray-300'
              >
                {item.question}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DetailedQuestionPage

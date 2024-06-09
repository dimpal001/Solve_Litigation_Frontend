import { useState, useEffect } from 'react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { useSnackbar } from 'notistack'
import { SLButton } from '../../Components/Customs'

const StudyMaterialUser = () => {
  const [topics, setTopics] = useState([])
  const [questions, setQuestions] = useState([])
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const fetchTopics = async () => {
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/study-material/topics`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setTopics(response.data)
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Failed to fetch topics', { variant: 'error' })
    }
  }

  const fetchQuestions = async (topicId = null, page = 1) => {
    setLoading(true)
    try {
      const url = topicId
        ? `${api}/api/solve_litigation/study-material/topics/${topicId}/questions?page=${page}&limit=20`
        : `${api}/api/solve_litigation/study-material/questions?page=${page}&limit=20`
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      setQuestions(response.data)
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Failed to fetch questions', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTopics()
    fetchQuestions()
  }, [])

  const handleTopicClick = (topicId) => {
    setSelectedTopic(topicId)
    if (topicId === 'all') {
      fetchQuestions()
    } else {
      fetchQuestions(topicId)
    }
  }

  return (
    <div>
      <p className='text-3xl font-extrabold pb-5 text-center pt-5'>
        Study Material
      </p>
      <div className='flex justify-center mb-4'>
        <SLButton
          title={'All'}
          onClick={() => handleTopicClick('all')}
          variant={selectedTopic === 'all' ? 'primary' : 'secondary'}
        />
        {topics.map((topic) => (
          <SLButton
            key={topic._id}
            title={topic.topic}
            onClick={() => handleTopicClick(topic._id)}
            variant={selectedTopic === topic._id ? 'primary' : 'secondary'}
            className='mx-2'
          />
        ))}
      </div>
      <div className='px-[50px]'>
        {loading ? (
          <p className='text-center'>Loading...</p>
        ) : questions.length === 0 ? (
          <p className='text-center'>No questions found</p>
        ) : (
          <table className='table-auto w-full border-collapse border '>
            <thead className='bg-primary text-white'>
              <tr className='bg-gray-200 capitalize'>
                <th className='bg-primary w-[25%] px-4 py-2 border-r'>
                  Question
                </th>
                <th className='bg-primary w-[65%] px-4 py-2 border-r'>
                  Answer
                </th>
              </tr>
            </thead>
            <tbody className=''>
              {questions.map((qa, index) => (
                <tr key={index} className='text-[15px]'>
                  <td className='border px-4 py-2'>{qa.question}</td>
                  <td className='border px-4 py-2'>{qa.answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default StudyMaterialUser

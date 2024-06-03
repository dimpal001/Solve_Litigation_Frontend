import { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { useSnackbar } from 'notistack'
import { SLButton } from '../../Components/Customs'

const ViewMaterial = () => {
  const [topics, setTopics] = useState([])
  const { enqueueSnackbar } = useSnackbar()

  const fetchTopicsWithQuestions = async () => {
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/study-material/topics`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      const topicsWithQuestions = await Promise.all(
        response.data.map(async (topic) => {
          const questionsResponse = await axios.get(
            `${api}/api/solve_litigation/study-material/topics/${topic._id}/questions`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          return { ...topic, questions: questionsResponse.data }
        })
      )

      setTopics(topicsWithQuestions)
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Failed to fetch study materials', { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchTopicsWithQuestions()
  }, [])

  const handleEditQuestion = (questionId, newQuestion, newAnswer) => {
    // Handle editing the question and answer
    console.log(
      `Editing question with ID: ${questionId}, new question: ${newQuestion}, new answer: ${newAnswer}`
    )
  }

  return (
    <div>
      <p className='text-3xl font-extrabold pb-5 text-center'>View Material</p>
      <div className='px-[50px]'>
        {topics.length === 0 ? (
          <p className='text-center'>No materials found</p>
        ) : (
          topics.map((topic) => (
            <div key={topic._id} className='mb-8'>
              <h2 className='text-2xl font-bold mb-4'>{topic.topic}</h2>
              {topic.questions.length === 0 ? (
                <p>No questions available</p>
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
                      <th className='bg-primary w-[10%] px-4 py-2'>Edit</th>
                    </tr>
                  </thead>
                  <tbody className=''>
                    {topic.questions.map((qa, index) => (
                      <tr key={index} className='text-[15px]'>
                        <td className='border px-4 py-2'>{qa.question}</td>
                        <td className='border px-4 py-2'>{qa.answer}</td>
                        <td className='border px-4 py-2'>
                          <div className='flex justify-center'>
                            <SLButton
                              title='Edit'
                              variant='primary'
                              onClick={() =>
                                handleEditQuestion(
                                  qa._id,
                                  qa.question,
                                  qa.answer
                                )
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ViewMaterial

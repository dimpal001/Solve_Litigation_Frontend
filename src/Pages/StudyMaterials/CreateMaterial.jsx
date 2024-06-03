import { useEffect, useState } from 'react'
import { SLButton } from '../../Components/Customs'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { useSnackbar } from 'notistack'

const CreateMaterial = () => {
  const [formData, setFormData] = useState({
    topicId: '',
    question: '',
    answer: '',
  })
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(false)
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

  useEffect(() => {
    fetchTopics()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    try {
      const response = await axios.post(
        `${api}/api/solve_litigation/study-material/topics/${formData.topicId}/add-question`,
        {
          question: formData.question,
          answer: formData.answer,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      console.log(response.data)
      setFormData({ topicId: '', question: '', answer: '' })
      enqueueSnackbar(response.data.message, {
        variant: 'success',
      })
    } catch (error) {
      console.error(error)
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <p className='text-3xl font-extrabold pb-5 text-center'>
        Create Study Material
      </p>
      <form onSubmit={handleSubmit} className='px-[200px]'>
        <div className='pb-4'>
          <label className='block text-lg font-medium'>Topic</label>
          <select
            name='topicId'
            value={formData.topicId}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded-sm'
            required
          >
            <option value='' disabled>
              Select a topic...
            </option>
            {topics.map((topic) => (
              <option key={topic._id} value={topic._id}>
                {topic.topic}
              </option>
            ))}
          </select>
        </div>
        <div className='pb-4'>
          <label className='block text-lg font-medium'>Question</label>
          <textarea
            placeholder='Enter the question...'
            type='text'
            name='question'
            value={formData.question}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded-sm'
            required
          />
        </div>
        <div className='pb-4'>
          <label className='block text-lg font-medium'>Answer</label>
          <textarea
            placeholder='Enter the answer...'
            name='answer'
            value={formData.answer}
            rows={5}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded-sm'
            required
          />
        </div>
        <div className='text-center'>
          <SLButton
            title={'Submit'}
            variant={'primary'}
            type={'submit'}
            isLoading={isLoading}
            loadingText={'Submitting...'}
          />
        </div>
      </form>
    </div>
  )
}

export default CreateMaterial

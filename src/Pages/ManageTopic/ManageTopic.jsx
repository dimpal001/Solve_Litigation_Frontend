import { useEffect, useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
} from '../../Components/Customs'
import axios from 'axios'
import { api } from '../../Components/Apis'

const ManageTopic = () => {
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false)
  const [topics, setTopics] = useState([])
  const [topic, setTopic] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [topicId, setTopicId] = useState(null)

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
      console.log(topics)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddTopic = async () => {
    try {
      setIsSubmitting(true)
      if (isEditMode && topicId) {
        // Update existing topic
        const response = await axios.put(
          `${api}/api/solve_litigation/study-material/topics/${topicId}`,
          { topic },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        setTopics(
          topics.map((t) =>
            t._id === topicId ? { ...t, topic: response.data.topic } : t
          )
        )
      } else {
        // Add new topic
        const response = await axios.post(
          `${api}/api/solve_litigation/study-material/add-topic`,
          { topic },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        setTopics([...topics, response.data])
      }
      setIsAddTopicModalOpen(false)
      setTopic('')
      setIsEditMode(false)
      setTopicId(null)
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditModalOpen = (topic) => {
    setTopic(topic.topic)
    setTopicId(topic._id)
    setIsEditMode(true)
    setIsAddTopicModalOpen(true)
  }

  useEffect(() => {
    fetchTopics()
  }, [])

  return (
    <div>
      <p className='text-3xl font-extrabold pb-5 text-center'>Manage Topic</p>
      <div className='flex justify-center gap-5'>
        <SLButton
          title={'Add Topic'}
          onClick={() => {
            setIsAddTopicModalOpen(true)
            setIsEditMode(false)
            setTopic('')
            setTopicId(null)
          }}
          variant={'primary'}
        />
      </div>
      <table className='table-auto my-5 w-full mb-10 border-collapse border border-primary'>
        <thead className='bg-primary'>
          <tr className='bg-gray-200 capitalize'>
            <th className='px-4 bg-primary text-white py-2 border-r'>
              topic name
            </th>
            <th className='px-4 bg-primary text-white py-2 border-r'>
              no of questions
            </th>
            <th className='px-4 bg-primary text-white py-2 border-r'>action</th>
          </tr>
        </thead>
        <tbody className='border border-primary'>
          {topics &&
            topics.map((item, index) => (
              <tr key={index} fontSize={16}>
                <td
                  onClick={() => handleEditModalOpen(item)}
                  className='border cursor-pointer px-4 py-2 hover:text-primary hover:underline'
                >
                  {item.topic}
                </td>
                <td className='border px-4 py-2'>length</td>
                <td className='border px-4 py-2'>
                  <p className='text-red-500 font-extrabold text-center hover:underline cursor-pointer'>
                    Delete
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isAddTopicModalOpen && (
        <Modal size={'md'} isOpen={true}>
          <ModalContent>
            <ModalCloseButton onClick={() => setIsAddTopicModalOpen(false)} />
            <ModalHeader>{isEditMode ? 'Edit Topic' : 'Add Topic'}</ModalHeader>
            <ModalBody>
              <input
                type='text'
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder='Enter topic name'
                className='w-full p-2 border border-gray-300 rounded-sm'
              />
            </ModalBody>
            <ModalFooter>
              <SLButton
                title={'Cancel'}
                onClick={() => setIsAddTopicModalOpen(false)}
                variant={'secondary'}
              />
              <SLButton
                isLoading={isSubmitting}
                loadingText={'Submitting...'}
                title={isEditMode ? 'Update' : 'Submit'}
                onClick={handleAddTopic}
                variant={'primary'}
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  )
}

export default ManageTopic

import { useEffect, useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
  SLSpinner,
} from '../../Components/Customs'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { useSnackbar } from 'notistack'

const ManageTopicAndChapter = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [topics, setTopics] = useState([])
  const [chapters, setChapters] = useState([])
  const [name, setName] = useState('')
  const [id, setId] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isManageTopicModalOpen, setIsManageTopicModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const { enqueueSnackbar } = useSnackbar()

  const fetchTopics = async () => {
    try {
      setIsLoading(true)
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
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchChapters = async (topicId) => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${api}/api/solve_litigation/study-material/chapters`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          params: {
            topicId,
          },
        }
      )
      setChapters(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddOrUpdate = async () => {
    if (name === '') {
      enqueueSnackbar('Enter a valid name', { variant: 'error' })
      return
    }
    try {
      setIsSubmitting(true)
      if (isEditMode && id) {
        // Update existing item
        const response = await axios.put(
          `${api}/api/solve_litigation/study-material/topics/${id}`,
          { name },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        setTopics(
          topics.map((t) =>
            t._id === id ? { ...t, name: response.data.name } : t
          )
        )
      } else {
        // Add new item
        const response = await axios.post(
          `${api}/api/solve_litigation/study-material/topics`,
          { name },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        setTopics([...topics, response.data])
      }
      setIsAddModalOpen(false)
      setName('')
      setIsEditMode(false)
      setId(null)
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${api}/api/solve_litigation/study-material/topics/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setTopics(topics.filter((t) => t._id !== id))
      reload()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTopics()
  }, [])

  const reload = () => {
    fetchTopics()
  }

  const handleManageChapters = (topic) => {
    setSelectedItem(topic)
    setIsManageTopicModalOpen(true)
    fetchChapters(topic._id)
  }

  const handleAddOrUpdateChapter = async (chapterName, chapterId = null) => {
    if (chapterName === '') {
      enqueueSnackbar('Enter a valid chapter name', { variant: 'error' })
      return
    }
    try {
      setIsSubmitting(true)
      if (chapterId) {
        // Update existing chapter
        const response = await axios.put(
          `${api}/api/solve_litigation/study-material/chapters/${chapterId}`,
          { name: chapterName, topic: selectedItem._id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        setChapters(
          chapters.map((c) =>
            c._id === chapterId ? { ...c, name: response.data.name } : c
          )
        )
      } else {
        // Add new chapter
        const response = await axios.post(
          `${api}/api/solve_litigation/study-material/chapters`,
          { name: chapterName, topic: selectedItem._id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        setChapters([...chapters, response.data])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteChapter = async (chapterId) => {
    try {
      await axios.delete(
        `${api}/api/solve_litigation/study-material/chapters/${chapterId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setChapters(chapters.filter((c) => c._id !== chapterId))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className='flex gap-5'>
        <SLButton
          title={'Add Topic'}
          onClick={() => {
            setIsAddModalOpen(true)
            setIsEditMode(false)
            setName('')
            setId(null)
          }}
          variant={'primary'}
        />
      </div>
      {isLoading ? (
        <div className='w-full h-[500px] flex justify-center items-center'>
          <SLSpinner width={'50px'} />
        </div>
      ) : (
        <div>
          <div>
            <h3 className='text-xl font-bold my-4'>Topics</h3>
            <table className='table-auto my-5 w-full mb-10 border-collapse border border-primary'>
              <thead className='bg-primary'>
                <tr className='bg-gray-200 capitalize'>
                  <th className='px-4 bg-primary text-white py-2 border-r'>
                    Topic Name
                  </th>
                  <th className='px-4 bg-primary text-white py-2 border-r'>
                    No of Chapters
                  </th>
                  <th className='px-4 bg-primary text-white py-2 border-r'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='border border-primary'>
                {topics.map((item, index) => (
                  <tr key={index} fontSize={16}>
                    <td
                      className='border px-4 py-2 cursor-pointer hover:underline'
                      onClick={() => handleManageChapters(item)}
                    >
                      {item.name}
                    </td>
                    <td className='border px-4 py-2'>
                      {item.numberOfChapters || 0}
                    </td>
                    <td className='border px-4 py-2 flex justify-around'>
                      <p
                        onClick={() => {
                          setIsAddModalOpen(true)
                          setIsEditMode(true)
                          setName(item.name)
                          setId(item._id)
                        }}
                        className='text-primary font-extrabold text-center hover:underline cursor-pointer'
                      >
                        Edit
                      </p>
                      <p
                        onClick={() => handleDelete(item._id)}
                        className='text-red-600 font-extrabold text-center hover:underline cursor-pointer'
                      >
                        Delete
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {isManageTopicModalOpen && (
        <Modal size={'xl'} isOpen={true}>
          <ModalContent>
            <ModalCloseButton
              onClick={() => setIsManageTopicModalOpen(false)}
            />
            <ModalHeader>Manage Chapters for {selectedItem?.name}</ModalHeader>
            <ModalBody>
              <div className='mb-4'>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={`Enter chapter name`}
                  className='w-full p-2 border border-gray-300 rounded-sm'
                />
                <SLButton
                  isLoading={isSubmitting}
                  iconColor={'white'}
                  loadingText={'Submitting...'}
                  title={'Add Chapter'}
                  onClick={() => handleAddOrUpdateChapter(name)}
                  variant={'primary'}
                  className='mt-2'
                />
              </div>
              <table className='table-auto my-5 w-full mb-10 border-collapse border border-primary'>
                <thead className='bg-primary'>
                  <tr className='bg-gray-200 capitalize'>
                    <th className='px-4 bg-primary text-white py-2 border-r'>
                      Chapter Name
                    </th>
                    <th className='px-4 bg-primary text-white py-2 border-r'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className='border border-primary'>
                  {chapters.map((item, index) => (
                    <tr key={index} fontSize={16}>
                      <td className='border px-4 py-2'>{item.name}</td>
                      <td className='border px-4 py-2 flex justify-around'>
                        <p
                          onClick={() => {
                            setName(item.name)
                            handleAddOrUpdateChapter(item.name, item._id)
                          }}
                          className='text-primary font-extrabold text-center hover:underline cursor-pointer'
                        >
                          Edit
                        </p>
                        <p
                          onClick={() => handleDeleteChapter(item._id)}
                          className='text-red-600 font-extrabold text-center hover:underline cursor-pointer'
                        >
                          Delete
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ModalBody>
            <ModalFooter>
              <SLButton
                title={'Close'}
                onClick={() => setIsManageTopicModalOpen(false)}
                variant={'secondary'}
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <Modal size={'xl'} isOpen={isAddModalOpen}>
        <ModalContent>
          <ModalCloseButton onClick={() => setIsAddModalOpen(false)} />
          <ModalHeader>
            {isEditMode ? 'Edit Topic' : 'Add New Topic'}
          </ModalHeader>
          <ModalBody>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter topic name'
              className='w-full p-2 border border-gray-300 rounded-sm'
            />
          </ModalBody>
          <ModalFooter>
            <SLButton
              isLoading={isSubmitting}
              iconColor={'white'}
              loadingText={'Submitting...'}
              title={isEditMode ? 'Update' : 'Submit'}
              onClick={handleAddOrUpdate}
              variant={'primary'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ManageTopicAndChapter

import { useEffect, useState } from 'react'
import {
  CustomInput,
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
      setChapters([])
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
      resetAddModalState()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
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
        const response = await axios.patch(
          `${api}/api/solve_litigation/study-material/chapters/${chapterId}`,
          { name: chapterName },
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
          { name: chapterName, topicId: selectedItem._id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        setChapters([...chapters, response.data])
      }
      resetChapterModalState()
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    const isDelete = confirm('Are you sure, you want to delete this?')
    if (isDelete) {
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
  }

  const handleDeleteChapter = async (chapterId) => {
    const isDelete = confirm('Are you sure, you want to delete this?')
    if (isDelete) {
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
  }

  useEffect(() => {
    fetchTopics()
  }, [])

  const reload = () => {
    fetchTopics()
  }

  const resetAddModalState = () => {
    setIsAddModalOpen(false)
    setIsEditMode(false)
    setName('')
    setId(null)
  }

  const resetChapterModalState = () => {
    setName('')
    setId(null)
    setIsEditMode(false)
  }

  const handleManageChapters = (topic) => {
    setSelectedItem(topic)
    resetChapterModalState()
    setIsManageTopicModalOpen(true)
    fetchChapters(topic._id)
  }

  return (
    <div>
      <div className='flex gap-5'>
        <SLButton
          title={'Add Subject'}
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
            <h3 className='text-xl font-bold my-4'>Subjects</h3>
            <table className='table-auto my-5 w-full mb-10 border-collapse border'>
              <thead className='bg-primary border border-primary'>
                <tr className='bg-gray-200 capitalize'>
                  <th className='px-4 bg-primary text-white py-2 border-r'>
                    Subject Name
                  </th>
                  <th className='px-4 bg-primary text-white py-2 border-r'>
                    No of Chapters
                  </th>
                  <th className='px-4 bg-primary text-white py-2 border-r'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className=''>
                {topics.length === 0 ? (
                  <tr className='text-center'>
                    <td colSpan='6' className='py-5'>
                      No subjects available
                    </td>
                  </tr>
                ) : (
                  topics.map((topic, index) => (
                    <tr
                      key={index}
                      className='border-b cursor-pointer hover:bg-gray-100'
                      onClick={() => handleManageChapters(topic)}
                    >
                      <td className='px-4 py-2 border-r'>{topic.name}</td>
                      <td className='px-4 py-2 border-r'>
                        {topic.chapters.length}
                      </td>
                      <td className='px-4 py-2 border-r'>
                        <div className='flex gap-3 justify-center items-center'>
                          <p
                            className='text-primary hover:text-primaryHover cursor-pointer'
                            onClick={(e) => {
                              e.stopPropagation()
                              setName(topic.name)
                              setId(topic._id)
                              setIsEditMode(true)
                              setIsAddModalOpen(true)
                            }}
                          >
                            Edit
                          </p>
                          <p
                            className='text-red-500 hover:text-red-600 cursor-pointer'
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(topic._id)
                            }}
                          >
                            Delete
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Topic Modal */}
      <Modal size={'md'} isOpen={isAddModalOpen} onClose={resetAddModalState}>
        <ModalContent>
          <ModalHeader>
            {isEditMode ? 'Edit Subject' : 'Add Subject'}
          </ModalHeader>
          <ModalCloseButton onClick={resetAddModalState} />
          <ModalBody>
            <CustomInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter subject name'
            />
          </ModalBody>
          <ModalFooter>
            <SLButton
              title='Cancel'
              onClick={resetAddModalState}
              variant={'secondary'}
            />
            <SLButton
              title={isEditMode ? 'Update' : 'Add'}
              onClick={handleAddOrUpdate}
              isLoading={isSubmitting}
              variant={'primary'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Manage Chapters Modal */}
      <Modal
        size={'2xl'}
        isOpen={isManageTopicModalOpen}
        onClose={resetChapterModalState}
      >
        <ModalContent>
          <ModalHeader>Manage Chapters for {selectedItem?.name}</ModalHeader>
          <ModalCloseButton onClick={() => setIsManageTopicModalOpen(false)} />
          <ModalBody>
            <div className='flex gap-2'>
              <CustomInput
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter chapter name'
                label='Chapter Name'
              />
              {isEditMode && (
                <div className='relative'>
                  <ModalCloseButton onClick={resetChapterModalState} />
                </div>
              )}
              <SLButton
                title={isEditMode ? 'Update' : 'Add'}
                onClick={() => handleAddOrUpdateChapter(name, id)}
                isLoading={isSubmitting}
                variant={'primary'}
              />
            </div>
            <div>
              <h3 className='text-xl font-bold my-4'>Chapters</h3>
              <table className='table-auto text-sm my-5 w-full mb-10 border-collapse border'>
                <thead className='bg-primary border border-primary'>
                  <tr className='bg-gray-200 capitalize'>
                    <th className='px-4 bg-primary text-white py-2 border-r'>
                      Chapter Name
                    </th>
                    <th className='px-4 bg-primary text-white py-2 border-r'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className=''>
                  {chapters.length === 0 ? (
                    <tr className='text-center'>
                      <td colSpan='6' className='py-5'>
                        No Chapters Available
                      </td>
                    </tr>
                  ) : (
                    chapters.map((chapter, index) => (
                      <tr
                        key={index}
                        className='border-b cursor-pointer hover:bg-gray-100'
                      >
                        <td className='px-4 py-2 border-r'>{chapter.name}</td>
                        <td className='px-4 py-2 border-r'>
                          <div className='flex gap-3 justify-center items-center'>
                            <p
                              className='text-primary hover:text-primaryHover cursor-pointer'
                              onClick={() => {
                                setName(chapter.name)
                                setId(chapter._id)
                                setIsEditMode(true)
                                setIsManageTopicModalOpen(true)
                              }}
                            >
                              Edit
                            </p>
                            <p
                              className='text-red-500 hover:text-red-600 cursor-pointer'
                              onClick={() => handleDeleteChapter(chapter._id)}
                            >
                              Delete
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ManageTopicAndChapter

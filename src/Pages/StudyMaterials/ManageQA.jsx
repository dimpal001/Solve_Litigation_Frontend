import { useState, useEffect } from 'react'
import axios from 'axios'
import { api } from '../../Components/Apis'
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
import { useSnackbar } from 'notistack'

const ManageQA = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [questions, setQuestions] = useState([])
  const [chapters, setChapters] = useState([])
  const [selectedChapters, setSelectedChapters] = useState([])
  const [questionText, setQuestionText] = useState('')
  const [answerText, setAnswerText] = useState('')
  const [id, setId] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [viewedQuestion, setViewedQuestion] = useState(null)
  const { enqueueSnackbar } = useSnackbar()

  const fetchQuestions = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${api}/api/solve_litigation/study-material/question-answers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setQuestions(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchChapters = async () => {
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/study-material/chapters`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setChapters(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddOrUpdate = async () => {
    if (!questionText || !answerText || selectedChapters.length === 0) {
      enqueueSnackbar(
        'Please fill out all fields and select at least one chapter',
        { variant: 'error' }
      )
      return
    }
    try {
      setIsSubmitting(true)
      if (isEditMode && id) {
        const response = await axios.patch(
          `${api}/api/solve_litigation/study-material/question-answers/${id}`,
          {
            question: questionText,
            answer: answerText,
            chapters: selectedChapters,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        setQuestions(response.data)
      } else {
        const response = await axios.post(
          `${api}/api/solve_litigation/study-material/question-answers`,
          {
            question: questionText,
            answer: answerText,
            chapters: selectedChapters,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        setQuestions([...questions, response.data])
      }
      resetModalState()
      // fetchQuestions()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
      setIsAddModalOpen(false)
    }
  }

  const handleDelete = async (id) => {
    const isDelete = confirm('Are you sure, you want to delete this?')

    if (isDelete) {
      try {
        await axios.delete(
          `${api}/api/solve_litigation/study-material/question-answers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        setQuestions(questions.filter((q) => q._id !== id))
      } catch (error) {
        console.error(error)
      }
    }
  }

  const resetModalState = () => {
    // setIsAddModalOpen(false)
    setIsEditMode(false)
    setQuestionText('')
    setAnswerText('')
    setSelectedChapters([])
    setId(null)
  }

  useEffect(() => {
    fetchQuestions()
    fetchChapters()
  }, [])

  const handleCheckboxChange = (chapterId) => {
    setSelectedChapters((prevState) =>
      prevState.includes(chapterId)
        ? prevState.filter((id) => id !== chapterId)
        : [...prevState, chapterId]
    )
  }

  return (
    <div>
      <div className='flex gap-5 mb-4'>
        <SLButton
          title='Create Question Answer'
          onClick={() => {
            setIsAddModalOpen(true)
            resetModalState()
          }}
          variant='primary'
        />
      </div>
      {isLoading ? (
        <div className='w-full h-[500px] flex justify-center items-center'>
          <SLSpinner width='50px' />
        </div>
      ) : (
        <div>
          <table className='table-auto w-full mb-10 border-collapse border'>
            <thead className='bg-primary'>
              <tr className='bg-gray-200 capitalize'>
                <th className='px-4 bg-primary text-white py-2 border-r'>
                  Question
                </th>
                <th className='px-4 w-[25%] bg-primary text-white py-2 border-r'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {questions.length === 0 ? (
                <tr className='text-center'>
                  <td colSpan='2' className='py-5'>
                    No Questions Available
                  </td>
                </tr>
              ) : (
                questions.map((question, index) => (
                  <tr
                    key={index}
                    className='border-b cursor-pointer hover:bg-gray-100'
                  >
                    <td className='px-4 text-sm py-2 border-r'>
                      {question.question}
                    </td>
                    <td className='px-4 py-2 border-r'>
                      <div className='flex gap-3 justify-center items-center'>
                        <p
                          className='cursor-pointer px-1 hover:underline'
                          onClick={() => {
                            setViewedQuestion(question)
                            setIsViewModalOpen(true)
                          }}
                        >
                          View
                        </p>
                        <p
                          className='cursor-pointer px-1 text-primary hover:underline'
                          onClick={() => {
                            setQuestionText(question.question)
                            setAnswerText(question.answer)
                            setSelectedChapters(
                              question.chapters.map((chapter) => chapter._id)
                            )
                            setId(question._id)
                            setIsEditMode(true)
                            setIsAddModalOpen(true)
                          }}
                        >
                          Edit
                        </p>
                        <p
                          className='cursor-pointer px-1 text-red-500 hover:underline'
                          onClick={() => handleDelete(question._id)}
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
      )}

      {/* Add/Edit Question Modal */}
      <Modal size={'3xl'} isOpen={isAddModalOpen} onClose={resetModalState}>
        <ModalContent>
          <ModalHeader>
            {isEditMode ? 'Edit Question Answer' : 'Create Question Answer'}
          </ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setIsAddModalOpen(false)
              resetModalState()
            }}
          />
          <ModalBody>
            <textarea
              rows={3}
              className='p-2 focus:outline-none focus:border focus:border-primary rounded-sm w-full mb-2'
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder='Enter question'
            ></textarea>
            <textarea
              rows={7}
              className='p-2 focus:outline-none focus:border focus:border-primary rounded-sm w-full mb-2'
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder='Enter answer'
            ></textarea>
            <div className='mt-4'>
              <label className='block mb-2'>Select Chapters</label>
              <div className='flex gap-4 flex-wrap'>
                {chapters.map((chapter) => (
                  <div
                    key={chapter._id}
                    className='text-sm focus:text-primary flex gap-1'
                  >
                    <label htmlFor={chapter.name}>{chapter.name}</label>
                    <input
                      id={chapter.name}
                      className=''
                      type='checkbox'
                      checked={selectedChapters.includes(chapter._id)}
                      onChange={() => handleCheckboxChange(chapter._id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <SLButton
              title='Cancel'
              onClick={() => {
                setIsAddModalOpen(false)
                resetModalState()
              }}
              variant='secondary'
            />
            <SLButton
              title={isEditMode ? 'Update' : 'Create'}
              onClick={handleAddOrUpdate}
              isLoading={isSubmitting}
              variant='primary'
            />
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* View Question Modal */}
      <Modal
        size={'3xl'}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>View Question</ModalHeader>
          <ModalCloseButton onClick={() => setIsViewModalOpen(false)} />
          <ModalBody>
            <div className='mb-4'>
              <p>
                <strong>Question : </strong>
                {viewedQuestion?.question}
              </p>
            </div>
            <div className='mb-4'>
              <p>
                <strong>Answer : </strong>
                {viewedQuestion?.answer}
              </p>
            </div>
            <div>
              <strong>Chapters:</strong>
              <ul className='list-disc text-sm pl-5'>
                {viewedQuestion?.chapters.map((chapter) => (
                  <li key={chapter._id}>{chapter.name}</li>
                ))}
              </ul>
            </div>
          </ModalBody>
          <ModalFooter>
            <SLButton
              title='Close'
              onClick={() => setIsViewModalOpen(false)}
              variant='secondary'
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ManageQA

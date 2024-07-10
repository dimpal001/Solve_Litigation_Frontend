import { useState, useEffect } from 'react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { useSnackbar } from 'notistack'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import { Colors } from '../../Components/Colors'
import { Avatar, SLButton, SLSpinner } from '../../Components/Customs'

const StudyMaterialUser = () => {
  const [topics, setTopics] = useState([])
  const [questions, setQuestions] = useState([])
  const [selectedTopic, setSelectedTopic] = useState('all')
  const [loading, setLoading] = useState(false)
  const [showAllTopics, setShowAllTopics] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pageNo, setPageNo] = useState(0)
  const [totalPage, setTotalPage] = useState()
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
  const [query, setQuery] = useState('')

  const fetchQuestions = async (topicId = null, page = 0) => {
    setLoading(true)
    try {
      const url = topicId
        ? `${api}/api/solve_litigation/study-material/topics/${topicId}/questions/${page}`
        : `${api}/api/solve_litigation/study-material/questions/${page}`
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      setQuestions(response.data.questions)
      setTotalPage(response.data.totalPages)
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

    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const handleTopicClick = (topicId) => {
    setPageNo(0)
    setQuery('')
    setSelectedTopic(topicId)
    if (topicId === 'all') {
      fetchQuestions()
    } else {
      fetchQuestions(topicId)
    }
  }

  const searchQuestions = async (e) => {
    e.preventDefault()
    if (query === '') {
      enqueueSnackbar('Type something in the search box', { variant: 'error' })
      return
    }

    try {
      setIsLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/study-material/search-questions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            query: query,
          },
        }
      )
      if (response) {
        setQuestions(response.data)
        setSelectedTopic('')
      }
    } catch (error) {
      fetchQuestions()
      console.error('Error fetching citations:', error)
      enqueueSnackbar('Failed to fetch citations', { variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    setPageNo(newPage)
    if (selectedTopic === 'all') {
      fetchQuestions(null, newPage)
    } else {
      fetchQuestions(selectedTopic, newPage)
    }
  }

  return (
    <div>
      <p className='text-3xl font-extrabold pl-3 lg:text-center max-md:py-2 py-5'>
        Study Material
      </p>
      <div className='flex pl-3 lg:justify-center flex-wrap gap-2 mb-4'>
        <div
          onClick={() => handleTopicClick('all')}
          className={`bg-gray-200 px-3 text-sm rounded-sm p-2 cursor-pointer flex justify-center items-center ${
            selectedTopic === 'all' && 'bg-primary text-white'
          }`}
        >
          All
        </div>
        {(showAllTopics ? topics : topics.slice(0, 5)).map((topic) => (
          <div
            onClick={() => handleTopicClick(topic._id)}
            key={topic._id}
            className={`capitalize ${
              selectedTopic === topic._id && 'bg-primary text-white'
            } flex justify-center px-3 items-center cursor-pointer text-sm rounded-sm p-2 bg-gray-200`}
          >
            {topic.topic}
          </div>
        ))}
        {!showAllTopics && topics.length > 5 && (
          <p
            onClick={() => setShowAllTopics(true)}
            className='px-3 text-sm p-2 cursor-pointer text-primary hover:underline'
          >
            Load more...
          </p>
        )}
        {showAllTopics && (
          <div
            onClick={() => setShowAllTopics(false)}
            className='px-3 text-sm p-2 cursor-pointer text-primary hover:underline'
          >
            Load less...
          </div>
        )}
      </div>
      <div className='flex gap-2 justify-center'>
        <form
          onSubmit={searchQuestions}
          className='flex lg:w-[40%] w-[95%] max-md:mb-2 gap-5 rounded-sm border px-3 items-center'
        >
          <FaSearch color={Colors.primary} />
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search here ...'
            className='p-2 w-full text-base group focus:outline-none bg-transparent'
          />
          {isLoading ? (
            <SLSpinner width={'30px'} />
          ) : (
            <FaArrowRight
              type='submit'
              onClick={searchQuestions}
              className='cursor-pointer'
              color={Colors.primary}
            />
          )}
        </form>
        {/* </div> */}
      </div>
      <div className='lg:px-[50px]'>
        {loading ? (
          <p className='text-center'>Loading...</p>
        ) : questions.length === 0 ? (
          <p className='text-center py-5 text-red-500'>No questions found</p>
        ) : (
          <div className='lg:px-[120px]'>
            {questions.map((qa, index) => (
              <Material key={index} data={qa} />
            ))}
            {!query && (
              <div className='flex items-center max-md:px-4 justify-center gap-5 py-3 max-md:justify-between'>
                {pageNo !== 0 && (
                  <SLButton
                    onClick={() => handlePageChange(pageNo - 1)}
                    variant={'outline'}
                    title={'Previous'}
                  />
                )}
                <p className='text-primary'>
                  {pageNo + 1} of {totalPage}
                </p>
                {totalPage !== pageNo + 1 && (
                  <SLButton
                    onClick={() => handlePageChange(pageNo + 1)}
                    variant={'outline'}
                    title={'Next'}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const Material = ({ data }) => {
  console.log(data)
  return (
    <div>
      <Link to={`/detailed-question/${data.topicId}/${data._id}`}>
        <div className='p-2 max-sm:px-5 lg:my-3 group max-md:mb-1 group hover:bg-slate-100 lg:border-b bg-slate-50'>
          <div className='flex items-center'>
            <Avatar />
            <div className='px-2'>
              <p className='text-base group-hover:underline group-hover:text-primary font-semibold capitalize'>
                {data.question}
              </p>
            </div>
          </div>
          <div>
            <p className='text-sm'>
              {' '}
              <span className='underline font-bold'>Ans : </span> {data.answer}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default StudyMaterialUser

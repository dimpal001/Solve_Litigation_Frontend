import axios from 'axios'
import { api } from '../../Components/Apis'
import { useState } from 'react'
import { Colors } from '../../Components/Colors'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '../../Components/Customs'
import { Button } from '@chakra-ui/react'
const FilterCitationModal = ({
  isOpen,
  onClose,
  setCitationType,
  setFilterCitations,
  setPendingCitations,
  setApprovedCitations,
}) => {
  const [courts, setCourts] = useState([])
  const [years, setYears] = useState([])
  const [months, setMonths] = useState([])
  const [days, setDays] = useState([])
  const [citations, setCitations] = useState([])
  const [selectedCourtType, setSelectedCourtType] = useState('')
  const [selectedCourt, setSelectedCourt] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedDay, setSelectedDay] = useState('')

  const handleFetchCourtOrYear = async (court) => {
    setSelectedCourtType(court)
    setSelectedCourt('')
    setSelectedYear('')
    setSelectedMonth('')
    setSelectedDay('')
    setCourts([])
    setYears([])
    setMonths([])
    setDays([])
    if (court === 'the supreme court of india') {
      setCourts([])
      setSelectedCourt(court)
    }
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/filter/${
          court === 'the supreme court of india'
            ? 'get-year/' + court
            : court === 'tribunal'
            ? 'get-tribunal'
            : 'get-highCourt'
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (court !== 'the supreme court of india') {
        await setCourts(response.data.courts)
      } else {
        await setYears(response.data.years)
      }

      console.log(courts)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFetchYears = async (court) => {
    setSelectedCourt(court)
    setSelectedYear('')
    setSelectedMonth('')
    setSelectedDay('')
    setMonths([])
    setDays([])
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/filter/get-year/${court}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      await setYears(response.data.years)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFetchMonths = async (year) => {
    setSelectedYear(year)
    setSelectedMonth('')
    setSelectedDay('')
    setDays([])
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/filter/get-months/${selectedCourt}/${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const monthsData = response.data.months.map((month) => {
        const monthNames = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ]
        const monthName = monthNames[parseInt(month.month) - 1]
        return { ...month, monthName }
      })

      await setMonths(monthsData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFetchDays = async (month) => {
    setSelectedMonth(month)
    setSelectedDay('')
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/filter/get-days/${selectedCourt}/${selectedYear}/${selectedMonth}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      await setDays(response.data.days)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFetchCitations = async (day) => {
    setSelectedDay(day)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/filter/get-citations/${selectedCourt}/${selectedYear}/${selectedMonth}/${selectedDay}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setPendingCitations([])
      setApprovedCitations([])
      setCitationType('')
      await setCitations(response.data.citations)
      await setFilterCitations(response.data.citations)
      onClose()
      console.log(citations)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Modal size={'2xl'} isOpen={isOpen}>
        <ModalContent rounded={0}>
          <ModalHeader>Filter Judgements</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <div className='px-3 pb-5 flex flex-col gap-y-2'>
              <div>
                <p className='text-sm'>Select court type</p>
                <div className='flex gap-3'>
                  <Button
                    size={'sm'}
                    color={selectedCourtType === 'high court' && 'white'}
                    bgColor={
                      selectedCourtType === 'high court' && Colors.primary
                    }
                    _focus={{
                      bgColor: Colors.primary,
                      color: 'white',
                    }}
                    rounded={'sm'}
                    onClick={() => {
                      handleFetchCourtOrYear('high court')
                    }}
                  >
                    High Court
                  </Button>

                  <Button
                    size={'sm'}
                    color={
                      selectedCourtType === 'the supreme court of india' &&
                      'white'
                    }
                    bgColor={
                      selectedCourtType === 'the supreme court of india' &&
                      Colors.primary
                    }
                    _focus={{
                      bgColor: Colors.primary,
                      color: 'white',
                    }}
                    rounded={'sm'}
                    onClick={() => {
                      handleFetchCourtOrYear('the supreme court of india')
                    }}
                  >
                    Supreme Court
                  </Button>
                  <Button
                    size={'sm'}
                    color={selectedCourtType === 'tribunal' && 'white'}
                    bgColor={selectedCourtType === 'tribunal' && Colors.primary}
                    _focus={{
                      bgColor: Colors.primary,
                      color: 'white',
                    }}
                    rounded={'sm'}
                    onClick={() => {
                      handleFetchCourtOrYear('tribunal')
                    }}
                  >
                    Tribunal
                  </Button>
                </div>
              </div>
              {courts.length > 0 && (
                <div>
                  <p className='text-sm'>Select a court</p>
                  <div className='flex flex-wrap gap-3'>
                    {courts.map((court, index) => (
                      <Button
                        key={index}
                        color={selectedCourt === court.name && 'white'}
                        bgColor={selectedCourt === court.name && Colors.primary}
                        onClick={() => handleFetchYears(court.name)}
                        size={'sm'}
                        rounded={'sm'}
                        _focus={{ bgColor: Colors.primary, color: 'white' }}
                        textTransform={'capitalize'}
                      >
                        {court.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              {years.length > 0 && (
                <div>
                  <p className='text-sm'>Select a year</p>
                  <div className='flex flex-wrap gap-3'>
                    {years.map((year, index) => (
                      <Button
                        key={index}
                        color={selectedYear === year.year && 'white'}
                        bgColor={selectedYear === year.year && Colors.primary}
                        onClick={() => handleFetchMonths(year.year)}
                        size={'sm'}
                        rounded={'sm'}
                        _focus={{ bgColor: Colors.primary, color: 'white' }}
                        textTransform={'capitalize'}
                      >
                        {year.year}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              {months.length > 0 && (
                <div>
                  <p className='text-sm'>Select a month</p>
                  <div className='flex flex-wrap gap-3'>
                    {months.map((month, index) => (
                      <Button
                        key={index}
                        color={selectedMonth === month.month && 'white'}
                        bgColor={
                          selectedMonth === month.month && Colors.primary
                        }
                        onClick={() => handleFetchDays(month.month)}
                        size={'sm'}
                        rounded={'sm'}
                        _focus={{ bgColor: Colors.primary, color: 'white' }}
                        textTransform={'capitalize'}
                      >
                        {month.month}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              {days.length > 0 && (
                <div>
                  <p className='text-sm'>Select a day</p>
                  <div className='flex flex-wrap gap-3'>
                    {days.map((day, index) => (
                      <Button
                        key={index}
                        color={selectedDay === day.day && 'white'}
                        bgColor={selectedDay === day.day && Colors.primary}
                        onClick={() => handleFetchCitations(day.day)}
                        size={'sm'}
                        rounded={'sm'}
                        _focus={{ bgColor: Colors.primary, color: 'white' }}
                        textTransform={'capitalize'}
                      >
                        {day.day}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default FilterCitationModal

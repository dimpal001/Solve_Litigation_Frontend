import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { PrimaryOutlineButton } from '../../Components/Customs'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { useState } from 'react'
import { Colors } from '../../Components/Colors'
const FilterCitationModal = ({ isOpen, onClose }) => {
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
        if (court === 'supreme court') {
            setCourts([])
        }
        try {
            const token = sessionStorage.getItem('token')
            const response = await axios.get(`${api}/api/solve_litigation/filter/${court === 'supreme court' ? 'get-year/' + court : (court === 'tribunal' ? 'get-tribunal' : 'get-highCourt')}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (court !== 'supreme court') {
                await setCourts(response.data.courts);
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
            const token = sessionStorage.getItem('token')
            const response = await axios.get(`${api}/api/solve_litigation/filter/get-year/${court}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            await setYears(response.data.years);

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
            const token = sessionStorage.getItem('token')
            const response = await axios.get(`${api}/api/solve_litigation/filter/get-months/${selectedCourt}/${year}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const monthsData = response.data.months.map(month => {
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const monthName = monthNames[parseInt(month.month) - 1];
                return { ...month, monthName };
            });

            await setMonths(monthsData);

        } catch (error) {
            console.log(error)
        }
    }

    const handleFetchDays = async (month) => {
        setSelectedMonth(month)
        setSelectedDay('')
        try {
            const token = sessionStorage.getItem('token')
            const response = await axios.get(`${api}/api/solve_litigation/filter/get-days/${selectedCourt}/${selectedYear}/${selectedMonth}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })


            await setDays(response.data.days);

        } catch (error) {
            console.log(error)
        }
    }

    const handleFetchCitations = async (day) => {
        setSelectedDay(day)
        try {
            const token = sessionStorage.getItem('token')
            const response = await axios.get(`${api}/api/solve_litigation/filter/get-citations/${selectedCourt}/${selectedYear}/${selectedMonth}/${selectedDay}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })


            await setCitations(response.data.citations);
            console.log(citations)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Modal size={'2xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent rounded={0}>
                    <ModalHeader>Filter Citation</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className='px-3 pb-5 flex flex-col gap-y-2'>
                            <div>
                                <p className='text-sm'>Select court type</p>
                                <div className='flex gap-3'>
                                    <PrimaryOutlineButton color={selectedCourtType === 'high court' && 'white'} bgColor={selectedCourtType === 'high court' && Colors.primary} onClick={() => {
                                        handleFetchCourtOrYear('high court')
                                    }} size={'sm'} title={'High Court'} />
                                    <PrimaryOutlineButton color={selectedCourtType === 'supreme court' && 'white'} bgColor={selectedCourtType === 'supreme court' && Colors.primary} onClick={() => {
                                        handleFetchCourtOrYear('supreme court')
                                    }} size={'sm'} title={'Supreme Court'} />
                                    <PrimaryOutlineButton color={selectedCourtType === 'tribunal' && 'white'} bgColor={selectedCourtType === 'tribunal' && Colors.primary} onClick={() => {
                                        handleFetchCourtOrYear('tribunal')
                                    }} size={'sm'} title={'Trubunal'} />
                                </div>
                            </div>
                            {courts.length > 0 && (
                                <div>
                                    <p className='text-sm'>Select a court</p>
                                    <div className='flex flex-wrap gap-3'>
                                        {courts.map((court, index) => (
                                            <PrimaryOutlineButton
                                                color={selectedCourt === court.name && 'white'}
                                                bgColor={selectedCourt === court.name && Colors.primary}
                                                key={index}
                                                onClick={() => handleFetchYears(court.name)}
                                                size={'sm'}
                                                title={court.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {years.length > 0 && (
                                <div>
                                    <p className='text-sm'>Select a year</p>
                                    <div className='flex flex-wrap gap-3'>
                                        {years.map((year, index) => (
                                            <PrimaryOutlineButton
                                                color={selectedYear === year.year && 'white'}
                                                bgColor={selectedYear === year.year && Colors.primary}
                                                key={index}
                                                onClick={() => handleFetchMonths(year.year)}
                                                size={'sm'}
                                                title={year.year}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {months.length > 0 && (
                                <div>
                                    <p className='text-sm'>Select a month</p>
                                    <div className='flex flex-wrap gap-3'>
                                        {months.map((month, index) => (
                                            <PrimaryOutlineButton
                                                color={selectedMonth === month.month && 'white'}
                                                bgColor={selectedMonth === month.month && Colors.primary}
                                                key={index}
                                                onClick={() => handleFetchDays(month.month)}
                                                size={'sm'}
                                                title={month.monthName}
                                            />

                                        ))}
                                    </div>
                                </div>
                            )}
                            {days.length > 0 && (
                                <div>
                                    <p className='text-sm'>Select a day</p>
                                    <div className='flex flex-wrap gap-3'>
                                        {days.map((day, index) => (
                                            <PrimaryOutlineButton
                                                color={selectedDay === day.day && 'white'}
                                                bgColor={selectedDay === day.day && Colors.primary}
                                                key={index}
                                                onClick={() => handleFetchCitations(day.day)}
                                                size={'sm'}
                                                title={day.day}
                                            />

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
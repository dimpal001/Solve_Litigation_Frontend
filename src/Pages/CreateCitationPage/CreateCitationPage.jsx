import { useState, useEffect } from 'react'
import CitationField from './CitationField'
import { SLButton } from '../../Components/Customs'
import { Colors } from '../../Components/Colors'
import ReviewCitationModal from './ReviewCitationModal'
import ResetAllModal from './ResetAllModal'
import ActField from '../CreateActPage/ActsField'
import ReviewActModal from '../CreateActPage/ReviewActModal'
import { FaArrowLeft } from 'react-icons/fa'
import { enqueueSnackbar } from 'notistack'

const CreateCitation = () => {
  const [selectedType, setSelectedType] = useState('citation')
  const [reviewModelOpen, setReviewModelOpen] = useState(false)
  const [resetModelOpen, setResetModelOpen] = useState(false)
  const [data, setData] = useState({
    institutionName: '',
    index: '',
    caseNo: '',
    partyNameAppealant: '',
    partyNameRespondent: '',
    title: '',
    title1: '',
    title2: '',
    judgements: '',
    diaryNo: '',
    dateOfOrder: '',
    dateOfHearing: '',
    judgeName: '',
    headNote: '',
    referedJudgements: '',
    apellates: [],
    laws: [],
    pointOfLaw: [],
    notification: '',
    equivalentCitations: '',
    whetherReported: '',
    advocatePetitioner: '',
    advocateRespondent: '',
    reportable: false,
    overRuled: false,
  })

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      apellateType: selectedType,
    }))
  }, [selectedType])

  const handleReview = () => {
    if (data.institutionName === '') {
      enqueueSnackbar('Court (Institution) name is required!', {
        variant: 'error',
      })
      return 0
    }
    if (data.caseNo === '' && selectedType != 'act') {
      enqueueSnackbar('Case No. is required!', { variant: 'error' })
      return 0
    }
    if (data.partyNameAppealant === '' && selectedType != 'act') {
      enqueueSnackbar('Party Name Appealant is required!', { variant: 'error' })
      return 0
    }
    if (data.partyNameRespondent === '' && selectedType != 'act') {
      enqueueSnackbar('Party Name Respondent is required!', {
        variant: 'error',
      })
      return 0
    }
    if (data.title === '') {
      enqueueSnackbar('Title is required!', { variant: 'error' })
      return 0
    }
    if (data.judgements === '') {
      enqueueSnackbar('Judgements is required!', { variant: 'error' })
      return 0
    }
    if (data.dateOfOrder === '' && selectedType != 'act') {
      enqueueSnackbar('Date of Order is required!', { variant: 'error' })
      return 0
    }
    if (data.judgeName === '' && selectedType != 'act') {
      enqueueSnackbar('Judge Name is required!', { variant: 'error' })
      return 0
    }
    if (data.apellates.length === 0 && selectedType != 'act') {
      enqueueSnackbar('Apellate is required!', { variant: 'error' })
      return 0
    }

    if (data.laws.length === 0 && selectedType != 'act') {
      enqueueSnackbar('Law is required!', { variant: 'error' })
      return 0
    }
    if (data.pointOfLaw.length === 0 && selectedType != 'act') {
      enqueueSnackbar('Point of Law is required!', { variant: 'error' })
      return 0
    }

    setReviewModelOpen(true)
  }

  const handleResetModalOpen = () => {
    setResetModelOpen(true)
  }

  const handleReset = () => {
    setSelectedType('citation')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setData({
      institutionName: '',
      apellateType: '',
      caseNo: '',
      partyNameAppealant: '',
      partyNameRespondent: '',
      title: '',
      judgements: '',
      diaryNo: '',
      dateOfOrder: '',
      dateOfHearing: '',
      judgeName: '',
      headNote: '',
      referedJudgements: '',
      whetherReported: '',
      apellates: [],
      laws: [],
      pointOfLaw: [],
      equivalentCitations: '',
      advocatePetitioner: '',
      advocateRespondent: '',
      reportable: false,
      overRuled: false,
    })
  }

  return (
    <div className='px-7'>
      {selectedType === 'act' && (
        <div>
          <FaArrowLeft
            title='Go to previous page'
            size={20}
            onClick={() => handleReset()}
            className='cursor-pointer'
            color={Colors.primary}
          />
        </div>
      )}
      <p className='text-3xl font-extrabold pb-5 text-center'>
        Create {selectedType === 'citation' ? 'Judgment' : 'Act'}
      </p>
      <div className='flex justify-center gap-x-5'>
        {selectedType === 'citation' && (
          <SLButton
            variant={'outline'}
            onClick={() => setSelectedType('act')}
            title={'Create Act'}
          />
        )}
      </div>
      {reviewModelOpen && selectedType != 'act' && (
        <ReviewCitationModal
          data={data}
          isOpen={true}
          onClose={() => setReviewModelOpen(false)}
        />
      )}
      {reviewModelOpen && selectedType === 'act' && (
        <ReviewActModal
          data={data}
          isOpen={true}
          onClose={() => setReviewModelOpen(false)}
        />
      )}
      {resetModelOpen && (
        <ResetAllModal
          onClick={handleReset}
          isOpen={true}
          onClose={() => setResetModelOpen(false)}
        />
      )}
      <div className='px-10'>
        {selectedType === 'act' ? (
          <ActField data={data} setData={setData} />
        ) : (
          <CitationField data={data} setData={setData} />
        )}
        <div className='pt-10 pb-20 flex gap-5'>
          <SLButton
            variant={'primary'}
            title={'Upload Citation'}
            onClick={handleReview}
          />
          <SLButton
            variant={'error'}
            title={'Reset All'}
            onClick={handleResetModalOpen}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateCitation

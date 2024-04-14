import { useState, useEffect } from 'react'
import CitationField from './CitationField'
import {
  PrimaryButton,
  PrimaryOutlineButton,
  RedButton,
} from '../../Components/Customs'
import { MdDeleteForever } from 'react-icons/md'
import { MdOutlineCloudUpload } from 'react-icons/md'
import {
  useToast,
} from '@chakra-ui/react'
import { Colors } from '../../Components/Colors'
import ReviewCitationModal from './ReviewCitationModal'
import ResetAllModal from './ResetAllModal'
import ActField from '../CreateActPage/ActsField'
import ReviewActModal from '../CreateActPage/ReviewActModal'
import { FaArrowLeft } from 'react-icons/fa'
import { IoCreateOutline } from "react-icons/io5";

const CreateCitation = () => {
  const toast = useToast()
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
    judgments: '',
    dateOfOrder: '',
    judgeName: '',
    headNote: '',
    referedJudgements: '',
    apellates: [],
    laws: [],
    pointOfLaw: [],
    notification: '',
    equivalentCitations: '',
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
      toast({
        title: 'Court (Institution) name is required',
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })
      return 0
    }
    if (data.caseNo === '' && selectedType != 'act') {
      toast({
        title: 'Case No. is required',
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })
      return 0
    }
    if (data.partyNameAppealant === '' && selectedType != 'act') {
      toast({
        title: 'Party Name Appealant is required',
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })
      return 0
    }
    if (data.partyNameRespondent === '' && selectedType != 'act') {
      toast({
        title: 'Party Name Respondent is required',
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })
      return 0
    }
    if (data.title === '') {
      toast({
        title: 'Title is required',
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })
      return 0
    }
    if (data.judgments === '') {
      toast({
        title: 'Judgments is required',
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })
      return 0
    }
    if (data.dateOfOrder === '' && selectedType != 'act') {
      toast({
        title: 'Date of Order is required',
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })
      return 0
    }
    if (data.judgeName === '' && selectedType != 'act') {
      toast({
        title: 'Judge Name is required',
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })
      return 0
    }
    if (data.laws.length === 0 && selectedType != 'act') {
      toast({
        title: 'Law is required',
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })
      return 0
    }
    if (data.pointOfLaw.length === 0 && selectedType != 'act') {
      toast({
        title: 'Point of Law is required',
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })
      return 0
    }

    setReviewModelOpen(true)
  }

  const handleResetModalOpen = () => {
    setResetModelOpen(true)
  }

  const handleReset = () => {
    setSelectedType('citation')
    setData({
      institutionName: '',
      apellateType: '',
      caseNo: '',
      partyNameAppealant: '',
      partyNameRespondent: '',
      title: '',
      judgments: '',
      dateOfOrder: '',
      judgeName: '',
      headNote: '',
      referedJudgements: '',
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
          <FaArrowLeft title='Go to previous page' size={20} onClick={() => handleReset()} className='cursor-pointer' color={Colors.primary} />
        </div>
      )}
      <p className='text-3xl font-extrabold pb-5 text-center'>
        Create {selectedType === 'citation' ? 'Citation' : 'Act'}
      </p>
      <div className='flex justify-center gap-x-5'>
        {selectedType === 'citation' && (
          <PrimaryOutlineButton leftIcon={<IoCreateOutline size={20} />}
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
      <div>
        {selectedType === 'act' ? (
          <ActField data={data} setData={setData} />
        ) : (
          <CitationField data={data} setData={setData} />
        )}
        <div className='pt-10 pb-20 flex gap-5'>
          <PrimaryButton
            title={'Upload Citation'}
            onClick={handleReview}
            leftIcon={<MdOutlineCloudUpload size={20} />}
          />
          <RedButton
            title={'Reset All'}
            onClick={handleResetModalOpen}
            leftIcon={<MdDeleteForever size={20} />}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateCitation

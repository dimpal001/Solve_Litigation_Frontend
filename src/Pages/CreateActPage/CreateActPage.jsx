import { useState, useEffect } from 'react'
import CitationField from './CitationField'
import {
  PrimaryButton,
  PrimaryOutlineButton,
  RedButton,
} from '../../Components/Customs'
import { MdDeleteForever } from 'react-icons/md'
import { MdOutlineCloudUpload } from 'react-icons/md'
import { FiChevronDown } from 'react-icons/fi'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react'
import { Colors } from '../../Components/Colors'
import ReviewCitationModal from './ReviewActModal'
import ResetAllModal from './ResetAllModal'
import ActField from './ActsField'

const CreateAct = () => {
  const toast = useToast()
  const [selectedType, setSelectedType] = useState('')
  const [reviewModelOpen, setReviewModelOpen] = useState(false)
  const [resetModelOpen, setResetModelOpen] = useState(false)
  const [data, setData] = useState({
    institutionName: '',
    apellateType: '', // Initialize with an empty string
    caseNo: '',
    partyNameAppealant: '',
    partyNameRespondent: '',
    title: '',
    judgments: '',
    dateOfOrder: '',
    judgeName: '',
    headNote: '',
    referedJudgements: '',
    laws: [],
    pointOfLaw: [],
    equivalentCitations: '',
    advocatePetitioner: '',
    advocateRespondent: '',
    reportable: false,
    overRuled: false,
  })

  // Update apellateType whenever selectedType changes
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
    if (data.caseNo === '') {
      toast({
        title: 'Case No. is required',
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })
      return 0
    }
    if (data.partyNameAppealant === '') {
      toast({
        title: 'Party Name Appealant is required',
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })
      return 0
    }
    if (data.partyNameRespondent === '') {
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
    if (data.dateOfOrder === '') {
      toast({
        title: 'Date of Order is required',
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })
      return 0
    }
    if (data.judgeName === '') {
      toast({
        title: 'Judge Name is required',
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })
      return 0
    }
    if (data.laws.length === 0) {
      toast({
        title: 'Law is required',
        status: 'error',
        duration: 4000,
        position: 'top',
        isClosable: true,
      })
      return 0
    }
    if (data.pointOfLaw.length === 0) {
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
    // Reset all fields to their initial values
    setSelectedType('')
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
      <p className='text-4xl pb-5 text-center'>Create Citation</p>
      <div className='flex justify-center gap-x-5'>
        <Menu>
          <MenuButton>
            <PrimaryOutlineButton
              bgColor={
                (selectedType === 'corporate' ||
                  selectedType === 'service' ||
                  selectedType === 'civil' ||
                  selectedType === 'taxation') &&
                Colors.primary
              }
              color={
                selectedType === 'corporate' ||
                selectedType === 'service' ||
                selectedType === 'civil' ||
                selectedType === 'taxation'
                  ? 'white'
                  : null
              }
              title={
                selectedType === 'criminal' || selectedType === ''
                  ? 'Civil'
                  : selectedType
              }
              rightIcon={<FiChevronDown />}
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setSelectedType('civil')}>Civil</MenuItem>
            <MenuItem onClick={() => setSelectedType('corporate')}>
              Corporate
            </MenuItem>
            <MenuItem onClick={() => setSelectedType('service')}>
              Service
            </MenuItem>
            <MenuItem onClick={() => setSelectedType('taxation')}>
              Taxation
            </MenuItem>
          </MenuList>
        </Menu>
        <PrimaryOutlineButton
          bgColor={selectedType === 'criminal' && Colors.primary}
          color={selectedType === 'criminal' ? 'white' : null}
          onClick={() => setSelectedType('criminal')}
          title={'Criminal'}
        />
      </div>
      {reviewModelOpen && (
        <ReviewCitationModal
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
      {selectedType !== '' ? (
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
      ) : (
        <p className='text-center text-primary py-5'>
          Select an apellate type to create a citation
        </p>
      )}
    </div>
  )
}

export default CreateAct

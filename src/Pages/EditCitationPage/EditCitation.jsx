import { useNavigate, useParams } from 'react-router-dom'
import CitationField from '../CreateCitationPage/CitationField'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { useEffect, useState } from 'react'
import Loading from '../../Components/Loading'
import { PrimaryButton } from '../../Components/Customs'
import { FaCheck } from 'react-icons/fa'
import { useToast } from '@chakra-ui/react'
import ActField from '../CreateActPage/ActsField'

const EditCitation = () => {
  const { id } = useParams()
  const toast = useToast()
  const navigate = useNavigate()
  const [isUpdating, setIsUpdating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
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

  const fetchCitation = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/citation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setData(response.data.citation)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchCitation()
  }, [])

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.put(
        `${api}/api/solve_litigation/citation/update-citation/${id}`,
        { citationData: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: response.data.message,
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
      navigate('/admin-dashboard/review-citation');
    } catch (error) {
      toast({
        title: error.response.data.error,
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
    } finally {
      setIsUpdating(false)
    }
  };


  return (
    <div>
      <div>
        <p className='text-2xl text-center font-extrabold'>Edit {data && data.type === 'act' && 'Act'} Citation</p>
        <div>
          {!isLoading ? (
            <div>
              {data.type === 'act' ? (
                <ActField data={data} setData={setData} />
              ) : (
                <CitationField data={data} setData={setData} />
              )}
              <div className='flex justify-center pt-5 pb-10'>
                <PrimaryButton
                  title={'Update Citaion'}
                  isLoading={isUpdating}
                  onClick={handleUpdate}
                  loadingText={'Updating...'}
                  rightIcon={<FaCheck size={20} />}
                />
              </div>
            </div>
          ) : (
            <Loading title={'Loading...'} />
          )}
        </div>
      </div>
    </div>
  )
}

export default EditCitation

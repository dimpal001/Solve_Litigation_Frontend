import { useNavigate, useParams } from 'react-router-dom'
import CitationField from '../CreateCitationPage/CitationField'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { useEffect, useState } from 'react'
import Loading from '../../Components/Loading'
import { PrimaryButton } from '../../Components/Customs'
import { FaCheck } from 'react-icons/fa'
import { enqueueSnackbar } from 'notistack'
import ActField from '../CreateActPage/ActsField'

const EditCitation = () => {
  const { id } = useParams()
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
    judgements: '',
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
    setIsUpdating(true)
    try {
      const token = sessionStorage.getItem('token')
      const response = await axios.put(
        `${api}/api/solve_litigation/citation/update-citation/${id}`,
        { citationData: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      enqueueSnackbar(response.data.message, { variant: 'error' })
      navigate('/admin-dashboard/review-citation')
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div>
      <div>
        <p className='text-3xl text-center font-extrabold'>
          Edit {data && data.type === 'act' && 'Act'} Citation
        </p>
        <div>
          {!isLoading ? (
            <div className='px-16'>
              {data.type === 'act' ? (
                <ActField data={data} setData={setData} />
              ) : (
                <CitationField data={data} setData={setData} />
              )}
              <div className='pt-5 pb-10'>
                <PrimaryButton
                  title={'Update Citaion'}
                  isLoading={isUpdating}
                  onClick={handleUpdate}
                  loadingText={'Updating...'}
                  leftIcon={<FaCheck size={17} />}
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

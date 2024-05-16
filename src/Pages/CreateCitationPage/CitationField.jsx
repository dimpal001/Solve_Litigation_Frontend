import { Checkbox } from '@chakra-ui/react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { useContext, useEffect, useState } from 'react'
import Editor from './Editor'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import { Colors } from '../../Components/Colors'
import { enqueueSnackbar } from 'notistack'

const CitationField = ({ data, setData }) => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [listLaw, setListLaw] = useState([])
  const [listPOL, setListPOL] = useState([])
  const [listCourt, setListCourt] = useState([])
  const [listApellate, setListApellate] = useState([])
  const [apellateinputValue, setApellateinputValue] = useState('')
  const [lawinputValue, setLawinputValue] = useState('')
  const [POLinputValue, setPOLinputValue] = useState('')
  const {
    institutionName,
    index,
    caseNo,
    partyNameAppealant,
    partyNameRespondent,
    title,
    judgements,
    dateOfOrder,
    judgeName,
    headNote,
    referedJudgements,
    apellates,
    laws,
    pointOfLaw,
    equivalentCitations,
    advocatePetitioner,
    advocateRespondent,
    reportable,
    overRuled,
  } = data

  const handleLogout = () => {
    setUser(null)
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('user')
    navigate('/')
    enqueueSnackbar('Session Expired ! Please Login again', {
      variant: 'error',
    })
  }

  const fetchLaw = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/contents/law-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setListLaw(response.data)
    } catch (error) {
      console.error('Error fetching law:', error)
    }
  }

  const fetchCourt = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/contents/court-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setListCourt(response.data)
    } catch (error) {
      if (error.response.status === 401) {
        handleLogout()
      }
      console.error('Error fetching court:', error)
    }
  }

  const fetchPOL = async () => {
    const token = sessionStorage.getItem('token')
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/contents/pol-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setListPOL(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchApellate = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/contents/apellate-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setListApellate(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setData((prevData) => ({ ...prevData, [name]: checked }))
  }

  useEffect(() => {
    fetchLaw()
    fetchCourt()
    fetchPOL()
    fetchApellate()
  }, [])

  const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const filteredApellateList = listApellate.filter((item) => {
    return item.name.toLowerCase().includes(apellateinputValue.toLowerCase())
  })
  const filteredLawList = listLaw.filter((item) => {
    return item.name.toLowerCase().includes(lawinputValue.toLowerCase())
  })
  const filteredPOLList = listPOL.filter((item) => {
    return item.name.toLowerCase().includes(POLinputValue.toLowerCase())
  })

  return (
    <div className='flex flex-col gap-y-7 my-3 p-10 border border-slate-100 rounded-sm bg-slate-50'>
      <div className='form-control flex flex-col'>
        <label className='text-red-500'>
          <span className='text-lg font-extrabold'>
            Court (Institution) Name *
          </span>
        </label>
        <select
          className='p-2 rounded-sm'
          value={institutionName}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              institutionName: e.target.value,
            }))
          }
        >
          <option value=''>select Court</option>
          {listCourt.map((court, index) => (
            <option key={index} value={court.name}>
              {capitalizeString(court.name)}
            </option>
          ))}
        </select>
      </div>

      <div className='form-control'>
        <label>
          <span className='text-lg font-extrabold'>Index</span>
        </label>
        <Editor
          value={index}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              index: newContent,
            }))
          }
        />
      </div>

      <div className='form-control flex flex-col'>
        <label className='text-red-500'>
          <span className='text-lg font-extrabold'>Case No *</span>
        </label>
        <textarea
          className='p-2 rounded-sm border'
          value={caseNo}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, caseNo: e.target.value }))
          }
        ></textarea>
      </div>
      <div className='form-control'>
        <label className='text-red-500'>
          <span className='text-lg font-extrabold'>Party Name Appealant *</span>
        </label>
        <Editor
          value={partyNameAppealant}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              partyNameAppealant: newContent,
            }))
          }
        />
      </div>
      <div className='form-control'>
        <label className='text-red-500'>
          <span className='text-lg font-extrabold'>
            Party Name Respondent *
          </span>
        </label>
        <Editor
          value={partyNameRespondent}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              partyNameRespondent: newContent,
            }))
          }
        />
      </div>
      <div className='form-control flex flex-col'>
        <label className='text-red-500'>
          <span className='text-lg font-extrabold'>Title *</span>
        </label>
        <input
          className='p-2 rounded-sm border'
          value={title}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              title: e.target.value,
            }))
          }
        />
      </div>
      <div className='form-control'>
        <label className='text-red-500'>
          <span className='text-lg font-extrabold'>Judgements *</span>
        </label>
        <Editor
          value={judgements}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              judgements: newContent,
            }))
          }
        />
      </div>
      <div className='form-control flex flex-col'>
        <label className='text-red-500'>
          <span className='text-lg font-extrabold'>Date of Order *</span>
        </label>
        <input
          className='p-2 rounded-sm border'
          type='date'
          value={dateOfOrder}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              dateOfOrder: e.target.value,
            }))
          }
        />
      </div>
      <div className='form-control flex flex-col'>
        <label className='text-red-500'>
          <span className='text-lg font-extrabold'>Judge Name *</span>
        </label>
        <input
          className='p-2 rounded-sm border'
          value={judgeName}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              judgeName: e.target.value,
            }))
          }
        />
      </div>
      <div className='form-control'>
        <label className=''>
          <span className='text-lg font-extrabold'>Headnote</span>
        </label>
        <Editor
          value={headNote}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              headNote: newContent,
            }))
          }
        />
      </div>
      <div className='form-control flex flex-col'>
        <label className=''>
          <span className='text-lg font-extrabold'>Refered Judgements</span>
        </label>
        <textarea
          className='p-2 rounded-sm border'
          value={referedJudgements}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              referedJudgements: e.target.value,
            }))
          }
        />
      </div>
      <div className='form-control'>
        <label className='text-red-500'>
          <div className='flex items-center gap-5'>
            <div>
              <span className='text-lg font-extrabold'>Apellate Types *</span>
            </div>
            <div>
              <input
                className='p-2 rounded-sm border'
                value={apellateinputValue}
                color={Colors.primary}
                placeholder='Search...'
                onChange={(e) => setApellateinputValue(e.target.value)}
              />
            </div>
          </div>
        </label>
        <div className='flex gap-5 flex-wrap capitalize'>
          {filteredApellateList.map((apellate, index) => (
            <Checkbox
              key={index}
              name={`law_${apellate._id}`}
              isChecked={apellates.includes(apellate.name)}
              onChange={(e) => {
                const { checked } = e.target
                const apellateName = apellate.name
                setData((prevData) => ({
                  ...prevData,
                  apellates: checked
                    ? [...prevData.apellates, apellateName]
                    : prevData.apellates.filter(
                        (name) => name !== apellateName
                      ),
                }))
              }}
            >
              {apellate.name}
            </Checkbox>
          ))}
        </div>
      </div>
      <div className='form-control'>
        <label className='text-red-500'>
          <div className='flex items-center gap-5'>
            <div>
              <span className='text-lg font-extrabold'>Law *</span>
            </div>
            <div>
              <input
                className='p-2 rounded-sm border'
                value={lawinputValue}
                color={Colors.primary}
                placeholder='Search...'
                onChange={(e) => setLawinputValue(e.target.value)}
              />
            </div>
          </div>
        </label>
        <div className='flex gap-5 flex-wrap capitalize'>
          {filteredLawList.map((law, index) => (
            <Checkbox
              key={index}
              name={`law_${law._id}`}
              isChecked={laws.includes(law.name)}
              onChange={(e) => {
                const { checked } = e.target
                const lawName = law.name
                setData((prevData) => ({
                  ...prevData,
                  laws: checked
                    ? [...prevData.laws, lawName] // Store the name in the array
                    : prevData.laws.filter((name) => name !== lawName), // Remove the name from the array
                }))
              }}
            >
              {law.name}
            </Checkbox>
          ))}
        </div>
      </div>
      <div className='form-control'>
        <label className='text-red-500'>
          <div className='flex items-center gap-5'>
            <div>
              <span className='text-lg font-extrabold'>Point of Law *</span>
            </div>
            <div>
              <input
                className='p-2 rounded-sm border'
                value={POLinputValue}
                color={Colors.primary}
                placeholder='Search...'
                onChange={(e) => setPOLinputValue(e.target.value)}
              />
            </div>
          </div>
        </label>
        <div className='flex gap-5 flex-wrap  capitalize'>
          {filteredPOLList.map((pol) => (
            <Checkbox
              key={pol._id}
              name={`pol_${pol._id}`}
              isChecked={pointOfLaw.includes(pol.name)}
              onChange={(e) => {
                const { checked } = e.target
                const polName = pol.name
                setData((prevData) => ({
                  ...prevData,
                  pointOfLaw: checked
                    ? [...prevData.pointOfLaw, polName]
                    : prevData.pointOfLaw.filter((name) => name !== polName),
                }))
              }}
            >
              {pol.name}
            </Checkbox>
          ))}
        </div>
      </div>
      <div className='form-control flex flex-col'>
        <label className=''>
          <span className='text-lg font-extrabold'>Equivalent Citations</span>
        </label>
        <input
          className='p-2 rounded-sm border'
          value={equivalentCitations}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              equivalentCitations: e.target.value,
            }))
          }
        />
      </div>
      <div className='form-control flex flex-col'>
        <label className=''>
          <span className='text-lg font-extrabold'>Advocate Petitioner</span>
        </label>
        <textarea
          className='p-2 rounded-sm border'
          value={advocatePetitioner}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              advocatePetitioner: e.target.value,
            }))
          }
        />
      </div>
      <div className='form-control flex flex-col'>
        <label className=''>
          <span className='text-lg font-extrabold'>Advocate Respondent</span>
        </label>
        <textarea
          className='rounded-sm p-2 border'
          value={advocateRespondent}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              advocateRespondent: e.target.value,
            }))
          }
        />
      </div>
      {/* Checkboxes */}
      <div className='flex items-start gap-2'>
        <Checkbox
          className='mt-[6px]'
          name='reportable'
          isChecked={reportable}
          onChange={handleCheckboxChange}
        />
        <label>Reportable</label>
      </div>
      <div className='flex items-start gap-2'>
        <Checkbox
          className='mt-[6px]'
          name='overRuled'
          isChecked={overRuled}
          onChange={handleCheckboxChange}
        />
        <label>Over Ruled</label>
      </div>
    </div>
  )
}

export default CitationField

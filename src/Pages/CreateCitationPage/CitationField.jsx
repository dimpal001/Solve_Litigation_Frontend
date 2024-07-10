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
    whetherReported,
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
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('user')
    navigate('/')
    enqueueSnackbar('Session Expired ! Please Login again', {
      variant: 'error',
    })
  }

  const fetchLaw = async () => {
    try {
      const token = localStorage.getItem('token')
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
      const token = localStorage.getItem('token')
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
    const token = localStorage.getItem('token')
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
      const token = localStorage.getItem('token')
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
        <Editor
          value={caseNo}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              caseNo: newContent,
            }))
          }
        />
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
          <span className='text-lg font-extrabold'>
            Date of Order * :{' '}
            <span className='text-primary'>
              {dateOfOrder && new Date(dateOfOrder).toLocaleDateString()}
            </span>
          </span>
        </label>
        <input
          className='p-2 rounded-sm border'
          type='date'
          placeholder={new Date(dateOfOrder)}
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
                className='p-2 text-primary rounded-sm border'
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
            <label key={index} className='inline-flex items-center'>
              <input
                type='checkbox'
                name={`law_${apellate._id}`}
                className='form-checkbox'
                defaultChecked={apellates.includes(apellate.name)}
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
              />
              <span className='ml-2'>{apellate.name}</span>
            </label>
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
                className='p-2 text-primary rounded-sm border'
                value={lawinputValue}
                color={Colors.primary}
                placeholder='Search...'
                onChange={(e) => setLawinputValue(e.target.value)}
              />
            </div>
          </div>
        </label>
        <div className='flex gap-5 flex-wrap capitalize'>
          {filteredLawList
            .sort((a, b) => a.name.localeCompare(b.name)) // Sort the law list alphabetically
            .map((law, index) => (
              <label key={index} className='inline-flex items-center'>
                <input
                  type='checkbox'
                  name={`law_${law._id}`}
                  className='form-checkbox'
                  defaultChecked={laws.includes(law.name)}
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
                />
                <span className='ml-2'>{law.name}</span>
              </label>
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
                className='p-2 rounded-sm text-primary border'
                value={POLinputValue}
                color={Colors.primary}
                placeholder='Search...'
                onChange={(e) => setPOLinputValue(e.target.value)}
              />
            </div>
          </div>
        </label>
        <div className='flex gap-5 flex-wrap  capitalize'>
          {filteredPOLList
            .sort((a, b) => a.name.localeCompare(b.name)) // Sort the POL list alphabetically
            .map((pol) => (
              <label key={index} className='inline-flex items-center'>
                <input
                  type='checkbox'
                  name={`law_${pol._id}`}
                  className='form-checkbox'
                  defaultChecked={pointOfLaw.includes(pol.name)}
                  onChange={(e) => {
                    const { checked } = e.target
                    const polName = pol.name
                    setData((prevData) => ({
                      ...prevData,
                      pointOfLaw: checked
                        ? [...prevData.pointOfLaw, polName]
                        : prevData.pointOfLaw.filter(
                            (name) => name !== polName
                          ),
                    }))
                  }}
                />
                <span className='ml-2'>{pol.name}</span>
              </label>
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
        <Editor
          value={advocatePetitioner}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              advocatePetitioner: newContent,
            }))
          }
        />
      </div>
      <div className='form-control flex flex-col'>
        <label className=''>
          <span className='text-lg font-extrabold'>Advocate Respondent</span>
        </label>
        <Editor
          value={advocateRespondent}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              advocateRespondent: newContent,
            }))
          }
        />
      </div>
      <div className='form-control flex flex-col'>
        <label className=''>
          <span className='text-lg font-extrabold'>
            Whether Reported or Not
          </span>
        </label>
        <Editor
          value={whetherReported}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              whetherReported: newContent,
            }))
          }
        />
      </div>
      {/* Checkboxes */}
      <div className='flex items-start gap-2'>
        <label className='inline-flex items-center'>
          <input
            type='checkbox'
            name='reportable'
            defaultChecked={reportable}
            className='form-checkbox'
            onChange={handleCheckboxChange}
          />
          <span className='ml-2'>Reportable</span>
        </label>
      </div>
      <div className='flex items-start gap-2'>
        <label className='inline-flex items-center'>
          <input
            type='checkbox'
            name='overRuled'
            defaultChecked={overRuled}
            className='form-checkbox'
            onChange={handleCheckboxChange}
          />
          <span className='ml-2'>Over Ruled</span>
        </label>
      </div>
    </div>
  )
}

export default CitationField

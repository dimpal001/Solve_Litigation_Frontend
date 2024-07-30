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
  const [title1, setTitle1] = useState('')
  const [title2, setTitle2] = useState('')
  const [POLinputValue, setPOLinputValue] = useState('')
  const {
    institutionName,
    index,
    caseNo,
    partyNameAppealant,
    partyNameRespondent,
    title,
    judgements,
    diaryNo,
    dateOfOrder,
    dateOfHearing,
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

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      title: `${title1} versus ${title2}`,
    }))
  }, [title1, title2, setData])

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
      {/* 1... Court  */}
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
          <option value=''>Select Court</option>
          {listCourt.map((court, index) => (
            <option key={index} value={court.name}>
              {capitalizeString(court.name)}
            </option>
          ))}
        </select>
      </div>
      {/* 2... Case No  */}
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
      {/* 3... Party name appelant  */}
      <div className='form-control'>
        <label className='text-red-500'>
          <span className='text-lg font-extrabold'>Party Name Appelant *</span>
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
      {/* 4... Party name responded */}
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
      {/* 5... Title  */}
      <div className='form-control flex flex-col'>
        <label className='text-red-500'>
          <span className='text-lg font-extrabold'>Title *</span>
        </label>
        <div className='flex items-center gap-3'>
          <input
            type='text'
            className='p-2 rounded-sm border'
            value={title1}
            placeholder='Title 1'
            name={title1}
            onChange={(e) => setTitle1(e.target.value)}
          />
          <p>Versus</p>
          <input
            type='text'
            className='p-2 rounded-sm border'
            value={title2}
            placeholder='Title 2'
            name={title2}
            onChange={(e) => setTitle2(e.target.value)}
          />
        </div>
        {/* <input
          className='p-2 rounded-sm border'
          value={title}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              title: e.target.value,
            }))
          }
        /> */}
      </div>
      {/* 6... Advocate Petitioner */}
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
      {/* 7... Advocate Respondent */}
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
      {/* 8... Whether Reported or Not */}
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
      {/* 9... Headnote  */}
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
      {/* 10... Index  */}
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
      {/* 11... Date of hearing  */}
      <div className='form-control flex flex-col'>
        <label className=''>
          <span className='text-lg font-extrabold'>
            Date of Hearing :{' '}
            <span className='text-primary'>
              {dateOfHearing && new Date(dateOfHearing).toLocaleDateString()}
            </span>
          </span>
        </label>
        <input
          className='p-2 rounded-sm border'
          type='date'
          placeholder={new Date(dateOfHearing)}
          value={dateOfHearing}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              dateOfHearing: e.target.value,
            }))
          }
        />
      </div>
      {/* 12... Date of judgment  */}
      <div className='form-control flex flex-col'>
        <label className='text-red-500'>
          <span className='text-lg font-extrabold'>
            Date of Judgment * :{' '}
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
      {/* 13... Judgment  */}
      <div className='form-control'>
        <label className='text-red-500'>
          <span className='text-lg font-extrabold'>Judgments *</span>
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
      {/* ... Judge name  */}
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
      {/* 14... Apellate type  */}
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
      {/* 15... Law  */}
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
      {/* 16... Point of law  */}
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
      {/* 17... Refered judgment  */}
      <div className='form-control flex flex-col'>
        <label className=''>
          <span className='text-lg font-extrabold'>Refered Judgments</span>
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
      {/* 18... Equivalent citaions  */}
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
      {/* 19... Diary No - */}
      <div className='form-control flex flex-col'>
        <label className=''>
          <span className='text-lg font-extrabold'>Diary No : </span>
        </label>
        <input
          className='p-2 rounded-sm border'
          type='text'
          placeholder={'Enter diary no....'}
          value={diaryNo}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              diaryNo: e.target.value,
            }))
          }
        />
      </div>
      {/* 20... Reportable */}
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
      {/* 21... Over Ruled */}
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

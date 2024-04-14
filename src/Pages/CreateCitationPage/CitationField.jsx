import {
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  Input,
  Textarea,
} from '@chakra-ui/react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { useEffect, useState } from 'react'
import Editor from './Editor'

const CitationField = ({ data, setData }) => {
  const [listLaw, setListLaw] = useState([])
  const [listPOL, setListPOL] = useState([])
  const [listCourt, setListCourt] = useState([])
  const [listApellate, setListApellate] = useState([])
  const {
    institutionName,
    index,
    caseNo,
    partyNameAppealant,
    partyNameRespondent,
    title,
    judgments,
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

  return (
    <div className='flex flex-col gap-y-7 border my-3 p-10 shadow-2xl rounded-md'>
      <FormControl>
        <FormLabel className='text-red-500'>
          <span className='text-lg font-extrabold'>
            Court (Institution) Name *
          </span>
        </FormLabel>
        <Select
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
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>
          <span className='text-lg font-extrabold'>Index</span>
        </FormLabel>
        <Editor
          value={index}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              index: newContent,
            }))
          }
        />
      </FormControl>

      <FormControl>
        <FormLabel className='text-red-500'>
          <span className='text-lg font-extrabold'>Case No *</span>
        </FormLabel>
        <Textarea
          value={caseNo}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, caseNo: e.target.value }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel className='text-red-500'>
          <span className='text-lg font-extrabold'>Party Name Appealant *</span>
        </FormLabel>
        <Editor
          value={partyNameAppealant}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              partyNameAppealant: newContent,
            }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel className='text-red-500'>
          <span className='text-lg font-extrabold'>
            Party Name Respondent *
          </span>
        </FormLabel>
        <Editor
          value={partyNameRespondent}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              partyNameRespondent: newContent,
            }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel className='text-red-500'>
          <span className='text-lg font-extrabold'>Title *</span>
        </FormLabel>
        <Input
          value={title}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              title: e.target.value,
            }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel className='text-red-500'>
          <span className='text-lg font-extrabold'>Judgments *</span>
        </FormLabel>
        <Editor
          value={judgments}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              judgments: newContent,
            }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel className='text-red-500'>
          <span className='text-lg font-extrabold'>Date of Order *</span>
        </FormLabel>
        <Input
          type='date'
          value={dateOfOrder}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              dateOfOrder: e.target.value,
            }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel className='text-red-500'>
          <span className='text-lg font-extrabold'>Judge Name *</span>
        </FormLabel>
        <Input
          value={judgeName}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              judgeName: e.target.value,
            }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel className=''>
          <span className='text-lg font-extrabold'>Headnote</span>
        </FormLabel>
        <Editor
          value={headNote}
          onChange={(newContent) =>
            setData((prevData) => ({
              ...prevData,
              headNote: newContent,
            }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel className=''>
          <span className='text-lg font-extrabold'>Refered Judgements</span>
        </FormLabel>
        <Textarea
          value={referedJudgements}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              referedJudgements: e.target.value,
            }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel className='text-red-500'>
          <span className='text-lg font-extrabold'>Apellate Types *</span>
        </FormLabel>
        <div className='flex gap-5 capitalize'>
          {listApellate.map((apellate, index) => (
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
                    ? [...prevData.apellates, apellateName] // Store the name in the array
                    : prevData.apellates.filter((name) => name !== apellateName), // Remove the name from the array
                }))
              }}
            >
              {apellate.name}
            </Checkbox>
          ))}
        </div>
      </FormControl>
      <FormControl>
        <FormLabel className='text-red-500'>
          <span className='text-lg font-extrabold'>Law *</span>
        </FormLabel>
        <div className='flex flex-col gap-y-2 capitalize'>
          {listLaw.map((law, index) => (
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
      </FormControl>
      <FormControl>
        <FormLabel className='text-red-500'>
          <span className='text-lg font-extrabold'>Point of Law *</span>
        </FormLabel>
        <div className='flex flex-col gap-y-5 capitalize'>
          {listPOL.map((pol) => (
            <Checkbox
              key={pol._id}
              name={`pol_${pol._id}`}
              isChecked={pointOfLaw.includes(pol.name)} // Check if the name is already in the array
              onChange={(e) => {
                const { checked } = e.target
                const polName = pol.name // Get the name of the POL directly
                setData((prevData) => ({
                  ...prevData,
                  pointOfLaw: checked
                    ? [...prevData.pointOfLaw, polName] // Store the name in the array
                    : prevData.pointOfLaw.filter((name) => name !== polName), // Remove the name from the array
                }))
              }}
            >
              {pol.name}
            </Checkbox>
          ))}
        </div>
      </FormControl>
      <FormControl>
        <FormLabel className=''>
          <span className='text-lg font-extrabold'>Equivalent Citations</span>
        </FormLabel>
        <Input
          value={equivalentCitations}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              equivalentCitations: e.target.value,
            }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel className=''>
          <span className='text-lg font-extrabold'>Advocate Petitioner</span>
        </FormLabel>
        <Textarea
          value={advocatePetitioner}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              advocatePetitioner: e.target.value,
            }))
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel className=''>
          <span className='text-lg font-extrabold'>Advocate Respondent</span>
        </FormLabel>
        <Textarea
          value={advocateRespondent}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              advocateRespondent: e.target.value,
            }))
          }
        />
      </FormControl>
      {/* Checkboxes */}
      <FormControl className='flex items-start gap-2'>
        <Checkbox
          className='mt-[6px]'
          name='reportable'
          isChecked={reportable}
          onChange={handleCheckboxChange}
        />
        <FormLabel>Reportable</FormLabel>
      </FormControl>
      <FormControl className='flex items-start gap-2'>
        <Checkbox
          className='mt-[6px]'
          name='overRuled'
          isChecked={overRuled}
          onChange={handleCheckboxChange}
        />
        <FormLabel>Over Ruled</FormLabel>
      </FormControl>
    </div>
  )
}

export default CitationField
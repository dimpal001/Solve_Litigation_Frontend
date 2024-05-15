import { useState } from 'react'
import { CustomInput, PrimaryButton } from '../../Components/Customs'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Spacer,
} from '@chakra-ui/react'
import { enqueueSnackbar } from 'notistack'

import { api } from '../../Components/Apis'
import axios from 'axios'

const LegalAdvice = () => {
  const [caseDetails, setCaseDetails] = useState('')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [attachment, setAttachment] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formDataToSend = new FormData()

    formDataToSend.append('caseDetails', caseDetails)
    formDataToSend.append('attachment', attachment)

    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    }

    try {
      await axios.post(
        `${api}/api/solve_litigation/legal-advice`,
        formDataToSend,
        { headers }
      )
      enqueueSnackbar('Submission Successful. We will get back to you soon.', {
        variant: 'success',
      })
      setCaseDetails('')
      setAttachment(null)
      setIsSubmitting(false)
    } catch (error) {
      enqueueSnackbar('Submission Failed!', { variant: 'error' })
      setIsSubmitting(false)
      console.error(error)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf' && file.size <= 5242880 * 2) {
      setAttachment(file)
    } else {
      e.target.value = null
      setAttachment(null)
      enqueueSnackbar(
        'Attach a valid file! Please select a valid PDF file (less than 10 MB).',
        { variant: 'info' }
      )
    }
  }

  return (
    <div className='container mx-auto lg:px-[250px] px-4 py-8'>
      <h1 className='text-4xl font-bold mb-4'>Get Legal Advice</h1>
      <p className='mb-6'>
        If you need legal advice or assistance with your case, please fill out
        the form below and we&apos;ll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className='mb-8'>
        <div className='mb-6'>
          <label htmlFor='caseDetails' className='block font-medium mb-1'>
            Case Details
          </label>
          <textarea
            id='caseDetails'
            className='w-full rounded-sm px-4 py-2 border border-gray-300 resize-none'
            rows='6'
            placeholder='Please describe your case details here...'
            value={caseDetails}
            onChange={(e) => setCaseDetails(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Input file max size 10mb */}
        <FormControl>
          <FormLabel htmlFor='fileAttachments' fontWeight={'normal'}>
            Upload Relevant documents for the Case:
          </FormLabel>
          <CustomInput
            variant={'outline'}
            pt={1.5}
            type='file'
            name='fileAttachments'
            id='fileAttachments'
            onChange={handleFileChange}
          />
          <FormHelperText>
            The documents should be merged in a single pdf file and should be
            less than 10 mb.
          </FormHelperText>
        </FormControl>
        <Spacer h={6} />
        <PrimaryButton
          type={'submit'}
          size={'lg'}
          title={isSubmitting ? 'Submitting..' : 'Submit'}
          isLoading={isSubmitting}
        />
      </form>

      <div>
        <h2 className='text-2xl font-semibold mb-4'>Your Previous Requests</h2>
      </div>
    </div>
  )
}

export default LegalAdvice

import { useState } from 'react'
import { SLButton } from '../../Components/Customs'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { enqueueSnackbar } from 'notistack'

const CreateLawyer = () => {
  const [isCreating, setIsCreating] = useState(false)
  const initialFormData = {
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    specialist: '',
    state: '',
    district: '',
    address: '',
  }

  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        selectedService: checked
          ? [...prev.selectedService, value]
          : prev.selectedService.filter((service) => service !== value),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsCreating(true)
      const response = await axios.post(
        `${api}/api/solve_litigation/legal-advice/create-lawyer`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      enqueueSnackbar(response.data.message, { variant: 'success' })
      setFormData(initialFormData)
    } catch (error) {
      console.log(error)
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-center text-4xl p-3 font-bold'>Create Lawyer</h1>
      <form onSubmit={handleSubmit} className='gap-7 grid grid-cols-2 px-20'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Full Name
          </label>
          <input
            type='text'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Phone Number
          </label>
          <input
            type='text'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Password
          </label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Specialist
          </label>
          <input
            type='text'
            name='specialist'
            value={formData.specialist}
            onChange={handleChange}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            State
          </label>
          <input
            type='text'
            name='state'
            value={formData.state}
            onChange={handleChange}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            District
          </label>
          <input
            type='text'
            name='district'
            value={formData.district}
            onChange={handleChange}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Address
          </label>
          <input
            type='text'
            name='address'
            value={formData.address}
            onChange={handleChange}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-primary focus:border-primary'
          />
        </div>
        <div className=''>
          <SLButton
            isLoading={isCreating}
            iconColor={'white'}
            type={'submit'}
            title={'Create Lawyer'}
            variant={'primary'}
          />
        </div>
      </form>
    </div>
  )
}

export default CreateLawyer

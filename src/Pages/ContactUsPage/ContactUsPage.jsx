import { useState } from 'react';
import axios from 'axios'
import { PrimaryButton } from '../../Components/Customs';
import { api } from '../../Components/Apis';

const ContactUsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true)
      await axios.post(`${api}/api/solve_litigation/contact/contact`, {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        message: formData.message

      })

      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
      })

      setIsSubmitted(true)

    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold max-md:text-3xl mb-4 text-primary">Get in Touch</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl max-md:text-xl font-semibold mb-2">Contact Form</h2>
          {isSubmitted ? (
            <div className='bg-green-300 p-5 rounded-sm mb-4'>
              <p className='text-lg font-bold'>Thank you for contacting us!</p>
              <p className='text-base'>Your message has been received. We&apos;ll be in touch shortly. Have a wonderful day!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 focus:outline-primary border border-gray-300 rounded-sm w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border focus:outline-primary border-gray-300 rounded-sm w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 border focus:outline-primary border-gray-300 rounded-sm w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="mt-1 p-2 focus:outline-primary border border-gray-300 rounded-sm w-full resize-none"
                ></textarea>
              </div>
              <div>
                <PrimaryButton type={'submit'} isLoading={isSubmitting} loadingText={'Submitting...'} onClick={handleSubmit} title={'Submit'} />
              </div>
            </form>
          )}

        </div>
        <div>
          <h2 className="text-2xl max-md:text-xl font-semibold mb-2">Contact Details</h2>
          <p>Email: info@solvelitigation.com</p>
          <p>Phone: +916909115355</p>
          <p>Address: Police Bazar, Shillong 793001, Meghalaya</p>
          <div className='mt-5'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224.92794524049438!2d91.88074222724602!3d25.576752430684575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37507e92f63a5089%3A0x6c1444f2f7a93cd8!2sPolice%20Bazar%2C%20Shillong%2C%20Meghalaya!5e0!3m2!1sen!2sin!4v1714813528609!5m2!1sen!2sin" className='w-full h-[360px]' allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;

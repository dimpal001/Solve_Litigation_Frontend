import { useNavigate } from 'react-router-dom'
import { SLButton } from '../../Components/Customs'

const LegalAdvice = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')
  const userString = encodeURIComponent(JSON.stringify(user))
  const navigate = useNavigate()

  const redirectToChat = () => {
    if (
      user &&
      user.userType === 'guest' &&
      user.selectedService.includes('legalAdvice')
    ) {
      // const url = `http://localhost:5174/?token=${token}&user=${userString}`
      // const url = `http://192.168.1.24:5174/?token=${token}&user=${userString}`
      const url = `https://chat.solvelitigation.com/?token=${token}&user=${userString}`
      window.open(url, '_blank')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className='container mx-auto min-h-[calc(100vh-150px)] flex items-center lg:px-[250px] px-4 py-8'>
      <div>
        <h1 className='text-4xl text-primary font-bold mb-4'>
          Get Legal Advice
        </h1>
        <p className='text-lg mb-6 text-justify'>
          Access expert legal advice from the best lawyers working with Solve
          Litigation. Whether you&apos;re facing a legal issue, need
          clarification on a legal matter, or seeking guidance on legal
          procedures, our experienced legal professionals are here to assist
          you. Receive personalized advice tailored to your specific situation,
          ensuring that you make informed decisions and navigate the
          complexities of the legal system with confidence.
        </p>
        <div>
          <SLButton
            onClick={redirectToChat}
            title={'Chat with Lawyer'}
            variant={'primary'}
          />
        </div>
      </div>
    </div>
  )
}

export default LegalAdvice

import React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const TermsAndConditionsPage = () => {
  React.useEffect(() => {
    AOS.init()
    window.document.title = 'Terms and Conditions - Solve Litigation'
    scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <div className='flex justify-center w-full'>
      <div
        data-aos='fade-up'
        className='shadow-xl mt-10 border w-full max-w-6xl p-10 rounded-xl'
      >
        <div className='flex flex-col gap-10'>
          <div data-aos='fade-up'>
            <p className='text-center text-4xl max-md:text-3xl text-primary font-extrabold'>
              Terms and Conditions
            </p>
            <div className='text-left flex flex-col gap-3 p-1 py-4'>
              <h2 className='text-lg font-bold'>DISCLAIMER</h2>
              <p>
                The information provided by “Solve Litigation” is for general
                informational purposes only...
              </p>

              <h2 className='text-lg font-bold'>
                Not a Substitute for Legal Advice
              </h2>
              <p>
                The “Solve Litigation” is not intended to be a substitute for
                professional legal advice...
              </p>

              <h2 className='text-lg font-bold'>
                Compliance with Bar Council of India Rules
              </h2>
              <p>
                “Solve Litigation” is not intended to solicit clients or provide
                legal advice...
              </p>

              <h2 className='text-lg font-bold'>Limitation of Liability</h2>
              <p>
                In no event “Solve Litigation”, nor any of its Associates, or
                affiliates, shall be liable for any direct, indirect...
              </p>

              <h2 className='text-lg font-bold'>External Links Disclaimer</h2>
              <p>
                The “Solve Litigation” may contain links to third-party content
                or websites...
              </p>

              <h2 className='text-lg font-bold'>Acceptance of Terms</h2>
              <p>
                By using “Solve Litigation”, you hereby acknowledge and affirm
                that your interest in “Solve Litigation” is voluntary...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditionsPage

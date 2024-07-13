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
              <h2 className='text-2xl max-md:text-xl text-primary font-bold'>
                DISCLAIMER
              </h2>
              <p className='text-justify max-md:text-base'>
                The information provided by <strong>Solve Litigation</strong> is
                for general informational purposes only. All information is
                provided in good faith, however, it makes no representation or
                warranty of any kind, express or implied, regarding the
                accuracy, adequacy, validity, reliability, availability, or
                completeness of any information.
              </p>

              <h2 className='text-2xl max-md:text-xl text-primary font-bold'>
                Not a Substitute for Legal Advice
              </h2>
              <p className='text-justify max-md:text-base'>
                The <strong>Solve Litigation</strong> is not intended to be a
                substitute for professional legal advice, The use of the{' '}
                <strong>Solve Litigation</strong>
                does not create an attorney-client relationship between you and{' '}
                <strong>Solve Litigation</strong>. or any of our legal advisors.
                and we strongly recommend that you seek independent legal
                counsel for specific legal issues.
              </p>

              <h2 className='text-2xl max-md:text-xl text-primary font-bold'>
                Compliance with Bar Council of India Rules
              </h2>
              <p className='text-justify max-md:text-base'>
                <strong>Solve Litigation</strong> is not intended to solicit
                clients or provide legal advice. Any content or communication
                through the <strong>Solve Litigation</strong> is purely for
                informational purposes. <strong>Solve Litigation</strong>does
                not guarantee the outcomes of any legal issues discussed or the
                accuracy of the legal information provided.
              </p>

              <h2 className='text-2xl max-md:text-xl text-primary font-bold'>
                Limitation of Liability
              </h2>
              <p className='text-justify max-md:text-base'>
                In no event <strong>Solve Litigation</strong>, nor any of its
                Associates, or affiliates, shall be liable for any direct,
                indirect, incidental, special, consequential, or punitive
                damages whatsoever, including without limitation, damages for
                loss of profits, data, use, goodwill, or other intangible
                losses, resulting from <br />
                (i) Your use or inability to use the Platform;
                <br />
                (ii) Any unauthorized access to or use of our servers and/or any
                personal information stored therein; <br />
                (iii) Any interruption or cessation of transmission to or from
                the Platform; <br />
                (iv) Any bugs, viruses, trojan horses, or the like that may be
                transmitted to or through our Platform by any third party;{' '}
                <br />
                (v) Any errors or omissions in any content or for any loss or
                damage incurred as a result of the use of any content posted,
                emailed, transmitted, or otherwise made available through the
                Platform; and/or <br />
                (vi) The defamatory, offensive, or illegal conduct of any third
                party.
              </p>

              <h2 className='text-2xl max-md:text-xl text-primary font-bold'>
                External Links Disclaimer
              </h2>
              <p className='text-justify max-md:text-base'>
                The <strong>Solve Litigation</strong> may contain links to send
                documents from this platform to third parties or content
                belonging to or originating from third parties. Such external
                links are not investigated, monitored, or checked for accuracy,
                adequacy, validity, reliability, availability, or completeness
                by us. We do not warrant, endorse, guarantee, or assume
                responsibility for the accuracy or reliability of any
                information offered by third-party websites/ linked through the
                Platform or any feature linked in any manner. We will not be a
                party to or in any way be responsible for monitoring any
                transaction between you and third-party providers of products or
                services.
              </p>

              <h2 className='text-2xl max-md:text-xl text-primary font-bold'>
                Acceptance of Terms
              </h2>
              <p className='text-justify max-md:text-base'>
                By using <strong>Solve Litigation</strong>, you hereby
                acknowledge and affirm that your interest in{' '}
                <strong>Solve Litigation</strong> is voluntary and there has
                been no attempt to Solicit, advertise or enter your engagement
                by <strong>Solve Litigation</strong> or its Associates. All
                consent of this Website are the intellectual property of{' '}
                <strong>Solve Litigation</strong> and agree to its terms. If you
                do not agree with this disclaimer or any part of it, you must
                not use the Solve Litigation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditionsPage

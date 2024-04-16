import { Link } from 'react-router-dom'
import { PrimaryButton } from '../../Components/Customs'
import Image from '../../assets/hero_thumbnail.svg'
import { useContext, useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos'
import { UserContext } from '../../UserContext'
const HomePage = () => {
  const { user } = useContext(UserContext)
  useEffect(() => {
    window.document.title = 'Solve Litigation'
    AOS.init()
  }, [])
  return (
    <div>
      <div className='lg:flex lg:h-[600px] max-sm:pb-[100px] items-center gap-10 px-10 lg:px-32'>
        <div data-aos='fade-up' className='lg:w-[50%]'>
          <div className='py-10'>
            <p className='lg:text-3xl text-lg py-2 font-extrabold leading-tight'>
              Solve your legal challenges with
            </p>
            <p className='lg:text-5xl bg-primary text-center py-3 text-white -skew-x-6 text-3xl font-extrabold leading-tight' >Solve Litigation</p>
          </div>
          <p className='text-lg pb-10'>
            At Solve Litigation, we&apos;re dedicated to helping individuals,
            firms and companies navigate the complex world of law. Whether
            you&apos;re looking for relevant judgments for your legal research,
            or expert legal advice and services, our comprehensive tools and
            resources have got you covered.
          </p>
          <Link to={user ? '/citations' : '/register'}>
            <PrimaryButton title={'Get Started'} />
          </Link>
        </div>
        <div
          data-aos='zoom-in-up'
          className='lg:w-[50%] flex max-md:pt-10 justify-center relative z-[5] items-center'
        >
          <img style={{ width: '100%' }} className='relative z-[3]' src={Image} alt='' />
          <div className='absolute h-[200px] lg:right-[120px] filter blur-[200px] rounded-full w-[200px] z-[2] bg-primary'></div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

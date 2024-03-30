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
      <div className='lg:flex gap-10 px-10 lg:px-32'>
        <div data-aos='fade-up' className='lg:w-[50%]'>
          <p className='lg:text-5xl text-3xl font-extrabold leading-tight py-10'>
            Solve your legal challenges with Solve Litigation
          </p>
          <p className='text-lg pb-10'>
            At Solve Litigation, we&apos;re dedicated to helping individuals,
            firms and companies navigate the complex world of law. Whether
            you&apos;re looking for relevant judgments for your leagal research,
            or expert legal advice and services, our comprehensive tools and
            resources have got you covered.
          </p>
          <Link to={user ? '/citations' : '/register'}>
            <PrimaryButton title={'Get Started'} />
          </Link>
        </div>
        <div
          data-aos='zoom-in-up'
          className='lg:w-[50%] flex max-md:pt-10 justify-center items-center'
        >
          <img style={{ width: '100%' }} src={Image} alt='' />
        </div>
      </div>
    </div>
  )
}

export default HomePage

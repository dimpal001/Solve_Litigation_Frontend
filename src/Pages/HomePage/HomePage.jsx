import { Link } from 'react-router-dom'
import { PrimaryButton } from '../../Components/Customs'
import Image from '../../assets/hero_thumbnail.svg'
const HomePage = () => {
  return (
    <div>
      <div className='flex gap-10'>
        <div className='w-[50%]'>
          <p className='text-5xl font-extrabold leading-tight py-10'>
            Solve your legal challenges with Solve Litigation
          </p>
          <p className='text-lg pb-10'>
            At Solve Litigation, we&apos;re dedicated to helping individuals,
            firms and companies navigate the complex world of law. Whether
            you&apos;re looking for relevant judgments for your leagal research,
            or expert legal advice and services, our comprehensive tools and
            resources have got you covered.
          </p>
          <Link to={'/register'}>
            <PrimaryButton title={'Get Started'} />
          </Link>
        </div>
        <div className='w-[50%] flex justify-center items-center'>
          <img style={{ width: '100%' }} src={Image} alt='' />
        </div>
      </div>
    </div>
  )
}

export default HomePage

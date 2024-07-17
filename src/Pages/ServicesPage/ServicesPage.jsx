import Judgement from '../../assets/judgement.png'
import Advice from '../../assets/advice.png'
import Study from '../../assets/study.png'
const ServicesPage = () => {
  return (
    <div>
      <div className='p-10 lg:px-[250px]'>
        <p className='text-4xl font-bold text-center'>Facilities</p>

        {/* Judgements Section */}
        <div className='flex max-md:pt-20 max-md:flex-col py-10 gap-10 justify-center items-center'>
          <div>
            <img
              src={Judgement}
              className='w-[1000px] max-md:w-[160px]'
              alt=''
            />
          </div>
          <div>
            <p className='text-3xl font-bold py-3 text-primary'>Judgements</p>
            <p className='text-lg text-justify'>
              The latest judgements of various courts and tribunal of India by a
              comprehensive database covered with a wide range of legal topics
              providing valuable insights into legal precedents, interpretations
              and informations.
            </p>
          </div>
        </div>

        {/* Legal Advice Section */}
        <div className='flex max-md:flex-col flex-row-reverse py-10 gap-10 justify-center items-center'>
          <div>
            <img src={Advice} className='w-[1000px] max-md:w-[160px]' alt='' />
          </div>
          <div>
            <p className='text-3xl font-bold py-3 text-primary'>Facilities</p>
            <p className='text-lg text-justify'>
              Self tailored to your specific situation and navigate the
              complexities of the legal system with confidence to merged with
              system of paperies system of judiciary. Now available to your
              doorstep, spend less time to focus on craft your arguments.
            </p>
          </div>
        </div>

        {/* Study Materials Section */}
        <div className='flex max-md:flex-col py-10 gap-10 justify-center items-center'>
          <div>
            <img src={Study} className='w-[1000px] max-md:w-[160px]' alt='' />
          </div>
          <div>
            <p className='text-3xl font-bold py-3 text-primary'>
              Study Materials
            </p>
            <p className='text-lg text-justify'>
              A comprehensive collection of study with{' '}
              <strong>Solve Litigation</strong>, would enhance your ability on
              legal concepts, principles and doctrines at the need of hours for
              research.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesPage

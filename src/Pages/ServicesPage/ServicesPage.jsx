import Judgement from '../../assets/judgement.png'
import Advice from '../../assets/advice.png'
import Study from '../../assets/study.png'
const ServicesPage = () => {
  return (
    <div>
      <div className='p-10 lg:px-[250px]'>
        <p className='text-4xl font-bold text-center'>Services Page</p>

        {/* Judgements Section */}
        <div className='flex max-md:pt-20 max-md:flex-col py-10 gap-10 justify-center items-center'>
          <div>
            <img src={Judgement} className='w-[1000px]' alt="" />
          </div>
          <div>
            <p className='text-3xl font-bold py-3 text-primary'>Judgements</p>
            <p className="text-lg max-md:text-justify">
              Stay informed with the latest judgments ordered by the different courts of India. Our comprehensive database covers a wide range of legal topics, providing valuable insights into legal precedents, interpretations, and decisions. Whether you&apos;re a legal professional, student, or enthusiast, our curated collection of judgments will keep you updated and informed.
            </p>
          </div>
        </div>

        {/* Legal Advice Section */}
        <div className='flex max-md:flex-col flex-row-reverse py-10 gap-10 justify-center items-center'>
          <div>
            <img src={Advice} className='w-[1000px]' alt="" />
          </div>
          <div>
            <p className='text-3xl font-bold py-3 text-primary'>Legal Advice</p>
            <p className="text-lg max-md:text-justify">
              Access expert legal advice from the best lawyers working with Solve Litigation. Whether you&apos;re facing a legal issue, need clarification on a legal matter, or seeking guidance on legal procedures, our experienced legal professionals are here to assist you. Receive personalized advice tailored to your specific situation, ensuring that you make informed decisions and navigate the complexities of the legal system with confidence.
            </p>
          </div>
        </div>

        {/* Study Materials Section */}
        <div className='flex max-md:flex-col py-10 gap-10 justify-center items-center'>
          <div>
            <img src={Study} className='w-[1000px]' alt="" />
          </div>
          <div>
            <p className='text-3xl font-bold py-3 text-primary'>Study Materials</p>
            <p className="text-lg max-md:text-justify">
              Empower your legal education with our comprehensive collection of study materials and resources. Whether you&apos;re a law student preparing for exams, conducting research, or simply seeking to expand your legal knowledge, our curated selection of study materials, including textbooks, articles, case studies, and question-answer guides, will support your academic journey. Enhance your understanding of legal concepts, principles, and doctrines, and excel in your studies with Solve Litigation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

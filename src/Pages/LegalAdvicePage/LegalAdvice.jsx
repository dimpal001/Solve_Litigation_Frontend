import { useState } from 'react';
import { PrimaryButton } from '../../Components/Customs';

const LegalAdvice = () => {
    const [caseDetails, setCaseDetails] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    return (
        <div className="container mx-auto lg:px-[250px] px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">Get Legal Advice</h1>
            <p className="mb-6">
                If you need legal advice or assistance with your case, please fill out
                the form below and we&apos;ll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="mb-8">
                <div className="mb-6">
                    <label htmlFor="caseDetails" className="block font-medium mb-1">
                        Case Details
                    </label>
                    <textarea
                        id="caseDetails"
                        className="w-full rounded-sm px-4 py-2 border border-gray-300 resize-none"
                        rows="6" placeholder='Please describe your case details here...'
                        value={caseDetails}
                        onChange={(e) => setCaseDetails(e.target.value)}
                        required
                    ></textarea>
                </div>
                <PrimaryButton type={'submit'} size={'lg'} title={'Submit'} />
            </form>

            <div>
                <h2 className="text-2xl font-semibold mb-4">Your Previous Requests</h2>
            </div>
        </div>
    );
};

export default LegalAdvice;

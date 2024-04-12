import { Link } from "react-router-dom"
import { PrimaryOutlineButton } from "../../Components/Customs"

const ManageStaffPage = () => {
    return (
        <div data-aos='fade-up' className='px-7'>
            <p className='text-3xl font-extrabold pb-5 text-center'>Manage Staff</p>
            <div className="flex justify-center gap-5">
                <Link to={'/admin-dashboard/manage-staff/staff-list'}>
                    <PrimaryOutlineButton title={'Staff List'} />
                </Link>
                <Link to={'/admin-dashboard/manage-staff/create-staff'}>
                    <PrimaryOutlineButton title={'Create Staff'} />
                </Link>
            </div>
        </div>
    )
}

export default ManageStaffPage
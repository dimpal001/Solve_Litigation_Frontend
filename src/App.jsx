import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import LoginPage from './Pages/LoginPage/LoginPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import ServicesPage from './Pages/ServicesPage/ServicesPage'
import ContactUsPage from './Pages/ContactUsPage/ContactUsPage'
import Navbar from './Components/Navbar'
import AdminDashboard from './Pages/AdminPanel/AdminDashboard'
import { useContext } from 'react'
import { UserContext } from './UserContext'
import Error404 from './Components/Error404'
import ProfileSettingsPage from './Pages/ProfileSettingsPage/ProfileSettingsPage'
import Layout from './Pages/AdminPanel/Layout'
import CreateCitationPage from './Pages/CreateCitationPage/CreateCitationPage'
import EditCitationPage from './Pages/EditCitationPage/EditCitationPage'
import ReviewCitationPage from './Pages/ReviewCitationPage/ReviewCitationPage'
import CitationsPage from './Pages/CitationsPage/CitationsPage'
import ReviewCitation from './Pages/ReviewCitationPage/ReviewCitation'
import EditCitation from './Pages/EditCitationPage/EditCitation'
import ViewCitation from './Pages/ViewCitationPage/ViewCitation'
import StudyMaterialDashboard from './Pages/StudyMaterials/StudyMaterialDashboard'
import Footer from './Components/Footer'
import EmailVerify from './Components/EmailVerify'
import ReVerifyEmail from './Components/ReVerifyEmail'
import ResetPassword from './Pages/ResetPasswordPage/ResetPassword'
import ResetLinkPage from './Pages/ResetPasswordPage/ResetLinkPage'
import LegalAdvice from './Pages/LegalAdvicePage/LegalAdvice'
import AllContactForms from './Pages/ContactUsPage/AllContactForms'
import ReviewAct from './Pages/ReviewActs/ReviewAct'
import LegalAdviceRequests from './Pages/LegalAdviceAdmin/LegaAdviceRequests'
import ManageUserPage from './Pages/ManageUser/ManageUserPage'
import UserList from './Pages/ManageUser/UserList'
import CreateStaffpage from './Pages/ManageUser/CreateStaffpage'
import MakeARequest from './Pages/LegalAdvicePage/MakeARequest'
import PreviousRequests from './Pages/LegalAdvicePage/PreviousRequests'
import AllNotifications from './Pages/ManageNotification/AllNotifications'
import Chat from './Pages/ChatPage/Chat'
import ManageLawyer from './Pages/ManageLawyer/ManageLawyer'
import LawyerList from './Pages/ManageLawyer/LawyerList'
import CreateLawyer from './Pages/ManageLawyer/CreateLawyer'
import LawyerProfile from './Pages/ManageLawyer/LawyerProfile'
import CreateMaterial from './Pages/StudyMaterials/CreateMaterial'
import ManageTopic from './Pages/ManageTopic/ManageTopic'
import ViewMaterial from './Pages/StudyMaterials/ViewMaterial'
import StudyMaterialUser from './Pages/StudyMaterials/StudyMaterialUser'
import DetailedQuestionPage from './Pages/StudyMaterials/DetailedQuestionPage'

const App = () => {
  const { user } = useContext(UserContext)

  return (
    <div className='text-secondary text-xl varela-round-regular min-h-screen'>
      {/* Navbar Section */}
      <BrowserRouter>
        {(!user || user.userType === 'guest') && (
          <div className='relative z-30'>
            <Navbar />
          </div>
        )}

        {/* Body Section  */}
        <div className='min-h-screen'>
          <Routes>
            <Route
              path='/'
              element={
                !user ? (
                  <HomePage />
                ) : user &&
                  (user.userType === 'admin' || user.userType === 'staff') ? (
                  <Navigate to='/admin-dashboard' />
                ) : (
                  <HomePage />
                )
              }
            />
            {user &&
              (user.userType === 'admin' || user.userType === 'staff') && (
                <Route path='/admin-dashboard/' element={<Layout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route
                    path='review-citation'
                    element={<ReviewCitationPage />}
                  />
                  <Route path='review-acts' element={<ReviewAct />} />
                  <Route
                    path='review-citation/:id'
                    element={<ReviewCitation />}
                  />
                  <Route
                    path='manage-users/create-staff'
                    element={<CreateStaffpage />}
                  />
                  <Route
                    path='manage-users/users-list'
                    element={<UserList />}
                  />
                  <Route path='manage-users' element={<ManageUserPage />} />
                  <Route
                    path='all-notifications'
                    element={<AllNotifications />}
                  />
                  <Route
                    path='legal-advice-requests'
                    element={<LegalAdviceRequests />}
                  />
                  <Route path='contact-forms' element={<AllContactForms />} />
                  <Route
                    path='create-citation'
                    element={<CreateCitationPage />}
                  />
                  <Route path='edit-citation' element={<EditCitationPage />} />
                  <Route path='edit-citation/:id' element={<EditCitation />} />
                  <Route
                    path='detailed-citation/:id'
                    element={<ViewCitation />}
                  />
                  <Route
                    path='study-materials'
                    element={<StudyMaterialDashboard />}
                  />
                  <Route path='create-material' element={<CreateMaterial />} />
                  <Route path='manage-topic' element={<ManageTopic />} />
                  <Route path='view-material' element={<ViewMaterial />} />
                  <Route
                    path='profile-settings'
                    element={<ProfileSettingsPage />}
                  />

                  <Route path='manage-lawyer' element={<ManageLawyer />} />
                  <Route path='lawyer-list' element={<LawyerList />} />
                  <Route path='create-lawyer' element={<CreateLawyer />} />
                  <Route path='lawyer/:id' element={<LawyerProfile />} />
                </Route>
              )}
            {!user && <Route path='/login' element={<LoginPage />} />}
            {!user && <Route path='/register' element={<RegisterPage />} />}
            {!user && (
              <Route path='reset-password' element={<ResetPassword />} />
            )}
            {user && (
              <Route
                path='/profile-settings'
                element={<ProfileSettingsPage />}
              />
            )}
            {user && user.isVerified && (
              <Route path='/citations' element={<CitationsPage />} />
            )}
            <Route path='/detailed-citation/:id' element={<ViewCitation />} />
            {user && !user.isVerified && (
              <Route path='/verify-email' element={<ReVerifyEmail />} />
            )}
            {user && <Route path='/legal-advice' element={<LegalAdvice />} />}
            {user && (
              <Route path='/make-a-request' element={<MakeARequest />} />
            )}
            {user && <Route path='/chat' element={<Chat />} />}
            {user && (
              <Route path='/previous-requests' element={<PreviousRequests />} />
            )}
            <Route path='/verify-email/:token' element={<EmailVerify />} />
            <Route path='/reset-password/:token' element={<ResetLinkPage />} />
            <Route path='/services' element={<ServicesPage />} />
            <Route path='/contact-us' element={<ContactUsPage />} />

            {user && (
              <Route path='/study-material' element={<StudyMaterialUser />} />
            )}
            {user && (
              <Route
                path='/detailed-question/:topicId/:questionId'
                element={<DetailedQuestionPage />}
              />
            )}

            <Route path='/*' element={<Error404 />} />
          </Routes>
        </div>
        <div
          className={`${user && user.userType === 'admin' && 'hidden'} ${
            user && user.userType === 'staff' && 'hidden'
          }`}
        >
          <Footer />
        </div>

        {/* Footer Section  */}
      </BrowserRouter>
    </div>
  )
}

export default App

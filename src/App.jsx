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
import ManageUserPage from './Pages/ManageUser/ManageUserPage'
import UserList from './Pages/ManageUser/UserList'
import CreateStaffpage from './Pages/ManageUser/CreateStaffpage'
import AllNotifications from './Pages/ManageNotification/AllNotifications'
import Chat from './Pages/ChatPage/Chat'
import ManageLawyer from './Pages/ManageLawyer/ManageLawyer'
import LawyerList from './Pages/ManageLawyer/LawyerList'
import CreateLawyer from './Pages/ManageLawyer/CreateLawyer'
import LawyerProfile from './Pages/ManageLawyer/LawyerProfile'
import ManageTopic from './Pages/ManageTopic/ManageTopic'
import StudyMaterialUser from './Pages/StudyMaterials/StudyMaterialUser'
import DetailedQuestionPage from './Pages/StudyMaterials/DetailedQuestionPage'
import TermsAndConditionsPage from './Components/TermsAndConditionsPage'
import ManageQA from './Pages/StudyMaterials/ManageQA'
import LiquidTextMainPage from './Pages/CreateLTModal.jsx/LiquidTextMainPage'
import LiquidTextHomePage from './Pages/CreateLTModal.jsx/LiquidTextHomePage'

const App = () => {
  const { user } = useContext(UserContext)

  return (
    <div className='text-secondary text-xl varela-round-regular min-h-screen'>
      {/* Navbar Section */}
      <BrowserRouter>
        {(!user || user.userType === 'guest' || user.userType === 'lawyer') && (
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
                  <Route path='contact-forms' element={<AllContactForms />} />
                  <Route
                    path='create-citation'
                    element={<CreateCitationPage />}
                  />
                  <Route path='edit-citation/:id' element={<EditCitation />} />
                  <Route
                    path='detailed-citation/:id'
                    element={<ViewCitation />}
                  />
                  <Route
                    path='study-materials'
                    element={<StudyMaterialDashboard />}
                  />
                  <Route path='manage-QA' element={<ManageQA />} />
                  <Route path='manage-topic' element={<ManageTopic />} />
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
            {user && user.isVerified && (
              <Route
                path='/prepare-argument'
                element={<LiquidTextHomePage />}
              />
            )}
            {user && user.isVerified && (
              <Route
                path='/prepare-argument/:id'
                element={<LiquidTextMainPage />}
              />
            )}
            <Route path='/detailed-citation/:id' element={<ViewCitation />} />
            {user && !user.isVerified && (
              <Route path='/verify-email' element={<ReVerifyEmail />} />
            )}
            <Route path='/legal-advice' element={<LegalAdvice />} />
            {user && <Route path='/chat' element={<Chat />} />}
            <Route path='/verify-email/:token' element={<EmailVerify />} />
            <Route path='/reset-password/:token' element={<ResetLinkPage />} />
            <Route path='/services' element={<ServicesPage />} />
            <Route path='/contact-us' element={<ContactUsPage />} />

            {user && (
              <Route path='/study-material' element={<StudyMaterialUser />} />
            )}
            {user && (
              <Route
                path='/detailed-question/:questionId'
                element={<DetailedQuestionPage />}
              />
            )}

            <Route
              path='/terms-and-conditions'
              element={<TermsAndConditionsPage />}
            />
            <Route path='/*' element={user ? <Error404 /> : <LoginPage />} />
          </Routes>
        </div>
        <div
          className={`${user && user.userType === 'admin' && 'hidden'} ${
            user && user.userType === 'staff' && 'hidden'
          }`}
        >
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

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

const App = () => {
  const { user } = useContext(UserContext)

  return (
    <div className='text-secondary text-xl varela-round-regular min-h-screen'>
      {/* Navbar Section */}
      <BrowserRouter>
        {(!user || user.userType !== 'admin') && (
          <div>
            <Navbar />
          </div>
        )}

        {/* Body Section  */}
        <div>
          <Routes>
            <Route
              path='/'
              element={
                !user ? (
                  <HomePage />
                ) : user && user.userType === 'admin' ? (
                  <Navigate to='/admin-dashboard' />
                ) : (
                  <HomePage />
                )
              }
            />
            {user && user.userType === 'admin' && (
              <Route path='/admin-dashboard/' element={<Layout />}>
                <Route index element={<AdminDashboard />} />
                <Route
                  path='review-citation'
                  element={<ReviewCitationPage />}
                />
                <Route
                  path='review-citation/:id'
                  element={<ReviewCitation />}
                />
                <Route
                  path='create-citation'
                  element={<CreateCitationPage />}
                />
                <Route path='edit-citation' element={<EditCitationPage />} />
                <Route path='edit-citation/:id' element={<EditCitation />} />
                <Route
                  path='profile-settings'
                  element={<ProfileSettingsPage />}
                />
              </Route>
            )}
            {!user && <Route path='/login' element={<LoginPage />} />}
            {!user && <Route path='/register' element={<RegisterPage />} />}
            {user && (
              <Route
                path='/profile-settings'
                element={<ProfileSettingsPage />}
              />
            )}
            {user && <Route path='/citations' element={<CitationsPage />} />}
            {user && (
              <Route path='/detailed-citation/:id' element={<ViewCitation />} />
            )}
            <Route path='/services' element={<ServicesPage />} />
            <Route path='/contact-us' element={<ContactUsPage />} />
            <Route path='/*' element={<Error404 />} />
          </Routes>
        </div>

        {/* Footer Section  */}
      </BrowserRouter>
    </div>
  )
}

export default App

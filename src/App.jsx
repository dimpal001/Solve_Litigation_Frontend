import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import LoginPage from './Pages/LoginPage/LoginPage'
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import ServicesPage from './Pages/ServicesPage/ServicesPage'
import ContactUsPage from './Pages/ContactUsPage/ContactUsPage'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <div className='text-secondary text-xl varela-round-regular px-10 md:px-32'>
      {/* Navbar Section */}
      <BrowserRouter>
        <div>
          <Navbar />
        </div>

        {/* Body Section  */}
        <div>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/services' element={<ServicesPage />} />
            <Route path='/contact-us' element={<ContactUsPage />} />
          </Routes>
        </div>

        {/* Footer Section  */}
      </BrowserRouter>
      <div></div>
    </div>
  )
}

export default App

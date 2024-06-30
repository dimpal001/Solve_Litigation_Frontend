// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from './UserContext.jsx'
import { SnackbarProvider } from 'notistack'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ChakraProvider>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <App />
        </SnackbarProvider>
      </ChakraProvider>
    </UserProvider>
  </React.StrictMode>
)

import '../styles/globals.css'
import {AuthProvider} from '../contents/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
  <AuthProvider >
  <Component {...pageProps} /> 
  </AuthProvider>
    )
}

export default MyApp

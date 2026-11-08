import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import AppRouter from './routes/AppRouter'
import './styles/App.css'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App

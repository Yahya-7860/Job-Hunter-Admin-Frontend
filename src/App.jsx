import './App.css'
import JobForm from './components/JobForm'
import ProtectedRoute from './components/ProtectedRoute'
import JobCardPage from './page/JobCardPage';
import Login from './page/Login'
import { Route, Routes } from "react-router-dom";


function App() {

  return (
    <>
      <Routes>
        {/* <Route path='/' element={<ProtectedRoute element={JobForm} />} /> */}
        <Route path='/' element={<JobForm />} />
        <Route path='/job-cards' element={<JobCardPage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>

  )
}

export default App

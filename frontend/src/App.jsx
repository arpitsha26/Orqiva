import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleProvider } from '../utils/firebase'
import api from '../utils/axios'
import Home from './pages/Home'
import { useEffect } from 'react'
import getCurrentUser from './features/getCurrentUser'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice'

function App() {

  const dispatch=useDispatch()

  useEffect(()=>{
    const getUser=async()=>{
      const data=await getCurrentUser()

      dispatch(setUserData(data))
    }
    getUser()
  },[])


  return (
   <>
     <Home/>
   </>
  )
}

export default App

import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

function App() {

  let firstRender = false;

  const startWebService = async () => {
    toast.promise(
      fetch('https://bunnyjeans-api.onrender.com/',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
      }
      )
        .then(function(response){
          // console.log(response)
          firstRender = true;
          return response.json()
        }),
       {
         loading: 'Starting web service...',
         success: <b>Service is started</b>,
         error: <b>Something error</b>,
       }
     );
    
  }

  useEffect(() => {
    if (firstRender) return;
    startWebService()
  }, [])

  return (
    <>
      <Toaster />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App

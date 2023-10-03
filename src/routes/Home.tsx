import toast, { Toaster } from "react-hot-toast"
import CollectionsHome from "../components/CollectionsHome"
import Event from "../components/Event"
import { useEffect } from "react";

// function useFirstRender() {
//   const ref = useRef(true);
//   const firstRender = ref.current;
//   ref.current = false;
//   return firstRender;
// }

const Home = () => {

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
  }, [firstRender])

  return (
    <div>
      <Toaster />
      <Event />
      <CollectionsHome />
    </div>
  )
}

export default Home
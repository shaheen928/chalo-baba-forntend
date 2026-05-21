 
 import { Outlet } from 'react-router-dom'
  import Header from './components/Header'
import Footer from './components/Footer'
 import { ToastContainer } from 'react-toastify' 
 import 'react-toastify/dist/ReactToastify.css'  
import ProfileScereen from './screens/ProfileScereen'
 function App() {
   return ( 

    <div className="flex flex-col min-h-screen w-full">

       <Header /> 

      <ToastContainer />

      <main className="flex-1 w-full py-4 bg-gray-50 overflow-x-hidden">

        <div className="w-full px-4 pt-26 ">
          
           <Outlet /> 
        
        </div>

      </main>
       <Footer />

    </div>
  )
}

export default App

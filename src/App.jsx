
import './App.css'
import AppRoutes from "./routes/AppRoutes.jsx";
import {Header, Footer} from "./core/components/index.js"



function App() {

  return (
    <>
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
                <AppRoutes />
            </div> 
            <Footer />
        </div>
    </>
  )
}

export default App

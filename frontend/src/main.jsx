import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById('root')).render(
     <BrowserRouter>
     <NavBar/>
     <App />
     <ToastContainer/>
     </BrowserRouter>

)

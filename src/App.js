import logo from './logo.svg';
import './App.css';
import AdminSignup from './components/AdminSignup';
import AdminSignin from './components/AdminSignin';
import DonarSignup from './components/DonarSignup';
import DonarSignin from './components/DonarSignin';
import ConsumerSignup from './components/ConsumerSignup';
import ConsumerSignin from './components/ConsumerSignin';
import HospitalSignup from './components/HospitalSignup';
import HospitalSignin from './components/HospitalSignin';
import Navbarlogin from './components/Navbarlogin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import DonorReq from './components/DonorReq';
import ApproveDonationReq from './components/ApproveDonationReq';
import Viewdonationreq from './components/Viewdonationreq';
import Admin from './components/Admin';


function App() {
  return (
<BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/adminsignin' element={<AdminSignin/>}/>
        <Route path='/donarsignin' element={<DonarSignin/>}/>
        <Route path='/consumersignin' element={<ConsumerSignin/>}/>
        <Route path='/hospitalsignin' element={<HospitalSignin/>}/>

        <Route path='/adminsignup' element={<AdminSignup/>}/>
        <Route path='/donarsignup' element={<DonarSignup/>}/>
        <Route path='/consumersignup' element={<ConsumerSignup/>}/>
        <Route path='/hospitalsignup' element={<HospitalSignup/>}/>

        <Route path='/donarRequest' element={<DonorReq/>}/>
        <Route path='/viewdonationreq' element={<Viewdonationreq/>}/>
        <Route path='/approvedonationreq' element={<ApproveDonationReq/>}/>
        <Route path='/admin' element={<Admin/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

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
import Consumer from './components/Consumer';
import SearchDonar from './components/SearchDonar';
import RequestBlood from './components/RequestBlood';
import ApproveBloodReq from './components/ApproveBloodReq';
import InventoryDonar from './components/InventoryDonar';
import InventoryConsumer from './components/InventoryConsumer';
import BloodInventorylist from './components/BloodInventorylist';
import Bloodalert from './components/Bloodalert';
import Largestdonars from './components/Largestdonars';
import PostAnnouncement from './components/PostAnnouncement ';
import Createpost from './components/Createpost';
import ViewMyPosts from './components/ViewMyposts';
import CreateCamp from './components/CreateCamp';
import Donors from './components/Donors';
import Donorscamp from './components/Donorscamp';
import CampNotification from './components/CampNotification';
import DonorEducation from './components/DonorEducation';
import HospitalEmergencyRequest from './components/HospitalEmergencyRequest';
import AdminHospitalReq from './components/AdminHospitalReq';
import CampRegister from './components/CampRegister';
import AdminCampRegi from './components/AdminCampRegi';
import DonorDetails from './components/DonorDetails';
import SendReminder from './components/SenderReminder';
import EmergencyReqMail from './components/EmergencyReqMail';


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

        <Route path='/donors' element={<Donors/>}/>
        <Route path='/donarRequest' element={<DonorReq/>}/>
        <Route path='/viewdonationreq' element={<Viewdonationreq/>}/>
        <Route path='/approvedonationreq' element={<ApproveDonationReq/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/consumer' element={<Consumer/>}/>
        <Route path='/searchdonar' element={<SearchDonar/>}/>
        <Route path='/requestblood' element={<RequestBlood/>}/>
        <Route path='/approvebloodreq' element={<ApproveBloodReq/>}/>

        <Route path='/inventorydonar' element={<InventoryDonar/>}/>
        <Route path='/inventoryconsumer' element={<InventoryConsumer/>}/>
        <Route path='/BloodInventorylist' element={<BloodInventorylist/>}/>
        <Route path='/Bloodalert' element={<Bloodalert/>}/>

        <Route path='/largestdonars' element={<Largestdonars/>}/>
        <Route path='/create' element={<Createpost/>}/>
        <Route path='/viwemypost' element={<PostAnnouncement/>}/>
        <Route path='/viwemypostadmin' element={<ViewMyPosts/>}/>

        <Route path='/createcamp' element={<CreateCamp/>}/>
        <Route path='/donorscamp' element={<Donorscamp/>}/>
        <Route path='/campnotification' element={<CampNotification/>}/>
        <Route path='/donoreducation' element={<DonorEducation/>}/>
        <Route path='/hospitalemergency' element={<HospitalEmergencyRequest/>}/>
        <Route path='/hospitalreq' element={<AdminHospitalReq/>}/>
        <Route path='/campregister' element={<CampRegister/>}/>
        <Route path='/admincampregi' element={<AdminCampRegi/>}/>

        <Route path='/donordetails' element={<DonorDetails/>}/>
        <Route path='/emailsend' element={<SendReminder/>}/>
        <Route path='/emergencyreqmail' element={<EmergencyReqMail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

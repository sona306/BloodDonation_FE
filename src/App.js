import logo from './logo.svg';
import './App.css';
import AdminSignup from './components/AdminSignup';
import AdminSignin from './components/AdminSignin';
import DonarSignup from './components/DonarSignup';
import DonarSignin from './components/DonarSignin';
import ConsumerSignup from './components/ConsumerSignup';
import ConsumerSignin from './components/ConsumerSignin';

function App() {
  return (
    <div className="App">
      <ConsumerSignup/>
      <ConsumerSignin/>
    </div>
  );
}

export default App;

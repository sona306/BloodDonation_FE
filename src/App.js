import logo from './logo.svg';
import './App.css';
import AdminSignup from './components/AdminSignup';
import AdminSignin from './components/AdminSignin';
import DonarSignup from './components/DonarSignup';
import DonarSignin from './components/DonarSignin';

function App() {
  return (
    <div className="App">
      <DonarSignup/>
      <DonarSignin/>
    </div>
  );
}

export default App;

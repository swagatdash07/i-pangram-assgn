import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './page/Dashboard';
import Login from './components/Login';
import HomePage from './page/HomePage';
import ManagerDashboard from './page/ManagerDashboard';
import EditEmpPage from './page/EditEmpPage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        {/* manager Access */}
        <Route path='/m-dashboard' element={<ManagerDashboard/>}/>
        <Route path='/edit-employee/:id' element={<EditEmpPage/>}/>
      </Routes>
    </div>
  );
}

export default App;

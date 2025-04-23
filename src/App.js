
import { Outlet } from 'react-router-dom';
import './App.css';
import { Routing } from './components/ourRouting/myRouting';


function App() {
  return (
    <div >
      {/* <Products></Products> */}
      <Routing></Routing>
      {/* <Outlet></Outlet> */}
    </div>
  );
}

export default App;

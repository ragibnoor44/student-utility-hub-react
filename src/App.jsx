import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Notes from './components/Notes'
import Tasks from './components/Tasks'
import Login from './components/Login'

function App() {
  return (
    <>
    <Navbar brandName="StudentHub"/>
    <Routes>
      <Route path='/notes' element={<Notes/>} />
      <Route path='/tasks' element={<Tasks/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
    </>
  );
}

export default App;

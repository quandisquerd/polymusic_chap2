
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layout/AdminLayout'
import Dashboard from './component/admin/Dashboard'
import List from './component/admin/List'
import Edit from './component/admin/Edit'
import Add from './component/admin/Add'
import Musics from './component/Musics'
import WebsiteLayout from './layout/WebsiteLayout'
import MusicDetail from './component/MusicDetail'
import Login from './component/auth/Login'
import Profile from './component/Profile'
import Register from './component/auth/Register'
import Search from './component/Search'
function App() {
  const check = () => {
    const user = JSON.parse(localStorage.getItem('user')!)
    if (!user || user?.user.role == 'admin') {
      return <AdminLayout />
    } else {
      return <Navigate to='/login' />
    }
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={check()}>
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path="list" >
              <Route index element={<List />} />
              <Route path=':id/edit' element={<Edit />} />
              <Route path='add' element={<Add />} />
            </Route>
          </Route>
          <Route path="/" element={<WebsiteLayout />} >
            <Route index element={<Musics />} />
            <Route path=":id" element={<MusicDetail />} />
            <Route path='profile' element={<Profile />} />
            <Route path='search' element={<Search />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

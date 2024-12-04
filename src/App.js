import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Header from './components/Header';
import "@fontsource/roboto";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Dashboard from './components/Blog/Dashboard';
import ProtectedRoute from './components/Auth/PrivateRouter';
import WriteBlog from './components/Blog/WriteBlog';
import SingleBlog from './components/Blog/SingleBlog';
import UpdateBlogs from './components/Blog/UpdateBlogs';


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blog" element={<WriteBlog />} />
            <Route path='/blogs/:id' element={<SingleBlog />} />
            <Route path='/edit/:id' element={<UpdateBlogs />} />
          </Route>

        </Routes>
      </BrowserRouter >
    </>
  );
}

export default App;

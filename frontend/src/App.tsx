import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Blog from "./page/Blog"
import Login from "./page/Login"
import Register from "./page/Register"
import SpecificBlog from "./page/SpecificBlog"

function App() {
  return (

    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainLayout />}>
              <Route index element={<Blog></Blog>}></Route>
                <Route path="/:slug" element={<SpecificBlog></SpecificBlog>}></Route>
          </Route>
          <Route path="/login" element={<Login></Login>} ></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          
      </Routes>
    </BrowserRouter>

  )
}

export default App
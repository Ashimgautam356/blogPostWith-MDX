import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Blog from "./components/other/Blog"

function App() {
  return (

    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainLayout />}>
              <Route index element={<Blog></Blog>}></Route>
          </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
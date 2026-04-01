import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Register from "./app/Register"
import Login from "./app/Login"
import Dashboard from "./app/Dashboard"
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
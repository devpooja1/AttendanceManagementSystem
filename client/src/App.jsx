import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddStudent from "./pages/AddStudent";
import Login from "./pages/Login";
import DisplayPage from "./pages/DisplayPage";
import Search from "./pages/Search";

const App=()=>{

  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}>
        <Route index element={<Login/>}/>
        </Route>
        <Route path="dashboard" element={<Dashboard/>}>
        <Route path="addstudent" element={<AddStudent/>}/>
        <Route path="display" element={<DisplayPage/>}/>
        <Route path="search" element={<Search/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
    
    </>
  )
}
export default App;
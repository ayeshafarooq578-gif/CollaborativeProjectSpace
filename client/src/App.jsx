import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Milestones from "./pages/Milestones";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/tasks" element={<TaskPage />} />

        <Route path="/members" element={<Members />} />

        <Route path="/milestones" element={<Milestones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
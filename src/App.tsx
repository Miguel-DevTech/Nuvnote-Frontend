// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskManager from './pages/TaskManager';
import LoginPage from './components/LoginPage/Login'; // você já começou isso!
import RegisterPage from './components/RegisterPage/RegisterPage';

function App() {
    return (
        <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<TaskManager />} />
            <Route path='/register' element={<RegisterPage />} /> 
        </Routes>
        </Router>
    );
}

export default App;

// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskManager from './pages/TaskManager';
import LoginPage from './components/UserPage/Login'; // você já começou isso!

function App() {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<TaskManager />} />
        </Routes>
        </Router>
    );
}

export default App;

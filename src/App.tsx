// src/App.tsx
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskManager from './pages/TaskManager';
import LoginPage from './components/LoginPage/Login'; // você já começou isso!
import RegisterPage from './components/RegisterPage/RegisterPage';
import client from './apolloClient';

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/dashboard" element={<TaskManager />} />
                <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </Router>
        </ApolloProvider>
    );
}

export default App;

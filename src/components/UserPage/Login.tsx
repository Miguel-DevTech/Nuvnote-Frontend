import { type FC, useState, type FormEvent } from "react";
import { useNavigate } from 'react-router-dom';

const LoginPage: FC = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const navigate = useNavigate();


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Email:', userEmail);
        console.log('Senha:', userPassword);


        navigate('/dashboard');
        // Aqui você pode chamar o back-end futuramente
    };

    return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">TASKFLY Login</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
                id="email"
                type="email"
                className="form-control"
                required
                placeholder="exemplo@email.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
            />
            </div>

            <div className="mb-3">
            <label htmlFor="password" className="form-label">Senha</label>
            <input
                id="password"
                type="password"
                className="form-control"
                required
                placeholder="Digite sua senha"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
            />
            </div>

            <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>
        </div>
    </div>
    );
};

export default LoginPage;

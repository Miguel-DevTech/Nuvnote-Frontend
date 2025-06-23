import { type FC, useState, type FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import './Login.css';

const LoginPage: FC = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setLoading(false);
        navigate('/dashboard');
        // Aqui você pode chamar o back-end futuramente
    };

    return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-lg rounded-4 text-center" style={{ width: '100%', maxWidth: '420px' }}>
            <div className="mb-3">
            <FaSignInAlt size={36} className="text-primary mb-2" />
            <h4 className="fw-bold">Bem-vindo de volta</h4>
            </div>

            <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input 
                type="email"
                className="form-control"
                id="loginEmail"
                placeholder="email@example.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
                disabled={loading}
                />
                <label htmlFor="loginEmail"><FaEnvelope className="me-2" />Email</label>
            </div>

            <div className="form-floating mb-4">
                <input 
                type="password"
                className="form-control"
                id="loginPassword"
                placeholder="Senha"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
                disabled={loading}
                />
                <label htmlFor="loginPassword"><FaLock className="me-2" />Senha</label>
            </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Entrando...
                    </>
                    ) : (
                    <>
                        <FaSignInAlt className="me-2" />
                        Entrar
                    </>
                    )}
                </button>
            </form>

            <p className="mt-4 mb-0 text-muted">
            Ainda não tem conta? <a href="/register" className="text-decoration-none">Cadastrar</a>
            </p>
        </div>
        </div>
    );
};

export default LoginPage;

// components/LoginPage/Login.tsx
import { type FC, useState, type FormEvent } from "react";
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { gql, useApolloClient, useMutation} from '@apollo/client';
import './Login.css';

// GraphQL Mutation
const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            user {
                id
                email
            }
        }
    }
`;

const LoginPage: FC = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const client = useApolloClient();

    const [login] = useMutation(LOGIN);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login({
            variables: {
                email: userEmail,
                password: userPassword,
            },
            });

            await client.clearStore();           // 🧹 limpa o cache antigo
            await client.refetchQueries({ include: 'all' });

            window.location.href = '/dashboard';

        } catch (err: any) {
            console.error('Login failed:', err);
            if (err?.graphQLErrors?.length) {
                alert("Credenciais inválidas.");
            } else if (err?.networkError) {
                alert("Erro de rede. Verifique sua conexão.");
            } else {
                alert("Erro desconhecido.");
            }
        } finally {
            setLoading(false);
        }
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
                autoComplete="email"
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
                autoComplete="current-password"
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
            Ainda não tem conta? <Link to="/register" className="text-decoration-none">Cadastrar</Link>
            </p>
        </div>
        </div>
    );
};

export default LoginPage;

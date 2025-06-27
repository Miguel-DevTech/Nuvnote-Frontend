import { type FC, useState, type FormEvent } from "react";
import { FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation} from "@apollo/client";
import './RegisterPage.css';

const REGISTER = gql`
    mutation Register($email: String!, $password: String!) {
        register(email: $email, password: $password) {
            user {
                id
                email
            }
        }
    }
`;

const RegisterPage: FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [register] = useMutation(REGISTER)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("As senhas não coincidem!")
            return;
        }

        setLoading(true);

        try {
            const { data: _ } = await register({
                variables: {
                    email,
                    password,
                },
            });

            navigate("/dashboard"); // Redireciona após o registro
        } catch (err: any) {
            console.error("Erro ao registrar:", err);
            alert("Erro ao registrar usuário.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-lg rounded-4 text-center" style={{ width: '100%', maxWidth: '420px' }}>
            <div className="mb-3">
            <FaUserPlus size={36} className="text-success mb-2" />
            <h4 className="fw-bold">Crie sua conta</h4>
            </div>

            <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input 
                type="email"
                className="form-control"
                id="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                />
                <label htmlFor="email"><FaEnvelope className="me-2" />Email</label>
            </div>

            <div className="form-floating mb-3">
                <input 
                type="password"
                className="form-control"
                id="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                disabled={loading}
                />
                <label htmlFor="password"><FaLock className="me-2" />Senha</label>
            </div>

            <div className="form-floating mb-4">
                <input 
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
                disabled={loading}
                />
                <label htmlFor="confirmPassword"><FaLock className="me-2" />Confirmar Senha</label>
            </div>

                <button type="submit" className="btn btn-success w-100" disabled={loading}>
                    {loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Cadastrando...
                    </>
                    ) : (
                    <>
                        <FaUserPlus className="me-2" />
                        Cadastrar
                    </>
                    )}
                </button>
            </form>

            <p className="mt-4 mb-0 text-muted">
            Já tem uma conta? <Link to='/login' className="text-decoration-none">Entrar</Link>
            </p>
        </div>
        </div>
    );
};

export default RegisterPage;

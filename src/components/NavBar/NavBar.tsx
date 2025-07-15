import { useEffect, useState } from 'react';
import './NavBar.css';

interface NavBarProps {
    search: string;
    onSearchChange: (value: string) => void
}

const NavBar = ({ search, onSearchChange }: NavBarProps) => {
    const [hour, setHour] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setHour(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg px-3">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="#"> Nuvnote📓 </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon bg-light"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                    <div className="d-flex flex-column flex-lg-row align-items-center gap-3 mt-3 mt-lg-0 w-100 justify-content-lg-end">
                        <span className="text-light">{hour.toLocaleTimeString()}</span> 

                        <form className="d-flex w-auto w-lg-auto" role="search" onSubmit={(e) => e.preventDefault()}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Buscar tarefa..."
                                aria-label="Search"
                                value={search}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                            <button className="btn btn-outline-light" type="submit">
                                🔍
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

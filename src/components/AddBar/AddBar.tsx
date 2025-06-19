import { useState } from "react";
import './AddBar.css'; // Pode continuar com seu estilo personalizado também

interface AddBarProps {
    onAddTask: (name: string, priority: string) => void;
}

const AddBar = ({ onAddTask } : AddBarProps) => {
    const [taskName, setTaskName] = useState('');
    const [taskPriority, setTaskPriority] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskName) return;

        console.log('Nova tarefa:', taskName);
        console.log('Prioridade:', taskPriority);

        // Resetar campos (opcional)
        onAddTask(taskName, taskPriority);
        setTaskName('');
        setTaskPriority('');
    };

    return (
        <div className="addBar container mt-4">
        <form className="row g-3 align-items-center" onSubmit={handleSubmit}>
            
            {/* Campo de tarefa */}
            <div className="col-md-6">
            <input
                type="text"
                className="form-control"
                placeholder="Digite uma nova tarefa..."
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            </div>

            {/* Seletor de prioridade */}
            <div className="col-md-3">
            <select
                className="form-select"
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
            >
                <option value="">Prioridade</option>
                <option value="alta">Alta</option>
                <option value="media">Média</option>
                <option value="baixa">Baixa</option>
            </select>
            </div>

            {/* Botão de adicionar */}
            <div className="col-md-3">
            <button type="submit" className="btn btn-primary w-100">
                Adicionar Tarefa
            </button>
            </div>
        </form>
        </div>
    );
};

export default AddBar;

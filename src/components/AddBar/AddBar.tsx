import { useState } from "react";
import './AddBar.css';

interface AddBarProps {
    onAddTask: (name: string, priority: string) => void;
    disabled?: boolean;
}

const AddBar = ({ onAddTask, disabled = false }: AddBarProps) => {
    const [taskName, setTaskName] = useState('');
    const [taskPriority, setTaskPriority] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskName || !taskPriority) return;

        onAddTask(taskName, taskPriority);

        // Limpa os campos
        setTaskName('');
        setTaskPriority('');
    };

    return (
        <div className="addBar container mt-4">
            <form className="row g-3 align-items-center" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Digite uma nova tarefa..."
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        disabled={disabled}
                    />
                </div>

                <div className="col-md-3">
                    <select
                        className="form-select"
                        value={taskPriority}
                        onChange={(e) => setTaskPriority(e.target.value)}
                        disabled={disabled}
                    >
                        <option value="">Prioridade</option>
                        <option value="alta">Alta</option>
                        <option value="media">Média</option>
                        <option value="baixa">Baixa</option>
                    </select>
                </div>

                <div className="col-md-3">
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={disabled || !taskName || !taskPriority}
                    >
                        Adicionar Tarefa
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBar;

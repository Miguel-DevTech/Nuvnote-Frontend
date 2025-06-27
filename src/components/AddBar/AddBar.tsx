import { useState } from "react";
import { gql, useMutation } from '@apollo/client';
import './AddBar.css'; // Pode continuar com seu estilo personalizado também

const ADD_TASK = gql`
    mutation AddTask($name: String!, $priority: String!) {
        addTask(name: $name, priority: $priority) {
            id
            name
            priority
            done
        }
    }
`;


interface AddBarProps {
    onAddTask: (name: string, priority: string) => void;
    disabled?: boolean;
}

const AddBar = ({ onAddTask, disabled = false } : AddBarProps) => {
    const [taskName, setTaskName] = useState('');
    const [taskPriority, setTaskPriority] = useState('');

    const [addTask] = useMutation(ADD_TASK);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskName) return;

        try {
            await addTask({
                variables: {
                    name: taskName,
                    priority: taskPriority,
                },
            });

            // Resetar campos (opcional)
            onAddTask(taskName, taskPriority);
            setTaskName('');
            setTaskPriority('');
            console.log('Nova tarefa:', taskName);
            console.log('Prioridade:', taskPriority);

        } catch (err) {
            console.error("Erro ao adicionar tarefa:", err);
            alert("Erro ao adicionar tarefa. Você está logado?");
        }
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
                disabled={disabled}
            />
            </div>

            {/* Seletor de prioridade */}
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

            {/* Botão de adicionar */}
            <div className="col-md-3">
            <button type="submit" className="btn btn-primary w-100" disabled={disabled || !taskName}>
                Adicionar Tarefa
            </button>
            </div>
        </form>
        </div>
    );
};

export default AddBar;

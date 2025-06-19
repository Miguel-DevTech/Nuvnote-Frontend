import { type FC, useState } from 'react';
import { BsFlagFill, BsCheckLg, BsTrash, BsPencilSquare, BsSave } from 'react-icons/bs';
import { motion } from 'framer-motion';
import './TaskList.css';

interface Task {
    id: number;
    name: string;
    priority: string;
    done?: boolean;
}

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: number) => void;
    onToggleDone: (id: number) => void;
    onEdit: (id: number) => void;
    onSaveEdit: (id: number, newName: string) => void;
    editingId: number | null;
}

const TaskList: FC<TaskListProps> = ({ tasks, onDelete, onToggleDone, onEdit, onSaveEdit, editingId }) => {
    const [editedName, setEditedName] = useState('');

    return (
        <div className="container mt-4">
        <h4 className="mb-3 text-dark">Minhas Tarefas</h4>
        {tasks.length === 0 ? (
            <p className="text-dark">Nenhuma tarefa adicionada ainda.</p>
        ) : (
            <div className="row row-cols-1 g-3">
            {tasks.map((task) => {
                const isEditing = editingId === task.id;
                const cardClass = `card shadow-sm border-0 transition ${task.done ? 'opacity-50' : ''}`;

                return (
                <motion.div 
                    key={task.id} 
                    className="col"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{
                        opacity: task.done ? 0.5 : 1,
                        scale: task.done ? 0.90 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    >
                    <div className={cardClass}>
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <div className="w-100">
                        {isEditing ? (
                            <input
                            type="text"
                            className="form-control mb-2"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') onSaveEdit(task.id, editedName);
                            }}
                            autoFocus
                            />
                        ) : (
                            <h6
                            className={`card-title mb-1 ${task.done ? 'text-decoration-line-through text-muted' : ''}`}
                            >
                            {task.name}
                            </h6>
                        )}

                        <small className="text-muted">Prioridade: {task.priority}</small>
                        </div>

                        <div className="d-flex gap-2 align-items-center ms-3">
                        <span className={`badge bg-${getPriorityColor(task.priority)} d-flex align-items-center gap-1`}>
                            <BsFlagFill size={14} />
                            {task.priority}
                        </span>

                        <button className="btn btn-sm btn-outline-success" title="Concluir" onClick={() => onToggleDone(task.id)}>
                            <BsCheckLg />
                        </button>

                        {isEditing ? (
                            <button
                            className="btn btn-sm btn-outline-primary"
                            title="Salvar"
                            onClick={() => onSaveEdit(task.id, editedName)}
                            >
                            <BsSave />
                            </button>
                        ) : (
                            <button
                            className="btn btn-sm btn-outline-primary"
                            title="Editar"
                            onClick={() => {
                                setEditedName(task.name);
                                onEdit(task.id);
                            }}
                            >
                            <BsPencilSquare />
                            </button>
                        )}

                        <button className="btn btn-sm btn-outline-danger" title="Excluir" onClick={() => onDelete(task.id)}>
                            <BsTrash />
                        </button>
                        </div>
                    </div>
                    </div>
                </motion.div>
                );
            })}
            </div>
        )}
        </div>
    );
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'alta':
            return 'danger';
        case 'media':
            return 'warning';
        case 'baixa':
            return 'success';
        default:
            return 'secondary';
    }
};

export default TaskList;

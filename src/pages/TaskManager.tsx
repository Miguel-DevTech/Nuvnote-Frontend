// src/pages/TaskManager.tsx
import { useEffect, useState } from 'react';
import AddBar from '../components/AddBar/AddBar';
import NavBar from '../components/NavBar/NavBar';
import TaskList from '../components/TaskList/TaskList';

interface Task {
    id: number;
    name: string;
    priority: string;
    done?: boolean;
}

const TaskManager = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => {
            setTasks([
                { id: 1, name: "Estudar React", priority: 'alta' },
                { id: 2, name: "Lavar o carro", priority: 'baixa' }
            ]);
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }, []);

    const addTask = (name: string, priority: string) => {
        const newTask: Task = {
            id: Date.now(),
            name,
            priority,
        };
    setTasks([...tasks, newTask]);
    };

const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(search.toLowerCase())
    );

const toggleDone = (id: number) => {
    setTasks(prev =>
        prev.map(task =>
            task.id === id ? { ...task, done: !task.done } : task
        )
    );
};

const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
};

const startEditing = (id: number) => {
    setEditingId(id);
};

const saveTaskEdit = (id: number, newName: string) => {
    setTasks(prev =>
            prev.map(t =>
            t.id === id ? { ...t, name: newName } : t
        )
    );
        setEditingId(null);
    };

return (
    <div>
        <NavBar search={search} onSearchChange={setSearch} />
        <AddBar onAddTask={addTask} />
        <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onToggleDone={toggleDone}
            onEdit={startEditing}
            onSaveEdit={saveTaskEdit}
            editingId={editingId}
            loading={loading}
        />
        </div>
    );
};

export default TaskManager;

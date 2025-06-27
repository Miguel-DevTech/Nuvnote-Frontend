// src/pages/ TaskManager.tsx
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASKS, ADD_TASK, DELETE_TASK, UPDATE_TASK } from '../graphql/queries';

import AddBar from '../components/AddBar/AddBar';
import NavBar from '../components/NavBar/NavBar';
import TaskList from '../components/TaskList/TaskList';

interface Task {
    id: string;
    name: string;
    priority: string;
    done: boolean;
}

const TaskManager = () => {
    const [search, setSearch] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [actionalLoading, setActionLoading] = useState(false);

    const { data, loading, refetch } = useQuery(GET_TASKS);
    const [addTaskMutation] = useMutation(ADD_TASK);
    const [deleteTaskMutation] = useMutation(DELETE_TASK);
    const [updateTaskMutation] = useMutation(UPDATE_TASK);

    const tasks: Task[] = data?.tasks ?? [];

    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(search.toLowerCase())
    );

    const addTask = async (name: string, priority: string) => {
        setError(null);
        setActionLoading(true);
        try {
            await addTaskMutation({ variables: { name, priority } });
            await refetch();
        } catch (err: any) {
            setError('Failed to add task. Please try again.');
            console.log(err);
        } finally {
            setActionLoading(false);
        }
    };

    const toggleDone = async (id: string, currentDone: boolean) => {
        setError(null);
        setActionLoading(true);
        try {
            await updateTaskMutation({ variables: { id, done: !currentDone } });
            await refetch();
        } catch (err: any) {
            setError('Failed to update task. Please try again.');
            console.error(err);
        } finally {
            setActionLoading(false);
        }
    };

    const deleteTask = async (id: string) => {
        setError(null);
        setActionLoading(true);
        try {
            await deleteTaskMutation({ variables: { id } });
            await refetch();
        } catch (err: any) {
            setError('Failed to delete task. Please try again.');
            console.error(err);
        } finally {
            setActionLoading(false);
        }
    };

    const startEditing = (id: string) => {
        setEditingId(id);
    };

    const saveTaskEdit = async (id: string, newName: string) => {
        setError(null);
        setActionLoading(true);
        try {
            await updateTaskMutation({ variables: { id, name: newName } });
            setEditingId(null);
            await refetch();
        } catch (err: any) {
            setError('Failed to save task. Please try again.');
            console.error(err);
        } finally {
            setActionLoading(false);
            }
    };

return (
    <div>
        <NavBar search={search} onSearchChange={setSearch} />
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <AddBar onAddTask={addTask} disabled={actionalLoading} />
        <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onToggleDone={toggleDone}
            onEdit={startEditing}
            onSaveEdit={saveTaskEdit}
            editingId={editingId}
            loading={loading || actionalLoading}
        />
        </div>
    );
};

export default TaskManager;

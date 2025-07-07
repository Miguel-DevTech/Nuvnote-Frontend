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

    const { data, loading } = useQuery(GET_TASKS);


    const [addTaskMutation] = useMutation(ADD_TASK, {
        update(cache, { data: { addTask } }) {
            const existing = cache.readQuery<{ tasks: Task[] }>({ query: GET_TASKS});
            if(existing?.tasks && addTask) {
                cache.writeQuery({
                    query: GET_TASKS,
                    data: {
                        tasks: [...existing.tasks, addTask]
                    }
                })
            }
        }
    });

    const [deleteTaskMutation] = useMutation(DELETE_TASK);

    const [updateTaskMutation] = useMutation(UPDATE_TASK, {
        update(cache, { data: { updateTask } }) {
            const existing = cache.readQuery<{ tasks: Task[] }>({ query: GET_TASKS });
            if (existing?.tasks && updateTask) {
            cache.writeQuery({
                query: GET_TASKS,
                data: {
                tasks: existing.tasks.map((t: Task) =>
                    t.id === updateTask.id ? updateTask : t
                ),
                },
            });
            }
        }
    });


    const tasks: Task[] = data?.tasks ?? [];

    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(search.toLowerCase())
    );

    const addTask = async (name: string, priority: string) => {

        setError(null);
        setActionLoading(true);

        try {
            await addTaskMutation({ variables: { name, priority } });
        } catch (err: any) {
            setError('Failed to add task. Please try again.');
            console.log(err);
        } finally {
            setActionLoading(false);
        }
    };

    const toggleDone = async (id: string) => {
        setError(null);
        setActionLoading(true);

        const task = tasks.find((t) => t.id === id);
        if (!task) {
            setError('Tarefa não encontrada.');
            setActionLoading(false);
            return;
        }

        try {
            await updateTaskMutation({ variables: { id: task.id, done: !task.done } });
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
        await deleteTaskMutation({
            variables: { id },
            update(cache, { data }) {
                if (!data?.deleteTask) return;

                const existing = cache.readQuery<{ tasks: Task[] }>({ query: GET_TASKS });
                if (!existing) return;

                cache.writeQuery({
                    query: GET_TASKS,
                    data: {
                        tasks: existing.tasks.filter(task => task.id !== id),
                    },
                });
            },
        });

        if (editingId === id) setEditingId(null);
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

        const task = tasks.find(t => t.id === id);
        if (!task) {
            setError('Tarefa não encontrada.');
            setActionLoading(false);
            return;
        }

        try {
            await updateTaskMutation({ variables: { id, name: newName, done: task.done } });
            setEditingId(null);
        } catch (err: any) {
            setError('Failed to save task. Please try again.');
            console.error(err);
        } finally {
            setActionLoading(false);
        }
    };

    console.log('tasks', tasks)

return (
    <div>
        <NavBar search={search} onSearchChange={setSearch} />
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <AddBar onAddTask={addTask} disabled={actionalLoading} />
        <TaskList
            tasks={filteredTasks}
            onDelete={deleteTask}
            onToggleDone={toggleDone}
            onStartEditing={startEditing}  // ✅ Renomeado aqui
            onSaveEdit={saveTaskEdit}      // ✅ Mantido
            editingId={editingId}
            loading={loading || actionalLoading}

        />
        </div>
    );
};



export default TaskManager;

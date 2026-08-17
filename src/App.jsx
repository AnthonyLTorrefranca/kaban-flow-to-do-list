import {useState, useEffect, useRef} from 'react'
import TaskList from './components/TaskList.jsx'
import InProg from './components/InProg.jsx';
import Done from './components/Done.jsx';
import AddTaskComponent from './components/TaskComponent/AddTaskComponent.jsx'

export default function App() {
  const taskRef = useRef(null);
  const [add, setAdd] = useState({ taskPrompt: false, isEdit: false });
  const [editingId, setEditingId] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [alerts, setAlerts] = useState({
    todo: 'idle',
    progress: 'idle',
    done: 'idle',
  });
  const [taskList, setTaskList] = useState(() => {
    const saved = localStorage.getItem('taskList');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);

  useEffect(() => {
    if (add.taskPrompt) taskRef.current?.focus();
  }, [add.taskPrompt, add.isEdit]);

  const updateAlert = (section, value) => {
    setAlerts(prev => ({ ...prev, [section]: value }));
  };

  const resetAlerts = () => {
    setAlerts({ todo: 'idle', progress: 'idle', done: 'idle' });
  };

  function moveToTodo(id) {
    const selectedTask = taskList.find(item => item.id === id);
    if (!selectedTask) return;

    setAdd(prev => ({ ...prev, taskPrompt: false, isEdit: false }));
    setTaskList(prevTasks =>
      prevTasks.map(item => (item.id === id ? { ...item, status: 'todo' } : item))
    );

    if (selectedTask.status === 'todo') {
      updateAlert('todo', 'same');
      return;
    }
    resetAlerts();
  }

  function moveToProg(id) {
    const selectedTask = taskList.find(item => item.id === id);
    if (!selectedTask) return;
    if (selectedTask.status === 'progress') {
      updateAlert('progress', 'same');
      return;
    }

    setAdd(prev => ({ ...prev, taskPrompt: false, isEdit: false }));
    setTaskList(prevTasks =>
      prevTasks.map(item => (item.id === id ? { ...item, status: 'progress' } : item))
    );
    resetAlerts();
  }

  function moveToDone(id) {
    const selectedTask = taskList.find(item => item.id === id);
    if (!selectedTask) return;
    if (selectedTask.status === 'done') {
      updateAlert('done', 'same');
      return;
    }
    setAdd(prev => ({ ...prev, taskPrompt: false, isEdit: false }));
    setTaskList(prevTasks =>
      prevTasks.map(item => (item.id === id ? { ...item, status: 'done' } : item))
    );
    resetAlerts();
  }

  function handleEdit(id) {
    setAdd(prev => ({ ...prev, taskPrompt: true, isEdit: true }));
    const selectedTask = taskList.find(item => item.id === id);
    setEditingId(selectedTask.id);
    setTaskName(selectedTask.text);
  }

  function handleChange(e) {
    return setTaskName(e.target.value);
  }

  function addBtn() {
    setAdd(prev => ({ ...prev, taskPrompt: true, isEdit: false }));
    setEditingId(null);
    resetAlerts();
    setTaskName('');
  }

  function handleDelete(id) {
    const updatedTask = taskList.filter(item => item.id !== id);
    setAdd(prev => ({ ...prev, taskPrompt: false, isEdit: false }));
    setEditingId(null);
    setTaskList(updatedTask);
    resetAlerts();
    setTaskName('');
  }

  function handleCancel() {
    setAdd(prev => ({ ...prev, taskPrompt: false, isEdit: false }));
    setEditingId(null);
    setTaskName('');
    resetAlerts();
  }

  function handleMoveUp(id, section = 'todo') {
    const task = taskList.find(item=> item.id === id)
    console.log(task.status)
    // const updatedTask = [...taskList];
    // const taskId = updatedTask.find(item => item.id === id).status;
    // const taskInd = taskInd.index
    // console.log(taskId)
    // if (taskId === 0) {
    //   updateAlert(section, 'top');
    //   setTimeout(() => updateAlert(section, 'idle'), 1500);
    //   return;
    // }

    // updateAlert(section, 'idle');
    // [updatedTask[taskId], updatedTask[taskId - 1]] = [updatedTask[taskId - 1], updatedTask[taskId]];
    // setTaskList(updatedTask);
  }

  function handleMoveDown(id, section = 'todo') {
    const updatedTask = [...taskList];
    const taskId = updatedTask.findIndex(item => item.id === id);
    if (taskId + 1 === updatedTask.length) {
      updateAlert(section, 'down');
      setTimeout(() => updateAlert(section, 'idle'), 1500);
      return;
    }
    updateAlert(section, 'idle');
    [updatedTask[taskId], updatedTask[taskId + 1]] = [updatedTask[taskId + 1], updatedTask[taskId]];
    setTaskList(updatedTask);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const tTask = taskName.trim();
    const isDuplicate = taskList.some(item => item.id !== editingId && item.text === tTask);
    if (tTask === '') {
      updateAlert('todo', 'blank');
      return;
    }
    if (isDuplicate) {
      updateAlert('todo', 'duplicate');
      return;
    }
    if (add.isEdit) {
      setTaskList(task =>
        task.map(item => (item.id === editingId ? { ...item, text: tTask } : item))
      );
      setAdd(prev => ({ ...prev, taskPrompt: false, isEdit: false }));
      setEditingId(null);
      setTaskName('');
      return;
    }
    const newTask = { id: crypto.randomUUID(), text: tTask, status: 'todo' };
    setAdd(prev => ({ ...prev, taskPrompt: false }));
    setTaskList(prev => [...prev, newTask]);
    resetAlerts();
    setTaskName('');
  }

  return (
    <section className="min-h-screen px-5 bg-slate-900 text-white overflow-hidden">
      <header className="flex items-center justify-center">
        <h1 className="text-3xl p-5 font-bold text-sky-400">Kanban Flow 🚀</h1>
        <button className="bg-gray-950 p-1 cursor-pointer border-2 rounded-xl" onClick={addBtn}>+ New Task</button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <section>
          <TaskList
            alert={alerts.todo}
            taskList={taskList}
            handleMoveUp={handleMoveUp}
            handleMoveDown={handleMoveDown}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            moveToTodo={moveToTodo}
            moveToProg={moveToProg}
            moveToDone={moveToDone}
          />
        </section>
        <section>
          {add.taskPrompt && (
            <AddTaskComponent
              alert={alerts.todo}
              taskName={taskName}
              taskRef={taskRef}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
          )}
          {!add.taskPrompt && (
            <InProg
              alert={alerts.progress}
              taskList={taskList}
              handleMoveUp={handleMoveUp}
              handleMoveDown={handleMoveDown}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              moveToTodo={moveToTodo}
              moveToProg={moveToProg}
              moveToDone={moveToDone}
            />
          )}
        </section>
        <section>
          <Done
            alert={alerts.done}
            taskList={taskList}
            handleMoveUp={handleMoveUp}
            handleMoveDown={handleMoveDown}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            moveToTodo={moveToTodo}
            moveToProg={moveToProg}
            moveToDone={moveToDone}
          />
        </section>
      </div>
    </section>
  );
}

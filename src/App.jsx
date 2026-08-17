import {useState, useEffect, useRef} from 'react'
import TaskList from './components/TaskList.jsx'
import InProg from "./components/InProg.jsx";
import Done from "./components/Done.jsx";
import AddTaskComponent from './components/TaskComponent/AddTaskComponent.jsx'

export default function App() {
  const taskRef = useRef(null);
  const [add, setAdd] = useState({taskPrompt: false, isEdit: false});
  const [editingId, setEditingId] = useState(null)
  const [taskName, setTaskName] = useState("");
  const [alert, setAlert] = useState("idle");
  const [taskList, setTaskList] = useState(()=>{
    const saved = localStorage.getItem("taskList");
    return saved ? JSON.parse(saved) : [];
  })

  // local storage 
  useEffect(()=> {localStorage.setItem("taskList", JSON.stringify(taskList))}, [taskList])

  //focus on input box
  useEffect(()=> { if (add.taskPrompt)taskRef.current.focus()}, [add.taskPrompt, add.isEdit])

  function moveToTodo(id){
    setAdd((prev)=> ({...prev, taskPrompt: false, isEdit: false}))
    setTaskList(prevTasks=> prevTasks.map(item=> item.id === id ? {...item, status: "todo"}: item))
    const task = taskList.find(item=> item.id === id)
    if (task.status === "todo") return setAlert("same")
      setAlert("idle")
  }
  function moveToProg(id){
    setAdd((prev)=> ({...prev, taskPrompt: false, isEdit: false}))
    setTaskList(prevTasks=> prevTasks.map(item=> item.id === id ? {...item, status: "progress"}: item))
    const task = taskList.find(item=> item.id === id)
    if (task.status === "progress") return setAlert("same")
      setAlert("idle");
  }
  function moveToDone(id){
    const task = taskList.find(item=> item.id === id)
    if (task.status === "done") return setAlert("same")
    setAdd((prev)=> ({...prev, taskPrompt: false, isEdit: false}))
    setTaskList(prevTasks=> prevTasks.map(item=> item.id === id ? {...item, status: "done"}: item))
    setAlert("idle");
    }
  function handleEdit(id){
    setAdd((prev)=> ({...prev, taskPrompt: true, isEdit: true}))
    const selectedTask = taskList.find(item=> item.id === id);
    setEditingId(selectedTask.id)
    setTaskName(selectedTask.text)
    console.log("edit", selectedTask)
    return 
  }
  function handleChange(e){
  return setTaskName(e.target.value)
  }
  function addBtn(){
    setAdd(prev=> ({...prev, taskPrompt: true, isEdit: false}))
    setEditingId(null)
    setAlert("idle");
    setTaskName("");
    console.log("addBtn")
    return 
  }
  function handleDelete(id){
    const updatedTask = taskList.filter(item=> item.id !== id);
    setAdd(prev=> ({...prev, taskPrompt: false, isEdit: false}));
    setEditingId(null)
    setTaskList(updatedTask)
    setAlert("idle");
    setTaskName("")
    console.log("handleDelete")
  }
  function handleCancel(){
    setAdd(prev=> ({...prev, taskPrompt: false, isEdit: false}));
    console.log("handleCancel");
    setEditingId(null)
    setTaskName("");
    return setAlert("idle");
  }
  function handleMoveUp(id){
    const updatedTask = [...taskList];
    const taskId = updatedTask.findIndex(item=> item.id === id);
    console.log("moveUp", taskId, updatedTask.length)
    if (taskId === 0) return setAlert("top");
    setAlert("idle");
    if (taskId <= updatedTask.length){
      [updatedTask[taskId], updatedTask[taskId-1]] = [updatedTask[taskId-1], updatedTask[taskId]];
      setTaskList(updatedTask);
    }
  }
  function handleMoveDown(id){
    setAlert("idle");
    const updatedTask = [...taskList];
    const taskId = updatedTask.findIndex(item=> item.id === id);
    if (taskId+1 === updatedTask.length) return setAlert("down");
    if (taskId < updatedTask.length){
      [updatedTask[taskId], updatedTask[taskId+1]] = [updatedTask[taskId+1], updatedTask[taskId]];
      setTaskList(updatedTask)
    }
    console.log("movedown", taskId+1, updatedTask.length)
  }
  function handleSubmit(e){
    e.preventDefault();
    const tTask = taskName.trim();
    const isDuplicate = taskList.some(item=> item.id !== editingId && item.text === tTask)
    if (tTask === ""){
      console.log("blank")
      return setAlert("blank");
    }
    if (isDuplicate){
      console.log("isDup")
      return setAlert("duplicate");
    }
    if (add.isEdit){
      setTaskList(task=> task.map(item=> item.id === editingId ? {...item, text: tTask} : item))
      setAdd((prev)=> ({...prev, taskPrompt: false, isEdit: false}))
      setEditingId(null)
      setTaskName("")
      return
    }
    const newTask = {id: crypto.randomUUID(), text: tTask, status: "todo"};
    setAdd((prev)=> ({...prev, taskPrompt: false}))
    setTaskList((prev)=>[...prev, newTask])
    setAlert("idle")
    setTaskName("")
  }
  // useEffect(()=>{console.log(editingId, add)}, [editingId, add])
return (
  <section className="min-h-screen px-5 bg-slate-900 text-white overflow-hidden">
    <header className="flex items-center justify-center">
      <h1 className="text-3xl p-5 font-bold text-sky-400">Kanban Flow 🚀</h1>
      <button className="bg-gray-950 p-1 cursor-pointer border-2 rounded-xl" onClick={addBtn}>+ New Task</button>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <section>
        <TaskList alert={alert}
          taskList={taskList}
          handleMoveUp={handleMoveUp} 
          handleMoveDown={handleMoveDown} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete} 
          moveToTodo={moveToTodo} 
          moveToProg={moveToProg} 
          moveToDone={moveToDone} />
      </section>
      <section>
        {add.taskPrompt && 
          <AddTaskComponent 
            alert={alert} 
            taskName={taskName}
            taskRef={taskRef} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            handleCancel={handleCancel} />}
        {!add.taskPrompt && 
          <InProg className="pb-10" 
            taskList={taskList}
            taskName={taskName}
            handleChange={handleChange} 
            handleMoveUp={handleMoveUp}
            handleMoveDown={handleMoveDown} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} 
            moveToTodo={moveToTodo}
            moveToProg={moveToProg}
            moveToDone={moveToDone} />}
      </section>
      <section>
        <Done alert={alert}
          taskList={taskList}
          handleChange={handleChange} 
          handleMoveUp={handleMoveUp}
          handleMoveDown={handleMoveDown} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete}
          moveToTodo={moveToTodo} 
          moveToProg={moveToProg} 
          moveToDone={moveToDone} />
      </section>
    </div>
  </section>
  )
}
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
    const task = localStorage.getItem("taskList");
    return task ? JSON.parse(task) : []; 
  })
  useEffect(()=>{
    localStorage.setItem("taskList", JSON.stringify(taskList))
  }, [taskList])
  useEffect(()=> { if (add.taskPrompt){return taskRef.current.focus()}}, [add.taskPrompt])
  function moveToTodo(id){
    setAdd((prev)=> ({...prev, taskPrompt: false, isEdit: false}))
    setTaskList(prevTasks=> prevTasks.map(item=> item.id === id ? {...item, status: "todo"}: item))
    setAlert("idle");
  }
  function moveToProg(id){
    setAdd((prev)=> ({...prev, taskPrompt: false, isEdit: false}))
    setTaskList(prevTasks=> prevTasks.map(item=> item.id === id ? {...item, status: "progress"}: item))
    setAlert("idle");
  }
  function moveToDone(id){
    setAdd((prev)=> ({...prev, taskPrompt: false, isEdit: false}))
    setTaskList(prevTasks=> prevTasks.map(item=> item.id === id ? {...item, status: "done"}: item))
    setAlert("idle");
    console.log(taskList)
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
    setAdd((prev)=> ({...prev, taskPrompt: !prev.taskPrompt, isEdit: !prev.isEdit}))
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
  function handleMoveUp(index){
    const updatedTask = [...taskList];
    setAlert("idle");
    console.log("top", index, updatedTask.length)
    if (index+updatedTask.length === updatedTask.length) return setAlert("top");
    if (index < updatedTask.length){
      [updatedTask[index], updatedTask[index-1]] = [updatedTask[index-1], updatedTask[index]];
      setTaskList(updatedTask)
    }
  }
  function handleMoveDown(index){
    setAlert("idle");
    const updatedTask = [...taskList];
    if (index+1 === updatedTask.length) return setAlert("down");
    if (index < updatedTask.length){ 
      [updatedTask[index+1], updatedTask[index]] = [updatedTask[index], updatedTask[index+1]]
      setTaskList(updatedTask)
    }
    console.log("movedown", index+1, updatedTask.length)
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
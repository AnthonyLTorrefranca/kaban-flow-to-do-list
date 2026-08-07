import {useState, useEffect, useRef} from 'react'
import TaskList from './components/TaskList.jsx'
import InProg from "./components/InProg.jsx";
import Done from "./components/Done.jsx";
import AddTaskComponent from './components/TaskComponent/AddTaskComponent.jsx'

export default function App() {
  const [add, setAdd] = useState({taskPrompt: false, isEdit: false});
  const [editingId, setEditingId] = useState(null)
  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [alert, setAlert] = useState("idle");
  const taskRef = useRef(null);

  useEffect(()=> {
    if (add.taskPrompt){
      return taskRef.current.focus()
    }
  }, [add.taskPrompt])
  useEffect(()=>{console.log(taskList)},[taskList])

  function moveToTodo(id){
    setAlert("idle");
    setAdd(prev=> ({...prev, taskPrompt: false, isEdit: false}));
    setTaskList(prevTasks=> 
      prevTasks.map(item=> item.id === id ? {...item, status: "todo"} : item)
    )
    console.log("handleTaskList", taskList);
  }
  function moveToProg(id){
    setAlert("idle");
    setTaskList(prevTasks=> 
      prevTasks.map(item=> item.id === id ? {...item, status: "progress"} : item)
    )
    console.log("moveToProg", taskList)
  }
  function moveToDone(id){
    setAdd(prev=> ({...prev, taskPrompt: false, isEdit: false}));
    setTaskList(prevTasks=> 
      prevTasks.map(item=> item.id === id ? {...item, status: "done"} : item)
    )
    console.log("moveToDone")
    setAlert("idle");
  }
  function handleEdit(index){
    setAdd((prev)=> ({...prev, taskPrompt: true, isEdit: true}))
    const selectedTask = taskList[index];
    setEditingId(selectedTask.id)
    setTaskName(selectedTask.text)
    console.log("edit")
    return 
  }
  function handleChange(e){
    return setTaskName(e.target.value)
  }
  function addBtn(){
    setAdd((prev)=> ({...prev, taskPrompt: true, isEdit: false}))
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
    if (index+updatedTask.length === updatedTask.length) return setAlert("top");
    if (index < updatedTask.length){
      [updatedTask[index], updatedTask[index-1]] = [updatedTask[index-1], updatedTask[index]];
      setTaskList(updatedTask)
    }
    console.log("top", index, updatedTask.length)
  }
  function handleMoveDown(index){
    setAlert("idle");
    const updatedTask = [...taskList];
    if (index+2 === updatedTask.length) return setAlert("down");
    if (index < updatedTask.length){ 
      [updatedTask[index+1], updatedTask[index]] = [updatedTask[index], updatedTask[index+1]]
      setTaskList(updatedTask)
    }
    console.log("movedown", index+3, updatedTask.length)
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
  <section className="flex flex-col px-5 bg-slate-900 text-white overflow-hidden">
    <section className="flex items-center justify-center">
      <h1 className="text-3xl p-5 font-bold text-sky-400">Kanban Flow 🚀</h1>
      <button className="bg-gray-950 p-1 cursor-pointer border-2 rounded-xl" onClick={addBtn}>+ New Task</button>
    </section>
    <div>
      <section className="flex">
        <section className="py-5 px-3 ">
          <TaskList alert={alert} taskList={taskList} handleMoveUp={handleMoveUp} handleMoveDown={handleMoveDown} handleEdit={handleEdit} handleDelete={handleDelete} moveToProg={moveToProg} moveToDone={moveToDone} />
        </section>
        <section className="py-5 px-3">
          {add.taskPrompt && <AddTaskComponent alert={alert} taskRef={taskRef} taskName={taskName} handleChange={handleChange} handleSubmit={handleSubmit} handleCancel={handleCancel} />}
          <InProg className="pb-10" taskList={taskList} handleMoveUp={handleMoveUp} handleMoveDown={handleMoveDown} handleEdit={handleEdit} handleDelete={handleDelete} moveToProg={moveToProg} moveToDone={moveToDone} />
        </section>
        <section className="py-5 px-3">
          <Done alert={alert} taskList={taskList} handleMoveUp={handleMoveUp} handleMoveDown={handleMoveDown} handleEdit={handleEdit} handleDelete={handleDelete} moveToTodo={moveToTodo} moveToProg={moveToProg} moveToDone={moveToDone} />
        </section>
      </section>
    </div>
  </section>
  )
}
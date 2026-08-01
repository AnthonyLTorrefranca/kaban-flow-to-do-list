import {useState,useEffect, useRef} from 'react'
import TaskList from './components/TaskList.jsx'
import InProg from "./components/InProg.jsx";
import Done from "./components/Done.jsx";
import AddTaskComponent from './components/TaskComponent/AddTaskComponent.jsx'

export default function App() {
  const inputRef = useRef(null);
  const [add, setAdd] = useState({taskPrompt: false, isEdit: false})
  const [taskName, setTaskName] = useState("")
  const [taskList, setTaskList] = useState([])
  const [alert, setAlert] = useState("idle")
  function handleChange(e){
    setTaskName(e.target.value)
    return setAlert("idle")
  }
  function addBtn(){
    setAlert("idle");
    setTaskName("");
    return setAdd(prev=> ({...prev, taskPrompt: true}))
  }
  function handleDelete(id){
    setAlert("idle");
    const updatedTask = taskList.filter(item=> item.id !== id);
    setTaskList(updatedTask)
    setAdd(prev=> ({...prev, taskPrompt: false}));
    setTaskName("")
  }
  function handleEdit(index){
    const selectedTask = taskList[index].text
    setAdd(prev=> ({...prev, taskPrompt: true, isEdit: true}))
    setTaskName(selectedTask)
    console.log(add, selectedTask)
    return setAlert("edit")
  }
  function handleCancel(){
    setAdd(prev=> ({...prev, taskPrompt: false}));
    setTaskName("")
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
    if (index+1 === updatedTask.length) return setAlert("down");
    if (index < updatedTask.length){ 
      [updatedTask[index+1], updatedTask[index]] = [updatedTask[index], updatedTask[index+1]]
      setTaskList(updatedTask)
    }
    console.log("movedown")
  }
  function handleDone(index){
    const updatedTask = taskList.map(item=> item.isDone === index ? {...item, isDone: !item.isDone} : item)
    setTaskList(updatedTask)
    console.log("handleDone")
  }
  function handleSubmit(e, index){
    e.preventDefault();
    const tTask = taskName.trim();
    const isDuplicate = taskList.some(item=> item.text === tTask.toLowerCase())
    if (tTask === ""){
      return setAlert("blank")
    }
    if (isDuplicate){
      return setAlert("duplicate");
    }
    if (add.isEdit === true){
      setTaskList(prev=> prev.map(item=> item.id !== index ? {...item, text: tTask} : item));
      setAdd(()=> ({taskPrompt: false, isEdit: false}))
      return setTaskName("") 
    }
    const newTask = {id: crypto.randomUUID(), text: tTask, isDone: false};
    setTaskList((prev)=>[...prev, newTask])
    setTaskName("")
    setAdd((prev)=> ({...prev, taskPrompt: false}))
  }
  // useEffect(() => { // if (inputRef.current) { //   inputRef.current.focus(); // } // }, add.taskPrompt]);
  return (
    <section className="flex flex-col px-5 h-280 bg-slate-900 text-white overflow-hidden">
      <section className="flex items-center justify-center">
        <h1 className="text-3xl p-5 font-bold text-sky-400">Kanban Flow 🚀</h1>
        <button className="bg-gray-950 p-1 cursor-pointer border-2 rounded-xl"
          onClick={addBtn}>+ New Task</button>
      </section>
      <div>
        <section className="flex">
          <section className="py-5 px-3">
            <TaskList alert={alert} taskList={taskList} handleMoveUp={handleMoveUp} handleMoveDown={handleMoveDown} handleEdit={handleEdit} handleDelete={handleDelete} handleDone={handleDone} />
          </section>
          <section className="py-5 px-3">
            {add.taskPrompt && <AddTaskComponent ref={inputRef} taskName={taskName} handleChange={handleChange} handleSubmit={handleSubmit} handleCancel={handleCancel} alert={alert} />}
              <InProg className="pb-10" />
          </section>
          <section className="py-5 px-3">
            <Done />
          </section>
        </section>
      </div>
    </section>
  )
}
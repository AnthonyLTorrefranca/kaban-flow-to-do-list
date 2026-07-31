import {useState} from 'react'
import TaskList from './components/TaskList.jsx'
import InProg from "./components/InProg.jsx";
import Done from "./components/Done.jsx";
import AddTaskComponent from './components/TaskComponent/AddTaskComponent.jsx'

export default function App() {
  const [add, setAdd] = useState({taskPrompt: false})
  const [taskName, setTaskName] = useState("")
  const [taskList, setTaskList] = useState([])
  const [alert, setAlert] = useState("idle")
  function handleChange(e){
    setTaskName(e.target.value)
    return setAlert("idle")
  }
  function addBtn(){
    setTaskName("")
    return setAdd(prev=> ({...prev, taskPrompt: true}))
  }
  function handleDelete(id){
    const updatedTask = taskList.filter(item=> item.id !== id);
    setTaskList(updatedTask)
    setAdd(prev=> ({...prev, taskPrompt: false}));
    setTaskName("")
  }
  function handleCancel(){
    setAdd(prev=> ({...prev, taskPrompt: false}));
    setTaskName("")
    return setAlert("idle");
  }
  function handleMoveUp(index){
    const tasks = [...taskList];
    setAlert("idle");
    if (index+tasks.length === tasks.length) return setAlert("top");
    console.log("top",index+tasks.length, tasks.length)
  }
  function handleRewrite(index){
    const selectedTask = taskList[index].text
    setAdd(prev=> ({...prev, taskPrompt: true}))
    setTaskName(selectedTask)
    return setAlert("rewrite")
  }
  function handleMoveDown(index){
    setAlert("idle");
    const tasks = [...taskList];
    if (index+1 === tasks.length) return setAlert("down");
    if (index < tasks.length){ console.log("movedown")}
    console.log("down", index+1, tasks.length)
  }
  function handleCheck(id){
    const updatedTask = taskList.map(item=> item.id === id ? {...item, isChecked: !item.isChecked} : item);
    if (taskList.isChecked === true){
      console.log("true")
    }
    setTaskList(updatedTask)
  }
  function handleSubmit(e){
    e.preventDefault();
    const tTask = taskName.trim().toLowerCase();
    const isDuplicate = taskList.some(item=> item.text === tTask)
    if (tTask === ""){
      return setAlert("blank")
    }
    if (isDuplicate){
      setAlert("duplicate");
      return setTaskName("");
    }
    const newTask = {id: crypto.randomUUID(), text: tTask, ischecked: false};
    setTaskList((prev)=>[...prev, newTask])
    setTaskName("")
    setAdd((prev)=> ({...prev, taskPrompt: false}))
  }
  // useEffect(()=>console.log(taskList),[taskList])
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
            <TaskList alert={alert} taskList={taskList} handleMoveUp={handleMoveUp} handleMoveDown={handleMoveDown} handleRewrite={handleRewrite} handleDelete={handleDelete} handleCheck={handleCheck} />
          </section>
          <section className="py-5 px-3">
            {add.taskPrompt && <AddTaskComponent taskName={taskName} handleChange={handleChange} handleSubmit={handleSubmit} handleCancel={handleCancel} alert={alert} />}
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
import {useState, useEffect} from 'react'
import TaskList from './components/TaskList.jsx'
import InProg from "./components/InProg.jsx";
import Done from "./components/Done.jsx";
import AddTaskComponent from './components/TaskComponent/AddTaskComponent.jsx'

export default function App() {
  const [add, setAdd] = useState({taskPrompt: false})
  const [taskName, setTaskName] = useState("")
  const [taskList, setTaskList] = useState([])
  const [alert, setAlert] = useState(false)
  function handleChange(e){
    setTaskName(e.target.value)
    return setAlert(false)
  }
  function addBtn(){
    setAdd(prev=> ({...prev, taskPrompt: true}))
  }
  function handleCancel(){
    setAdd(prev=> ({...prev, taskPrompt: false}));
    return setAlert(false);
  }
  function handleSubmit(){
    console.log(taskName)
    const tTask = taskName.trim().toLowerCase();
    if (tTask === ""){
      return setAlert(true)
    }
    const newTask = {id: crypto.randomUUID(), text: tTask};
    setTaskList((prev)=>[...prev, newTask])
    setTaskName("")
    setAdd((prev)=> ({...prev, taskPrompt: false}))
  }
  useEffect(()=>console.log(taskList),[taskList])
  return (
    <div className="px-5 justify-center h-280 bg-slate-900 text-white overflow-hidden">
      <section className="flex items-center justify-center">
        <h1 className="text-3xl p-5 font-bold text-sky-400">Kanban Flow 🚀</h1>
        <button className="bg-gray-950 p-1 cursor-pointer border-2 rounded-xl"
          onClick={addBtn}>+ New Task</button>
      </section>
      <section className="flex">
        <section className="py-5 px-3">
          <TaskList />
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
  )
}
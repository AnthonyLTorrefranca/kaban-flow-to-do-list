import TaskBtn from "./AddTaskBtn.jsx";
import Alert from './Alert.jsx'
// section for registering new task
export default function AddTaskComponent({taskRef, taskName, handleChange,handleCancel, handleSubmit, alert}) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center h-screen z-50 bg-gray-500">
        <Alert alert={alert} />
        <h1 className="p-5 text-black">Welcome, pls input your task below!</h1>
        <input ref={taskRef} type="text" className="border p-5 rounded-3xl text-black" placeholder="Enter your task here..." name="taskName" value={taskName} onChange={(e)=> handleChange(e)} />
        <TaskBtn handleCancel={handleCancel} handleSubmit={handleSubmit} />
    </form>
  )
}

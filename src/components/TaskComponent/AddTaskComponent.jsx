import TaskBtn from "./TaskBtn";
import Alert from './Alert.jsx'

export default function AddTaskComponent({taskName, handleChange, handleCancel, handleSubmit,  alert}) {
  return (
    <section className="flex flex-col justify-center items-center h-screen z-50 bg-green-400">
        <Alert alert={alert} />
        <input type="text" className="border p-5 rounded-3xl text-black" placeholder="Enter your task here..."
          name="taskName" value={taskName} onChange={(e)=> handleChange(e)} />
        <TaskBtn handleCancel={handleCancel} handleSubmit={handleSubmit} />
    </section>
  )
}

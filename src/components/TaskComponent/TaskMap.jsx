import TaskListTransfer from './TaskListTransfer'
import TaskListMove from './TaskListMove'

export default function TaskMap({taskList, handleEdit, handleInProg, handleDelete}) {
  return (
    <ul>
      {taskList
        .filter(task=> task.isDone)
        .map((item, index)=>
            <section className="pt-5 px-5 m-5 border border-green-500  rounded-2xl bg-slate-800 text-slate-100 p-4 shadow-lg overflow-hidden" key={item.id}>
                <section className="flex justify-around">
                    <span></span>
                    <li>
                        {item.text}
                    </li>
                    <button className="rounded hover:cursor-pointer hover:bg-red-500" onClick={()=> handleDelete(item.id)}>❌</button>
                </section>
                <TaskListMove index={index} taskList={taskList} handleEdit={handleEdit} />
                <TaskListTransfer index={index} taskList={taskList} handleInProg={handleInProg} handleEdit={handleEdit} />
            </section>)}
    </ul>
  )
}

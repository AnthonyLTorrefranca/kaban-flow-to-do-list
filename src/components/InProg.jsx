import TaskListMove from './TaskComponent/TaskListMove'
import TaskListTransfer from './TaskComponent/TaskListTransfer'

export default function InProg({taskList, handleMoveUp, handleMoveDown, handleEdit, moveToTodo, moveToProg, moveToDone, handleDelete,}) {
  return (
    <section className="flex flex-col items-center justify-baseline h-screen m-w-screen p-10 bg-gray-500  border">
      <p className="font text-2xl">In Progress</p>
      <div className="m-10">
        {taskList
          .filter(task=> task.status === "progress")
          .map((item)=>
            <section className="pt-5 px-5 m-5 border border-green-500  rounded-2xl bg-slate-800 text-slate-100 p-4 shadow-lg overflow-hidden" key={item.id}>
              <section className="flex justify-around">
                <span>{item.text}</span>
                <button className="rounded hover:cursor-pointer hover:bg-red-500" onClick={()=> handleDelete(item.id)}>❌</button>
              </section>
              <section className="actionBtn">
                <TaskListMove 
                  handleMoveUp={handleMoveUp} 
                  handleMoveDown={handleMoveDown} 
                  handleEdit={handleEdit} />
                <TaskListTransfer id={item.id} 
                  moveToTodo={moveToTodo} 
                  moveToProg={moveToProg} 
                  moveToDone={moveToDone} />
              </section>
          </section>)}
      </div>
    </section>
  )
}

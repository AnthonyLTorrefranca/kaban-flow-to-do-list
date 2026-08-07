// import TaskMap from './TaskComponent/TaskMap'
import TaskListMove from './TaskComponent/TaskListMove'
import TaskListTransfer from './TaskComponent/TaskListTransfer'

export default function InProg({taskList, moveToTodo, moveToProg, moveToDone, handleDelete, handleEdit}) {
  return (
    <section className="flex flex-col items-center justify-baseline 
      min-h-screen overflow-hidden w-150 p-10 bg-gray-500  border">
      <p className="font text-2xl">In Progress</p>
      <div className="m-10">
        {taskList
          .filter(task=> task.status === "progress")
          .map((item)=>
              <section className="pt-5 px-5 m-5 border border-yellow-200 
                rounded-2xl bg-slate-800 text-slate-100 p-4 shadow-lg overflow-hidden" key={item.id}>
                <section className="flex justify-around">
                    <span>{item.text}</span>
                    <button className="rounded hover:cursor-pointer 
                      hover:bg-red-500" onClick={()=> handleDelete(item.id)}>❌</button>
                </section>
                <TaskListMove index={item.id} taskList={taskList}
                  handleEdit={handleEdit} />
                <TaskListTransfer id={item.id} moveToTodo={moveToTodo}
                  moveToProg={moveToProg} moveToDone={moveToDone} handleEdit={handleEdit} />
          </section>)}
      </div>
    </section>
  )
}

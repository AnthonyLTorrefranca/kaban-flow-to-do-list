import AlertComponent from './TaskComponent/Alert'
import TaskListMove from './TaskComponent/TaskListMove'
import TaskListTransfer from './TaskComponent/TaskListTransfer'

export default function InProg({alert, taskList, handleMoveUp, handleMoveDown, moveToTodo, moveToProg, moveToDone, handleDelete, handleEdit}) {
  return (
    <section className="flex flex-col items-center justify-baseline 
      min-h-screen overflow-hidden m-w-screen p-10 bg-gray-500  border">
      <AlertComponent alert={alert} taskList={taskList} />
      <div className="m-10">
        {taskList.filter(task=> task.status === "progress").map((item)=>
          <section className="rounded-2xl bg-slate-800 border-2 border-amber-500 text-slate-100 p-4 shadow-lg overflow-hidden" key={item.id}>
                <section className="flex justify-around">
                    <input type="checkbox"/>
                    <span className='underline'>{item.text}</span>
                    <button className="rounded hover:cursor-pointer 
                      hover:bg-red-500" onClick={()=> handleDelete(item.id)}>❌</button>
                </section>
                <TaskListMove index={item.id} 
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  taskList={taskList}
                  handleEdit={handleEdit} />
                <TaskListTransfer id={item.id} moveToTodo={moveToTodo}
                  moveToProg={moveToProg} moveToDone={moveToDone} handleEdit={handleEdit} />
          </section>)}
      </div>
    </section>
  )
}

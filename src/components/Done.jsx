// import TaskMap from "./TaskComponent/TaskMap";
import TaskListTransfer from './TaskComponent/TaskListTransfer'
import TaskListMove from './TaskComponent/TaskListMove'

export default function Done({checked, taskList, handleMoveUp, handleMoveDown, moveToTodo, moveToProg, moveToDone, handleDelete, handleEdit,}) {
  return (
    <>
      <section className="flex flex-col items-center justify-baseline min-h-screen m-w-screen 
        overflow-hidden p-10 bg-gray-500 border">
        <section className="flex items-center justify-center">
          <p className="font text-2xl">Done</p>
        </section>
        <section className="taskList pt-10">
          {taskList
            .filter(task=> task.status === "done")
            .map((item, index)=>
              <section className="pt-5 px-5 m-5 border-2 border-green-500  rounded-2xl 
                bg-slate-800 text-slate-100 p-4 shadow-lg overflow-hidden" key={item.id}>
                <section className="header flex justify-around">
                    <input type="checkbox" value={checked} checked/>
                    <span className="line-through decoration-red-500 decoration-2 decoration-wavy">{item.text}</span>
                    <button className="rounded hover:cursor-pointer hover:bg-red-500" 
                      onClick={()=> handleDelete(item.id)}>❌</button>
                </section>
                <TaskListMove index={index}
                  taskList={taskList}
                  handleMoveUp={handleMoveUp}
                  handleMoveDown={handleMoveDown}
                  handleEdit={handleEdit} />
                <TaskListTransfer id={item.id}
                  handleMoveDown={handleMoveDown}
                  moveToTodo={moveToTodo} 
                  moveToProg={moveToProg} 
                  moveToDone={moveToDone} 
                  handleEdit={handleEdit} />
          </section>)}
        </section>
      </section>
    </>
  )
}

// import TaskMap from "./TaskComponent/TaskMap";
import TaskListTransfer from './TaskComponent/TaskListTransfer'
import TaskListMove from './TaskComponent/TaskListMove'

export default function Done({taskList, moveToTodo, moveToProg, moveToDone,  handleDelete, handleEdit,}) {
  return (
    <>
      <section className="flex flex-col items-center justify-baseline min-h-screen 
        overflow-hidden w-150 p-10 bg-gray-500 border">
        <section className="flex items-center justify-center">
          <p className="font text-2xl">Done</p>
        </section>
        <section className="taskList pt-10">
          {taskList
            .filter(task=> task.status === "done")
            .map((item, index)=>
              <section className="pt-5 px-5 m-5 border border-green-500  rounded-2xl 
                bg-slate-800 text-slate-100 p-4 shadow-lg overflow-hidden" key={item.id}>
              <section className="flex justify-around">
                  <input type="checkbox"/>
                  <span>{item.text}</span>
                  <button className="rounded hover:cursor-pointer hover:bg-red-500" 
                    onClick={()=> handleDelete(item.id)}>❌</button>
              </section>
              <TaskListMove index={index} taskList={taskList} handleEdit={handleEdit} />
              <TaskListTransfer id={item.id} 
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

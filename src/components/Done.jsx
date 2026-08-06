import TaskListMove from "./TaskComponent/TaskListMove";
import TaskListTransfer from "./TaskComponent/TaskListTransfer";

export default function Done({taskList, handleDone, handleDelete }) {
  //  handleEdit, handleMoveUp, handleMoveDown, 
  return (
    <>
      <section className="flex flex-col items-center justify-baseline h-screen w-150 p-10 bg-gray-500 border">
        <section className="flex items-center justify-center">
          <p className="font text-2xl">Done</p>
        </section>
        <section className="taskList pt-10">
          <ul>
            {taskList.filter(item=> item.isDone === true).map((item, id)=>
            <section className="flex flex-col m-5 p-5 border border-green-400 rounded-2xl">
              <div className="flex items-center justify-around"><li></li><li key={item.id}>{item.text}</li> <button onClick={()=> handleDelete()}>❌</button></div>
                <TaskListMove />
                <TaskListTransfer id={item.id} taskList={taskList} handleDone={handleDone}/>
            </section>
            )}
          </ul>
        </section>
      </section>
    </>
  )
}

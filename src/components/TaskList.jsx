import AlertComponent from './TaskComponent/Alert.jsx'
import TaskListMove from './TaskComponent/TaskListMove.jsx'
import TaskListTransfer from './TaskComponent/TaskListTransfer.jsx'

export default function TaskList({alert, taskList, moveToProg, moveToDone, handleDelete, handleMoveUp, handleMoveDown, handleEdit, moveToTodo}) {
  return (
    <>
      <section className="flex flex-col items-center justify-baseline h-screen m-w-screen p-10 bg-gray-500 border">
        <section className="header">
          <AlertComponent alert={alert} />
          {taskList.filter(list=> list.status === "todo").map((item)=>
            <section className="pt-5 px-5 m-5 border border-red-500  rounded-2xl bg-slate-800 text-slate-100 p-4 shadow-lg overflow-hidden" key={item.id}>
              <section className="taskGrp flex flex-row items-baseline justify-around">
              <ul className="lists py-10">
                  <li className="px-5 text-yellow-100">{item.text}</li>
              </ul>
              <button className="cursor-pointer hover:bg-red-700 rounded" onClick={()=> handleDelete(item.id)}>❌</button>
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
          </section>
      </section>
    </>
  )
}

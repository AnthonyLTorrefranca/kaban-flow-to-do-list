import AlertComponent from './TaskComponent/Alert.jsx'
import TaskListMove from './TaskComponent/TaskListMove.jsx'
import TaskListTransfer from './TaskComponent/TaskListTransfer.jsx'

export default function TaskList({alert, taskList, moveToTodo, moveToProg, moveToDone, handleDelete, handleEdit}) {
  return (
    <>
      <section className="flex flex-col items-center justify-baseline overflow-hidden w-150 p-10 bg-gray-500 border">
        <section className="header">
          <AlertComponent alert={alert} />
          {taskList
            .filter(task=> task.status === "todo")
            .map((item, index)=>
              <section className="pt-5 px-5 m-5 border border-red-500  rounded-2xl bg-slate-800 text-slate-100 p-4 shadow-lg overflow-hidden" key={item.id}>
                <section className="flex justify-around">
                  <input type="checkbox"/>
                  <span>{item.text}</span>
                  <button className="rounded hover:cursor-pointer hover:bg-red-500" onClick={()=> handleDelete(item.id)}>❌</button>
                </section>
                  <TaskListMove index={index} taskList={taskList} handleEdit={handleEdit} />
                  <TaskListTransfer id={item.id} moveToTodo={moveToTodo} moveToProg={moveToProg} moveToDone={moveToDone} handleEdit={handleEdit} />
              </section>)}
        </section>
      </section>
    </>
  )
}

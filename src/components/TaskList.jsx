import AlertComponent from './TaskComponent/Alert.jsx'
import TaskListMove from './TaskComponent/TaskListMove.jsx'
import TaskListTransfer from './TaskComponent/TaskListTransfer.jsx'

export default function TaskList({alert, taskList, handleMoveUp, handleMoveDown, handleEdit, handleDelete, handleDone}) {
  return (
    <>
      <section className="flex flex-col items-center justify-baseline h-screen w-150 p-10 bg-gray-500  border">
        <section className="header">
          <AlertComponent alert={alert} />
        </section>
          {taskList.map((item, index)=>
            <section className="pt-5 px-5 m-5 border-full rounded-2xl bg-slate-800 border border-slate-600/50 text-slate-100 p-4 shadow-lg overflow-hidden" key={item.id}>
              <section className="taskGrp flex flex-row items-baseline justify-around">
                <ul className="lists py-10">
                  <li className="px-5 text-yellow-100">{item.text}</li>
                </ul>
                <button className="cursor-pointer hover:bg-red-700 rounded" onClick={()=> handleDelete(item.id)}>❌</button>
              </section>
              <div className="flex flex-col items-center">
                <TaskListMove index={index} handleMoveUp={handleMoveUp} handleMoveDown={handleMoveDown} handleEdit={handleEdit} />
                <TaskListTransfer handleDone={handleDone} />
              </div>
          </section> )}
      </section>
    </>
  )
}

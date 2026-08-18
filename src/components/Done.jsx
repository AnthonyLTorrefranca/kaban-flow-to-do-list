import Alert from './TaskComponent/Alert'
import TaskListTransfer from './TaskComponent/TaskListTransfer'
import TaskListMove from './TaskComponent/TaskListMove'

export default function Done({ alert, taskList, handleMoveUp, handleMoveDown, moveToTodo, moveToProg, moveToDone, handleDelete, handleEdit }) {
  return (
    <section className="flex flex-col items-center justify-baseline min-h-screen m-w-screen overflow-hidden p-10 bg-gray-500 border">
      <section className="flex items-center justify-center">
        <Alert alert={alert} title="Done" />
      </section>
      <section>
        {taskList.filter(task => task.status === 'done').map(item => (
          <section className="pt-5 px-5 m-5 border-2 border-red-500 rounded-2xl bg-slate-800 text-slate-100 p-4 shadow-lg overflow-hidden" key={item.id}>
            <section className="header flex justify-around">
              <span className="line-through decoration-red-500 decoration-2 decoration-wavy">{item.text}</span>
              <button className="rounded hover:cursor-pointer hover:bg-red-500" onClick={() => handleDelete(item.id)}>❌</button>
            </section>
            <TaskListMove
              id={item.id}
              section="done"
              taskList={taskList}
              handleMoveUp={handleMoveUp}
              handleMoveDown={handleMoveDown}
              handleEdit={handleEdit}
            />
            <TaskListTransfer id={item.id} moveToTodo={moveToTodo} moveToProg={moveToProg} moveToDone={moveToDone} />
          </section>
        ))}
      </section>
    </section>
  )
}

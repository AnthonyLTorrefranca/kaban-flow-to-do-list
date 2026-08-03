import AlertComponent from './TaskComponent/Alert.jsx'
import TaskListHandler from './TaskListHandler.jsx'

export default function TaskList({id, alert, taskList, handleMoveUp, handleMoveDown, handleEdit, handleDelete, handleDone}) {
  return (
    <>
      <section className="flex flex-col items-center justify-baseline h-screen w-150 p-10 bg-gray-500  border">
        <section className="header">
          <AlertComponent alert={alert} />
        </section>
          <TaskListHandler taskList={taskList} handleDelete={handleDelete} handleMoveUp={handleMoveUp} handleMoveDown={handleMoveDown} handleEdit={handleEdit} handleDone={handleDone} />
      </ section>
    </>
  )
}

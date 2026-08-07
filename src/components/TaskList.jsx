import AlertComponent from './TaskComponent/Alert.jsx'
import TaskListHandler from './TaskListHandler.jsx'

export default function TaskList({alert, taskList, moveToProg, moveToDone, handleDelete}) {
  return (
    <>
      <section className="flex flex-col items-center justify-baseline h-screen w-150 p-10 bg-gray-500 border">
        <section className="header">
          <AlertComponent alert={alert} />
          <TaskListHandler taskList={taskList} handleDelete={handleDelete} moveToProg={moveToProg} moveToDone={moveToDone} />
        </section>
      </section>
    </>
  )
}

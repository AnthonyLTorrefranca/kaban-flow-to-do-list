import TaskMap from "./TaskComponent/TaskMap";

export default function Done({index, taskList, handleEdit}) {
  return (
    <>
      <section className="flex flex-col items-center justify-baseline h-screen w-150 p-10 bg-gray-500 border">
        <section className="flex items-center justify-center">
          <p className="font text-2xl">Done</p>
        </section>
        <section className="taskList pt-10">
          <ul>
            <TaskMap id={index} taskList={taskList} handleEdit={handleEdit} />
          </ul>
        </section>
      </section>
    </>
  )
}

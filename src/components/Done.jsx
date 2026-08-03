import TaskListMove from "./TaskComponent/TaskListMove";
import TaskListTransfer from "./TaskComponent/TaskListTransfer";

export default function Done({taskList}) {
  return (
    <>
      <section className="flex flex-col items-center justify-baseline h-screen w-150 p-10 bg-gray-500   border">
        <section className="flex items-center justify-center">
          <p className="font text-2xl">Done</p>
        </section>
        <section className="taskList pt-10">
          <ul>
            <li>{taskList.text}</li>
              <TaskListMove />
              <TaskListTransfer />
          </ul>
        </section>
      </section>
    </>
  )
}

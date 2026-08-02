import TaskListMove from "./TaskComponent/TaskListMove";
import TaskListTransfer from "./TaskComponent/TaskListTransfer";

export default function Done({taskList}) {
  return (
    <section className="flex flex-col items-center justify-baseline h-screen w-150 p-10 bg-gray-500   border">
      <section className="header">
        <p className="font text-2xl">Done</p>
      </section>
      <section className="taskList pt-10">
        <ul>
          {taskList.map((item, id)=>
            <li key={item.id}>{item.text}
            <TaskListMove />
            <TaskListTransfer />
            </li>
          )}
        </ul>
      </section>
    </section>
  )
}

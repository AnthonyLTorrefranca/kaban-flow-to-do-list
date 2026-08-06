import TaskListMove from "./TaskComponent/TaskListMove";

export default function Done({taskList}) {
  return (
    <>
      <section className="flex flex-col items-center justify-baseline h-screen w-150 p-10 bg-gray-500 border">
        <section className="flex items-center justify-center">
          <p className="font text-2xl">Done</p>
        </section>
        <section className="taskList pt-10">
          <ul>
            {taskList
              .filter(item=> item.isDone)
              .map((item, id)=>
                <section className="pt-5 px-5 m-5 border border-green-500  rounded-2xl bg-slate-800 text-slate-100 p-4 shadow-lg overflow-hidden" key={item.id}>
                  <li>{item.text}
                    <TaskListMove taskList={taskList}/>
                  </li>
                </section>
            )}
          </ul>
        </section>
      </section>
    </>
  )
}

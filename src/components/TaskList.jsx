export default function TaskList({alert, taskList, handleMoveUp, handleMoveDown, handleRewrite, handleDelete}) {
  return (
    <>
      <section className="flex flex-col items-center justify-baseline h-screen w-150 p-10 bg-gray-500  border">
        <section className="header">
          {alert === "idle" && <p className="text-2xl">Task List</p>}
          {alert === "blank" && <p className="text-2xl">Task List</p>}
          {alert === "rewrite" && <p className="text-2xl">Rewrite task mode.</p>}
          {alert === "duplicate" && <p className="text-2xl">Task List</p>}
          {alert === "down" && <p className="text-2xl text-red-500">All the way down!!</p>}
          {alert === "top" && <p className="text-2xl text-red-500">All the way up!!</p>}
        </section>
        <ul className="lists py-10">
          {taskList.map((item, index)=>
            <section className="pt-5 px-5 m-5 border-full rounded-2xl bg-red-900 overflow-hidden" key={item.id}>
              <section className="taskGrp flex flex-row items-baseline justify-around">
                <input type="checkbox" className="" />
                <li className="px-5">{item.text}</li>
                <button className="cursor-pointer hover:bg-red-700" onClick={()=> handleDelete(item.id)}>❌</button>
              </section>
                <section className="taskBtn flex flex-row items-center justify-center m-3 pl-3">
                  <button className="border p-3 mx-3 cursor-pointer" onClick={()=> handleMoveUp(index)}>☝️</button>
                  <button className="border p-3 mx-3 cursor-pointer" onClick={()=> handleMoveDown(index)}>👇</button>
                  <button className="border p-3 mx-3 cursor-pointer" onClick={()=> handleRewrite()}>❔</button>
                </section>
              <section className="modeBtn">
                <button className="border p-3 mx-3 cursor-pointer">Task List</button>
                <button className="border p-3 mx-3 cursor-pointer">In progress</button>
                <button className="border p-3 mx-3 cursor-pointer">Done</button>
              </section>
          </section> )}
        </ul>
      </section>
    </>
  )
}

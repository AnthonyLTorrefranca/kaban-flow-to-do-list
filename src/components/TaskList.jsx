export default function TaskList({alert, taskList, handleMoveUp, handleMoveDown, handleEdit, handleDelete, handleDone}) {
  return (
    <>
      <section className="flex flex-col items-center justify-baseline h-screen w-150 p-10 bg-gray-500  border">
        <section className="header">
          {alert === "idle" && <p className="text-2xl">Task List</p>}
          {alert === "blank" && <p className="text-2xl">Task cannot be blank!</p>}
          {alert === "edit" && <p className="text-2xl">Edit task mode.</p>}
          {alert === "duplicate" && <p className="text-2xl">Duplicate Task!</p>}
          {alert === "down" && <p className="text-2xl text-red-500">All the way down!</p>}
          {alert === "top" && <p className="text-2xl text-red-500">All the way up!</p>}
        </section>
        <ul className="lists py-10">
          {taskList.map((item, index)=>
            <section className="pt-5 px-5 m-5 border-full rounded-2xl bg-yellow-100 overflow-hidden" key={item.id}>
              <section className="taskGrp flex flex-row items-baseline justify-around">
                <li></li>
                <li className="px-5 text-black">{item.text}</li>
                <button className="cursor-pointer hover:bg-red-700 rounded" onClick={()=> handleDelete(item.id)}>❌</button>
              </section>
                <section className="taskBtn flex flex-row items-center justify-center m-3 pl-3">
                  <button className="border rounded-2xl p-3 mx-3 cursor-pointer text-black hover:bg-amber-200" onClick={()=> handleMoveUp(index)}>☝️</button>
                  <button className="border rounded-2xl p-3 mx-3 cursor-pointer text-black hover:bg-amber-200" onClick={()=> handleMoveDown(index)}>👇</button>
                  <button className="border rounded-2xl p-3 mx-3 cursor-pointer text-black hover:bg-amber-200" onClick={()=> handleEdit(index)}>✏️</button>
                </section>
              <section className="modeBtn">
                <button className="border rounded-2xl p-3 mx-3 mb-2 cursor-pointer text-black hover:bg-green-300">Task List</button>
                <button className="border rounded-2xl p-3 mx-3 mb-2 cursor-pointer text-black hover:bg-green-300">In progress</button>
                <button className="border rounded-2xl p-3 mx-3 mb-2 cursor-pointer text-black hover:bg-green-300" onClick={()=> handleDone(index)}>Done</button>
              </section>
          </section> )}
        </ul>
      </section>
    </>
  )
}

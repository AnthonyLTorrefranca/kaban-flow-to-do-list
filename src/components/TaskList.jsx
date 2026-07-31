export default function TaskList({taskList, handleDelete}) {
  return (
    <>
      <section className="flex flex-col items-center justify-baseline h-screen w-150 p-10 bg-gray-500  border">
        <section className="header">
          <p className="font text-2xl">Task List</p>
        </section>
        <ul className="lists py-10">
          {taskList.map((item)=>
            <section className="m-5 p-5 border-full rounded-2xl bg-red-900 overflow-hidden" key={item.id}>
              <section className="taskGrp flex flex-row items-baseline justify-around">
                <input type="checkbox" className="" />
                <li className="px-5">{item.text}</li>
                <button className="cursor-pointer hover:bg-red-700" onClick={()=> handleDelete(item.id)}>❌</button>
              </section>
              <section className="taskBtn flex flex-row m-3 pl-3">
                <button className="border p-3 mx-3 cursor-pointer">Prev</button>
                <button className="border p-3 mx-3 cursor-pointer">Next</button>
              </section>
          </section> )}
        </ul>
      </section>
    </>
  )
}

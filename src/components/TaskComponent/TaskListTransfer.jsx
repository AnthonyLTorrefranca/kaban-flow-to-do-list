export default function TaskListTransfer({id, handleDone}) {
  return (
    <section>
      <button className="border rounded-2xl p-3 mx-3 mb-2 cursor-pointer text-yellow-100 hover:bg-blue-900">Task List</button>
      <button className="border rounded-2xl p-3 mx-3 mb-2 cursor-pointer text-yellow-100 hover:bg-blue-900">In progress</button>
      <button className="border rounded-2xl p-3 mx-3 mb-2 cursor-pointer text-yellow-100 hover:bg-blue-900" onClick={()=> handleDone(id)}>Done</button>
    </section>
  )
}

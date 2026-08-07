export default function TaskListTransfer({id, moveToTodo, moveToProg,  moveToDone}) {
  return (
    <section>
      <button className="border rounded-2xl p-3 mx-3 mb-2 cursor-pointer text-yellow-100 hover:bg-blue-900" onClick={()=> moveToTodo(id)}>Task List</button>
      <button className="border rounded-2xl p-3 mx-3 mb-2 cursor-pointer text-yellow-100 hover:bg-blue-900" onClick={()=> moveToProg(id)}>In progress</button>
      <button className="border rounded-2xl p-3 mx-3 mb-2 cursor-pointer text-yellow-100 hover:bg-blue-900" onClick={()=> moveToDone(id)}>Done</button>
    </section>
  )
}

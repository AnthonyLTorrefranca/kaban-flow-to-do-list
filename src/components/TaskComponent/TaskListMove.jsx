export default function TaskListMove({ id, section, handleMoveUp, handleMoveDown, handleEdit }) {
  return (
    <section className="taskBtn flex flex-row items-center justify-center m-3 pl-3">
      <button className="border rounded-2xl p-3 mx-3 cursor-pointer text-yellow-100 hover:bg-blue-900" onClick={() => handleMoveUp(id, section)}>☝️</button>
      <button className="border rounded-2xl p-3 mx-3 cursor-pointer text-yellow-100 hover:bg-blue-900" onClick={() => handleMoveDown(id, section)}>👇</button>
      <button className="border rounded-2xl p-3 mx-3 cursor-pointer text-yellow-100 hover:bg-blue-900" onClick={() => handleEdit(id)}>✏️</button>
    </section>
  )
}

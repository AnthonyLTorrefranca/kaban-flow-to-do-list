export default function TaskBtn({handleSubmit, handleCancel}) {
  return (
    <section className="p-5 m-5">
      <button type="button" className="p-5 m-2 border-2 border-red-900 hover:bg-red-600 rounded-xl cursor-pointer" onClick={() => handleCancel()}>Cancel</button>
      <button type="submit" className="p-5 px-6 m-2 border-2 rounded-xl cursor-pointer hover:bg-green-600 border-green-500" onClick={(e) => handleSubmit(e)}>ADD</button>
    </section>
  )
}

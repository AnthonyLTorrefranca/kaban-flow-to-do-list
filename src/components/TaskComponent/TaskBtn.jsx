export default function TaskBtn({handleSubmit, handleCancel}) {
  return (
    <section className="p-5 m-5">
      <button className="p-5 m-2 border-2 rounded-xl cursor-pointer" onClick={()=> handleCancel()}>Cancel</button>
      <button className="p-5 m-2 border-2 rounded-xl cursor-pointer">Prev</button>
      <button className="p-5 m-2 border-2 rounded-xl cursor-pointer">Next</button>
      <button className="p-5 m-2 border-2 rounded-xl cursor-pointer" onClick={()=> handleSubmit()}>ADD</button>
    </section>
  )
}

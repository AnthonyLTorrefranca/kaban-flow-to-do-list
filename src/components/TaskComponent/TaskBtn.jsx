export default function TaskBtn({handleSubmit, handleCancel}) {
  return (
    <section className="p-5 m-5">
      <button type="button" className="p-5 m-2 border-2 rounded-xl cursor-pointer" onClick={()=> handleCancel()}>Cancel</button>
      <button type="button" className="p-5 m-2 border-2 rounded-xl cursor-pointer" onClick={()=> handleSubmit()}>ADD</button>
    </section>
  )
}

export default function Alert({alert}) {
  return (
    <section>
      {alert === "duplicate" && <h1 className="text-black">Task is uncomplete!</h1>}
      {alert === true && <h1 className="text-red-500">Task cannot be blank!</h1>}
    </section>
  )
}

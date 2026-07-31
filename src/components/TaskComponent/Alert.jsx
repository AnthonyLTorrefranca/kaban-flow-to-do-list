export default function Alert({alert}) {
  return (
    <section>
      {alert === "blank" && <h1 className="text-red-500">Task cannot be blank!</h1>}
      {alert === "duplicate" && <h1 className="text-red-500">Task is incomplete!</h1>}
    </section>
  )
}

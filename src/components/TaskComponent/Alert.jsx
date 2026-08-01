export default function Alert({alert}) {
  return (
    <section>
      {alert === "blank" && <h1 className="text-red-500">Task cannot be blank!</h1>}
      {alert === "duplicate" && <p className="text-2xl text-red-500">Duplicate Task!</p>}
    </section>
  )
}

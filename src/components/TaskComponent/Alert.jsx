export default function Alert({alert}) {
  return (
    <section>
      {alert === "idle" && <p className="flex items-center justify-center text-2xl">Task List</p>}
      {alert === "blank" && <p className="flex items-center justify-center text-2xl text-red-500">Task cannot be blank!</p>}
      {alert === "top" && <p className="flex items-center justify-center text-2xl text-red-500">All the way up!</p>}
      {alert === "down" && <p className="flex items-center justify-center text-2xl text-red-500">All the way down!</p>}
      {alert === "duplicate" && <p className="flex items-center justify-center text-2xl text-red-500">Duplicate Task!</p>}
      {alert === "edit" && <p className="flex items-center justify-center text-2xl">Edit task mode.</p>}
      {alert === "max" && <p className="flex items-center justify-center text-2xl text-red-500">Max Character!</p>}
    </section>
  )
}

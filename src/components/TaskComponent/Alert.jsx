export default function Alert({alert}) {
  return (
    <section>
      {alert === true && <h1>Task cannot be blank!</h1>}
    </section>
  )
}

export default function Alert({ alert, title = 'Task List' }) {
  if (alert === 'idle') return <p className="text-2xl">{title}</p>;
  if (alert === 'top') return <p className="text-red-500 text-2xl">Already at the top!</p>;
  if (alert === 'down') return <p className="text-red-500 text-2xl">Already at the bottom!</p>;
  if (alert === 'blank') return <p className="text-red-500 text-2xl">Task cannot be blank!</p>;
  if (alert === 'duplicate') return <p className="text-red-500 text-2xl">Duplicate Task!</p>;
  if (alert === 'same') return <p className="text-red-500 text-2xl">Already in this section!</p>;
  return <p className="text-2xl">{title}</p>;
}


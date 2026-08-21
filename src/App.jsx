import { useState, useEffect, useRef } from "react";
import TaskList from "./components/TaskList.jsx";
import InProg from "./components/InProg.jsx";
import Done from "./components/Done.jsx";
import AddTaskComponent from "./components/TaskComponent/AddTaskComponent.jsx";

export default function App() {
  const taskRef = useRef(null);
  const [add, setAdd] = useState({ taskPrompt: false, isEdit: false });
  const [editingId, setEditingId] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [alerts, setAlerts] = useState({
    todo: "idle",
    progress: "idle",
    done: "idle",
  });
  const [taskList, setTaskList] = useState(() => {
    const saved = localStorage.getItem("taskList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  useEffect(() => {
    if (add.taskPrompt && taskRef.current) taskRef.current.focus();
  }, [add.taskPrompt]);

  const updateAlert = (section, value) => {
    setAlerts((prev) => ({ ...prev, [section]: value }));
  };

  const resetAlerts = () => {
    setAlerts({ todo: "idle", progress: "idle", done: "idle" });
  };

  function moveToTodo(id) {
    const selectedTask = taskList.find((item) => item.id === id);
    if (!selectedTask) return;

    setAdd((prev) => ({ ...prev, taskPrompt: false, isEdit: false }));
    setTaskList((prevTasks) =>
      prevTasks.map((item) =>
        item.id === id ? { ...item, status: "todo" } : item,
      ),
    );

    if (selectedTask.status === "todo") {
      updateAlert("todo", "same");
      return;
    }
    resetAlerts();
  }

  function moveToProg(id) {
    const selectedTask = taskList.find((item) => item.id === id);
    if (!selectedTask) return;
    if (selectedTask.status === "progress") {
      updateAlert("progress", "same");
      return;
    }

    setAdd((prev) => ({ ...prev, taskPrompt: false, isEdit: false }));
    setTaskList((prevTasks) =>
      prevTasks.map((item) =>
        item.id === id ? { ...item, status: "progress" } : item,
      ),
    );
    resetAlerts();
  }

  function moveToDone(id) {
    const selectedTask = taskList.find((item) => item.id === id);
    if (!selectedTask) return;
    if (selectedTask.status === "done") {
      updateAlert("done", "same");
      return;
    }
    setAdd((prev) => ({ ...prev, taskPrompt: false, isEdit: false }));
    setTaskList((prevTasks) =>
      prevTasks.map((item) =>
        item.id === id ? { ...item, status: "done" } : item,
      ),
    );
    resetAlerts();
  }

  function handleEdit(id) {
    const selectedTask = taskList.find((item) => item.id === id);
    setAdd((prev) => ({ ...prev, taskPrompt: true, isEdit: true }));
    setTaskName(selectedTask.text);
    setEditingId(selectedTask.id);
    taskRef.current?.focus();
    console.log("eidt");
  }

  function handleChange(e) {
    return setTaskName(e.target.value);
  }

  function addBtn() {
    setAdd((prev) => ({ ...prev, taskPrompt: true, isEdit: false }));
    setEditingId(null);
    resetAlerts();
    setTaskName("");
    taskRef.current?.focus();
  }

  function handleDelete(id) {
    const updatedTask = taskList.filter((item) => item.id !== id);
    setAdd((prev) => ({ ...prev, taskPrompt: false, isEdit: false }));
    setEditingId(null);
    setTaskList(updatedTask);
    resetAlerts();
    setTaskName("");
  }

  function handleCancel() {
    setAdd((prev) => ({ ...prev, taskPrompt: false, isEdit: false }));
    setEditingId(null);
    setTaskName("");
    resetAlerts();
  }

  function handleMoveUp(id, status) {
    resetAlerts();
    setAdd((prev) => ({ ...prev, taskPrompt: false, isEdit: false }));
    const updatedTask = [...taskList];

    const taskStat = taskList.filter((item) => item.status === status);
    const taskInd = taskStat.findIndex((item) => item.id === id);

    if (taskInd === 0) return updateAlert(status, "top");

    const currTask = taskStat[taskInd];
    const prevTask = taskStat[taskInd - 1];

    const currRealInd = updatedTask.findIndex(
      (item) => item.id === currTask.id,
    );
    const prevRealInd = updatedTask.findIndex(
      (item) => item.id === prevTask.id,
    );

    [updatedTask[currRealInd], updatedTask[prevRealInd]] = [
      updatedTask[prevRealInd],
      updatedTask[currRealInd],
    ];
    setTaskList(updatedTask);
    console.log("up", currRealInd);
  }

  function handleMoveDown(id, status) {
    resetAlerts();
    const updatedTask = [...taskList];
    const taskStat = updatedTask.filter((item) => item.status === status);
    const taskInd = taskStat.findIndex((item) => item.id === id);

    if (taskInd + 1 === taskStat.length) updateAlert(status, "down");

    const currTask = taskStat[taskInd];
    const prevTask = taskStat[taskInd + 1];

    console.log("down", prevTask);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const tTask = taskName.trim();
    const isDuplicate = taskList.some(
      (item) => item.id !== editingId && item.text === tTask,
    );
    if (tTask === "") {
      updateAlert("todo", "blank");
      return;
    }
    if (isDuplicate) {
      updateAlert("todo", "duplicate");
      return;
    }
    if (add.isEdit) {
      setTaskList((task) =>
        task.map((item) =>
          item.id === editingId ? { ...item, text: tTask } : item,
        ),
      );
      setAdd((prev) => ({ ...prev, taskPrompt: false, isEdit: false }));
      setEditingId(null);
      setTaskName("");
      return;
    }
    const newTask = { id: crypto.randomUUID(), text: tTask, status: "todo" };
    setAdd((prev) => ({ ...prev, taskPrompt: false }));
    setTaskList((prev) => [...prev, newTask]);
    resetAlerts();
    setTaskName("");
  }

  return (
    <section className="min-h-screen px-5 bg-slate-900 text-white overflow-hidden">
      <header className="flex items-center justify-center">
        <h1 className="text-3xl p-5 font-bold text-sky-400">Kanban Flow 🚀</h1>
        <button
          className="bg-gray-950 p-1 cursor-pointer border-2 rounded-xl"
          onClick={addBtn}
        >
          {" "}
          + New Task{" "}
        </button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <section>
          <TaskList
            alert={alerts.todo}
            taskList={taskList}
            handleMoveUp={handleMoveUp}
            handleMoveDown={handleMoveDown}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            moveToTodo={moveToTodo}
            moveToProg={moveToProg}
            moveToDone={moveToDone}
          />
        </section>
        <section>
          {add.taskPrompt && (
            <AddTaskComponent
              alert={alerts.todo}
              taskName={taskName}
              taskRef={taskRef}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
            />
          )}
          {!add.taskPrompt && (
            <InProg
              alert={alerts.progress}
              taskList={taskList}
              handleMoveUp={handleMoveUp}
              handleMoveDown={handleMoveDown}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              moveToTodo={moveToTodo}
              moveToProg={moveToProg}
              moveToDone={moveToDone}
            />
          )}
        </section>
        <section>
          <Done
            alert={alerts.done}
            taskList={taskList}
            handleMoveUp={handleMoveUp}
            handleMoveDown={handleMoveDown}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            moveToTodo={moveToTodo}
            moveToProg={moveToProg}
            moveToDone={moveToDone}
          />
        </section>
      </div>
    </section>
  );
}

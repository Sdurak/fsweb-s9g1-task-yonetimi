import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { initialTasks, initialTeam } from "./data";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import "./app.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const notify = (text) => toast("heyy!" + text);
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks]);
    notify(yeniTask.title + "yapılmak için bekliyor");
  }

  function handlePeopleSubmit(yeniKisi) {
    notify(yeniKisi + "iş kitlemek için hazır");
    setTeam([...team, yeniKisi]);
  }

  function handleComplete(id) {
    console.log("tamamlama fonksiyonunu buraya yazın", id);
    const tasksClone = [...tasks];
    const updatedTask = tasksClone.find((t) => t.id === id);
    updatedTask.status = "yapıldı";
    console.log("updatedTask", updatedTask);
    notify(updatedTask.title + "tamamlandı!");
    setTasks(tasksClone);
  }

  return (
    <div className="app">
      <div className="formColumn">
        <div className="form-container">
          <h2>Yeni Task</h2>
          {/* <TaskForm kisiler={team} submitFn={handleTaskSubmit} /> */}
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div className="form-container">
          <h2>Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="column-title">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapılacak")
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
          </div>
        </div>
        <div className="column">
          <h2 className="column-title">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapıldı")
              .map((t) => (
                <Task key={t.id} taskObj={t} />
              ))}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;

// console.log("tamamlama fonksiyonunu buraya yazın");
// const taskKopya = [...tasks];
// const tiklananTask = taskKopya.filter((olay) => olay.id === id)[0];
// tiklananTask.status = "yapıldı";
// setTasks(taskKopya);

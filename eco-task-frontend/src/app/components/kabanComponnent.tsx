"use client"

import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  responsible: string;
  duedate: string;
  priority: "low" | "medium" | "high";
  carbonFootprint: number;
  check: boolean;
  projectId: number;
}

export default function KanbanBoard({ projectId }: { projectId: number }) {
    const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

      try {
        const res = await fetch(`${API_BASE_URL}/tasks/project/${projectId}`, { credentials: "include" });
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, [projectId]);

  const moveTask = async (id: number) => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      const res = await fetch(`${API_BASE_URL}/checkTasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour de la tâche");
      const updatedTask: Task = await res.json();
      setTasks(prevTasks => prevTasks.map(task => task.id === id ? updatedTask : task));
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="flex gap-6 p-6">
      <div className="w-1/2 bg-gray-900 p-4 rounded">
        <h2 className="text-xl font-bold mb-4">À Faire</h2>
        {tasks.filter(task => !task.check).map(task => (
          <TaskCard key={task.id} task={task} moveTask={moveTask} />
        ))}
      </div>
      <div className="w-1/2 bg-gray-900 p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Terminées</h2>
        {tasks.filter(task => task.check).map(task => (
          <TaskCard key={task.id} task={task} moveTask={moveTask} />
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task, moveTask }: { task: Task; moveTask: (id: number, check: boolean) => void; }) {
  return (
    <div className="bg-gray-700 p-4 rounded shadow mb-4">
      <h3 className="font-bold">{task.title}</h3>
      <p className="text-sm">Desc : {task.description}</p>
      <p className="text-sm">Responsable : {task.responsible}</p>
      <p className="text-sm">Échéance : {task.duedate}</p>
      <p className="text-sm">Priorité : <span className={`font-bold ${task.priority === "high" ? "text-red-500" : task.priority === "medium" ? "text-yellow-500" : "text-green-500"}`}>{task.priority}</span></p>
      <p className="text-sm">Empreinte carbone : {task.carbonFootprint} kg CO₂</p>
      <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded" onClick={() => moveTask(task.id, !task.check)}>
        {task.check ? "Rouvrir" : "Terminer"}
      </button>
    </div>
  );
}

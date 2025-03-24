"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function AddTask() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [responsible, setResponsible] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low")
  const [projectId, setProjectId] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  
  interface Project {
    id: string;
    name: string;
  }

  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState("")

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProject(e.target.value);
    setProjectId(e.target.value);
  };

  useEffect(() => {
    axios.get(`${API_BASE_URL}/projects`)
      .then((response) => {
        console.log(response.data);
        setProjects(response.data); // Assurez-vous que la réponse est bien un tableau de projets
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des projets :', error);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    try {
      const res = await axios.post(
        `${API_BASE_URL}/tasks`,
        { title, description, responsible, dueDate, priority, projectId },
        { withCredentials: true }
      )

      if (res.status === 201) {
        setSuccess(true)
        setTitle("")
        setDescription("")
        setResponsible("")
        setDueDate("")
        setPriority("low")
        setProjectId("")
        setSelectedProject("")
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Échec de l'ajout de la tâche")
      } else {
        setError("Une erreur inconnue s'est produite")
      }
    }
  }

  return (
    <div className="bg-dark p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-2xl font-bold mb-4 text-center">Ajouter une tâche</h2>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && <p className="text-green-500 text-sm text-center">Tâche ajoutée avec succès!</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Titre</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border bg-gray-900 rounded mt-1" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border bg-gray-900 rounded mt-1" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Responsable</label>
          <input type="text" value={responsible} onChange={(e) => setResponsible(e.target.value)} className="w-full p-2 border bg-gray-900 rounded mt-1" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">échéance</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full p-2 border bg-gray-900 rounded mt-1" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Priorité</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")} className="w-full bg-gray-900 p-2 border rounded mt-1">
            <option value="low">Basse</option>
            <option value="medium">Moyenne</option>
            <option value="high">Haute</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-white">nom du projet</label>
          <select
            id="project"
            name="project"
            value={selectedProject}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1 bg-gray-900 text-white"
          >
            <option value="">-- Choisissez un projet --</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id} className="bg-dark text-white">
                {project.name} {/* Remplacez `title` par le champ approprié */}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-dark py-2 rounded hover:bg-blue-600 transition">
          Ajouter
        </button>
      </form>
    </div>
  )
}

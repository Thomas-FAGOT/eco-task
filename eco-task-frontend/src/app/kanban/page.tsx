"use client"

import { useEffect, useState } from "react";
import KanbanBoard from "@/app/components/kabanComponnent";

interface Project {
  id: number;
  name: string;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      console.log("API_BASE_URL", process.env.NEXT_PUBLIC_API_URL);
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

      try {
        const res = await fetch(`${API_BASE_URL}/projects`, { credentials: "include" });
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des projets:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <div>
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="my-6">
              <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
              <KanbanBoard projectId={project.id} />
            </div>
          ))
        ) : (
          <p>Chargement des projets...</p>
        )}
      </div>
    </div>
  );
}

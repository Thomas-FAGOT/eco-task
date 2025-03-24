"use client"

import { useState } from "react";
import axios from "axios";

export default function AddProject() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const res = await axios.post(
        `${API_BASE_URL}/projects`,
        { name },
        { withCredentials: true }
      );

      if (res.status === 201) {
        setSuccess("Projet ajouté avec succès !");
        setName("");
      }
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            setError(err.response?.data?.message || "Échec de l'ajout du projet")
          } else {
            setError("Une erreur inconnue s'est produite")
          }
    }
  };

  return (
    <div className="bg-dark text-white p-6 rounded-lg shadow-lg max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Ajouter un projet</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom du projet"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded bg-gray-900 text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}

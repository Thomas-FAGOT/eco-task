"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function MePage() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3333/api/me", { withCredentials: true })
      .then((res) => {
          console.log("Réponse du backend :", res.data) // ✅ Ajoute ce log
          setUser(res.data.user)
      })
      .catch((err) => {
          console.error("Erreur lors de la récupération :", err)
          setError("Non connecté")
      })
  }, [])

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Informations utilisateur</h2>
      {error && <p className="text-red-500">{error}</p>}
      {user ? <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(user, null, 2)}</pre> : <p>Chargement...</p>}
    </div>
  )
}

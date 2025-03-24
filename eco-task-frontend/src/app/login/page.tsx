"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
        console.log("test de la connexion");

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        
      const res = await axios.post(
        `${apiUrl}/login`,
        { email, password },
        { withCredentials: true } // Important pour que les cookies de session soient envoyés !
      )

      if (res.status === 200) {
        router.push("/dashboard") // Redirection après connexion
      }
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) { 
            setError(err.response?.data?.message || "Échec de la connexion")
          } else {
            setError("Une erreur inconnue s'est produite")
          }
        }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form onSubmit={handleLogin} className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  )
}

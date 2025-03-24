"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface CarbonHistoryData {
  recorded_at: string;
  total: number;
}

const CarbonFootprintHistoryChart = ({ projectId }: { projectId: number }) => {
  const [data, setData] = useState<CarbonHistoryData[]>([]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks/project/${projectId}/carbonfoot-print-history`);
        const formattedData = response.data.map((entry: CarbonHistoryData) => ({
          ...entry,
          recorded_at: new Date(entry.recorded_at).toLocaleDateString(), // Formatage lisible
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [projectId]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-900 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">
        Évolution de l&apos;Empreinte Carbone du Projet {projectId}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="recorded_at" label={{ value: "Date", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Empreinte Carbone", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#3498db" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CarbonFootprintHistoryChart;

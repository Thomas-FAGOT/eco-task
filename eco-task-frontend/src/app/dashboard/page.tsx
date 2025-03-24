"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import CarbonFootprintHistoryChart from "../components/CarbonFootprintHistoryChart";
import axios from "axios";

interface CarbonData {
  project_id: number;
  total: number;
}

const CarbonFootprintChart = () => {
  const [data, setData] = useState<CarbonData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

        try {
          const response = await axios.get(`${API_BASE_URL}/tasks/carbon-foot-print`);
          setData(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        }        
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="w-full max-w-4xl mx-auto p-4 bg-gray-900 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Empreinte Carbone par Projet</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="project_id" label={{ value: "Projet", position: "insideBottom", offset: -5 }} />
            <YAxis label={{ value: "Empreinte Carbone", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Bar dataKey="total" fill="#4CAF50" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <CarbonFootprintHistoryChart projectId={1} />
    </div>
  );
};

export default CarbonFootprintChart;

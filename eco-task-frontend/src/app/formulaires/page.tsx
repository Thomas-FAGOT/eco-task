"use client"

import AddProject from "@/app/components/addProjectComponnent";
import AddTask from "@/app/components/addTaskComponnent";

export default function DashboardPage() {

  return (
    <div>
      <div className="flex flex-row">
        <AddProject />
        <AddTask />
      </div>
    </div>
  );
}

// import React, { useState } from 'react';
// import { UserCheck2, Flag, Users, DollarSign } from "lucide-react";

// const DashboardSummary = ({ applicants }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextApplicant = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % applicants.length);
//   };

//   const prevApplicant = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + applicants.length) % applicants.length);
//   };

//   if (!Array.isArray(applicants) || applicants.length === 0) {
//     return (
//       <section className="bg-card rounded-xl p-6 border border-border shadow-md mb-7 animate-fade-in">
//         <h2 className="text-xl font-semibold mb-4 tracking-tight">Summary of applicant</h2>
//         <p>No applicants available.</p>
//       </section>
//     );
//   }

//   const currentApplicant = applicants[currentIndex];

//   const metrics = [
//     {
//       title: "Application ID",
//       value: currentApplicant.id || currentApplicant.application_id || "N/A",
//       icon: UserCheck2,
//       color: "bg-blue-100 text-blue-700"
//     },
//     {
//       title: "Flagged Case",
//       value: currentApplicant.flagged === "True" ? "Yes" : "No",
//       icon: Flag,
//       color: "bg-red-100 text-red-600"
//     },
//     {
//       title: "Childcare Hours Requested",
//       value: currentApplicant.childcareHours || currentApplicant.childcare_hours_requested || "N/A",
//       icon: Users,
//       color: "bg-green-100 text-green-700"
//     },
//     {
//       title: "Household Income",
//       value: currentApplicant.householdIncome || currentApplicant.household_income || "N/A",
//       icon: DollarSign,
//       color: "bg-gray-100 text-gray-700"
//     }
//   ];

//   return (
//     <section className="bg-card rounded-xl p-6 border border-border shadow-md mb-7 animate-fade-in">
//       <h2 className="text-xl font-semibold mb-4 tracking-tight">Summary of applicant</h2>
//       <div className="grid lg:grid-cols-1 grid-cols-2 gap-5">
//         {metrics.map((m) => (
//           <div key={m.title} className="flex items-center gap-4 py-2">
//             <div className={`rounded-lg p-2 shrink-0 ${m.color}`}>
//               <m.icon className="w-6 h-6" />
//             </div>
//             <div>
//               <div className="text-lg font-bold">{m.value}</div>
//               <div className="text-sm text-muted-foreground">{m.title}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-between mt-4">
//         <button
//           onClick={prevApplicant}
//           className="bg-blue-700 text-white px-4 py-2 rounded-md"
//         >
//           Previous
//         </button>
//         <button
//           onClick={nextApplicant}
//           className="bg-blue-700 text-white px-4 py-2 rounded-md"
//         >
//           Next
//         </button>
//       </div>
//     </section>
//   );
// };

// export default DashboardSummary;


import React, { useState, useEffect } from 'react';
import { UserCheck2, Flag, Users, DollarSign } from "lucide-react";

const DashboardSummary = () => {
  const [applicants, setApplicants] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/count")
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setApplicants(data.entries || []);
      })
      .catch(err => {
        console.error("Failed to fetch applicants:", err);
        setApplicants([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const nextApplicant = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % applicants.length);
  };

  const prevApplicant = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + applicants.length) % applicants.length);
  };

  if (loading) {
    return (
      <section className="bg-card rounded-xl p-6 border border-border shadow-md mb-7 animate-fade-in">
        <h2 className="text-xl font-semibold mb-4 tracking-tight">Summary of applicant</h2>
        <p>Loading applicants...</p>
      </section>
    );
  }

  if (!Array.isArray(applicants) || applicants.length === 0) {
    return (
      <section className="bg-card rounded-xl p-6 border border-border shadow-md mb-7 animate-fade-in">
        <h2 className="text-xl font-semibold mb-4 tracking-tight">Summary of applicant</h2>
        <p>No applicants available.</p>
      </section>
    );
  }

  const currentApplicant = applicants[currentIndex];

  const metrics = [
    {
      title: "Application ID",
      value: currentApplicant.id || currentApplicant.application_id || "N/A",
      icon: UserCheck2,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Flagged Case",
      value: currentApplicant.flagged === "True" ? "Yes" : "No",
      icon: Flag,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Childcare Hours Requested",
      value: currentApplicant.childcareHours || currentApplicant.childcare_hours_requested || "N/A",
      icon: Users,
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Household Income",
      value: currentApplicant.householdIncome || currentApplicant.household_income || "N/A",
      icon: DollarSign,
      color: "bg-gray-100 text-gray-700"
    }
  ];

  return (
    <section className="bg-card rounded-xl p-6 border border-border shadow-md mb-7 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4 tracking-tight">Summary of applicant</h2>
      <div className="grid lg:grid-cols-1 grid-cols-2 gap-5">
        {metrics.map((m) => (
          <div key={m.title} className="flex items-center gap-4 py-2">
            <div className={`rounded-lg p-2 shrink-0 ${m.color}`}>
              <m.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-lg font-bold">{m.value}</div>
              <div className="text-sm text-muted-foreground">{m.title}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={prevApplicant}
          className="bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={nextApplicant}
          className="bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default DashboardSummary;

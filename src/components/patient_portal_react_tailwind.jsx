import React, { useState, useMemo } from "react";
import { Bell, User, Calendar, MessageSquare, Settings, LogOut } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useLocation } from "react-router-dom";
import BackButton from "./BackButton";

// Patient Portal - Single-file React component (Tailwind CSS)
// Usage: drop this file into your React app (e.g., src/components/PatientPortal.jsx)
// Requirements: Tailwind CSS, lucide-react, recharts

export default function PatientPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const location = useLocation()

  const { appointments: docAppointments, todaysAppointments, videoConsultations, comingAppointments, upcomingVideoConsultations } = location.state || []
  console.log("location.state", location.state)
  console.log("docAppointments", docAppointments)

  console.log("hospital appointments", docAppointments?.filter(appt => appt.hospital_name !== "no" && appt.vc === "no").length)

  const hospitalApptsLength = docAppointments?.filter(appt => appt.hospital_name !== "no" && appt.vc === "no").length
  const videoApptsLength = docAppointments?.filter(appt => appt.vc !== "no" && appt.hospital_name === "no").length

  const upcomingAppointments = [...comingAppointments, ...upcomingVideoConsultations]

  console.log(videoApptsLength)

  console.log("upcomingAppointments", upcomingAppointments)

  const uniqueAppts = [
    ...new Map(docAppointments.map(item => [item.pname, item])).values()
  ];




  // const patients = useMemo(() => [
  //   { id: 1, name: "Ayesha Khan", age: 13, lastVisit: "2025-11-05", email: "ayesha@example.com", phone: "+92 300 111 2222", notes: "Asthma — inhaler" },
  //   { id: 2, name: "Bilal Ahmed", age: 12, lastVisit: "2025-10-22", email: "bilal@example.com", phone: "+92 300 333 4444", notes: "Allergy — seasonal" },
  //   { id: 3, name: "Sara Malik", age: 14, lastVisit: "2025-11-10", email: "sara@example.com", phone: "+92 300 555 6666", notes: "Routine checkup" },
  //   { id: 4, name: "Hassan Raza", age: 11, lastVisit: "2025-09-12", email: "hassan@example.com", phone: "+92 300 777 8888", notes: "Follow-up diabetes" },
  // ], []);

  // const appointments = useMemo(() => [
  //   { id: "A001", patient: "Ayesha Khan", time: "2025-11-20 10:00", type: "In-person", status: "Confirmed" },
  //   { id: "A002", patient: "Bilal Ahmed", time: "2025-11-20 11:00", type: "Video", status: "Pending" },
  //   { id: "A003", patient: "Sara Malik", time: "2025-11-21 09:30", type: "In-person", status: "Confirmed" },
  // ], []);

  // const messages = useMemo(() => [
  //   { id: 1, from: "Bilal's Mother", time: "2h ago", text: "Can we move Bilal's appointment?" },
  //   { id: 2, from: "Lab", time: "1d ago", text: "Bloodwork results uploaded for Ayesha." },
  // ], []);

  const chartData = useMemo(() => [
    { date: "07 Nov", patients: 12 },
    { date: "08 Nov", patients: 9 },
    { date: "09 Nov", patients: 14 },
    { date: "10 Nov", patients: 11 },
    { date: "11 Nov", patients: 16 },
    { date: "12 Nov", patients: 13 },
    { date: "13 Nov", patients: 17 },
  ], []);

  // const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Top bar */}
      {/* <header className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                className="p-2 rounded-md hover:bg-gray-100 md:hidden"
                onClick={() => setSidebarOpen(prev => !prev)}
                aria-label="Toggle sidebar"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold">Doctor Portal</h1>
                <span className="text-sm text-gray-500">— Patient dashboard</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="bg-gray-100 border border-transparent rounded-md py-2 px-3 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="Search patients, messages..."
                />
              </div>

              <button className="p-2 rounded-md hover:bg-gray-100">
                <Bell className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 border-l pl-3">
                <div className="text-sm text-right">
                  <div className="font-medium">Dr. Ali Rehman</div>
                  <div className="text-xs text-gray-500">Pediatrics</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-semibold">AR</div>
              </div>
            </div>
          </div>
        </div>
      </header> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <BackButton />
        <div className="lg:flex lg:space-x-6">
          {/* Sidebar */}
          <aside className={`w-72 bg-white rounded-xl p-4 shadow-sm sticky top-20 h-fit transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-0"}`}>
            <nav className="space-y-2">
              <h1 className="text-2xl font-bold text-blue-600 mb-8">Patient Portal</h1>
              <NavItem icon={<Calendar className="h-4 w-4" />} label="Dashboard" active={activeView === "dashboard"} onClick={() => setActiveView("dashboard")} />
              <NavItem icon={<User className="h-4 w-4" />} label="Patients" active={activeView === "patients"} onClick={() => setActiveView("patients")} />
              {/* <NavItem icon={<MessageSquare className="h-4 w-4" />} label="Messages" badge={messages.length} active={activeView === "messages"} onClick={() => setActiveView("messages")} /> */}
              {/* <NavItem icon={<Settings className="h-4 w-4" />} label="Settings" active={activeView === "settings"} onClick={() => setActiveView("settings")} /> */}
              <div className="border-t pt-3 mt-3">
                <button className="w-full flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 rounded-md p-2"><LogOut className="h-4 w-4" /> Logout</button>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 mt-6 lg:mt-0">
            {activeView === "dashboard" && (
              <section>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <StatCard title="Today's In-Clinic Appointments" value={todaysAppointments.length} 
                  // subtitle="Total scheduled" 
                  />
                  <StatCard title="Today's Video Consultations" value={videoConsultations.length} 
                  // subtitle="Registered" 
                  />
                  <StatCard title="Upcoming Appointments" value={upcomingAppointments.length} 
                  // subtitle="From guardians & labs" 
                  />
                </div>

                {/* Upcoming Appointments */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium">Appointments</h2>
                      <div className="text-sm text-gray-500">Upcoming Appointments</div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="text-gray-500 text-xs uppercase">
                          <tr>
                            <th className="py-2">ID</th>
                            <th className="py-2">Patient</th>
                            <th className="py-2">Time</th>
                            <th className="py-2">Type</th>
                            <th className="py-2">Status</th>
                            <th className="py-2"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {upcomingAppointments.map((a) => (
                            <tr key={a.id} className="hover:bg-gray-50">
                              <td className="py-3 font-medium">{a.bappoint}</td>
                              <td className="py-3">{a.patient}</td>
                              <td className="py-3">{a.time}</td>
                              <td className="py-3"><span className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700">{a.hospital ? "in-clinic" : "video"}</span></td>
                              <td className="py-3">{a.status}</td>
                              <td className="py-3 text-right">
                                {/* <button className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-md hover:opacity-95">View</button> */}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* Charts */}
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="text-lg font-medium mb-3">Patient Flow</h3>
                    <div style={{ width: "100%", height: 220 }}>
                      <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="patients" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="font-medium mb-3">Messages</h3>
                    <ul className="divide-y">
                      {messages.map(m => (
                        <li key={m.id} className="py-3 flex justify-between items-start">
                          <div>
                            <div className="font-medium">{m.from}</div>
                            <div className="text-sm text-gray-600">{m.text}</div>
                          </div>
                          <div className="text-xs text-gray-400">{m.time}</div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="font-medium mb-3">Quick Actions</h3>
                    <div className="flex flex-col gap-2">
                      <button className="py-2 px-3 rounded-md border hover:bg-gray-50 text-sm">Create Appointment</button>
                      <button className="py-2 px-3 rounded-md border hover:bg-gray-50 text-sm">Upload Lab Results</button>
                      <button className="py-2 px-3 rounded-md border hover:bg-gray-50 text-sm">Prescribe Medication</button>
                    </div>
                  </div>
                </div> */}
              </section>
            )}

            {/* Patients List */}
            {activeView === "patients" && (
              <section>
                <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Patients</h2>
                    <div className="text-sm text-gray-500">
                      {/* <input type="search" className="outline-none border border-gray-400 p-1 mr-2" placeholder="Search Patients"/> */}
                      {uniqueAppts.length} results
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {uniqueAppts.map(p => (
                      <div key={p.id} className="flex items-center gap-4 p-3 rounded-lg border hover:shadow-sm">
                        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center font-semibold">{p.pname.split(" ").map(n => n[0]).slice(0, 2).join("")}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{p.pname}</div>
                              <h3>{p.pemail}</h3>
                              {/* <div className="text-xs text-gray-500">Age: {p.age} • Last visit: {p.lastVisit}</div> */}
                            </div>
                            <div className="text-sm text-gray-500">{p.pmobile}</div>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">{p.notes}</div>
                          <div className="mt-3 flex gap-2">
                            <button onClick={() => setSelectedPatient(p)} className="text-sm px-3 py-1 rounded-md bg-indigo-600 text-white">Open</button>
                            {/* <button className="text-sm px-3 py-1 rounded-md border">Message</button> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Patient Details Modal */}
                {selectedPatient && (
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center font-semibold text-2xl">{selectedPatient.pname.split(" ").map(n => n[0]).slice(0, 2).join("")}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-medium">{selectedPatient.pname}</h3>
                            <div className="text-sm text-gray-500">{selectedPatient.pemail} • {selectedPatient.phone}</div>
                          </div>
                          {/* <div className="text-sm text-gray-500">Age: {selectedPatient.age}</div> */}
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-3 border rounded-md">
                            <div className="text-xs text-gray-500">Next Appointment</div>
                            <div className="font-medium">{selectedPatient.next_follow_up ? selectedPatient.next_follow_up: "Not scheduled"}</div>
                          </div>
                          <div className="p-3 border rounded-md">
                            <div className="text-xs text-gray-500">Symptoms</div>
                            <div className="font-medium">{selectedPatient.symptom ? selectedPatient.symptom: "None"}</div>
                          </div>
                          <div className="p-3 border rounded-md">
                            <div className="text-xs text-gray-500">Prescription</div>
                            <div className="font-medium">{selectedPatient.prescription ? selectedPatient.prescription: "None"}</div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="font-medium">Notes</h4>
                          <p className="text-sm text-gray-600 mt-2">{selectedPatient.notes}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            )}

            {activeView === "messages" && (
              <section>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h2 className="text-lg font-medium mb-4">Messages</h2>
                  <ul className="divide-y">
                    {messages.map(m => (
                      <li key={m.id} className="py-3 flex items-start justify-between">
                        <div>
                          <div className="font-medium">{m.from}</div>
                          <div className="text-sm text-gray-600">{m.text}</div>
                        </div>
                        <div className="text-xs text-gray-400">{m.time}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {activeView === "settings" && (
              <section>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h2 className="text-lg font-medium mb-4">Settings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-3">
                      <label className="text-sm font-medium">Clinic Name</label>
                      <input className="mt-2 p-2 w-full border rounded-md text-sm" defaultValue="Sunrise Pediatrics" />
                    </div>
                    <div className="border rounded-md p-3">
                      <label className="text-sm font-medium">Notification Preferences</label>
                      <div className="mt-2 flex flex-col gap-2">
                        <label className="text-sm"><input type="checkbox" className="mr-2" defaultChecked /> Email alerts</label>
                        <label className="text-sm"><input type="checkbox" className="mr-2" defaultChecked /> SMS alerts</label>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// --- Subcomponents ---

function NavItem({ icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 ${active ? "bg-indigo-50 text-indigo-700" : "text-gray-700"}`}>
      <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      <span className="flex-1 text-sm text-left">{label}</span>
      {badge ? <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{badge}</span> : null}
    </button>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
      <div>
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-2xl font-semibold mt-1">{value}</div>
        <div className="text-sm text-gray-400">{subtitle}</div>
      </div>
      <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold">{String(value).slice(0, 2)}</div>
    </div>
  );
}

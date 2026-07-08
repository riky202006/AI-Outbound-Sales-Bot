import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Sidebar />

      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
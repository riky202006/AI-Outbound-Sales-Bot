import {
  Bell,
  Bot,
  Database,
  Server,
  CircleUserRound,
  Settings,
} from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="max-w-[1600px] mx-auto px-8 h-20 flex justify-between items-center">

        {/* Left */}

        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
            LeadPilot AI
          </h1>

          <p className="text-sm text-slate-400">
            AI Sales CRM
          </p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-8">

          <div className="hidden xl:flex gap-5 text-green-400 text-sm">

            <div className="flex items-center gap-2">
              <Server size={16} />
              Backend
            </div>

            <div className="flex items-center gap-2">
              <Database size={16} />
              Supabase
            </div>

            <div className="flex items-center gap-2">
              <Bot size={16} />
              Gemini
            </div>

          </div>

          <Bell className="hover:text-cyan-400 cursor-pointer transition" />

          <Settings className="hover:text-cyan-400 cursor-pointer transition" />

          <CircleUserRound
            size={38}
            className="text-blue-400 cursor-pointer hover:scale-110 transition"
          />

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
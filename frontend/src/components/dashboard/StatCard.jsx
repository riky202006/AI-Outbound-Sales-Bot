import Card from "../common/Card";

function StatCard({ title, value, icon, color }) {
  return (
    <Card className="p-6">

      <div className="flex justify-between">

        <div>

          <p className="text-slate-400">
            {title}
          </p>

          <h2 className={`text-5xl font-bold mt-3 ${color}`}>
            {value}
          </h2>

          <div className="mt-3 inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-400/20 px-3 py-1 text-xs text-cyan-300">
            Waiting for data...
          </div>

        </div>

        <div className="text-cyan-400 opacity-80">
          {icon}
        </div>

      </div>

    </Card>
  );
}

export default StatCard;
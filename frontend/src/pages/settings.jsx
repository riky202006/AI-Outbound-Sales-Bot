import { useEffect, useState } from "react";
import Layout from "../components/dashboard/Layout";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import {
  getGmailStatus,
  disconnectGmail,
} from "../services/api";

function Settings() {
  const [gmail, setGmail] = useState({
    connected: false,
    email: "",
  });

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await getGmailStatus();
      setGmail(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const connectGmail = () => {
    window.location.href =
      "http://localhost:5000/api/auth/google";
  };
const handleDisconnect = async () => {

  const confirmed = window.confirm(
    "Disconnect your Gmail account?"
  );

  if (!confirmed) return;

  try {

    await disconnectGmail();

    setGmail({
      connected: false,
      email: "",
    });

  } catch (err) {

    console.error(err);

  }

};
  return (
    <Layout>
      <div className="p-8 space-y-8 text-white">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold">
            ⚙ Settings
          </h1>

          <p className="text-slate-400 mt-2">
            Manage your LeadPilot integrations and application settings.
          </p>
        </div>

        {/* Gmail */}

        <Card className="p-8">

          <h2 className="text-2xl font-semibold mb-6">
            📧 Gmail Integration
          </h2>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <p className="text-lg font-medium">
                Google Account
              </p>

              {gmail.connected ? (
                <>
                  <p className="text-green-400 mt-3">
                    🟢 Connected
                  </p>

                  <p className="text-slate-300 mt-1">
                    {gmail.email}
                  </p>
                </>
              ) : (
                <p className="text-red-400 mt-3">
                  🔴 Gmail Not Connected
                </p>
              )}

            </div>

           <div className="flex gap-3">

  {gmail.connected && (

    <Button
      variant="danger"
      onClick={handleDisconnect}
    >
      Disconnect
    </Button>

  )}

  <Button onClick={connectGmail}>

    {gmail.connected
      ? "Reconnect"
      : "Connect Gmail"}

  </Button>

</div>

          </div>

        </Card>

        {/* AI */}

        <Card className="p-8">

          <h2 className="text-2xl font-semibold mb-6">
            🤖 AI Provider
          </h2>

          <div className="flex justify-between">

            <div>

              <p className="text-lg">
                Gemini 2.5 Flash
              </p>

              <p className="text-green-400 mt-2">
                🟢 Online
              </p>

            </div>

          </div>

        </Card>

        {/* About */}

        <Card className="p-8">

          <h2 className="text-2xl font-semibold mb-6">
            💻 About LeadPilot
          </h2>

          <div className="space-y-2 text-slate-300">

            <p>
              <strong>Version:</strong> 1.0.0
            </p>

            <p>
              <strong>Frontend:</strong> React + Tailwind CSS
            </p>

            <p>
              <strong>Backend:</strong> Node.js + Express
            </p>

            <p>
              <strong>Database:</strong> PostgreSQL (Supabase)
            </p>

            <p>
              <strong>AI:</strong> Google Gemini 2.5 Flash
            </p>

            <p>
              <strong>Email:</strong> Gmail API (OAuth)
            </p>

          </div>

        </Card>

      </div>
    </Layout>
  );
}

export default Settings;
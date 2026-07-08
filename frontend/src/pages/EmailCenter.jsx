import Layout from "../components/dashboard/Layout";
import EmailCenter from "../components/email/EmailCenter";

function EmailCenterPage() {
  return (
    <Layout>
      <div className="p-8">
        <EmailCenter />
      </div>
    </Layout>
  );
}

export default EmailCenterPage;
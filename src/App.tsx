import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import Dashboard from "@/modules/dashboard/Dashboard"
import LeadList from "@/modules/leads/LeadList"
import LeadResearchAssistant from "@/modules/leads/LeadResearchAssistant"
import FollowUpSystem from "@/modules/reminders/FollowUpSystem"
import LinkedInOutreach from "@/modules/outreach/LinkedInOutreach"
import DiscoveryCallPrep from "@/modules/calls/DiscoveryCallPrep"
import CorporateProposal from "@/modules/proposals/CorporateProposal"
import DavidMighty3 from "@/modules/dm3/DavidMighty3"
import ClientOnboarding from "@/modules/onboarding/ClientOnboarding"
import SessionRecap from "@/modules/sessions/SessionRecap"
import ContentRepurposer from "@/modules/content/ContentRepurposer"
import RevenueDashboard from "@/modules/revenue/RevenueDashboard"
import Settings from "@/modules/admin/Settings"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<LeadList />} />
          <Route path="/research" element={<LeadResearchAssistant />} />
          <Route path="/follow-ups" element={<FollowUpSystem />} />
          <Route path="/outreach" element={<LinkedInOutreach />} />
          <Route path="/discovery" element={<DiscoveryCallPrep />} />
          <Route path="/proposals" element={<CorporateProposal />} />
          <Route path="/onboarding" element={<ClientOnboarding />} />
          <Route path="/sessions" element={<SessionRecap />} />
          <Route path="/content" element={<ContentRepurposer />} />
          <Route path="/dm3" element={<DavidMighty3 />} />
          <Route path="/revenue" element={<RevenueDashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

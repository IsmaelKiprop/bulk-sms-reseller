import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './LandingPage/Components/Home';
import UserForm from './Auth/UserForm';
import AdminDashboardLayout from './AdminDashboard/AdminDashboardLayout';
import AdminDashboard from './AdminDashboard/page';
import AdminClients from './AdminDashboard/clients';
import AdminCampaigns from './AdminDashboard/campaigns';
import AdminContacts from './AdminDashboard/contacts';
import AdminTemplates from './AdminDashboard/templates';
import AdminSettings from './AdminDashboard/settings';
import Login from './Auth/Login';
import ResetPassword from './Auth/ResetPassword';
import ForgotPassword from './Auth/ForgotPassword';

// Messaging Dashboard imports
import DashboardLayout from './MessagingDashboard/DashboardLayout';
import Dashboard from './MessagingDashboard/page';
import Campaigns from './MessagingDashboard/campaigns/page';
import NewCampaign from './MessagingDashboard/campaigns/new/page';
import Contacts from './MessagingDashboard/contacts/page';
import NewContact from './MessagingDashboard/contacts/new/page';
import NewGroup from './MessagingDashboard/contacts/groups/new/page';
import Templates from './MessagingDashboard/templates/page';
import NewTemplate from './MessagingDashboard/templates/new/page';
import Analytics from './MessagingDashboard/analytics/page';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<UserForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminDashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="campaigns" element={<AdminCampaigns />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="templates" element={<AdminTemplates />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Messaging Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="campaigns/new" element={<NewCampaign />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="contacts/new" element={<NewContact />} />
          <Route path="contacts/groups/new" element={<NewGroup />} />
          <Route path="templates" element={<Templates />} />
          <Route path="templates/new" element={<NewTemplate />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="billing" element={<div>Billing Page (Coming Soon)</div>} />
          <Route path="help" element={<div>Help & Support (Coming Soon)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;


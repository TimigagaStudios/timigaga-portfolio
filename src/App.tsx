import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/auth/ProtectedRoute';

import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import CaseStudy from './pages/CaseStudy';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Intake from './pages/Intake';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminLogin from './pages/AdminLogin';

import DashboardPage from './pages/dashboard/Dashboard';
import RequestsPage from './pages/dashboard/Requests';
import RevenuePage from './pages/dashboard/Revenue';
import ProjectsPage from './pages/dashboard/Projects';
import AnalyticsPage from './pages/dashboard/Analytics';
import SettingsPage from './pages/dashboard/Settings';

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Public site */}
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<CaseStudy />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/intake" element={<Intake />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {/* Admin auth */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/requests"
            element={
              <ProtectedRoute>
                <RequestsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/revenue"
            element={
              <ProtectedRoute>
                <RevenuePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/projects"
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

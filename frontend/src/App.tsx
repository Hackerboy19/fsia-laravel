import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import About from './pages/About';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Team from './pages/Team';

/* The live site's URLs (with .php) are kept so links and SEO carry over later. */
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index.php" element={<Navigate to="/" replace />} />
        <Route path="/about.php" element={<About />} />
        <Route path="/our-teams.php" element={<Team />} />
        <Route path="/FAQ.php" element={<Faq />} />
        <Route path="/contact.php" element={<Contact />} />
        <Route path="/about" element={<Navigate to="/about.php" replace />} />
        <Route path="/team" element={<Navigate to="/our-teams.php" replace />} />
        <Route path="/faq" element={<Navigate to="/FAQ.php" replace />} />
        <Route path="/contact" element={<Navigate to="/contact.php" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

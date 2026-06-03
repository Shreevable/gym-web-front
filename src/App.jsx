import { Route, Routes } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import CalendlyRedirect from './pages/CalendlyRedirect'

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/partner" element={<CalendlyRedirect />} />
      </Routes>
    </SiteLayout>
  )
}

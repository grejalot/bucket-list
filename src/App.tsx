import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { EntriesProvider } from './context/EntriesContext'
import { HomePage } from './pages/HomePage'
import { ListPage } from './pages/ListPage'

export default function App() {
  return (
    <EntriesProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/liste" element={<ListPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </EntriesProvider>
  )
}

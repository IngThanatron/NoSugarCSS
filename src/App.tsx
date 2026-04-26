import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MeshBackground } from '@/components/layout/MeshBackground'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ToastContainer } from '@/components/ui/Toast'
import { HomePage } from '@/pages/HomePage'
import { CustomizePage } from '@/pages/CustomizePage'
import { ThemeCatalogPage } from '@/pages/ThemeCatalogPage'
import { ThemeDetailPage } from '@/pages/ThemeDetailPage'

function WithChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <MeshBackground />
      <Nav />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<WithChrome><HomePage /></WithChrome>} />
        <Route path="/themes" element={<WithChrome><ThemeCatalogPage /></WithChrome>} />
        <Route path="/themes/:themeId" element={<WithChrome><ThemeDetailPage /></WithChrome>} />
        <Route path="/customize" element={<CustomizePage />} />
      </Routes>
    </BrowserRouter>
  )
}

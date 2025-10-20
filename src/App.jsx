import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroImage from './components/HeroImage'
import EnvelopeOpening from './components/EnvelopeOpening'
import InvitationContent from './components/InvitationContent'
import MusicPlayer from './components/MusicPlayer'

function App() {
  // Siempre empezar desde 'hero' en la primera carga de la sesión
  const [currentSection, setCurrentSection] = useState(() => {
    // Solo recuperar el estado si es la misma sesión (no una recarga completa)
    const saved = sessionStorage.getItem('invitationSection')
    return saved || 'hero'
  })

  // Guardar el estado en sessionStorage (se borra al cerrar la pestaña)
  useEffect(() => {
    sessionStorage.setItem('invitationSection', currentSection)
  }, [currentSection])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentSection === 'hero' && (
          <HeroImage key="hero" onComplete={() => setCurrentSection('envelope')} />
        )}
        
        {currentSection === 'envelope' && (
          <div className="flex items-center justify-center min-h-screen p-4">
            <EnvelopeOpening key="envelope" onComplete={() => setCurrentSection('content')} />
          </div>
        )}
        
        {currentSection === 'content' && (
          <InvitationContent key="content" />
        )}
      </AnimatePresence>
      
      {/* Reproductor de música flotante */}
      <MusicPlayer />
    </div>
  )
}

export default App

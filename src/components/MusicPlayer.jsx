import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayer, setShowPlayer] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    // Intentar reproducir automáticamente (algunos navegadores lo bloquean)
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play()
          setIsPlaying(true)
        }
      } catch (error) {
        console.log('Autoplay bloqueado por el navegador')
      }
    }

    // Pequeño delay para que cargue la página primero
    const timer = setTimeout(playAudio, 1000)
    return () => clearTimeout(timer)
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-8 right-8 z-50"
    >
      {/* Botón de notas musicales */}
      <button
        onClick={togglePlay}
        className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
        style={{
          background: isPlaying 
            ? 'linear-gradient(135deg, #d4af37 0%, #c9a961 100%)'
            : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
          boxShadow: isPlaying 
            ? '0 8px 20px rgba(212, 175, 55, 0.5)'
            : '0 8px 20px rgba(107, 114, 128, 0.3)'
        }}
        title={isPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        {/* Notas musicales */}
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="white"
          className={isPlaying ? 'animate-pulse' : ''}
        >
          {/* Nota musical 1 */}
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          {/* Nota musical 2 */}
          <circle cx="10" cy="17" r="1.5" />
        </svg>
      </button>

      {/* Audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/music/wedding-song.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </motion.div>
  )
}

export default MusicPlayer

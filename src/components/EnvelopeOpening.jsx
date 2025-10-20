import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const EnvelopeOpening = ({ onComplete }) => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1500)
    const timer2 = setTimeout(() => setStep(2), 3500)
    const timer3 = setTimeout(() => onComplete(), 8000)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full max-w-2xl flex items-center justify-center"
      style={{
        backgroundImage: `url('/images/background-texture.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '600px',
        padding: '2rem'
      }}
    >
      {/* Sobre contenedor */}
      <div className="relative w-full max-w-md mx-auto" style={{ perspective: '1000px' }}>
        
        {/* Cuerpo principal del sobre */}
        <div className="relative bg-sage shadow-2xl" style={{ minHeight: '450px' }}>
          
          {/* Solapa trasera (fija) */}
          <div 
            className="absolute top-0 left-0 right-0 h-40 bg-sage"
            style={{
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              zIndex: 1
            }}
          />

          {/* Solapa frontal que se abre */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-40 shadow-xl"
            style={{
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              transformOrigin: '50% 0%',
              zIndex: 20,
              backgroundColor: '#5a6b52',
              backfaceVisibility: 'hidden'
            }}
            animate={{
              rotateX: step >= 1 ? 180 : 0,
            }}
            transition={{ 
              duration: 1.5, 
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 0.3
            }}
          >
            {/* Monograma FH en la solapa */}
            <motion.div 
              className="absolute top-12 left-1/2 transform -translate-x-1/2 text-gold font-serif font-bold"
              style={{ 
                fontSize: '3rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
              animate={{ 
                opacity: step >= 1 ? 0 : 1,
                scale: step >= 1 ? 0.8 : 1
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-1">
                <span>F</span>
                <span style={{ fontSize: '2rem' }}>H</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Sello de cera */}
          <motion.div
            className="absolute top-36 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full z-30"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #e5c77d 0%, #c9a961 40%, #b8941f 100%)',
              boxShadow: '0 6px 12px rgba(0,0,0,0.4), inset -2px -2px 6px rgba(0,0,0,0.3), inset 2px 2px 6px rgba(255,255,255,0.3)'
            }}
            animate={{
              scale: step >= 1 ? [1, 1.15, 0] : 1,
              opacity: step >= 1 ? [1, 1, 0] : 1,
            }}
            transition={{ 
              duration: 0.6, 
              delay: 0.8,
              times: [0, 0.5, 1]
            }}
          >
            {/* Imagen del sello */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
              <img 
                src="/images/seal.png" 
                alt="Sello" 
                className="w-16 h-16 object-contain opacity-70"
                onError={(e) => {
                  // Fallback a SVG si no existe la imagen
                  e.target.style.display = 'none'
                }}
              />
              <svg width="50" height="50" viewBox="0 0 50 50" className="opacity-60 absolute">
                <ellipse cx="25" cy="15" rx="8" ry="4" fill="#8b7355" opacity="0.5"/>
                <ellipse cx="25" cy="15" rx="8" ry="4" fill="#8b7355" opacity="0.5" transform="rotate(90 25 15)"/>
                <rect x="24" y="15" width="2" height="15" fill="#8b7355"/>
                <circle cx="25" cy="32" r="3" fill="#8b7355" opacity="0.4"/>
                <circle cx="20" cy="35" r="2" fill="#8b7355" opacity="0.3"/>
                <circle cx="30" cy="35" r="2" fill="#8b7355" opacity="0.3"/>
              </svg>
            </div>
          </motion.div>

          {/* Tarjeta interior que sale */}
          <motion.div
            className="relative bg-white shadow-2xl mx-6 mt-32"
            style={{
              zIndex: 10
            }}
            initial={{ y: 0, opacity: 1 }}
            animate={{
              y: step >= 2 ? -120 : 0,
              opacity: step >= 2 ? 1 : 0.95,
            }}
            transition={{ 
              duration: 1.5, 
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 0.5
            }}
          >
            <div className="p-8 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: step >= 2 ? 1 : 0 }}
                transition={{ delay: 2, duration: 1 }}
              >
                <p className="text-xs tracking-widest text-gray-500 mb-4 font-light">
                  DECIDIMOS DECIRNOS QUE SÍ PARA TODA LA VIDA
                </p>
                <h1 className="font-serif text-5xl text-gray-700 mb-2">
                  FÁTIMA
                </h1>
                <p className="text-3xl text-gray-500 font-light italic mb-2">&</p>
                <h1 className="font-serif text-5xl text-gray-700 mb-6">
                  HÉCTOR
                </h1>
                <p className="text-xs tracking-wide text-gray-600 mb-6 px-4 leading-relaxed">
                  TENEMOS EL HONOR DE INVITARLOS A<br />
                  CELEBRAR NUESTRA UNIÓN EL DÍA
                </p>
                <div className="text-gray-600">
                  <p className="text-xs tracking-widest mb-1">ENERO</p>
                  <p className="text-xs tracking-wider mb-1">SÁBADO</p>
                  <p className="text-6xl font-light mb-1">24</p>
                  <p className="text-sm tracking-widest">2026</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Parte inferior del sobre */}
          <div className="h-20" />
        </div>
      </div>
    </motion.div>
  )
}

export default EnvelopeOpening

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const EnvelopeOpening = ({ onComplete }) => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1500)
    const timer2 = setTimeout(() => setStep(2), 3500)
    const timer3 = setTimeout(() => onComplete(), 5500)
    
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

          {/* Monograma FH en la solapa - fuera para que sea visible */}
          <motion.div 
            className="absolute"
            style={{ 
              width: '140px',
              height: '140px',
              top: '30px',
              left: '50%',
              marginLeft: '-70px',
              zIndex: 25
            }}
            animate={{ 
              opacity: step >= 1 ? 0 : 1,
              scale: step >= 1 ? 0.8 : 1
            }}
            transition={{ duration: 0.4 }}
          >
            <img 
              src="/images/letras.png" 
              alt="FH" 
              className="w-full h-full object-contain"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
              }}
            />
          </motion.div>

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
              duration: 0.8, 
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.2
            }}
          >
          </motion.div>

          {/* Sello de cera */}
          <motion.div
            className="absolute left-1/2 z-30"
            style={{
              width: '85px',
              height: '85px',
              top: '130px',
              marginLeft: '-42.5px'
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              scale: step >= 1 ? [1, 1.15, 0] : 1,
              opacity: step >= 1 ? [1, 1, 0] : 1,
            }}
            transition={{ 
              duration: 0.4, 
              delay: 0,
              times: [0, 0.5, 1]
            }}
          >
            <img 
              src="/images/sello.png" 
              alt="Sello" 
              className="w-full h-full object-contain"
              style={{
                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))'
              }}
            />
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
                transition={{ delay: 0.8, duration: 0.6 }}
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

import { motion } from 'framer-motion'

const HeroImage = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1.5 }}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={onComplete}
    >
      {/* Overlay oscuro sutil */}
      <div className="absolute inset-0 bg-black/20 z-10" />
      
      {/* Imagen de fondo optimizada */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-image.jpg')`,
          filter: 'brightness(0.9)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      />

      {/* Contenido sobre la imagen */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="relative z-20 text-center text-white px-4"
      >
        <motion.h1 
          className="font-serif text-6xl md:text-8xl mb-4 drop-shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          Fátima & Héctor
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl tracking-widest mb-8 drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          24 • ENERO • 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="mt-12"
        >
          <p className="text-sm tracking-wider mb-2">Toca para continuar</p>
          <svg className="w-8 h-8 mx-auto animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Efecto de viñeta */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
        }}
      />
    </motion.div>
  )
}

export default HeroImage

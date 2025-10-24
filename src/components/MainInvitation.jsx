import { motion } from 'framer-motion'

const MainInvitation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full max-w-2xl"
    >
      {/* Fondo con textura real */}
      <div 
        className="relative rounded-lg shadow-2xl overflow-hidden"
        style={{
          backgroundImage: `url('/images/background-texture.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay blanco semi-transparente */}
        <div className="absolute inset-0 bg-white/40" />

        <div className="relative p-12">
          {/* Sobre decorativo en la parte superior */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative mx-auto w-full max-w-md">
              {/* Sobre verde */}
              <div className="bg-sage p-6 relative" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}>
                <div className="text-center py-4">
                  <div className="text-gold text-4xl font-serif font-bold mb-2">
                    <span>F</span><span className="text-2xl">H</span>
                  </div>
                </div>
              </div>
              
              {/* Sello */}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-full z-10"
                style={{
                  background: 'radial-gradient(circle, #d4af37 0%, #c9a961 50%, #b8941f 100%)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 50 50" className="opacity-60">
                    <ellipse cx="25" cy="15" rx="8" ry="4" fill="#8b7355" opacity="0.5"/>
                    <ellipse cx="25" cy="15" rx="8" ry="4" fill="#8b7355" opacity="0.5" transform="rotate(90 25 15)"/>
                    <rect x="24" y="15" width="2" height="15" fill="#8b7355"/>
                    <circle cx="25" cy="32" r="3" fill="#8b7355" opacity="0.4"/>
                    <circle cx="20" cy="35" r="2" fill="#8b7355" opacity="0.3"/>
                    <circle cx="30" cy="35" r="2" fill="#8b7355" opacity="0.3"/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contenido de la tarjeta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center mt-12"
          >
            <p className="text-xs tracking-widest text-gray-500 mb-6 font-light">
              DECIDIMOS DECIRNOS QUE SÍ PARA TODA LA VIDA
            </p>
            
            <h1 className="font-serif text-6xl text-gray-700 mb-3">
              HÉCTOR
            </h1>
            <p className="text-4xl text-gray-500 font-light italic mb-3">&</p>
            <h1 className="font-serif text-6xl text-gray-700 mb-8">
              FÁTIMA
            </h1>
            
            <p className="text-sm tracking-wide text-gray-600 mb-8 leading-relaxed">
              TENEMOS EL HONOR DE INVITARLOS A<br />
              CELEBRAR NUESTRA UNIÓN EL DÍA
            </p>
            
            <div className="text-gray-600 mb-12">
              <p className="text-xs tracking-widest mb-2">SÁBADO</p>
              <p className="text-xs tracking-wider mb-2">ENERO</p>
              <p className="text-7xl font-light mb-2">24</p>
              <p className="text-lg tracking-widest">2026</p>
            </div>
          </motion.div>

          {/* Tarjeta RSVP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="relative mx-auto w-64 h-64 mt-8"
          >
            <div 
              className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full shadow-lg flex items-center justify-center"
              style={{
                clipPath: 'circle(45% at 50% 50%)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              <div className="text-center px-8">
                <p className="text-xs tracking-wide text-gray-600 leading-relaxed mb-4">
                  CON MUCHO<br />
                  CARIÑO HEMOS<br />
                  RESERVADO UN<br />
                  PASE<br />
                  PARA TI
                </p>
                {/* Decoración floral */}
                <div className="absolute right-8 top-1/2 transform translate-x-4">
                  <svg width="30" height="60" viewBox="0 0 30 60" className="opacity-40">
                    <line x1="15" y1="0" x2="15" y2="60" stroke="#8b7355" strokeWidth="1"/>
                    <circle cx="15" cy="15" r="4" fill="#8b7355" opacity="0.3"/>
                    <circle cx="15" cy="30" r="5" fill="#8b7355" opacity="0.4"/>
                    <circle cx="15" cy="45" r="4" fill="#8b7355" opacity="0.3"/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sección para más contenido */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-16 text-center text-gray-500 text-sm"
          >
            <p className="italic">Desliza hacia abajo para más detalles</p>
            <div className="mt-4 animate-bounce">
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default MainInvitation

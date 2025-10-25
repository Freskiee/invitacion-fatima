import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Countdown from './Countdown'
import { getGuestByCode, getGuestCodeFromURL } from '../data/guestList'

const InvitationContent = () => {
  const scrollRef = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState({})
  const [guestData, setGuestData] = useState(null)
  const [copiedClabe, setCopiedClabe] = useState(null)
  
  const carouselImages = [
    '/images/fh3.jpeg',
    '/images/fh6.jpeg',
    '/images/fh1.jpeg',
    '/images/fh4.jpeg',
    '/images/fh5.jpeg',
    '/images/pedida.jpeg',
    '/images/fh2.jpeg'
  ]

  useEffect(() => {
    // Scroll suave al inicio cuando se monta el componente
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
    
    // Cargar datos del invitado desde la URL
    const guestCode = getGuestCodeFromURL()
    if (guestCode) {
      const guest = getGuestByCode(guestCode)
      setGuestData(guest)
    }
  }, [])

  // Precargar todas las imágenes del carrusel
  useEffect(() => {
    carouselImages.forEach((src, index) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [index]: true }))
      }
    })
  }, [])

  // Auto-play del carrusel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1))
    }, 6000) // Cambia cada 6 segundos

    return () => clearInterval(interval)
  }, [isAutoPlaying, carouselImages.length])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentImageIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1))
    // Reactiva el auto-play después de 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentImageIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1))
    // Reactiva el auto-play después de 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleDotClick = (index) => {
    setIsAutoPlaying(false)
    setCurrentImageIndex(index)
    // Reactiva el auto-play después de 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-screen overflow-y-auto scroll-smooth"
      ref={scrollRef}
      style={{
        scrollBehavior: 'smooth',
        scrollSnapType: 'y mandatory'
      }}
    >
      {/* Sección 1: Tarjeta principal con fecha */}
      <section 
        className="min-h-screen flex items-center justify-center p-4 scroll-snap-align-start overflow-x-hidden"
        style={{
          backgroundImage: `url('/images/background-texture.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-2xl px-2"
        >
          <div 
            className="relative rounded-lg shadow-2xl overflow-hidden bg-white/40 backdrop-blur-sm"
          >
            <div className="relative p-6 md:p-12">
              {/* Sobre decorativo */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }} 
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="relative mx-auto w-full max-w-md">
                  <div className="bg-sage p-6 relative" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}>
                    <div className="text-center py-6 flex justify-center">
                      <img 
                        src="/images/letras.png" 
                        alt="FH" 
                        className="w-32 h-32 md:w-36 md:h-36 object-contain"
                        style={{
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Sello */}
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-16 h-16 z-10"
                  >
                    <img 
                      src="/images/sello.png" 
                      alt="Sello" 
                      className="w-full h-full object-contain"
                      style={{
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Contenido */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <p className="text-xs tracking-widest text-gray-500 mb-6 font-light">
                  DECIDIMOS DECIRNOS QUE SÍ PARA TODA LA VIDA
                </p>
                
                <h1 className="font-serif text-4xl md:text-6xl text-gray-700 mb-3">
                  HÉCTOR
                </h1>
                <p className="text-3xl md:text-4xl text-gray-500 font-light italic mb-3">&</p>
                <h1 className="font-serif text-4xl md:text-6xl text-gray-700 mb-8">
                  FÁTIMA
                </h1>
                
                <p className="text-sm tracking-wide text-gray-600 mb-8 leading-relaxed">
                  TENEMOS EL HONOR DE INVITARLOS A<br />
                  CELEBRAR NUESTRA UNIÓN EL DÍA
                </p>
                
                <div className="text-gray-600 mb-12">
                  <p className="text-xs tracking-widest mb-2">SÁBADO</p>
                  <p className="text-xs tracking-wider mb-2">ENERO</p>
                  <p className="text-6xl md:text-7xl font-light mb-2">24</p>
                  <p className="text-base md:text-lg tracking-widest">2026</p>
                </div>
              </motion.div>

              {/* Tarjeta RSVP */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                viewport={{ once: true }}
                className="relative mx-auto w-72 h-72 md:w-80 md:h-80 mt-8"
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full shadow-lg flex items-center justify-center"
                  style={{
                    clipPath: 'circle(45% at 50% 50%)',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  <div className="text-center px-8 flex flex-col justify-center items-center h-full max-w-[85%]">
                    {guestData && (
                      <h3 className="font-serif text-sm md:text-base text-sage mb-2 leading-tight max-w-full break-words">
                        {guestData.name}
                      </h3>
                    )}
                    <p className="text-[10px] md:text-xs tracking-wide text-gray-600 leading-relaxed mt-1">
                      CON MUCHO<br />
                      CARIÑO HEMOS<br />
                      RESERVADO {guestData ? guestData.tickets : 'UN'}<br />
                      {guestData && guestData.tickets === 1 ? 'PASE' : 'PASES'}<br />
                      PARA TI
                    </p>
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

              {/* Indicador de scroll */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                viewport={{ once: true }}
                className="mt-16 text-center text-gray-500 text-sm"
              >
                <p className="italic">Desliza hacia abajo</p>
                <div className="mt-4 animate-bounce">
                  <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Sección 2: Imagen de la pareja */}
      <section 
        className="min-h-screen flex items-center justify-center p-4 scroll-snap-align-start relative bg-cover bg-center md:bg-fixed"
        style={{
          backgroundImage: `url('/images/couple-2.jpg')`,
          backgroundPosition: 'center center'
        }}
      >
        {/* Overlay para mejor contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {/* Indicador de más contenido */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          viewport={{ once: true }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="animate-bounce">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Sección 3: Detalles de la Recepción */}
      <section 
        className="min-h-screen flex items-center justify-center p-4 scroll-snap-align-start overflow-x-hidden"
        style={{
          backgroundImage: `url('/images/background-texture.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl"
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Tarjeta izquierda - Notas */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-8"
            >
              <div className="space-y-6">
                <div className="text-center pb-4 border-b border-gray-200">
                  <p className="text-sm tracking-widest text-gray-600 mb-2">ESTACIONAMIENTO</p>
                  <p className="text-xs text-gray-500">INCLUIDO</p>
                </div>
                
                <div className="text-center pb-4 border-b border-gray-200">
                  <p className="text-sm tracking-widest text-gray-600 mb-2">EVENTO</p>
                  <p className="text-xs text-gray-500">SOLO PARA ADULTOS</p>
                </div>
              </div>
            </motion.div>

            {/* Tarjeta derecha - Recepción */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-sage text-white rounded-lg shadow-2xl overflow-hidden relative"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
                backgroundImage: `
                  linear-gradient(135deg, rgba(0,0,0,0.05) 25%, transparent 25%),
                  linear-gradient(225deg, rgba(0,0,0,0.05) 25%, transparent 25%),
                  linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%),
                  linear-gradient(315deg, rgba(0,0,0,0.05) 25%, transparent 25%)
                `,
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 10px 0, 10px -10px, 0px 10px'
              }}
            >
              <div className="p-8 pb-16">
                <h2 className="text-3xl font-serif text-center mb-6 tracking-wider">
                  RECEPCIÓN
                </h2>

                {/* Logo de Finca Guadalupe */}
                <div className="flex justify-center mb-6">
                  <img 
                    src="/images/finca-logo.jpg" 
                    alt="Finca Guadalupe Logo" 
                    className="w-48 h-auto object-contain"
                    style={{
                      mixBlendMode: 'screen',
                      filter: 'contrast(1.5) brightness(1.1)'
                    }}
                    onError={(e) => {
                      console.error('Error cargando logo:', e)
                      e.target.style.display = 'none'
                    }}
                  />
                </div>

                <h3 className="text-2xl font-serif text-center mb-4 tracking-wide">
                  FINCA GUADALUPE
                </h3>

                <p className="text-xs text-center leading-relaxed mb-6 opacity-90">
                  CD. AYALA, KM. 3 CARRETERA TLAYECAC<br />
                  XALOSTOC, CARR. TLAYECAC -<br />
                  HUITZIILILLA, 62723 TLAYECAC, MOR.
                </p>

                <p className="text-3xl font-light text-center mb-6">
                  12:30 PM
                </p>

                <div className="flex justify-center">
                  <a
                    href="https://google.com/maps/place/Finca+Guadalupe/@18.7320681,-98.8968436,17z/data=!3m1!4b1!4m6!3m5!1s0x85ce66f13a28d4ef:0x3b05798fcdd4dae6!8m2!3d18.7320681!4d-98.8942687!16s%2Fg%2F1232kf19c?entry=ttu&g_ep=EgoyMDI1MTAwNC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white px-8 py-2 rounded text-sm tracking-widest hover:bg-white hover:text-sage transition-all duration-300"
                  >
                    VER MAPA
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tarjeta Dresscode - Abajo centrada */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-8 backdrop-blur-sm rounded-lg shadow-xl p-8 max-w-md mx-auto relative overflow-hidden"
            style={{
              background: '#f5f5f0',
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(0,0,0,0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0,0,0,0.03) 0%, transparent 50%),
                radial-gradient(circle at 40% 20%, rgba(255,255,255,0.4) 0%, transparent 30%),
                radial-gradient(circle at 60% 70%, rgba(0,0,0,0.02) 0%, transparent 40%),
                repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px),
                repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px)
              `,
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05), 0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <h3 className="text-xl font-serif text-center mb-4 text-gray-700 tracking-wider">
              DRESSCODE
            </h3>
            <p className="text-center text-gray-600 mb-4 tracking-wide">FORMAL</p>
            
            {/* Imagen de dresscode */}
            <div className="flex justify-center mb-4">
              <img 
                src="/images/logo-dresscode.png" 
                alt="Dresscode Formal" 
                className="w-32 h-auto object-contain"
              />
            </div>

            <p className="text-xs text-center text-gray-500 leading-relaxed">
              DAMAS
              <br />
              FAVOR DE NO USAR<br />
              COLOR BLANCO U OLIVA
            </p>
          </motion.div>

          {/* Indicador de scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center text-gray-500 text-sm"
          >
            <div className="animate-bounce">
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Sección 4: Opciones de Hospedaje */}
      <section 
        className="min-h-screen flex items-center justify-center p-4 scroll-snap-align-start"
        style={{
          backgroundImage: `url('/images/background-texture.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-5xl"
        >
          {/* Imagen de las manos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 rounded-lg overflow-hidden shadow-2xl"
          >
            <img 
              src="/images/manos.jpg" 
              alt="Manos con anillos" 
              className="w-full h-64 object-cover object-center"
              style={{
                objectPosition: 'center 40%'
              }}
            />
          </motion.div>

          {/* Título con forma de cinta */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 relative"
          >
            <div 
              className="bg-sage text-white py-6 px-12 shadow-xl mx-auto max-w-2xl"
              style={{
                clipPath: 'polygon(2% 0%, 98% 0%, 100% 50%, 98% 100%, 2% 100%, 0% 50%)',
                backgroundImage: `
                  linear-gradient(135deg, rgba(0,0,0,0.05) 25%, transparent 25%),
                  linear-gradient(225deg, rgba(0,0,0,0.05) 25%, transparent 25%),
                  linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%),
                  linear-gradient(315deg, rgba(0,0,0,0.05) 25%, transparent 25%)
                `,
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 10px 0, 10px -10px, 0px 10px'
              }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-center tracking-wider">
                OPCIONES DE HOSPEDAJE
              </h2>
            </div>
          </motion.div>

          {/* Tarjetas de hoteles */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Hotel 1 - Los Naranjos */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden"
            >
              <div className="relative">
                <div 
                  className="w-full h-48 overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundImage: `url('/images/background-texture.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <img 
                    src="/images/finca1.jpg" 
                    alt="Los Naranjos Hotel" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-serif mb-2 text-gray-700">LOS NARANJOS HOTEL</h3>
                <p className="text-xs text-gray-500 mb-2">1 MIN DE DISTANCIA</p>
                <p className="text-xs text-gray-600 mb-4">ALIMENTOS INCLUIDOS</p>
                <a
                  href="https://google.com/maps/place/Los+Naranjos+Hotel/@18.7332403,-98.8975049,17z/data=!4m9!3m8!1s0x85ce66ec2505c317:0xa8a1e928e75e7079!5m2!4m1!1i2!8m2!3d18.7332403!4d-98.89493!16s%2Fg%2F1hhh1319r?entry=ttu&g_ep=EgoyMDI1MTAwNC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-2 border-sage text-sage px-6 py-2 rounded text-sm tracking-wider hover:bg-sage hover:text-white transition-all duration-300"
                >
                  VER MAPA
                </a>
              </div>
            </motion.div>

            {/* Hotel 2 - Finca Guadalupe (Principal) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden"
            >
              <div className="relative">
                <div 
                  className="w-full h-48 overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundImage: `url('/images/background-texture.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <img 
                    src="/images/finca2.jpg" 
                    alt="Finca Guadalupe" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-serif mb-2 text-gray-700">FINCA GUADALUPE</h3>
                <p className="text-xs text-gray-500 mb-2">SEDE PRINCIPAL</p>
                <p className="text-xs text-gray-600 mb-4">ALIMENTOS INCLUIDOS</p>
                <a
                  href="https://google.com/maps/place/Finca+Guadalupe/@18.7320681,-98.8968436,17z/data=!3m1!4b1!4m6!3m5!1s0x85ce66f13a28d4ef:0x3b05798fcdd4dae6!8m2!3d18.7320681!4d-98.8942687!16s%2Fg%2F1232kf19c?entry=ttu&g_ep=EgoyMDI1MTAwNC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-2 border-sage text-sage px-6 py-2 rounded text-sm tracking-wider hover:bg-sage hover:text-white transition-all duration-300"
                >
                  VER MAPA
                </a>
              </div>
            </motion.div>

            {/* Hotel 3 - Finca Valeria */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden"
            >
              <div className="relative">
                <div 
                  className="w-full h-48 overflow-hidden flex items-center justify-center"
                  style={{
                    backgroundImage: `url('/images/background-texture.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <img 
                    src="/images/claustro.jpeg" 
                    alt="El Claustro" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-serif mb-2 text-gray-700">EL CLAUSTRO</h3>
                <p className="text-xs text-gray-500 mb-2">1 MIN DE DISTANCIA</p>
                <p className="text-xs text-gray-600 mb-4">ALIMENTOS INCLUIDOS</p>
                <a
                  href="https://www.google.com/maps/place/El+Claustro/@18.7322521,-98.9001274,17z/data=!3m1!4b1!4m6!3m5!1s0x85ce66f3f7fac06d:0x54741ab23dd40918!8m2!3d18.7322521!4d-98.8975525!16s%2Fg%2F12cpfkhh8?hl=es-mx&entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-2 border-sage text-sage px-6 py-2 rounded text-sm tracking-wider hover:bg-sage hover:text-white transition-all duration-300"
                >
                  VER MAPA
                </a>
              </div>
            </motion.div>
          </div>

          {/* Icono de campana */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img 
              src="/images/campanilla.png" 
              alt="Campanilla" 
              className="w-20 h-auto object-contain"
            />
          </motion.div>

          {/* Indicador de scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-gray-500 text-sm"
          >
            <div className="animate-bounce">
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Sección 4.5: Carrusel de Fotos */}
      <section 
        className="min-h-screen flex items-center justify-center p-4 scroll-snap-align-start relative overflow-hidden"
      >
        {/* Todas las imágenes apiladas con crossfade */}
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url('${image}')`,
              backgroundPosition: 'center center',
              opacity: index === currentImageIndex ? 1 : 0,
              zIndex: index === currentImageIndex ? 1 : 0
            }}
          />
        ))}
        
        {/* Overlay para mejor contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10" />

        {/* Botón anterior */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          viewport={{ once: true }}
          onClick={handlePrevious}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 md:p-4 transition-all duration-300"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Botón siguiente */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          viewport={{ once: true }}
          onClick={handleNext}
          className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 md:p-4 transition-all duration-300"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>

        {/* Indicadores de puntos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          viewport={{ once: true }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex gap-3"
        >
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </motion.div>

        {/* Indicador de más contenido */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          viewport={{ once: true }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="animate-bounce">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Sección 5: Mesa de Regalos */}
      <section 
        className="min-h-screen flex items-center justify-center p-4 scroll-snap-align-start"
        style={{
          backgroundImage: `url('/images/background-texture.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl"
        >
          {/* Tarjeta de mensaje */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-8 md:p-12 max-w-2xl mx-auto"
            style={{
              background: '#f5f5f0',
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(0,0,0,0.03) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0,0,0,0.03) 0%, transparent 50%),
                radial-gradient(circle at 40% 20%, rgba(255,255,255,0.4) 0%, transparent 30%),
                radial-gradient(circle at 60% 70%, rgba(0,0,0,0.02) 0%, transparent 40%),
                repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px),
                repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(0,0,0,0.01) 2px, rgba(0,0,0,0.01) 4px)
              `,
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05), 0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            {/* Icono de regalos */}
            <div className="flex justify-center mb-6">
              <img 
                src="/images/regalos.png" 
                alt="Regalos" 
                className="w-24 h-auto object-contain"
              />
            </div>

            <p className="text-center text-gray-600 text-sm md:text-base leading-relaxed">
              NUESTRO MEJOR REGALO ES<br />
              DISFRUTAR ESTE DÍA CON USTEDES,<br />
              PERO SI QUIEREN TENER UN<br />
              DETALLE CON NOSOTROS<br />
              AYÚDANOS A ESCOGER EL DESTINO<br />
              DE NUESTRA LUNA DE MIEL.
            </p>
          </motion.div>

          {/* Tarjeta verde con opciones de viaje */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-sage text-white rounded-lg shadow-2xl overflow-hidden relative"
            style={{
              backgroundImage: `
                linear-gradient(135deg, rgba(0,0,0,0.05) 25%, transparent 25%),
                linear-gradient(225deg, rgba(0,0,0,0.05) 25%, transparent 25%),
                linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%),
                linear-gradient(315deg, rgba(0,0,0,0.05) 25%, transparent 25%)
              `,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 10px 0, 10px -10px, 0px 10px',
              clipPath: 'polygon(3% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)'
            }}
          >
            <div className="p-8 md:p-12">
              {/* Grid de opciones */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Opción 1 - Auroras Boreales */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="rounded-lg p-6 shadow-lg"
                  style={{
                    backgroundImage: `url('/images/background-texture.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div 
                    className="mb-4 rounded-lg overflow-hidden shadow-md flex items-center justify-center bg-white"
                  >
                    <img 
                      src="/images/auroras.jpeg" 
                      alt="Auroras Boreales" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-serif mb-4 tracking-wide text-gray-800 text-center">AURORAS BOREALES</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-700 mb-1 font-semibold">Titular:</p>
                      <p className="text-sm font-medium text-gray-800">Hector Julian Rodriguez Zuckerman</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-1 font-semibold">Clabe BBVA:</p>
                      <div 
                        className={`flex items-center justify-between border-2 p-3 rounded cursor-pointer transition-colors ${
                          copiedClabe === 'auroras' 
                            ? 'bg-green-100 border-green-400' 
                            : 'bg-white border-gray-600 hover:bg-gray-50 hover:border-sage'
                        }`}
                        onClick={() => {
                          navigator.clipboard.writeText('012180015362999286')
                          setCopiedClabe('auroras')
                          setTimeout(() => setCopiedClabe(null), 1000)
                        }}
                        title="Click para copiar"
                      >
                        <span className="text-sm font-mono text-gray-900 font-semibold">012 180 01536299928 6</span>
                        <svg className="w-5 h-5 text-gray-600 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Opción 2 - Safari África */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="rounded-lg p-6 shadow-lg"
                  style={{
                    backgroundImage: `url('/images/background-texture.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div 
                    className="mb-4 rounded-lg overflow-hidden shadow-md flex items-center justify-center bg-white"
                  >
                    <img 
                      src="/images/africa.jpg" 
                      alt="Safari en África" 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-serif mb-4 tracking-wide text-gray-800 text-center">SAFARI EN ÁFRICA</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-700 mb-1 font-semibold">Titular:</p>
                      <p className="text-sm font-medium text-gray-800">Fatima Maria Desentis Giraldo</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 mb-1 font-semibold">Clabe BBVA:</p>
                      <div 
                        className={`flex items-center justify-between border-2 p-3 rounded cursor-pointer transition-colors ${
                          copiedClabe === 'safari' 
                            ? 'bg-green-100 border-green-400' 
                            : 'bg-white border-gray-600 hover:bg-gray-50 hover:border-sage'
                        }`}
                        onClick={() => {
                          navigator.clipboard.writeText('012180015542073388')
                          setCopiedClabe('safari')
                          setTimeout(() => setCopiedClabe(null), 1000)
                        }}
                        title="Click para copiar"
                      >
                        <span className="text-sm font-mono text-gray-900 font-semibold">012 180 01554207338 8</span>
                        <svg className="w-5 h-5 text-gray-600 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Nota final */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center text-xs opacity-90 mt-6"
              >
                EL DESTINO SERÁ ELEGIDO POR LA CUENTA QUE RECAUDE MÁS FONDOS
              </motion.p>
            </div>
          </motion.div>

          {/* Indicador de scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center text-gray-500 text-sm"
          >
            <div className="animate-bounce">
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Sección Final: Imagen de Aceptación con Contador */}
      <section 
        className="min-h-screen flex items-center justify-center p-4 scroll-snap-align-start relative bg-cover bg-center md:bg-fixed"
        style={{
          backgroundImage: `url('/images/acepta.jpg')`,
          backgroundPosition: 'center center'
        }}
      >
        {/* Overlay para mejor contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="relative z-10 text-center px-4 w-full max-w-6xl"
        >
          {/* Iniciales F & H en dorado */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-8"
          >
            <img 
              src="/images/letras.png" 
              alt="FH" 
              className="w-64 md:w-80 h-auto object-contain"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.5)) drop-shadow(0 4px 8px rgba(0,0,0,0.8))'
              }}
            />
          </motion.div>

          {/* Fecha */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-white text-xl md:text-2xl tracking-widest font-light"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            24 • 01 • 2026
          </motion.p>

          {/* Contador Regresivo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            viewport={{ once: true }}
          >
            <Countdown />
          </motion.div>

          {/* Confirmación de Asistencia */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1 }}
            viewport={{ once: true }}
            className="mt-12 max-w-xl mx-auto"
          >
            <h3 className="text-lg md:text-xl font-serif text-center mb-6 text-white/90 drop-shadow">
              Confirma tu Asistencia
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 px-4">
              {/* Botón Confirmar */}
              <motion.a
                href={`https://wa.me/5217779866116?text=${encodeURIComponent(
                  guestData 
                    ? `¡Hola! Soy ${guestData.name}. Confirmo mi asistencia a la boda de Héctor & Fátima el 24 de enero de 2026. ¡Nos vemos allí!`
                    : '¡Hola! Confirmo mi asistencia a la boda de Héctor & Fátima el 24 de enero de 2026. ¡Nos vemos allí!'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 backdrop-blur-sm text-white py-3 px-6 rounded-lg shadow-lg hover:bg-white/25 transition-all duration-300 text-center border border-white/20"
              >
                <svg className="w-5 h-5 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span className="block text-sm">Confirmar</span>
              </motion.a>

              {/* Botón No Asistir */}
              <motion.a
                href={`https://wa.me/5217779866116?text=${encodeURIComponent(
                  guestData 
                    ? `Hola, soy ${guestData.name}. Lamentablemente no podré asistir a la boda de Héctor & Fátima. Les deseo lo mejor en su gran día.`
                    : 'Hola, lamentablemente no podré asistir a la boda de Héctor & Fátima. Les deseo lo mejor en su gran día.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 backdrop-blur-sm text-white py-3 px-6 rounded-lg shadow-lg hover:bg-white/25 transition-all duration-300 text-center border border-white/20"
              >
                <svg className="w-5 h-5 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
                <span className="block text-sm">No Asistiré</span>
              </motion.a>
            </div>

            <p className="text-center text-white/60 text-xs mt-4 drop-shadow">
              Tu respuesta será enviada por WhatsApp
            </p>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  )
}

export default InvitationContent

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const hasAnimated = useRef(false)

  useEffect(() => {
    const weddingDate = new Date('2026-01-24T12:30:00').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = weddingDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  const TimeUnit = ({ value, label, delay, unitKey }) => {
    const shouldAnimate = !hasAnimated.current

    useEffect(() => {
      if (!hasAnimated.current) {
        hasAnimated.current = true
      }
    }, [])

    return (
      <motion.div
        key={unitKey}
        initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shouldAnimate ? delay : 0, duration: shouldAnimate ? 0.8 : 0 }}
        className="flex flex-col items-center"
      >
        <span 
          className="text-5xl md:text-6xl font-light mb-2"
          style={{
            color: '#ffffff',
            textShadow: '0 2px 8px rgba(0,0,0,0.6)'
          }}
        >
          {String(value).padStart(2, '0')}
        </span>
        <span 
          className="text-xs md:text-sm tracking-widest uppercase"
          style={{
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}
        >
          {label}
        </span>
      </motion.div>
    )
  }

  const shouldAnimateContainer = !hasAnimated.current

  return (
    <motion.div
      initial={shouldAnimateContainer ? { opacity: 0, scale: 0.95 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: shouldAnimateContainer ? 1 : 0 }}
      className="w-full max-w-4xl mx-auto px-4"
    >
      <motion.h3
        initial={shouldAnimateContainer ? { opacity: 0, y: -20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shouldAnimateContainer ? 0.2 : 0, duration: shouldAnimateContainer ? 0.8 : 0 }}
        className="text-2xl md:text-3xl font-serif text-center mb-8"
        style={{
          color: '#ffffff',
          textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0,0,0,0.8)'
        }}
      >
        Faltan
      </motion.h3>

      <div className="grid grid-cols-4 gap-4 md:gap-8">
        <TimeUnit value={timeLeft.days} label="Días" delay={0.3} unitKey="days" />
        <TimeUnit value={timeLeft.hours} label="Horas" delay={0.4} unitKey="hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutos" delay={0.5} unitKey="minutes" />
        <TimeUnit value={timeLeft.seconds} label="Segundos" delay={0.6} unitKey="seconds" />
      </div>
    </motion.div>
  )
}

export default Countdown

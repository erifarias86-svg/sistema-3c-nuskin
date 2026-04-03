/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  XCircle, 
  Gem, 
  Sparkles, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Zap, 
  Mic, 
  Video, 
  Clock,
  ArrowRight,
  CreditCard
} from 'lucide-react';

// --- Components ---

const Button = ({ children, className = "", primary = true, onClick, href }: { children: React.ReactNode, className?: string, primary?: boolean, onClick?: () => void, href?: string }) => {
  const content = (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 215, 0, 0.5)" }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        ${primary ? 'gold-gradient text-black' : 'border-2 border-gold-bright text-gold-bright bg-transparent'}
        px-6 py-4 md:px-8 md:py-5 rounded-sm font-cta text-base md:text-lg uppercase tracking-widest transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block w-full md:w-auto">
        {content}
      </a>
    );
  }

  return content;
};

const SectionTitle = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-10 md:mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl font-sans font-black mb-4 ${light ? 'text-white' : 'gold-text-gradient'}`}
    >
      {children}
    </motion.h2>
    {subtitle && <p className="text-gray-400 max-w-2xl mx-auto font-sans font-light text-lg md:text-xl">{subtitle}</p>}
    <div className="w-24 h-1 gold-gradient mx-auto mt-6"></div>
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gold-elegant/30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-gold-bright transition-colors"
      >
        <span className="text-base md:text-lg font-medium">{question}</span>
        {isOpen ? <ChevronUp className="text-gold-bright" /> : <ChevronDown className="text-gold-bright" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WhatsAppBubble: React.FC<{ text: string, author: string, time: string }> = ({ text, author, time }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex flex-col gap-1 max-w-[320px] mx-auto w-full"
  >
    <div className="flex items-center gap-2 mb-1">
      <div className="w-8 h-8 rounded-full bg-soft-black flex items-center justify-center text-xs font-bold text-gold-bright border border-gold-elegant/30">
        {author[0]}
      </div>
      <span className="text-xs font-bold text-gold-bright uppercase tracking-wider">{author}</span>
    </div>
    <div className="relative bg-[#202c33] p-4 rounded-2xl rounded-tl-none shadow-2xl border border-white/5">
      {/* Tail */}
      <div className="absolute top-0 -left-2 w-0 h-0 border-t-[12px] border-t-[#202c33] border-l-[12px] border-l-transparent"></div>
      
      <p className="text-[#e9edef] text-sm leading-relaxed mb-2 font-sans">
        {text}
      </p>
      <div className="flex justify-end items-center gap-1">
        <span className="text-[#8696a0] text-[10px]">{time}</span>
        <div className="flex">
          <CheckCircle2 size={10} className="text-[#53bdeb]" />
          <CheckCircle2 size={10} className="text-[#53bdeb] -ml-1" />
        </div>
      </div>
    </div>
  </motion.div>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }
        
        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="bg-black border-b border-gold-bright/30 py-3 px-4 sticky top-0 z-[100] backdrop-blur-md bg-black/80">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        <div className="flex items-center gap-2 text-gold-bright animate-pulse">
          <Clock className="w-5 h-5" />
          <span className="text-xs sm:text-sm font-cta tracking-widest uppercase font-bold">
            Oferta por tiempo limitado
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {[
            { label: 'HS', value: timeLeft.hours },
            { label: 'MIN', value: timeLeft.minutes },
            { label: 'SEG', value: timeLeft.seconds }
          ].map((unit, i) => (
            <div key={i} className="flex items-baseline gap-1">
              <span className="text-2xl font-sans font-black text-gold-bright tabular-nums drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                {format(unit.value)}
              </span>
              <span className="text-[10px] font-cta text-gold-bright/70 font-bold">
                {unit.label}
              </span>
              {i < 2 && <span className="text-gold-bright/50 mx-1 font-bold">:</span>}
            </div>
          ))}
        </div>

        <div className="hidden md:block text-gold-bright/60 text-[10px] font-sans uppercase tracking-[0.2em]">
          El precio subirá pronto
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-luxury-black overflow-x-hidden">
      <CountdownTimer />
      
      {/* 1. HERO SECTION */}
      <header className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#FFD700 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center mb-8"
          >
            <div className="bg-white/90 p-4 rounded-xl mb-4 border border-gold-bright/30 gold-shadow flex items-center gap-4">
              <img 
                src="https://i.imgur.com/g23iHVb.png" 
                alt="Nu Skin Logo" 
                className="h-14 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-black font-sans font-bold text-sm tracking-widest uppercase">
                Exclusivo para Distribuidoras
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl md:text-5xl font-sans font-black leading-tight mb-8">
              Pasá de subir contenido que nadie mira… a generar conversaciones <span className="gold-text-gradient">TODOS los días</span> y empezar a vender en los próximos <span className="text-gold-bright underline decoration-gold-elegant">3 días</span>
            </h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative max-w-2xl mx-auto mb-12"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden border border-gold-elegant/20 gold-shadow">
                <img 
                  src="https://i.imgur.com/ay3s3kU.png" 
                  alt="Resultados y logros" 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-gold-bright opacity-30"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-gold-bright opacity-30"></div>
            </motion.div>

            <p className="text-lg md:text-2xl text-gray-300 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
              El <span className="text-gold-bright font-semibold">Sistema 3C Nu Skin</span> que ya está ayudando a distribuidoras como vos a dejar de improvisar y empezar a vender con un método que funciona.
            </p>
            <div className="flex flex-col items-center gap-6">
              <Button 
                className="w-full md:w-auto"
                onClick={() => document.getElementById('entregables')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🚀 SÍ, QUIERO EMPEZAR A VENDER EN 3 DÍAS
              </Button>
              <p className="text-gold-elegant/80 font-sans font-medium text-lg">Acceso inmediato • Oferta de lanzamiento</p>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gold-bright/10 blur-3xl rounded-full"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-bright/10 blur-3xl rounded-full"></div>
      </header>

      {/* 3. INTRO/HISTORIA */}
      <section className="py-12 md:py-24 px-4 bg-soft-black overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden border border-gold-elegant/20 gold-shadow">
                <img 
                  src="https://i.imgur.com/zBZZMQu.jpeg" 
                  alt="Mujer frustrada mirando su celular" 
                  className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold-bright opacity-50"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold-bright opacity-50"></div>
            </motion.div>

            <div>
              <div className="space-y-6 mb-12">
                {[
                  "¿Te pasa que publicás en redes pero nadie te escribe?",
                  "¿Que ves a otras distribuidoras crecer mientras vos seguís en el mismo lugar?",
                  "¿Que tenés miedo de parecer \"vendedora\" o no sabés qué decir cuando alguien te pregunta?"
                ].map((question, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-5 border border-gold-elegant/10 bg-luxury-black/30 rounded-lg group hover:border-gold-bright/40 transition-all"
                  >
                    <div className="w-2 h-2 rounded-full gold-gradient shrink-0 shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
                    <p className="text-lg md:text-xl font-sans font-medium text-gold-elegant group-hover:text-gold-bright transition-colors">
                      {question}
                    </p>
                  </motion.div>
                ))}
              </div>
                
              <div className="pt-4 space-y-6 text-gray-300 text-lg leading-relaxed">
                <p><strong className="text-white">Yo lo viví.</strong> Y sé exactamente cómo se siente esa frustración de tener un producto increíble pero no saber cómo comunicarlo.</p>
                <p>Por eso creé algo diferente. No teoría motivacional que no sirve. No "hacé esto y ya".</p>
                <p className="text-xl md:text-2xl font-sans font-bold text-white border-l-4 border-gold-bright pl-6 py-2">
                  Un <span className="text-gold-bright">SISTEMA REAL</span> que te dice exactamente qué publicar, qué decir y cómo cerrar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. UVP (SISTEMA 3C) */}
      <section className="py-12 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="border-2 border-gold-bright p-8 md:p-16 bg-soft-black relative gold-shadow">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gold-bright text-black px-4 py-1 md:px-6 md:py-2 font-cta text-[10px] md:text-sm tracking-widest whitespace-nowrap">
              EL MÉTODO DEFINITIVO
            </div>
            
            <SectionTitle subtitle="Es lo único que necesitás para pasar de 'no sé qué hacer' a vender consistentemente.">
              💣 SISTEMA 3C NU SKIN
            </SectionTitle>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                { title: "CONTENIDO", desc: "Sabés EXACTAMENTE qué publicar cada día", icon: <Sparkles className="w-8 h-8" /> },
                { title: "CONVERSACIÓN", desc: "Sabés EXACTAMENTE qué decir por mensaje", icon: <MessageSquare className="w-8 h-8" /> },
                { title: "CONVERSIÓN", desc: "Sabés EXACTAMENTE cómo cerrar ventas", icon: <TrendingUp className="w-8 h-8" /> }
              ].map((item, i) => (
                <div key={i} className="text-center p-6 border border-gold-elegant/20 hover:border-gold-bright transition-all duration-300 group">
                  <div className="text-gold-bright mb-4 flex justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="text-xl font-cta mb-2 tracking-wider">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. BULLETS DE BENEFICIOS */}
      <section className="py-12 md:py-24 px-4 bg-soft-black">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Sin trabarte, sin improvisar, sin perder ventas">
            ⚡ En los próximos días vas a lograr:
          </SectionTitle>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid gap-6">
              {[
                { main: "Terminar con el 'no sé qué publicar'", sub: "Tenés contenido planeado para meses" },
                { main: "Generar mensajes constantemente", sub: "Tu DM se llena de 'info', 'me interesa', 'contame más'" },
                { main: "Saber exactamente qué responder", sub: "Sin trabarte, sin improvisar, sin perder ventas" },
                { main: "Vender y reclutar con confianza", sub: "Porque seguís un sistema, no improvisás" },
                { main: "Construir ingresos reales y consistentes", sub: "Mes a mes, sin depender de la suerte" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 border-l-2 border-gold-elegant/30 hover:border-gold-bright transition-colors bg-luxury-black/50"
                >
                  <Gem className="text-gold-bright shrink-0 mt-1" size={20} />
                  <div>
                    <span className="text-gold-bright font-bold text-lg block md:inline">{item.main}</span>
                    <span className="text-gray-400 md:ml-2">→ {item.sub}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. SOCIAL PROOF (WHATSAPP STYLE) */}
      <section className="py-12 md:py-24 px-4 relative overflow-hidden">
        {/* Background texture for chat feel */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '400px' }}></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle subtitle="Capturas reales de conversaciones con el sistema">
            🎯 Esto NO es teoría
          </SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { text: "En 48 horas ya tenía 3 personas preguntándome por los productos. Nunca me había pasado antes.", author: "Laura M.", time: "14:22" },
              { text: "Dejé de sentirme perdida. Ahora sé exactamente qué hacer cada día.", author: "Carolina R.", time: "09:15" },
              { text: "Mi primera venta llegó en 5 días. El sistema funciona.", author: "Natalia S.", time: "18:40" }
            ].map((t, i) => (
              <WhatsAppBubble key={i} text={t.text} author={t.author} time={t.time} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. ENTREGABLES */}
      <section id="entregables" className="py-12 md:py-24 px-4 bg-soft-black">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Todo lo que necesitás para vender sin pensar">
            📦 CONTENIDO DEL SISTEMA
          </SectionTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Agente IA de Contenido", desc: "Ideas, hooks y guiones listos para que nunca más te quedes sin saber qué publicar", icon: <Zap /> },
              { title: "Agente IA Closer", desc: "Respuestas exactas y cierres por DM que convierten conversaciones en ventas", icon: <MessageSquare /> },
              { title: "Banco de Hooks Virales", desc: "Para belleza, productos y negocio - copiás, pegás y publicás", icon: <Sparkles /> },
              { title: "50 Guiones de Venta", desc: "Scripts probados que generan ventas, sin sonar robótica", icon: <TrendingUp /> },
              { title: "50 Guiones de Reclute", desc: "Exactamente qué decir para atraer personas a tu equipo", icon: <Users /> },
              { title: "Manejo de Objeciones", desc: "Respuestas para cada 'no' que escuchás", icon: <ShieldCheck /> }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-gold-elegant/20 hover:border-gold-bright bg-luxury-black transition-all group">
                <div className="text-gold-bright mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl font-sans font-bold mb-3 text-gold-bright">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9.5 VISUAL BREAK / MOCKUP */}
      <section className="py-12 px-4 bg-luxury-black">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-gold-bright/20 gold-shadow"
          >
            <img 
              src="https://i.imgur.com/wq60m8T.png" 
              alt="Visualización del Sistema 3C" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
          </motion.div>
        </div>
      </section>

      {/* 10. BONIFICACIONES */}
      <section className="py-12 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle="Valor total de bonos: $75.000">
            🎁 BONOS EXCLUSIVOS
          </SectionTitle>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "NUNCA MÁS TE DEJEN EN VISTO", desc: "Respuestas automáticas para convertir cada comentario en conversación" },
              { title: "DEL COMENTARIO A LA VENTA", desc: "Flujo exacto desde 'info' hasta compra o ingreso al equipo" },
              { title: "AUDIOS QUE VENDEN POR VOS", desc: "Mensajes de voz listos que aumentan conversión al 300%" },
              { title: "+ DE 150 HOOKS VIRALES", desc: "Ideas por producto para 6 meses de contenido" },
              { title: "POV HOOKS", desc: "Guiones tipo 'POV' que generan identificación inmediata" },
              { title: "UGC HOOKS", desc: "Hooks orgánicos que parecen recomendaciones naturales" }
            ].map((bonus, i) => (
              <div key={i} className="flex gap-6 p-6 bg-soft-black border-l-4 border-gold-bright relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-gold-bright text-black text-[10px] font-bold px-3 py-1 rotate-45 translate-x-4 translate-y-2">GRATIS</div>
                <div className="text-gold-bright shrink-0">
                  <Gem size={32} />
                </div>
                <div>
                  <h4 className="text-lg font-cta mb-2 tracking-wide group-hover:text-gold-bright transition-colors">{bonus.title}</h4>
                  <p className="text-gray-400 text-sm">{bonus.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. PRICING */}
      <section className="py-12 md:py-24 px-4 bg-soft-black">
        <div className="max-w-3xl mx-auto text-center border-2 border-gold-bright p-8 md:p-12 bg-luxury-black gold-shadow relative">
          <div className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 bg-gold-bright text-black px-4 py-1 md:px-8 md:py-2 font-cta text-[10px] md:text-sm tracking-widest whitespace-nowrap">
            OFERTA POR TIEMPO LIMITADO
          </div>
          
          <h2 className="text-2xl md:text-3xl font-sans font-bold mb-8">TU INVERSIÓN HOY</h2>
          
          <div className="space-y-4 mb-12 text-gray-400 text-sm md:text-base">
            <div className="flex justify-between border-b border-gold-elegant/20 pb-2">
              <span>Sistema 3C Completo</span>
              <span className="line-through">$125.000</span>
            </div>
            <div className="flex justify-between border-b border-gold-elegant/20 pb-2">
              <span>Bonos Exclusivos</span>
              <span className="line-through">$75.000</span>
            </div>
            <div className="flex justify-between text-white font-bold pt-4 items-center">
              <span>Valor Total</span>
              <span className="text-2xl md:text-4xl line-through text-gold-bright/50 decoration-gold-bright/80 decoration-2">$200.000</span>
            </div>
          </div>

          <div className="mb-12">
            <p className="text-gray-400 text-base md:text-lg mb-2">Llevátelo todo por solo:</p>
          <h2 className="text-5xl md:text-8xl font-sans font-black gold-text-gradient">$30.000</h2>
            <p className="text-gold-elegant mt-4 font-sans font-medium text-sm md:text-base">Ahorrás $170.000 hoy mismo</p>
          </div>

          <Button className="w-full mb-6" href="https://sistema-3c-nuskin.myshopify.com/checkouts/cn/hWNAYv7ciFgvYX6Ye3L0ZYQb/es-ar?_r=AQABCh_dwuTrYODNd5UQprIaG8ketkVZbmF9nh76j_Ge95M&preview_theme_id=159453741313">
            🚀 SÍ, QUIERO MI SISTEMA 3C AHORA
          </Button>
          
          <div className="flex flex-col items-center justify-center gap-6 mt-8">
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <ShieldCheck size={16} className="text-gold-bright" />
              <span>Pago 100% Seguro • Acceso Inmediato</span>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-12 transition-all duration-500">
              <img 
                src="https://i.imgur.com/fAW95rM.png" 
                alt="Medios de Pago" 
                className="h-20 md:h-32 object-contain"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://i.imgur.com/MaaUqzu.png" 
                alt="Medios de Pago" 
                className="h-20 md:h-32 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="flex items-center gap-4 text-gold-bright font-cta text-base tracking-widest uppercase font-bold border-2 border-gold-bright/30 px-8 py-3 rounded-full bg-gold-bright/5 gold-shadow">
              <CreditCard size={24} />
              <span>Aceptamos Tarjetas de Crédito y Débito</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GARANTÍA */}
      <section className="py-12 md:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center border border-gold-elegant/30 p-12 bg-soft-black rounded-lg">
          <ShieldCheck size={64} className="text-gold-bright mx-auto mb-8" />
          <h2 className="text-2xl md:text-3xl font-sans font-bold mb-6 gold-text-gradient">GARANTÍA DE 7 DÍAS</h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Probalo 7 días. Si no te da claridad, contenido o herramientas REALES para avanzar en tu negocio... <span className="text-white font-bold">te devolvemos el dinero.</span> Sin riesgo. Sin vueltas.
          </p>
        </div>
      </section>

      {/* 8. "A QUIÉN NO ES PARA" */}
      <section className="py-12 md:py-24 px-4 bg-soft-black">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-4xl font-sans font-bold text-center mb-12 text-gray-400">❌ Este sistema NO es para vos si:</h3>
          <div className="space-y-6">
            {[
              "Buscás una fórmula mágica sin trabajar",
              "Querés que todo pase de un día para el otro",
              "No estás dispuesta a seguir un método",
              "Solo querés motivación sin herramientas reales"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-5 text-gray-500">
                <XCircle size={24} className="text-red-900 shrink-0" />
                <span className="text-lg md:text-2xl">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center mt-16 text-gray-400 italic text-lg md:text-xl">Si buscás eso, este no es tu lugar.</p>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <SectionTitle>❓ PREGUNTAS FRECUENTES</SectionTitle>
          <div className="space-y-2">
            <FAQItem 
              question="¿Funciona si recién empiezo con Nu Skin?" 
              answer="Sí. El sistema está diseñado tanto para nuevas como experimentadas. Te da las bases desde cero." 
            />
            <FAQItem 
              question="¿Necesito experiencia en redes sociales?" 
              answer="No. Todo está explicado paso a paso, solo seguís las instrucciones y copiás los modelos." 
            />
            <FAQItem 
              question="¿Cuánto tiempo necesito por día?" 
              answer="Con 30-60 minutos diarios ya empezás a ver resultados consistentes." 
            />
            <FAQItem 
              question="¿Es solo para Instagram?" 
              answer="Sirve para Instagram, Facebook, TikTok y WhatsApp. Los guiones son adaptables a cualquier canal." 
            />
            <FAQItem 
              question="¿Cómo recibo el sistema?" 
              answer="El acceso es inmediato. Una vez realizado el pago, recibirás automáticamente un correo electrónico con el link de descarga para que empieces a usarlo en menos de 5 minutos." 
            />
            <FAQItem 
              question="¿Qué pasa si no funciona para mí?" 
              answer="Tenés garantía de 7 días. Si sentís que el sistema no te aporta valor real o no te da las ideas de generación de contenido que necesitás para avanzar, nos escribís y te devolvemos el 100% de tu dinero." 
            />
            <FAQItem 
              question="¿El acceso es de por vida?" 
              answer="Sí. Una vez que lo descargás, el sistema es tuyo para siempre. Podrás consultarlo y usarlo todas las veces que quieras." 
            />
            <FAQItem 
              question="¿Tengo que pagar alguna mensualidad?" 
              answer="No. Es un pago único. No hay cargos ocultos ni suscripciones mensuales." 
            />
          </div>
        </div>
      </section>

      {/* 14. URGENCIA */}
      <section className="py-12 px-4 gold-gradient text-black text-center font-cta tracking-widest">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex items-center gap-4">
            <Clock size={32} className="animate-pulse" />
            <span className="text-xl font-black">OFERTA DE LANZAMIENTO FINALIZA PRONTO</span>
          </div>
          <div className="text-sm md:text-base">
            EL PRECIO SUFRIRÁ UN AUMENTO LA PRÓXIMA SEMANA
          </div>
        </div>
      </section>

      {/* 16. DEEP DIVE */}
      <section className="py-24 px-4 bg-luxury-black text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-sans font-bold mb-8 gold-text-gradient">¿Por qué esto funciona cuando otras cosas no?</h3>
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>La mayoría de cursos te dan teoría. Te dicen "sé auténtica", "conectá con tu audiencia".</p>
            <p className="text-white font-bold text-2xl font-sans">¿Pero QUÉ publicás? ¿QUÉ decís exactamente?</p>
            <p>El Sistema 3C te da las palabras exactas. Los hooks exactos. Los scripts exactos.</p>
            <p className="text-gold-bright font-bold">No más improvisar. No más "no sé qué decir".</p>
            <p>Porque cuando tenés un SISTEMA, los resultados son predecibles.</p>
          </div>
        </div>
      </section>

      {/* 17. FINAL CTA */}
      <section className="py-32 px-4 bg-soft-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-sans font-black mb-12 leading-tight">
            Si hoy no sabés qué responder... si no vendés... si no reclutás...
          </h2>
          <p className="text-2xl text-gold-bright font-cta mb-12 tracking-widest">
            ESTE SISTEMA NO ES OPCIONAL. ES LO QUE TE ESTÁ FALTANDO.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="flex items-center gap-3 justify-center text-white">
              <CheckCircle2 className="text-gold-bright" /> Generando conversaciones
            </div>
            <div className="flex items-center gap-3 justify-center text-white">
              <CheckCircle2 className="text-gold-bright" /> Vendiendo con confianza
            </div>
            <div className="flex items-center gap-3 justify-center text-white">
              <CheckCircle2 className="text-gold-bright" /> Construyendo tu negocio
            </div>
          </div>

          <Button className="w-full md:w-auto text-xl px-12 py-6" href="https://sistema-3c-nuskin.myshopify.com/checkouts/cn/hWNAYv7ciFgvYX6Ye3L0ZYQb/es-ar?_r=AQABCh_dwuTrYODNd5UQprIaG8ketkVZbmF9nh76j_Ge95M&preview_theme_id=159453741313">
            OBTENER MI SISTEMA 3C AHORA <ArrowRight className="inline-block ml-2" />
          </Button>
        </div>
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-bright/5 blur-[120px] rounded-full pointer-events-none"></div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-gold-elegant/10 bg-black/50">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white/90 p-3 rounded-lg border border-gold-bright/20 flex items-center gap-3">
              <img 
                src="https://i.imgur.com/g23iHVb.png" 
                alt="Nu Skin Logo" 
                className="h-10 w-auto"
                referrerPolicy="no-referrer"
              />
              <span className="text-black font-sans font-bold text-xs tracking-widest uppercase">
                Nu Skin Partner
              </span>
            </div>
            <p className="text-gold-elegant font-sans font-bold tracking-widest text-sm uppercase">SISTEMA 3C NU SKIN</p>
          </div>
          
          <div className="text-center text-gray-500 text-xs max-w-2xl space-y-4">
            <p>© 2026 Todos los derechos reservados.</p>
            <p>Este sitio no es parte de Facebook ni de Meta Inc. Además, este sitio NO está respaldado por Facebook de ninguna manera. FACEBOOK es una marca registrada de FACEBOOK, Inc.</p>
            <p className="text-gold-elegant/40 italic">Exclusivo para distribuidoras independientes de Nu Skin.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

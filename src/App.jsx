import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import { 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  UserCheck, 
  ChevronDown, 
  MessageCircle, 
  Star, 
  HelpCircle, 
  Instagram, 
  Facebook, 
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

// WHATSAPP CONFIG (Reemplazar por el número de celular del negocio)
const WHATSAPP_PHONE = "573042635285"; 

// DATA SOURCES (Optimizado con imágenes de Unsplash)
const SNEAKERS_DATA = [
  {
    id: 1,
    name: "Retro High OG 'Obsidian'",
    price: "$260.000",
    rawPrice: 260000,
    tag: "Exclusivo",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Dunk Low 'Panda' Premium",
    price: "$260.000",
    rawPrice: 260000,
    tag: "Más Vendido",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Air Force 1 '07 Classic G5",
    price: "$260.000",
    rawPrice: 260000,
    tag: "Esencial",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Forum Low 'Triple White'",
    price: "$260.000",
    rawPrice: 260000,
    tag: "Premium AAA",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop"
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Andrés Felipe",
    city: "Bogotá D.C.",
    comment: "La calidad de los terminados y las costuras es simplemente impecable. Se sienten idénticos al par original. El envío llegó al día siguiente.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Valeria Gómez",
    city: "Medellín",
    comment: "Estaba un poco escéptica, pero la atención por WhatsApp fue muy profesional y transparente. Son súper cómodos. ¡10/10!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Camilo Torres",
    city: "Cali",
    comment: "Materiales excelentes, el cuero huele a nuevo y la caja vino en perfectas condiciones. Cumplen totalmente con lo que prometen.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  }
];

const FAQS = [
  {
    question: "¿Qué calidad tienen las zapatillas?",
    answer: "Nuestras piezas son de calidad G5 e Importadas AAA. Esto significa que están confeccionadas utilizando los mismos materiales, pesos, costuras y empaques que el calzado original, garantizando una durabilidad y aspecto premium idénticos."
  },
  {
    question: "¿Cuánto tarda en llegar mi pedido?",
    answer: "Para Bogotá y Medellín el envío suele tomar entre 24 a 48 horas hábiles. Para el resto del territorio de Colombia el tiempo estimado es de 2 a 4 días hábiles."
  },
  {
    question: "¿Cuáles son los métodos de pago disponibles?",
    answer: "Ofrecemos múltiples alternativas seguras: pago contra entrega en ciudades seleccionadas, transferencia directa Bancolombia/Nequi, y links de pago seguros."
  },
  {
    question: "¿Puedo realizar cambios de talla?",
    answer: "Sí. Tu satisfacción es nuestra prioridad absoluta. Realizamos cambios de talla ágiles sin costo adicional de gestión, el cliente solo asume el costo de los fletes de envío."
  },
  {
    question: "¿Cómo sé cuál es mi talla ideal?",
    answer: "Recomendamos elegir tu talla habitual en calzado deportivo de Colombia (EUR). Al escribirnos por WhatsApp, te guiaremos de forma personalizada midiendo la plantilla de tu calzado actual."
  }
];

function AnimatedCounter({ value, duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setCurrent(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{current}</span>;
}

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!selectedProduct || !selectedSize || !customerName || !customerPhone) {
      alert("Por favor, completa todos los campos del formulario de pedido.");
      return;
    }

    const message = `Hola.
Quiero pedir:

*Modelo:* ${selectedProduct}
*Talla:* ${selectedSize}
*Nombre:* ${customerName}
*Celular:* ${customerPhone}

_Quedo atento(a) a la confirmación de datos de envío y pago._`;

    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`, '_blank');
  };

  const handleSelectProductFromGallery = (productName) => {
    setSelectedProduct(productName);
    document.getElementById('pedido-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans relative">
      
      {/* 0. HEADER / NAVIGATION */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="text-xl font-black tracking-widest uppercase">
            STREET<span className="text-brand-blue">LAB</span>
          </a>
          
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-brand-gray">
            <a href="#galeria" className="hover:text-black transition-colors duration-200">Colección</a>
            <a href="#beneficios" className="hover:text-black transition-colors duration-200">Beneficios</a>
            <a href="#elegirnos" className="hover:text-black transition-colors duration-200">Garantía</a>
            <a href="#faq" className="hover:text-black transition-colors duration-200 font-medium">Preguntas</a>
          </nav>

          <div className="hidden md:flex items-center">
            <a 
              href="#pedido-section" 
              className="bg-black hover:bg-brand-blue text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-colors duration-300"
            >
              Pedir Ahora
            </a>
          </div>

          <button 
            className="md:hidden text-black focus:outline-none"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Slideout */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 w-full bg-white z-30 border-b border-gray-200 py-6 px-6 flex flex-col gap-4 shadow-xl md:hidden"
          >
            <a href="#galeria" onClick={() => setMobileMenu(false)} className="text-sm font-bold uppercase py-2 border-b border-gray-50">Colección</a>
            <a href="#beneficios" onClick={() => setMobileMenu(false)} className="text-sm font-bold uppercase py-2 border-b border-gray-50">Beneficios</a>
            <a href="#elegirnos" onClick={() => setMobileMenu(false)} className="text-sm font-bold uppercase py-2 border-b border-gray-50">Nosotros</a>
            <a href="#faq" onClick={() => setMobileMenu(false)} className="text-sm font-bold uppercase py-2">Preguntas</a>
            <a 
              href="#pedido-section" 
              onClick={() => setMobileMenu(false)}
              className="bg-black text-center text-white py-3 text-sm font-bold uppercase tracking-widest mt-2"
            >
              Pedir Ahora
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight uppercase">
                Zapatillas Premium.<br />
                <span className="text-brand-blue">Estilo sin límites.</span>
              </h1>
              
              <p className="text-lg text-brand-gray font-light max-w-md leading-relaxed">
                Los modelos más buscados a nivel mundial. Calidad excepcional en cada detalle con envíos rápidos a toda Colombia. Redefine tu pisada.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <a 
                  href="#galeria" 
                  className="bg-black hover:bg-brand-blue text-white text-center text-sm font-bold uppercase tracking-widest px-8 py-5 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Ver modelos <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Hola, me gustaría recibir asesoría personalizada sobre los modelos de zapatillas disponibles.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-black hover:border-brand-blue hover:text-brand-blue text-black text-center text-sm font-bold uppercase tracking-widest px-8 py-5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600" /> WhatsApp
                </a>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full max-w-md md:max-w-xl aspect-square"
            >
              <div className="absolute inset-0 bg-radial from-gray-100 to-white -z-10 rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop" 
                alt="Zapatillas Premium Colección de Lujo" 
                className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl filter contrast-105"
                loading="eager"
              />
            </motion.div>
          </div>

        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center cursor-pointer opacity-40 hover:opacity-100 transition-opacity"
            onClick={() => document.getElementById('beneficios').scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="text-[10px] tracking-widest uppercase font-bold mb-2">Deslizar</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
      </section>

      <hr className="border-gray-100 max-w-7xl mx-auto" />

      {/* 2. BENEFICIOS */}
      <section id="beneficios" className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs uppercase tracking-widest font-black text-brand-blue">Estándares Internacionales</h2>
            <p className="text-3xl md:text-5xl font-black uppercase tracking-tight">Experiencia de Compra Superior</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Truck className="w-8 h-8 text-black" />,
                title: "Envíos Nacionales",
                desc: "Despachamos de forma inmediata a todo el país. Rastreo continuo de tu paquete hasta la puerta de tu hogar."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-black" />,
                title: "Calidad Premium",
                desc: "Seleccionamos minuciosamente solo replicas grado G5 y AAA. Estructuras óptimas, piel genuina y acabados perfectos."
              },
              {
                icon: <UserCheck className="w-8 h-8 text-black" />,
                title: "Atención Personalizada",
                desc: "Asesoramiento inmediato 1 a 1 por WhatsApp. Te ayudamos con tu talla y enviamos fotos reales antes de despachar."
              }
            ].map((beneficio, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 border border-gray-100 rounded-none hover:border-black transition-all duration-300 group"
              >
                <div className="mb-6 p-4 inline-block bg-gray-50 group-hover:bg-blue-50 group-hover:text-brand-blue transition-colors duration-300">
                  {beneficio.icon}
                </div>
                <h3 className="text-xl font-bold uppercase mb-3">{beneficio.title}</h3>
                <p className="text-brand-gray text-sm font-light leading-relaxed">{beneficio.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. GALERÍA / PRODUCTOS */}
      <section id="galeria" className="py-20 md:py-28 px-6 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <h2 className="text-xs uppercase tracking-widest font-black text-brand-blue mb-2">Colección 2026</h2>
              <p className="text-3xl md:text-5xl font-black uppercase tracking-tight">Elige Tu Próximo Par</p>
            </div>
            <p className="text-sm text-brand-gray max-w-xs font-light">
              Ediciones limitadas en Colombia. Stock rotativo de alta demanda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SNEAKERS_DATA.map((sneaker) => (
              <motion.div
                key={sneaker.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-gray-100 flex flex-col group relative overflow-hidden"
              >
                <span className="absolute top-4 left-4 bg-black text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 z-10">
                  {sneaker.tag}
                </span>
                
                <div className="aspect-square bg-gray-100/50 overflow-hidden relative">
                  <img 
                    src={sneaker.image} 
                    alt={sneaker.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-lg leading-tight group-hover:text-brand-blue transition-colors duration-200">
                      {sneaker.name}
                    </h3>
                    <p className="text-[10px] uppercase font-black tracking-wider text-green-600 mt-1">
                      Envío incluido
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-lg font-black">{sneaker.price} <span className="text-xs font-normal text-brand-gray">COP</span></span>
                    <button 
                      onClick={() => handleSelectProductFromGallery(sneaker.name)}
                      className="bg-black hover:bg-brand-blue text-white p-3 rounded-none transition-colors duration-300"
                      aria-label="Comprar en WhatsApp"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POR QUÉ ELEGIRNOS */}
      <section id="elegirnos" className="py-20 md:py-28 px-6 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15)_0%,transparent_70%)]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xs uppercase tracking-widest font-black text-brand-blue">Confianza Verificada</h2>
              <p className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none">
                Hechas para durar, diseñadas para destacar.
              </p>
              <p className="text-gray-400 font-light leading-relaxed">
                Nos distanciamos de las alternativas baratas de mercado. Importamos calzado que cumple rigurosamente con cada patrón, material original y amortiguación de alta tecnología.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-6 md:gap-8">
              {[
                { label: "Clientes Satisfechos", value: 1000, suffix: "+" },
                { label: "Índice Satisfacción", value: 98, suffix: "%" },
                { label: "Entregas Inmediatas", value: 100, suffix: "%" },
                { label: "Piel Genuina & Costuras", value: 100, suffix: "%" }
              ].map((stat, i) => (
                <div key={i} className="bg-neutral-900 border border-neutral-800 p-8 text-center flex flex-col justify-center">
                  <span className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                    <AnimatedCounter value={stat.value} />{stat.suffix}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. TESTIMONIOS */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs uppercase tracking-widest font-black text-brand-blue">Comunidad StreetLab</h2>
            <p className="text-3xl md:text-5xl font-black uppercase tracking-tight">Opiniones de Nuestros Clientes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="border border-gray-100 p-8 flex flex-col justify-between relative bg-white">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-brand-gray text-sm font-light leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-50">
                  <img 
                    src={t.avatar} 
                    alt={t.name} 
                    className="w-10 h-10 rounded-full object-cover filter grayscale"
                  />
                  <div>
                    <h4 className="font-bold text-sm">{t.name}</h4>
                    <p className="text-[10px] text-brand-gray uppercase tracking-wider">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FORMULARIO DE COMPRA */}
      <section id="pedido-section" className="py-20 md:py-28 px-6 bg-gray-50 relative">
        <div className="max-w-3xl mx-auto bg-white border border-gray-100 p-8 md:p-12">
          
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-xs uppercase tracking-widest font-black text-brand-blue">Orden de Pedido Ágil</h2>
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight">Confirma Tu Selección</h3>
            <p className="text-xs text-brand-gray font-light">Completa los datos y serás redirigido a WhatsApp para coordinar el pago y envío de inmediato.</p>
          </div>

          <form onSubmit={handleOrderSubmit} className="space-y-6">
            
            {/* Campo Modelo */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-brand-gray">Modelo Seleccionado</label>
              <select 
                value={selectedProduct} 
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full bg-white border border-gray-200 px-4 py-4 focus:border-brand-blue focus:outline-none transition-colors duration-200 appearance-none text-sm"
                required
              >
                <option value="">Selecciona el modelo...</option>
                {SNEAKERS_DATA.map((s) => (
                  <option key={s.id} value={s.name}>{s.name} - {s.price} COP (Envío Gratis)</option>
                ))}
              </select>
            </div>

            {/* Campo Talla */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-brand-gray">Talla en Calzado (EUR / Nacional)</label>
              <select 
                value={selectedSize} 
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full bg-white border border-gray-200 px-4 py-4 focus:border-brand-blue focus:outline-none transition-colors duration-200 text-sm"
                required
              >
                <option value="">Selecciona tu talla...</option>
                {["36", "37", "38", "39", "40", "41", "42", "43"].map((talla) => (
                  <option key={talla} value={talla}>{talla}</option>
                ))}
              </select>
            </div>

            {/* Campo Nombre */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-brand-gray">Nombre Completo</label>
              <input 
                type="text" 
                placeholder="Ej. Juan Pérez"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-white border border-gray-200 px-4 py-4 focus:border-brand-blue focus:outline-none transition-colors duration-200 text-sm"
                required
              />
            </div>

            {/* Campo Celular */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-brand-gray">Número de Celular</label>
              <input 
                type="tel" 
                placeholder="Ej. 300 123 4567"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-white border border-gray-200 px-4 py-4 focus:border-brand-blue focus:outline-none transition-colors duration-200 text-sm"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-black hover:bg-brand-blue text-white text-center py-5 text-sm font-bold uppercase tracking-widest transition-colors duration-300 mt-4 flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5" /> Confirmar pedido por WhatsApp
            </button>

          </form>
        </div>
      </section>

      {/* 7. FAQ (Preguntas Frecuentes) */}
      <section id="faq" className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs uppercase tracking-widest font-black text-brand-blue">Respuestas Clave</h2>
            <p className="text-3xl md:text-4xl font-black uppercase tracking-tight">Preguntas Frecuentes</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-gray-100 pb-4">
                <button
                  className="w-full flex items-center justify-between py-4 text-left font-bold uppercase text-sm tracking-wide focus:outline-none hover:text-brand-blue transition-colors duration-200"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeFaq === i ? "rotate-180 text-brand-blue" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-brand-gray leading-relaxed font-light pb-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-black text-white pt-16 pb-8 px-6 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-4">
            <span className="text-lg font-black tracking-widest uppercase">STREET<span className="text-brand-blue">LAB</span></span>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Curaduría de siluetas icónicas y colecciones premium. Envíos garantizados en toda Colombia.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-blue font-semibold">Políticas</h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li><a href="#elegirnos" className="hover:text-white transition-colors">Garantía de Satisfacción</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Políticas de Cambios</a></li>
              <li><a href="#beneficios" className="hover:text-white transition-colors">Tiempos de Envío</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-blue font-semibold">Contacto</h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li>Soporte: Bogotá, Colombia</li>
              <li>Lunes a Sábado: 8:00 AM - 8:00 PM</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-blue font-semibold">Comunidad</h4>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-900 hover:bg-brand-blue hover:text-white text-neutral-400 transition-all" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-900 hover:bg-brand-blue hover:text-white text-neutral-400 transition-all" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center text-[10px] text-neutral-500 gap-4">
          <p>© 2026 StreetLab Premium S.A.S. Todos los derechos reservados.</p>
          <p>Desarrollo optimizado y ultra-rápido para Azure Cloud.</p>
        </div>
      </footer>

      {/* BOTÓN FLOTANTE WHATSAPP */}
      <a 
        href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Hola StreetLab, estoy navegando en la web y quiero ver el catálogo disponible por favor.")}`}
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label="Escríbenos en WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
      </a>

    </div>
  );
}
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { ChevronLeft, ChevronRight, ArrowRight, Clock, Sparkles, TrendingUp, Shield, Truck } from 'lucide-react';
import { HERO_SLIDES, products, formatPrice } from '../data/products';
import ProductCard from '../components/ProductCard';

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 600);
  };

  const next = () => goTo((current + 1) % HERO_SLIDES.length);
  const prev = () => goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current]);

  const slide = HERO_SLIDES[current];

  return (
    <div className="relative overflow-hidden" style={{ height: 'min(80vh, 680px)', background: '#1a1218' }}>
      {/* Background Image */}
      <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: animating ? 0.7 : 1 }}>
        <img src={slide.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%)' }} />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-xl" style={{ transform: animating ? 'translateY(12px)' : 'none', opacity: animating ? 0 : 1, transition: 'all 0.6s ease' }}>
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={16} style={{ color: '#e8a4b8' }} />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#e8a4b8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Colección Primavera 2026
              </span>
            </div>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              {slide.title}
            </h1>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', lineHeight: 1.6 }}>
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/catalogo')}
                className="px-7 py-3.5 rounded-full text-white transition-all duration-200 hover:scale-105 hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #e8a4b8, #c47c9c)', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>
                {slide.cta}
              </button>
              <button
                onClick={() => navigate('/catalogo?descuento=true')}
                className="px-7 py-3.5 rounded-full border-2 transition-all duration-200 hover:bg-white hover:text-gray-900"
                style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '0.9rem', backdropFilter: 'blur(8px)' }}>
                {slide.ctaSecondary}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className="rounded-full transition-all duration-300"
            style={{ width: i === current ? 28 : 8, height: 8, background: i === current ? '#e8a4b8' : 'rgba(255,255,255,0.4)' }} />
        ))}
      </div>
    </div>
  );
}

function CountdownTimer() {
  const [time, setTime] = useState({ h: 5, m: 23, s: 47 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="flex items-center gap-2">
      {[pad(time.h), pad(time.m), pad(time.s)].map((val, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="px-3 py-2 rounded-xl"
              style={{ background: '#3D2B24', color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.5rem', minWidth: 52, textAlign: 'center' }}>
              {val}
            </span>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', color: '#9B8B7E', marginTop: '0.25rem' }}>
              {['HRS', 'MIN', 'SEG'][i]}
            </span>
          </div>
          {i < 2 && <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#c47c9c', marginBottom: '1rem' }}>:</span>}
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 4);
  const offerProducts = products.filter(p => p.discount >= 22).slice(0, 4);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div style={{ background: '#fdfbf9' }}>
      {/* Hero */}
      <HeroSlider />

      {/* Benefits strip */}
      <div style={{ background: '#3D2B24' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: 'Envío gratis', sub: 'En pedidos +$150.000' },
              { icon: Shield, label: 'Compra segura', sub: 'Pago 100% protegido' },
              { icon: TrendingUp, label: 'Devoluciones', sub: '30 días sin preguntas' },
              { icon: Sparkles, label: 'Asesoría beauty', sub: 'Expertos disponibles' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 py-2">
                <Icon size={20} style={{ color: '#e8a4b8', flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>{label}</p>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#9B8B7E' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#c47c9c', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Categorías</p>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.75rem', color: '#3D2B24' }}>Explora por mundo</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Maquillaje', emoji: '💄', bg: '#fde8f0', count: '128 productos' },
            { name: 'Skincare', emoji: '✨', bg: '#e8f4f0', count: '84 productos' },
            { name: 'Cabello', emoji: '💆', bg: '#f0ebe8', count: '56 productos' },
            { name: 'Accesorios', emoji: '👜', bg: '#f0f0f8', count: '42 productos' },
          ].map(cat => (
            <button
              key={cat.name}
              onClick={() => navigate(`/catalogo?categoria=${cat.name}`)}
              className="p-6 rounded-3xl text-left transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{ background: cat.bg }}
            >
              <div className="text-4xl mb-3">{cat.emoji}</div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#3D2B24', marginBottom: '0.25rem' }}>{cat.name}</h3>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem', color: '#9B8B7E' }}>{cat.count}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ background: '#fff' }} className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#c47c9c', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Lo mejor de la semana
              </p>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.75rem', color: '#3D2B24' }}>Productos destacados</h2>
            </div>
            <button onClick={() => navigate('/catalogo')} className="flex items-center gap-2 transition-colors hover:text-pink-500"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 500, color: '#9B8B7E' }}>
              Ver todos <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section style={{ background: '#fdf8fa' }} className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
            <div>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#c47c9c', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Tiempo limitado
              </p>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.75rem', color: '#3D2B24' }}>Ofertas de hoy</h2>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={20} style={{ color: '#c47c9c' }} />
              <CountdownTimer />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section style={{ background: '#fff' }} className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#c47c9c', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Recién llegados
              </p>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.75rem', color: '#3D2B24' }}>Novedades</h2>
            </div>
            <button onClick={() => navigate('/catalogo?nuevo=true')} className="flex items-center gap-2 transition-colors hover:text-pink-500"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 500, color: '#9B8B7E' }}>
              Ver todos <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #3D2B24, #6B3A4A)', minHeight: 240 }}>
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #e8a4b8 0%, transparent 60%)' }} />
          <div className="relative px-8 py-14 md:py-16 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#e8a4b8', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Oferta especial
              </p>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
                Obtén 15% de descuento<br />en tu primera compra
              </h2>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
                Usa el código <strong style={{ color: '#e8a4b8' }}>BLOOM15</strong> al finalizar tu compra
              </p>
              <button onClick={() => navigate('/catalogo')} className="px-7 py-3 rounded-full text-white transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.9rem', backdropFilter: 'blur(8px)' }}>
                Comenzar a comprar
              </button>
            </div>
            <div className="text-center">
              <div className="rounded-full flex items-center justify-center"
                style={{ width: 160, height: 160, background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.15)' }}>
                <div className="text-center">
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '3rem', color: '#e8a4b8', lineHeight: 1 }}>15%</p>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>DESCUENTO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

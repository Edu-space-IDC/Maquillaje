import { Instagram, Facebook, Youtube, Twitter, Send } from 'lucide-react';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer style={{ background: '#2D1F1A', color: '#D4B8B0', fontFamily: 'Poppins, sans-serif' }}>
      {/* Newsletter */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 style={{ color: '#fff', fontWeight: 600, fontSize: '1.3rem', marginBottom: '0.5rem' }}>Únete a nuestra comunidad beauty</h3>
            <p style={{ fontSize: '0.875rem', color: '#9B8B7E' }}>Recibe tips de belleza, novedades y ofertas exclusivas</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 md:w-72 px-5 py-3 rounded-2xl outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: '0.875rem' }}
            />
            <button className="flex items-center gap-2 px-5 py-3 rounded-2xl text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #e8a4b8, #c47c9c)', fontWeight: 500, fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
              <Send size={16} />
              Suscribirse
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #e8a4b8, #c47c9c)', borderRadius: '50%' }} />
              <span style={{ fontWeight: 700, fontSize: '1.3rem', color: '#fff', letterSpacing: '-0.02em' }}>
                Bloom<span style={{ color: '#e8a4b8' }}>elle</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#9B8B7E', maxWidth: 280 }}>
              Tu destino beauty de confianza. Curada para la mujer moderna que busca calidad y elegancia en cada producto.
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                <button key={i} className="p-2.5 rounded-full transition-all duration-200 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#D4B8B0' }}>
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '1.2rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Categorías
            </h4>
            {['Maquillaje', 'Skincare', 'Cabello', 'Accesorios', 'Novedades', 'Ofertas'].map(item => (
              <Link key={item} to={`/catalogo?categoria=${item}`} className="block py-1.5 transition-colors hover:text-pink-300" style={{ fontSize: '0.875rem', color: '#9B8B7E' }}>
                {item}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '1.2rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Información
            </h4>
            {['Sobre nosotros', 'Blog de belleza', 'Trabaja con nosotros', 'Programa de puntos', 'Programa de afiliados'].map(item => (
              <button key={item} className="block py-1.5 transition-colors hover:text-pink-300 text-left" style={{ fontSize: '0.875rem', color: '#9B8B7E' }}>
                {item}
              </button>
            ))}
          </div>

          <div>
            <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '1.2rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Ayuda
            </h4>
            {['Centro de ayuda', 'Rastrear pedido', 'Devoluciones', 'Política de privacidad', 'Términos y condiciones'].map(item => (
              <button key={item} className="block py-1.5 transition-colors hover:text-pink-300 text-left" style={{ fontSize: '0.875rem', color: '#9B8B7E' }}>
                {item}
              </button>
            ))}
            <div className="mt-5">
              <p style={{ fontSize: '0.8rem', color: '#9B8B7E', marginBottom: '0.5rem' }}>Contáctanos</p>
              <p style={{ fontSize: '0.85rem', color: '#D4B8B0' }}>hola@bloomelle.co</p>
              <p style={{ fontSize: '0.85rem', color: '#D4B8B0' }}>+57 300 123 4567</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ fontSize: '0.8rem', color: '#6B5A54' }}>
            © 2026 Bloomelle. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {['Visa', 'Mastercard', 'PayPal', 'PSE', 'Nequi', 'Efecty'].map(method => (
              <span key={method} className="px-3 py-1.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.06)', fontSize: '0.75rem', color: '#9B8B7E', border: '1px solid rgba(255,255,255,0.08)' }}>
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

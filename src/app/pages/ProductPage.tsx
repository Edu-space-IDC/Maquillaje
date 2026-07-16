import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Star, Heart, ShoppingCart, ShoppingBag, ChevronLeft, ChevronRight, Plus, Minus, Package, Truck, Shield, RotateCcw, ChevronDown } from 'lucide-react';
import { products, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size} fill={i <= Math.round(rating) ? '#F5A623' : 'none'}
          style={{ color: i <= Math.round(rating) ? '#F5A623' : '#D4C5BE' }} />
      ))}
    </div>
  );
}

const MOCK_REVIEWS = [
  { id: 1, name: 'María García', rating: 5, date: 'hace 2 días', text: '¡Me encantó! La calidad es increíble y el resultado en mi piel es exactamente lo que buscaba. Lo recomiendo totalmente.', verified: true },
  { id: 2, name: 'Valentina López', rating: 4, date: 'hace 1 semana', text: 'Muy buen producto. El tono se adapta perfecto a mi piel y dura todo el día sin retoques. Solo le quito una estrella porque el empaque podría mejorar.', verified: true },
  { id: 3, name: 'Daniela Martínez', rating: 5, date: 'hace 2 semanas', text: 'Excelente! Segunda vez que lo compro. Se nota la diferencia en mi piel desde la primera semana de uso.', verified: true },
];

const FAQS = [
  { q: '¿Cuánto tarda el envío?', a: 'Los envíos a ciudades principales tardan 1-3 días hábiles. A municipios, 3-5 días hábiles.' },
  { q: '¿Puedo hacer devoluciones?', a: 'Sí, aceptamos devoluciones dentro de los 30 días siguientes a la compra si el producto no ha sido abierto.' },
  { q: '¿Es apto para pieles sensibles?', a: 'Este producto ha sido dermatológicamente testado. Para pieles muy sensibles, recomendamos hacer una prueba en un área pequeña.' },
  { q: '¿Tienen programa de puntos?', a: 'Sí, por cada compra acumulas puntos que puedes canjear en futuras órdenes. Regístrate para comenzar.' },
];

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const { addItem, wishlist, toggleWishlist } = useCart();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'descripcion' | 'ingredientes' | 'uso'>('descripcion');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', color: '#9B8B7E' }}>Producto no encontrado</p>
        <button onClick={() => navigate('/catalogo')} className="px-5 py-2 rounded-full text-white"
          style={{ background: '#c47c9c', fontFamily: 'Poppins, sans-serif' }}>
          Ver catálogo
        </button>
      </div>
    );
  }

  const inWishlist = wishlist.includes(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div style={{ background: '#fdfbf9', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#9B8B7E' }}>
          <Link to="/" className="hover:text-pink-400 transition-colors">Inicio</Link>
          <span>/</span>
          <Link to={`/catalogo?categoria=${product.category}`} className="hover:text-pink-400 transition-colors">{product.category}</Link>
          <span>/</span>
          <Link to={`/catalogo?categoria=${product.category}&subcategoria=${product.subcategory}`} className="hover:text-pink-400 transition-colors">{product.subcategory}</Link>
          <span>/</span>
          <span style={{ color: '#3D2B24', fontWeight: 500 }}>{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div className="lg:sticky top-24">
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden mb-4"
              style={{ background: '#faf7f4', aspectRatio: '1 / 1' }}>
              <img
                src={images[currentImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discount > 0 && (
                  <span className="px-3 py-1.5 rounded-full text-white"
                    style={{ background: '#c47c9c', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.8rem' }}>
                    -{product.discount}%
                  </span>
                )}
                {product.isNew && (
                  <span className="px-3 py-1.5 rounded-full text-white"
                    style={{ background: '#7DB5A0', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.8rem' }}>
                    Nuevo
                  </span>
                )}
              </div>
              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button onClick={() => setCurrentImage((currentImage - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)' }}>
                    <ChevronLeft size={18} style={{ color: '#3D2B24' }} />
                  </button>
                  <button onClick={() => setCurrentImage((currentImage + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)' }}>
                    <ChevronRight size={18} style={{ color: '#3D2B24' }} />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setCurrentImage(i)}
                    className="rounded-2xl overflow-hidden transition-all"
                    style={{ width: 80, height: 80, border: `2px solid ${i === currentImage ? '#c47c9c' : 'transparent'}`, opacity: i === currentImage ? 1 : 0.6 }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#c47c9c', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              {product.brand}
            </p>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#3D2B24', marginBottom: '1rem', lineHeight: 1.2 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={product.rating} />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: '#3D2B24' }}>{product.rating}</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#9B8B7E' }}>({product.reviews} reseñas)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl" style={{ background: '#fdf8fa' }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#3D2B24' }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', color: '#B8A09A', textDecoration: 'line-through' }}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.discount > 0 && (
                <span className="px-2.5 py-1 rounded-full text-white"
                  style={{ background: '#c47c9c', fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', fontWeight: 700 }}>
                  Ahorras {formatPrice(product.originalPrice - product.price)}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <div className="rounded-full" style={{ width: 8, height: 8, background: product.stock > 0 ? '#7DB5A0' : '#E8A45A' }} />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: product.stock > 10 ? '#7DB5A0' : '#E8A45A', fontWeight: 500 }}>
                {product.stock > 10 ? 'En stock' : product.stock > 0 ? `¡Solo ${product.stock} disponibles!` : 'Agotado'}
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 500, color: '#3D2B24' }}>Cantidad:</span>
              <div className="flex items-center rounded-2xl border" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-pink-50 transition-colors rounded-l-2xl">
                  <Minus size={16} style={{ color: '#3D2B24' }} />
                </button>
                <span className="px-5" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#3D2B24' }}>{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-3 hover:bg-pink-50 transition-colors rounded-r-2xl">
                  <Plus size={16} style={{ color: '#3D2B24' }} />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => addItem(product, quantity)}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-white transition-all hover:opacity-90 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #e8a4b8, #c47c9c)', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>
                <ShoppingCart size={18} />
                Agregar al carrito
              </button>
              <button
                onClick={() => { addItem(product, quantity); }}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl transition-all hover:opacity-90 hover:shadow-md"
                style={{ background: '#3D2B24', color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>
                <ShoppingBag size={18} />
                Comprar ahora
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-4 rounded-2xl border transition-all hover:bg-pink-50"
                style={{ borderColor: inWishlist ? '#c47c9c' : 'rgba(0,0,0,0.1)', background: inWishlist ? '#fde8f0' : 'transparent', color: inWishlist ? '#c47c9c' : '#9B8B7E' }}>
                <Heart size={20} fill={inWishlist ? '#c47c9c' : 'none'} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: Truck, label: 'Envío gratis', sub: 'En compras +$150.000' },
                { icon: RotateCcw, label: 'Devolución', sub: '30 días garantizados' },
                { icon: Shield, label: 'Compra segura', sub: 'Encriptada y protegida' },
                { icon: Package, label: 'Producto 100% original', sub: 'Garantía de autenticidad' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: '#faf7f4' }}>
                  <div className="rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ width: 36, height: 36, background: '#fde8f0' }}>
                    <Icon size={16} style={{ color: '#c47c9c' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem', fontWeight: 600, color: '#3D2B24' }}>{label}</p>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem', color: '#9B8B7E' }}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="rounded-3xl overflow-hidden border" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
              <div className="flex border-b" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
                {(['descripcion', 'ingredientes', 'uso'] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className="flex-1 py-3 text-center transition-colors capitalize"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.82rem',
                      fontWeight: activeTab === tab ? 600 : 400,
                      color: activeTab === tab ? '#c47c9c' : '#9B8B7E',
                      background: activeTab === tab ? '#fdf8fa' : '#fff',
                      borderBottom: activeTab === tab ? '2px solid #c47c9c' : '2px solid transparent',
                    }}>
                    {tab === 'descripcion' ? 'Descripción' : tab === 'ingredientes' ? 'Ingredientes' : 'Modo de uso'}
                  </button>
                ))}
              </div>
              <div className="p-5">
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: '#5a4a44', lineHeight: 1.8 }}>
                  {activeTab === 'descripcion' ? product.description : activeTab === 'ingredientes' ? product.ingredients : product.howToUse}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div style={{ background: '#fff' }} className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#3D2B24' }}>Reseñas de clientes</h2>
              <div className="flex items-center gap-3 mt-2">
                <StarRating rating={product.rating} size={18} />
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#3D2B24' }}>{product.rating} de 5</span>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: '#9B8B7E' }}>({product.reviews} reseñas)</span>
              </div>
            </div>
            <button className="px-5 py-2.5 rounded-xl border transition-all hover:border-pink-300"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: '#3D2B24', borderColor: 'rgba(0,0,0,0.12)' }}>
              Escribir reseña
            </button>
          </div>
          <div className="grid gap-4 max-w-3xl">
            {MOCK_REVIEWS.map(review => (
              <div key={review.id} className="p-5 rounded-2xl" style={{ background: '#faf7f4' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full flex items-center justify-center text-white"
                      style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #e8a4b8, #c47c9c)', fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
                      {review.name[0]}
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: '#3D2B24' }}>{review.name}</p>
                      <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} size={12} />
                        {review.verified && (
                          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem', color: '#7DB5A0', fontWeight: 500 }}>✓ Compra verificada</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem', color: '#9B8B7E' }}>{review.date}</span>
                </div>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: '#5a4a44', lineHeight: 1.7 }}>{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: '#fdf8fa' }} className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#3D2B24', marginBottom: '2rem' }}>
            Preguntas frecuentes
          </h2>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)' }}>
                <button className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: '#3D2B24' }}>{faq.q}</span>
                  <ChevronDown size={18} style={{ color: '#c47c9c', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: '#5a4a44', lineHeight: 1.7 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div style={{ background: '#fff' }} className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.5rem', color: '#3D2B24', marginBottom: '2rem' }}>
              Productos relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

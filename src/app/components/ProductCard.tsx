import { useState } from 'react';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { Link } from 'react-router';
import type { Product } from '../data/products';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem, wishlist, toggleWishlist } = useCart();
  const [hovered, setHovered] = useState(false);
  const inWishlist = wishlist.includes(product.id);

  return (
    <div
      className="group relative rounded-3xl overflow-hidden transition-all duration-300"
      style={{
        background: '#fff',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.12)' : '0 4px 20px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.discount > 0 && (
          <span className="px-2.5 py-1 rounded-full text-white"
            style={{ background: '#c47c9c', fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem', fontWeight: 700 }}>
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="px-2.5 py-1 rounded-full text-white"
            style={{ background: '#7DB5A0', fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem', fontWeight: 700 }}>
            Nuevo
          </span>
        )}
        {product.isBestSeller && (
          <span className="px-2.5 py-1 rounded-full text-white"
            style={{ background: '#E8A45A', fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem', fontWeight: 700 }}>
            + Vendido
          </span>
        )}
      </div>

      {/* Wishlist button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200"
        style={{
          background: inWishlist ? '#fde8f0' : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          color: inWishlist ? '#c47c9c' : '#9B8B7E',
        }}
      >
        <Heart size={16} fill={inWishlist ? '#c47c9c' : 'none'} />
      </button>

      {/* Image */}
      <Link to={`/producto/${product.id}`}>
        <div className="relative overflow-hidden" style={{ height: 220, background: '#faf7f4' }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)' }}
          />
          {/* Quick actions overlay */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 gap-2 transition-all duration-300"
            style={{ opacity: hovered ? 1 : 0, background: 'linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 60%)' }}>
            <Link
              to={`/producto/${product.id}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-white transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)', fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 500 }}
            >
              <Eye size={14} />
              Ver detalles
            </Link>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', fontWeight: 600, color: '#c47c9c', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
          {product.brand}
        </p>
        <Link to={`/producto/${product.id}`}>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', fontWeight: 600, color: '#3D2B24', marginBottom: '0.5rem', lineHeight: 1.3 }}
            className="hover:text-pink-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} size={12} fill={i <= Math.round(product.rating) ? '#F5A623' : 'none'}
                style={{ color: i <= Math.round(product.rating) ? '#F5A623' : '#D4C5BE' }} />
            ))}
          </div>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#9B8B7E' }}>
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: '#3D2B24' }}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#B8A09A', textDecoration: 'line-through' }}>
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock */}
        {product.stock <= 10 && (
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#E8A45A', fontWeight: 500, marginBottom: '0.75rem' }}>
            ¡Solo {product.stock} disponibles!
          </p>
        )}

        {/* Add to cart button */}
        <button
          onClick={() => addItem(product)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl transition-all duration-200 hover:opacity-90 hover:shadow-md"
          style={{
            background: 'linear-gradient(135deg, #f0c0d0, #c47c9c)',
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '0.82rem',
            fontWeight: 600,
          }}
        >
          <ShoppingCart size={15} />
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function CartSidebar() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 transition-all duration-300"
        style={{
          background: 'rgba(0,0,0,0.4)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          backdropFilter: 'blur(4px)',
        }}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        className="fixed top-0 right-0 h-full z-50 flex flex-col"
        style={{
          width: 'min(420px, 100vw)',
          background: '#fff',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.12)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} style={{ color: '#c47c9c' }} />
            <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1rem', color: '#3D2B24' }}>
              Mi carrito
            </span>
            {totalItems > 0 && (
              <span className="px-2 py-0.5 rounded-full text-white"
                style={{ background: '#c47c9c', fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', fontWeight: 600 }}>
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-2 rounded-full hover:bg-gray-100 transition-colors" style={{ color: '#9B8B7E' }}>
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
              <div className="rounded-full flex items-center justify-center"
                style={{ width: 80, height: 80, background: '#fdf0f4' }}>
                <ShoppingBag size={36} style={{ color: '#e8a4b8' }} />
              </div>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', fontWeight: 500, color: '#3D2B24' }}>Tu carrito está vacío</p>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#9B8B7E', textAlign: 'center' }}>
                Agrega productos para comenzar tu compra
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4 p-3 rounded-2xl" style={{ background: '#faf7f4' }}>
                  <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ width: 72, height: 72 }}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#c47c9c', fontWeight: 500 }}>{product.brand}</p>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#3D2B24' }} className="truncate">{product.name}</p>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#3D2B24', marginTop: '0.25rem' }}>
                      {formatPrice(product.price)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 rounded-full px-2 py-1" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)' }}>
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-0.5 rounded-full hover:bg-pink-50 transition-colors">
                          <Minus size={12} style={{ color: '#3D2B24' }} />
                        </button>
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#3D2B24', minWidth: 20, textAlign: 'center' }}>
                          {quantity}
                        </span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-0.5 rounded-full hover:bg-pink-50 transition-colors">
                          <Plus size={12} style={{ color: '#3D2B24' }} />
                        </button>
                      </div>
                      <button onClick={() => removeItem(product.id)} className="p-1.5 rounded-full hover:bg-red-50 transition-colors" style={{ color: '#c47c9c' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)', background: '#faf7f4' }}>
            <div className="flex justify-between items-center mb-4">
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: '#9B8B7E' }}>Subtotal</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#3D2B24' }}>{formatPrice(totalPrice)}</span>
            </div>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#9B8B7E', marginBottom: '1rem', textAlign: 'center' }}>
              Envío calculado al finalizar la compra
            </p>
            <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg mb-3"
              style={{ background: 'linear-gradient(135deg, #e8a4b8, #c47c9c)', fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', fontWeight: 600 }}>
              Continuar compra
              <ArrowRight size={18} />
            </button>
            <button className="w-full py-3 rounded-2xl border transition-all duration-200 hover:bg-white"
              style={{ borderColor: 'rgba(196,124,156,0.3)', color: '#c47c9c', fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 500 }}>
              Ver carrito completo
            </button>
          </div>
        )}
      </div>
    </>
  );
}

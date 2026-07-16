import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';

const NAV_ITEMS = [
  { label: 'Inicio', path: '/', hasMenu: false },
  { label: 'Accesorios', path: '/catalogo?categoria=Accesorios', hasMenu: true, key: 'Accesorios' },
  { label: 'Cabello', path: '/catalogo?categoria=Cabello', hasMenu: true, key: 'Cabello' },
  { label: 'Skincare', path: '/catalogo?categoria=Skincare', hasMenu: true, key: 'Skincare' },
  { label: 'Maquillaje', path: '/catalogo?categoria=Maquillaje', hasMenu: true, key: 'Maquillaje' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, openCart, wishlist } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogo?buscar=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSubcategoryClick = (categoria: string, subcategoria: string) => {
    navigate(`/catalogo?categoria=${encodeURIComponent(categoria)}&subcategoria=${encodeURIComponent(subcategoria)}`);
    setActiveMenu(null);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(255,255,255,0.92)'
            : 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.08)' : '0 1px 0 rgba(0,0,0,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.3)',
        }}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-18" style={{ height: '72px' }}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #e8a4b8, #c47c9c)', borderRadius: '50%' }} />
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.2rem', color: '#3D2B24', letterSpacing: '-0.02em' }}>
                  Bloom<span style={{ color: '#c47c9c' }}>elle</span>
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <div key={item.label} className="relative" onMouseEnter={() => item.hasMenu ? setActiveMenu(item.key!) : setActiveMenu(null)}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-200"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: activeMenu === item.key ? '#c47c9c' : '#3D2B24',
                      background: activeMenu === item.key ? 'rgba(228,164,184,0.1)' : 'transparent',
                    }}
                  >
                    {item.label}
                    {item.hasMenu && <ChevronDown size={14} style={{ transform: activeMenu === item.key ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />}
                  </Link>
                </div>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-full transition-all duration-200 hover:bg-pink-50 relative"
                style={{ color: '#3D2B24' }}
              >
                <Search size={20} />
              </button>
              <Link to="/catalogo?favoritos=true" className="p-2.5 rounded-full transition-all duration-200 hover:bg-pink-50 relative" style={{ color: '#3D2B24' }}>
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 text-white rounded-full flex items-center justify-center"
                    style={{ width: 16, height: 16, fontSize: '0.6rem', background: '#c47c9c', fontWeight: 700 }}>
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button
                onClick={openCart}
                className="p-2.5 rounded-full transition-all duration-200 hover:bg-pink-50 relative"
                style={{ color: '#3D2B24' }}
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 text-white rounded-full flex items-center justify-center"
                    style={{ width: 16, height: 16, fontSize: '0.6rem', background: '#c47c9c', fontWeight: 700 }}>
                    {totalItems}
                  </span>
                )}
              </button>
              <button className="p-2.5 rounded-full transition-all duration-200 hover:bg-pink-50" style={{ color: '#3D2B24' }}>
                <User size={20} />
              </button>
              <button className="md:hidden p-2.5 rounded-full hover:bg-pink-50" style={{ color: '#3D2B24' }} onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        {activeMenu && categories[activeMenu as keyof typeof categories] && (
          <div
            className="absolute left-0 right-0 bg-white border-t"
            style={{ borderColor: 'rgba(0,0,0,0.06)', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
            onMouseEnter={() => setActiveMenu(activeMenu)}
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="flex gap-12">
                <div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem', fontWeight: 600, color: '#c47c9c', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    {activeMenu}
                  </p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1" style={{ minWidth: 320 }}>
                    {categories[activeMenu as keyof typeof categories].map(sub => (
                      <button
                        key={sub}
                        onClick={() => handleSubcategoryClick(activeMenu, sub)}
                        className="text-left py-2 px-3 rounded-lg transition-all duration-150 hover:bg-pink-50"
                        style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: '#5a4a44', fontWeight: 400 }}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-end">
                  <div className="text-right">
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#9B8B7E', marginBottom: '0.5rem' }}>Oferta especial</p>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.5rem', fontWeight: 600, color: '#3D2B24', lineHeight: 1.2 }}>
                      Hasta 50% OFF<br />en {activeMenu}
                    </p>
                    <button
                      onClick={() => { navigate(`/catalogo?categoria=${activeMenu}`); setActiveMenu(null); }}
                      className="mt-4 px-5 py-2 rounded-full text-white transition-all duration-200 hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #e8a4b8, #c47c9c)', fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', fontWeight: 500 }}
                    >
                      Ver todo {activeMenu}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t bg-white px-6 py-4" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex items-center gap-3 px-5 py-3 rounded-full border"
                style={{ borderColor: 'rgba(196,124,156,0.3)', background: '#fdf8fa' }}>
                <Search size={18} style={{ color: '#c47c9c' }} />
                <input
                  autoFocus
                  type="text"
                  placeholder="Buscar maquillaje, skincare, accesorios..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none"
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', color: '#3D2B24' }}
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} style={{ color: '#9B8B7E' }}>
                    <X size={16} />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            {NAV_ITEMS.map(item => (
              <Link
                key={item.label}
                to={item.path}
                className="block py-3 border-b"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', color: '#3D2B24', borderColor: 'rgba(0,0,0,0.06)' }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div style={{ height: 72 }} />
    </>
  );
}

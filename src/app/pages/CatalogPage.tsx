import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp, LayoutGrid, List } from 'lucide-react';
import { products, categories, formatPrice } from '../data/products';
import ProductCard from '../components/ProductCard';

const SORT_OPTIONS = [
  { value: 'destacados', label: 'Destacados' },
  { value: 'mas-vendidos', label: 'Más vendidos' },
  { value: 'recientes', label: 'Más recientes' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
  { value: 'mejor-calificados', label: 'Mejor calificados' },
  { value: 'en-descuento', label: 'En descuento' },
];

const BRANDS = ['Lumière Beauty', 'Glam Studio', 'Rouge Paris', 'Pura Glow'];
const SKIN_TYPES = ['Normal', 'Seca', 'Grasa', 'Mixta', 'Sensible'];
const COLORS = ['#F5C5D0', '#D4A5B5', '#E8C9A0', '#B5D4C9', '#A5B5D4', '#D4C9A5'];

interface FilterState {
  categories: string[];
  subcategories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  skinTypes: string[];
  inOffer: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  inStock: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b py-4" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
      <button className="flex items-center justify-between w-full mb-3" onClick={() => setOpen(!open)}>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#3D2B24' }}>{title}</span>
        {open ? <ChevronUp size={16} style={{ color: '#9B8B7E' }} /> : <ChevronDown size={16} style={{ color: '#9B8B7E' }} />}
      </button>
      {open && children}
    </div>
  );
}

function FilterSidebar({ filters, onChange, onReset }: { filters: FilterState; onChange: (f: FilterState) => void; onReset: () => void }) {
  const toggle = <K extends keyof FilterState>(key: K, value: string) => {
    const arr = filters[key] as string[];
    onChange({ ...filters, [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] });
  };

  const CheckItem = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
    <label className="flex items-center gap-2 cursor-pointer py-1 group">
      <div className="rounded flex items-center justify-center transition-all"
        style={{ width: 18, height: 18, border: `2px solid ${checked ? '#c47c9c' : 'rgba(0,0,0,0.15)'}`, background: checked ? '#c47c9c' : 'transparent' }}
        onClick={onChange}>
        {checked && <X size={10} style={{ color: '#fff' }} />}
      </div>
      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#5a4a44' }} onClick={onChange}>{label}</span>
    </label>
  );

  return (
    <div className="sticky top-24 rounded-3xl p-5" style={{ background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#3D2B24' }}>Filtros</h3>
        <button onClick={onReset} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem', color: '#c47c9c', fontWeight: 500 }}>
          Limpiar todo
        </button>
      </div>

      <FilterSection title="Categorías">
        {Object.keys(categories).map(cat => (
          <CheckItem key={cat} label={cat} checked={filters.categories.includes(cat)} onChange={() => toggle('categories', cat)} />
        ))}
      </FilterSection>

      {filters.categories.length > 0 && (
        <FilterSection title="Subcategorías">
          {filters.categories.flatMap(cat => categories[cat as keyof typeof categories] || []).map(sub => (
            <CheckItem key={sub} label={sub} checked={filters.subcategories.includes(sub)} onChange={() => toggle('subcategories', sub)} />
          ))}
        </FilterSection>
      )}

      <FilterSection title="Marcas">
        {BRANDS.map(brand => (
          <CheckItem key={brand} label={brand} checked={filters.brands.includes(brand)} onChange={() => toggle('brands', brand)} />
        ))}
      </FilterSection>

      <FilterSection title="Precio">
        <div className="flex items-center gap-2 mb-2">
          <input type="number" value={filters.minPrice} onChange={e => onChange({ ...filters, minPrice: Number(e.target.value) })}
            className="w-full px-3 py-2 rounded-xl border outline-none"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', borderColor: 'rgba(0,0,0,0.12)' }}
            placeholder="Mín" />
          <span style={{ color: '#9B8B7E' }}>—</span>
          <input type="number" value={filters.maxPrice} onChange={e => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full px-3 py-2 rounded-xl border outline-none"
            style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', borderColor: 'rgba(0,0,0,0.12)' }}
            placeholder="Máx" />
        </div>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#9B8B7E' }}>
          {formatPrice(filters.minPrice)} — {formatPrice(filters.maxPrice || 500000)}
        </p>
      </FilterSection>

      <FilterSection title="Color">
        <div className="flex flex-wrap gap-2">
          {COLORS.map(color => (
            <button key={color} className="rounded-full border-2 transition-all hover:scale-110"
              style={{ width: 28, height: 28, background: color, borderColor: 'transparent' }} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Tipo de piel">
        {SKIN_TYPES.map(type => (
          <CheckItem key={type} label={type} checked={filters.skinTypes.includes(type)} onChange={() => toggle('skinTypes', type)} />
        ))}
      </FilterSection>

      <FilterSection title="Disponibilidad" defaultOpen={false}>
        <CheckItem label="En stock" checked={filters.inStock} onChange={() => onChange({ ...filters, inStock: !filters.inStock })} />
        <CheckItem label="En oferta" checked={filters.inOffer} onChange={() => onChange({ ...filters, inOffer: !filters.inOffer })} />
        <CheckItem label="Productos nuevos" checked={filters.isNew} onChange={() => onChange({ ...filters, isNew: !filters.isNew })} />
        <CheckItem label="Más vendidos" checked={filters.isBestSeller} onChange={() => onChange({ ...filters, isBestSeller: !filters.isBestSeller })} />
      </FilterSection>
    </div>
  );
}

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('buscar') || '');
  const [sort, setSort] = useState('destacados');
  const [gridView, setGridView] = useState(true);
  const [showFilters, setShowFilters] = useState(true);

  const defaultFilters: FilterState = {
    categories: searchParams.get('categoria') ? [searchParams.get('categoria')!] : [],
    subcategories: searchParams.get('subcategoria') ? [searchParams.get('subcategoria')!] : [],
    brands: [],
    minPrice: 0,
    maxPrice: 0,
    skinTypes: [],
    inOffer: searchParams.get('descuento') === 'true',
    isNew: searchParams.get('nuevo') === 'true',
    isBestSeller: false,
    inStock: false,
  };

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const resetFilters = () => setFilters(defaultFilters);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q));
    }
    if (filters.categories.length) result = result.filter(p => filters.categories.includes(p.category));
    if (filters.subcategories.length) result = result.filter(p => filters.subcategories.includes(p.subcategory));
    if (filters.brands.length) result = result.filter(p => filters.brands.includes(p.brand));
    if (filters.minPrice > 0) result = result.filter(p => p.price >= filters.minPrice);
    if (filters.maxPrice > 0) result = result.filter(p => p.price <= filters.maxPrice);
    if (filters.inOffer) result = result.filter(p => p.discount > 0);
    if (filters.isNew) result = result.filter(p => p.isNew);
    if (filters.isBestSeller) result = result.filter(p => p.isBestSeller);
    if (filters.inStock) result = result.filter(p => p.stock > 0);

    switch (sort) {
      case 'precio-asc': result.sort((a, b) => a.price - b.price); break;
      case 'precio-desc': result.sort((a, b) => b.price - a.price); break;
      case 'mejor-calificados': result.sort((a, b) => b.rating - a.rating); break;
      case 'mas-vendidos': result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)); break;
      case 'en-descuento': result.sort((a, b) => b.discount - a.discount); break;
    }

    return result;
  }, [search, filters, sort]);

  const activeFilterCount = filters.categories.length + filters.subcategories.length + filters.brands.length
    + filters.skinTypes.length + (filters.inOffer ? 1 : 0) + (filters.isNew ? 1 : 0) + (filters.isBestSeller ? 1 : 0);

  return (
    <div style={{ background: '#fdfbf9', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)' }} className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#9B8B7E' }}>
              <a href="/">Inicio</a>
              <span>/</span>
              <span style={{ color: '#3D2B24', fontWeight: 500 }}>
                {filters.categories.length === 1 ? filters.categories[0] : 'Catálogo'}
              </span>
            </div>

            {/* Search bar */}
            <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border max-w-3xl"
              style={{ borderColor: 'rgba(196,124,156,0.25)', background: '#fdf8fa' }}>
              <Search size={20} style={{ color: '#c47c9c', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Buscar maquillaje, skincare, accesorios..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none"
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', color: '#3D2B24' }}
              />
              {search && (
                <button onClick={() => setSearch('')} style={{ color: '#9B8B7E' }}>
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Controls row */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border transition-all hover:border-pink-300"
                  style={{ borderColor: 'rgba(0,0,0,0.1)', fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#3D2B24', background: showFilters ? '#fde8f0' : '#fff' }}>
                  <SlidersHorizontal size={16} style={{ color: '#c47c9c' }} />
                  Filtros
                  {activeFilterCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-white"
                      style={{ background: '#c47c9c', fontSize: '0.65rem', fontWeight: 700 }}>
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#9B8B7E' }}>
                  {filtered.length} productos
                </span>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="px-4 py-2 rounded-xl border outline-none cursor-pointer"
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#3D2B24', borderColor: 'rgba(0,0,0,0.1)', background: '#fff' }}>
                  {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <div className="flex border rounded-xl overflow-hidden" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                  <button onClick={() => setGridView(true)} className="p-2 transition-colors"
                    style={{ background: gridView ? '#fde8f0' : '#fff', color: gridView ? '#c47c9c' : '#9B8B7E' }}>
                    <LayoutGrid size={16} />
                  </button>
                  <button onClick={() => setGridView(false)} className="p-2 transition-colors"
                    style={{ background: !gridView ? '#fde8f0' : '#fff', color: !gridView ? '#c47c9c' : '#9B8B7E' }}>
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Filter sidebar */}
          {showFilters && (
            <div className="hidden md:block flex-shrink-0" style={{ width: 260 }}>
              <FilterSidebar filters={filters} onChange={setFilters} onReset={resetFilters} />
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="text-6xl">🔍</div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.1rem', color: '#3D2B24' }}>
                  Sin resultados
                </h3>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: '#9B8B7E', textAlign: 'center' }}>
                  Intenta con otros filtros o términos de búsqueda
                </p>
                <button onClick={resetFilters} className="px-5 py-2 rounded-full text-white transition-hover"
                  style={{ background: 'linear-gradient(135deg, #e8a4b8, #c47c9c)', fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', fontWeight: 500 }}>
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className={gridView
                ? `grid gap-5 ${showFilters ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`
                : 'flex flex-col gap-4'}>
                {filtered.map(p => (
                  gridView ? (
                    <ProductCard key={p.id} product={p} />
                  ) : (
                    <div key={p.id} className="flex gap-5 p-4 rounded-2xl bg-white" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                      <div className="rounded-2xl overflow-hidden flex-shrink-0" style={{ width: 120, height: 120 }}>
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#c47c9c', fontWeight: 600, marginBottom: '0.25rem' }}>{p.brand}</p>
                        <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.95rem', color: '#3D2B24', marginBottom: '0.5rem' }}>{p.name}</h3>
                        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#9B8B7E', marginBottom: '0.75rem' }}>{p.subcategory}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#3D2B24' }}>{formatPrice(p.price)}</span>
                            {p.originalPrice > p.price && <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.8rem', color: '#B8A09A', textDecoration: 'line-through', marginLeft: '0.5rem' }}>{formatPrice(p.originalPrice)}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

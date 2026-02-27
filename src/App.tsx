import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Menu, X, ChevronDown, Instagram, 
  Facebook, Twitter, ArrowRight, Plus 
} from 'lucide-react';
import { CATEGORIES, FEATURED_PRODUCTS } from './constants';
import CoastersPage from './pages/CoastersPage';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');

  const getCategoryImage = (id: string) => {
    switch (id) {
      case 'coasters': return '/brerw.jpg';
      case 'magnets': return '/magnet.jpg';
      case 'trivets': return '/Trivets.webp';
      default: return '';
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (currentPage === 'coasters') {
    return (
      <CoastersPage 
        onBack={() => setCurrentPage('home')} 
        cartCount={cartCount} 
        setCartCount={setCartCount} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6]">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-3 shadow-sm border-b border-stone-100' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-8 text-[#2D2D2D]">
            <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}><Menu size={24} /></button>
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
              <div className="group relative cursor-pointer flex items-center gap-1">
                Shop <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                <div className="absolute top-full left-0 pt-4 hidden group-hover:block">
                  <div className="bg-white shadow-xl rounded-lg p-4 w-48 border border-stone-100">
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat.id} 
                        onClick={() => { if(cat.id === 'coasters') setCurrentPage('coasters'); }}
                        className="block w-full text-left py-2 hover:text-[#C66B44] transition-colors uppercase text-[10px]"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <a href="#story" className="hover:text-[#C66B44] transition-colors">Our Story</a>
            </div>
          </div>
          <button onClick={() => setCurrentPage('home')} className="text-2xl md:text-3xl font-serif tracking-tighter font-medium text-[#2D2D2D]">Honor Art</button>
          <div className="flex items-center gap-6 text-[#2D2D2D]">
            <button className="relative p-2 hover:bg-black/5 rounded-full transition-colors text-[#2D2D2D]">
              <ShoppingBag size={22} />
              {cartCount > 0 && <span className="absolute top-0 right-0 bg-[#C66B44] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/hero-bg.jpg" alt="Hero" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 text-center px-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif mb-8 max-w-4xl mx-auto leading-[1.1] drop-shadow-lg">The Art of Gifting</h1>
            <button onClick={() => setCurrentPage('coasters')} className="bg-white text-[#2D2D2D] px-10 py-4 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-[#FAF9F6] transition-colors flex items-center gap-2 mx-auto group shadow-xl">
              Explore The Gallery <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* Curated Collections */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-12 text-[#2D2D2D]">Curated Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES.map((cat) => (
              <motion.div 
                key={cat.id} 
                onClick={() => { if (cat.id === 'coasters') setCurrentPage('coasters'); }}
                className="group cursor-pointer" 
                whileHover={{ y: -10 }}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6 relative shadow-sm border border-stone-100">
                  <img src={getCategoryImage(cat.id)} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="text-2xl font-serif text-[#2D2D2D] mb-2">{cat.name}</h3>
                <p className="text-sm text-stone-500 mb-4 line-clamp-2">{cat.description}</p>
                <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-[#C66B44] transition-all">Explore <ArrowRight size={14} /></span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Best Sellers (Eski Featured Pieces) */}
        <section className="bg-white py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 text-[#2D2D2D]">
              <span className="text-xs uppercase tracking-[0.2em] opacity-50 mb-2 block font-medium">Our Favorites</span>
              <h2 className="text-4xl md:text-5xl font-serif">Best Sellers</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {FEATURED_PRODUCTS.map((product) => (
                <div key={product.id} className="group">
                  <div className="aspect-square bg-[#FAF9F6] rounded-2xl overflow-hidden mb-4 relative border border-stone-100">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <button 
                      onClick={() => setCartCount(prev => prev + 1)}
                      className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-[#C66B44] hover:text-white"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="flex justify-between items-start text-[#2D2D2D]">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest opacity-40 mb-1 block">{product.category}</span>
                      <h4 className="text-lg font-serif leading-tight">{product.name}</h4>
                    </div>
                    <span className="text-lg font-serif font-bold text-[#C66B44]">${product.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section id="story" className="py-32 px-6 max-w-5xl mx-auto text-center text-[#2D2D2D]">
          <h2 className="text-4xl md:text-6xl font-serif mb-8 italic opacity-80 leading-tight">
            "Art is not what you see, but what you make others see."
          </h2>
          <p className="text-lg md:text-xl font-light leading-relaxed mb-12 opacity-70">
            Honor Art was born from a passion for blending functional home utility with timeless artistic expression. Every piece in our collection is thoughtfully curated and handcrafted.
          </p>
        </section>
      </main>

      {/* Footer Bölümü */}
      <footer className="bg-[#2D2D2D] text-[#FAF9F6] pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 border-b border-white/10 pb-20">
          <div className="max-w-xs">
            <h2 className="text-3xl font-serif mb-6">Honor Art</h2>
            <p className="opacity-50 font-light text-sm">Join our community for exclusive previews of new collections and artistic inspiration.</p>
          </div>
          <div className="flex gap-20">
            <div>
              <h4 className="uppercase text-xs tracking-widest font-bold mb-6">Shop</h4>
              <ul className="flex flex-col gap-4 opacity-50 text-sm font-light">
                <li><button onClick={() => setCurrentPage('coasters')} className="hover:text-white">Coasters</button></li>
                <li><span className="cursor-not-allowed opacity-30">Magnets</span></li>
                <li><span className="cursor-not-allowed opacity-30">Trivets</span></li>
              </ul>
            </div>
            <div>
              <h4 className="uppercase text-xs tracking-widest font-bold mb-6">Connect</h4>
              <div className="flex gap-4 opacity-50">
                <Instagram size={18} className="hover:text-white cursor-pointer" />
                <Facebook size={18} className="hover:text-white cursor-pointer" />
                <Twitter size={18} className="hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 text-center text-[10px] uppercase tracking-widest opacity-30">
          © 2026 Honor Art. Handcrafted with Care.
        </div>
      </footer>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  Instagram, 
  Facebook, 
  Twitter,
  ArrowRight,
  Plus
} from 'lucide-react';
import { CATEGORIES, FEATURED_PRODUCTS } from './constants';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Görselleri kategori ID'lerine göre eşleştiren yardımcı fonksiyon
  const getCategoryImage = (id) => {
    switch (id) {
      case 'coasters': return '/brerw.jpg'; // public içindeki brerw.jpg
      case 'magnets': return '/magnet.jpg'; // public içindeki magnet.jpg
      case 'trivets': return '/Trivets.webp'; // public içindeki Trivets.webp
      default: return '';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation (Sticky & Glass Effect) */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-3 shadow-sm border-b border-stone-100' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              className="lg:hidden text-brand-charcoal"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
              <div className="group relative cursor-pointer flex items-center gap-1">
                Shop <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
                <div className="absolute top-full left-0 pt-4 hidden group-hover:block">
                  <div className="bg-white shadow-xl rounded-lg p-4 w-48 border border-brand-charcoal/5">
                    {CATEGORIES.map(cat => (
                      <a key={cat.id} href={`#${cat.id}`} className="block py-2 hover:text-brand-terracotta transition-colors">
                        {cat.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <a href="#story" className="hover:text-brand-terracotta transition-colors">Our Story</a>
            </div>
          </div>

          <a href="/" className="text-2xl md:text-3xl font-serif tracking-tighter font-medium">
            Honor Art
          </a>

          <div className="flex items-center gap-6">
            <button className="relative p-2 hover:bg-brand-charcoal/5 rounded-full transition-colors">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-brand-terracotta text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-[60] bg-brand-offwhite p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-serif">Honor Art</span>
              <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
            </div>
            <div className="flex flex-col gap-8 text-2xl font-serif">
              <a href="#" onClick={() => setIsMenuOpen(false)}>Shop All</a>
              {CATEGORIES.map(cat => (
                <a key={cat.id} href={`#${cat.id}`} onClick={() => setIsMenuOpen(false)} className="pl-4 text-xl opacity-70">
                  {cat.name}
                </a>
              ))}
              <a href="#story" onClick={() => setIsMenuOpen(false)}>Our Story</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-charcoal">
          <div className="absolute inset-0 z-0">
            <img 
              src="/hero-bg.jpg" 
              alt="Artistic Display of Souvenirs" 
              className="w-full h-full object-cover opacity-60 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />
          </div>
          <div className="relative z-10 text-center px-6">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="block text-white uppercase tracking-[0.3em] text-xs mb-4 font-medium"
            >
              Curated Artisan Pieces
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl text-white font-serif mb-8 max-w-4xl mx-auto leading-[1.1]"
            >
              The Art of <br /> Gifting
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button className="bg-white text-brand-charcoal px-10 py-4 rounded-full text-sm font-medium uppercase tracking-widest hover:bg-brand-cream transition-colors flex items-center gap-2 mx-auto group">
                Explore The Gallery <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Curated Collections - UPDATED WITH YOUR IMAGES */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl mb-4">Curated Collections</h2>
              <p className="text-brand-charcoal/70 leading-relaxed">
                Discover our range of handcrafted accessories designed to bring a touch of artistic sophistication to your home.
              </p>
            </div>
            <a href="#" className="text-sm font-medium uppercase tracking-widest border-b border-brand-charcoal pb-1 hover:text-brand-terracotta transition-all">
              View All
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES.map((cat, idx) => (
              <motion.div 
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6 relative shadow-sm">
                  <img 
                    src={getCategoryImage(cat.id)} // İstediğiniz görselleri burada ID ile eşleştiriyoruz
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                </div>
                <h3 className="text-2xl mb-2">{cat.name}</h3>
                <p className="text-sm text-brand-charcoal/60 mb-4 line-clamp-2">{cat.description}</p>
                <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-brand-terracotta transition-colors">
                  Explore <ArrowRight size={14} />
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-brand-cream py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.2em] opacity-50 mb-2 block">Our Favorites</span>
              <h2 className="text-4xl md:text-5xl">Featured Pieces</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {FEATURED_PRODUCTS.map((product, idx) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="aspect-square bg-white rounded-2xl overflow-hidden mb-4 relative shadow-sm group-hover:shadow-md transition-shadow">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <button 
                      onClick={() => setCartCount(prev => prev + 1)}
                      className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all hover:bg-brand-terracotta hover:text-white"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest opacity-40 mb-1 block">{product.category}</span>
                      <h4 className="text-lg font-medium leading-tight group-hover:text-brand-terracotta transition-colors">{product.name}</h4>
                    </div>
                    <span className="text-lg font-serif">${product.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section id="story" className="py-32 px-6 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-8 italic">"Art is not what you see, but what you make others see."</h2>
            <p className="text-lg md:text-xl text-brand-charcoal/70 leading-relaxed mb-12">
              Honor Art was born from a passion for blending functional home utility with timeless artistic expression. Every piece in our collection is thoughtfully curated and handcrafted to ensure that your home isn't just a place to live, but a gallery of your life.
            </p>
          </motion.div>
        </section>
      </main>

      <footer className="bg-brand-charcoal text-brand-offwhite pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-serif mb-6">Honor Art</h2>
              <p className="text-brand-offwhite/60 max-w-sm mb-8 mx-auto md:mx-0">
                Join our community for exclusive previews of new collections and artistic inspiration for your home.
              </p>
            </div>
            <div>
              <h4 className="uppercase text-xs tracking-widest font-bold mb-6">Shop</h4>
              <ul className="flex flex-col gap-4 text-brand-offwhite/60 text-sm">
                <li><a href="#" className="hover:text-brand-offwhite">All Products</a></li>
                <li><a href="#" className="hover:text-brand-offwhite">Coasters</a></li>
                <li><a href="#" className="hover:text-brand-offwhite">Magnets</a></li>
                <li><a href="#" className="hover:text-brand-offwhite">Trivets</a></li>
              </ul>
            </div>
            <div>
              <h4 className="uppercase text-xs tracking-widest font-bold mb-6">Connect</h4>
              <div className="flex justify-center md:justify-start gap-4">
                <Instagram size={18} className="cursor-pointer hover:text-brand-terracotta" />
                <Facebook size={18} className="cursor-pointer hover:text-brand-terracotta" />
                <Twitter size={18} className="cursor-pointer hover:text-brand-terracotta" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Menu, X, ChevronDown, ArrowRight, 
  Plus, Trash2, CreditCard 
} from 'lucide-react';
import { CATEGORIES, FEATURED_PRODUCTS } from './constants';
import CoastersPage from './pages/CoastersPage';
// CartContext dosyasından sağlayıcı ve hook'u çekiyoruz
import { CartProvider, useCart } from './context/CartContext';

// İçerik bileşeni: Context'i kullanabilmek için Provider'ın içinde olmalı
function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Merkezi sepet fonksiyonlarını çekiyoruz
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    totalItems, 
    totalPrice, 
    clearCart 
  } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Sayfa yönlendirme kontrolü
  if (currentPage === 'coasters') {
    return (
      <CoastersPage 
        onBack={() => setCurrentPage('home')} 
        cartCount={totalItems} 
        onAddToCart={addToCart} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-['Inter']">
      
      {/* SEPET ÇEKMECESİ (DRAWER) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setIsCartOpen(false)} 
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col p-6"
            >
              <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h2 className="text-2xl font-serif">Your Cart ({totalItems})</h2>
                <button onClick={() => setIsCartOpen(false)}><X size={24} /></button>
              </div>

              <div className="flex-grow overflow-y-auto space-y-6">
                {cart.length === 0 ? (
                  <p className="text-center py-20 opacity-50 font-light">Your cart is empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center border-b border-stone-50 pb-4">
                      <img src={item.image || item.img} className="w-20 h-20 object-cover rounded-lg" alt={item.name} />
                      <div className="flex-grow">
                        <h4 className="font-medium text-sm uppercase tracking-tight">{item.name}</h4>
                        <p className="text-sm text-[#C66B44] font-bold">${item.price}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 border rounded-full flex items-center justify-center">-</button>
                          <span className="text-xs">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 border rounded-full flex items-center justify-center">+</button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t pt-6 bg-white">
                  <div className="flex justify-between text-xl font-serif mb-6">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => setIsCheckoutOpen(true)} 
                    className="w-full py-4 bg-[#2D2D2D] text-white rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest font-bold hover:bg-black transition-all"
                  >
                    <CreditCard size={18}/> Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ÖDEME MODALI (CHECKOUT) */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsCheckoutOpen(false)} />
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-3xl p-8 max-w-lg w-full relative z-10 shadow-2xl text-[#2D2D2D]">
              <h2 className="text-3xl font-serif mb-6 text-center italic">Secure Checkout</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Cardholder Name" className="w-full p-4 border border-stone-200 rounded-xl outline-none focus:ring-2 ring-[#C66B44]" />
                <input type="text" placeholder="Card Number" className="w-full p-4 border border-stone-200 rounded-xl outline-none focus:ring-2 ring-[#C66B44]" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/YY" className="p-4 border border-stone-200 rounded-xl" />
                  <input type="text" placeholder="CVC" className="p-4 border border-stone-200 rounded-xl" />
                </div>
                <button 
                  onClick={() => { 
                    alert("Success! Your art pieces are on their way."); 
                    clearCart(); 
                    setIsCheckoutOpen(false); 
                    setIsCartOpen(false); 
                  }} 
                  className="w-full py-4 bg-[#C66B44] text-white rounded-xl font-bold mt-6 uppercase tracking-widest text-sm"
                >
                  Pay ${totalPrice.toFixed(2)}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all ${isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-[#2D2D2D]">
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
            <button onClick={() => setCurrentPage('coasters')} className="hover:text-[#C66B44] transition-colors">Shop</button>
            <a href="#story" className="hover:text-[#C66B44] transition-colors">Story</a>
          </div>
          <button onClick={() => setCurrentPage('home')} className="text-3xl font-serif italic tracking-tighter">Honor Art</button>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2">
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-[#C66B44] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src="/hero-bg.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
        <div className="relative text-center">
          <h1 className="text-6xl md:text-8xl text-white font-serif mb-8 drop-shadow-lg leading-tight">The Art of <br/> Gifting</h1>
          <button onClick={() => setCurrentPage('coasters')} className="bg-white text-[#2D2D2D] px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#FAF9F6] transition-all shadow-xl text-xs">Explore Gallery</button>
        </div>
      </header>

      {/* COLLECTIONS & BEST SELLERS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif mb-12">Curated Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map(cat => (
            <div key={cat.id} onClick={() => cat.id === 'coasters' && setCurrentPage('coasters')} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-4 relative shadow-sm border border-stone-50">
                <img src={cat.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt={cat.name} />
              </div>
              <h3 className="text-2xl font-serif mb-1">{cat.name}</h3>
              <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-[#C66B44]">Explore <ArrowRight size={14}/></span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest opacity-50 block mb-2">Our Favorites</span>
          <h2 className="text-4xl font-serif mb-16">Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {FEATURED_PRODUCTS.map(product => (
              <div key={product.id} className="group">
                <div className="aspect-square bg-[#FAF9F6] rounded-2xl overflow-hidden mb-4 relative shadow-sm border border-stone-50">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={product.name} />
                  <button 
                    onClick={() => addToCart(product)} 
                    className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 hover:bg-[#C66B44] hover:text-white transition-all shadow-xl active:scale-90"
                  >
                    <Plus size={20}/>
                  </button>
                </div>
                <div className="flex justify-between items-start font-serif uppercase tracking-tight text-sm">
                  <h4>{product.name}</h4>
                  <span className="text-[#C66B44] font-bold">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Ana App bileşeni: Sağlayıcıyı en dışa koyuyoruz
export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
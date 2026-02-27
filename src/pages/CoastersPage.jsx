import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowLeft, Plus, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';

const COASTER_PRODUCTS = [
  { id: 'c1', name: "Midnight London", price: 5, desc: "Modern and minimalist black matte finish.", image: "/coasters1.webp" },
  { id: 'c2', name: "Artisan Brew", price: 5, desc: "Warm and natural tones for your coffee.", image: "/coasters2.jpg" },
  { id: 'c3', name: "Starlight Slate", price: 5, desc: "Polished natural stone texture.", image: "/coasters3.jpg" },
  { id: 'c4', name: "Cloud Marble", price: 5, desc: "Fresh and airy ceramic touch.", image: "/coasters4.webp" }
];

export default function CoastersPage({ onBack, cartCount, onAddToCart, onOpenCart }) {
  const [addedId, setAddedId] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleAdd = (e, product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D2D2D]">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setSelectedImg(null)} 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
          >
            <button className="absolute top-10 right-10 text-white"><X size={40} /></button>
            <motion.img 
              initial={{ scale: 0.8 }} 
              animate={{ scale: 1 }} 
              src={selectedImg} 
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-[#C66B44] transition-all">
            <ArrowLeft size={16}/> Back
          </button>
          <span className="font-serif text-2xl tracking-tighter italic">Honor Art</span>
          <button onClick={onOpenCart} className="relative p-2">
            <ShoppingBag size={24}/>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#C66B44] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
        <h1 className="text-5xl font-serif mb-4">Premium Coasters</h1>
        <p className="text-stone-500 max-w-xl mx-auto font-light mb-20">Artisan handcrafted coasters that protect your surfaces with style.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
          {COASTER_PRODUCTS.map(product => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group">
              <div onClick={() => setSelectedImg(product.image)} className="aspect-square bg-white rounded-2xl overflow-hidden mb-6 relative shadow-sm border border-stone-50 cursor-zoom-in">
                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={product.name} />
                <button 
                  onClick={(e) => handleAdd(e, product)} 
                  className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-[#2D2D2D] hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
                >
                  {addedId === product.id ? <CheckCircle size={20} className="text-green-500" /> : <Plus size={20} />}
                </button>
              </div>
              <div className="flex justify-between items-start font-serif">
                <h3 className="text-xl">{product.name}</h3>
                <span className="text-[#C66B44] font-bold">$5</span>
              </div>
              <p className="text-sm text-stone-400 mt-1 mb-6 italic h-10">{product.desc}</p>
              <button onClick={onOpenCart} className="w-full py-4 bg-[#2D2D2D] text-white rounded-xl text-[10px] uppercase font-bold tracking-widest hover:bg-black transition-all">
                View in Cart
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
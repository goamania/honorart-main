import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowLeft, Plus, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';

// Product data linked to files in the 'public' folder
const COASTER_PRODUCTS = [
  { id: 1, name: "Midnight London", desc: "Modern and minimalist black matte finish.", img: "/coasters1.webp" },
  { id: 2, name: "Artisan Brew", desc: "Warm and natural tones for your coffee.", img: "/coasters2.jpg" },
  { id: 3, name: "Starlight Slate", desc: "Polished natural stone texture and elegance.", img: "/coasters3.jpg" },
  { id: 4, name: "Cloud Marble", desc: "Fresh and airy ceramic touch.", img: "/coasters4.webp" }
];

export default function CoastersPage({ onBack, cartCount, setCartCount }) {
  const [addedId, setAddedId] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null); // State for the enlarged image

  const handleAddToCart = (e, id) => {
    e.stopPropagation(); // Prevents the image from enlarging when clicking the add button
    setCartCount(prev => prev + 1);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D2D2D]">
      {/* Lightbox Modal - Appears when an image is selected */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)} // Closes when clicking the background
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
          >
            <motion.button 
              className="absolute top-10 right-10 text-white hover:rotate-90 transition-transform"
              onClick={() => setSelectedImg(null)}
            >
              <X size={40} />
            </motion.button>
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImg} 
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              alt="Enlarged View"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={onBack} className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold hover:text-[#C66B44] transition-colors">
            <ArrowLeft size={16} /> Back to Gallery
          </button>
          <span className="font-serif text-2xl font-medium tracking-tighter italic">Honor Art</span>
          <div className="relative cursor-pointer">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#C66B44] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
        <div className="mb-20">
          <h1 className="text-5xl font-serif mb-4">Premium Coasters</h1>
          <p className="text-stone-500 max-w-xl mx-auto font-light leading-relaxed">
            Every sip is an experience. Protect your surfaces with our handcrafted coasters designed like pieces of art.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
          {COASTER_PRODUCTS.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              {/* Selecting the image opens the modal */}
              <div 
                onClick={() => setSelectedImg(product.img)}
                className="aspect-square bg-white rounded-2xl overflow-hidden mb-6 relative shadow-sm border border-stone-100 cursor-zoom-in"
              >
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                
                <button 
                  onClick={(e) => handleAddToCart(e, product.id)}
                  className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-[#2D2D2D] hover:text-white transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10"
                >
                  {addedId === product.id ? <CheckCircle size={20} className="text-green-500" /> : <Plus size={20} />}
                </button>
              </div>
              <div className="flex justify-between items-start mb-2 font-serif">
                <h3 className="text-xl">{product.name}</h3>
                <span className="text-lg text-[#C66B44] font-bold font-serif">$5</span>
              </div>
              <p className="text-sm text-stone-400 font-light mb-6 h-10 italic">{product.desc}</p>
              <button 
                onClick={() => alert("Redirecting to checkout...")} 
                className="w-full py-4 bg-[#2D2D2D] text-white rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-all"
              >
                Buy Now
              </button>
            </motion.div>
          ))}
        </div>
      </main>
      
      <footer className="py-12 border-t border-stone-200 text-center text-[10px] uppercase tracking-widest text-stone-400 font-medium">
        Handcrafted with Care &bull; © 2026 Honor Art
      </footer>
    </div>
  );
}
"use client";
import { client } from "./lib/sanity.client";
import { useState, useEffect } from "react";
import { GiCherry } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, TargetAndTransition } from "framer-motion";

const MENU_QUERY = `*[_type == "product"]{
  _id,
  name,
  price,
  note,
  category->{
    name
  },
  extras[]->{
    _id,
    name,
    price
  }
}`;

export default function MenuPageClient() {
  const [products, setProducts] = useState<any[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    client.fetch(MENU_QUERY).then(setProducts);
  }, []);

  const categoriesMap: { [key: string]: any[] } = {};
  products.forEach((prod) => {
    const catName = prod.category?.name || "Sin categoría";
    if (!categoriesMap[catName]) categoriesMap[catName] = [];
    categoriesMap[catName].push(prod);
  });

  const navItems = Object.keys(categoriesMap);

  const scrollVariants: { [key: string]: TargetAndTransition } = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.2, duration: 1.5 } }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-95 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-5 px-6 md:px-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.42, 0, 0.58, 1] } }}
            className="flex items-center gap-2 text-3xl font-extrabold select-none"
          >
            <span className="text-[#d8a47f]">Café</span>
            <GiCherry className="text-red-500 w-8 h-8" />
            <span className="text-[#ef4444]">Cereza</span>
          </motion.h1>

          <button
            className="md:hidden text-gray-300 hover:text-red-500 transition-colors duration-300"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>

          <nav className="hidden md:flex space-x-6 uppercase text-sm md:text-base font-semibold tracking-widest text-gray-300">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="hover:text-[#ef4444] transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-black bg-opacity-95 text-white">
            <ul className="flex flex-col space-y-4 py-4 px-6">
              {navItems.map((item) => (
                <li key={item} className="border-b border-gray-800 pb-2">
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setMenuOpen(false)}
                    className="block hover:text-[#ef4444] transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="pt-28 p-6 max-w-6xl mx-auto">
        {Object.entries(categoriesMap).map(([catName, catProducts]) => (
          <section key={catName} className="mb-12 relative">
            <motion.h2
              id={catName.toLowerCase().replace(/\s+/g, '-')}
              className="text-3xl font-bold mb-4 text-[#ef4444]"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={scrollVariants}
            >
              {catName}
            </motion.h2>

            <ul className="space-y-6">
              {catProducts.map((prod) => (
                <motion.li
                  key={prod._id}
                  className="flex flex-col gap-4 border-b border-gray-800 pb-4"
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={scrollVariants}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{prod.name}</h3>
                    <p className="text-white text-lg font-bold underline">${prod.price}</p>
                  </div>

                  {prod.extras?.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-1">
                      {prod.extras.map((ex: any) => (
                        <span
                          key={ex._id}
                          className="bg-green-600 text-black text-sm px-2 py-1 rounded-full"
                        >
                          +${ex.price} {ex.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {prod.note && (
                    <p className="text-gray-400 text-sm mt-1">{prod.note}</p>
                  )}
                </motion.li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}

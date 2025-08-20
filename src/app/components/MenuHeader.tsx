"use client";
import { GiCherry } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

interface MenuHeaderProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  navItems: string[];
}

export default function MenuHeader({ menuOpen, setMenuOpen, navItems }: MenuHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-95 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-5 px-6 md:px-12">        
        <motion.a
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.42, 0, 0.58, 1] } }}
          className="flex items-center gap-2 text-3xl font-extrabold select-none"
        >
          <span className="text-[#d8a47f]">Café</span>
          <GiCherry className="text-red-500 w-8 h-8" />
          <span className="text-[#ef4444]">Cereza</span>
        </motion.a>

        {/* Botón menú móvil */}
        <motion.a
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.42, 0, 0.58, 1] } }}
        >
          <button
            className="md:hidden text-gray-300 hover:text-red-500 transition-colors duration-300"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </motion.a>

        {/* Navbar desktop con animación para cada link */}
        <nav className="hidden md:flex space-x-6 uppercase text-sm md:text-base font-semibold tracking-widest text-gray-300">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 * i, duration: 0.6 } }}
              className="hover:text-[#ef4444] transition-colors duration-300"
            >
              {item}
            </motion.a>
          ))}
        </nav>
      </div>

      {/* Navbar móvil */}
      {menuOpen && (
        <motion.div
          className="md:hidden bg-black bg-opacity-95 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        >
          <ul className="flex flex-col space-y-4 py-4 px-6">
            {navItems.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.1 * i, duration: 0.4 } }}
                className="border-b border-gray-800 pb-2"
              >
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-[#ef4444] transition-colors duration-300"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}

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
  );
}

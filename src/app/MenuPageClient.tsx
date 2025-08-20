"use client";
import { useState } from "react";
import MenuHeader from "./components/MenuHeader";
import MenuSection from "./components/MenuSection";
import { GiCherry } from "react-icons/gi";

interface Product {
  _id: string;
  name: string;
  price: number;
  note?: string;
  extras?: { _id: string; name: string; price: number }[];
  category?: {
    name: string;
  }
}

interface MenuPageClientProps {
  initialProducts: Product[];
}

export default function MenuPageClient({ initialProducts }: MenuPageClientProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [menuOpen, setMenuOpen] = useState(false);

  const categoriesMap: { [key: string]: Product[] } = {};
  products.forEach((prod) => {
    const catName = prod.category?.name || "Sin categoría";
    if (!categoriesMap[catName]) categoriesMap[catName] = [];
    categoriesMap[catName].push(prod);
  });

  const navItems = Object.keys(categoriesMap);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <MenuHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} navItems={navItems} />
      <main className="pt-28 p-6 max-w-6xl mx-auto">
        {Object.entries(categoriesMap).map(([catName, catProducts]) => (
          <MenuSection key={catName} catName={catName} products={catProducts} />
        ))}
      </main>
      <footer className="bg-black bg-opacity-90 text-gray-400 py-8 mt-16 select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 text-lg font-semibold">
            <GiCherry className="text-red-500 w-8 h-8" />
            <span className="text-[#d8a47f]">Café Cereza</span>
          </div>
          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} Café Cereza. Todos los derechos
            reservados.
          </p>
          <nav aria-label="Redes sociales" className="flex gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61578608314658"
              className="hover:text-red-500 transition-colors"
              aria-label="Facebook"
            >
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.876v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-red-500 transition-colors"
              aria-label="Instagram"
            >
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zm8.5 2a3.75 3.75 0 013.75 3.75v8.5a3.75 3.75 0 01-3.75 3.75h-8.5a3.75 3.75 0 01-3.75-3.75v-8.5A3.75 3.75 0 017.75 4h8.5zm-4.25 2.75a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2.5a2 2 0 110 4 2 2 0 010-4zm4.75-.75a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

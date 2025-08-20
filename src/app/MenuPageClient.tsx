"use client";
import { useState } from "react";
import MenuHeader from "./components/MenuHeader";
import MenuSection from "./components/MenuSection";

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
    </div>
  );
}

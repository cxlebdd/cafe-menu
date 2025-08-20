"use client";
import { client } from "./lib/sanity.client";
import { useState, useEffect } from "react";
import MenuHeader from "./components/MenuHeader";
import MenuSection from "./components/MenuSection";

const MENU_QUERY = `*[_type == "product"]{
  _id,
  name,
  price,
  note,
  category->{
    name
  },
  extras[]-> {
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

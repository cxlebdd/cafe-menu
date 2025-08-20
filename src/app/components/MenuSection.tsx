"use client";
import { motion, MotionProps, useScroll, useTransform } from "framer-motion";

interface Extra {
  _id: string;
  name: string;
  price: number;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  note?: string;
  extras?: Extra[];
}

interface MenuSectionProps {
  catName: string;
  catDescription?: string;
  catImage?: string;
  products: Product[];
}

export default function MenuSection({ catName, catDescription, catImage, products }: MenuSectionProps) {
  // Animación para títulos y productos
  const motionProps: MotionProps = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.2, duration: 1.5 } },
    viewport: { once: true, amount: 0.2 },
  };

  return (
    <section className="mb-12 relative">
      {catImage && (
        <motion.img
          src={catImage}
          alt={catName}
          className="w-full h-64 object-cover rounded-md mb-6"
          {...motionProps}
        />
      )}


      <motion.h2
        id={catName.toLowerCase().replace(/\s+/g, "-")}
        className="text-3xl font-bold mb-4 text-[#ef4444]"
        {...motionProps}
      >
        {catName}
      </motion.h2>

      {catDescription && (
        <motion.p className="text-gray-400 mb-6" {...motionProps}>
          {catDescription}
        </motion.p>
      )}

      <ul className="space-y-6">
        {products.map((prod) => (
          <motion.li
            key={prod._id}
            className="flex flex-col gap-4 border-b border-gray-800 pb-4"
            {...motionProps}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">{prod.name}</h3>
              <p className="text-white text-lg font-bold underline">${prod.price}</p>
            </div>

            {prod.extras && prod.extras.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-1">
                {prod.extras.map((ex) => (
                  <span
                    key={ex._id}
                    className="bg-green-600 text-black text-sm px-2 py-1 rounded-full"
                  >
                    +${ex.price} {ex.name}
                  </span>
                ))}
              </div>
            )}

            {prod.note && <p className="text-gray-400 text-sm mt-1">{prod.note}</p>}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

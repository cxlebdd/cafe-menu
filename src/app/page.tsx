// src/app/page.tsx
import { client } from "./lib/sanity.client";
import { MENU_QUERY } from "./lib/queries";

async function getProducts() {
  return client.fetch(MENU_QUERY);
}

export default async function MenuPage() {
  const products: any[] = await getProducts();

  // Agrupar productos por categoría
  const categoriesMap: { [key: string]: any[] } = {};
  products.forEach((prod) => {
    const catName = prod.category?.name || "Sin categoría";
    if (!categoriesMap[catName]) categoriesMap[catName] = [];
    categoriesMap[catName].push(prod);
  });

  return (
    <main className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow">Menú Café</h1>

      {Object.entries(categoriesMap).map(([catName, catProducts]) => (
        <section key={catName} className="mb-8">
          <h2
            id={catName.toLowerCase().replace(/\s+/g, "-")}
            className="text-2xl font-bold mb-4 text-ef4444"
          >
            {catName.toUpperCase()}
          </h2>

          <ul className="space-y-4">
            {catProducts.map((prod) => (
              <li
                key={prod._id}
                className="border-b border-gray-800 pb-2 flex gap-4 items-center"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{`- ${prod.name}`}</h3>
                  <p className="text-d8a47f text-lg">${prod.price}</p>

                  {prod.extras?.length > 0 && (
                    <ul className="ml-4 list-disc text-green-500 text-sm">
                      {/* @ts-ignore */}
                      {prod.extras.map((ex: any) => (
                        <li key={ex._id}>
                          +${ex.price} {ex.name}
                        </li>
                      ))}
                    </ul>
                  )}
                  {prod.note && (
                    <p className="text-gray-400 text-sm mt-1">{prod.note}</p>
                  )}
                </div>

                {prod.image?.asset?._ref && (
                  <img
                    src={`https://cdn.sanity.io/images/6zujr6k4/production/${prod.image.asset._ref}.webp`}
                    alt={prod.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

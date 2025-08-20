import { client } from "../lib/sanity.client";
import { MENU_QUERY } from "../lib/queries";

async function getProducts() {
  return client.fetch(MENU_QUERY);
}

export default async function MenuPage() {
  const products: any[] = await getProducts();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Menú</h1>
      <ul className="space-y-4">
        {products.map((prod) => (
          <li key={prod._id} className="border-b pb-2">
            <p className="font-semibold">{prod.name} — ${prod.price}</p>
            {prod.note && <p className="text-sm text-gray-500">{prod.note}</p>}
            {prod.category?.name && (
              <p className="text-xs text-gray-600">
                Categoría: {prod.category.name}
              </p>
            )}
            {prod.extras?.length > 0 && (
              <ul className="ml-4 list-disc text-sm">
                {prod.extras.map((ex: any) => (
                  <li key={ex._id}>
                    {ex.name} (+${ex.price})
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

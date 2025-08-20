import MenuPageClient from "./MenuPageClient";
import { client } from "./lib/sanity.client";
import { MENU_QUERY } from "./lib/queries";

export default async function MenuPageServer() {
  const products = await client.fetch(MENU_QUERY);

  return <MenuPageClient initialProducts={products} />;
}

import MenuPageClient from "./MenuPageClient";
import { client } from "./lib/sanity.client";

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

export default async function MenuPageServer() {
  const products = await client.fetch(MENU_QUERY);

  return <MenuPageClient initialProducts={products} />;
}

export const MENU_QUERY = `*[_type == "product"]{
  _id,
  name,
  price,
  note,
  category->{
    name,
  },
  extras[]->{
    _id,
    name,
    price
  }
}`;

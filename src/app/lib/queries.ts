export const MENU_QUERY = `*[_type == "product"]{
  _id,
  name,
  price,
  note,
  category->{
    name,
    description
  },
  extras[]->{
    _id,
    name,
    price
  }
}`;

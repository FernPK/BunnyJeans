export type Item = {
  id: string,
  name: string,
  price: number,
  sold: number,
  stock: number,
  reviews: number,
  rating: number,
  image: string[],
  animal: string,
  color: string,
  tags: string[],
}

export type Collections = {
  colName: string,
  image: string,
  route: string,
  desc: string,
}

export type BasketItemType = {
  id: string,
  name: string,
  price: number,
  stock: number,
  image: string,
  color: string,
  amount: number,
}

export type RecentlyViewedType = {
  id: string,
  name: string,
  price: number,
  image: string,
}
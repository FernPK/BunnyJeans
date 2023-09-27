import { BasketItemType, Item, RecentlyViewedType } from './types'

export const AddToBasket = (item: Item) => {
  let found = false
  const basketItem: BasketItemType = {
    id: item.id,
    name: item.name,
    price: item.price,
    stock: item.stock,
    image: item.image[0],
    color: item.color,
    amount: 1,
  }
  const basket = localStorage.getItem('basket')
  if (basket) {
    const basketItems = JSON.parse(basket)
    basketItems.forEach((inBasket: BasketItemType) => {
      if (inBasket.id === basketItem.id) {
        inBasket.amount += 1
        found = true
      }
    })
    if (!found) {
      basketItems.push(basketItem)
    }
    localStorage.setItem('basket', JSON.stringify(basketItems));
  } else {
    localStorage.setItem('basket', JSON.stringify([basketItem]));
  }
  window.location.reload()
}

export const RemoveFromBasket = (id: string) => {
  const basket = localStorage.getItem('basket')
  if (basket) {
    const basketItems = JSON.parse(basket)
    const newBasket = basketItems.filter((item: BasketItemType) => item.id !== id)
    localStorage.setItem('basket', JSON.stringify(newBasket));
  }
  window.location.reload()
}

export const UpdateBasket = (id: string, amount: number) => {
  const basket = localStorage.getItem('basket')
  if (basket) {
    const basketItems = JSON.parse(basket)
    basketItems.forEach((item: BasketItemType) => {
      if (item.id === id) {
        item.amount = amount
      }
    })
    localStorage.setItem('basket', JSON.stringify(basketItems));
  }
  window.location.reload()
}

export const AddToRecentlyViewed = (item: Item) => {
  const recentlyViewed = localStorage.getItem('recentlyViewed')
  const recentlyViewedItem = {
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image[0],
  } as RecentlyViewedType
  if (recentlyViewed) {
    const recentlyViewedItems = JSON.parse(recentlyViewed)
    const newRecentlyViewed = recentlyViewedItems.filter((item: RecentlyViewedType) => item.id !== recentlyViewedItem.id).slice(0, 5)
    newRecentlyViewed.unshift(recentlyViewedItem)
    localStorage.setItem('recentlyViewed', JSON.stringify(newRecentlyViewed));
  } else {
    localStorage.setItem('recentlyViewed', JSON.stringify([recentlyViewedItem]));
  }
  // console.log('recentlyViewedItem', recentlyViewedItem)
}

export const AddToWishlist = (item: Item) => {
  const wishlist = localStorage.getItem('wishlist')
  const wishlistItem = {
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image[0],
  } as RecentlyViewedType
  if (wishlist) {
    const wishlistItems = JSON.parse(wishlist)
    if (wishlistItems.some((item: RecentlyViewedType) => item.id === wishlistItem.id)) {
      return
    }
    wishlistItems.push(wishlistItem)
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  } else {
    localStorage.setItem('wishlist', JSON.stringify([wishlistItem]));
  }
  // console.log('wishlistItem', wishlistItem)
}

export const RemoveFromWishlist = (id: string) => {
  const wishlist = localStorage.getItem('wishlist')
  if (wishlist) {
    const wishlistItems = JSON.parse(wishlist)
    const newWishlist = wishlistItems.filter((item: RecentlyViewedType) => item.id !== id)
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  }
  window.location.reload()
}
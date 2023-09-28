import { useEffect, useState } from 'react'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'
import { BasketItemType } from '../types'

const Navbar = () => {
  const [countBasket, setCountBasket] = useState(0)
  const [countWishlist, setCountWishlist] = useState(0)

  useEffect(() => {
    const basket = localStorage.getItem('basket')
    if (basket && basket !== "[]") {
      const basketObj = JSON.parse(basket)
      setCountBasket(basketObj.reduce((acc: number, item: BasketItemType) => acc + item.amount, 0))
    } else {
      const basketDiv = document.querySelector('.shopping-bag-label') as HTMLDivElement
      basketDiv.style.display = 'none'
    }

    const wishlist = localStorage.getItem('wishlist')
    if (wishlist && wishlist !== "[]") {
      const wishlistObj = JSON.parse(wishlist)
      setCountWishlist(wishlistObj.length)
    } else {
      const wishlistDiv = document.querySelector('.wishlist-heart-label') as HTMLDivElement
      wishlistDiv.style.display = 'none'
    }
  }, [])

  return (
    <div className='top-bar'>
      <nav>
        <div>
          <Link to="/">
            <div className="logo">BunnyJeans</div>
          </Link>
        </div>
        <div className='links'>
          <Link to="/collections">COLLECTIONS</Link>
          <Link to="/collections/new">NEW ✨</Link>
          <Link to="/collections/halloween">HALLOWEEN 🎃</Link>
        </div>
        <div className='menu'>
          <Link to="/search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </Link>
          <Link to="/wishlist">
            <div className='wishlist-heart'>
              <div className='wishlist-heart-label'>{countWishlist}</div>
              <i className="fa-regular fa-heart"></i>
            </div>
          </Link>
          <Link to="/basket">
            <div className='shopping-bag'>
              <div className='shopping-bag-label'>{countBasket}</div>
              <i className="fa-solid fa-bag-shopping"></i>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
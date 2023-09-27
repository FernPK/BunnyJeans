import { useEffect, useState } from 'react'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'
import { CartItemType } from '../types'

const Navbar = () => {
  const [countCart, setCountCart] = useState(0)
  const [countWishlist, setCountWishlist] = useState(0)

  useEffect(() => {
    const cart = localStorage.getItem('cart')
    if (cart && cart !== "[]") {
      const cartObj = JSON.parse(cart)
      setCountCart(cartObj.reduce((acc: number, item: CartItemType) => acc + item.amount, 0))
    } else {
      const cartDiv = document.querySelector('.shopping-bag-label') as HTMLDivElement
      cartDiv.style.display = 'none'
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
          <Link to="/collections/new-in">NEW ✨</Link>
          <Link to="/collections/halloween">HALLOWEEN 🎃</Link>
        </div>
        <div className='menu'>
          <a href="#"><i className="fa-solid fa-magnifying-glass"></i></a>
          <Link to="/wishlist">
            <div className='wishlist-heart'>
              <div className='wishlist-heart-label'>{countWishlist}</div>
              <i className="fa-regular fa-heart"></i>
            </div>
          </Link>
          <Link to="/cart">
            <div className='shopping-bag'>
              <div className='shopping-bag-label'>{countCart}</div>
              <i className="fa-solid fa-bag-shopping"></i>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
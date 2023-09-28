import { useEffect, useState } from "react"
import HeaderSection from "../components/HeaderSection"
import { RecentlyViewedType } from "../types"
import '../styles/Wishlist.css'
import { RemoveFromWishlist } from "../LocalStorageFunction"
import { Link } from "react-router-dom"

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<RecentlyViewedType[]>([])

  useEffect(() => {
    const wishlist = localStorage.getItem('wishlist')
    if (wishlist && wishlist !== "[]") {
      const wishlistObj = JSON.parse(wishlist)
      setWishlist(wishlistObj)
    }
  }, [])

  return (
    <div>
      <HeaderSection route="your wishlist" title="Your Wishlist" desc=""/>
      {
        wishlist.length === 0 &&
        <div className="blank-state">
          <h2>Your wishlist is empty</h2>
        </div>
      }
      <div className="wishlist-card-div">
        {
          wishlist.map((item, index) => {
            return (
              <div className="wishlist-card" key={index}>
                <button className="remove-from-wishlist" onClick={() => RemoveFromWishlist(item.id)}>x</button>
                <Link to={`/products/${item.id}`}>
                <img src={item.image} alt={item.name}/>
                <p className='wishlist-card-name'>{item.name}</p>
                <p className='wishlist-card-price'>${item.price.toFixed(2)}</p>
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Wishlist
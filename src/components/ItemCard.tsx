import '../styles/ItemCard.css'
import { Item } from '../types'
import React from 'react';
import { Link } from 'react-router-dom';
import { AddToBasket, AddToWishlist, RemoveFromWishlist } from '../LocalStorageFunction';
import toast, { Toaster } from 'react-hot-toast';

const NewItemCard = (props: Item) => {
  const [fav, setFav] = React.useState(false)

  let label = '';
  if(props.stock == 0) {
    label = 'Out of Stock'
  } else if(props.sold >= 100) {
    label = 'Best Seller'
  } else if(props.tags.indexOf('New') > -1) {
    label = 'New ✨'
  }

  const clickAddToBasket = () => {
    AddToBasket(props!)
    toast.success('Added to basket!')
  }

  const toggleHeart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(fav) {
      setFav(false)
      e.currentTarget.children[0].classList.remove('fa-solid')
      e.currentTarget.children[0].classList.add('fa-regular')
      RemoveFromWishlist(props.id)
    } else {
      setFav(true)
      e.currentTarget.children[0].classList.remove('fa-regular')
      e.currentTarget.children[0].classList.add('fa-solid')
      AddToWishlist(props)
    }
  }

  return (
    <div className='item-card'>
      <Toaster />
      <button className='card-fav' onClick={toggleHeart}>
        <i className="fa-regular fa-heart"></i>
      </button>
      <Link to={`/products/${props.id}`}>
        { label && <div className='item-card-label'>{label}</div> }
        <div className='card-img'>
          <img src={props.image[0]} alt={props.name} />
        </div>
      </Link>
        <div className='add-to-basket-div'>
          <button className='add-to-basket' onClick={clickAddToBasket}>Add to basket</button>
        </div>
        <Link to={`/products/${props.id}`}>
        <div className='card-info'>
          <p className='card-name'>{props.name}</p>
          <p className='card-price'>${props.price.toFixed(2)}</p>
          <div className='rating'>
            <div className='stars'>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <p className='card-reviews'>({props.reviews})</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NewItemCard
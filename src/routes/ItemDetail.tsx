import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Item } from '../types'
import '../styles/ItemDetail.css'

const ItemDetail = () => {
  const param = useParams()
  const itemId = param.productId
  const [item, setItems] = React.useState<Item>()
  const [imageSelected, setImageSelected] = React.useState<string>()
  const [amount, setAmount] = React.useState<number>(1)
  const [fav, setFav] = React.useState(false)

  const toggleHeart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(fav) {
      setFav(false)
      e.currentTarget.children[0].classList.remove('fa-solid')
      e.currentTarget.children[0].classList.add('fa-regular')
    } else {
      setFav(true)
      e.currentTarget.children[0].classList.remove('fa-regular')
      e.currentTarget.children[0].classList.add('fa-solid')
    }
  }

  const selectImage = (image: string) => {
    setImageSelected(image)
  }

  const getData = async () => {
    fetch('/public/data.json',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
      })
        .then(function(response){
          // console.log(response)
          return response.json()
        })
        .then(function(myJson) {
          // console.log(myJson)
          myJson.forEach((item: Item) => {
            if (item.id === itemId) {
              setItems(item)
              setImageSelected(item.image[0])
            }
          })
        })
  }

  useEffect(() => {
    getData()
  }, [param])

  return (
    <div className='item-detail-div'>
      <div className='img-preview'>
        {
          item?.image.map((image, index) => {
            return (
              <img key={index} src={image} alt={item.name} onClick={() => selectImage(image)}/>
            )})
        }
      </div>
      <div className='item-img'>
        <img src={imageSelected} alt={item?.name} />
      </div>
      <div className='item-desc'>
        <div className='flex-row-between'>
          <h1>{item?.name}</h1>
          <button className="fav-button" onClick={toggleHeart}>
            <i className="fa-regular fa-heart"></i>
          </button>
        </div>
        <div className='flex-row-between'>
          <p className='item-price'>${item?.price.toFixed(2)}</p>
          <div className='rating'>
            <div className='stars'>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <p className='card-reviews'>({item?.reviews})</p>
          </div>
        </div>
        <hr />
        <div className="item-option">
          <p>SIZE</p>
          <div className='option'>20 cm x 20 cm</div>
        </div>
        <div className="item-option">
          <p>SHIPPING</p>
          <div className='option'>Standard (Free)</div>
        </div>
        <div className="item-option">
          <p>QUANTITY</p>
          <div className='quantity-div'>
            <button>-</button>
            <input type="text" value={amount} className="quantity"/>
            <button>+</button>
          </div>
        </div>
        <hr />
        <div className='buy-fav'>
          <button>Buy now</button>
          <button className='secondary-button'>Add to basket</button>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail
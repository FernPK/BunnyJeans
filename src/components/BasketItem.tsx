import { BasketItemType } from '../types'
import '../styles/BasketItem.css'
import { RemoveFromBasket, UpdateBasket } from '../LocalStorageFunction'
import React from 'react'
import { Link } from 'react-router-dom'

function BasketItem(props: BasketItemType) {
  const [amount, setAmount] = React.useState<number>(props.amount)

  const increaseAmount = () => {
    updateBasket(amount + 1)
    setAmount((amount) => amount + 1)
  }

  const decreaseAmount = () => {
    updateBasket(amount - 1)
    setAmount((amount) => amount - 1)
  }

  const changeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBasket(Number(e.target.value))
    setAmount(Number(e.target.value))
  }

  const updateBasket = (newAmount: number) => {
    if (newAmount > 0) {
      UpdateBasket(props.id, newAmount)
    }
    else if (newAmount === 0) {
      RemoveFromBasket(props.id)
    }
  }

  return (
    <tr className='basket-item-row'>
      <td className='basket-item-img-desc'>
        <Link to={`/products/${props.id}`} className='basket-item'>
          <img src={props.image} alt={props.name} />
          <div className='basket-item-detail'>
            <em className='item-name'>{props.name}</em>
            <p>Size: 20 cm x 20 cm</p>
          </div>
        </Link>
      </td>
      <td className='basket-item-quantity'>
        <div className='quantity-div'>
          <button onClick={() => decreaseAmount()}>-</button>
          <input type="text" value={amount} className="quantity" onChange={changeAmount}/>
          <button onClick={() => increaseAmount()}>+</button>
        </div>
      </td>
      <td className='text-right text-semibold basket-item-price'>${props.price.toFixed(2)}</td>
      <td className='text-right text-semibold basket-item-total'>${(props.price * props.amount).toFixed(2)}</td>
    </tr>
  )
}

export default BasketItem
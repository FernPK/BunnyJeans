import { BasketItemType } from '../types'
import '../styles/BasketItem.css'
import React from 'react'

function BasketItem(props: BasketItemType) {
  const [amount, setAmount] = React.useState<number>(props.amount)

  const increaseAmount = () => {
    setAmount((amount) => amount + 1)
    // console.log(amount)
  }

  const decreaseAmount = () => {
    setAmount((amount) => amount - 1)
    // console.log(amount)
  }

  const changeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value))
    // console.log(amount)
  }

  return (
    <tr className='basket-item-row'>
      <td>
        <div className='basket-item'>
          <img src={props.image} alt={props.name} />
          <div className='basket-item-detail'>
            <em className='item-name'>{props.name}</em>
            <p>Product Code: {props.id}</p>
            <p>Colour: {props.color}</p>
            <p>Size: One Size 20 x 20 cm</p>
            <div className='item-stock'>
              <i className="fa-solid fa-circle-check"></i>
              <p>In Stock</p>
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className='quantity-div'>
          <button onClick={() => decreaseAmount()}>-</button>
          <input type="text" value={amount} className="quantity" onChange={changeAmount}/>
          <button onClick={() => increaseAmount()}>+</button>
        </div>
      </td>
      <td className='text-right text-semibold'>${props.price.toFixed(2)}</td>
      <td className='text-right text-semibold'>${(props.price * props.amount).toFixed(2)}</td>
    </tr>
  )
}

export default BasketItem
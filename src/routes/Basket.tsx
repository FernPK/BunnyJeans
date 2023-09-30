import React, { useEffect } from 'react'
import '../styles/Basket.css'
import HeaderSection from '../components/HeaderSection'
import BasketItem from '../components/BasketItem'
import { BasketItemType } from '../types'

// type Props = {}

const Basket = () => {
  const [basket, setBasket] = React.useState<BasketItemType[]>([])
  const [total, setTotal] = React.useState<number>(0)

  useEffect(() => {
    const basket = localStorage.getItem('basket')
    if(basket) {
      const parsedBasket = JSON.parse(basket)
      setBasket(parsedBasket)
      setTotal(parsedBasket.reduce((acc: number, item: BasketItemType) => acc + item.price * item.amount, 0))
    }
  }, [])
  return (
    <div className='basket-div'>
      <HeaderSection route='Your basket' title='Your Basket' desc={`You have ${
        basket.reduce((acc, item) => acc + item.amount, 0)
      } item(s) in your basket ( total $${
        basket.reduce((acc, item) => acc + item.price * item.amount, 0).toFixed(2)
      } )`}/>
      {
        basket.length === 0 ? 
          <div className='blank-state'>
            <p>Your basket is empty</p>
          </div> :
        <div className='basket-detail-div'>
          <table>
            <thead>
              <tr>
                <th className='item-detail-col'>Item</th>
                <th>Quantity</th>
                <th className='text-right'>Price</th>
                <th className='text-right'>Total</th>
              </tr>
            </thead>
            <tbody>
              {
                basket.map((basketItem) => (
                  <BasketItem
                    key={basketItem.id}
                    {...basketItem}
                  />
                ))
              }
              <tr>
                <td></td>
                <td></td>
                <td className='text-right text-semibold'>Sub total</td>
                <td className='text-right text-semibold'>${total.toFixed(2)}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td className='text-right text-semibold'>Shipping</td>
                <td className='text-right text-semibold'>(Free)</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td className='text-right text-bold'>Order total</td>
                <td className='text-right text-bold'>${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <button className='checkout-button'>Check out</button>
        </div>
          
      }
    </div>
  )
}

export default Basket
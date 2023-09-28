import { Link } from 'react-router-dom'
import { RecentlyViewedType } from '../types'
import '../styles/ItemMiniCard.css'

const ItemMiniCard = (item: RecentlyViewedType) => {
  return (
    <Link to={`/products/${item.id}`} key={item.id}>
      <div className='recently-viewed-item'>
        <img src={item.image} alt={item.name} />
        <p className='recently-viewed-name'>{item.name}</p>
        <p className='recently-viewed-price'>${item.price.toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default ItemMiniCard
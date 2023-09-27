import React, { useEffect } from 'react'
import '../styles/RecentlyViewed.css'
import { RecentlyViewedType } from '../types'
import { Link } from 'react-router-dom'

const RecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = React.useState<RecentlyViewedType[]>([])

  useEffect(() => {
    const recentlyViewed = localStorage.getItem('recentlyViewed')
    if (recentlyViewed) {
      setRecentlyViewed(JSON.parse(recentlyViewed))
    }
  }, [])

  return (
    <div className='recently-viewed-div'>
      <hr />
      <p className='recently-viewed-title'>Recently View</p>
      <div className='recently-viewed-list'>
        {
          recentlyViewed.map((item: RecentlyViewedType) => {
            return (
              <Link to={`/products/${item.id}`} key={item.id}>
                <div className='recently-viewed-item'>
                  <img src={item.image} alt={item.name} />
                  <p className='recently-viewed-name'>{item.name}</p>
                  <p className='recently-viewed-price'>${item.price.toFixed(2)}</p>
                </div>
              </Link>
            )
          })
        }
      </div>
      
    </div>
  )
}

export default RecentlyViewed
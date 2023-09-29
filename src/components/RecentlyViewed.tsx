import React, { useEffect } from 'react'
import '../styles/RecentlyViewed.css'
import { RecentlyViewedType } from '../types'
import ItemMiniCard from './ItemMiniCard'

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
      <p className='recently-viewed-title'>Recently Viewed</p>
      <div className='recently-viewed-list'>
        {
          recentlyViewed.map((item: RecentlyViewedType) => {
            return (
              <ItemMiniCard key={item.id} {...item} />
            )
          })
        }
      </div>
      
    </div>
  )
}

export default RecentlyViewed
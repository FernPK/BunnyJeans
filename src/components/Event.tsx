import React, { useEffect } from 'react'
import '../styles/Event.css'
import { Item } from '../types'
import ItemCard from './ItemCard'

const Event = () => {
  const [data, setData] = React.useState<Item[]>([])

  const getData = async () => {
    fetch('data/data.json',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
      }
      )
        .then(function(response){
          // console.log(response)
          return response.json()
        })
        .then(function(myJson) {
          // console.log(myJson)
          setData(myJson)
        })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="halloween-img">
        <img src="images/halloween.png" alt="halloween-event" />
      </div>
      <div className='event-items'>
        {
          data
          .filter((item) => {
            return item.tags.indexOf('Halloween') > -1
          })
          .slice(0, 6)
          .map((item) => {
            return <ItemCard key={item.id} {...item}/>
          })
        }
      </div>
      
    </>
  )
}

export default Event
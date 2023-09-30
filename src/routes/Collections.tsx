import React, { useEffect } from 'react'
import { Collections } from '../types'
import CollectionCard from '../components/CollectionCard'
import '../styles/Collections.css'
import HeaderSection from '../components/HeaderSection'

const Collections = () => {
  const [collections, setCollections] = React.useState<Collections[]>([])

  const getData = async () => {
    fetch('https://bunnyjeans-api.onrender.com/collections',
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
          setCollections(myJson)
        })
  }

  useEffect(() => {
    getData()
  }, [])
  
  return (
    <div>
      <HeaderSection route='Collections' title='Collections' desc="Find your favourite collections here!" />
      <div className='collection-card-div'>
        <div className='collection-card-sub-div'>
          {collections.map((collection) => (
            <CollectionCard key={collection.colName} {...collection} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Collections
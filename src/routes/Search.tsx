import React, { useEffect } from 'react'
import { Item } from '../types'
import ItemMiniCard from '../components/ItemMiniCard'
import '../styles/Search.css'
const Search = () => {
  const [searchWord, setSearchWord] = React.useState<string>('')
  const [items, setItems] = React.useState<Item[]>([])

  const getData = async () => {
    fetch('https://bunnyjeans-api.onrender.com/data',
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
          setItems(myJson)
        })
  }

  useEffect(() => {
    getData()
  }, [])
  
  return (
    <div>
      <div className='search-bar-div'>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" className='search-bar' value={searchWord} onChange={(e) => setSearchWord(e.target.value)} placeholder="Search doll's name"/>
      </div>
      {
        searchWord !== '' ?
        <div className='item-mini-card-div'>
          <div className='collection-card-sub-div'>
            {items
              .filter((item) => item.name.toLowerCase().includes(searchWord.toLowerCase()))
              .map((item) => (
                <ItemMiniCard key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image[0]}
                  price={item.price}
                />
            ))}
          </div>
        </div> :
        <div className="blank-state">
          <p>Enter doll's name to search</p>
        </div>
      }
    </div>
  )
}

export default Search
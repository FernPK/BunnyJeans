import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Item, Collections } from "../types"
import HeaderSection from "../components/HeaderSection"
import ItemCard from "../components/ItemCard"
import "../styles/ItemList.css"

const ItemList = () => {
  const param = useParams()
  const [items, setItems] = React.useState<Item[]>([])
  const [collectionDesc, setCollectionDesc] = React.useState<string>('')
  const [animalFilter, setAnimalFilter] = React.useState<string[]>([])
  const [colorFilter, setColorFilter] = React.useState<string[]>([])
  const [availableFilter, setAvailableFilter] = React.useState<string[]>([])
  const collectionName = param.collectionName?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') as string

  const defineFilter = (items: Item[], category: string) => {
    const spiltName = category.split('-')
    const filterName = spiltName.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    switch (filterName) {
      case 'All Dolls':
        return items
      default:
        return items.filter(item => {
          return item.tags.includes(filterName)
        })
    }
  }

  const getData = async () => {
    fetch('/public/data/data.json',
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
          setItems(defineFilter(myJson, param.collectionName!))
        })
  }

  const getCollection = async () => {
    fetch('data/collections.json',
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
          myJson.forEach((collection: Collections) => {
            if (collection.colName === collectionName) {
              setCollectionDesc(collection.desc)
            }
          })
        })
  }

  const filterAnimal = () => {
    const types = new Set<string>()
    items.forEach(item => {
      types.add(item.animal)
    })
    const typesArray = Array.from(types)
    return typesArray
  }

  const filterColor = () => {
    const types = new Set<string>()
    items.forEach(item => {
      types.add(item.color)
    })
    const typesArray = Array.from(types)
    return typesArray
  }

  const filterAvailable = () => {
    const types = new Set<string>()
    items.forEach(item => {
      if (item.stock === 0) {
        types.add('Out of Stock')
      } else {
        types.add('In Stock')
      }
    })
    const typesArray = Array.from(types)
    return typesArray
  }

  const openOption = (option: string) => {
    const div = document.querySelector(`.${option}-option-div`) as HTMLDivElement
    if (div.style.display === 'block') {
      div.style.display = 'none'
    } else {
      div.style.display = 'block'
    }
  }

  const addAnimalFilter = (checkbox :EventTarget & HTMLInputElement, animal: string) => {
    if (checkbox.checked) {
      const newFilter = [...animalFilter, animal]
      setAnimalFilter(newFilter)
    } else {
      const newFilter = animalFilter.filter(item => {
        return item !== animal
      })
      setAnimalFilter(newFilter)
    }
  }

  const addColorFilter = (checkbox :EventTarget & HTMLInputElement, color: string) => {
    if (checkbox.checked) {
      const newFilter = [...colorFilter, color]
      setColorFilter(newFilter)
    } else {
      const newFilter = colorFilter.filter(item => {
        return item !== color
      })
      setColorFilter(newFilter)
    }
  }

  const addAvailableFilter = (checkbox :EventTarget & HTMLInputElement, available: string) => {
    if (checkbox.checked) {
      const newFilter = [...availableFilter, available]
      setAvailableFilter(newFilter)
    } else {
      const newFilter = availableFilter.filter(item => {
        return item !== available
      })
      setAvailableFilter(newFilter)
    }
  }

  const renderAnimalFilter = () => {
    if (animalFilter.length > 0) {
      const filteredItems = items.filter(item => {
        return animalFilter.includes(item.animal)
      })
      return filteredItems
    } else {
      return items
    }
  }

  const renderColorFilter = () => {
    const animalFilteredItems = renderAnimalFilter()
    if (colorFilter.length > 0) {
      const filteredItems = animalFilteredItems.filter(item => {
        return colorFilter.includes(item.color)
      })
      return filteredItems
    } else {
      return animalFilteredItems
    }
  }

  const renderAvailableFilter = () => {
    const colorFilteredItems = renderColorFilter()
    if (availableFilter.length > 0) {
      const filteredItems = colorFilteredItems.filter(item => {
        if (item.stock === 0) {
          return availableFilter.includes('Out of Stock')
        } else {
          return availableFilter.includes('In Stock')
        }
      })
      return filteredItems
    } else {
      return colorFilteredItems
    }
  }

  useEffect(() => {
    getData()
    getCollection()
  }, [param])

  return (
    <>
      <HeaderSection route={`Collections / ${collectionName}`} title={collectionName} desc={collectionDesc}/>
      <div className="sort-tool">
        <p>{items.length} Items</p>
        <label htmlFor="sort">Sort by</label>
        <select name="sort" id="sort">
          <option value="default">Default</option>
          <option value="newest">Newest</option>
          <option value="price-low-to-high">Price (High-Low)</option>
          <option value="price-high-to-low">Price (Low-High)</option>
          <option value="name-A-to-Z">Name (A-Z)</option>
          <option value="name-Z-to-A">Name (Z-A)</option>
        </select>
      </div>
      <div className="item-list-body">
        <div className="filter-tool">
          <div className="price-filter">
            <p>PRICE</p>
          </div>
          <div className="filter-block">
            <p className="filter-title" onClick={() => openOption('animal')}>ANIMAL</p>
            <div className="animal-option-div">
              {filterAnimal().map(type => {
                return (
                  <div className="filter-option" key={type}>
                    <input type="checkbox" name={type} id={type.split(' ').join('-')} onChange={(e) => addAnimalFilter(e.target, e.target.name)}/>
                    <label htmlFor={type.split(' ').join('-')}>{type}</label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="filter-block">
            <p className="filter-title" onClick={() => openOption('color')}>COLOR</p>
            <div className="color-option-div">
              {filterColor().map(type => {
                return (
                  <div className="filter-option" key={type}>
                    <input type="checkbox" name={type} id={type.split(' ').join('-')} onChange={(e) => addColorFilter(e.target, e.target.name)}/>
                    <label htmlFor={type.split(' ').join('-')}>{type}</label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="filter-block">
            <p className="filter-title" onClick={() => openOption('available')}>AVAILABILITY</p>
            <div className="available-option-div">
              {filterAvailable().map(type => {
                return (
                  <div className="filter-option" key={type}>
                    <input type="checkbox" name={type} id={type.split(' ').join('-')} onChange={(e) => addAvailableFilter(e.target, e.target.name)}/>
                    <label htmlFor={type.split(' ').join('-')}>{type}</label>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="item-list-div">
          {renderAvailableFilter()
            .filter((item) => item.stock !== 0)
            .map((item) => (
            <ItemCard
              key={item.id}
              {...item}
            />
          ))}
          {renderAvailableFilter()
            .filter((item) => item.stock === 0)
            .map((item) => (
            <ItemCard
              key={item.id}
              {...item}
            />
          ))}
        </div>
      </div>
      
    </>
  )
}

export default ItemList
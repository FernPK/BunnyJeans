import { Link } from "react-router-dom"
import { Collections } from "../types"
import '../styles/CollectionCard.css'

const CollectionCard = (props: Collections) => {
  return (
    <Link to={`/collections/${props.route}`} >
      <div className='collection-card'>
        <img src={props.image} alt={props.colName} />
        <p>{props.colName}</p>
      </div>
    </Link>
  )
}

export default CollectionCard
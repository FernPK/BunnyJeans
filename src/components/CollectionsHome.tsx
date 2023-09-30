import '../styles/CollectionsHome.css'

const CollectionsHome = () => {
  return (
    <div>
      <div className='col-div'>
        <div className='col-div-img'>
          <img src="farmAnimals.jpg" alt="Farm Animals Collection" />
        </div>
        <div className='col-div-info'>
          <h2 className='col-title-center'>B-I-N-G-O</h2>
          <p className='col-des-center'>In the midst of green pastures and rolling hills, some animals were running around. You&apos;ll find your new best friend here!</p>
          <button>Visit our Farm</button>
        </div>
      </div>
      <div className='col-div col-div-2'>
        <div className='col-div-img'>
          <img src="kawaiiFriends.jpg" alt="Kawaii Friends Collection" />
        </div>
        <div className='col-div-info'>
          <h2 className='col-title-center'>Super Duper Cute</h2>
          <p className='col-des-center'>Their big heads are full of love and their little bodies are full of beans. They&apos;re the cutest things you&apos;ll ever see!</p>
          <button>Meet Kawaii Friends</button>
        </div>
      </div>
    </div>
  )
}

export default CollectionsHome
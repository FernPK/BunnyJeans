import React, { useEffect } from 'react'
import '../styles/Footer.css'
import RecentlyViewed from './RecentlyViewed'

const Footer = () => {
  const [exist, setExist] = React.useState<boolean>(false)

  useEffect(() => {
    const recentlyViewed = localStorage.getItem('recentlyViewed')
    if (recentlyViewed) {
      setExist(true)
    }
  }, [])

  return (
    <div>
      {exist && <RecentlyViewed />}
      <div className='footer-div'>
        <div className='newsletter'>
          <p className='newsletter-title'>Subscribe to our newsletter</p>
          <p className='newsletter-des'>Get the latest news and special offers.<br />Just enter your email below!</p>
          <form className="signUp-email">
            <input type="email" id='signUp-email'/>
            <button className='sign-me-up' type='submit'>Subscribe</button>
          </form>
        </div>
        <div className="bottom-nav">
          <div>
            <p className="bottom-nav-title">Popular Collections</p>
            <a href="#">Halloween</a>
            <a href="#">Kawaii Friends</a>
            <a href="#">Farm Animals</a>
          </div>
          <div>
            <p className="bottom-nav-title">About BunnyJeans</p>
            <a href="#">Our Story</a>
            <a href="#">Special Event</a>
            <a href="#">Onsite shops</a>
          </div>
          <div>
            <p className="bottom-nav-title">Social Media</p>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
          </div>
          <div>
            <p className="bottom-nav-title">Images Credit</p>
            <a href="https://www.freepik.com/free-vector/flat-halloween-horizontal-sale-banners-set_31692593.htm" target='_blank'>Halloween banner - Freepik</a>
            <a href="https://www.freepik.com/free-vector/cute-halloween-characters-collection_2897442.htm" target='_blank'>Halloween Collection - Freepik</a>
            <a href="https://www.freepik.com/free-vector/hand-drawn-farm-animal-collection_4606121.htm" target='_blank'>Farm Animals Collection - Freepik</a>
            <a href="https://www.freepik.com/free-vector/kawaii-character-collection_4176228.htm" target='_blank'>Kawaii Collection designed by pikisuperstar - Freepik.com</a> 
          </div>
        </div>
        <div className='disclaimer'>
          This website is not real. It's for educational purposes only.
        </div>
      </div>
    </div>
    
  )
}

export default Footer
import '../assets/styles/App.scss'

import Image from '../assets/images/error.png'

const NotFound = () => (
  <div className="NotFound">
    <div className="NotFound-text">
      <h1>404</h1>
      <h2>error error error error error error error error</h2>
    </div>

    <div className="NotFound-image">
      <img src={Image} alt="" />
    </div>
  </div>
)

export default NotFound

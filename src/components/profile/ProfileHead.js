import PropTypes from 'prop-types'
import banner from '../../assets/images/banner.jpg'
import mainPhoto from '../../assets/images/nobara.jpg'
import '../../assets/styles/components/Profile.scss'

const ProfileHead = ({
  small,
}) => (
  <div className={`ProfileHead ${small && 'ProfileHead-small'}`}>
    <div className="ProfileHead-images">
      <div className="ProfileHead-banner">
        <img src={banner} alt="banner" />
      </div>

      <div className="ProfileHead-mainPhoto">
        <img src={mainPhoto} alt="mainPhoto" />
      </div>
    </div>

    <div className="ProfileHead-username blackFont">Перекотиполе</div>
    { !small
      && <div className="ProfileHead-status">Супер умний статус профілю</div>}
  </div>
)

ProfileHead.defaultProps = {
  small: false,
}

ProfileHead.propTypes = {
  small: PropTypes.bool,
}

export default ProfileHead

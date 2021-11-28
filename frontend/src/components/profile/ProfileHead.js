/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../../assets/styles/components/Profile.scss'

import { setUser, updateUser } from '../../store/authorizationSlice'

import defaultMainPhoto from '../../assets/images/nobara.jpg'
import defaultBanner from '../../assets/images/banner.jpg'
import saveIcon from '../../assets/images/icons/save.svg'

const ProfileHead = ({
  small,
}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authorization.user)

  useEffect(() => {
    dispatch(setUser())
  }, [])

  const {
    username,
    status,
    mainPhoto,
    banner,
  } = user

  const [changedData, setChangedData] = useState(false)
  const [editUsername, setEditUsername] = useState(username)
  const [editStatus, setEditStatus] = useState(status)
  const [editMainPhoto, setEditMainPhoto] = useState(mainPhoto)
  const [editBanner, setEditBanner] = useState(banner)

  useEffect(() => {
    setEditUsername(username)
    setEditStatus(status)
    setEditMainPhoto(mainPhoto)
    setEditBanner(banner)
  }, [username, status, mainPhoto, banner])

  const saveData = () => {
    const data = {
      username: editUsername,
      status: editStatus,
      mainPhoto: editMainPhoto,
      banner: editBanner,
    }

    dispatch(updateUser(data))
    setChangedData(false)
  }

  const mainPhotoRef = useRef(null)
  const bannerRef = useRef(null)
  const mainPhotoPreviewRef = useRef(null)
  const bannerPreviewRef = useRef(null)

  const onClickMainImage = () => {
    if (!small) mainPhotoRef.current.click()
  }
  const onChangeMainImage = () => {
    const reader = new FileReader()
    const imageBlob = mainPhotoRef.current.files[0]

    reader.readAsDataURL(imageBlob)
    reader.onloadend = () => {
      setEditMainPhoto(reader.result)
      mainPhotoPreviewRef.current.src = reader.result
    }

    setChangedData(true)
  }

  const onClickBanner = () => {
    if (!small) bannerRef.current.click()
  }
  const onChangeBanner = () => {
    const reader = new FileReader()
    const imageBlob = bannerRef.current.files[0]

    reader.readAsDataURL(imageBlob)
    reader.onloadend = () => {
      setEditBanner(reader.result)
      bannerPreviewRef.current.src = reader.result
    }

    setChangedData(true)
  }

  return (
    <div className={`ProfileHead ${small && 'ProfileHead-small'}`}>
      <div className="ProfileHead-images">
        <div className="ProfileHead-banner">
          <img
            src={banner || defaultBanner}
            alt="banner"
            onClick={onClickBanner}
            ref={bannerPreviewRef}
          />

          { !small && changedData && (
            <div
              className="ProfileHead-settings"
              onClick={() => saveData()}
            >
              <span>Зберегти</span>
              <img src={saveIcon} alt="setting" />
            </div>
          )}
        </div>

        <div className="ProfileHead-mainPhoto" onClick={onClickMainImage}>
          <img src={mainPhoto || defaultMainPhoto} alt="mainPhoto" ref={mainPhotoPreviewRef} />
        </div>

        { !small && (
          <div>
            <input
              type="file"
              name="mainPhoto"
              ref={mainPhotoRef}
              accept=".jpg, .jpeg, .png"
              onChange={onChangeMainImage}
            />
            <input
              type="file"
              name="banner"
              ref={bannerRef}
              accept=".jpg, .jpeg, .png"
              onChange={onChangeBanner}
            />
          </div>
        )}
      </div>

      <input
        type="text"
        className="ProfileHead-username blackFont"
        value={editUsername}
        onChange={(e) => {
          setEditUsername(e.target.value)
          setChangedData(true)
        }}
        readOnly={small}
      />

      { !small
        && (
        <input
          type="text"
          className="ProfileHead-status"
          placeholder="Можете ввести собі статус"
          value={editStatus}
          onChange={(e) => {
            setEditStatus(e.target.value)
            setChangedData(true)
          }}
        />
        )}
    </div>
  )
}

ProfileHead.defaultProps = {
  small: false,
}

ProfileHead.propTypes = {
  small: PropTypes.bool,
}

export default ProfileHead

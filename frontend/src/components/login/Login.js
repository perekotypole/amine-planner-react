import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import '../../assets/styles/components/Login.scss'

import { useDispatch, useStore } from 'react-redux'
import { setLogin } from '../../store/authorizationSlice'

import Input from '../Input'
import Button from '../Button'
import Checkbox from '../Checkbox'

import GoogleIcon from '../../assets/images/icons/google.svg'

const Login = ({ getToken }) => {
  const dispatch = useDispatch()
  const store = useStore()

  const [username, setUserName] = useState()
  const [password, setPassword] = useState()

  const [errors, setErrors] = useState()
  const [loginError, setLoginError] = useState()

  const validateForm = () => {
    let formIsValid = true
    const fieldsErrors = {}
    const fields = {
      username,
      password,
    }

    if (!fields.username) {
      formIsValid = false
      fieldsErrors.username = '*Please enter your username.'
    }

    if (typeof fields.username !== 'undefined') {
      if (!fields.username.match(/^[a-zA-Z ]*$/)) {
        formIsValid = false
        fieldsErrors.username = '*Please enter alphabet characters only.'
      }
    }

    if (!fields.password) {
      formIsValid = false
      fieldsErrors.password = '*Please enter your password.'
    }

    // if (typeof fields.password !== 'undefined') {
    //   if (!fields.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    //     formIsValid = false
    //     fieldsErrors.password = '*Please enter secure and strong password.'
    //   }
    // }

    setErrors(fieldsErrors)
    return formIsValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      dispatch(setLogin({ username, password }))
      const user = store.getState().authorization.userID

      if (user) {
        getToken({ token: store.getState().authorization.token })
      } else {
        setLoginError('Не вдалось ввійти в систему, перевірте дані')
      }
    }
  }

  return (
    <div className="Login">
      <div className="Login-header">
        <h1>
          Заходь,
          <br />
          ми скучили
        </h1>

        <NavLink to="/registration">
          <span>Реєстрація</span>
        </NavLink>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          placeholder="username"
          onChangeValue={(e) => setUserName(e.target.value)}
          error={errors?.username}
        />
        <Input
          placeholder="password"
          type="password"
          onChangeValue={(e) => setPassword(e.target.value)}
          error={errors?.password}
        />

        {loginError ? (<div className="error">{loginError}</div>) : ''}

        <div className="Login-submit">
          <Checkbox name="не виходити" />
          <Button name="Увійти" type="submit" />
        </div>
      </form>

      <div className="Login-google">
        <span>або можеш зайти через</span>
        <img src={GoogleIcon} alt="google" />
      </div>
    </div>
  )
}

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
}

export default Login

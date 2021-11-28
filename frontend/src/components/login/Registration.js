import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../../assets/styles/components/Login.scss'

import { useDispatch, useStore } from 'react-redux'
import { setRegistration } from '../../store/authorizationSlice'

import Input from '../Input'
import Button from '../Button'
import Checkbox from '../Checkbox'

import GoogleIcon from '../../assets/images/icons/google.svg'

const Registration = () => {
  const dispatch = useDispatch()
  const store = useStore()

  const [username, setUserName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [repeatPassword, setRepeatPassword] = useState()

  const [errors, setErrors] = useState()
  const [loginError, setLoginError] = useState()

  const validateForm = () => {
    let formIsValid = true
    const fieldsErrors = {}
    const fields = {
      username,
      email,
      password,
      repeatPassword,
    }

    if (!fields.username) {
      formIsValid = false
      fieldsErrors.username = '*Please enter your username.'
    }

    if (typeof fields.username !== 'undefined') {
      if (!fields.username.match(/^[a-zA-Zа-яА-я ]*$/)) {
        formIsValid = false
        fieldsErrors.username = '*Please enter alphabet characters only.'
      }
    }

    if (!fields.email) {
      formIsValid = false
      fieldsErrors.emailid = '*Please enter your email.'
    }

    if (typeof fields.email !== 'undefined') {
      const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
      if (!pattern.test(fields.email)) {
        formIsValid = false
        fieldsErrors.email = '*Please enter valid email.'
      }
    }

    if (!fields.password) {
      formIsValid = false
      fieldsErrors.password = '*Please enter your password.'
    }

    if (fields.repeatPassword !== fields.password) {
      formIsValid = false
      fieldsErrors.password = '*Password is not the same'
    }

    setErrors(fieldsErrors)
    return formIsValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validateForm()) {
      dispatch(setRegistration({
        username, email, password,
      }))
      const { isLoggedIn } = store.getState().authorization

      if (!isLoggedIn) {
        setLoginError('Не вдалось ввійти в систему, перевірте дані')
      }
    }
  }

  return (
    <div className="Registration">
      <div className="Registration-header">
        <h1>
          Доброго дня,
          <br />
          давайте знайомитись
        </h1>

        <NavLink to="/">
          <span>Вхід</span>
        </NavLink>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          placeholder="username"
          onChangeValue={(e) => setUserName(e.target.value)}
          error={errors?.username}
        />
        <Input
          placeholder="e-mail"
          onChangeValue={(e) => setEmail(e.target.value)}
          error={errors?.email}
        />
        <Input
          placeholder="password"
          type="password"
          onChangeValue={(e) => setPassword(e.target.value)}
          error={errors?.password}
        />
        <Input
          placeholder="repeat password"
          type="password"
          onChangeValue={(e) => setRepeatPassword(e.target.value)}
          error={errors?.repeatPassword}
        />

        {loginError ? (<div className="error">{loginError}</div>) : ''}

        <div className="Registration-submit">
          <Checkbox name="не виходити" />
          <Button name="Увійти" type="submit" />
        </div>
      </form>

      <div className="Registration-google">
        <span>або можеш зайти через</span>
        <img src={GoogleIcon} alt="google" />
      </div>
    </div>
  )
}

export default Registration

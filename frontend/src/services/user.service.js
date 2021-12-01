import axios from './auth-axios'

const getUser = () => axios
  .post('user/get')
  .then((response) => response.data)

const updateUser = ({
  username,
  status,
  mainPhoto,
  banner,
}) => axios
  .post('user/update', {
    username,
    status,
    mainPhoto,
    banner,
  })
  .then((response) => response.data)

const userService = {
  getUser,
  updateUser,
}

export default userService

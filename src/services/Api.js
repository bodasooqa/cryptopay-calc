import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://api.cryptonator.com/api/ticker/'
  })
}

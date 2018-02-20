import Api from '@/services/Api'

export default {
  register () {
    return Api().get('btc-usd')
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

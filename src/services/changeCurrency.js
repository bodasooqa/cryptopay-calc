import Api from '@/services/Api'

export default {
  change (cur) {
    Api().get(cur)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

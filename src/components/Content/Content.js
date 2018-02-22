import Typed from 'typed.js'
import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'https://api.cryptonator.com/api/ticker/'
})

export default {
  name: 'Content',
  data () {
    return {
      sum: 0,
      dotCount: 0,
      currencies: [
        { name: 'Bitcoin (BTC)', url: 'btc' },
        { name: 'US Dollar (USD)', url: 'usd' },
        { name: 'Ruble (RUR)', url: 'rur' },
        { name: 'Etherium (ETH)', url: 'eth' },
        { name: 'Euro (EUR)', url: 'eur' },
        { name: 'Litecoin (LTC)', url: 'ltc' }
      ],
      firstVal: '',
      secondVal: '',
      calcOn: true,
      price: 0
    }
  },
  methods: {
    editSum (num) {
      if (num === '.') {
        if (this.dotCount === 0) {
          this.sum = String(this.sum) + String(num)
          this.dotCount += 1
        } else {
          return null
        }
      } else {
        if (String(this.sum).length < 16) {
          this.sum = Number(String(this.sum) + String(num))
        } else {
          return null
        }
      }
    },
    delSum () {
      this.sum = 0
      this.dotCount = 0
    },
    setCalc () {
      this.calcOn = !this.calcOn
    },
    async result () {
      try {
        if (this.firstVal && this.secondVal) {
          let res = await HTTP.get(`${this.firstVal}-${this.secondVal}`)
          if (res.data.ticker) {
            this.price = res.data.ticker.price
          } else {
            this.price = 1
          }
          return null
        }
      } catch (err) {
        return err
      }
    }
  },
  mounted: function () {
    let options = (arr) => {
      return {
        strings: arr,
        typeSpeed: 100,
        backSpeed: 80,
        loop: true,
        loopCount: Infinity,
        showCursor: false
      }
    }

    let typed1 = new Typed('.cur1', options(['LTC', 'BTC', 'ETH', 'RUR', 'USD', 'EUR']))
    let typed2 = new Typed('.cur2', options(['BTC', 'ETH', 'RUR', 'USD', 'EUR', 'LTC']))

    if (!typed1 && !typed2) {
      console.log(typed1, typed2)
    }
  }
}

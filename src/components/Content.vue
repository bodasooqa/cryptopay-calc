<template>
<div class="container">
  <div class="row service">
    <h1>Удобный сервис конвертации и рассчета валюты</h1>
    <div class="col-lg-2 offset-lg-3 cur">
      <span class="cur1"></span>
    </div>
    <div class="col-lg-2 cur">
      <span class="fa fa-exchange"></span>
    </div>
    <div class="col-lg-2 cur">
      <span class="cur2"></span>
    </div>
    <div class="col-lg-3 offset-lg-3 currency-field">
      <label>Из</label>
      <select v-model="firstVal" class="form-control">
        <option disabled value="">Выбрать валюту</option>
        <option v-for="cur in currencies" :key="cur.name" :value="cur.url" selected>{{cur.name}}</option>
      </select>
    </div>
    <div class="col-lg-3 currency-field">
      <label>В</label>
      <select v-model="secondVal" class="form-control">
        <option disabled value="">Выбрать валюту</option>
        <option v-for="cur in currencies" :key="cur.name" :value="cur.url" selected>{{cur.name}}</option>
      </select>
    </div>
    <div class="col-lg-4 offset-lg-4">
      <div class="row">
        <div class="col-lg-12">
          <div class="input-group mt-3">
            <input maxlength="16" class="form-control" type="number" v-model="sum">
            <div class="input-group-append">
              <button @click="setCalc" :class="{ active: calcOn }" class="input-group-text btn-calc" id="basic-addon2"><span class="fa fa-calculator"></span></button>
            </div>
          </div>
        </div>
        <div class="col-lg-12 btns" :class="{ active: calcOn }">
          <div class="row">
            <div class="col-lg-4" v-for="i in 9" :key="i">
              <button @click="editSum(i)" class="btn mt-2 btn-num">{{ i }}</button>
            </div>
            <div class="col-lg-4">
              <button @click="editSum(0)" class="btn mt-2 btn-num">0</button>
            </div>
            <div class="col-lg-4">
              <button @click="editSum('.')" class="btn mt-2 btn-num">.</button>
            </div>
            <div class="col-lg-4">
              <button @click="delSum" class="btn mt-2 btn-num">Del</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-12">
      <transition name="fade">
        <h2 v-if="firstVal && secondVal && (sum || sum === 0)" class="result">
          <span style="display: none">{{result()}}</span>
          <span class="first-val">{{sum}} {{firstVal.toUpperCase()}}</span> = <span class="second-val">{{(sum * price).toFixed(2)}} {{secondVal.toUpperCase()}}</span>
        </h2>
      </transition>
    </div>
  </div>
</div>
</template>

<script>
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
</script>

<style lang="scss" scoped>
.service {
  text-align: center;
  color: #ffffff;
  h1 {
    font-weight: 100;
    width: 60%;
    margin: auto;
    padding: 60px 0 30px;
  }
}
.cur {
  min-height: 5rem;
  .fa {
    font-size: 2rem;
    margin-top: 1.3rem;
  }
}
.cur1, .cur2 {
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  -ms-transition: 0.2s;
  -o-transition: 0.2s;
  transition: 0.2s;
  font-size: 3rem;
}
.cur1 {
  float: right;
}
.cur2 {
  float: left;
}
.currency-field {
  label {
    color: #ffffff;
    text-align: center;
    width: 100%;
  }
}
.btn-num {
  width: 100%;
  border: none;
  border-bottom: 3px solid rgba(0, 0, 0, 0.4);
  box-shadow: 0px 4px 5px -1px rgba(0, 0, 0, 0.5);
  transition: 0.1s;
  &:active {
    border-top: 3px solid #502f50;
    border-bottom: none !important;
    box-shadow: 0px 4px 5px -1px rgba(0, 0, 0, 0.5) inset;
  }
}
.btn-calc {
  outline: none;
  cursor: pointer;
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -ms-transition: 0.5s;
  -o-transition: 0.5s;
  transition: 0.5s;
  &.active {
    background: #fff;
    color: #c4372c;
  }
}
.second-val {
  font-weight: 600;
}
.btns {
  -webkit-transition: height 400ms cubic-bezier(0, 0, 0.2, 1);
  -moz-transition: height 400ms cubic-bezier(0, 0, 0.2, 1);
  -ms-transition: height 400ms cubic-bezier(0, 0, 0.2, 1);
  -o-transition: height 400ms cubic-bezier(0, 0, 0.2, 1);
  transition: height 400ms cubic-bezier(0, 0, 0.2, 1);
  overflow: hidden;
  height: 0;
  &.active {
    height: 12rem;
  }
}
.result {
  margin-top: 1rem;
}

/* Vue */
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>

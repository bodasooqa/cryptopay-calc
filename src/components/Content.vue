<template>
<div class="container">
  <div class="row section-title">
    <div class="col-lg-2 offset-lg-3">
      <span class="cur1"></span>
    </div>
    <div class="col-lg-2">
      <span class="fa fa-arrow-right"></span>
    </div>
    <div class="col-lg-2">
      <span class="cur2"></span>
    </div>
    <div class="col-lg-3 offset-lg-3 currency-field">
      <label>Из</label>
      <select class="form-control">
        <option selected>BTC</option>
      </select>
    </div>
    <div class="col-lg-3 currency-field">
      <label>В</label>
      <select class="form-control">
        <option selected>USD</option>
      </select>
    </div>
    <div class="col-lg-4 offset-lg-4">
      <div class="row">
        <div class="col-lg-12">
          <div class="input-group mt-3">
            <input class="form-control" v-model="sum">
            <div class="input-group-append">
              <button class="input-group-text" id="basic-addon2"><span class="fa fa-calculator"></span></button>
            </div>
          </div>
        </div>
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
</template>

<script>
import Typed from 'typed.js'

export default {
  name: 'Content',
  data () {
    return {
      sum: 0,
      dotCount: 0
    }
  },
  methods: {
    editSum(num) {
      if (num === '.') {
        if (this.dotCount === 0) {
          this.sum = String(this.sum) + String(num);
          this.dotCount += 1;
        } else {
          return null;
        }
      } else {
        if (String(this.sum).length < 16) {
          this.sum = Number(String(this.sum) + String(num));
        } else {
          return null;
        }
      }
    },
    delSum() {
      this.sum = 0;
      this.dotCount = 0;
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

    new Typed('.cur1', options(['BTC', 'RUR', 'USD', 'ETH', 'EUR']))
    new Typed('.cur2', options(['ETH', 'USD', 'EUR', 'LTC', 'BTC']))
  }
}
</script>

<style lang="scss" scoped>
.section-title {
  text-align: center;
  color: #ffffff;
  margin: 80px 0 20px;
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
    border-top: 3px solid #962a20;
    border-bottom: none !important;
    box-shadow: 0px 4px 5px -1px rgba(0, 0, 0, 0.5) inset;
  }
}
</style>

<template>
<div class="container">
  <div class="row service">
    <h1>Удобный сервис конвертации и расчета валюты</h1>
    <div class="col-lg-2 offset-lg-3 col-5 cur">
      <span class="cur1"></span>
    </div>
    <div class="col-lg-2 col-2 cur">
      <span class="fa fa-exchange"></span>
    </div>
    <div class="col-lg-2 col-5 cur">
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
            <div class="col-4" v-for="i in 9" :key="i">
              <button @click="editSum(i)" class="btn mt-2 btn-num">{{ i }}</button>
            </div>
            <div class="col-4">
              <button @click="editSum(0)" class="btn mt-2 btn-num">0</button>
            </div>
            <div class="col-4">
              <button @click="editSum('.')" class="btn mt-2 btn-num">.</button>
            </div>
            <div class="col-4">
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
  <div class="row author">
    <div class="container">
      <div class="social">
        <a href="https://github.com/bodasooqa/cryptopay-calc" target="_blank"><span class="fa fa-github"></span></a>
      </div>
      <p>© 2018 | bodasooqa</p>
    </div>
  </div>
</div>
</template>

<script>
import Content from './Content'
export default Content
</script>

<style lang="scss" scoped>
@import "Content";
</style>

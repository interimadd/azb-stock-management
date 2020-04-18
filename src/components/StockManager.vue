<template>
  <div class="stock_info">
    <div class="box">
      <div class="container has-text-centered">
        <div class="field is-horizontal">
          <p class="control">
            <span class="select">
              <select v-model="IN_or_OUT">
                <option>入庫</option>
                <option>出庫</option>
              </select>
            </span>
          </p>
          <p class="control has-tooltip-primary" data-tooltip="商品名">
            <span class="select">
              <select v-model="productName">
                <option v-for="val in product_name_list" :key=val :value=val>{{val}}</option>
              </select>
            </span>
          </p>
          <p class="control has-tooltip-primary" data-tooltip="移動元">
            <span class="select">
              <select v-model="from">
                <option :value=val v-for="val in place_name_list" :key=val>{{val}}</option>
              </select>
            </span>
          </p>
          <p class="control has-tooltip-primary" data-tooltip="移動先">
            <span class="select">
              <select v-model="to">
                <option v-for="val in place_name_list" :key=val :value=val>{{val}}</option>
              </select>
            </span>
          </p>
          <p class="control">
            <input class="input" type="text" placeholder="個数" v-model="quantity">
          </p>
          <p class="control">
            <input class="input" type="text" placeholder="単価" v-model="priceYen">
          </p>
          <p class="control has-tooltip-primary" data-tooltip="反映日">
            <input class="input" type="date" v-model="applyData">
          </p>
          <p class="control">
            <a class="button is-primary" v-on:click="addStockInfo()">
              追加
            </a>
          </p>
        </div>
      </div>
    </div>
    <div class="container has-text-centered">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th class="is-hidden-mobile"><abbr title="Index">Idx</abbr></th>
            <th>入出</th>
            <th>商品名</th>
            <th>From</th>
            <th>To</th>
            <th>数量</th>
            <th>単価</th>
            <th class="is-hidden-mobile">登録日</th>
            <th class="is-hidden-mobile">反映日</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stock, index) in filteredStockInfo" :key="stock.id">
            <th class="is-hidden-mobile">{{index}}</th>
            <td>{{ stock.IN_or_OUT }}</td>
            <td>{{ stock.productName }}</td>
            <td>{{ stock.from }}</td>
            <td>{{ stock.to }}</td>
            <td>{{ stock.quantity }}</td>
            <td>{{ stock.priceYen }}</td>
            <td class="is-hidden-mobile">{{ stock.registDate }}</td>
            <td class="is-hidden-mobile">{{ stock.applyData }}</td>
            <td><a class="button is-primary is-rounded is-small" v-on:click="deleteStockInfo(stock.key)">削除</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
 
<script>
import firebase from "firebase"

let today_date = new Date()
let today_str = today_date.getFullYear() + '-' + ('0'+(today_date.getMonth()+1)).slice(-2) + '-' + ('0'+today_date.getDate()).slice(-2)

const convert_date = function(date_str, output_year=true) {
  let date = new Date(date_str)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let ret_str = ''
  if(output_year==true){
    ret_str = year + '/' + month + '/' + day
  }
  else{
    ret_str = month + '/' + day
  }
  return ret_str
}
 
export default {
  name: "StockManager",
  data() {
    return {
      database: null,
      stock_DB: null,
      stock_info: [],
      IN_or_OUT: "入庫",
      productName: "",
      quantity: "",
      priceYen: "",
      applyData: today_str,
      from: "",
      to: "",
      product_name_list: [],
      place_name_list: []
    }
  },
  created: function() {
    this.database = firebase.database()
    this.uid = firebase.auth().currentUser.uid
    this.stock_DB = this.database.ref("stock_info/" + this.uid)
    // データに変更があると実行されるfunction
    this.stock_DB.on("value", (snapshot) => {
      this.stock_info = snapshot.val() // 再取得してstock_infoに格納する
    })
    this.database.ref("item_info/" + this.uid).once('value')
      .then((snapshot) => {
        let item_list = snapshot.val()
        for(let idx in item_list){
          if(item_list[idx].type == 1){
            this.product_name_list.push(item_list[idx].itemName)
            this.productName = this.product_name_list[0]
          }
          else if(item_list[idx].type == 2){
            this.place_name_list.push(item_list[idx].itemName)
            this.to = this.place_name_list[0]
            this.from = this.place_name_list[0]
          }
        }
        let not_set_alert = "「項目設定」してください"
        if(this.product_name_list.length == 0){
          this.product_name_list.push(not_set_alert)
          this.productName = not_set_alert
        }
        if(this.place_name_list.length == 0){
          this.place_name_list.push(not_set_alert)
          this.to = not_set_alert
          this.from = not_set_alert
        }
      })
  },
  computed: {
    filteredStockInfo: function() {
      let count_index = 0
      let ret_filter_stock_info = {}
      let key_list = []
      for (let key in this.stock_info) {
        key_list.push(key)
      }
      key_list.reverse()
      for (let idx in key_list) {
        let key = key_list[idx]
        let stock = this.stock_info[key]
        count_index += 1
        stock.registDate = convert_date(stock.registDate)
        stock.applyData = convert_date(stock.applyData, false)
        stock.key = key
        ret_filter_stock_info[count_index] = stock
      }
      return ret_filter_stock_info
    }
  },
  methods: {
    // DBのstock_info/[uid]/以下にデータを格納していく
    addStockInfo: function() {
      this.stock_DB.push({
        IN_or_OUT: this.IN_or_OUT,
        productName: this.productName,
        quantity: this.quantity,
        priceYen: this.priceYen,
        from: this.from,
        to: this.to,
        registDate: today_str,
        applyData: this.applyData,
      })
    },
    // stock_infoの削除
    deleteStockInfo: function(key) {
      this.stock_DB.child(key).remove()
    },
    setProductAndItemList: function(item_list) {
      this.product_name_list = []
      this.place_name_list = []
      for(let idx in item_list){
        if(item_list[idx].type == 1){
          this.product_name_list.push(item_list[idx].itemName)
        }
        else if(item_list[idx].type == 2){
          this.place_name_list.push(item_list[idx].itemName)
        }
      }
    }
  }
}
</script>
 
<style lang="scss">
@import '~bulma';
@import '~bulma-tooltip';
</style>
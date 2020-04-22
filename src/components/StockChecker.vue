<template>
  <div class="stock_check">
    <div class="card">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th><abbr title="Index">Product</abbr></th>
            <th v-for="(value, key) in getPlaceList" :key="key">{{value}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stock, key) in aggregateStock" :key="key">
            <th>{{key}}</th>
            <td v-for="(value, key2) in getPlaceList" :key="key2">
              {{ stock[value] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
 
<script>
import firebase from "firebase";
 
export default {
  name: "StockChecker",
  data() {
    return {
      database: null,
      stock_DB: null,
      stock_info: [],
      place_list: [],
      product_list: [],
      aggregate_res: {}
    };
  },
  created: function() {
    this.database = firebase.database();
    this.uid = firebase.auth().currentUser.uid;
    this.stock_DB = this.database.ref("stock_info/" + this.uid);
 
    // データに変更があると実行されるfunction
    this.stock_DB.on("value", (snapshot) => {
      this.stock_info = snapshot.val(); // 再取得してstock_infoに格納する
    });
  },
  computed: {
    getPlaceList: function() {
      let place_list = []
      let product_list = []
      for (let key in this.stock_info) {
        const product = this.stock_info[key].productName
        const from_p = this.stock_info[key].from
        const to_p = this.stock_info[key].to
        if(product_list.indexOf(product)==-1){product_list.push(product)}
        if(place_list.indexOf(from_p)==-1){place_list.push(from_p)}
        if(place_list.indexOf(to_p)==-1){place_list.push(to_p)} 
      }
      return place_list
    },
    aggregateStock: function() {
      let place_list = []
      let product_list = []
      for (let key in this.stock_info) {
        const product = this.stock_info[key].productName
        const from_p = this.stock_info[key].from
        const to_p = this.stock_info[key].to
        if(product_list.indexOf(product)==-1){product_list.push(product)}
        if(place_list.indexOf(from_p)==-1){place_list.push(from_p)}
        if(place_list.indexOf(to_p)==-1){place_list.push(to_p)} 
      }

      let ret_aggregate_stock_info = {}
      for (let idx in product_list){
        ret_aggregate_stock_info[product_list[idx]] = {}
        for (let idx_p in place_list){
          ret_aggregate_stock_info[product_list[idx]][place_list[idx_p]] = 0
        }
      }

      for (let key in this.stock_info) {
        const product = this.stock_info[key].productName
        const from_p = this.stock_info[key].from
        const to_p = this.stock_info[key].to
        const quantity = Number(this.stock_info[key].quantity)
        ret_aggregate_stock_info[product][from_p] -= quantity
        ret_aggregate_stock_info[product][to_p] += quantity
      }
      return ret_aggregate_stock_info
    }
  },
  methods: {
  }
};
</script>
 
<style lang="scss">
@import '~bulma';
.stock_check {padding: 20px;}
</style>
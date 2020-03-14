<template>
  <div class="stock_check">
    <div class="container has-text-centered">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th><abbr title="Index">Idx</abbr></th>
            <th>入庫/出庫</th>
            <th>商品名</th>
            <th>From</th>
            <th>To</th>
            <th>数量</th>
            <th>単価</th>
            <th>登録日</th>
            <th>反映日</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stock, index) in aggregateStock" :key="stock.id">
            <th>{{index}}</th>
            <td>{{ stock.IN_or_OUT }}</td>
            <td>{{ stock.productName }}</td>
            <td>{{ stock.from }}</td>
            <td>{{ stock.to }}</td>
            <td>{{ stock.quantity }}</td>
            <td>{{ stock.priceYen }}</td>
            <td>{{ stock.registDate }}</td>
            <td>{{ stock.applyData }}</td>
            <td><a class="button is-primary is-rounded is-small" v-on:click="deleteStockInfo(stock.key)">削除</a></td>
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
      IN_or_OUT: "入庫",
      productName: "ソクラテスラ通常版",
      quantity: "",
      priceYen: "",
      from: "田中紙工",
      to: "すごろくや"
    };
  },
  created: function() {
    this.database = firebase.database();
    this.uid = firebase.auth().currentUser.uid;
    this.stock_DB = this.database.ref("stock_info/" + this.uid);
 
    // データに変更があると実行されるfunction
    this.stock_DB.on("value", (snapshot) => {
      this.stock_info = snapshot.val(); // 再取得してstock_infoに格納する
      this.aggregateStock()
    });
  },
  computed: {
    aggregateStock: function() {
      let place_list = []
      let product_list = []
      for (let key in this.stock_info) {
        let product = this.stock_info[key].productName
        let from_p = this.stock_info[key].from
        let to_p = this.stock_info[key].to
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
        let product = this.stock_info[key].productName
        let from_p = this.stock_info[key].from
        let to_p = this.stock_info[key].to
        let quantity = Number(this.stock_info[key].quantity)
        console.log(product, from_p, to_p, quantity)
        ret_aggregate_stock_info[product][from_p] -= quantity
        ret_aggregate_stock_info[product][to_p] += quantity
        console.log(ret_aggregate_stock_info[product])
      }
      console.log(ret_aggregate_stock_info)

      return ret_aggregate_stock_info
    }
  },
  methods: {
  }
};
</script>
 
<style lang="scss">
@import '~bulma';
</style>
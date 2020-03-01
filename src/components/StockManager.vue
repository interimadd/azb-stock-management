<template>
  <div class="stock_info">
     <h2>在庫</h2>
    <div>
      <input type="text" v-model="newTodoName">
      <button type="submit" v-on:click="createTodo()">入庫出庫情報追加</button>
    </div>
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
    <tr v-for="(stock, index) in filteredStockInfo" :key="stock.id">
      <th>{{index}}</th>
      <td>{{ stock.IN_or_OUT }}</td>
      <td>{{ stock.productName }}</td>
      <td>{{ stock.from }}</td>
      <td>{{ stock.to }}</td>
      <td>{{ stock.quantity }}</td>
      <td>{{ stock.priceYen }}</td>
      <td>{{ stock.registDate }}</td>
      <td>{{ stock.applyData }}</td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</template>
 
<script>
import firebase from "firebase";

const convert_date = function(date_str) {
  let date = new Date(date_str)
  console.log(date_str)
  console.log(date)
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let ret_str = year + '年' + month + '月' + day + '日'
  return ret_str
}
 
export default {
  name: "StockManager",
  data() {
    return {
      database: null,
      stock_DB: null,
      newTodoName: "",
      stock_info: []
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
    filteredStockInfo: function() {
      let count_index = 0
      let ret_filter_stock_info = {};
      for (let key in this.stock_info) {
        let stock = this.stock_info[key];
        count_index += 1
        stock.registDate = convert_date(stock.registDate)
        stock.applyData = convert_date(stock.applyData)
        ret_filter_stock_info[count_index] = stock;
      }
      return ret_filter_stock_info
    }
  },
  methods: {
    // DBのstock_info/[uid]/以下にデータを格納していく
    createTodo: function() {
      if (this.newTodoName == "") {
        return;
      }
      let date = new Date()
      this.stock_DB.push({
        IN_or_OUT: '入庫',
        productName: 'ソクラテスラ通常版',
        quantity: 1000,
        priceYen: 3000,
        from: "田中紙工",
        to: "amazon",
        registDate: date.toISOString(),
        applyData: date.toISOString(),
      })
    }
  }
};
</script>
 
<style>
</style>
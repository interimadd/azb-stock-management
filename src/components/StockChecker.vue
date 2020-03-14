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
            <td><a class="button is-primary is-rounded is-small" v-on:click="deleteStockInfo(stock.key)">削除</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
 
<script>
import Firebase from '@/firebase';
import firebase from "firebase";

const convert_date = function(date_str, output_year=true) {
  let date = new Date(date_str)
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
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
    Firebase.onAuth()
    this.database = firebase.database();
    this.uid = firebase.auth().currentUser.uid;
    this.stock_DB = this.database.ref("stock_info/" + this.uid);
 
    // データに変更があると実行されるfunction
    this.stock_DB.on("value", (snapshot) => {
      this.stock_info = snapshot.val(); // 再取得してstock_infoに格納する
      console.log(this.stock_info)
    });
  },
  computed: {
    filteredStockInfo: function() {
      let count_index = 0
      let ret_filter_stock_info = {};
      let key_list = []
      for (let key in this.stock_info) {
        key_list.push(key)
      }
      key_list.reverse()
      for (let idx in key_list) {
        let key = key_list[idx]
        let stock = this.stock_info[key];
        count_index += 1
        stock.registDate = convert_date(stock.registDate)
        stock.applyData = convert_date(stock.applyData, false)
        stock.key = key
        ret_filter_stock_info[count_index] = stock;
      }
      return ret_filter_stock_info
    }
  },
  methods: {
    // DBのstock_info/[uid]/以下にデータを格納していく
    addStockInfo: function() {
      if (this.newTodoName == "") {
        return;
      }
      let date = new Date()
      this.stock_DB.push({
        IN_or_OUT: this.IN_or_OUT,
        productName: this.productName,
        quantity: this.quantity,
        priceYen: this.priceYen,
        from: this.from,
        to: this.to,
        registDate: date.toISOString(),
        applyData: date.toISOString(),
      })
    },
    // todoの削除
    deleteStockInfo: function(key) {
      this.stock_DB.child(key).remove();
    }
  }
};
</script>
 
<style lang="scss">
@import '~bulma';
</style>
<template>
  <div class="stock_info">
     <h2>在庫</h2>
    <div>
      <input type="text" v-model="newTodoName">
      <button type="submit" v-on:click="createTodo()">入庫出庫情報追加</button>
    </div>
    <!-- todoの一覧表示 -->
    <ul v-for="(todo) in filteredTodos" :key="todo.id">
      <li>{{ todo.productName }}</li>
    </ul>
  </div>
</template>
 
<script>
import firebase from "firebase";
 
export default {
  name: "StockManager",
  data() {
    return {
      database: null,
      stock_DB: null,
      newTodoName: "",
      todos: []
    };
  },
  created: function() {
    this.database = firebase.database();
    this.uid = firebase.auth().currentUser.uid;
    this.stock_DB = this.database.ref("stock_info/" + this.uid);
 
    // データに変更があると実行されるfunction
    this.stock_DB.on("value", (snapshot) => {
      this.todos = snapshot.val(); // 再取得してtodosに格納する
    });
  },
  computed: {
    filteredTodos: function() {
        return this.todos
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
        IN_or_OUT: 'IN',
        productName: 'ソクラテスラ通常版',
        quantitiy: 1000,
        priceYen: 3000,
        from: "田中紙工",
        to: "amazon",
        registDate: JSON.stringify(date),
        applyData: JSON.stringify(date),
      })
    }
  }
};
</script>
 
<style>
</style>
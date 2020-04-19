<template>
  <div class="setting">
    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-content">
            <p class="title">
              商品名リスト
            </p>
            <div class="field has-addons">
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="商品名" v-model="product_name">
              </p>
              <p class="control">
                <a class="button is-primary" v-on:click="addProductInfo()">
                  追加
                </a>
              </p>
            </div>
            <div class="field has-addons" v-for="(item) in filterProductList" :key="item.key">
              <p class="control is-expanded">
                <input class="input" type="text" :value="item.itemName" readonly>
              </p>
              <p class="control">
                <a class="button is-danger" v-on:click="deleteItemInfo(item.key)">
                  削除
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content">
            <p class="title">
              場所リスト
            </p>
            <div class="field has-addons">
              <p class="control">
                <span class="select">
                  <select v-model=place_type>
                    <option>仕入れ先</option>
                    <option>在庫管理場所</option>
                    <option>販売先</option>
                  </select>
                </span>
              </p>
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="場所名" v-model="plcae_name">
              </p>
              <p class="control">
                <a class="button is-primary" v-on:click="addPlaceInfo()">
                  追加
                </a>
              </p>
            </div>
            <div class="field has-addons" v-for="(item) in filterPlaceList" :key="item.key">
              <p class="control is-expanded">
                <input class="input" type="text" :value="item.itemType" readonly>
              </p>
              <p class="control is-expanded">
                <input class="input" type="text" :value="item.itemName" readonly>
              </p>
              <p class="control">
                <a class="button is-danger" v-on:click="deleteItemInfo(item.key)">
                  削除
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import firebase from "firebase";

const PRODUCT_NAME = 1
const PLACE_NAME = 2
 
export default {
  name: "StockManager",
  data() {
    return {
      database: null,
      item_DB: null,
      item_list: [],
      product_name: "",
      plcae_name: "",
      place_type: "仕入れ先"
    };
  },
  created: function() {
    this.database = firebase.database();
    this.uid = firebase.auth().currentUser.uid;
    this.item_DB = this.database.ref("item_info/" + this.uid);
 
    // データに変更があると実行されるfunction
    this.item_DB.on("value", (snapshot) => {
      this.item_list = snapshot.val(); // 再取得してstock_infoに格納する
    });
  },
  computed: {
    filterProductList: function() {
      return this.filterItemList(PRODUCT_NAME)
    },
    filterPlaceList: function() {
      return this.filterItemList(PLACE_NAME)
    },
  },
  methods: {
    // DBのitem_info/[uid]/以下にデータを格納していく
    addProductInfo: function() {
      this.item_DB.push({
        type: PRODUCT_NAME,
        itemName: this.product_name,
      })
      this.product_name = ""
    },
    addPlaceInfo: function() {
      this.item_DB.push({
        type: PLACE_NAME,
        itemName: this.plcae_name,
        itemType: this.place_type
      })
      this.plcae_name = ""
    },
    deleteItemInfo: function(key) {
      this.item_DB.child(key).remove();
    },
    filterItemList: function(type_num) {
      let ret_filter_item_list = {};
      for (let key in this.item_list) {
        let item = this.item_list[key]
        if(item.type == type_num){
          item.key = key
          ret_filter_item_list[key] = item
        }
      }
      return ret_filter_item_list      
    }
  }
};
</script>
 
<style lang="scss">
@import '~bulma';
@import '~bulma-tooltip';
.setting {padding: 10px;}
</style>
<template>
  <div id="home">
    <div class="section1">
      <div class="columns is-desktop">
        <div class="column is-offset-1">
          <div class="has-text-weight-bold has-text-white is-size-3">同人サークル<span class="is-size-4">のための</span></div>
          <p class="has-text-weight-bold has-text-white is-size-3">クラウド在庫管理システム</p>
          <div class="has-text-white is-size-5">必要最小限のシンプルなWebアプリ</div>
          <div class="has-text-white is-size-5">無料で使えます</div>
          <div>.</div>
          <div class="button is-primary is-rounded has-text-weight-bold">使ってみる</div>
        </div>
        <div class="column">
          <img src="/pc_phone.png"/>
        </div>
        <div class="column is-1"></div>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-half is-full-mobile is-offset-1-mobile">
        <h1 class="has-text-weight-bold is-size-3">在庫管理Appの特徴</h1>
        <div class="has-text-weight-bold is-size-3">同人サークル<span class="is-size-4">のための</span></div>
        <p class="has-text-weight-bold is-size-3">クラウド在庫管理システム</p>
        <div class="is-size-5">必要最小限のシンプルなWebアプリ</div>
        <div class="is-size-5">無料で使えます</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '~bulma';

.section1{
  /*レイアウト用のCSS*/
  padding: 50px;
}
.section1{
  position: relative;
 
  /*レイアウト用のCSS*/
  background-color: $grey-darker;
}
.section1::before{
  content:"";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
 
  /*ここで三角形のサイズを決める。
  必ず幅100vwにして、ブラウザサイズいっぱいにしてください。*/
  border-width: 0 0 200px 120vw ;
 
  border-color: transparent transparent #fff transparent;
}
</style>

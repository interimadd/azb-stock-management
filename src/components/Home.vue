<template>
  <div id="home">
    <div class="section1">
      <div class="columns is-desktop">
        <div class="column is-offset-1">
          <div class="has-text-weight-bold has-text-white is-size-3-tablet is-size-5-mobile">同人サークル<span class="is-size-4-tablet">のための</span></div>
          <p class="has-text-weight-bold has-text-white is-size-3-tablet is-size-5-mobile">クラウド在庫管理システム</p>
          <div class="has-text-white is-size-5-tablet">必要最小限のシンプルなWebアプリ</div>
          <div class="has-text-white is-size-5-tablet">ブラウザからインストール不要で使えます</div>
          <div>.</div>
          <a class="button is-primary is-rounded has-text-weight-bold" href="/signin">使ってみる</a>
        </div>
        <div class="column">
          <img src="/pc_phone.png"/>
        </div>
        <div class="column is-1"></div>
      </div>
    </div>
    <div class="container has-text-centered line_margin">
        <h1 class="has-text-weight-bold is-size-3-tablet">— 在庫管理Appの特徴 —</h1>
        <br>
        <div class="columns is-mobile is-centered">
          <div class="column is-2-desktop">
            <div class="is-size-4-tablet has-text-weight-bold">簡単在庫管理</div>
            <img src="/stock_icon.png"/>
          </div>
          <div class="column is-2-desktop">
            <div class="is-size-4-tablet has-text-weight-bold">どこでも使える</div>
            <img src="/cloud_icon.png"/>
          </div>
          <div class="column is-2-desktop">
            <div class="is-size-4-tablet has-text-weight-bold">完全無料</div>
            <img src="/free_icon.png"/>
          </div>
        </div>
        <br>
        <p class="has-text-weight-bold has-text-primary is-size-3-tablet">面倒な在庫管理が簡単に！</p>
        <br>
        <div class="is-size-5-tablet">今までスプレッドシートで管理していた印刷所への発注やイベントでの販売個数等の情報を、簡単な操作でミス無く管理できます</div>
        <div class="is-size-5-tablet">Googleやtwitterの共通アカウントを使って、メンバーの誰でも同じ情報にアクセスできます</div>
        <br>
        
        <div class="is-size-4-tablet has-text-weight-bold">シンプルな入庫/出庫履歴の管理</div>
        <div class="is-size-5-tablet">あらかじめ登録しておいた商品名や場所の情報を参照し、最小限の情報を入力するだけで、入庫/出庫の情報を登録することができます</div>
        <div class="is-size-5-tablet">登録した情報は新しい順番にリストで表示されます</div>
        <img src="/input_sample.gif"/>

        <div class="is-size-4-tablet has-text-weight-bold">在庫数の確認</div>
        <div class="is-size-5-tablet">入庫/出庫の履歴から在庫がどこにいくつあるのかを自動で集計し、一覧を確認することができます</div>
        <div class="is-size-5-tablet">今までに作ったものがいくつ売れたのかを確認するのにも役立ちます</div>
        <img src="/count_sample.png"/>
        <br>
        
        <p class="has-text-weight-bold has-text-primary is-size-3-tablet">PCでもスマホでも利用できる！</p>
        <br>
        <div class="is-size-5-tablet">ウェブブラウザを使って外出先からでも簡単にアクセスできます</div>
        <div class="is-size-5-tablet">レスポンシブデザイン対応で、パソコンでもスマートフォンでも同じ機能を使うことができます</div>
        <img src="/responsive_sample.gif"/>
        <br>

        <a class="columns is-mobile is-centered" href="/signin">
          <div class="column is-half">
            <div class="button is-primary is-rounded is-large is-fullwidth has-text-weight-bold">使ってみる</div>
          </div>
        </a>
      </div>

      <br>

      <footer class="footer">
        <nav class="level">
          <div class="level-item has-text-centered">
            <a class="button is-dark"  href="https://github.com/interimadd/azb-stock-management">
              <span class="icon"><i class="fa fa-lg fa-github"></i></span>
              <span>Github</span>
            </a>
          </div>
          <div class="level-item">
            <div>
              <div><strong>製作者</strong> <a href="https://twitter.com/interimadd">@interimadd</a></div>
              ご意見ご要望は上記のtwitterアカウントまでお願いします。
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div class="twitter_share">
              <button class="button is-info"  @click="twitterShare">
                <span class="icon"><i class="fa fa-lg fa-twitter"></i></span>
                <span>ツイート</span>
              </button>
            </div>
          </div>
        </nav>
      </footer>
  </div>
</template>

<script>
export default {
  methods:{
    twitterShare(){
      const tweet_content = "-同人サークルのためのクラウド在庫管理システム- 在庫管理App%0a"
      let shareURL = 'https://twitter.com/intent/tweet?text=' + tweet_content + '&url=' + "https://stock-management.interimadd.com/";  
      location.href = shareURL
    }
  }
}
</script>

<style lang="scss">
@import '~bulma';
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome';

img {
  padding: 20px;
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
  border-width: 0 0 100px 120vw ;
 
  border-color: transparent transparent #fff transparent;
}

// 画面サイズの幅が768px以上のときのみ適用
@media screen and (min-width: 768px) {
  .line_margin {
    line-height: 40px
  }
  .section1{
    /*レイアウト用のCSS*/
    padding: 50px;
  }
}

// 画面サイズの幅が768px以上のときのみ適用
@media screen and (max-width: 768px) {
  .section1{
    /*レイアウト用のCSS*/
    padding: 20px;
  }
}

footer {
  background-color: $grey-darker;
}
</style>

/**
 * 編集（追加・移動・複製・削除）の抽象化メソッド
 * 各コンポーネント固有の処理はここには書かないで継承して利用
 */
export default {
  data () {
    return {
      layer: 'result'
    };
  },

  mounted () {
    events.$on('selectPager', (layer) => {
      this.pager(layer);
    });
  },

  methods: {
    pager: function (layer) {
      if (layer !== 'result') {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
  }
};

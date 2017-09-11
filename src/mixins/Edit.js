/**
 * 編集（追加・移動・複製・削除）の抽象化メソッド
 * 各コンポーネント固有の処理はここには書かないで継承して利用
 */
export default {
  data() {
    return {
      node: this.$options.name.toLowerCase(), // 識別子
      empty: {}, // 空データ(import先で宣言してください)
      isEditing: true // ユーザーが操作中かどうか
    };
  },

  methods: {
    // 追加メソッド
    add: function (data) {
      this.beforeEdit('add');
      const index = (this.node === 'answers') ? 1 : 0; // answer の default は不正解なので
      const newItem = JSON.parse(JSON.stringify(this.empty[this.node][index]));
      data[this.node].push(newItem);
      this.afterEdit('add');
    },

    // 移動メソッド
    move: function (data, i, type) {
      this.beforeEdit('move');
      if (type === 'up') {
        data[this.node].splice(i - 1, 2, data[this.node][i], data[this.node][i - 1]);
      } else {
        data[this.node].splice(i, 2, data[this.node][i + 1], data[this.node][i]);
      }
      this.afterEdit('move', i);
    },

    // 複製メソッド
    copy: function (data, i) {
      this.beforeEdit('copy');
      this.isEditing = true;
      const newItem = JSON.parse(JSON.stringify(data[this.node][i]));
      data[this.node].splice(i + 1, 0, newItem);
      this.afterEdit('copy', i);
    },

    // 削除メソッド
    del: function (data, i) {
      this.beforeEdit('del');
      this.isEditing = true;
      data[this.node].splice(i, 1);
      this.afterEdit('del', i);
    },

    // 編集前に呼ばれる共通メソッド
    beforeEdit: function (type) {
      this.isEditing = true;
    },

    // 編集後に呼ばれる共通メソッド
    afterEdit: function (type, i = null) {
      const component = this.node.substring(0, 1).toUpperCase() + this.node.substring(1);
      // console.log(type + component, i);
      events.$emit(type + component, i); // イベントを発行する
      this.isEditing = false;
    },

    resetIds: function (data, oldIds) {
      setTimeout(() => {
        events.$emit('stopTransition');
        // 操作前のIDを振り直す
        for (const i in data[this.node]) {
          data[this.node][i].id = (typeof oldIds[i] !== 'undefined') ? oldIds[i] : '';
        }
      }, 500);
    },

  }
};

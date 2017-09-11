/**
 * json を取得するStore
 */
import Vue from 'vue';
import axios from 'axios';
const URL_BASE = '/api/data/';
export default {
  data() {
   data_list: []
  },

  components: {
   
  },


  mounted () {

  },

  destroyed () {
    
  },

  methods: {
    // Ajax通信でJsonを取得し、特定のプロパティに格納する
    // 取得したら GET_AJAX_COMPLETE で通知する
    get_ajax: function(url, name) {
      return axios.get(URL_BASE + url)
      .then((res) => {
        Vue.set(this, name, res.data);
        this.$emit('GET_AJAX_COMPLETE');
      });
    },
    // プロパティ名を指定してデータを取得
    get_data: function(name) {
      return this.$data[name];
    },
  },

  computed: {
  }

};

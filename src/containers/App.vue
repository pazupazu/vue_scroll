<template>
 <div>
  <items></items>
 </div>
</template>

<script>

// import store from '../store/Store';
import Items from '../components/Items.vue';


export default {
  data() {
    return {
      // jsondataを格納
      // data_list: []
    };
  },

  components: {
   Items,
  },

  mounted: function () {
    // sotre.$on('GET_AJAX_COMPLETE', () => {
    //   this.data_list = store.get_data('data_list');
    // });
  },

  created() {
    // // Json取得
    // store.get_ajax('', 'data_list');
    // // Json取得後に呼び出される
    // store.$on('GET_AJAX_COMPLETE', () => {
    //   this.data_list = store.get_data('data_list');
    // });
  },

  // mixins: [Store],



  destroyed () {
    
  },

  methods: {
  },

  computed: {
  }

};

</script>

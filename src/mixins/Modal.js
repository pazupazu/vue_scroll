export default {
  data () {
    return {
      imageType: 'normal'
    };
  },

  methods: {
    thumbnail: function (url) {
      if (typeof url === "string" && url !== '') {
        return `background-image:url(${url});`;
      }
      return '';
    },

    showModal: function (node = 'media') {
      // どの画像データ開いたか持っておく
      events.$emit('showModal', this.imageType, node);
    }
  }


};

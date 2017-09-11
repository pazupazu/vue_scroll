export default {
  data () {
    return {
      input: ''
    };
  },

  mounted () {
    this.$nextTick(() => {
      events.$emit('child-validator-added', this);
    });
  },

  methods: {
    focus: function (e) {
      this.input = e.target.name;
    },
    blur: function (e) {
      this.input = '';
    },
  }
};

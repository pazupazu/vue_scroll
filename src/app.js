import Vue from 'vue';
import App from './containers/App.vue';

// import './scss/create.scss';

global.events = new Vue();
new Vue(App).$mount('#root');

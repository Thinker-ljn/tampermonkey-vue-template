import App from './app.vue'
import Vue from 'vue'

const appContainer = document.createElement('div')
document.body.appendChild(appContainer)

const vm = new Vue({
  el: appContainer,
  render: h => h(App)
})

console.log(vm)
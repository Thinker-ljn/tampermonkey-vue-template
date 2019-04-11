import App from './app.vue'
import Vue from 'vue'

const appContainer = document.createElement('div')
appContainer.id = 'tampermonkey-replace-container'
document.body.appendChild(appContainer)

const vm = new Vue({
  el: appContainer,
  render: h => h(App)
})

console.log(vm)
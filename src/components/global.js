import Vue from 'vue'

const requireComponent = require.context(
  '.', true, /\.vue$/
  // 找到components文件夹下以.vue命名的文件
)

function firstToUpper2(str) {
  return str.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
    return $1.toUpperCase() + $2.toLowerCase()
  }).replace(/-/g, '')
}

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const name = componentConfig.default.name
  const componentName = firstToUpper2(name)
  console.log({ componentName })
  Vue.component(componentName, componentConfig.default || componentConfig)
})

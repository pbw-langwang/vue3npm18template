<template>
  <h2>姓名：{{ name }}</h2>
  <h2>工作名称：{{ work.name }}</h2>
  <h2>shallowRef:{{ shallowRefval.work.name }}</h2>
  <h2>aaa:{{ aaa }}</h2>
  <button @click="changeName">修改姓名</button>
  <button @click="changeWork">修改工作</button>
  <button @click="changeshallowRef">修改shallowRef</button>
  <button @click="changeaaa">修改aaa</button>
  <hr />
  <h2>pinia：{{ menuStore.openmenu }}</h2>
  <hr />
  <h2>{{ msg }}</h2>
  <input type="text" v-model="msg" />
  <hr />
  <input type="checkbox" value="111" v-model="arr" />111
  <input type="checkbox" value="222" v-model="arr" />222
  <input type="checkbox" value="333" v-model="arr" />333
  <input type="checkbox" value="444" v-model="arr" />444
  <hr />
  <input type="checkbox" value="111" v-model="arr2" />111
  <input type="checkbox" value="222" v-model="arr2" />222
  <input type="checkbox" value="333" v-model="arr2" />333
  <input type="checkbox" value="444" v-model="arr2" />444
  <hr />
  <h2>man.like:{{ like }}</h2>
  <button @click="changelike">修改like</button>
  <h2>man2.like2:{{ like2 }}</h2>
  <button @click="changelike2">修改like2</button>
  <hr />
  <img style="width: 100px" :src="imgurl" />
  <hr />
  <input type="text" v-model="debounceval" />
  <p>{{ debounceval }}</p>
</template>

<script setup name="preson123">
import { useMenuStore } from '@/store/menu'
// 读取文件内容 加上?raw
import imgurl from '@/assets/imgs/img.dataurl?raw'
import { MydebouncedRef } from '@/hooks/useDebounceRef.js'
import { sliceByPoint } from '@/utils/tools'
import { addMethod } from '@/hooks/useOverloadFun.js'

let person = reactive({
  name: 'pw',
  work: {
    name: 'ffafas',
    time: 'fasdafsf'
  }
})
let { work, name } = person
console.log(`output->work`, work, name)
let shallowRefval = shallowRef({
  work: {
    name: 'aaaa',
    time: 'bbbb'
  }
})
let aaa = 'aaa'

const changeName = () => {
  name += '!'
}
const changeWork = () => {
  work.name += '!'
}
const changeshallowRef = () => {
  shallowRefval.value.work.name += '!'
}
const changeaaa = () => {
  aaa += '!'
}

let menuStore = useMenuStore()
console.log(`output->menuStore`, menuStore)

let temp = 'hello'
let msg = customRef((track, trigger) => {
  return {
    get() {
      track()
      console.log('get')
      return temp
    },
    set(value) {
      console.log('set', value)
      temp = value
      trigger()
    }
  }
})

// 不知道为什么，有时候点了上面，再点下面，上面的勾选失效
let arr = reactive([])
setTimeout(() => {
  arr[0] = 111
}, 1000)
let arr2 = ref([])
setTimeout(() => {
  arr2.value[0] = 111
}, 1000)
watch([arr, arr2], (newval, oldValue) => {
  console.log(newval, oldValue)
})

let man = { name: 'xiaoman', age: '23', like: 'jk' }
let like = toRef(man, 'like')
console.log(`output->like`, like)
const changelike = () => {
  like.value = 'llt'
}
let man2 = reactive({ name: 'xiaoman', age: '23', like: 'jk' })
let like2 = toRef(man2, 'like')
console.log(`output->like2`, like2)
const changelike2 = () => {
  like2.value = 'llt'
}

let debounceval = MydebouncedRef('111', 1000)

let str = '阿是吉娃娃🐶他说的纷'
console.log(str.slice(3, 6))
console.log(sliceByPoint(str, 3, 6))

let fun = {}
addMethod(fun, 'find', () => {
  console.log(1)
})
addMethod(fun, 'find', (name) => {
  console.log(2)
})
addMethod(fun, 'find', (name, age) => {
  console.log(3)
})
fun.find()
fun.find('1')
fun.find('1', '2')
fun.find()
</script>

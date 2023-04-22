// 监听 + 更新
import {useStore} from './utils/Store'
Page({
  updateState(){
    //调用过useStore应用全局状态的页面可以直接使用this.$store更新，无需引入setStore
    this.$store.setStore({message:'新状态111'})
  }
  onLoad(){
    //useStore如果不传第二个参数，会应用所有的全局状态到当前的页面或者组件，传了第二个参数则只会在当前页面
    //或者组件上添加指定的状态
    useStore(this,{
       message:'新状态'
    })
  }
})

// 只更新
import {setStore} from './utils/Store'
Page({
  updateState(){
    //直接使用setStore更新状态
    setStore({message:'新状态111'})
  }
})
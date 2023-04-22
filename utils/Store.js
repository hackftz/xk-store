//全局状态共享
class Store {
  constructor(options) {
    this.state = options.state; //全局状态
    this.dep = {}; //状态依赖
  }
  //添加依赖
  addDep(page, state) {
    // key唯一
    for (let key in state) {
      this.state[key] = state[key];

      if (!this.dep[key]) {
        this.dep[key] = {
          pages: [],
          pageIds: {}, //不重复添加
        };
      }

      let pageId = page.__route__;
      if (!this.dep[key].pageIds[pageId]) {
        this.dep[key].pageIds[page.__route__] = 1;
        this.dep[key].pages.push(page);
      }
    }
    // console.log(option)
    page.setData(state);
  }
  //移除卸载的页面
  removeDep(page, state) {
    for (let key in state) {
      if (this.dep[key]) {
        this.dep[key].pages = this.dep[key].pages.filter((item) => {
          if (item.__route__ == page.__route__) {
            this.dep[key].pageIds[page.__route__] = null;
          }
          return item.__route__ != page.__route__;
        });
      }
    }
  }
  //更新状态
  setStore(state) {
    for (let key in state) {
      this.state[key] = state[key];
      // console.log(key,this.state[key])
      this.dep[key].pages.forEach((page) => {
        page.setData(state);
        // console.log(page)
      });
    }
  }
}
//初始化全局状态
export function initStore(app, store) {
  app.$store = new Store(store);
}
//page或者component调用
export function useStore(page, state) {
  let store = getApp().$store;
  if (!state) {
    //不定义自己要使用的状态，会应用全部状态
    state = store.state;
  }
  if (!page.$store) {
    //状态初始化每个界面只调用一次，后续调用不生效
    page.$store = store;
    // console.log(page)
    //卸载页面时在页面中移除当前页面
    page.onUnload = function () {
      store.removeDep(page, state);
    };
    store.addDep(page, state);
  }
}
//在不应用全局状态的界面提供更新全局状态方法
export function setStore(state) {
  let store = getApp().$store;
  store.setStore(state);
}

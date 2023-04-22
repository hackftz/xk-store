import { initStore } from "./utils/Store";

App({
  onLanuch() {
    initStore(this, {
      state: {
        message: "全局状态",
      },
    });
  },
});

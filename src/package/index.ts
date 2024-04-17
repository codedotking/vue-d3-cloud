import WordCloud from "./WordCloud.vue";

// 按需引入
export { WordCloud };

const component = [WordCloud];

export default {
  install(App:any) {
    component.forEach((item) => {
      App.component(item.name, item);
    });
  },
};

"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "answer",
  setup(__props) {
    const mainText = common_vendor.ref("");
    const subText = common_vendor.ref("");
    const numberNo = common_vendor.ref("");
    const isLoading = common_vendor.ref(true);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const fetchData = () => {
      return new Promise((resolve, reject) => {
        common_vendor.index.request({
          url: "https://www.njmmxx.com/prod-api/bookanswer/random",
          method: "GET",
          success: (response) => {
            if (response.statusCode === 200 && response.data.code === 200) {
              const data = response.data.data;
              resolve({
                mainText: data.chinese,
                subText: data.english,
                numberNo: data.id.toString()
              });
            } else {
              reject("请求失败");
            }
          },
          fail: (error) => {
            reject(error);
          }
        });
      });
    };
    function goQuestion() {
      common_vendor.index.navigateBack({
        url: "/pages/question/question"
      });
    }
    common_vendor.onMounted(async () => {
      try {
        await delay(3e3);
        const data = await fetchData();
        mainText.value = data.mainText;
        subText.value = data.subText;
        numberNo.value = data.numberNo;
      } catch (error) {
        console.error("获取数据失败", error);
        mainText.value = "获取数据失败";
        subText.value = "";
        numberNo.value = "";
      } finally {
        isLoading.value = false;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: !isLoading.value ? 1 : "",
        b: common_vendor.t(mainText.value),
        c: common_vendor.t(subText.value),
        d: common_vendor.o(goQuestion),
        e: common_vendor.t(numberNo.value),
        f: !isLoading.value ? 1 : ""
      };
    };
  }
};
qq.createPage(_sfc_main);

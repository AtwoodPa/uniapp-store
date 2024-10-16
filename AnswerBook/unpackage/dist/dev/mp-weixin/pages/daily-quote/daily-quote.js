"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "daily-quote",
  setup(__props) {
    const displayedText = common_vendor.ref("加载中...");
    const fetchQuote = () => {
      common_vendor.index.request({
        url: "https://v1.hitokoto.cn",
        method: "GET",
        success: (res) => {
          if (res.statusCode === 200) {
            const quote = res.data.hitokoto;
            typeQuote(quote);
          } else {
            displayedText.value = "请稍后再来哦~";
          }
        },
        fail: () => {
          displayedText.value = "请稍后再来哦~~";
        }
      });
    };
    const typeQuote = (quote) => {
      displayedText.value = "";
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        if (charIndex < quote.length) {
          displayedText.value += quote[charIndex];
          charIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
    };
    function goHome() {
      common_vendor.index.navigateBack({
        url: "/pages/index/index"
      });
    }
    fetchQuote();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(displayedText.value),
        b: common_vendor.o(fetchQuote),
        c: common_vendor.o(goHome)
      };
    };
  }
};
wx.createPage(_sfc_main);

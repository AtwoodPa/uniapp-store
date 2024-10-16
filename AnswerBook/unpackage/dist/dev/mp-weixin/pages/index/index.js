"use strict";
const common_vendor = require("../../common/vendor.js");
const fullText = "解答你的世界里正在发生的一切";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const displayedText = common_vendor.ref("");
    const typeText = () => {
      displayedText.value = "";
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        if (charIndex < fullText.length) {
          displayedText.value += fullText[charIndex];
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            typeText();
          }, 3e3);
        }
      }, 100);
    };
    common_vendor.onMounted(() => {
      typeText();
    });
    function goToQuestion() {
      common_vendor.index.navigateTo({
        url: "/pages/question/question"
      });
    }
    function goToDailyQuote() {
      common_vendor.index.navigateTo({
        url: "/pages/daily-quote/daily-quote"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(displayedText.value),
        b: common_vendor.o(goToQuestion),
        c: common_vendor.o(goToDailyQuote)
      };
    };
  }
};
wx.createPage(_sfc_main);

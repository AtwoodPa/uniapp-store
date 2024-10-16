"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "question",
  setup(__props) {
    const exampleQuestions = common_vendor.ref([
      "他喜欢我吗？",
      "我需要换个工作吗？",
      "今年我的运势如何？",
      "我该投资什么项目？",
      "我会发财吗？",
      "我的健康状况会好吗？",
      "我该接受那个提议吗？",
      "我该搬家吗？",
      "我会遇到真爱吗？",
      "我该继续学习吗？",
      "我会成功吗？",
      "我的家人会支持我吗？",
      "我会环游世界吗？",
      "我该开始新的事业吗？",
      "我会得到那个工作吗？",
      "我会找到新的朋友吗？",
      "我的梦想会成真吗？",
      "我该买那个房子吗？",
      "我会有孩子吗？",
      "我该追随我的激情吗？"
    ]);
    const currentQuestion = common_vendor.ref("");
    const displayedText = common_vendor.ref("");
    const isLoading = common_vendor.ref(true);
    const userInput = common_vendor.ref("");
    let questionIndex = 0;
    let typingInterval = null;
    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    const typeQuestion = (question) => {
      displayedText.value = "";
      let charIndex = 0;
      typingInterval = setInterval(() => {
        if (charIndex < question.length) {
          displayedText.value += question[charIndex];
          charIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
    };
    const switchQuestion = () => {
      if (exampleQuestions.value.length > 0) {
        currentQuestion.value = exampleQuestions.value[questionIndex];
        typeQuestion(currentQuestion.value);
        questionIndex = (questionIndex + 1) % exampleQuestions.value.length;
      }
    };
    common_vendor.onMounted(() => {
      exampleQuestions.value = shuffleArray(exampleQuestions.value);
      isLoading.value = false;
      switchQuestion();
      setInterval(switchQuestion, 5e3);
    });
    function goToAnswer() {
      if (!userInput.value) {
        common_vendor.index.showModal({
          title: "提示",
          content: "请输入你的心声后再寻找答案。",
          showCancel: false
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/answer/answer"
        });
      }
    }
    function goHome() {
      common_vendor.index.redirectTo({
        url: "/pages/index/index"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !isLoading.value
      }, !isLoading.value ? {
        b: common_vendor.t(displayedText.value)
      } : {}, {
        c: userInput.value,
        d: common_vendor.o(($event) => userInput.value = $event.detail.value),
        e: common_vendor.o(goToAnswer),
        f: common_vendor.o(goHome)
      });
    };
  }
};
wx.createPage(_sfc_main);

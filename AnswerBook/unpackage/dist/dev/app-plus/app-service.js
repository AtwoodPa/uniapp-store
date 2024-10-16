if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _imports_0$2 = "/static/logo.png";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const fullText = "解答你的世界里正在发生的一切";
  const _sfc_main$4 = {
    __name: "index",
    setup(__props) {
      const displayedText = vue.ref("");
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
      vue.onMounted(() => {
        typeText();
      });
      function goToQuestion() {
        uni.navigateTo({
          url: "/pages/question/question"
        });
      }
      function goToDailyQuote() {
        uni.navigateTo({
          url: "/pages/daily-quote/daily-quote"
        });
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
          vue.createElementVNode("view", { class: "text-area" }, [
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", { class: "title" }, "《答案之书》")
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", { class: "subtitle" }, "THE BOOK OF ANSWERS")
            ])
          ]),
          vue.createElementVNode("image", {
            class: "mandala",
            src: _imports_0$2
          }),
          vue.createElementVNode("view", { class: "description" }, [
            vue.createElementVNode(
              "text",
              { class: "desc-text" },
              vue.toDisplayString(displayedText.value),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("view", { class: "buttons" }, [
            vue.createElementVNode("button", {
              class: "answer-button",
              onClick: goToQuestion
            }, "寻找答案"),
            vue.createElementVNode("button", {
              class: "daily-quote-button",
              onClick: goToDailyQuote
            }, "每日一言")
          ]),
          vue.createElementVNode("view", { class: "footer" }, [
            vue.createElementVNode("text", { class: "footer-text" }, "人生总会有很多疑问，你需要这本《答案之书》")
          ])
        ]);
      };
    }
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "/Library/PP/uniapp/AnswerBook/AnswerBook/pages/index/index.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _imports_0$1 = "/static/logo.png";
  const _sfc_main$3 = {
    __name: "answer",
    setup(__props) {
      const mainText = vue.ref("");
      const subText = vue.ref("");
      const numberNo = vue.ref("");
      const isLoading = vue.ref(true);
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const fetchData = () => {
        return new Promise((resolve, reject) => {
          uni.request({
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
        uni.navigateBack({
          url: "/pages/question/question"
        });
      }
      vue.onMounted(async () => {
        try {
          await delay(3e3);
          const data = await fetchData();
          mainText.value = data.mainText;
          subText.value = data.subText;
          numberNo.value = data.numberNo;
        } catch (error) {
          formatAppLog("error", "at pages/answer/answer.vue:85", "获取数据失败", error);
          mainText.value = "获取数据失败";
          subText.value = "";
          numberNo.value = "";
        } finally {
          isLoading.value = false;
        }
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createElementVNode("view", { class: "card" }, [
            vue.createCommentVNode(" 根据 isLoading 状态来控制旋转 "),
            vue.createElementVNode(
              "image",
              {
                class: vue.normalizeClass(["mandala", { "stop-rotate": !isLoading.value }]),
                src: _imports_0$1
              },
              null,
              2
              /* CLASS */
            ),
            vue.createCommentVNode(" 当 isLoading 为 false 时显示文字 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["text-section", { "show-text": !isLoading.value }])
              },
              [
                vue.createElementVNode("view", null, [
                  vue.createElementVNode(
                    "text",
                    { class: "main-text" },
                    vue.toDisplayString(mainText.value),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode(
                    "text",
                    { class: "sub-text" },
                    vue.toDisplayString(subText.value),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("button", {
                  class: "retry-button",
                  onClick: goQuestion
                }, "再问一次"),
                vue.createElementVNode("view", { class: "footer" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "footer-text" },
                    "NO." + vue.toDisplayString(numberNo.value),
                    1
                    /* TEXT */
                  )
                ])
              ],
              2
              /* CLASS */
            )
          ])
        ]);
      };
    }
  };
  const PagesAnswerAnswer = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "/Library/PP/uniapp/AnswerBook/AnswerBook/pages/answer/answer.vue"]]);
  const _imports_0 = "/static/answer-card-black.png";
  const _sfc_main$2 = {
    __name: "daily-quote",
    setup(__props) {
      const displayedText = vue.ref("加载中...");
      const fetchQuote = () => {
        uni.request({
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
            displayedText.value = "请稍后再来哦~";
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
        uni.navigateBack({
          url: "/pages/index/index"
        });
      }
      fetchQuote();
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createElementVNode("image", {
            class: "background-image",
            src: _imports_0
          }),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createElementVNode("view", { class: "quote-section" }, [
              vue.createElementVNode(
                "text",
                { class: "quote-text" },
                vue.toDisplayString(displayedText.value),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "button-section" }, [
              vue.createElementVNode("button", {
                class: "action-button",
                onClick: fetchQuote
              }, "再来一句"),
              vue.createElementVNode("button", {
                class: "action-button",
                onClick: goHome
              }, "回到首页")
            ])
          ])
        ]);
      };
    }
  };
  const PagesDailyQuoteDailyQuote = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "/Library/PP/uniapp/AnswerBook/AnswerBook/pages/daily-quote/daily-quote.vue"]]);
  const _sfc_main$1 = {
    __name: "question",
    setup(__props) {
      const exampleQuestions = vue.ref([
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
      const currentQuestion = vue.ref("");
      const displayedText = vue.ref("");
      const isLoading = vue.ref(true);
      const userInput = vue.ref("");
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
      vue.onMounted(() => {
        exampleQuestions.value = shuffleArray(exampleQuestions.value);
        isLoading.value = false;
        switchQuestion();
        setInterval(switchQuestion, 5e3);
      });
      function goToAnswer() {
        if (!userInput.value) {
          uni.showModal({
            title: "提示",
            content: "请输入你的心声后再寻找答案。",
            showCancel: false
          });
        } else {
          uni.navigateTo({
            url: "/pages/answer/answer"
          });
        }
      }
      function goHome() {
        uni.redirectTo({
          url: "/pages/index/index"
        });
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createElementVNode("view", { class: "instructions" }, [
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", { class: "instruction-text" }, "心中默念你的问题")
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", { class: "instruction-text" }, "跟随内心的引导")
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", { class: "instruction-text" }, "选择一个数字")
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", { class: "instruction-text" }, "宇宙将会给你答案")
            ])
          ]),
          vue.createElementVNode("view", { class: "example" }, [
            vue.createElementVNode("view", { class: "example-content-wrapper" }, [
              !isLoading.value ? (vue.openBlock(), vue.createElementBlock(
                "text",
                {
                  key: 0,
                  class: "example-content"
                },
                vue.toDisplayString(displayedText.value),
                1
                /* TEXT */
              )) : (vue.openBlock(), vue.createElementBlock("text", {
                key: 1,
                class: "example-content"
              }, "加载中..."))
            ])
          ]),
          vue.createElementVNode("view", { class: "input-section" }, [
            vue.createElementVNode("text", { class: "input-label" }, "写下你的心声"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "number-input",
                placeholder: "来自宇宙的召唤~",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => userInput.value = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, userInput.value]
            ])
          ]),
          vue.createElementVNode("view", { class: "button-section" }, [
            vue.createElementVNode("button", {
              class: "search-button",
              onClick: goToAnswer
            }, "寻找答案"),
            vue.createElementVNode("button", {
              class: "search-button",
              onClick: goHome
            }, "回到首页")
          ])
        ]);
      };
    }
  };
  const PagesQuestionQuestion = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "/Library/PP/uniapp/AnswerBook/AnswerBook/pages/question/question.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/answer/answer", PagesAnswerAnswer);
  __definePage("pages/daily-quote/daily-quote", PagesDailyQuoteDailyQuote);
  __definePage("pages/question/question", PagesQuestionQuestion);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Library/PP/uniapp/AnswerBook/AnswerBook/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);

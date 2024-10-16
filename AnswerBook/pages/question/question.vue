<template>
  <view class="container">
    <view class="instructions">
      <view><text class="instruction-text">心中默念你的问题</text></view>
      <view><text class="instruction-text">跟随内心的引导</text></view>
      <view><text class="instruction-text">选择一个数字</text></view>
      <view><text class="instruction-text">宇宙将会给你答案</text></view>
    </view>

    <view class="example">
      <view class="example-content-wrapper">
        <text class="example-content" v-if="!isLoading">{{ displayedText }}</text>
        <text class="example-content" v-else>加载中...</text>
      </view>
    </view>

    <view class="input-section">
      <text class="input-label">写下你的心声</text>
      <input class="number-input" placeholder="来自宇宙的召唤~" v-model="userInput" />
    </view>

    <view class="button-section">
      <button class="search-button" @click="goToAnswer">寻找答案</button>
      <button class="search-button" @click="goHome">回到首页</button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 定义热门问题的数组
const exampleQuestions = ref([
  '他喜欢我吗？',
  '我需要换个工作吗？',
  '今年我的运势如何？',
  '我该投资什么项目？',
  '我会发财吗？',
  '我的健康状况会好吗？',
  '我该接受那个提议吗？',
  '我该搬家吗？',
  '我会遇到真爱吗？',
  '我该继续学习吗？',
  '我会成功吗？',
  '我的家人会支持我吗？',
  '我会环游世界吗？',
  '我该开始新的事业吗？',
  '我会得到那个工作吗？',
  '我会找到新的朋友吗？',
  '我的梦想会成真吗？',
  '我该买那个房子吗？',
  '我会有孩子吗？',
  '我该追随我的激情吗？'
]);

const currentQuestion = ref(''); // 当前显示的问题
const displayedText = ref(''); // 逐字显示的问题文本
const isLoading = ref(true); // 控制加载状态
const userInput = ref(''); // 绑定输入框的值

let questionIndex = 0; // 当前显示的问题索引
let typingInterval = null; // 定时器引用

// 洗牌函数，用于随机打乱数组顺序
const shuffleArray = (array) => {
  const newArray = [...array]; // 克隆原始数组以避免直接修改
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 随机选择位置
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // 交换位置
  }
  return newArray;
};

// 逐字显示问题的函数
const typeQuestion = (question) => {
  displayedText.value = ''; // 去掉占位符，避免布局变化
  let charIndex = 0;
  typingInterval = setInterval(() => {
    if (charIndex < question.length) {
      displayedText.value += question[charIndex];
      charIndex++;
    } else {
      clearInterval(typingInterval);
    }
  }, 100); // 每100ms显示一个字
};

// 切换问题的函数
const switchQuestion = () => {
  if (exampleQuestions.value.length > 0) {
    currentQuestion.value = exampleQuestions.value[questionIndex];
    typeQuestion(currentQuestion.value);
    questionIndex = (questionIndex + 1) % exampleQuestions.value.length; // 循环切换
  }
};

// 页面加载时调用
onMounted(() => {
  // 乱序处理热门问题
  exampleQuestions.value = shuffleArray(exampleQuestions.value);
  isLoading.value = false; // 停止显示"加载中"
  switchQuestion(); // 初始化显示第一个问题

  // 每5秒切换一次问题（包括打字时间）
  setInterval(switchQuestion, 5000);
});

// 点击按钮后的跳转处理
function goToAnswer() {
  if (!userInput.value) {
    uni.showModal({
      title: '提示',
      content: '请输入你的心声后再寻找答案。',
      showCancel: false
    });
  } else {
    uni.navigateTo({
      url: '/pages/answer/answer'
    });
  }
}

function goHome() {
  uni.redirectTo({
    url: '/pages/index/index' 
  });
}
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #0a0c0f;
    color: #f1c40f;
    padding: 20rpx;
  }

  .instructions {
    position: fixed;
    top: 150rpx;
    left: 0;
    right: 0;
    text-align: center;
    background-color: #0a0c0f;
    padding: 20rpx;
    z-index: 10;
  }

  .instruction-text {
    font-size: 32rpx;
    line-height: 50rpx;
    color: #f1c40f;
  }

  .example {
    text-align: center;
    margin-top: 160rpx;
    margin-bottom: 40rpx;
    height: 40rpx;
  }

  .example-content {
    font-size: 28rpx;
    color: #f1c40f;
    width: 400rpx;
    height: 40rpx;
  }
  
  .input-section {
    width: 70%;
    margin-top: 50rpx;
    margin-bottom: 30rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-label {
    font-size: 28rpx;
    color: #f1c40f;
    margin-bottom: 20rpx;
    text-align: center;
  }

  .number-input {
    width: 100%;
    padding: 20rpx;
    border: 1rpx solid #f1c40f;
    border-radius: 10rpx;
    background-color: #000;
    color: #f1c40f;
  }

  .search-button {
    width: 250rpx;
    padding: 5rpx;
    background-color: #1a1a1a;
    color: #f1c40f;
    border: 1rpx solid #f1c40f;
    border-radius: 10rpx;
    text-align: center;
    margin: 40rpx 0;
  }
</style>

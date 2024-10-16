<template>
  <view class="content">
    <view class="text-area">
      <view>
        <text class="title">《答案之书》</text>
      </view>
      <view>
        <text class="subtitle">THE BOOK OF ANSWERS</text>
      </view>
    </view>
    
    <image class="mandala" src="http://imgcom.static.suishenyun.net/back.png"></image>
    
    <view class="description">
      <text class="desc-text">{{ displayedText }}</text>
    </view>
    
    <view class="buttons">
      <button class="answer-button" @click="goToQuestion">寻找答案</button>
      <button class="daily-quote-button" @click="goToDailyQuote">每日一言</button>
    </view>
    
    <view class="footer">
      <text class="footer-text">人生总会有很多疑问，你需要这本《答案之书》</text>
    </view>
  </view>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const fullText = '解答你的世界里正在发生的一切'; // 完整的文本
const displayedText = ref(''); // 用于显示的文本

// 逐字显示文本的函数
const typeText = () => {
  displayedText.value = ''; // 清空之前的文本
  let charIndex = 0;
  const typingInterval = setInterval(() => {
    if (charIndex < fullText.length) {
      displayedText.value += fullText[charIndex];
      charIndex++;
    } else {
      clearInterval(typingInterval); // 完成后清除定时器
      setTimeout(() => {
        // 等待3秒后再次调用打字机效果
        typeText();
      }, 3000); // 3000ms = 3秒
    }
  }, 100); // 每100ms显示一个字
};

// 页面加载时调用打字机效果
onMounted(() => {
  typeText();
});

function goToQuestion() {
  uni.navigateTo({
    url: '/pages/question/question'
  });
}

function goToDailyQuote() {
  uni.navigateTo({
    url: '/pages/daily-quote/daily-quote'
  });
}
</script>

<style>

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #0a0c0f; /* 深色背景 */
  color: #f1c40f; /* 金色文字 */
  position: relative;
}

.text-area {
  text-align: center;
  margin-top: 20rpx;
}

.title {
  font-size: 90rpx;
  font-weight: bold;
  color: #f1c40f;
}

.subtitle {
  font-size: 28rpx;
  margin-top: 10rpx;
  color: #f1c40f;
}

.mandala {
  width: 700rpx;
  height: 700rpx;
  margin: 60rpx 0;
}

.description {
  text-align: center;
  margin: 60rpx 0;
  height: 32rpx;
}

.desc-text {
  font-size: 32rpx;
  color: #f1c40f;
}

.buttons {
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 40rpx;
}

.answer-button,
.daily-quote-button {
  width: 45%;
  padding: 5rpx;
  background-color: #1e1e1e;
  color: #f1c40f;
  border: 1rpx solid #f1c40f;
  border-radius: 10rpx;
  text-align: center;
  margin-bottom: 40rpx; /* 确保文字与底部边缘有足够的距离 */
}

.footer {
  text-align: center;
  margin-top: auto; /* 自动向上对齐 */
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 25rpx; /* 确保文字与底部边缘有足够的距离 */
}

.footer-text {
  font-size: 24rpx;
  color: #f1c40f;
}
</style>

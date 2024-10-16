<template>
  <view class="container">
    <view class="quote-section">
      <text class="quote-text">{{ displayedText }}</text>
    </view>

    <view class="button-section">
      <button class="action-button" @click="fetchQuote">再来一句</button>
      <button class="action-button" @click="goHome">回到首页</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const displayedText = ref('加载中...');

// 获取一言数据的函数
const fetchQuote = () => {
  uni.request({
    url: 'https://v1.hitokoto.cn',
    method: 'GET',
    success: (res) => {
      if (res.statusCode === 200) {
        const quote = res.data.hitokoto;
        typeQuote(quote); // 调用逐字显示函数
      } else {
        displayedText.value = '请稍后再来哦~';
      }
    },
    fail: () => {
      displayedText.value = '请稍后再来哦~~';
    }
  });
};

// 逐字显示文本的函数
const typeQuote = (quote) => {
  displayedText.value = ''; // 清空当前显示的文本
  let charIndex = 0;
  const typingInterval = setInterval(() => {
    if (charIndex < quote.length) {
      displayedText.value += quote[charIndex];
      charIndex++;
    } else {
      clearInterval(typingInterval);
    }
  }, 100); // 每100ms显示一个字
};
function goHome() {
    uni.navigateBack({
      url: '/pages/index/index' 
    });
  }

// 页面加载时调用获取数据
fetchQuote();
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  background-color: #2c2c2c; /* 背景色 */
  color: #f1c40f; /* 金色文字 */
  padding: 20rpx;
  position: relative;
  background-image: url('https://imgcom.static.suishenyun.net/202408241330985.png'); /* 设置背景图片 */
  background-size: cover; /* 让图片覆盖整个容器 */
  background-position: center; /* 图片居中显示 */
  margin: 0;
  overflow: hidden;
}

.quote-section {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quote-text {
  font-size: 40rpx;
  color: #f1c40f;
  text-align: center;
}

.button-section {
  margin-bottom: 80rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.action-button {
  width: 250rpx;
  padding: 5rpx;
  background-color: #1a1a1a;
  color: #f1c40f;
  border-radius: 5rpx;
  border: 1rpx solid #f1c40f;
  text-align: center;
  margin-bottom: 20rpx;
}
</style>

<template>
  <view class="container">
    <view class="card">
      <!-- 根据 isLoading 状态来控制旋转 -->
      <image 
        class="mandala" 
        :class="{ 'stop-rotate': !isLoading }" 
        src="http://imgcom.static.suishenyun.net/back.png"
      ></image>
      
      <!-- 当 isLoading 为 false 时显示文字 -->
      <view 
        class="text-section" 
        :class="{ 'show-text': !isLoading }"
      >
        <view>
          <text class="main-text">{{ mainText }}</text>
        </view>
        <view>
          <text class="sub-text">{{ subText }}</text>
        </view>
        <button class="retry-button" @click="goQuestion">再问一次</button>
        <view class="footer">
          <text class="footer-text">NO.{{ numberNo }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const mainText = ref(''); // main-text 的内容
const subText = ref('');  // sub-text 的内容
const numberNo = ref('');  // sub-text 的内容
const isLoading = ref(true); // 控制旋转状态

// 设置延迟时间（例如 3 秒）
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 获取接口数据
const fetchData = () => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: 'https://www.njmmxx.com/prod-api/bookanswer/random',
      method: 'GET',
      success: (response) => {
        if (response.statusCode === 200 && response.data.code === 200) {
          const data = response.data.data;
          resolve({
            mainText: data.chinese,
            subText: data.english,
            numberNo: data.id.toString(),
          });
        } else {
          reject('请求失败');
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
    url: '/pages/question/question'
  });
}

// 页面加载时调用
onMounted(async () => {
  try {
    // 等待转盘旋转一定时间
    await delay(3000); // 例如等待 3 秒

    // 获取数据
    const data = await fetchData();
    mainText.value = data.mainText;
    subText.value = data.subText;
    numberNo.value = data.numberNo;
  } catch (error) {
    console.error('获取数据失败', error);
    mainText.value = '获取数据失败';
    subText.value = '';
    numberNo.value = '';
  } finally {
    isLoading.value = false; // 数据加载完毕，停止旋转
  }
});
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    background-color: #1a1a1a;
    color: #f1c40f;
    padding: 20rpx;
  }

  .card {
    position: relative; /* 设置为相对定位 */
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 50rpx;
    border: 1rpx solid #f1c40f;
    margin: 30rpx 0;
    background-image: url('https://imgcom.static.suishenyun.net/202408241330985.png'); /* 设置背景图片 */
    background-size: cover; /* 让图片覆盖整个容器 */
    background-position: center; /* 图片居中显示 */
  }

  .mandala {
    width: 400rpx;
    height: 400rpx;
    margin-top: 100rpx;
    animation: rotate 2s linear infinite;
  }
  
  .text-section {
    text-align: center;
    margin-top: 100rpx;
    opacity: 0; /* 初始状态隐藏 */
    transition: opacity 1s ease-in; /* 文字渐进呈现 */
  }
  
  .main-text {
    font-size: 50rpx;
    color: #f1c40f;
    margin-top: 40rpx;
  }
  
  .sub-text {
    font-size: 28rpx;
    color: #f1c40f;
    margin-top: 10rpx;
  }
  
  /* 旋转动画 */
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  /* 停止旋转的类 */
  .stop-rotate {
    animation: none;
  }
  
  /* 显示文字的类 */
  .show-text {
    opacity: 1;
  }

  .retry-button {
    width: 250rpx;
    padding: 5rpx;
    background-color: #1a1a1a;
    color: #f1c40f;
    border: 1rpx solid #f1c40f;
    border-radius: 10rpx;
    text-align: center;
    margin-top: 160rpx;
  }

  .footer {
    position: absolute; /* 设置为绝对定位 */
    bottom: 10rpx; /* 将底部距离设置为10rpx */
    left: 50%;
    transform: translateX(-50%);
  }

  .footer-text {
    font-size: 30rpx;
    color: #f1c40f;
  }
</style>

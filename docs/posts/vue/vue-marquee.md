---
title: 在vue中實現跑馬燈功能
tags: [vue,組件實現]
---

## 前言
在做專案時需要跑馬燈的功能，剛好找到一個open source覺得還不錯，就去理解他實現跑馬燈的代碼思路，順便記錄下來！

## 代碼思路

- HTML結構會有兩層div，父層為固定，子層存放跑馬燈文字來進行滑動
- 透過css3 動畫 @keyframe 控制 transform: translate3d的X軸來達成文字滑動效果  
- 透過getBoundingClientRect來抓取父元素、子元素的寬度，用意是來計算偏移量以及滑動速度
- 監聽watch content變數變動時，透過添加animate class來觸發動畫
- 透過vue $nextTick方法來確保父子元素的寬度是正確的

整體流程為:   
監聽content變數是否有變化，有的話開始觸發第一次動畫特效(animate)，
等到第一次動畫結束後觸發onAnimationEnd方法，當onAnimationEnd方法執行時透過animate-infinite動畫方法已達到我們想要的無限滑動。  
  
至於為何不直接就開始觸發無限滑動呢？  
因為作者想透過firstRound這個參數來實現我們delay參數的效果與判斷開始載入跑馬燈文字時文字的位置

## 組件參數

變數名稱 | 類型 | 預設 |功能
-------|------|-----|----
content|String|     | 跑馬燈內容
delay  |Number| 0.5 | 第一次動畫延遲時間
speed  |Number| 100 | 速度(越大越慢)

## 組件代碼
```js
 <template>
  <div ref="wrap" class="wrap">
    <div ref="content" class="content" 
      :class="animationClass"
      :style="contentStyle" 
      @animationend="onAnimationEnd" 
      @webkitAnimationEnd="onAnimationEnd">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      default: ''
    },
    delay: {
      type: Number,
      default: 0.5
    },
    speed: {
      type: Number,
      default: 100
    }
  },
  mounted () {},
  data () {
    return {
      wrapWidth: 0,
      firstRound: true,
      duration: 0,
      offsetWidth: 0,
      animationClass: ''
    }
  },
  computed: {
    contentStyle () {
      return {
        paddingLeft: (this.firstRound ? 0 : this.wrapWidth) + 'px', // 若想第一次載入跑馬燈文字時，文字就在右側則將0改成this.wrapWidth即可
        animationDelay: (this.firstRound ? this.delay : 0) + 's',
        animationDuration: this.duration + 's'
      }
    }
  },
  watch: {
    content: {
      handler () {
        this.$nextTick(() => {
          const { wrap, content } = this.$refs
          const wrapWidth = wrap.getBoundingClientRect().width
          const offsetWidth = content.getBoundingClientRect().width
          this.wrapWidth = wrapWidth
          this.offsetWidth = offsetWidth
          this.duration = (offsetWidth + this.wrapWidth) / this.speed
          this.animationClass = 'animate'
        })
      }
    }
  },
  methods: {
    onAnimationEnd () {
      this.firstRound = false
      this.duration = (this.offsetWidth + this.wrapWidth) / this.speed
      this.animationClass = 'animate-infinite'
    }
  }
}
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 24px;
  position: relative;
  padding: 0;
}

.wrap .content {
  position: absolute;
  white-space: nowrap;
}

.animate {
  animation: marquee linear;
}

.animate-infinite {
  animation: marquee-infinite linear infinite;
}

@keyframes marquee {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes marquee-infinite {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
```

引用組件  

```js
//common-marquee 為元件名稱
//marquees為跑馬燈文字資料 ex: [{text:23213},{text:456789},{text:789789}]
<common-marquee :content="marquees" :speed="100"> 
    <span v-for="(item, index) in marquees" :key="index" style="margin-right:30px;">
        {{item.text}}
    </span>
</common-marquee>
```

## 後續

雖然跑馬燈的功能是蠻簡單的，但是透過閱讀別人源碼學習到了蠻多以前沒注意到的觀念。
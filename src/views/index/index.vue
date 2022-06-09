<template>
  <div :class="[1 ? 'container' : 'normal']">
    <img src="@/assets/img/index/index_title.png" class="header_title">
    <CustomTitle title="“星级”评定" v-if="statClassList.length > 0" />
    <div class="star-class">
      <div class="star-class-container" v-for="item of statClassList" :key="item.key" @click="handleStarClick(item)">
        <img v-if="item.key === 1" class="star-class-bg-img" src="@/assets/img/index/safety_production.png"/>
        <div v-if="item.key === 1" class="star-class-icon">
          <img src="@/assets/img/index/safety_production_icon.png"/>
        </div>
        <img v-if="item.key === 2" class="star-class-bg-img" src="@/assets/img/index/ecological_environment.png"/>
        <div v-if="item.key === 2" class="star-class-icon" style="left: 8px;">
          <img src="@/assets/img/index/ecological_environment_icon.png"/>
        </div>
        <span class="star-class-text">{{item.title}}</span>
      </div>
    </div>
    <CustomTitle title="企业全面自查自纠" v-if="businessTableList.length > 0" />
    <div class="business-container">
      <BusinessTable v-for="item of businessTableList" :key="item.key" :item="item" @click="handleBusinessClick" />
    </div>
    <div class="question" @click="handleQuestionClick">
      <img class="question_bg" src="@/assets/img/index/qustion_bg.png"/>
      <img class="question_icon" src="@/assets/img/index/question_icon.png"/>
      <span class="question_text">问题发现</span>
      <img class="question_left" src="@/assets/img/index/question_left.png"/>
    </div>
  </div>
</template>

<script>
const business_icon1 = require('@/assets/img/index/business_icon1.png')
const business_icon2 = require('@/assets/img/index/business_icon2.png')
const business_icon3 = require('@/assets/img/index/business_icon3.png')
export default {
  components: {
    CustomTitle: () => import('./components/CustomTitle'),
    BusinessTable: () => import('./components/BusinessTable')
  },
  data() {
    return {
      // 星级评定数组
      statClassList: [
        {
          key: 1,
          title: '安全生产“星级” 评分'
        },
        {
          key: 2,
          title: '生态环境“星级” 评定'
        }
      ],
      // 企业全面自查自纠数组
      businessTableList: [
        {
          key: 1,
          title: '企业安全生产责任制检查项目表',
          src: business_icon1,
          code: 'SELF_CORRECTION_SAFETY'
        },
        {
          key: 2,
          title: '工矿企业检查项目表',
          src: business_icon2,
          code: 'SELF_CORRECTION_MINING'
        },
        {
          key: 3,
          title: '劳动密集型企业检查项目表',
          src: business_icon3,
          code: 'SELF_CORRECTION_LABOUR'
        }
      ]
    }
  },
  methods: {
    handleStarClick(item) {
      const { key } = item
      let starKey = ''
      switch (key) {
        case 1:
          starKey = 'SAFETYRATING'
          break;
        case 2:
          starKey = 'ECOLOGY'
          break;
        default:
          break;
      }
      const obj = {
        type: 'STAR',
        starKey
      }
      this.$router.push({ path: '/list', query: { ...obj }})
    },
    // 企业全面自查自纠点击事件
    handleBusinessClick(item) {
      const { key } = item
      const obj = {
        type: 'CORRECTION',
        correctionKey: key
      }
      this.$router.push({ path: '/list', query: { ...obj }})
    },
    handleQuestionClick() {
      this.$router.push({ name: 'problemfound' })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  padding: 0 16px;
  box-sizing: border-box;

  .header_title {
    margin-top: 16px;
    height: 138px;
    width: 100%;
  }

  /* 星级评定 */
  .star-class {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .star-class-container {
    position: relative;
    width: 48%;
  }

  .star-class-icon {
    position: absolute;
    height: 32px;
    width: 35px;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;
    z-index: 2;
    img {
      height: 100%;
    }
  }

  .star-class-text {
    width: 103px;
    font-size: 11px;
    position: absolute;
    font-weight: 500;
    color: #FFFFFF;
    top: 50%;
    transform: translateY(-50%);
    right: 0px;
    z-index: 2;
  }

  .star-class-bg-img {
    width: 100%;
    height: 64px;
    position: relative;
    z-index: 1;
  }

  /* 企业全面自查自纠 */
  .business-container {
    display: flex;
    justify-content: space-between;
  }

  /* 问题发现 */
  .question {
    padding-top: 20px;
    position: relative;
  }
  .question_bg {
    height: 54px;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .question_icon {
    left: 12px;
    position: absolute;
    height: 32px;
    width: 32px;
    z-index: 2;
    top: 30px;
  }

  .question_text {
    position: absolute;
    left: 58px;
    line-height: 54px;
    font-weight: 500;
    color: #FFFFFF;
    z-index: 2;
  }

  .question_left {
    position: absolute;
    z-index: 2;
    right: 10px;
    width: 16px;
    height: 16px;
    top: 38px;
  }
}

.normal {
  background: red;
}
</style>

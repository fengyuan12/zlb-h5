<template>
  <div :class="[isNormal ? 'normal_container' : 'elder_container']">
    <img :src="isNormal ? normal_header_img : elder_header_img" class="header_title">
    <CustomTitle title="“星级”评定" v-if="statClassList.length > 0" />
    <div class="star-class">
      <div class="star-class-container" v-for="item of statClassList" :key="item.key" @click="handleStarClick(item)">
        <img v-if="item.key === 1" class="star-class-bg-img" :src="isNormal ? safety_production : safety_production_elder"/>
        <div v-if="item.key === 1" class="star-class-icon">
          <img :src="isNormal ? safety_production_icon : safety_production_icon_elder"/>
        </div>
        <img v-if="item.key === 2" class="star-class-bg-img" :src="isNormal ? ecological_environment : ecological_environment_elder"/>
        <div v-if="item.key === 2" class="star-class-icon">
          <img :src="isNormal ? ecological_environment_icon : ecological_environment_icon_elder"/>
        </div>
        <span class="star-class-text">{{item.title}}</span>
      </div>
    </div>
    <CustomTitle title="企业全面自查自纠" v-if="businessTableList.length > 0" />
    <div class="business-container">
      <BusinessTable :is-normal="isNormal" v-for="item of businessTableList" :key="item.key" :item="item" @click="handleBusinessClick" />
    </div>
    <div class="question" @click="handleQuestionClick">
      <img class="question_bg" :src="isNormal ? qustion_bg : qustion_bg_elder"/>
      <img class="question_icon" :src="isNormal ? question_icon : question_icon_elder"/>
      <span class="question_text">问题发现</span>
      <img class="question_left" :src="isNormal ? question_left : question_left_elder"/>
    </div>
  </div>
</template>

<script>
const business_icon1 = require('@/assets/img/index/business_icon1.png')
const business_icon2 = require('@/assets/img/index/business_icon2.png')
const business_icon3 = require('@/assets/img/index/business_icon3.png')
const business_icon1_elder = require('@/assets/img/index_elder/business_icon1.png')
const business_icon2_elder = require('@/assets/img/index_elder/business_icon2.png')
const business_icon3_elder = require('@/assets/img/index_elder/business_icon3.png')
const normal_header_img = require('@/assets/img/index/index_title.png')
const elder_header_img = require('@/assets/img/index_elder/index_title.png')
const safety_production = require('@/assets/img/index/safety_production.png')
const safety_production_elder = require('@/assets/img/index_elder/safety_production.png')
const safety_production_icon = require('@/assets/img/index/safety_production_icon.png')
const safety_production_icon_elder = require('@/assets/img/index_elder/safety_production_icon.png')
const ecological_environment = require('@/assets/img/index/ecological_environment.png')
const ecological_environment_elder = require('@/assets/img/index_elder/ecological_environment.png')
const ecological_environment_icon = require('@/assets/img/index/ecological_environment_icon.png')
const ecological_environment_icon_elder = require('@/assets/img/index_elder/ecological_environment_icon.png')
const qustion_bg = require('@/assets/img/index/qustion_bg.png')
const qustion_bg_elder = require('@/assets/img/index_elder/qustion_bg.png')
const question_icon = require('@/assets/img/index/question_icon.png')
const question_icon_elder = require('@/assets/img/index_elder/question_icon.png')
const question_left = require('@/assets/img/index/question_left.png')
const question_left_elder = require('@/assets/img/index_elder/question_left.png')
import { UiStyle } from '@/mixins/uistyle'
import Api from '@/api/login'
import { removeToken, setToken, getToken } from '@/utils/token'
import { TOKEN } from '@/utils/constant'
export default {
  mixins: [UiStyle],
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
      businessTableList: [],
      normal_header_img,
      elder_header_img,
      safety_production,
      safety_production_elder,
      safety_production_icon,
      safety_production_icon_elder,
      ecological_environment,
      ecological_environment_elder,
      ecological_environment_icon,
      ecological_environment_icon_elder,
      qustion_bg,
      qustion_bg_elder,
      question_icon,
      question_icon_elder,
      question_left,
      question_left_elder
    }
  },
  mounted() {
    console.log('环境变量：', process.env.NODE_ENV)
    this.initData()
    // 开发
    if (process.env.NODE_ENV === 'development') {
      if (!getToken()) {
        removeToken()
        this.init()
      }
    } else {
      if (!window.location.href.includes('ticket')) { // 第一次进入
        removeToken()
        window.location.href = 'https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=BCDSGA_0a7098c805e2b9ad941388ee2ca5eba2&redirectUrl=https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2002207375/lastTest/index.html?debug=true'
      }
      if (!getToken() && window.location.href.includes('ticket')) { // 如果token 为空 调用接口
        this.init()
      }
    }
  },
  methods: {
    async init() {
      let ticket = null
      if (process.env.NODE_ENV === 'development') {
        ticket = '8a118937814448130181612221dd1815-ticket'
      } else {
        ticket = this.getQuery('ticket')
        if (!ticket) {
          console.log('获取票据失败')
          return
        }
      }
      const result = await Api.postMobile({ ticket })
      if (result.code === '200') {
        setToken(TOKEN, result.data)
        this.$EventBus.$emit('eventName')
      } else {
        if (process.env.NODE_ENV !== 'development') {
          window.location.href = 'https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=BCDSGA_0a7098c805e2b9ad941388ee2ca5eba2&redirectUrl=https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2002207375/lastTest/index.html?debug=true'
        }
      }
    },
    initData() {
      const _this = this
      this.businessTableList = [
        {
          key: 1,
          title: '企业安全生产责任制检查项目表',
          src: this.isNormal ? business_icon1 : business_icon1_elder,
          code: 'SELF_CORRECTION_SAFETY'
        },
        {
          key: 2,
          title: '工矿企业检查项目表',
          src: this.isNormal ? business_icon2 : business_icon2_elder,
          code: 'SELF_CORRECTION_MINING'
        },
        {
          key: 3,
          title: '劳动密集型企业检查项目表',
          src: this.isNormal ? business_icon3 : business_icon3_elder,
          code: 'SELF_CORRECTION_LABOUR'
        }
      ]
      // eslint-disable-next-line no-undef
      ZWJSBridge.getUiStyle().then(res => {
        console.log(res, '主题')
        _this.$store.commit('setUiStyle', res.uiStyle)
      }).catch(error => {
        console.log('获取主题失败', error)
      })
    },
    getQuery(name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      let r = window.location.search.substr(1).match(reg);
      if (r != null) {
        console.log('ticket', r)
        return unescape(r[2]);
      }
      return null;
    },
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
// 正常版
.normal_container {
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

// 长辈版
.elder_container {
  height: 100%;
  padding: 0 16px;
  box-sizing: border-box;

  .header_title {
    margin-top: 16px;
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
    top: 6px;
    left: 14px;
    z-index: 2;
    img {
      width: 58px;
      height: 50px;
    }
  }

  .star-class-text {
    width: 103px;
    font-size: 20px;
    position: absolute;
    font-weight: 500;
    color: #FFFFFF;
    bottom: 16px;
    left: 22px;
    z-index: 2;
  }

  .star-class-bg-img {
    width: 100%;
    height: 123px;
    position: relative;
    z-index: 1;
  }

  /* 企业全面自查自纠 */
  .business-container {
    display: flex;
    flex-direction: column;
  }

  /* 问题发现 */
  .question {
    padding-top: 20px;
    position: relative;
  }
  .question_bg {
    height: 100px;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  .question_icon {
    left: 26px;
    position: absolute;
    height: 64px;
    width: 64px;
    z-index: 2;
    bottom: 18px;
  }

  .question_text {
    position: absolute;
    left: 104px;
    font-size: 22px;
    line-height: 108px;
    font-weight: 500;
    color: #FFFFFF;
    z-index: 2;
  }

  .question_left {
    position: absolute;
    z-index: 2;
    right: 16px;
    width: 32px;
    height: 32px;
    bottom: 34px;
  }
}
</style>

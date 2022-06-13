<template>
  <div :class="isNormal ? 'normal_card' : 'elder_card'" @click="$emit('handleCardClick', itemInfo)">
    <div class="card_title">
      <div class="card_title_icon"></div>
      <div>
        <span>{{itemInfo.problemName}}</span>
      </div>
      <div style="flex: 1;text-align: right">
        <span>{{itemInfo.stateText}}</span>
      </div>
    </div>
    <div class="card_item" v-for="item of cardList" :key="item.key">
      <img v-if="item.key === 1" class="card_item_icon" src="@/assets/img/question/type.png" />
      <img v-if="item.key === 2" class="card_item_icon" src="@/assets/img/question/unit.png" />
      <img v-if="item.key === 3" class="card_item_icon" src="@/assets/img/question/time.png" />
      <span class="card_item_title">{{item.title}}</span>
      <span class="card_item_content">{{itemInfo[item.value] || ''}}</span>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script>
export default {
  props: {
    itemInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isNormal: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      cardList: [
        {
          key: 1,
          title: '问题类型',
          value: 'probelmType'
        },
        {
          key: 2,
          title: '发现单位',
          value: 'createUnitName'
        },
        {
          key: 3,
          title: '发现时间',
          value: 'discoverTime'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.normal_card {
  background: #FFFFFF;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 8px;
  .card_title {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  .card_title_icon {
    width: 2px;
    height: 12px;
    background: #2784FF;
    border-radius: 1px;
    margin-right: 8px;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: #E8E9EC;
    margin: 16px 0;
  }

  .card_item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .card_item_icon {
    width: 12px;
    height: 12px;
  }

  .card_item_title {
    padding: 0 20px 0 4px;
    color: #666666;
  }

  .card_item_content{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1;
  }
}

// 长辈版
.elder_card {
  background: #FFFFFF;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 8px;
  .card_title {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-size: 20px;
  }

  .card_title_icon {
    width: 3px;
    height: 18px;
    background: #2784FF;
    border-radius: 1px;
    margin-right: 8px;
  }

  .divider {
    width: 100%;
    height: 1px;
    background: #E8E9EC;
    margin: 16px 0;
  }

  .card_item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .card_item_icon {
    width: 18px;
    height: 18px;
  }

  .card_item_title {
    padding: 0 20px 0 4px;
    color: #666666;
  }

  .card_item_content{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1;
  }
}
</style>

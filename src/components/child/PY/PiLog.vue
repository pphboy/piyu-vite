<!-- 
  皮志
 -->
<template>
  <a-collapse @change="change" v-model:activeKey="activeKey" accordion>
    <a-collapse-panel class="af" key="1" header="2021年02月04日">
      <a-list item-layout="vertical" size="large" :data-source="listData">
        <template #renderItem="{ item, index }">
          <a-list-item key="item.title">
            <a-list-item-meta  :description="item.description">
              <template #title >
                <a :href="item.href">{{ item.title }}</a>
              </template>
            </a-list-item-meta>
            {{ item.content }}
          </a-list-item>
        </template>
      </a-list>
    </a-collapse-panel>
    <a-collapse-panel class="af" key="2" header="2021年02月04日" :disabled="false">
      <a-list item-layout="vertical" size="large" :data-source="listData">
        <template #renderItem="{ item, index }">
          <a-list-item key="item.title">
            <a-list-item-meta  :description="item.description">
              <template #title >
                <a :href="item.href">{{ '买了xxx 花了多少钱' }}</a>
              </template>
            </a-list-item-meta>
            {{ item.content }}
          </a-list-item>
        </template>
      </a-list>
    </a-collapse-panel>
    <a-collapse-panel class="af" key="3" header="2021年02月04日">
      <p>{{ text }}</p>
    </a-collapse-panel>
  </a-collapse>
  
</template>

<script lang='ts'>
  import axios from 'axios';
  import api from '/@/info/ApiUtils.ts';
  import {reactive,getCurrentInstance} from 'vue';
  import { StarOutlined, LikeOutlined, MessageOutlined
    ,StarOutlined,
    LikeOutlined,
    MessageOutlined,
  } from '@ant-design/icons-vue';
  const listData = [];
  for (let i = 0; i < 4; i++) {
    listData.push({
      href: 'https://www.antdv.com/',
      title: `卖了 xxxxxxx 赚了 xx元`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description:
        '2020-01-01 12:11:11',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
  }

  export default{
    components:{
      StarOutlined,
      LikeOutlined,
      MessageOutlined,
    },
    data() {
      return {
        activeKey: [],
        text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
        listData,
        pagination: {
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
          size:'small',
        },
        actions: [
          { type: 'StarOutlined', text: '156' },
          { type: 'LikeOutlined', text: '156' },
          { type: 'MessageOutlined', text: '2' },
        ],
      };
    },
    methods:{
      change(s){
        console.log(s);
      },
      getPage(keywords){
        console.log(keywords,"PiArticle");
      }
    }
  }
</script>

<style scoped>
  .af{
    font-size:24px;
    font-weight: solid;
  }
</style>
<template>
  <!-- 留言列表内容区start -->
  <div class="bg-white rounded-md px-4 py-2 message-box">
    <template v-if="loading">
      <div v-for="idx in 5" :key="idx" class="flex flex-col gap-3 w-full">
        <div class="skeleton h-4 w-full my-2"></div>
        <div class="skeleton h-3 w-28 my-2"></div>
      </div>
    </template>
    <!-- 留言列表 -->
    <div v-else class="msg-list">
      <!-- 列表项 -->
      <div
        v-for="(item, index) in messageList"
        :key="item.id"
        :class="{ 'up': findCurrentId(item.id) }"
        class="relative msg-list-item"
      >
        <div class="cursor-pointer" @click="handleGetAnswerList(item)">
          <div class="text-xl font-bold">
            <!-- 留言内容 -->
            <h3 v-html="item.content"></h3>
          </div>
          <div class="text-sm text-gray-400">
            <span>{{ item.uptime }}</span>
            <button class="underline mx-4" @click.stop="handleReply(item)">回复</button>
          </div>
        </div>
        <!-- 留言回复框 -->
        <div v-if="item.showReplyTextarea" class="my-4 flex items-end">
          <textarea
            v-model="replyTextarea"
            :placeholder="`回复留言：${item.content}`"
            class="textarea textarea-bordered w-[400px]"
          ></textarea>
          <button
            class="btn btn-sm btn-neutral mx-4"
            @click="handleSubmitReply(item, index)">提交
          </button>
        </div>

        <!-- 回复列表（递归） -->
        <ul v-if="item.replyData.length && findCurrentId(item.id)" class="ml-4 my-4">
          <li v-for="(replyItem) in item.replyData" class="my-4" :key="replyItem.id">
            <div class="text-md font-bold">
              <!-- 回复内容 -->
              <h3>{{ replyItem.content }}</h3>
            </div>
            <div>
              <span class="text-sm text-gray-400">{{ replyItem.uptime }}</span>
            </div>
          </li>
        </ul>

        <div v-if="haveMore(item)" class="ml-4 text-sm text-gray-400">
          <span>共有{{ item.replyPagination.count }}条回复，</span>
          <span class="more" @click="handleMoreReply(item)">点击查看更多</span>
        </div>
        <!-- 留言内容线 -->
        <hr class="my-4 border-dashed">
      </div>
      <!-- 列表项 -->
    </div>
    <!-- 留言列表 -->

    <!-- 分页 -->
    <div class="flex justify-end py-4">
      <a-pagination
        v-model:current="pagination.page"
        :page-size-options="pageSizeOptions"
        :total="messageCount"
        show-less-items
        show-size-changer
        @change="handleChangePagination"
      >
        <template #buildOptionText="props">
          <span>{{ props.value }}条/页</span>
        </template>
      </a-pagination>
    </div>
    <!-- 分页 -->
  </div>
  <!-- 留言列表内容区end -->
</template>

<script setup>
import { message } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import { addAnswer, getAnswerList, getQuesList } from '@/api'

const loading = ref(false)
const messageList = ref([])
const messageCount = ref(0)
const replyTextarea = ref('')
const pageSizeOptions = ref(['10', '20', '30', '40', '50'])
const pagination = ref({ page: 1, pageSize: 10, key: '' })
const answerListParam = ref({ page: 1, pageSize: 10, qid: '' })

onMounted(() => {
  requestQuesList()
})
const requestQuesList = async () => {
  loading.value = true
  messageList.value = []
  // 请求留言列表
  let responseBody = await getQuesList(pagination.value)
  if (responseBody.code == 200) {
    responseBody.data.map(item => Object.assign(item, {
      activeKey: 0,
      firstRequestAnsKey: 1,
      showReplyTextarea: 0,
      replyData: [],
      replyPagination: { page: 1, pageSize: 10, count: 0 }
    }))
    messageList.value = responseBody.data
    messageCount.value = responseBody.count

    loading.value = false
  }
}

const handleChangePagination = (pageNumber, pageSize) => {
  console.log(pageNumber, pageSize)
  pagination.value = {
    ...pagination.value, ...{
      page: pageNumber,
      pageSize
    }
  }
  requestQuesList()
}

const findCurrentId = (id) => {
  let haved = messageList.value.find(item => {
    return item.id == id && item.activeKey
  })
  return haved
}

// 点击留言查看回复
const handleGetAnswerList = async (item) => {
  if (item.firstRequestAnsKey == 1) {
    Object.assign(answerListParam.value, { qid: item.id })
    // 调取回复API
    let responseBody = await getAnswerList(answerListParam.value)

    if (responseBody.code == 200) {
      if (!responseBody.data.length) {
        let hide = message.info('这个留言无回复')
        setTimeout(hide, 800)
        return
      }

      messageList.value.forEach((messageItem, index) => {
        if (messageItem.id == item.id) {
          messageItem.activeKey = !item.activeKey
          messageItem.replyPagination = { page: 1, pageSize: 10, count: responseBody.count }
          messageItem.replyData = responseBody.data
          messageItem.firstRequestAnsKey = 0
        }
      })
    }
  } else {
    messageList.value.forEach((messageItem, index) => {
      if (messageItem.id == item.id) {
        messageItem.activeKey = !item.activeKey
      }
    })
  }

}

const haveMore = (item) => {
  if (item.activeKey && item.replyData.length && item.replyData.length < item.replyPagination.count) return true
  return false
}

// 查看更多
const handleMoreReply = async (item) => {
  Object.assign({ qid: item.id })
  let requestParams = {
    page: ++item.replyPagination.page,
    pageSize: 10,
    qid: item.id
  }
  // 调取回复API
  let responseBody = await getAnswerList(requestParams)

  if (responseBody.code == 200) {
    messageList.value.forEach((messageItem, index) => {
      if (messageItem.id == item.id) {
        messageItem.replyPagination = { page: requestParams.page, pageSize: 10, count: responseBody.count }
        messageItem.replyData = messageItem.replyData.concat(responseBody.data)
        messageItem.firstRequestAnsKey = 0
      }
    })
  }
}

// 递归
const recursion = (item) => {
  let replyData = item.replyData
  if (replyData && replyData.length) {
    replyData.forEach((reply, index) => {
      reply.showReplyTextarea = 0
      if (reply.replyData && reply.replyData.length) {
        recursion(reply)
      }
    })
  }
}

// 点击回复按钮
const handleReply = (item) => {
  item.showReplyTextarea = !item.showReplyTextarea

  replyTextarea.value = ''
  console.log('点击回复按钮', item)
  messageList.value.map((messageItem, index) => {
    messageItem.showReplyTextarea = 0
    recursion(messageItem)
  })
  item.showReplyTextarea = 1
}

// 点击提交回复按钮
const handleSubmitReply = async (item, index) => {
  if (!replyTextarea.value.length) {
    let hide = message.warning('回复内容不能为空')
    setTimeout(hide, 800)
    return
  }
  // 调提交API
  let responseBody = await addAnswer({
    qid: item.id,
    content: replyTextarea.value
  })

  if (responseBody.code == 200) {
    replyTextarea.value = ''
    let hide = message.success('提交成功')
    setTimeout(() => {
      hide
    }, 800)

    // 调取回复API
    let requestParams = {
      page: 1,
      pageSize: 10,
      qid: item.id
    }
    let responseBody = {}
    // 判断当前回复数据在不在总数据内
    if (item.replyData.length <= item.replyPagination.page * item.replyPagination.pageSize) {
      // 调取回复API
      requestParams.pageSize = item.replyPagination.page * item.replyPagination.pageSize
      responseBody = await getAnswerList(requestParams)
      if (responseBody.code == 200) {
        messageList.value.forEach((messageItem, index) => {
          if (messageItem.id == item.id) {
            messageItem.replyPagination.count = responseBody.count
            messageItem.replyData = responseBody.data
            messageItem.firstRequestAnsKey = 0
          }
        })
      }
    } else {
      handleMoreReply(item)
    }
  }
}
</script>

<style scoped>
/**列表项 */
.msg-list-item::after {
  position: absolute;
  display: block;
  right: 10px;
  top: 0px;
  height: 10px;
  width: 10px;
  transform: rotate(45deg);
  transition-property: transform, margin-top;
  transition-duration: .3s;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  content: "";
  transform-origin: 75% 75%;
  box-shadow: 2px 2px;
  pointer-events: none;
}

.msg-list-item.up::after {
  transform: rotate(-135deg);
}
/**  留言区域  **/
</style>

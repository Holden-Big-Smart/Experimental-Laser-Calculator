<template>
  <header class="bg-[#000E44] border-b border-b-[#384078]">
    <nav class="xl:w-[1440px] mx-auto px-4 xl:px-0 grid grid-cols-[auto_1fr]">
      <RouterLink key="/" to="/">
        <img alt="" class="block h-16 my-4" src="@/assets/logo.jpg" />
      </RouterLink>

      <div class="flex items-center justify-end">
        <a-popover>
          <template #content>
            <div class="text-base max-w-96">
            <h2>阿秒科学中心简介</h2>
            <p>为有效支撑国家重大科技基础设施建设,解决超快物质科学领域的重大科学问题,发展超快激光核心技术,开展超快激光器工程化研制,推动高端激光器产业化,中国科学院物理研究所联合松山湖材料实验室成立阿秒科学中心。</p>
            <dl class="mb-0">
              <dt class="text-lg">【中心目标】</dt>
              <dd class="my-1">建设国际领先的用户设施,为全球用户提供一流的科学研究平台;打造国际一流的激光器研发基地,提供成熟的激光器制造方案;在超快激光、阿秒光学、凝聚态电子动力学、原子分子物理、功能材料等前沿领域取得一批重大原创成果,引领超快科学若干领域的发展,形成一支具有国际影响力的研究队伍,成为国际知名的超快科学研究中心。</dd>
              <dt class="text-lg">【研究内容】</dt>
              <dd class="my-1">物质是由分子、原子、电子等不同层次的微观粒子组成的,其宏观性质取决于构成它的粒子种类、结构以及运动状态。微观粒子运动状态发生改变，常会带来物质微观结构的改变,从而发生宏观性质的改变,这便是物理学上的相变。研究构成物质微观粒子的动力学行为,对其进行超高时间分辨率的测量和控制，实现对相关的物理、化学、生物等宏观物性的理解、应用和控制,是当今科学研究中重要的基础内容,是超快科学的重要新兴领域。</dd>
              <dt class="text-lg">【中心使命】</dt>
              <dd class="my-1">阿秒中心将参与制定超快物质科学的国家发展战略,发起和承担超快科学领域重大科技任务,发挥引领和战略带动作用,培养和造就超快科学领域的领军人才,使我国在超快物质科学领域掌握主动权、占领制高点,成为国家科技战略力量的重要组成部分。</dd>
            </dl>
            </div>
          </template>
          <div tabindex="1" role="button" class="text-xl text-white mx-8">组织介绍</div>
        </a-popover>

        <a-popover>
          <template #content>
            <div class="text-base max-w-64">
              <dl class="mb-0">
                <dt class="text-lg">联系方式</dt>
                <dd class="my-1">阿秒科学中心</dd>
                <dd class="my-1">电话：19925265281（刘老师）</dd>
                <dd class="my-1">邮箱：ultrafastweb@iphy.ac.cn</dd>
                <dd class="my-1">网址：https://cup.iphy.ac.cn</dd>
                <dd class="my-1">地址：北京市海淀区中关村南三街8号/广东省东莞市松山湖大学创新城A1栋/广东省东莞市大朗镇屏东路333号</dd>
              </dl>
            </div>
          </template>
          <div tabindex="1" role="button" class="text-xl text-white mx-8">关于我们</div>
        </a-popover>
      </div>
    </nav>
  </header>

  <!-- banner图 -->
  <div :class="{ 'aspect-w-[7000] aspect-h-[2100]': !bannerHidden, 'h-0': bannerHidden }">
    <img
      alt=""
      class="w-full h-full object-bottom object-cover"
      src="@/assets/bg-banner.jpg"
    />
  </div>

  <main class="xl:w-[1440px] mx-auto px-4 xl:px-0">
    <div class="grid grid-cols-[auto_1fr]">
      <div>
        <input
          type="text"
          v-model="keyword"
          class="input input-bordered input-sm w-full mt-4"
          placeholder="输入关键词以搜索"
        />

        <ul class="menu bg-base-200 w-56 rounded-box">
          <!-- S 一级菜单 -->
          <li v-for="route in filterRoutes" :key="route.name">
            <details v-if="!!route.children?.length" :open="openKeys?.[0] === route.name">
              <summary><span v-html="highlightKeyword(route.meta?.title)"></span></summary>
              <ul>
                <!-- S 二级菜单 -->
                <li v-for="_route in route?.children" :key="_route.name">
                  <details v-if="!!_route.children?.length" :open="openKeys?.[1] === _route.name">
                    <summary><span v-html="highlightKeyword(_route.meta?.title)"></span></summary>
                    <!-- S 三级菜单 -->
                    <ul>
                      <li v-for="__route in _route?.children" :key="__route.name">
                        <RouterLink
                          :key="__route.name"
                          :class="{ active: selectedKeys?.[2] === __route.name }"
                          :to="{ name: __route.name }"
                        >
                          <span v-html="highlightKeyword(__route.meta?.title)"></span>
                        </RouterLink>
                      </li>
                    </ul>
                    <!-- E 三级菜单 -->
                  </details>
                  <RouterLink
                    v-else
                    :key="_route.name"
                    :class="{ active: selectedKeys?.[1] === _route.name }"
                    :to="{ name: _route.name }"
                  >
                    <span v-html="highlightKeyword(_route.meta?.title)"></span>
                  </RouterLink>
                </li>
                <!-- E 二级菜单 -->
              </ul>
            </details>
            <RouterLink
              v-else
              :key="route.name"
              :class="{ active: selectedKeys?.[0] === route.name }"
              :to="{ name: route.name }"
            >
              <span v-html="highlightKeyword(route.meta?.title)"></span>
            </RouterLink>
          </li>
          <!-- E 一级菜单 -->
        </ul>
      </div>

      <div class="overflow-hidden">
        <div class="m-4 text-sm breadcrumbs">
          <ul class="mb-0">
            <li v-for="(match, index) in route.matched" :key="index">
              <RouterLink
                v-if="index !== route.matched.length - 1"
                :key="match.name"
                :to="{ name: match.name }"
                >{{ match.meta?.title }}
              </RouterLink>
              <a v-else class="no-underline">{{ match.meta?.title }}</a>
            </li>
          </ul>
        </div>

        <div class="m-4 grid grid-cols-[1fr_350px]">
          <!-- 内容区 ⬇ -->
          <div class="overflow-hidden" style="width: 70vmin;">
            <slot></slot>

            <div v-show="helpVisible" class="my-4">
              <img :src="helpPicture" alt="帮助图片" />
            </div>
          </div>
          <!-- 内容区 ⬆ -->

          <!-- 右侧赞助区 ⬇ -->
          <div class="mx-4" style="width: 35vmin;">
            <!-- 广告赞助区 -->
            <div>
              <img src="@/assets/ad/ad.gif" />
            </div>

            <!-- 原理/光路配图 -->
            <div v-if="rightPicture" class="my-4">
              <img :src="rightPicture" alt="原理/光路配图" />
            </div>

            <template v-if="currentPageLinks.length">
              <hr class="my-4 border-dashed" />

              <h4>相关链接：</h4>
              <ul class="break-all text-justify">
                <li v-for="(item, index) in currentPageLinks" :key="item.link" class="my-2">
                  <a :href="item.link" class="underline" rel="noreferrer" target="_blank"
                    >文章{{ index + 1 }}:{{ item.link }}</a
                  >
                </li>
              </ul>
            </template>
          </div>
          <!-- 右侧赞助区 ⬆ -->
        </div>
      </div>
    </div>
  </main>

  <!-- START 底部信息 -->
  <footer class="bg-black/85">
    <div class="xl:w-[1440px] mx-auto overflow-auto px-4 xl:px-0 grid grid-cols-4 gap-8">
      <dl>
        <dt class="text-white text-lg my-8">中心分部</dt>
        <dd class="my-3">
          <img src="@/assets/location.png" />
        </dd>
      </dl>
      <!-- 友情链接 -->
      <dl>
        <dt class="text-white text-lg my-8">友情链接</dt>
        <dd class="my-3">
          <a class="text-base text-gray-400 hover:text-white" href="#">中国科学院物理研究所</a>
        </dd>
        <dd class="my-3">
          <a class="text-base text-gray-400 hover:text-white" href="#">松山湖材料实验室</a>
        </dd>
        <dd class="my-3">
          <a class="text-base text-gray-400 hover:text-white" href="#">广东省人民政府</a>
        </dd>
        <dd class="my-3">
          <a class="text-base text-gray-400 hover:text-white" href="#">广东省科学技术厅</a>
        </dd>
        <dd class="my-3">
          <a class="text-base text-gray-400 hover:text-white" href="#">中华人民共和国科学技术部</a>
        </dd>
        <dd class="my-3">
          <a class="text-base text-gray-400 hover:text-white" href="#">国家自然科学基金委员会</a>
        </dd>
        <dd class="my-3">
          <a class="text-base text-gray-400 hover:text-white" href="#">中国科学院</a>
        </dd>
        <dd class="my-3">
          <a class="text-base text-gray-400 hover:text-white" href="#">东莞市人民政府</a>
        </dd>
        <dd class="my-3">
          <a class="text-base text-gray-400 hover:text-white" href="#"
            >中国科学院重大基础设施共享平台</a
          >
        </dd>
      </dl>
      <!-- 快速链接 -->
      <dl>
        <dt class="text-white text-lg my-8">快速链接</dt>
        <dd class="my-3">
          <a class="text-base text-gray-400 hover:text-white" href="#">中心概况</a>
        </dd>
        <dd class="my-3">
          <a class="text-base text-gray-400 hover:text-white" href="#">科学研究</a>
        </dd>
        <dd class="my-3">
          <a class="text-base text-gray-400 hover:text-white" href="#">学术交流</a>
        </dd>
        <dd class="my-3">
          <a class="text-base text-gray-400 hover:text-white" href="#">人才招聘</a>
        </dd>
      </dl>
      <dl>
        <dt class="text-white text-lg my-8">联系我们</dt>
        <dd class="my-3">
          <a
            class="flex items-center text-base text-gray-400 hover:text-white"
            href="tel://19925265281"
          >
            <PhoneOutlined class="mr-1" />19925265281（刘老师）
          </a>
        </dd>
        <dd class="my-3">
          <a
            class="flex items-center text-base text-gray-400 hover:text-white"
            href="mailto://ultrafastweb@iphy.ac.cn"
          >
            <MailOutlined class="mr-1" />ultrafastweb@iphy.ac.cn</a
          >
        </dd>
        <dd class="my-3">
          <a class="flex text-base text-gray-400 hover:text-white">
            <CompassOutlined class="mr-1 mt-1" />
            <span>
              <span class="inline-block">北京市海淀区中关村南三街8号</span>
              <span class="inline-block">广东省东莞市松山湖大学创新城A1栋</span>
              <span class="inline-block">广东省东莞市大朗镇屏东路333号</span>
            </span>
          </a
          >
        </dd>

        <dd class="mt-6">
          <img class="w-36" src="@/assets/qr_code.png" alt="" />
        </dd>
      </dl>
    </div>
  </footer>
  <!-- END 底部信息 -->

  <!-- START 问题反馈弹窗 -->
  <dialog ref="feedbackModalRef" class="modal">
    <div class="modal-box rounded-md">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="font-bold text-lg">问题反馈</h3>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[120px]">手机号码：</span>
        <input v-model="feedbackForm.tel" class="input input-sm w-full input-bordered" type="tel" />
      </div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[120px]">电子邮箱：</span>
        <input
          v-model="feedbackForm.email"
          class="input input-sm w-full input-bordered"
          type="email"
        />
      </div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[120px]">联系地址：</span>
        <input
          v-model="feedbackForm.address"
          class="input input-sm w-full input-bordered"
          type="text"
        />
      </div>
      <div class="my-2 flex items-center gap-2">
        <span class="text-sm w-[120px]">问题描述：</span>
        <textarea
          v-model="feedbackForm.content"
          class="textarea textarea-sm w-full textarea-bordered"
          maxlength="500"
        ></textarea>
      </div>
      <div class="modal-action">
        <button class="btn btn-neutral" @click="submitFeedback">提交反馈</button>
      </div>
    </div>
  </dialog>
  <!-- END 问题反馈弹窗 -->
</template>
<script setup>
import { reactive, ref, unref, watch } from 'vue'
import { message } from 'ant-design-vue'
import { PhoneOutlined, MailOutlined, CompassOutlined } from '@ant-design/icons-vue'
import { useRoute } from 'vue-router'

import emitter from '@/utils/eventBus.js'
import { addQues } from '@/api'
import { routes } from '@/router'

import useLink from './useLink.js'

// 当前页面的相关链接
const { currentPageLinks } = useLink()

// 路由 相关逻辑 ⬇
const route = useRoute()
const bannerHidden = ref(false)

watch(
  () => route.name,
  () => {
    if (window.location.href !== 'http://localhost:5173/site/') {
      bannerHidden.value = true
    }
  }
)

const rightPicture = ref(null)

// 默认选择匹配路由第0个为展开的菜单
const openKeys = ref(unref(route).matched.map((item) => item.name))
// 默认选择匹配路由第1个为选中的菜单
const selectedKeys = ref(unref(route).matched.map((item) => item.name))
// 监听路由变化 更新展开和选中的菜单
watch(
  () => route.name,
  () => {
    openKeys.value = unref(route).matched.map((item) => item.name)
    selectedKeys.value = unref(route).matched.map((item) => item.name)

    // 设置右侧图片
    import(`@/assets/figure/${route.meta?.sn}-原理.jpg?url`)
      .then((res) => {
        rightPicture.value = res.default
      })
      .catch(() => {
        rightPicture.value = null
      })

    // 关闭帮助图片
    helpVisible.value = false
    helpPicture.value = null
  }
)
// 路由 相关逻辑 ⬆

// 反馈相关逻辑 ⬇
const feedbackModalRef = ref(null)
const feedbackForm = reactive({
  /** 留言内容*/
  content: '',
  /** 联系方式*/
  tel: '',
  /** 邮箱*/
  email: '',
  /** 地址*/
  address: '',
  /** 其他*/
  other1: ''
})
const submitFeedback = () => {
  // 设置反馈的页面编号，如A1、A2
  feedbackForm.other1 = route.meta?.sn

  // 提交反馈
  addQues(feedbackForm).then(() => {
    feedbackModalRef.value.close()
    message.success('您的反馈已收到')

    feedbackForm.content = ''
    feedbackForm.tel = ''
    feedbackForm.email = ''
    feedbackForm.address = ''
    feedbackForm.other1 = ''
  })
}
emitter.on('feedback', () => {
  feedbackModalRef.value.showModal()
})
// 反馈相关逻辑 ⬆

// 帮助相关逻辑 ⬇
const helpVisible = ref(false)
const helpPicture = ref(null)
emitter.on('help', () => {
  helpVisible.value = !helpVisible.value

  if (!helpVisible.value) {
    helpPicture.value = null
    return
  }

  import(`@/assets/figure/${route.meta?.sn}-帮助.jpg?url`)
    .then((res) => {
      helpPicture.value = res.default
    })
    .catch(() => {
      helpPicture.value = null
    })
})
// 帮助相关逻辑 ⬆

// 菜单搜索相关逻辑 ⬇
const keyword = ref('')
const filterRoutes = ref(routes)
// 递归过滤路由
const filterRoutesByKeyword = (routes, keyword) => {
  // 使用reduce方法遍历路由数组
  return routes.reduce((filteredRoutes, route) => {
    // 如果当前路由的标题包含关键词，直接将其添加到过滤后的路由数组中
    if (route.meta?.title.includes(keyword)) {
      filteredRoutes.push(route)
    } else if (route.children) {
      // 如果当前路由有子路由，递归过滤子路由
      const filteredChildren = filterRoutesByKeyword(route.children, keyword)
      if (filteredChildren.length > 0) {
        // 如果过滤后的子路由数组不为空，将当前路由（包含过滤后的子路由）添加到过滤后的路由数组中
        filteredRoutes.push({
          ...route,
          children: filteredChildren
        })
      }
    }
    return filteredRoutes
  }, [])
}
// 高亮关键字
const highlightKeyword = (text) => {
  if (!keyword.value) {
    return text
  }
  const reg = new RegExp(keyword.value, 'gi')
  return text.replace(reg, (match) => `<span class="text-error">${match}</span>`)
}
watch(
  () => keyword.value,
  (value) => {
    if (!value) {
      filterRoutes.value = routes
      return
    }

    // 使用reduce根据关键字递归搜索菜单
    filterRoutes.value = filterRoutesByKeyword(routes, value)

    console.log(filterRoutes.value)
  }
)
// 菜单搜索相关逻辑 ⬆
</script>

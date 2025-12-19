import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: true, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

import PhysicalConstantView from '../views/tools/physical-constant-view.vue'

export const routes = [
  {
    path: '/',
    name: 'index',
    redirect: { name: 'home' },
    meta: {
      title: '基本工具'
    },
    children: [
      {
        path: '',
        name: 'home',
        component: PhysicalConstantView,
        meta: {
          title: '物理常数',
          sn: 'A1'
        }
      },
      // todo
      {
        path: '/spectral-pulse-transformation',
        name: 'spectral-pulse-transformation',
        component: () => import('../views/404.vue'),
        meta: {
          title: '光谱/脉冲变换',
          sn: 'A2'
        }
      },
      {
        path: '/curve-draw',
        name: 'curve-draw',
        component: () => import('../views/tools/curve-draw-view.vue'),
        meta: {
          title: '曲线绘制',
          sn: 'A3'
        }
      },
      {
        path: '/unit-calculator',
        name: 'unit-calculator',
        component: () => import('../views/tools/unit-calculator-view.vue'),
        meta: {
          title: '单位换算',
          sn: 'A4'
        }
      },
      {
        path: '/power-density',
        name: 'power-density',
        component: () => import('../views/tools/power-density-view.vue'),
        meta: {
          title: '功率密度',
          sn: 'A5'
        }
      },
      {
        path: '/time-bandwidth-product',
        name: 'time-bandwidth-product',
        component: () => import('../views/tools/time-bandwidth-product-view.vue'),
        meta: {
          title: '时间带宽积',
          sn: 'A6'
        }
      },
      {
        path: '/laser-pulse-repe-tition-rate-frequency',
        name: 'laser-pulse-repe-tition-rate-frequency',
        component: () => import('../views/tools/laser-pulse-repe-tition-rate-frequency-view.vue'),
        meta: {
          title: '腔长与重复频率',
          sn: 'A7'
        }
      }
    ]
  },

  // S 常用材料 路由
  {
    path: '/material',
    name: 'material',
    meta: {
      title: '常用材料'
    },
    redirect: { name: 'isotropic-crystal' },
    children: [
      {
        path: 'isotropic-crystal',
        name: 'isotropic-crystal',
        component: () => import('../views/material/isotropic-crystal-view.vue'),
        meta: {
          title: '各项同性晶体/非晶体',
          sn: 'A8'
        }
      },
      {
        path: 'nonlinear-optical-crystal',
        name: 'nonlinear-optical-crystal',
        component: () => import('../views/material/nonlinear-optical-crystal-view.vue'),
        meta: {
          title: '非线性光学晶体',
          sn: 'A9'
        }
      },
      {
        path: 'laser-optic-crystal',
        name: 'laser-optic-crystal',
        component: () => import('../views/material/laser-optic-crystal-view.vue'),
        meta: {
          title: '激光晶体',
          sn: 'A10'
        }
      },
      {
        path: 'electro-optic-crystal',
        name: 'electro-optic-crystal',
        component: () => import('../views/material/electro-optic-crystal-view.vue'),
        meta: {
          title: '电光晶体',
          sn: 'A11'
        }
      },
      {
        path: 'acousto-optic-crystal',
        name: 'acousto-optic-crystal',
        component: () => import('../views/material/acousto-optic-crystal-view.vue'),
        meta: {
          title: '声光晶体',
          sn: 'A12'
        }
      },
      {
        path: 'magneto-optic-crystal',
        name: 'magneto-optic-crystal',
        component: () => import('../views/material/magneto-optic-crystal-view.vue'),
        meta: {
          title: '磁光晶体',
          sn: 'A13'
        }
      }
    ]
  },
  // E 常用材料 路由

  // S 基本原理 路由
  {
    path: '/fundamentals',
    name: 'fundamentals',
    meta: {
      title: '基本原理'
    },
    redirect: { name: 'gaussian-imaging-formula' },
    children: [
      {
        path: 'gaussian-imaging-formula',
        name: 'gaussian-imaging-formula',
        component: () => import('../views/fundamentals/gaussian-imaging-formula-view.vue'),
        meta: {
          title: '高斯成像公式',
          sn: 'A14'
        }
      },
      {
        path: 'fresnel-equation',
        name: 'fresnel-equation',
        component: () => import('../views/fundamentals/fresnel-equation-view.vue'),
        meta: {
          title: '菲涅耳公式',
          sn: 'A15'
        }
      },
      {
        path: 'material-dispersion',
        name: 'material-dispersion',
        component: () => import('../views/fundamentals/material-dispersion-view.vue'),
        meta: {
          title: '材料色散',
          sn: 'A18'
        }
      }
    ]
  },
  // E 基本原理 路由

  // S 常用器件 路由
  {
    path: '/widget',
    name: 'widget',
    meta: {
      title: '常用器件'
    },
    redirect: { name: 'single-grating' },
    children: [
      {
        path: 'single-grating',
        name: 'single-grating',
        component: () => import('../views/widget/single-grating-view.vue'),
        meta: {
          title: '单光栅',
          sn: 'A25'
        }
      },
      {
        path: 'multi-grating-spatial',
        name: 'multi-grating-spatial',
        component: () => import('../views/widget/multi-grating-spatial-view.vue'),
        meta: {
          title: '多光栅空间色散',
          sn: 'A26'
        }
      },
      {
        path: 'birefringent-filter',
        name: 'birefringent-filter',
        component: () => import('../views/widget/birefringent-filter-view.vue'),
        meta: {
          title: '双折射滤光片',
          sn: 'A28'
        }
      }
      // {
      //   path: 'martinez',
      //   name: 'martinez',
      //   component: () => import('../views/widget/martinez-view.vue'),
      //   meta: {
      //     title: 'Martinez型展宽器',
      //     sn: 'A44'
      //   }
      // },
      // {
      //   path: 'cpa',
      //   name: 'cpa',
      //   component: () => import('../views/widget/cpa-system-view.vue'),
      //   meta: {
      //     title: 'CPA',
      //     sn: 'A51'
      //   }
      // }
    ]
  },
  // E 常用器件 路由

  // S 单元系统 路由
  {
    name: 'unit-system',
    path: '/unit-system',
    meta: {
      title: '单元系统'
    },
    redirect: { name: 'oscillator' },
    children: [
      {
        name: 'oscillator',
        path: 'oscillator',
        meta: {
          title: '振荡器'
        },
        children: [
          {
            path: 'four-mirror-confocal-cavity',
            name: 'four-mirror-confocal-cavity',
            component: () =>
              import('../views/unit-system/oscillator/four-mirror-confocal-cavity-view.vue'),
            meta: {
              title: '四镜共焦腔',
              sn: 'A37'
            }
          }
        ]
      },
      {
        name: 'amplifier',
        path: '/amplifier',
        meta: {
          title: '放大器'
        },
        children: [
          {
            path: 'amplifier-1',
            name: 'amplifier-1',
            component: () => import('../views/unit-system/amplifier/amplifier-1-view.vue'),
            meta: {
              title: '光参量放大器(1)',
              sn: 'A39'
            }
          },
          {
            path: 'amplifier-2',
            name: 'amplifier-2',
            component: () => import('../views/unit-system/amplifier/amplifier-2-view.vue'),
            meta: {
              title: '光参量放大器(2)',
              sn: 'A40'
            }
          },
          {
            path: 'amplifier-3',
            name: 'amplifier-3',
            component: () => import('../views/unit-system/amplifier/amplifier-3-view.vue'),
            meta: {
              title: '光参量放大器(3)',
              sn: 'A41'
            }
          }
        ]
      },
      {
        name: 'compressor',
        path: '/compressor',
        meta: {
          title: '展宽压缩器'
        },
        children: [
          {
            path: 'offner',
            name: 'offner',
            component: () => import('../views/unit-system/compressor/offner-view.vue'),
            meta: {
              title: 'Offner型展宽器',
              sn: 'A43'
            }
          },
          {
            path: 'martinez',
            name: 'martinez',
            component: () => import('../views/unit-system/compressor/martinez-view.vue'),
            meta: {
              title: 'Martinez型展宽器',
              sn: 'A44'
            }
          }
        ]
      }
    ]
  },
  // E 单元系统 路由

  // S 系统 路由
  {
    name: 'system',
    path: '/system',
    meta: {
      title: '系统'
    },
    redirect: { name: 'cpa' },
    children: [
      {
        name: 'cpa',
        path: 'cpa',
        meta: {
          title: 'CPA',
          sn: 'A51'
        },
        component: () => import('../views/system/cpa-system-view.vue')
      }
    ]
  },
  // E 系统 路由

  // S 在线留言 路由
  {
    path: '/board',
    name: 'board',
    meta: {
      title: '在线留言'
    },
    component: () => import('../views/board/message-board-view.vue')
  }
  // E 在线留言 路由
]

const router = createRouter({
  base: '/site/',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 切换页面，滚动到最顶部
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// * 路由拦截 beforeEach
router.beforeEach((to, from, next) => {
  NProgress.start()

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router

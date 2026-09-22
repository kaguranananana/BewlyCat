import { injectCSS } from '~/utils/main'

const NO_FEED_ROOT_CLASS = 'bewly-no-feed'

let noFeedStyleElement: HTMLStyleElement | null = null

/**
 * 同步原生页面的 No Feed 状态。
 *
 * 推荐请求由主世界脚本按接口路径拦截；这里仅负责移除 B 站已经渲染的推荐容器，
 * 避免设置在页面运行期间开启时遗留旧卡片。选择器只覆盖推荐区，不触碰分 P、合集和播放列表。
 */
export function applyNoFeedPageState(enabled: boolean): void {
  if (!noFeedStyleElement) {
    noFeedStyleElement = injectCSS(`
      html.${NO_FEED_ROOT_CLASS} #reco_list,
      html.${NO_FEED_ROOT_CLASS} .video-page-card-small,
      html.${NO_FEED_ROOT_CLASS} .recommend-list-v1,
      html.${NO_FEED_ROOT_CLASS} .recommend-list-container,
      html.${NO_FEED_ROOT_CLASS} .bpx-player-ending-related,
      html.${NO_FEED_ROOT_CLASS} .bpx-player-ending-related-item {
        display: none !important;
      }
    `)
  }

  document.documentElement.classList.toggle(NO_FEED_ROOT_CLASS, enabled)
}

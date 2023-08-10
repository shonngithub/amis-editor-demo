import {registerEditorPlugin, BasePlugin} from 'amis-editor';
import {
  RendererEventContext,
  SubRendererInfo,
  BasicSubRenderInfo,
  PluginInterface
} from 'amis-editor';

/**
 * 用于隐藏一些不需要的Editor组件
 * 备注: 如果不知道当前Editor中有哪些预置组件，可以在这里设置一个断点，console.log 看一下 renderers。
 */

// 需要在组件面板中隐藏的组件
const disabledRenderers = [
  'audio', // 音频
  // 'carousel', // 轮播图
  'custom', // 自定义代码
  'log', // 日志
  'sparkline' // 走势图
];

export class ManagerEditorPlugin extends BasePlugin {
  order = 9999;

  buildSubRenderers(
    context: RendererEventContext,
    renderers: Array<SubRendererInfo>
  ): BasicSubRenderInfo | Array<BasicSubRenderInfo> | void {
    console.log({renderers});
    // 更新NPM自定义组件排序和分类
    for (let index = 0, size = renderers.length; index < size; index++) {

      // 判断是否需要隐藏 Editor预置组件
      const pluginRendererName = renderers[index].rendererName;
      if (
        pluginRendererName &&
        disabledRenderers.indexOf(pluginRendererName) > -1
      ) {
        renderers[index].disabledRendererPlugin = true; // 更新状态
      }
      // console.log(renderers[index].docLink);
      renderers[index].docLink = '';

      const noteBase = ["tpl","plain"]
      if(pluginRendererName&& noteBase.indexOf(pluginRendererName) > -1){
        // console.log(renderers[index]);
        if(pluginRendererName === 'tpl'){
          renderers[index].name = '文字(支持富文本)';
        }
        renderers[index].disabledRendererPlugin = false;
        renderers[index].tags = ['快速创建'];
        renderers[index].isBaseComponent = false;
      }
    }
  }
}

registerEditorPlugin(ManagerEditorPlugin);

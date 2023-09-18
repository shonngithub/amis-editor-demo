import React from 'react';
import {RendererEditor, BasicEditor} from 'amis-editor';

@RendererEditor('my-renderer', {
  name: '自定义渲染器',
  description: '图片展示',
  // docLink: '/docs/renderers/Nav',
  type: 'my-renderer',
  previewSchema: {
    // 用来生成预览图的
    type: 'my-renderer',
    imgUrl: 'data:image/svg+xml,%3C%3Fxml version=\'1.0\' standalone=\'no\'%3F%3E%3C!DOCTYPE svg PUBLIC \'-//W3C//DTD SVG 1.1//EN\' \'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\'%3E%3Csvg t=\'1631083237695\' class=\'icon\' viewBox=\'0 0 1024 1024\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' p-id=\'2420\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' width=\'1024\' height=\'1024\'%3E%3Cdefs%3E%3Cstyle type=\'text/css\'%3E%3C/style%3E%3C/defs%3E%3Cpath d=\'M959.872 128c0.032 0.032 0.096 0.064 0.128 0.128v767.776c-0.032 0.032-0.064 0.096-0.128 0.128H64.096c-0.032-0.032-0.096-0.064-0.128-0.128V128.128c0.032-0.032 0.064-0.096 0.128-0.128h895.776zM960 64H64C28.8 64 0 92.8 0 128v768c0 35.2 28.8 64 64 64h896c35.2 0 64-28.8 64-64V128c0-35.2-28.8-64-64-64z\' p-id=\'2421\' fill=\'%23bfbfbf\'%3E%3C/path%3E%3Cpath d=\'M832 288c0 53.024-42.976 96-96 96s-96-42.976-96-96 42.976-96 96-96 96 42.976 96 96zM896 832H128V704l224-384 256 320h64l224-192z\' p-id=\'2422\' fill=\'%23bfbfbf\'%3E%3C/path%3E%3C/svg%3E'
  },
  scaffold: {
    // 拖入组件里面时的初始数据
    type: 'my-renderer',
    imgUrl: 'data:image/svg+xml,%3C%3Fxml version=\'1.0\' standalone=\'no\'%3F%3E%3C!DOCTYPE svg PUBLIC \'-//W3C//DTD SVG 1.1//EN\' \'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\'%3E%3Csvg t=\'1631083237695\' class=\'icon\' viewBox=\'0 0 1024 1024\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' p-id=\'2420\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' width=\'1024\' height=\'1024\'%3E%3Cdefs%3E%3Cstyle type=\'text/css\'%3E%3C/style%3E%3C/defs%3E%3Cpath d=\'M959.872 128c0.032 0.032 0.096 0.064 0.128 0.128v767.776c-0.032 0.032-0.064 0.096-0.128 0.128H64.096c-0.032-0.032-0.096-0.064-0.128-0.128V128.128c0.032-0.032 0.064-0.096 0.128-0.128h895.776zM960 64H64C28.8 64 0 92.8 0 128v768c0 35.2 28.8 64 64 64h896c35.2 0 64-28.8 64-64V128c0-35.2-28.8-64-64-64z\' p-id=\'2421\' fill=\'%23bfbfbf\'%3E%3C/path%3E%3Cpath d=\'M832 288c0 53.024-42.976 96-96 96s-96-42.976-96-96 42.976-96 96-96 96 42.976 96 96zM896 832H128V704l224-384 256 320h64l224-192z\' p-id=\'2422\' fill=\'%23bfbfbf\'%3E%3C/path%3E%3C/svg%3E'
  }
})
export default class MyRendererEditor extends BasicEditor {
  tipName = '图片组件';
  $schema = '/schemas/UnkownSchema.json';
  tags = ['快速创建'];
  icon = "fa fa-crop";
  settingsSchema = {
    title: '组件配置',
    body: [
      {
        type: 'tabs',
        tabsMode: 'line',
        className: 'm-t-n-xs',
        contentClassName: 'no-border p-l-none p-r-none',
        tabs: [
          {
            title: '常规',
            controls: [
              {
                name: 'imgUrl',
                label: '图片上传',
                type: 'input-image',
                accept: ".jpeg, .jpg, .png, .gif",
                uploadType: "fileReceptor",
                receiver: {
                  "url": "/open-api/upload_static_file/recruitment",
                  "method": "post",
                  "requestAdaptor": "",
                  "adaptor": "console.log(payload, response, api);return {\n    status: payload.code===200?0:payload.code,\n    msg: payload.code===200?'ok':'上传失败',\n    data: {\n        value: payload.results[0]?.targetPath?'https:\//aitx.knxgalaxy.com'+payload.results[0].targetPath:'',\n    }\n}",
                  "messages": {
                  }
                }
              },
              {
                name: 'imgUrl',
                label: '图片URL',
                type: 'text'
              },
              {
                name: 'width',
                label: '宽度(支持百分比/px)',
                type: 'text'
              },
              {
                name: 'height',
                label: '高度(可不填)',
                type: 'text'
              }
            ]
          },

          {
            title: '拓展',
            controls: [
              {
                name: 'jumpUrl',
                label: '跳转链接',
                type: 'text'
              },
              // {
              //   name: 'coverText',
              //   label: '浮层文字',
              //   type: 'text'
              // },
              // {
              //   name: 'coverTextClass',
              //   label: '浮层文字类名',
              //   type: 'text'
              // },
            ]
          }
        ]
      }
    ]
  };
}

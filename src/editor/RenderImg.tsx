import React from 'react';
import {RendererEditor, BasicEditor} from 'amis-editor';

@RendererEditor('render-img', {
    name: '自定义渲染器2',
    description: '图片展示2',
    // docLink: '/docs/renderers/Nav',
    type: 'render-img',
    previewSchema: {
        // 用来生成预览图的
        type: 'render-img',
        url: 'data:image/svg+xml,%3C%3Fxml version=\'1.0\' standalone=\'no\'%3F%3E%3C!DOCTYPE svg PUBLIC \'-//W3C//DTD SVG 1.1//EN\' \'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\'%3E%3Csvg t=\'1631083237695\' class=\'icon\' viewBox=\'0 0 1024 1024\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' p-id=\'2420\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' width=\'1024\' height=\'1024\'%3E%3Cdefs%3E%3Cstyle type=\'text/css\'%3E%3C/style%3E%3C/defs%3E%3Cpath d=\'M959.872 128c0.032 0.032 0.096 0.064 0.128 0.128v767.776c-0.032 0.032-0.064 0.096-0.128 0.128H64.096c-0.032-0.032-0.096-0.064-0.128-0.128V128.128c0.032-0.032 0.064-0.096 0.128-0.128h895.776zM960 64H64C28.8 64 0 92.8 0 128v768c0 35.2 28.8 64 64 64h896c35.2 0 64-28.8 64-64V128c0-35.2-28.8-64-64-64z\' p-id=\'2421\' fill=\'%23bfbfbf\'%3E%3C/path%3E%3Cpath d=\'M832 288c0 53.024-42.976 96-96 96s-96-42.976-96-96 42.976-96 96-96 96 42.976 96 96zM896 832H128V704l224-384 256 320h64l224-192z\' p-id=\'2422\' fill=\'%23bfbfbf\'%3E%3C/path%3E%3C/svg%3E'
    },
    scaffold: {
        // 拖入组件里面时的初始数据
        type: 'render-img',
        url: 'data:image/svg+xml,%3C%3Fxml version=\'1.0\' standalone=\'no\'%3F%3E%3C!DOCTYPE svg PUBLIC \'-//W3C//DTD SVG 1.1//EN\' \'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\'%3E%3Csvg t=\'1631083237695\' class=\'icon\' viewBox=\'0 0 1024 1024\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' p-id=\'2420\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' width=\'1024\' height=\'1024\'%3E%3Cdefs%3E%3Cstyle type=\'text/css\'%3E%3C/style%3E%3C/defs%3E%3Cpath d=\'M959.872 128c0.032 0.032 0.096 0.064 0.128 0.128v767.776c-0.032 0.032-0.064 0.096-0.128 0.128H64.096c-0.032-0.032-0.096-0.064-0.128-0.128V128.128c0.032-0.032 0.064-0.096 0.128-0.128h895.776zM960 64H64C28.8 64 0 92.8 0 128v768c0 35.2 28.8 64 64 64h896c35.2 0 64-28.8 64-64V128c0-35.2-28.8-64-64-64z\' p-id=\'2421\' fill=\'%23bfbfbf\'%3E%3C/path%3E%3Cpath d=\'M832 288c0 53.024-42.976 96-96 96s-96-42.976-96-96 42.976-96 96-96 96 42.976 96 96zM896 832H128V704l224-384 256 320h64l224-192z\' p-id=\'2422\' fill=\'%23bfbfbf\'%3E%3C/path%3E%3C/svg%3E'
    }
})
export default class MyRendererEditor extends BasicEditor {
    tipName = '图片组件2';
    $schema = '/schemas/UnkownSchema.json';
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
                                name: 'url',
                                label: '图片URL',
                                type: 'text'
                            },
                            {
                                name: 'width',
                                label: '宽度',
                                type: 'text'
                            },
                            {
                                name: 'height',
                                label: '高度',
                                type: 'text'
                            }
                        ]
                    },

                    {
                        title: '外观',
                        controls: []
                    }
                ]
            }
        ]
    };
    // 配置表单一些简单的基本上够用了。
    // 还有一些逻辑可以复写来自定义的，但是我现在没时间写说明了。
}

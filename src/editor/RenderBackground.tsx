import {BasePlugin, BasicPanelItem, BuildPanelEventContext, registerEditorPlugin} from 'amis-editor';
import {BaseEventContext, RegionConfig} from 'amis-editor-core';
import React from 'react';

export class renderBackgroundPlugin extends BasePlugin {
    // 这里要跟对应的渲染器名字对应上
    // 注册渲染器的时候会要求指定渲染器名字
    // 一个组件在三个地方引用, 编辑器Editor.tsx页面引用editor下的页面,渲染页面index.tsx(分移动端和PC)引用render下的页面
    rendererName = 'render-background';

    // 暂时只支持这个，配置后会开启代码编辑器
    $schema = '/schemas/UnkownSchema.json';

    // 用来配置名称和描述
    name = '背景图容器';
    description = '可以设置背景图的容器';

    // tag，决定会在哪个 tab 下面显示的
    // tags = ['模板'];
    tags = ['快速创建'];
    // 图标
    icon = 'fa fa-info';

    // 用来生成预览图的
    previewSchema = {
        type: 'render-background',
        target: 'demo'
    };

    // 拖入组件里面时的初始数据
    scaffold = {
        type: 'render-background',
        body: [],
        target: 'demo'
    };

    regions: Array<RegionConfig> = [
        {
            key: 'body',
            label: '内容区'
        }
    ];

    // 右侧面板相关
    panelTitle = '自定义组件';

    panelBody = [
        {
            type: 'tabs',
            tabsMode: 'line',
            className: 'm-t-n-xs',
            contentClassName: 'no-border p-l-none p-r-none',
            tabs: [
                {
                    title: '常规',
                    body: [
                        {
                            name: 'imgUrl',
                            label: '容器背景图片上传',
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
                            label: '背景图片URL',
                            type: 'input-text'
                        },
                        {
                            "name": "width",
                            "type": "input-text",
                            "label": "容器宽度(默认px,支持百分比)",
                        },
                        {
                            "name": "height",
                            "type": "input-text",
                            "label": "容器高度",
                        }
                    ]
                },

                // {
                //     title: '外观',
                //     body: []
                // }
            ]
        }
    ];
}

registerEditorPlugin(renderBackgroundPlugin);




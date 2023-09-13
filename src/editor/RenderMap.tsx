import {BasePlugin, BasicPanelItem, BuildPanelEventContext, registerEditorPlugin} from 'amis-editor';
import {BaseEventContext} from 'amis-editor-core';
import React from 'react';

export class renderMapPlugin extends BasePlugin {
    // 这里要跟对应的渲染器名字对应上
    // 注册渲染器的时候会要求指定渲染器名字
    // 一个组件在三个地方引用, 编辑器页面引用editor下的页面,渲染页面(分移动端和PC)引用render下的页面
    rendererName = 'render-map';

    // 暂时只支持这个，配置后会开启代码编辑器
    $schema = '/schemas/UnkownSchema.json';

    // 用来配置名称和描述
    name = '地图展示';
    description = '地图位置展示';

    // tag，决定会在哪个 tab 下面显示的
    // tags = ['模板'];
    tags = ['快速创建'];
    // 图标
    icon = 'fa fa-info';

    // 用来生成预览图的
    previewSchema = {
        type: 'render-map',
        target: 'demo'
    };

    // 拖入组件里面时的初始数据
    scaffold = {
        type: 'render-map',
        target: 'demo'
    };

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
                            "name": "location",
                            "type": "input-text",
                            "label": "中心位置",
                        },
                        {
                            "name": "width",
                            "type": "input-text",
                            "label": "宽度(默认px,支持百分比)",
                        },
                        {
                            "name": "height",
                            "type": "input-text",
                            "label": "高度",
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
// 方式 1，注册默认插件，所有编辑器实例都会自动实例话。
// import {registerEditorPlugin} from 'amis-editor';

registerEditorPlugin(renderMapPlugin);




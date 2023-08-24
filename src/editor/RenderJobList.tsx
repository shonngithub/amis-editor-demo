import {BasePlugin, BasicPanelItem, BuildPanelEventContext, registerEditorPlugin} from 'amis-editor';
import {BaseEventContext} from 'amis-editor-core';
import React from 'react';

export class MyRendererPlugin1 extends BasePlugin {
    // 这里要跟对应的渲染器名字对应上
    // 注册渲染器的时候会要求指定渲染器名字
    rendererName = 'render-joblist';

    // 暂时只支持这个，配置后会开启代码编辑器
    $schema = '/schemas/UnkownSchema.json';

    // 用来配置名称和描述
    name = '职位列表';
    description = '职位列表';

    // tag，决定会在哪个 tab 下面显示的
    tags = ['模板'];

    // 图标
    icon = 'fa fa-user';

    // 用来生成预览图的
    previewSchema = {
        type: 'render-joblist',
        target: 'demo'
    };

    // 拖入组件里面时的初始数据
    scaffold = {
        type: 'render-joblist',
        target: '233'
    };

    // 右侧面板相关
    panelTitle = '自定义组件';
    // panelBodyCreator = (context: BaseEventContext) => {
    //     console.log(context);
    //     return [
    //         {
    //             type: 'tabs',
    //             tabsMode: 'line',
    //             className: 'm-t-n-xs',
    //             contentClassName: 'no-border p-l-none p-r-none',
    //             tabs: [
    //                 {
    //                     title: '常规1',
    //                     body: [
    //                         {
    //                             name: 'target',
    //                             label: 'Target',
    //                             type: 'input-text'
    //                         }
    //                     ]
    //                 },
    //
    //                 {
    //                     title: '外观1',
    //                     body: []
    //                 }
    //             ]
    //         }
    //     ];
    // };

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
                            "name": "jobDetailPath",
                            "type": "input-text",
                            "label": "职位详情页跳转路径",
                        },
                        {
                            "name": "switchSearch",
                            "type": "switch",
                            "value": true,
                            "label": "是否启用搜索",
                        },
                        {
                            "type": "checkboxes",
                            "label": "配置可搜索字段",
                            "name": "searchBoxKeys",
                            "inline": false,
                            "multiple": true,
                            "options": [
                                {
                                    "label": "职位名称",
                                    "value": "A"
                                },
                                // {
                                //     "label": "薪资",
                                //     "value": "B"
                                // },
                                // {
                                //     "label": "工作地址",
                                //     "value": "C"
                                // },
                                {
                                    "label": "发布时间",
                                    "value": "D"
                                }
                            ],
                            "checkAll": true,
                            "joinValues": true,
                            "value": "A,D"
                        },
                        {
                            "type": "checkboxes",
                            "label": "配置展示字段",
                            "name": "showBoxKeys",
                            "inline": false,
                            "multiple": true,
                            "options": [
                                {
                                    "label": "职位名称",
                                    "value": "A"
                                },
                                {
                                    "label": "薪资",
                                    "value": "B"
                                },
                                {
                                    "label": "工作地址",
                                    "value": "C"
                                },
                                {
                                    "label": "发布时间",
                                    "value": "D"
                                }
                            ],
                            "checkAll": true,
                            "joinValues": true,
                            "value": "A,B,C,D"
                        },
                        {
                            "type": "checkboxes",
                            "label": "招聘类型过滤",
                            "name": "recruitmentType",
                            "inline": true,
                            "multiple": true,
                            "options": [
                                {
                                    "label": "校园招聘",
                                    "value": "校园招聘"
                                },
                                {
                                    "label": "社会招聘",
                                    "value": "社会招聘"
                                }
                            ],
                            // "checkAll": true,
                            "joinValues": true,
                            "value": "校园招聘,社会招聘"
                        }
                    ]
                },
                //
                // {
                //     title: '外观',
                //     body: []
                // }
            ]
        }
    ];

    // /**
    //  * 配置了 panelControls 自动生成配置面板
    //  * @param context
    //  * @param panels
    //  */
    // buildEditorPanel(context:BuildPanelEventContext, panels:BasicPanelItem[]) {
    //   panels.push({
    //         icon: 'your-icon', // 添加 icon 属性
    //         key: 'panel1',
    //         title: '设置',
    //         render: () => {
    //             return <div>面板内容</div>;
    //         }
    //   });
    // }
}
// 方式 1，注册默认插件，所有编辑器实例都会自动实例话。
// import {registerEditorPlugin} from 'amis-editor';

registerEditorPlugin(MyRendererPlugin1);




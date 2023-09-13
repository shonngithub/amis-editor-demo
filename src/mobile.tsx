import React from 'react';
import ReactDOM from 'react-dom';
import {mountInIframe} from 'amis-editor-core';
import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
// import 'amis/lib/themes/default.css';
import 'amis/lib/themes/antd.css';
import 'amis-editor-core/lib/style.css';
import {setDefaultTheme} from "amis";

// 导入自定义组件
import './renderer/MyRenderer';
import './renderer/RenderImg';
import './renderer/RenderJobList';
import './renderer/RenderJobDetail';
import './renderer/RenderMap';

setDefaultTheme('antd');


mountInIframe(document.getElementById('root') as HTMLElement, ReactDOM);

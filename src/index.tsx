/**
 * @file entry of this example.
 */
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
// import 'amis/lib/themes/cxd.css';
import 'amis/lib/themes/antd.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';
import 'amis-editor-core/lib/style.css';
import './scss/style.scss';
import {setDefaultTheme} from 'amis';

// setDefaultTheme('cxd');
setDefaultTheme('antd');

// react < 18
ReactDOM.render(<App />, document.getElementById('root'));

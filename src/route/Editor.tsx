import React,{useEffect} from 'react';
import {Editor, ShortcutKey, MiniEditor} from 'amis-editor';
import {inject, observer} from 'mobx-react';
import {RouteComponentProps} from 'react-router-dom';
import {toast, Select, alert} from 'amis';
import {currentLocale} from 'i18n-runtime';
import {Icon} from '../icons/index';
import {IMainStore} from '../store';
import '../editor/DisabledEditorPlugin'; // 用于隐藏一些不需要的Editor预置组件
// import '../renderer/MyRenderer';
import '../editor/MyRenderer';
// import '../editor/RenderImg';
import '../editor/RenderJobList';
import '../editor/RenderJobDetail';


// import '../renderer/RenderFullText';

import jsonApi from '../api';

let currentIndex = -1;

let host = `${window.location.protocol}//${window.location.host}`;
let iframeUrl = '/editor.html';

// 如果在 gh-pages 里面
if (/^\/jsonEdit/.test(window.location.pathname)) {
  host += '/jsonEdit';
  iframeUrl = '/jsonEdit' + iframeUrl;
}

const schemaUrl = `${host}/schema.json`;

const editorLanguages = [
  {
    label: '简体中文',
    value: 'zh-CN'
  },
  {
    label: 'English',
    value: 'en-US'
  }
];

export default inject('store')(
  observer(function ({
    store,
    location,
    history,
    match
  }: {store: IMainStore} & RouteComponentProps<{id: string}>) {
    const index: number = parseInt(match.params.id, 10);
    const curLanguage = currentLocale(); // 获取当前语料类型

    console.log(store.isMobile);

    useEffect(() => {
      console.log(store.isMobile);
      const previewBodyElement = document.querySelector('.ae-Preview-body');
      if (store.isMobile) {
        if (previewBodyElement) {
          // 添加 "is-mobile" 类名
          previewBodyElement.classList.add('is-mobile');
        }
      }else {
        previewBodyElement && previewBodyElement.classList.remove('is-mobile');
      }
    },[store.isMobile])

    if (index !== currentIndex) {
      currentIndex = index;
      store.updateSchema(store.pages[index].schema);
    }

    function save() {
      console.log(index);
      store.updatePageSchemaAt(index);
      toast.success('保存成功', '提示');
    }

    async function submit() {
      console.log(store.schema, store.pages[index]);
      // console.log(jsonApi);
      const res = await jsonApi.saveFile({
        id: store.pages[index].id,
        content: store.pages[index]
      });
      console.log(res);
      if(res.code===0){
        alert(
            '页面路径:'+ store.pages[index].path + ',发布成功,页面分享地址:    ' +
            window.location.origin +
            window.location.pathname + '?tid=' +localStorage.getItem('tenantId') +
            '#/publishPage/' +
            store.pages[index].id,
            '提示'
        );
      }else {
        toast.error('发布失败'+res.msg);
      }

      // toast.success(store.schema, 'json')
    }

    function onChange(value: any) {
      console.log(value);
      store.updateSchema(value);
      store.updatePageSchemaAt(index);
    }

    function changeLocale(value: string) {
      localStorage.setItem('suda-i18n-locale', value);
      window.location.reload();
    }

    function exit() {
      console.log(store);
      history.push(`/${store.pages[index].path}`);
    }

    return (
      <div className="Editor-Demo">
        <div className="Editor-header">
          <div className="Editor-title">可视化编辑器</div>
          <div className="Editor-view-mode-group-container">
            <div className="Editor-view-mode-group">
              <div
                className={`Editor-view-mode-btn editor-header-icon ${
                  !store.isMobile ? 'is-active' : ''
                }`}
                onClick={() => {
                  store.setIsMobile(false);
                }}
              >
                <Icon icon="pc-preview" title="PC模式" />
              </div>
              <div
                className={`Editor-view-mode-btn editor-header-icon ${
                  store.isMobile ? 'is-active' : ''
                }`}
                onClick={() => {
                  store.setIsMobile(true);
                }}
              >
                <Icon icon="h5-preview" title="移动模式" />
              </div>
            </div>
          </div>

          <div className="Editor-header-actions">
            <ShortcutKey />
            {/*<Select*/}
            {/*  className="margin-left-space"*/}
            {/*  options={editorLanguages}*/}
            {/*  value={curLanguage}*/}
            {/*  clearable={false}*/}
            {/*  onChange={(e: any) => changeLocale(e.value)}*/}
            {/*/>*/}
            <div
              className={`margin-left-space header-action-btn m-1 ${
                store.preview ? 'primary' : ''
              }`}
              onClick={() => {
                store.setPreview(!store.preview);
              }}
            >
              {store.preview ? '编辑' : '预览'}
            </div>
            {!store.preview && (
              <div className={`header-action-btn exit-btn`} onClick={exit}>
                退出
              </div>
            )}
            <div className={`header-action-btn exit-btn`} onClick={submit}>
              提交发布
            </div>
          </div>
        </div>
        <div className="Editor-inner">
          {/*<div className="ae-Preview">*/}
          {/*  <div className="ae-Preview-body is-edting is-mobile" style={{"position": "relative"}}>*/}
          {/*    <div className="mobile-sound"></div>*/}
          {/*    <div className="mobile-receiver"></div>*/}
          {/*    <div className="mobile-left-btn"></div>*/}
          {/*    <div className="mobile-right-btn"></div>*/}
          {/*    <div className="mobile-open-btn"></div>*/}
          {/*    <div className="ae-Preview-inner">*/}
          {/*      1111111*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}



          <Editor
            theme={'antd'}
            preview={store.preview}
            // isMobile={store.isMobile}
            value={store.schema}
            onChange={onChange}
            onPreview={() => {
              store.setPreview(true);
            }}
            onSave={save}
            className="is-fixed"
            $schemaUrl={schemaUrl}
            iframeUrl={iframeUrl}
            showCustomRenderersPanel={true}
            amisEnv={{
              fetcher: store.fetcher,
              notify: store.notify,
              alert: store.alert,
              copy: store.copy
            }}
          />
        </div>
      </div>
    );
  })
);

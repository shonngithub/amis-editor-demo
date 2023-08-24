import {types, getEnv, applySnapshot, getSnapshot} from 'mobx-state-tree';
import {PageStore} from './Page';
import {when, reaction} from 'mobx';
import jsonApi from '../api';
import {toast} from "amis";
let pagIndex = 1;
export const MainStore = types
  .model('MainStore', {
    pages: types.optional(types.array(PageStore), [
      {
        id: `${pagIndex}`,
        path: 'test',
        label: '示例',
        icon: 'fa fa-file',
        schema: {
          type: 'page',
          title: '示例页面',
          body: '初始页面'
        }
      }
    ]),
    theme: 'antd',
    asideFixed: true,
    asideFolded: false,
    offScreen: false,
    addPageIsOpen: false,
    preview: false,
    isMobile: false,
    schema: types.frozen()
  })
  .views(self => ({
    get fetcher() {
      return getEnv(self).fetcher;
    },
    get notify() {
      return getEnv(self).notify;
    },
    get alert() {
      return getEnv(self).alert;
    },
    get copy() {
      return getEnv(self).copy;
    }
  }))
  .actions(self => {
    function toggleAsideFolded() {
      self.asideFolded = !self.asideFolded;
    }

    function toggleAsideFixed() {
      self.asideFixed = !self.asideFixed;
    }

    function toggleOffScreen() {
      self.offScreen = !self.offScreen;
    }

    function setAddPageIsOpen(isOpened: boolean) {
      self.addPageIsOpen = isOpened;
    }

    function addPage(data: {
      id: string;
      label: string;
      path: string;
      icon?: string;
      schema?: any;
    }) {
      self.pages.push(
        PageStore.create({
          ...data,
          // id: `${++pagIndex}`
        })
      );
    }

    function removePageAt(index: number) {
      self.pages.splice(index, 1);
    }

    function updatePageSchemaAt(index: number) {
      self.pages[index].updateSchema(self.schema);
    }

    function updateSchema(value: any) {
      self.schema = value;
    }

    function setPreview(value: boolean) {
      self.preview = value;
    }

    function setIsMobile(value: boolean) {
      self.isMobile = value;
    }

    return {
      toggleAsideFolded,
      toggleAsideFixed,
      toggleOffScreen,
      setAddPageIsOpen,
      addPage,
      removePageAt,
      updatePageSchemaAt,
      updateSchema,
      setPreview,
      setIsMobile,
      afterCreate() {
        // persist store
        if (typeof window !== 'undefined' && window.localStorage) {
          const storeData = window.localStorage.getItem('store');
          if (storeData) applySnapshot(self, JSON.parse(storeData));

          jsonApi.getUerInfo().then((res)=>{
            // console.log(res?.data);
            if(res?.data?.tenantId){
              localStorage.setItem('tenantId',res.data.tenantId);
            }
          })

          // publishPage 无需获取jsonlist
          location.hash.indexOf('#/publishPage')===-1 && jsonApi.getAllFile().then(res => {
            console.log(res);
            if(res.code !== 0){
              toast.info(res.msg);
              // 去登录
              // window.open(`${window.location.origin}/user-center/login?referrer=${encodeURIComponent(window.location.href)}`, '_self');
            }
            const resList = res?.data?.records || [];
            const initData = {
              pages: resList.map((it: any) => {
                let item = JSON.parse(it.jsonData);
                return {
                  id: `${item.id||it.id}`,
                  path: item.path,
                  label: item.label,
                  icon: item.icon,
                  schema: item.schema
                };
              }),
              theme: 'antd',
              asideFixed: true,
              asideFolded: false,
              offScreen: false,
              addPageIsOpen: false,
              preview: false,
              isMobile: false
            };
            (resList.length===0) && initData.pages.unshift({
              id: `0`,
              path: 'test',
              label: '示例',
              icon: 'fa fa-file',
              schema: {
                type: 'page',
                title: '示例页面',
                body: '初始页面'
              }
            });
            applySnapshot(self, initData);
          });

          reaction(
            () => getSnapshot(self),
            json => {
              window.localStorage.setItem('store', JSON.stringify(json));
            }
          );
        }
      }
    };
  });

export type IMainStore = typeof MainStore.Type;

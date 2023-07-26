import * as React from 'react';
import axios from 'axios';
// import copy from 'copy-to-clipboard';
import {MainStoreContext} from '../store/MainStoreContext';
import {render as renderAmis} from 'amis';
import {ToastComponent, AlertComponent, alert, confirm, toast} from 'amis-ui';
import AMISRenderer from '../component/AMISRenderer';
import {useCallback, useState, useContext, useEffect} from 'react';
import {observer} from 'mobx-react';
import jsonApi from '../api';

const PublishPage = () => {
  const store = useContext(MainStoreContext);
  const [schema, setSchema] = useState();
  const pathParam = window.location.href.split('publishPage')[1];
  console.log(pathParam);
  const getSchema = useCallback(async () => {
    const res = await jsonApi.getFileByPath(pathParam || '/test/homes.json');
    console.log(res);
    setSchema(res.schema);
  }, []);

  useEffect(() => {
    getSchema();
  }, []);

  return <div>{schema ? <AMISRenderer schema={schema} /> : '......'}</div>;
};

export default observer(PublishPage);

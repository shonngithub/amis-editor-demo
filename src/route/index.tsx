import React from 'react';
import {ToastComponent, AlertComponent, Spinner} from 'amis';
import {Route, Switch, Redirect, HashRouter as Router} from 'react-router-dom';
import {observer} from 'mobx-react';
import {IMainStore} from '../store';
// import Preview from './Preview';
// import Editor from './Editor';

// 全局注册渲染器
import '../renderer/MyRenderer';
import '../renderer/RenderImg';
import '../renderer/RenderJobList';
import '../renderer/RenderJobDetail';
import '../renderer/RenderMap';

const Preview = React.lazy(() => import('./Preview'));
const Editor = React.lazy(() => import('./Editor'));
const PublishPage = React.lazy(() => import('./PublishPage'));

export default observer(function ({store}: {store: IMainStore}) {
  return (
    <Router>
      <div className="routes-wrapper">
        <ToastComponent key="toast" position={'top-right'} />
        <AlertComponent key="alert" />
        <React.Suspense
          fallback={<Spinner overlay className="m-t-lg" size="lg" />}
        >
          <Switch>
            <Redirect to={`/home`} from={`/`} exact />
            <Route path="/edit/:id" component={Editor} />
            <Route path="/publishPage/:path" component={PublishPage} />
            <Route component={Preview} />
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
});

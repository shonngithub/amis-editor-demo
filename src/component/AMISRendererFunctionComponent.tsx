import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { getEnv, IAnyStateTreeNode } from 'mobx-state-tree';
import { IMainStore } from '../store'; // 根据实际情况导入 IMainStore 接口
import qs from 'qs';
import { render as amisRender, utils, filter } from 'amis';

interface ISchemaRendererProps extends RouteComponentProps {
    schema?: any;
    transform?: any;
    session?: string;
    store?: IMainStore;
    embedMode?: boolean;
}

function SchemaRendererComponent({
                                     schema: schemaProp,
                                     transform,
                                     session = 'page',
                                     history,
                                     match,
                                     location,
                                     store,
                                     ...rest
                                 }: ISchemaRendererProps) {
    const envRef = React.useRef<any>(null);

    const getEnvInstance = React.useCallback(() => {
        if (envRef.current) {
            return envRef.current;
        }

        const normalizeLink = (to: string, preserveHash?: boolean) => {
            to = to || '';
            const currentQuery = qs.parse(location.search.substring(1));
            to = filter(
                to.replace(/\$\$/g, qs.stringify(currentQuery)),
                currentQuery
            );

            if (to && to[0] === '#') {
                to = location.pathname + location.search + to;
            } else if (to && to[0] === '?') {
                to = location.pathname + to;
            }

            if (preserveHash) {
                const currentHash = location.hash;
                if (currentHash) {
                    to += currentHash;
                }
            }

            return to;
        };

        const isCurrentUrl = (to: string) => {
            const link = normalizeLink(to);
            const currentLocation = history.location;
            const currentHash = currentLocation.hash;
            const currentPathname = currentLocation.pathname;
            const currentQuery = currentLocation.search;

            return (
                link === currentPathname + currentQuery + currentHash ||
                link === currentPathname + currentQuery ||
                link === currentPathname
            );
        };

        const updateLocation = (location: string, replace: boolean) => {
            if (location === 'goBack') {
                return history.goBack();
            } else if (/^https?\:\/\//.test(location)) {
                return (window.location.href = location);
            }

            history[replace ? 'replace' : 'push'](
                normalizeLink(location, replace)
            );
        };

        const jumpTo = (to: string, action: any) => {
            if (/^https?:\/\//.test(to)) {
                window.location.href = to;
            } else {
                history.push(to);
            }
        };

        const affixOffsetTop = rest.embedMode ? 0 : 50;

        const rootEnv = getEnv(store);

        const envInstance = {
            ...rootEnv,
            session,
            isCurrentUrl,
            updateLocation,
            jumpTo,
            affixOffsetTop,
        };

        envRef.current = envInstance;
        return envInstance;
    }, [store, rest.embedMode, history, location]);

    let finalSchema = schemaProp || { type: 'page', body: 'It works' };
    if (!finalSchema.type) {
        finalSchema = { ...finalSchema, type: 'page' };
    }

    const amisRenderProps = {
        data: utils.createObject({
            ...match.params,
            amisStore: store,
            pathname: location.pathname,
            params: match.params,
        }),
        ...rest,
        fetcher: store?.fetcher,
        notify: store?.notify,
        alert: store?.alert,
        copy: store?.copy,
        propsTransform: transform,
        theme: store?.theme,
    };

    const body = amisRender(finalSchema, amisRenderProps, getEnvInstance());

    return <>{body}</>;
}

export default withRouter(
    inject('store')(observer(SchemaRendererComponent))
);

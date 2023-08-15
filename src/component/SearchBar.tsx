import {schema2component} from './AMISRenderer';
import React, {useCallback, useEffect, useState} from 'react';

interface SearchBarProps {
    show: boolean,
    onSubmit: (val: any) => void,
    data: {},
    searchBoxKeys: string,
    hasKey: (key: string, searchList: string) => boolean
}

const SearchBar = (({ show, data, searchBoxKeys, hasKey, ...args }: SearchBarProps)=>{
    const SearchBarComponent = schema2component(
        {
            "type": "page",
            "body": {
                "type": "form",
                "title": "内联模式",
                "mode": "inline",
                "data": data,
                "wrapWithPanel": false,
                "body": [
                    {
                        "type": "input-text",
                        "name": "name",
                        "label": "职位名称",
                        "clearable": true,
                        "hidden": !hasKey('A', searchBoxKeys)
                    },
                    {
                        "type": "input-date",
                        "label": "发布时间",
                        "name": "date",
                        "hidden": !hasKey('D', searchBoxKeys)
                    },
                    // {
                    //     "name": "city",
                    //     "type": "input-city",
                    //     "label": "城市",
                    //     "searchable": true
                    // },
                    {
                        "type": "submit",
                        "label": "搜索",
                        "level": "primary"
                    }
                ]
            }
        },
        ({onSubmit, ...rest}: any) => {
            // console.log(show);
            // console.log(submit);
            console.log(rest);
            return {
                onSubmit: (values: any) => {
                    console.log(values);
                    onSubmit && onSubmit(values);
                },
                ...rest
          };
        }
    )
    return <SearchBarComponent {...args}/>
})

export default SearchBar;

import {Renderer, RendererProps} from 'amis';
import React, {useCallback, useEffect, useState} from 'react';
// import dayjs from 'dayjs';
import {autoConvertPX} from '../component/utils';

interface RenderBackgroundProps extends RendererProps {
  imgUrl?: string;
  width?: string;
  height?: string;
}

const RenderBackground: React.FC<RenderBackgroundProps> = ({imgUrl,
  width = '100%',
  height,
  env,
  ...args
}) => {
  console.log('args>', args, env);
  const {body, render} = args;
  console.log('body>>>>>>', body, imgUrl);
  const hasChildren = body && body.length>0 && body[0]['id'];

  return (
    <div
      style={{
        background: 'url(' + imgUrl + ') 0 0 / 100% no-repeat',
        width: autoConvertPX(width),
        height: autoConvertPX(height ? height : hasChildren ? 'auto' : '300')
      }}
    >
      {body
        ? render('body', body, {
            // 这里的信息会作为 props 传递给子组件，一般情况下都不需要这个
          })
        : ''}
    </div>
  );
};

export default Renderer({
  type: 'render-background',
  name: 'render-background',
  autoVar: true
})(RenderBackground);

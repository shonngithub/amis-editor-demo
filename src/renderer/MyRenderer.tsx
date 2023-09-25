import {Renderer} from 'amis';
import {RendererProps} from 'amis';
import React from 'react';
import { autoConvertPX } from '../component/utils'

export interface MyRendererProps extends RendererProps {
  imgUrl?: string;
  width?: string;
  height?: string;
  coverText?: string;
  jumpUrl?: string;
  coverTextClass?: string;
}

@Renderer({
  test: /\bmy-renderer$/,
  name: 'my-renderer'
})
export default class MyRenderer extends React.Component<MyRendererProps> {
  static defaultProps = {
    // https://infinityicon.infinitynewtab.com/user-share-icon/226d9bd6e7176a22d1696d751947a178.png
    imgUrl: "",
    width: '100px',
    height: 'auto'
  };

  render() {
    const { body, render, width, height, imgUrl,jumpUrl,coverText, coverTextClass, ...args} = this.props;
    // console.log(width, height, imgUrl);
    // console.log(args);
    console.log(body, render);

    const jump = (url: string|undefined) => {
      if(!url) return;
      if(url.indexOf('publishPage/') > -1){
        window.open(location.href.split('#')[0]+'#'+url,'_self');
        window.location.reload();
        return;
      }
      window.location.href = url
    }

    return (
        <div>
          <img onClick={()=>{jump(jumpUrl)}} style={{width:autoConvertPX(width||''), height:autoConvertPX(height||'') }} src={imgUrl} alt=""/>
          <div>
            {body?render('body', body, {
              // 这里的信息会作为 props 传递给子组件，一般情况下都不需要这个
            }):''}
          </div>
         </div>
    );
  }
}

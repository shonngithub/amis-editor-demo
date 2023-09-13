import {Renderer} from 'amis';
import {RendererProps} from 'amis';
import React from 'react';

export interface MyRendererProps extends RendererProps {
  imgUrl?: string;
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
    const { width, height, imgUrl, ...args} = this.props;
    // console.log(width, height, imgUrl);
    return (
        <div>
          <img style={{width, height }} src={imgUrl} alt=""/>
        </div>
    );
  }
}

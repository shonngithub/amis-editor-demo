import {Renderer} from 'amis';
import {RendererProps} from 'amis';
import React from 'react';

export interface MyRendererProps extends RendererProps {
  target?: string;
}

@Renderer({
  // test: /\br2$/,
  type: 'render-img',
  autoVar: true,
  name: 'render-img'
})
export default class RenderImg extends React.Component<MyRendererProps> {
  static defaultProps = {
    // https://infinityicon.infinitynewtab.com/user-share-icon/226d9bd6e7176a22d1696d751947a178.png
    url: "",
    width: '100px',
    height: '100px'
  };

  render() {
    const {url, width, height} = this.props;

    return (
        <div>
          1111111111111
        </div>
    );
  }
}
import {Component, IframeHTMLAttributes, Ref} from 'react';

export default class ReactIFrame extends Component<
IframeHTMLAttributes<HTMLIFrameElement> & {innerRef?: Ref<any>}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <iframe {...this.props} />;
  }
}

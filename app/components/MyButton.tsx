import React from 'react';
import { Button, GestureResponderEvent, ButtonProps } from 'react-native';

interface MyButtonProps extends ButtonProps {
  uri: string;
  key: number;
}

export default class MyButton extends React.Component<MyButtonProps, {}> {
  _onPressButton = (uri: string) => {
    fetch(uri).then((res) => {
      console.log(res);
    }).catch((e) => console.log(e));
  };

  render() {
    const { onPress, ...rest } = this.props;
    return (
      <Button
        onPress={(event: GestureResponderEvent) => {
          this._onPressButton(this.props.uri);
          if (onPress !== undefined) {
            onPress(event);
          }
        }}
        {...rest}
      />
    );
  }
}

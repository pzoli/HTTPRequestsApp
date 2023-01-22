import React from 'react';
import { StyleSheet, Pressable, GestureResponderEvent, PressableProps, Text } from 'react-native';

interface MyButtonProps extends PressableProps {
  key: number;
  uri: string;
  title: string;
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
      <Pressable style={({ pressed }) => [
        {
          backgroundColor: pressed ? '#3F8f7F' : '#318ce7',
        }, styles.pressableStyle]}
        onPress={(event: GestureResponderEvent) => {
          this._onPressButton(this.props.uri);
          if (onPress !== undefined && onPress !== null) {
            onPress(event);
          }

        }}
        {...rest}
      >
        <Text style={styles.titleStyle}>{this.props.title}</Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'

  },
  pressableStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    height: 100,
    borderRadius: 10
  },
})
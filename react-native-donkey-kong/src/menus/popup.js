import React, { PureComponent } from "react";
import { ScrollView, View, Dimensions, TouchableOpacity, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import EStyleSheet from "react-native-extended-stylesheet";

export default class Popup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Animatable.View
        useNativeDriver
        style={styles.container}
        animation="bounceInUp"
      >
        <ScrollView
          ref={"scrollView"}
          onContentSizeChange={_ => {
            this.refs.scrollView.scrollToEnd({
              animated: true
            });
          }}
          onLayout={({
            nativeEvent: {
              layout: { height }
            }
          }) =>
            this.setState({
              scrollViewHeight: height
            })
          }
          contentContainerStyle={[
            styles.scrollViewContainer,
            {
              minHeight: this.state.scrollViewHeight
            }
          ]}
        >
          {this.props.children}
        </ScrollView>

        <TouchableOpacity
          onPress={this.props.onPlayAgain}
          style={styles.playGameButton}
        >
          <View>
            <Text style={{ color: "white" }}>Play Again</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.props.onQuit}
          style={styles.cancelButton}
        >
          <View>
            <Text style={{ color: "white" }}>No Thanks!</Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)"
  },
  scrollViewContainer: {
    width: () =>
      Math.min(
        EStyleSheet.value("$donkeyKongMenuMaxWidth"),
        Dimensions.get("window").width
      ),
    alignSelf: "center",
    justifyContent: "center"
  },
  playGameButton: {
    maxWidth: "$donkeyKongMenuMaxWidth",
    alignSelf: "center",
    marginBottom: 0
  },
  cancelButton: {
    maxWidth: "$donkeyKongMenuMaxWidth",
    alignSelf: "center",
    marginBottom: 30,
    backgroundColor: "#ff4136"
  }
});

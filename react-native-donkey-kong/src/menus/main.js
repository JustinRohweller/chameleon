import React, { PureComponent } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export default class MainMenu extends PureComponent {
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableOpacity onPress={this.props.onPlayGame}>
          <View>
            <Text style={{ color: "white" }}>Play Game</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "$donkeyKongMenuBackgroundColor"
  },
  contentContainer: {
    maxWidth: "$donkeyKongMenuMaxWidth",
    alignSelf: "center",
    alignItems: "center"
  }
});

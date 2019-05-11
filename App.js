import React from "react";
import { AppLoading, Asset, Font } from 'expo';
// import DonkeyKong from "react-native-donkey-kong";
import DonkeyKong from './react-native-donkey-kong';

export default class App extends React.Component {
  state = {
    ready: false
  }

  render() {
    // if (!this.state.ready) {
    //   return (
    //     <AppLoading
    //       startAsync={this._loadAssetsAsync}
    //       onFinish={() => this.setState({ ready: true })}
    //     />
    //   );
    // }

    return (
      <DonkeyKong
        // theme={{
        //   $donkeyKongMenuFont: "ArcadeClassic"
        // }}
      />
    );
  }
}

//app.json
// "icon": "./assets/icon.png",
    // "splash": {
    //   "image": "./assets/splash.png",
    //   "resizeMode": "contain",
    //   "backgroundColor": "#ffffff"
    // },

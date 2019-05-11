import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import { collisionCategories } from "../../utils/constants";
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import Matter from "matter-js";
import ChameleonWalking from './chameleon-walking.gif';
import ChameleonLicking from './chameleon-licking.gif';


export class Renderer extends Component {
  render() {
    const source = this.props.actions[this.props.action];
    const { width, height } = source;
    const body = this.props.body;
    const x = body.position.x - width / 2;
    const y = body.position.y - height / 2;
    const angle = body.angle;
    const direction = this.props.direction.horizontal;
    
    return (
      <Image
        source={source}
        style={[
          styles.mario,
          {
            left: x,
            top: y,
            transform: [
              { rotateZ: angle + "rad" },
              { rotateY: (direction === "right" ? 180 : 0) + "deg" }
            ]
          }
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  mario: {
    position: "absolute"
  }
});

export default (world, pos) => {
  let width = 30;
  let height = 40;
  let body = Matter.Bodies.rectangle(pos.x, pos.y, width, height, {
    density: 0.8,
    frictionAir: 0.2,
    friction: 1,
    collisionFilter: {
      category: collisionCategories.mario,
      mask:
        collisionCategories.barrier |
        collisionCategories.platform |
        collisionCategories.barrel
    }
  });
  Matter.World.add(world, [body]);
  return {
    body,
    size: { width, height },
    controls: {
      gestures: {},
      // mode: "platform"
      mode: "ladder"
    },
    direction: {
      horizontal: "none",
      vertical: "up",
      // horizontal: "none",
      // vertical: "none"
    },
    action: "idling",
    actions: {
      jumping: resolveAssetSource(ChameleonLicking),
      holding: resolveAssetSource(ChameleonWalking),
      climbing: resolveAssetSource(ChameleonWalking),
    },
    "power-ups": {},
    animations: {},
    renderer: <Renderer />
  };
};

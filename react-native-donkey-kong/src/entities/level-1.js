import React from "react";
import { Dimensions } from "react-native";
import Matter from "matter-js";
import Ladder from "../components/ladder";
import Mario from "../components/mario";
import Tile from "../components/common/tile";
import { collisionCategories } from "../utils/constants";
import { filter, any, find } from "../utils";

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

const { width, height } = Dimensions.get("window");
const scale = Math.min(width, 430) / 375;
const cx = width / 2;
const cy = height / 2;
const offsetY = (height - 465) / 2 - 35;
const platformWidth = Math.min(width, 430);

export default restart => {
    //-- Cleanup existing entities..
    if (restart) Matter.Engine.clear(restart.physics.engine);

    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    world.gravity = { x: 0, y: 0 };

    return {
        physics: { engine: engine, world: world },

        // ladder1: Ladder(
        //     world,
        //     { x: cx + platformWidth * 0.125 - 12, y: offsetY + 70 },
        //     50,
        //     true,
        //     false,
        //     "left"
        // ),

        // Princess is referenced in the camera.js. She is the goal. Replace with goal as name.
        princess: {
            source: require("../components/props/princess.gif"),
            position: { x: cx, y: offsetY + 2 },
            size: { width: 75, height: 45 },
            renderer: <Tile />
        },

        mario: Mario(world, { x: cx, y: offsetY + 465 - 20 / 2 - 20 }),

        camera: { offsetY: 0 }
    };
};

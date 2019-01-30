import Matter from "matter-js";
import { find, filter, position, shift, base } from "../utils";
import { closest } from "../utils/ladders";
import { collisionCategories } from "../utils/constants";

export default (entities, { events }) => {
	let mario = entities.mario;

	if (mario.controls.mode !== "ladder") return entities;

	Matter.Sleeping.set(mario.body, true);
	mario.body.collisionFilter.mask = 0;

	let ladders = filter(entities, x => x.ladder && x.ladder.climbable)
	let ladder = closest(ladders, mario);
	let gestures = mario.controls.gestures;
	let goingUp = mario.direction.vertical === "up";
	let marioBase = base(mario);
	let canGoDown = true;
	let nearTop = false;

	Matter.Body.setPosition(mario.body, { x: position(mario).x, y: position(mario).y })


	let actions = [
		// Needs to be more of these: ie. 
		// up && no horizontal, left and no vertical, ect.
		// {
		// 	if: gestures.hold && mario.direction.horizontal === "left",
		// 	then: () => {
		// 		if (gestures.hold &&mario.direction.vertical === "up") {
		// 			// Going up and left
		// 			mario.action = nearTop ? "rising" : "holding";
		// 			Matter.Body.setPosition(mario.body, shift(position(mario), -1, -1))
		// 		} else if (gestures.hold &&mario.direction.vertical === "down") {
		// 			mario.action = nearTop ? "rising" : "holding";
		// 			Matter.Body.setPosition(mario.body, shift(position(mario), -1, 1))
		// 		} else {
		// 			mario.action = nearTop ? "rising" : "holding";
		// 			Matter.Body.setPosition(mario.body, shift(position(mario), -1, 0))
		// 		}
		// 	}
		// },

		// {
		// 	if: gestures.hold && mario.direction.horizontal === "right",
		// 	then: () => {
		// 		if (gestures.hold &&mario.direction.vertical === "up") {
		// 			// Going up and left
		// 			mario.action = nearTop ? "rising" : "holding";
		// 			Matter.Body.setPosition(mario.body, shift(position(mario), 1, -1))
		// 		} else if (gestures.hold &&mario.direction.vertical === "down") {
		// 			mario.action = nearTop ? "rising" : "holding";
		// 			Matter.Body.setPosition(mario.body, shift(position(mario), 1, 1))
		// 		} else {
		// 			mario.action = nearTop ? "rising" : "holding";
		// 			Matter.Body.setPosition(mario.body, shift(position(mario), 1, 0))
		// 		}
		// 	}
		// },
		{
			if: gestures.hold && mario.direction.horizontal === "up",
			then: () => {
				mario.action = nearTop ? "rising" : "holding";
				Matter.Body.setPosition(mario.body, shift(position(mario), 0, -1))
			}
		},
		{
			if: gestures.hold && mario.direction.horizontal === "down",
			then: () => {
				mario.action = nearTop ? "rising" : "holding";
				Matter.Body.setPosition(mario.body, shift(position(mario), 0, 1))
			}
		},
		{
			if: gestures.hold && mario.direction.horizontal === "left",
			then: () => {
				mario.action = nearTop ? "rising" : "holding";
				Matter.Body.setPosition(mario.body, shift(position(mario), -1, 0))
			}
		},
		{
			if: gestures.hold && mario.direction.horizontal === "right",
			then: () => {
				mario.action = nearTop ? "rising" : "holding";
				Matter.Body.setPosition(mario.body, shift(position(mario), 1, 0))
			}
		},
		{
			if: gestures.hold && mario.direction.horizontal === "none",
			then: () => {
				mario.action = "jumping";
				// Matter.Body.setPosition(mario.body, shift(position(mario), 1, 0))
			}
		},
		// {
		// 	if: gestures.hold && mario.direction.vertical === "up",
		// 	then: () => {
		// 		mario.action = nearTop ? "rising" : "walking";
		// 		Matter.Body.setPosition(mario.body, shift(position(mario), 0, -1))

		// 	}
		// },
		// {
		// 	if: gestures.hold && mario.direction.horizontal === "right",
		// 	then: () => {
		// 		mario.action = nearTop ? "rising" : "walking";
		// 		Matter.Body.setPosition(mario.body, shift(position(mario), 1, 0))
		// 	}
		// },
		// {
		// 	if: gestures.hold && mario.direction.vertical === "down",
		// 	then: () => {
		// 		mario.action = nearTop ? "rising" : "walking";
		// 		Matter.Body.setPosition(mario.body, shift(position(mario), 0, 1))

		// 	}
		// },
		// {
		// 	if: gestures.hold && mario.direction.horizontal === "right",
		// 	then: () => {
		// 		// mario.action = "climbing";
		// 		// would do this if we wanted gravity applied i think
		// 		// Matter.Body.applyForce(mario.body, mario.body.position, {
		// 		// 	x: mario.direction.horizontal === "right" ? 2.5 : -2.5,
		// 		// 	y: mario.direction.horizontal === "up" ? 2.5 : -2.5,
		// 		// });
		// 		// Matter.Body.setPosition(
		// 		// 	mario.body, shift(position(mario), 
		// 		// 	mario.direction.horizontal === "right" ? 1 : -1, 
		// 		// 	mario.direction.vertical === "up" ? 1 : -1
		// 		// 	)
		// 		// )
		// 		Matter.Body.setPosition(mario.body, shift(position(mario), 1, 0))
		// 	}
		// },
		{
			if: true,
			then: () => {
				mario.action = "holding";
				mario.direction.horizontal === "none"
			}
		}
	];

	find(actions, "if").then();

	return entities;
};

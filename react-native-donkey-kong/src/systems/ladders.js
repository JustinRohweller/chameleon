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


// I want:
// swipeLeft
// swipeRight
// swipeUp
// swipeDown
// tap baddie to attack?
// hold to hide/use ability
// double tap to use tongue.
// 
	let actions = [
		// Needs to be more of these: ie. 
		// up && no horizontal, left and no vertical, ect.
		{
			if: gestures.swipeUp && mario.direction.horizontal === "up",
			then: () => {
				mario.action = nearTop ? "rising" : "holding";
				Matter.Body.setPosition(mario.body, shift(position(mario), 0, -10))
			}
		},
		{
			if: gestures.swipeDown && mario.direction.horizontal === "down",
			then: () => {
				mario.action = nearTop ? "rising" : "holding";
				Matter.Body.setPosition(mario.body, shift(position(mario), 0, 10))
			}
		},
		{
			if: gestures.swipeLeft && mario.direction.horizontal === "left",
			then: () => {
				mario.action = nearTop ? "rising" : "holding";
				Matter.Body.setPosition(mario.body, shift(position(mario), -10, 0))
			}
		},
		{
			if: gestures.swipeRight && mario.direction.horizontal === "right",
			then: () => {
				mario.action = nearTop ? "rising" : "holding";
				Matter.Body.setPosition(mario.body, shift(position(mario), 10, 0))
			}
		},
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

import {
	find,
	filter,
	any,
	truthy,
	base,
	top,
	distance
} from "../utils";

export default (entities, { events }) => {
	let mario = entities.mario;

	let swipeUp = any(events, "type", "swipe-up");
	let swipeDown = any(events, "type", "swipe-down");
	let swipeLeft = any(events, "type", "swipe-left");
	let swipeRight = any(events, "type", "swipe-right");
	let tap = any(events, "type", "tap");
	let hold = any(events, "type", "hold");
	let end = any(events, "type", "end")

	mario.controls.gestures = {
		swipeUp,
		swipeDown,
		swipeLeft,
		swipeRight,
		tap,
		hold,
		end
	}

	let modes = [
		{
			if: true,
			then: () => { mario.controls.mode = "ladder"; }
		},
	];

	modes.find(x => x.if).then();

	return entities;
};

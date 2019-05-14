import Matter from "matter-js";
import { any } from "../utils";
// import console = require("console");

// Converts input ot gestures.
// Touches is array of touch objects.
// events is something else.
// dispatch is the ability to call other actions.


const swipe = (touches, events, dispatch) => {
	// let move = touches.find(x => x.type === "move");
	const ACTIVATE_SWIPE_DISTANCE_THRESHOLD = 10;

	if (move) {
		if (move.delta.locationX < -ACTIVATE_SWIPE_DISTANCE_THRESHOLD)
			dispatch({ type: "swipe-left" });

		if (move.delta.locationX > ACTIVATE_SWIPE_DISTANCE_THRESHOLD)
			dispatch({ type: "swipe-right" });

		if (move.delta.locationY < -ACTIVATE_SWIPE_DISTANCE_THRESHOLD)
			dispatch({ type: "swipe-up" });

		if (move.delta.locationY > ACTIVATE_SWIPE_DISTANCE_THRESHOLD)
			dispatch({ type: "swipe-down" });
	}
};

const hold = (touches, events, dispatch) => {
	console.log(events);
	let fingerDown = any(touches, "type", ["long-press", "move"]);
	let fingerUp = any(touches, "type", "end");
	let hold = any(events, "type", "hold");

	if ((fingerDown || hold) && !fingerUp)
		dispatch({ type: "hold" });
};

const tap = (touches, dispatch) => {
	let press = any(touches, "type", "press");

	if (press)
		dispatch({ type: "tap" })
};

const end = (touches, dispatch) => {
	let myEnd = touches.find(x => x.type === "end");

	if (myEnd)
		dispatch({ type: "end" })
};

const doubleTap = (touches, dispatch) => {
	// This needs to be improved.
	let actionStep = 0;
	for (let i = 0; i < touches.length; i++) {
		if (actionStep === 0) {
			if (touches[i].type === "press") {
				// first press.
				actionStep++;
			}
		} else if (actionStep === 1) {
			if (touches[i].type === "end") {
				// first press.
				actionStep++;
			}
		} else if (actionStep === 2) {
			if (touches[i].type === "press") {
				// first press.
				dispatch({ type: "swipe-up" })
			}
		}
	}
	actionStep = 0;
}

export default (entities, { touches, events, dispatch }) => {
	swipe(touches, events, dispatch)
	hold(touches, events, dispatch)
	tap(touches, dispatch)
	end(touches, dispatch)
	doubleTap(touches, dispatch)

	return entities;
};
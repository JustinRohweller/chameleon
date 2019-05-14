import Matter from "matter-js";
import { any } from "../utils";

// Converts input ot gestures.

const swipe = (touches, events, dispatch) => {
//   console.log(touches[0].type);
	let move = touches.find(x => x.type === "move");


	// let fingerUp = touches.find(x => x.type === "hold");
	// let fingerDown = touches.find(x => x.type === "long-press");
	// let myEnd = touches.find(x => x.type === "end");
	// let move = touches.find(x => x.type === "move");

	// let myFingerDown = any(touches, "type", ["long-press", "move"]);
	// let myFingerUp = any(touches, "type", "end");
	// let myMove =  any(events, "type", "move");
	// let myHold =  any(events, "type", "hold");
	
	// if (move) {
	// 	if (myEnd) {
	// 		dispatch({ type: "swipe-left" });
	// 	}

	// }
	
	if (move) {
		if (move.delta.locationX < -20)
			dispatch({ type: "swipe-left" });

		if (move.delta.locationX > 20)
			dispatch({ type: "swipe-right" });

		if (move.delta.locationY < -20)
			dispatch({ type: "swipe-up" });

		if (move.delta.locationY > 20)
			dispatch({ type: "swipe-down" });
	}
};

const hold = (touches, events, dispatch) => {
	let fingerDown = any(touches, "type", ["long-press", "move"]);
	let fingerUp = any(touches, "type", "end");
	let hold =  any(events, "type", "hold");
	
	if ((fingerDown || hold) && !fingerUp)
		dispatch({ type: "hold" });
};

const tap = (touches, dispatch) => {
	let press = any(touches, "type", "press");

	if (press)
		dispatch({ type: "tap"})
};

const end = (touches, dispatch) => {
	let myEnd = touches.find(x => x.type === "end");

	if (myEnd)
		dispatch({ type: "end"})
};

export default (entities, { touches, events, dispatch }) => {
	swipe(touches, events, dispatch)
	hold(touches, events, dispatch)
	tap(touches, dispatch)
	end(touches, dispatch)

	return entities;
};
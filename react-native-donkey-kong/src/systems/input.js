import Matter from "matter-js";
import { any } from "../utils";

// Converts input ot gestures.


const swipe = (touches, events, dispatch) => {
	let move = touches.find(x => x.type === "move");
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
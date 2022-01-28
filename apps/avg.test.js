import test from "../vanilla/t.js";
import avg from "./avg.js";

test("avg", (t) => {
    t.assert(avg([1, 2, 3, 4]) === 2.5);
});

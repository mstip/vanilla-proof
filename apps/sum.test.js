import sum from "./sum.js";
import t from "../vanilla/t.js";

t("sum", (t) => {
    t.assert(sum(1, 1) === 2);
});

t("sum", (t) => {
    t.assert(sum(1, 2) === 2);
});

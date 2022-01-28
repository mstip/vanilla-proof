/**
 * store
 * @param {any} state
 * @param {object} actions
 * @returns {function} store
 */
export default function s(state, actions) {
    if (actions === undefined) {
        actions = {};
    }
    return (key, val) => {
        if (actions[key] !== undefined) {
            return actions[key](state, val, key);
        }

        if (val !== undefined) {
            state[key] = val;
        }
        return state[key];
    };
}

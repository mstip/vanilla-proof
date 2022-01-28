/**
 * creates html element
 * @param {string} tag
 * @param {object} attrs
 * @param {string|Array} children
 * @returns HTMLElement
 */
export default function e(tag, attrs, children) {
    const el = document.createElement(tag);

    for (const key in attrs) {
        el[key] = attrs[key];
    }

    if (children instanceof HTMLElement) {
        el.appendChild(children);
    } else if (Array.isArray(children)) {
        for (const c of children) {
            if (c instanceof HTMLElement) {
                el.appendChild(c);
            } else if (typeof c === "string" || c instanceof String) {
                el.appendChild(document.createTextNode(c));
            }
        }
    } else if (typeof children === "string" || children instanceof String) {
        el.appendChild(document.createTextNode(children));
    }

    return el;
}

function renderRoute(root, routes, path) {
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }

    const el = routes[path];
    if (!el) {
        root.appendChild(document.createTextNode("404 - not found"));
        return;
    }

    root.appendChild(el);
}

/**
 * router
 * @param {HTMLElement} root
 * @param {Array} routes
 * @returns {function} link click handler
 */
export default function r(root, routes) {
    renderRoute(root, routes, window.location.pathname);

    return (e) => {
        e.preventDefault();
        const path = new URL(e.target.href).pathname;
        renderRoute(root, routes, path);
        window.history.pushState({}, null, path);
    };
}

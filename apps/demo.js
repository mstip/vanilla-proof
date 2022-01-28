import e from "../vanilla/e.js";
import r from "../vanilla/r.js";
import s from "../vanilla/s.js";

export default function demo() {
    const header = e("h1", {}, "hi");
    const table = e("table", null, [
        e(
            "thead",
            null,
            e(
                "tr",
                null,
                Array.from(Array(5).keys()).map((i) => e("th", null, i + ""))
            )
        ),
        e(
            "tbody",
            {},
            Array.from(Array(10).keys()).map(() =>
                e(
                    "tr",
                    {},
                    Array.from(Array(5).keys()).map((i) => e("td", {}, i + ""))
                )
            )
        ),
    ]);
    const list = e("ul", null, [
        e("li", null, "1"),
        e("li", null, "2"),
        e("li", null, "3"),
        e("li", null, "4"),
        e("li", null, "5"),
    ]);

    const form = e(
        "form",
        {
            onsubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.target);
                for (const val of formData.entries()) {
                    console.log(val);
                }
            },
        },
        [
            e("input", { type: "text", placeholder: "hier text", name: "text1" }),
            e("br"),
            e("input", { type: "text", placeholder: "hier text2", name: "text2" }),
            e("br"),
            e("input", { type: "text", placeholder: "hier text3", name: "text3" }),
            e("br"),
            e("button", { type: "submit" }, "submit"),
        ]
    );

    const app = e("div", { className: "app" }, [header, e("hr"), table, e("hr"), list, e("hr"), form]);

    const content = e("div", { className: "content" });
    const router = r(content, {
        "/": app,
        "/eins": e("h1", {}, "eins"),
        "/zwei": e("h1", {}, "zwei"),
    });

    const nav = e("nav", null, [
        e("a", { href: "/", onclick: router }, "start"),
        e("span", null, " | "),
        e("a", { href: "/eins", onclick: router }, "eins"),
        e("span", null, " | "),
        e("a", { href: "/zwei", onclick: router }, "zwei"),
    ]);

    const layout = e("div", null, [nav, content]);
    document.body.appendChild(layout);

    const store = s(
        { todos: ["new todo 1"] },
        {
            special: function (state, val, key) {
                console.log("special", ...arguments);
                return 42;
            },
        }
    );

    store("todos", [...store("todos"), "new todo 2"]);
    console.log(store("todos"));

    store("counter", 0);
    store("counter", store("counter") + 1);

    console.log(store("counter"));
    console.log(store("special", { gewurschtel: "1337" }));
}

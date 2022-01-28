import e from "../vanilla/e.js";
import s from "../vanilla/s.js";

const store = s(
    { todos: localStorage["todos"] ? JSON.parse(localStorage["todos"]) : [{ text: "first todo", done: true }] },
    {
        todos: (state, val, key) => {
            if (val === undefined) {
                return state[key];
            }
            state[key] = val;
            localStorage["todos"] = JSON.stringify(state[key]);
            return state[key];
        },
    }
);

function renderTodos(todosEl) {
    while (todosEl.firstChild) {
        todosEl.removeChild(todosEl.firstChild);
    }
    const todos = store("todos");
    for (const i in store("todos")) {
        todosEl.appendChild(
            e("li", {}, [
                e("input", {
                    type: "checkbox",
                    checked: todos[i].done,
                    onchange: () => {
                        todos[i].done = !todos[i].done;
                        store("todos", todos);
                        renderTodos(todosEl);
                    },
                }),
                todos[i].done === true ? e("del", null, todos[i].text) : e("span", null, todos[i].text),
                todos[i].done === true
                    ? e(
                          "button",
                          {
                              onclick: () => {
                                  todos.splice(i, 1);
                                  store("todos", todos);
                                  renderTodos(todosEl);
                              },
                          },
                          "delete"
                      )
                    : null,
            ])
        );
    }
}

export default function todo() {
    const todosEl = e("ul");
    document.body.appendChild(
        e("div", null, [
            e("input", {
                type: "text",
                placeholder: "new todo",
                onkeyup: (e) => {
                    if (e.keyCode === 13) {
                        store("todos", [...store("todos"), { text: e.target.value, done: false }]);
                        e.target.value = "";
                        renderTodos(todosEl);
                    }
                },
            }),
            e("hr"),
            todosEl,
        ])
    );
    renderTodos(todosEl);
}

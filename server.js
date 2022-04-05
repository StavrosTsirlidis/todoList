import { createServer } from 'miragejs'

export const server = createServer({
    routes() {
        this.namespace = "api"
        let todos = [];

        this.get("/todo", () => {
            return todos;
        })

        this.post("/todo", (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            attrs.id = Math.floor(Math.random() * 1000)
            todos.push(attrs)
            return { todo: attrs }
        })

        this.patch("/todo/:id", (schema, request) => {
            let id = parseInt(request.params.id);
            todos = (todos.filter(todoObject => todoObject.id !== id));
        })

        this.put("/todo/:id", (schema, request) => {
            let id = request.params.id;
            let todoObjectIndex = todos.findIndex(todoObject => todoObject.id === parseInt(id));
            let performed = JSON.parse(request.requestBody).performed;
            todos[todoObjectIndex].performed = performed;
            return todos;
        })
    },
})
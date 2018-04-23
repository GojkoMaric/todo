let apiUrl = 'http://127.0.0.1:8000';

Vue.component('todo-item',{
    props: ['todo'],
    template: `<li row>
    <select v-if='clicked === true' v-model='todo.priority'>
        <option>Low</option>
        <option>Normal</option>
        <option>High</option>
    </select>

    <span v-if='clicked === !true' class="badge badge-secondary" @click='changeTodo()'>{{ todo.priority}} Priority</span>
    <span v-if='clicked === !true'>{{ todo.text }}</span>

    <input v-if='clicked === true' v-model="todo.text"
    placeholder="todo.text">

    <button v-if='clicked === !true' 
        v-on:click='changeTodo()' class="btn">Change</button>

    <button v-if='clicked === true'
        v-on:click='updateTodo(todo)' class="btn">Done</button>

    <button @click='destroyThisTodo()' class="btn">Delete</button>

    <p>
        <span v-if='!todo.done' style>Done</span>
        <span v-if='todo.done' class="bg-success text-white">Done</span>

        <input type="checkbox" id="checkbox" v-model="todo.done" @click='changeDone' class="checkbox">
    </p>


    
</li>`,
    data() {
        return {
            clicked: false,
            checked: false
        }
    },
    methods: {
        changeTodo: function(){
            this.clicked = true;
            
        },
        deleteTodo: function(item){
            var index = app.todos.indexOf(item);
            app.todos.splice(index, 1)

        },
        destroyThisTodo: function(){
            axios.delete(apiUrl+'/todos/' + this.todo.id)
                .then((response) => {
                    app.todos = response.data;
                })
        },
        updateTodo: function(){
            axios.put(apiUrl+'/todos/' + this.todo.id, this.todo)
                .then((response) => {
                    app.todos = response.data;
                }),
            this.clicked = false;
        },
        changeDone: function(){
            if(this.todo.done){
                this.todo.done = 0;
                axios.put(apiUrl+'/todos/'+this.todo.id, this.todo)
                    .then((response) => {
                        app.todos = response.data;
                    })
            }else{
                this.todo.done = 1;
                axios.put(apiUrl+'/todos/'+this.todo.id, this.todo)
                    .then((response) => {
                        app.todos = response.data;
                    })
            }
        }    
    }
})


var app = new Vue({
    el: '#app',
    data() {
        return {
            todos: [],
            newTodo: {
                text: '',
                priority: 'Normal',
                done: 0
            },
            selected: '',
        }
    },
    methods: {
        postTodo: function(){
            axios.post(apiUrl+'/todos', this.newTodo)
                .then((response) => {
                    this.todos.push(response.data);
                })
            this.newTodo = {priority: 'Normal'};
        },
    },

    created() {
        axios.get(apiUrl+'/todos').then((response) => {
            this.todos = response.data;
        })
    }

})


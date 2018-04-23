// Vue.component('todo-item',{
//     props: ['todo'],
//     template: '<li><span>{{ todo.text}}</span><button v-on:click="emitChangeTodo">Change</button><button v-on:click="emitDeleteTodo">Delete</button><slot name="slotName"></slot></li>',
//     methods: {
//         emitChangeTodo(){
//             this.$emit('eventchange', this.todo)
//         },
//         emitDeleteTodo(){
//             this.$emit('eventdelete',
//             this.todo)
//         }
//     }
// })


var app = new Vue({
    el: '#app',
    data: {
        clicked: false,
        todos: [
            { text: 'Learn JavaScript',
            priority: 'High'},
            { text: 'Learn Vue',
            priority: 'Normal'},
            { text: 'Build something awesome',
            priority: 'Low'}
        ],
        newTodo: {
            text: '',
            priority: ''
        },
        selected: '',
        
    },
    methods: {
        changeTodo: function(item){
            this.clicked = true;
            
        },
        deleteTodo: function(item){
            var index = this.todos.indexOf(item);
            this.todos.splice(index, 1)

        },
        addTodo: function(newItem){

            var item = {
                text: newItem.text,
                priority: newItem.priority
            }
            this.todos.push(item)
        },

        finishTodo: function(item){
            this.clicked = false;
            var index = this.todos.indexOf(item);
            this.todos.splice(index,1,item)
        }
    }
})


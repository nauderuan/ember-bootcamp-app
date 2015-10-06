Abs.TodoItemComponent = Ember.Component.extend({
       actions: {
        editTasks: function () {
            this.set('task.editMode', true);
        },
        changeTask: function () {
            var me = this;
            Ember.run.later((function () {
                me.set('task.editMode', false);
                if (Ember.isEmpty(me.get('task.title'))) {
                    me.send('removeTask');
                }
            }), 100);
        },
        removeTask: function () {
			Abs.AbsController.prototype.arrTasks.removeObject(this.task)
        }
    },
    editMode: false
});

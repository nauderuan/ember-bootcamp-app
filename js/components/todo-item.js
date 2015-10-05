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
			Abs.Tasks.removeObject(this.task)
        }
    },
    editMode: false,
    isDone: function (key, value) {
        var model = this.get('task');

        if (value === undefined) {
            // property being used as a getter
            return model.get('task.isDone');
        } else {
            // property being used as  setter
            model.set('task.isDone', value);
            // model.save();
            return value;
        }
    }.property('task.isDone')
});

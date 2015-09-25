
Abs.TasksController = Ember.ObjectController.extend({
    actions: {
        editTasks: function () {
            this.set('editMode', true);
        },
        changeTask: function () {
            var me = this;
            Ember.run.later((function () {
                me.set('editMode', false);
                if (Ember.isEmpty(me.get('model.title'))) {
                    me.send('removeTask');
                } else {
                    me.get('model').save();
                }
            }), 100);
        },
        removeTask: function () {
            var Task = this.get('model');
            Task.deleteRecord();
            Task.save();
        }
    },

    editMode: false,

    isDone: function (key, value) {
        var model = this.get('model');

        if (value === undefined) {
            // property being used as a getter
            return model.get('isDone');
        } else {
            // property being used as  setter
            model.set('isDone', value);
            model.save();
            return value;
        }
    }.property('model.isDone')
});

Abs.AbsController = Ember.ArrayController.extend({
    actions: {
        checkAll: function () {
            var checked = $('#chk-all')[0].checked;
            var store = this.get('store'), model = this.get('model');

            model.forEach(function (task) {
                task.set('isDone', checked);
                task.save();
            });

        },
        createTask: function () {
            // Get the Tasks title set by the "New Tasks" text field
            var title = this.get('newTitle');
            if (!title.trim()) { return; }

            // Create the new Tasks model
            var Tasks = this.store.createRecord('Tasks', {
                title: title,
                isDone: false
            });

            // Clear the "New Tasks" text field
            this.set('newTitle', '');

            // Save the new model
            Tasks.save();
        },

        removeAllCompleted: function () {
            var model = this.get('model');
            model.forEach(function (task) {
                if (task && task.get('isDone')) {
                    Ember.run.once(this, function () {
                        task.deleteRecord();
                        task.save();
                    });
                }

            });

        },

        allTasks: function () {
            var me = this, store = me.get('store');
            me.set('model', store.find('Tasks'));
            this.removeSelectedClass();
            $('#allTasksBtn').addClass('selected');
        },
        doneTasks: function () {
            var me = this, store = me.get('store');
            me.set('model', store.filter('Tasks', function (Tasks) {
                return Tasks.get('isDone');
            }));
            this.removeSelectedClass();
            $('#doneTasksBtn').addClass('selected');
        },
        activeTasks: function () {
            var me = this, store = me.get('store');
            me.set('model', store.filter('Tasks', function (Tasks) {
                return Tasks.get('isDone') == false;
            }));
            this.removeSelectedClass();
            $('#activeTasksBtn').addClass('selected');
        },
    },

    remainCount: function () {
        return this.filterProperty('isDone', false).get('length');
    }.property('@each.isDone'),

    doneCount: function () {
        return this.filterProperty('isDone', true).get('length');
    }.property('@each.isDone'),

    removeSelectedClass: function () {
        $('#allTasksBtn').removeClass('selected');
        $('#activeTasksBtn').removeClass('selected');
        $('#doneTasksBtn').removeClass('selected');
    }

});


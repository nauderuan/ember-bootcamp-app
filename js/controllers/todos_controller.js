Abs.AbsController = Ember.ArrayController.extend({
    actions: {
        checkAll: function () {
            var checked = $('#chk-all')[0].checked;
            var store = this.get('store'), model = this.get('model');
            model.setEach('isDone', checked)
        },
        createTask: function () {
            // Get the Tasks title set by the "New Tasks" text field
            var title = this.get('newTitle');
            if (!title.trim()) { return; }
			var newTask = {
                title: title,
                isDone: false
            };
			this.get('model').pushObject(newTask);
            // Clear the "New Tasks" text field
            this.set('newTitle', '');

        },

        removeAllCompleted: function () {
            var model = this.get('model');
			Abs.Tasks.removeObjects(model.filterBy('isDone',true))
        },

        allTasks: function () {
			this.showTask(null)
        },
        doneTasks: function () {
         	this.showTask(true)
        },
        activeTasks: function () {
            
			this.showTask(false)
        },

    },
		showTask: function(isDone){
		var me = this;
		            me.removeSelectedClass();
			me.set('model',Abs.Tasks);
			if(isDone != null){
				me.set('model',  me.get('model').filterBy('isDone',isDone));
				isDone==true?$('#doneTasksBtn').addClass('selected'):$('#activeTasksBtn').addClass('selected');
			}
			else
			{
				$('#allTasksBtn').addClass('selected');
			}
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


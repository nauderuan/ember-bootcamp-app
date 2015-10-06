Abs.AbsController = Ember.ArrayController.extend({
	arrTasks :  [
					{
						id: 1,
						title: 'Task 1 description',
						isDone: true
					},
					{
						id: 2,
						title: 'Task 2 description',
						isDone: false
					},
					{
						id: 3,
						title: 'Task 3 description',
						isDone: false
					},
					{
						id: 4,
						title: 'Task 4 description',
						isDone: true
					},
					{
						id: 5,
						title: 'Task 5 description',
						isDone: false
					}
				],			
    actions: {
        checkAll: function () {
            var checked = $('#chk-all')[0].checked;
            var  arr = this.arrTasks;
            arr.setEach('isDone', checked)
        },
        createTask: function () {
            // Get the Tasks title set by the "New Tasks" text field
            var title = this.get('newTitle'),arr=this.arrTasks;
            if (!title.trim()) { return; }
			var newTask = {
                title: title,
                isDone: false
            };
			arr.pushObject(newTask);
            // Clear the "New Tasks" text field
            this.set('newTitle', '');

        },

        removeAllCompleted: function () {
            var arr = this.arrTasks;
			arr.removeObjects(arr.filterBy('isDone',true))
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
		var me = this,arr = me.arrTasks;
		            me.removeSelectedClass();
			arr.setEach('hidden', false)
			if(isDone != null){
				  arr.filterBy('isDone',isDone).setEach('hidden', true);
				isDone==true?$('#doneTasksBtn').addClass('selected'):$('#activeTasksBtn').addClass('selected');
			}
			else
			{
				$('#allTasksBtn').addClass('selected');
			}
		},
    remainCount: function () {
		var arr = this.arrTasks;
        return arr.filterBy('isDone', false).get('length');
    }.property('arrTasks','arrTasks.@each.isDone'),

    doneCount: function () {
		var arr = this.arrTasks;
        return arr.filterBy('isDone', true).get('length');
    }.property('arrTasks','arrTasks.@each.isDone'),

    removeSelectedClass: function () {
        $('#allTasksBtn').removeClass('selected');
        $('#activeTasksBtn').removeClass('selected');
        $('#doneTasksBtn').removeClass('selected');
    }

});


Abs.Router.map(function () {
    this.resource('Abs', { path: '/' });
});
Abs.AbsRoute = Ember.Route.extend({
	model: function() {
	return Abs.Tasks;
  }
});
  Abs.Tasks=[
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
];

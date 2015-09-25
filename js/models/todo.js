Abs.Tasks = DS.Model.extend({
    title: DS.attr('string'),
    isDone: DS.attr('boolean')
});

Abs.Tasks.FIXTURES = [
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

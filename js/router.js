Abs.Router.map(function () {
    this.resource('Abs', { path: '/' });
});
Abs.AbsRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('Tasks');
    }
});

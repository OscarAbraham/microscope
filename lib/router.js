//region route utilities
var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        }
        else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}
//endregion route utilities

//region general routes config
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() { return Meteor.subscribe('posts'); }
});

//Hooks
//Set routes that should return 404 when data context is not found
Router.onBeforeAction('dataNotFound', {only: 'postPage'});

//Set routes that require user to be logged
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
//endregion general routes config

//region define routes
Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id', {
    name: 'postPage',
    data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/submit', {name: 'postSubmit'});
//endregion define routes

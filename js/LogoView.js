define([
    'core/js/adapt'
], function(Adapt) {

    var LogoView = Backbone.View.extend({

        className: "navigation-logo",

        initialize: function() {
            this.render();
        },

        render: function() {
            var data = this.model.toJSON();
            this.$el.html(Handlebars.templates[this.constructor.template](data));
        }

    },{
        template: "navigation-logo"
    });

    return LogoView;

});
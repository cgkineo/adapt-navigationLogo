define([
  'core/js/adapt'
], function(Adapt) {

  var LogoView = Backbone.View.extend({

    className: "navigation-logo",

    initialize: function() {
      this.render();
      this.listenTo(Adapt, "device:changed", this.onDeviceResize);
    },

    onDeviceResize: function() {
      this.postRender();
    },

    postRender: function() {
      var config = Adapt.course.get("_navigationLogo");
      if (config && config._hideLogoForMobile) {
        this.hideLogoForMobile();
      }
      if (config && config._graphic._mobileSrc) {
        this.setLogoImageSrc();
      }
    },

    hideLogoForMobile: function() {
      var isDeviceSmall = Adapt.device.screenSize === 'small';
      $(".navigation-logo__image").toggleClass('u-display-none', isDeviceSmall);
    },

    setLogoImageSrc: function() {
      var config = this.model.get('_graphic');
      var src = Adapt.device.screenSize === 'small' ? config._mobileSrc : config.src;

      $('.navigation-logo__image').attr('src', src);
    },

    render: function() {
      var data = this.model.toJSON();
      this.$el.html(Handlebars.templates[this.constructor.template](data));
      _.defer(this.postRender.bind(this));
      return this;
    }

  },{
    template: "navigationLogo"
  });

  return LogoView;

});

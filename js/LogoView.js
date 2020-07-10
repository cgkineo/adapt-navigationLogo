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
      (Adapt.device.screenSize === 'small')
        // mobile logo display
        ? $(".navigation-logo__image").addClass('u-display-none')
        // desktop logo display
        : $(".navigation-logo__image").removeClass('u-display-none');
    },

    setLogoImageSrc: function() {
      var config = Adapt.course.get("_navigationLogo");
      var mobileSrc = config._graphic._mobileSrc;
      var src = config._graphic._src;
      (Adapt.device.screenSize === 'small')
        // mobile logo display
        ? $(".navigation-logo__image").attr('src', mobileSrc)
        // desktop logo display
        : $(".navigation-logo__image").attr('src', src);
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

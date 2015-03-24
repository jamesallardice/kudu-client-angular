angular.module('kudu')
.provider('kudu', function KuduProvider() {

  let injector;

  // Take an Angular $injector service instance and make it available to the
  // kudu service. This is needed to dynamically generate services and make
  // them available to the consumer application.
  this.setInjector = ( $injector ) => {
    injector = $injector;
  };

  this.$get = [

    'KuduModel',
    'KuduModelCache',

    ( Model, ModelCache ) => ( {

      // A utility wrapper around KuduModelCache#get which allows consumers to
      // only inject the kudu service itself rather than the model cache too.
      getModel( name ) {
        return ModelCache.get(name);
      },

      // Create a model constructor, add it to the model cache and expose it as
      // a service through the registered Angular injector.
      createModel( singular, plural, schema, parent ) {

        // Plural name, schema and parent are all optional. If the plural name
        // is not provided it defaults to the singular name with 's' appended.
        if ( typeof plural !== 'string' ) {
          if ( typeof schema === 'string' ) {
            parent = schema;
          }
          schema = plural;
          plural = `${ singular }s`;
        }

        let Constructor;

        // If the model inherits from another we get the parent constructor and
        // pass it through to the KuduModel constructor.
        if ( typeof parent === 'string' ) {
          parent = this.getModel(parent);
          Constructor = new Model(parent, schema);
        } else {
          Constructor = new Model(schema);
        }

        // Expose the model name on the constructor
        singular = singular.toLowerCase();
        plural = plural.toLowerCase();
        [ Constructor.singular, Constructor.plural, ] = [ singular, plural, ];

        // Add the constructor to the model cache
        ModelCache.add(Constructor);

        // If the service has been configured with an Angular injector we can
        // create a factory for the constructor on the client Angular app.
        if ( injector && typeof injector.invoke === 'function' ) {

          injector.invoke([

            '$provide',

            ( $provide ) => {

              $provide.factory(singular, [
                () => Constructor,
              ]);
            },
          ]);
        }

        return Constructor;
      },
    } ),
  ];
});

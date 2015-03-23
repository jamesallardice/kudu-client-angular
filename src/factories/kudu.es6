angular.module('kudu')
.provider('kudu', function KuduProvider() {

  let injector;

  this.setInjector = ( $injector ) => {
    injector = $injector;
  };

  this.$get = [

    'KuduModel',
    'KuduModelCache',

    ( Model, ModelCache ) => ( {

      getModel( name ) {
        return ModelCache.get[ name ];
      },

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

        // Create a factory for the constructor on the client Angular app
        injector.invoke([

          '$provide',

          ( $provide ) => {

            $provide.factory(singular, [
              () => Constructor,
            ]);
          },
        ]);

        return Constructor;
      },
    } ),
  ];
});

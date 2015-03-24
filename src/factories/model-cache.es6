angular.module('kudu')
.service('KuduModelCache', [

  ( () => {

    return class KuduModelCache {

      constructor() {
        this.cache = Object.create(null);
      }

      // Add a model constructor to the cache. The key is the singular name of
      // the model which is available as a static property of the constructor.
      // Since the cache itself is 'private' the properties do not need to be
      // enumerable, but they are configurable to allow overwriting.
      add( Model ) {

        if ( !Model.hasOwnProperty('singular') ) {
          throw new Error('Invalid Kudu Model constructor');
        }

        Object.defineProperty(this.cache, Model.singular, {
          value: Model,
          configurable: true,
        });
      }

      // Return a model constructor from the cache by case-insensitive singular
      // model name.
      get( name ) {
        return this.cache[ name.toLowerCase() ];
      }
    };
  }() ),
]);

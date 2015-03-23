angular.module('kudu')
.service('KuduModelCache', [

  ( () => {

    // The cache itself is 'private' and can only be accessed via the methods
    // listed in the class definition below.
    let cache = Object.create(null);

    return class KuduModelCache {

      // Add a model constructor to the cache. The key is the singular name of
      // the model which is available as a static property of the constructor.
      // Since the cache itself is 'private' the properties do not need to be
      // enumerable.
      add( Model ) {
        Object.defineProperty(cache, Model.singular, {
          value: Model,
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

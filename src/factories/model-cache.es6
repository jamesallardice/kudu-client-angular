angular.module('kudu')
.service('KuduModelCache', [

  ( () => {

    let cache = Object.create(null);

    return class KuduModelCache {

      add( Model ) {
        Object.defineProperty(cache, Model.singular, {
          enumerable: true,
          value: Model,
        });
      }

      get( name ) {
        return this.cache[ name.toLowerCase() ];
      }
    };
  }() ),
]);

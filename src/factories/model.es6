angular.module('kudu')
.factory('KuduModel', [

  'KuduBaseModel',
  'KuduModelCache',

  ( BaseModel, ModelCache ) => class KuduModel {

    constructor( ToExtend, schema ) {

      if ( ToExtend === undefined ) {
        ToExtend = BaseModel;
      }

      class Constructor extends ToExtend {

        static get schema() {
          return schema;
        }

        constructor( data ) {
          super(data);
        }
      }

      return Constructor;
    }
  }
]);

angular.module('kudu')
.factory('KuduModel', [

  'KuduBaseModel',
  'KuduModelCache',

  ( BaseModel, ModelCache ) => class Constructor {

    constructor( ToExtend ) {}
  }
]);

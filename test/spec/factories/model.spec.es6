describe('KuduModelCache service', () => {

  let Model;
  let BaseModel;
  let ConstructorBasic;
  let ConstructorSchema;

  let schema = {};

  beforeEach(angular.mock.module('kudu'));
  beforeEach(angular.mock.inject(( KuduModel, KuduBaseModel ) => {
    Model = KuduModel;
    BaseModel = KuduBaseModel;
    ConstructorBasic = new Model();
    ConstructorSchema = new Model(null, schema);
  }));

  it('should throw if not constructed via the new operator', () => {
    let test = () => Model();
    expect(test).to.throw(Error);
  });

  it('should return a model constructor function', () => {
    expect(ConstructorBasic).to.be.a('function');
  });

  it('should expose the schema as a static model constructor property', () => {
    expect(ConstructorSchema).to.have.ownProperty('schema', schema);
  });

  describe('model instances', () => {

    it('should inherit from the base model by default', () => {
      expect(new ConstructorBasic()).to.be.instanceOf(BaseModel);
    });
  });
});

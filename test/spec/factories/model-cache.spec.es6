describe('KuduModelCache service', () => {

  let ModelCache;
  let TestModel = class {
    static get singular() {
      return 'test';
    }
  };

  beforeEach(angular.mock.module('kudu'));
  beforeEach(angular.mock.inject(( KuduModelCache ) => {
    ModelCache = KuduModelCache;
  }));

  it('should have an add method', () => {
    expect(ModelCache).to.respondTo('add');
  });

  describe('#add', () => {

    it('should add model constructors to the cache', () => {
      let test = () => ModelCache.add(TestModel);
      expect(test).to.not.throw();
    });
  });

  it('should have a get method', () => {
    expect(ModelCache).to.respondTo('get');
  });

  describe('#get', () => {

    it('should return model constructors from the cache', () => {
      ModelCache.add(TestModel);
      expect(ModelCache.get('test')).to.equal(TestModel);
    });

    it('should return undefined when no constructor is found', () => {
      expect(ModelCache.get('invalid')).to.equal(undefined);
    });
  });
});

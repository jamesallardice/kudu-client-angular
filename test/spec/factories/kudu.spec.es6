describe('kudu provider', () => {

  let kudu;

  beforeEach(() => {
    let testModule = angular.module('test', () => {});
    testModule.config(( kuduProvider ) => {
      kudu = kuduProvider;
    })
    angular.mock.module('kudu', 'test');
    angular.mock.inject(() => {});
  });

  it('should have a setInjector method', () => {
    expect(kudu).to.respondTo('setInjector');
  });

  describe('service', () => {

    let kuduService;

    beforeEach(() => angular.mock.inject(( kudu ) => {
      kuduService = kudu;
    }));

    it('should have a createModel method', () => {
      expect(kuduService).to.respondTo('createModel');
    });

    describe('#createModel', () => {

      let ConstructorBasic;

      beforeEach(() => {
        ConstructorBasic = kuduService.createModel('basic');
      });

      it('should return a model constructor function', () => {
        expect(ConstructorBasic).to.be.a('function');
      });

      it('should add the constructor to the model cache', () => {
        expect(kuduService.getModel('basic')).to.equal(ConstructorBasic);
      });

      it('should expose the singular name on the constructor', () => {
        expect(ConstructorBasic).to.have.ownProperty('singular', 'basic');
      });

      it('should expose the plural name on the constructor', () => {
        expect(ConstructorBasic).to.have.ownProperty('plural', 'basics');
      });

      it('should allow custom plural names', () => {
        let ConstructorPlural = kuduService.createModel('person', 'people');
        expect(ConstructorPlural).to.have.ownProperty('plural', 'people');
      });
    });
  });
});

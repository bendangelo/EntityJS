(function() {
  describe("comp", function() {
    var i, k;

    k = void 0;
    i = 0;
    beforeEach(function() {
      i++;
      return k = re.c("stat" + i);
    });
    it("should create statics", function() {
      k.statics({
        type: 10
      }).statics("yep", "yep");
      expect(re[k.name].type).to.eql(10);
      return expect(re[k.name].yep).to.eql("yep");
    });
    it("should add accessor", function() {
      k.accessors("a b");
      expect(k._re_getters.a).to.be.ok();
      expect(k._re_getters.b).to.be.ok();
      expect(k._re_setters.a).to.be.ok();
      return expect(k._re_setters.b).to.be.ok();
    });
    it("should create comp in new style", function() {
      re.c("jump12", {
        requires: "sdf",
        init: function() {},
        defines: {
          ok: 10
        },
        defaults: {
          k: 10
        },
        factory: function() {}
      });
      expect(re.c("jump12")._re_requires).to.eql(["sdf"]);
      expect(re.c("jump12")._re_defines).to.eql({
        ok: 10
      });
      return expect(re.c("jump12")._re_defaults).to.eql({
        k: 10
      });
    });
    it("should use default factory", function() {
      var a;

      a = 10;
      return expect(re[k.name]("blah", a).blah).to.eql(a);
    });
    it("should create a factory", function() {
      var val;

      val = 10;
      k.factory(function(ref) {
        return this.ref = ref;
      });
      return expect(re[k.name](val).ref).to.eql(val);
    });
    it("should overwrite method", function() {
      k.method(function() {
        return expect(this).to.eql(re[k.name]);
      });
      return re[k.name]();
    });
    it("should add events", function() {
      k.events("mouseup", function() {});
      k.events({
        mousedown: function() {}
      });
      expect(k._re_events.mouseup).to.exist;
      return expect(k._re_events.mousedown).to.exist;
    });
    it("should requires", function() {
      k.requires("test test2");
      contains(k._re_requires, "test");
      contains(k._re_requires, "test2");
      k.requires(["test3"]);
      return contains(k._re_requires, "test3");
    });
    it("should alias", function() {
      k.statics("bob", "bob").alias("bob");
      return expect(re.c("bob") === k).to.be.ok();
    });
    it("should defaults", function() {
      k.defaults({
        ok: 1,
        ok2: 2
      }).defaults("ok3", 3);
      expect(k._re_defaults["ok3"] === 3).to.be.ok();
      expect(k._re_defaults["ok2"] === 2).to.be.ok();
      return expect(k._re_defaults["ok"] === 1).to.be.ok();
    });
    it("should namespaces", function() {
      k = re.c("stat").namespaces({
        ok: 1,
        ok2: 2
      }).namespaces("ok3", 3);
      expect(k._re_defines["stat_ok3"] === 3).to.be.ok();
      expect(k._re_defines["stat_ok2"] === 2).to.be.ok();
      return expect(k._re_defines["stat_ok"] === 1).to.be.ok();
    });
    it("should defines", function() {
      k.defines({
        b: 1,
        b2: 2
      }).defines("b3", 3);
      expect(k._re_defines["b3"] === 3).to.be.ok();
      expect(k._re_defines["b2"] === 2).to.be.ok();
      return expect(k._re_defines["b"] === 1).to.be.ok();
    });
    it("should init", function() {
      var fun;

      fun = function() {};
      k.init(fun);
      return expect(k._re_init === fun).to.be.ok();
    });
    it("should dispose", function() {
      var fun;

      fun = function() {};
      k.dispose(fun);
      return expect(k._re_dispose === fun).to.be.ok();
    });
    return it("should run", function() {
      return k.run(function() {
        return expect(this === k).to.be.ok();
      });
    });
  });

}).call(this);

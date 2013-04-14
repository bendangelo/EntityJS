(function() {
  describe("entity", function() {
    var c, e;

    e = void 0;
    c = void 0;
    re.g("blah").create();
    beforeEach(function() {
      e = re.e();
      return c = re.c(f("name"));
    });
    it("should add / remove from group", function() {
      e = re.e("blah");
      expect(re._g["blah"].contains(e)).to.be.ok();
      e.dispose();
      return expect(!re._g["blah"].contains(e)).to.be.ok();
    });
    it("should get", function() {
      e.blah = 10;
      e.bla = function() {
        return this.blah;
      };
      expect(e.get("blah")).to.eql(10);
      return expect(e.get("bla")).to.eql(10);
    });
    it("should trigger once", function() {
      var count;

      count = 0;
      e.once("blah", function() {
        return count++;
      });
      e.trigger("blah");
      e.trigger("blah");
      e.trigger("blah");
      return expect(count).to.eql(1);
    });
    it("should define accessors", function() {
      var val;

      re.c("totally").accessors("posX posY");
      e.comp("totally");
      val = 4;
      e.posX = val;
      expect(e.posX).to.eql(val);
      expect(e._posX).to.eql(val);
      e.posY = val;
      expect(e.posY).to.eql(val);
      return expect(e._posY).to.eql(val);
    });
    it("comp", function() {
      e.comp("qwdqwd wer");
      expect(e.has("qwdqwd wer")).to.be.ok();
      e.comp(["yep45", "ok12"]);
      return expect(e.has("yep45 ok12")).to.be.ok();
    });
    it("should add events from comp", function() {
      var func;

      func = function() {};
      c.events("mousedown", func);
      e.comp(c.name);
      return expect(e.mousedown).to.exist;
    });
    it("should define properly", function() {
      re.c("blah1").defines({
        f: function() {
          return false;
        }
      });
      re.c("sdfdff").requires("blah1").defines({
        f: function() {
          return true;
        }
      });
      return expect(re.e("sdfdff").f()).to.be.ok();
    });
    it("should call init", function() {
      var called;

      called = false;
      c.init(function() {
        return called = true;
      });
      e.comp(c.name);
      return expect(called).to.be.ok();
    });
    it("requires", function() {
      c.requires("bob");
      c.requires(["bob2"]);
      e.comp(c.name);
      return expect(e.has("bob bob2")).to.be.ok();
    });
    it("comp defaults", function() {
      c.defaults({
        ok: 10,
        b: 99
      });
      c.defaults("yep", "y");
      e.ok = "same";
      e.comp(c.name);
      expect(e.ok).to.eql("same");
      expect(e.b).to.eql(99);
      return expect(e.yep).to.eql("y");
    });
    it("comp defines", function() {
      c.defines({
        ok: 10,
        b: 99
      });
      c.defines("yep", "y");
      e.comp(c.name);
      expect(e.ok).to.eql(10);
      expect(e.b).to.eql(99);
      return expect(e.yep).to.eql("y");
    });
    it("removeComp", function() {
      var called, called2, en;

      called = false;
      c.dispose(function() {
        return called = true;
      });
      called2 = false;
      en = null;
      e.comp(c.name);
      e.removeComp(["blah", c.name]);
      expect(e.has(c.name)).to.not.be.ok();
      return expect(called).to.be.ok();
    });
    it("comps", function() {
      e.comp("ok bob");
      return expect(e.comps()).to.eql(["ok", "bob"]);
    });
    it("clone", function() {
      e.comp("yep bob");
      return expect(e.clone().comps()).to.eql(e.comps());
    });
    it("should clone empty entity", function() {
      return expect(re.e().clone()).to.exist;
    });
    it("super", function() {
      c.defines("d", function(v) {
        return v;
      }).defaults("y", function(v) {
        return v;
      });
      expect(e._super(c.name, "d", 100)).to.eql(100);
      expect(e._super(c.name, "y", "bob")).to.eql("bob");
      e.comp(c.name);
      return expect(e._super("", "has", c.name)).to.be.ok();
    });
    it("attr overwrite method", function() {
      var called;

      called = false;
      e.set({
        blah: function() {}
      });
      e.set({
        blah: function() {
          return called = true;
        }
      });
      e.blah();
      return expect(called).to.be.ok();
    });
    it("should dispose of all components properly", function() {
      var called, called2;

      called = false;
      called2 = false;
      e.comp("image iso");
      re.c("draw").dispose(function() {
        return called2 = true;
      });
      e.dispose();
      return expect(called2).to.be.ok();
    });
    it("should throw error on undefined parent method", function() {
      var called;

      called = false;
      try {
        e._super("image", "asdfsdf");
      } catch (_error) {
        e = _error;
        called = true;
      }
      return expect(called).to.be.ok();
    });
    it("has", function() {
      e.comp("tst");
      return expect(e.has("tst")).to.be.ok();
    });
    it("bindings", function() {
      var called, func, va, va2;

      called = false;
      va = void 0;
      va2 = void 0;
      e.on("values", function(v, v2) {
        called = true;
        va = v;
        va2 = v2;
        return false;
      });
      expect(e.trigger("values", 10, 55)).to.eql(e);
      expect(called).to.be.ok();
      expect(va).to.eql(10);
      expect(va2).to.eql(55);
      func = function() {};
      e.on({
        yep: function() {},
        ok: func
      });
      e.off("yep");
      e.off({
        ok: func
      });
      e.on("key", function() {});
      expect(e.off()).to.exist;
      return expect(e._re_listens).to.eql({});
    });
    it("should change context of event", function() {
      var obj;

      obj = {};
      e.on({
        blah: function() {
          return expect(obj).to.eql(this);
        }
      }, obj);
      e.on("blah2", (function() {
        return expect(obj).to.eql(this);
      }), obj);
      return e.trigger("blah2").trigger("blah");
    });
    it("should add multiple events", function() {
      var called, called2;

      called = false;
      called2 = false;
      e.on({
        call: function() {
          return called = true;
        },
        call2: function() {
          return called2 = true;
        }
      });
      e.trigger("call");
      e.trigger("call2");
      expect(called).to.be.ok();
      return expect(called2).to.be.ok();
    });
    it("attr", function() {
      e.set({
        x: 10,
        y: "sdd",
        func: function() {}
      });
      expect(e.x).to.eql(10);
      expect(e.y).to.eql("sdd");
      expect(e.func, "function").to.exist;
      e.set("ok", 87);
      expect(e.ok).to.eql(87);
      e.posX = function(value1) {
        return this.val = value1;
      };
      e.set("posX", 154);
      expect(e.val).to.eql(154);
      e.size = function(width, height) {
        this.width = width;
        return this.height = height;
      };
      e.set({
        size: [45, 40]
      });
      expect(e.width).to.eql(45);
      return expect(e.height).to.eql(40);
    });
    it("def", function() {
      e.first = 99;
      e.def("first", 10);
      expect(e.first).to.eql(99);
      e.def({
        ok: 10,
        yep: 99
      });
      expect(e.ok).to.eql(10);
      return expect(e.yep).to.eql(99);
    });
    return it("dispose", function() {
      var called, called3, co;

      called = false;
      co = void 0;
      c.dispose(function(comp) {
        called = true;
        return co = comp;
      });
      e.comp(c.name);
      called3 = false;
      e.on("dispose", function() {
        return called3 = true;
      });
      e.dispose();
      expect(called).to.be.ok();
      expect(co).to.eql(c);
      return expect(called3).to.be.ok();
    });
  });

}).call(this);

(function() {
  describe("core/array", function() {
    var query;

    query = void 0;
    beforeEach(function() {
      return query = re();
    });
    it("should find by tag", function() {
      re._t["id"] = 10;
      return expect(re("#id")).to.eql(10);
    });
    it("should find by group", function() {
      return re._g["group"];
    });
    it("should be right length", function() {
      return expect(re([2]).length).to.eql(1);
    });
    it("should query by value", function() {
      var v;

      return v = re.e().team = {
        num: 1
      };
    });
    it("should reject elements", function() {
      var k, that;

      k = re([1, 2, 3]);
      that = this;
      expect(k.reject(function(e, i, l) {
        expect(i).to.exist;
        expect(l).to.exist;
        expect(that).to.eql(this);
        return e === 1 || e === 3;
      }, this));
      return expect(k[0]).to.eql(2);
    });
    it("should return empty query", function() {
      return expect(re().length).to.eql(0);
    });
    it("should filter", function() {
      query = re([1, 2, 3, 4]);
      return expect(query.filter(function(v) {
        return v === 1;
      }).length).to.eql(1);
    });
    it("should create query from array", function() {
      var a, q;

      a = [1, 2, 3];
      q = re(a);
      expect(q[0]).to.eql(a[0]);
      expect(q[1]).to.eql(a[1]);
      return expect(q[2]).to.eql(a[2]);
    });
    it("invoke", function() {
      query = re([re.e("ok")]);
      return expect(query.invoke("comp", "b").first().comps()).to.eql(["ok", "b"]);
    });
    it("each", function() {
      var i;

      i = 0;
      return expect(re([re.e("dd")]).each(function(e, c, l) {
        expect(i++).to.eql(c);
        return expect(l).to.exist;
      }));
    });
    it("sample", function() {
      return expect(re([1, 2, 3]).sample()).to.exist;
    });
    it("pluck", function() {
      var k;

      k = re([
        {
          f: 0,
          y: 0
        }
      ]).pluck("f y");
      expect(k[0].f).to.eql(0);
      return expect(k[0].y).to.eql(0);
    });
    it("should last", function() {
      var b;

      b = re.e();
      query.push(b);
      return expect(query.last()).to.eql(b);
    });
    it("should first", function() {
      var b;

      b = re.e();
      query.unshift(b);
      return expect(query.first()).to.eql(b);
    });
    it("should findall", function() {
      var that;

      query = re([1, 5, 4, 5]);
      that = this;
      return eq(query.findAll(function(v) {
        expect(that).to.eql(this);
        return v === 5;
      }, that).length, 2);
    });
    it("addAfter", function() {
      var b;

      b = re.e();
      query.push(10, 6);
      query.addAfter(10, b);
      return expect(query.indexOf(b)).to.eql(1);
    });
    it("addBefore", function() {
      var b;

      b = re.e();
      query.push(10, 6);
      query.addBefore(6, b);
      return expect(query.indexOf(b)).to.eql(1);
    });
    it("swap", function() {
      query.push(10, 6);
      query.swap(10, 6);
      expect(query[0]).to.eql(6);
      return expect(query[1]).to.eql(10);
    });
    it("should remove", function() {
      var e, n, q;

      q = re();
      e = re.e();
      q.push(10);
      q.push(e);
      n = re.e();
      q.remove(e);
      return expect(q.has(e)).to.not.be.ok();
    });
    it("should removeAt", function() {
      query = re([1, 2, 3, 4]);
      expect(query.removeAt(0, 2)).to.be.ok();
      return expect(query.length).to.eql(1);
    });
    it("should clear", function() {
      query = re([1, 2, 3, 4]);
      query.clear();
      return expect(query.length).to.eql(0);
    });
    it("should count", function() {
      var that;

      query = re([1, 1, 1, 3, 4]);
      that = this;
      return eq(query.count(function(v) {
        expect(that).to.eql(this);
        return v === 1;
      }, that), 3);
    });
    it("contains", function() {
      var en;

      en = re.e();
      query = re();
      expect(query.contains(en)).to.not.be.ok();
      query.push(en);
      return expect(query.contains(en)).to.be.ok();
    });
    it("min", function() {
      var min;

      query = re();
      query.push(0);
      query.push(10);
      query.push(2);
      query.push(5);
      min = query.min(function(e, i, l) {
        expect(this).to.eql("ok");
        expect(i).to.exist;
        expect(l).to.exist;
        return e;
      }, "ok");
      return expect(min).to.eql(0);
    });
    it("max", function() {
      var highest;

      query = re();
      query.push(0);
      query.push(10);
      query.push(2);
      query.push(5);
      highest = query.max(function(e, i, l) {
        expect(this).to.eql("ok");
        expect(i).to.exist;
        expect(l).to.exist;
        return e;
      }, "ok");
      return expect(highest).to.eql(10);
    });
    it("find", function() {
      var e, result;

      e = re();
      e.push(1);
      e.push(10);
      result = e.find(function(t) {
        expect(e).to.eql(this);
        return t === 10;
      });
      return expect(result).to.eql(10);
    });
    it("isEmpty", function() {
      return expect(re().isEmpty()).to.be.ok();
    });
    return it("every", function() {
      var e, every;

      e = re();
      e.push(re.e());
      e.push(re.e().set("blah", true));
      every = e.every(function(e) {
        return e.blah;
      });
      expect(every).to.not.be.ok();
      e.invoke("set", "blah", true);
      every = e.every(function(e) {
        return e.blah;
      });
      expect(every).to.be.ok();
      every = re().every(function() {
        return false;
      });
      return expect(every).to.be.ok();
    });
  });

}).call(this);

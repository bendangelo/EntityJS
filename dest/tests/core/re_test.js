(function() {
  describe("re", function() {
    re.e("queryre");
    it("should create array", function() {
      return expect(re([1]).length).to.eql(1);
    });
    it("should get element by id", function() {
      setup_canvas();
      expect(re.$("#game-canvas")).to.exist;
      expect(re.$("#game-canvas")).to.exist;
      expect(re.$("#game-canvas")).to.exist;
      return teardown_canvas();
    });
    it("should find array by tag", function() {
      var array;

      array = re().tag("10");
      return expect(array.tag()).to.eql(re("#10").tag());
    });
    it("should get element by tag", function() {
      setup_canvas();
      expect(re.$("canvas")).to.exist;
      expect(re.$("canvas")).to.exist;
      expect(re.$("canvas")).to.exist;
      return teardown_canvas();
    });
    it("should create canvas", function() {
      return expect(re.$new("canvas"), "htmlcanvaselement").to.exist;
    });
    return it("should re.is work", function() {
      var f, k;

      expect(re.expect({})).to.be.ok().to.exist;
      expect(re.expect(1)).to.be.ok().to.exist;
      expect(re.expect(1, "Number")).to.be.ok().to.exist;
      expect(re.expect(null)).to.not.be.ok().to.exist;
      expect(re.expect(undefined)).to.not.be.ok().to.exist;
      expect(re.expect(null, "array")).to.not.be.ok().to.exist;
      expect(re.expect(1, "string")).to.not.be.ok().to.exist;
      expect(re.expect("", "number")).to.not.be.ok().to.exist;
      expect(re.expect("", "Number")).to.not.be.ok().to.exist;
      expect(re.expect("", "string")).to.be.ok().to.exist;
      expect(re.expect(1, "number")).to.be.ok().to.exist;
      expect(re.expect([], "array")).to.be.ok().to.exist;
      expect(re.expect(/sd/, "regexp")).to.be.ok().to.exist;
      k = {};
      expect(re.expect(k, "object")).to.be.ok().to.exist;
      f = function() {};
      return expect(re.expect(f, "function")).to.be.ok().to.exist;
    });
  });

}).call(this);

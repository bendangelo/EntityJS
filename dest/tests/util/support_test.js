(function() {
  describe("support", function() {
    it("find first support sound", function() {
      return expect(re.support("aac", "ogg", "mp3", "wav")).to.be.a("string");
    });
    it("should support canvas", function() {
      return expect(re.support("canvas")).to.be.ok();
    });
    return it("should support both", function() {
      return expect(re.support("text canvas")).to.be.ok();
    });
  });

}).call(this);

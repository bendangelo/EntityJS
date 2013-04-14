(function() {
  describe("util/clone", function() {
    it("should clone object", function() {
      var b, k;

      k = {
        ok: 10,
        blah: []
      };
      b = re.clone(k);
      expect(b.ok).to.eql(k.ok);
      return expect(b.blah).to.eql(k.blah);
    });
    return it("should clone array", function() {
      var b, k;

      k = [1, 2];
      b = re.clone(k);
      return expect(b).to.eql(k);
    });
  });

}).call(this);

(function() {
  describe("load", function() {
    it("load", function() {
      var called, img, prog, sfx, sfx2;

      re.load.path = "__spec__/";
      img = "/__spec__/helpers/accept.png";
      sfx = "http://localhost:8888/__spec__/helpers/alligator.mp3";
      sfx2 = "helpers/alligator.ogg";
      called = false;
      prog = false;
      re.load([img, sfx, sfx2]).complete(function(assets) {
        var b;

        called = true;
        expect(assets, "array").to.exist;
        expect(prog).to.be.ok();
        expect(re.c("accept.png").image).to.exist;
        expect(re.c("accept.img").image).to.exist;
        expect(re.c("alligator.sfx").sound).to.exist;
        b = re.e("accept.png");
        expect(b._image).to.exist;
        expect(b.sizeX).to.eql(b._image.width);
        expect(b.sizeY).to.eql(b._image.height);
        expect(b.bisect).to.eql(b._image.width);
        b = re.e("alligator.sfx");
        return expect(b._sound).to.exist;
      }).progress(function(current, total, name) {
        prog = true;
        expect(name, "string").to.exist;
        expect(current, "number").to.exist;
        return expect(total, "number").to.exist;
      }).error(function() {
        return expect(false).to.be.ok();
      });
      waits(1000);
      return runs(function() {
        return expect(called).to.be.ok();
      });
    });
    it("should call complete on empty load", function() {
      var called;

      called = false;
      re.load([]).complete(function() {
        return called = true;
      });
      return expect(called).to.be.ok();
    });
    return it("should throw error on not found image", function() {
      var called;

      called = false;
      re.load("sdfsdf.png").error(function(e) {
        return called = true;
      });
      waits(200);
      return runs(function() {
        return expect(called).to.be.ok();
      });
    });
  });

}).call(this);

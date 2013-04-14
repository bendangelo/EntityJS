(function() {
  describe("pattern/pathfind", function() {
    var automap, map, pathfind;

    map = void 0;
    pathfind = void 0;
    automap = void 0;
    beforeEach(function() {
      map = [[0, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 0, 1, 0]];
      automap = re.e("automap").automap(map);
      pathfind = re.e("pathfind");
      return pathfind.checkNode = function(x, y) {
        return automap.within(x, y) && automap.automap(x, y) === 0;
      };
    });
    it("should move on self", function() {
      var path;

      path = pathfind.pathfind(0, 0, 0, 0);
      return expect(path.length).to.eql(2);
    });
    it("should move up one tile", function() {
      var path;

      path = pathfind.pathfind(0, 0, 0, 1);
      expect(path.length).to.eql(2);
      return expect(path.pop()).to.eql(1);
    });
    return it("should navigate around 1s", function() {
      var path;

      path = pathfind.pathfind(0, 1, 2, 1);
      path.pop();
      return expect(path.pop(), 1).to.not.be.ok();
    });
  });

}).call(this);

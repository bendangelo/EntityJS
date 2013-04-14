describe "pattern/pathfind", ->
  map = undefined
  pathfind = undefined
  automap = undefined
  beforeEach ->
    
    #zero is walkable
    map = [[0, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 0, 1, 0]]
    
    #supplies within method
    automap = re.e("automap").automap(map)
    pathfind = re.e("pathfind")
    
    #implement custom check method
    pathfind.checkNode = (x, y) ->
      automap.within(x, y) and automap.automap(x, y) is 0

  it "should move on self", ->
    path = pathfind.pathfind(0, 0, 0, 0)
    expect(path.length).to.eql 2

  it "should move up one tile", ->
    path = pathfind.pathfind(0, 0, 0, 1)
    expect(path.length).to.eql 2
    expect(path.pop()).to.eql 1

  it "should navigate around 1s", ->
    path = pathfind.pathfind(0, 1, 2, 1)
    
    #first int is Y
    path.pop()
    
    #second is X
    expect(path.pop(), 1).to.not.be.ok()



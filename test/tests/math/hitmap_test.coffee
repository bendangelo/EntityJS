describe "hitmap", ->
  e = undefined
  beforeEach ->
    e = re.e("hitmap")

  it "checkHit", ->
    
    #setup re.tile
    
    #check hit on blank map
    k = e.checkHit(0, 0, 10, 10, 10, 10, 0, 0)
    expect(k).to.exist
    
    #pos should be vel + pos
    expect(k.posX).to.eql 10
    expect(k.posY).to.eql 10

  it "should hit wall", ->
    re.tile.sizeX = 25
    re.tile.sizeY = 25
    posX = 0
    posY = 0
    velX = 40
    velY = 0
    bodX = 25
    bodY = 25
    
    #setup hit block
    e.automap 1, 0, e.hitValue
    res = e.checkHit(posX, posY, velX, velY, bodX, bodY, 0, 0)
    expect(res.hitX).to.be.ok()
    expect(res.tarX).to.exist
    expect(res.tarY).to.exist

  it "has automap", ->
    e.automap 0, 0, 1



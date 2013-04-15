describe "tile", ->
  e = undefined
  beforeEach ->
    re.tile.sizeX = 40
    re.tile.sizeY = 40
    e = re.e("tile")

  it "toPos", ->
    e = re.tile.toPos(88, 40)
    expect(e.posX).to.eql 80
    expect(e.posY).to.eql 40

  it "toPosX", ->
    expect(re.tile.toPosX(88, 40)).to.eql 80
    re.tile.sizeX = 40
    expect(re.tile.toPosX(88)).to.eql 80

  it "toPosY", ->
    expect(re.tile.toPosY(88, 40)).to.eql 80
    re.tile.sizeY = 40
    expect(re.tile.toPosY(88)).to.eql 80

  it "toTile", ->
    e = re.tile.toTile(88, 40)
    expect(e.tileX).to.eql 2
    expect(e.tileY).to.eql 1

  it "toTileX", ->
    expect(re.tile.toTileX(88)).to.eql 2
    re.tile.sizeX = 40
    expect(re.tile.toTileX(88)).to.eql 2

  it "toTileY", ->
    expect(re.tile.toTileY(88, 40)).to.eql 2
    re.tile.sizeY = 40
    expect(re.tile.toTileY(88)).to.eql 2

  it "tile", ->
    e.sizeX = 40
    e.sizeY = 40
    expect(e.tile(1, 1)).to.exist
    expect(e.posX).to.eql 40
    expect(e.posY).to.eql 40
    expect(e.tile(
      x: 2
      y: 1
    )).to.exist
    expect(e.posX).to.eql 80
    expect(e.posY).to.eql 40
    expect(e.tile(
      posX: 2 * e.sizeX
      posY: 2 * e.sizeY
    )).to.exist
    expect(e.posX).to.eql 80
    expect(e.posY).to.eql 80

  it "tileX", ->
    expect(e.tileX(2)).to.exist
    expect(e.tileX()).to.eql 2

  it "tileY", ->
    expect(e.tileY(2)).to.exist
    expect(e.tileY()).to.eql 2



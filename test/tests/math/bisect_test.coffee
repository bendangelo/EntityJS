describe "bisect", ->
  e = undefined
  beforeEach ->
    e = re.e("bisect")
    e.bisect = 160
    e.sizeX = 60
    e.sizeY = 60

  it "static biToX", ->
    expect(re.bisect.toX(1, 160, 60)).to.eql 60

  it "static biToY", ->
    expect(re.bisect.toY(1, 160, 60, 60)).to.eql 0

  it "static biToTileX", ->
    expect(re.bisect.toTileX(1, 160, 60)).to.eql 1

  it "static biToTileY", ->
    expect(re.bisect.toTileY(1, 160, 60)).to.eql 0

  it "static tileToBi", ->
    expect(e.tileToBi(1, 0)).to.eql 1

  it "biToX", ->
    expect(e.biToX(1)).to.eql 60

  it "biToY", ->
    expect(e.biToY(1)).to.eql 0

  it "biToTileX", ->
    expect(e.biToTileX(1)).to.eql 1

  it "biToTileY", ->
    expect(e.biToTileY(1)).to.eql 0

  it "tiletoBi", ->
    expect(e.tileToBi(1, 0)).to.eql 1



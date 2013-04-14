describe "math/iso", ->
  e = undefined
  beforeEach ->
    re.iso.sizeX = 30
    re.iso.sizeY = 30
    re.iso.sizeZ = 30
    e = re.e("iso")

  it "toPos", ->
    e = re.iso.toPos(125, 82)
    expect(e.posX).to.eql 90
    e = re.iso.toPos(125, 82)
    expect(e.posY).to.eql 75

  it "toPosX", ->
    expect(re.iso.toIsoX(125, 82)).to.eql 4
    expect(re.iso.toIsoY(125, 82)).to.eql 1
    expect(re.iso.toPosX(125, 82)).to.eql 90

  it "toPosY", ->
    expect(re.iso.toIsoX(65, 96)).to.eql 3
    expect(re.iso.toIsoY(65, 96)).to.eql 2
    expect(re.iso.toPosY(65, 96)).to.eql 75

  it "toIso", ->
    e = re.iso.toIso(-9, 90)
    expect(e.isoX).to.eql 2
    e = re.iso.toIso(-5, 30)
    expect(e.isoY).to.eql 1

  it "toIsoX", ->
    expect(re.iso.toIsoX(-9, 90)).to.eql 2

  it "toIsoY", ->
    expect(re.iso.toIsoY(-5, 30)).to.eql 1

  it "should add correctly", ->
    oldX = e.isoX()
    e.isoY 4
    i = 0

    while i < 8
      e.isoY e.isoY() + 0.25
      i++
    expect(e.isoY()).to.eql 6
    expect(e.isoX()).to.eql oldX

  it "iso normal args", ->
    expect(e.iso(2, 2, 2)).to.eql e
    expect(e.isoX()).to.eql 2
    expect(e.isoY()).to.eql 2
    expect(e.isoZ()).to.eql 2

  it "iso obj args", ->
    expect(e.iso(
      x: 2
      y: 2
      z: 2
    )).to.eql e
    expect(e.isoX()).to.eql 2
    expect(e.isoY()).to.eql 2
    expect(e.isoZ()).to.eql 2

  it "iso copy other iso position", ->
    iso = re.e("iso")
    iso.iso 2, 2, 2
    expect(e.iso(iso)).to.eql e
    expect(e.isoX()).to.eql 2
    expect(e.isoY()).to.eql 2
    expect(e.isoZ()).to.eql 2

  it "isoX", ->
    expect(e.isoX(4)).to.eql e
    expect(e.isoX()).to.eql 4
    expect(e.posX).to.eql 120
    expect(e.posY).to.eql 60

  it "isoY", ->
    expect(e.isoY(1)).to.eql e
    expect(e.isoY()).to.eql 1
    expect(e.posX).to.eql -30
    expect(e.posY).to.eql 15

  it "isoZ", ->
    expect(e.isoZ(1)).to.eql e
    expect(e.isoZ()).to.eql 1



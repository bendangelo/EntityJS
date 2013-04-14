describe "align", ->
  e = undefined
  beforeEach ->
    e = re.e("align circle")

  it "align hor", ->
    expect(e.alignHor(10)).to.exist
    expect(e.posX).to.eql re.loop().sizeX * 0.5 - e.sizeX * 0.5 + 10 | 0

  it "align ver", ->
    expect(e.alignVer(1)).to.exist
    expect(e.posY).to.eql re.loop().sizeY * 0.5 - e.sizeY * 0.5 + 1 | 0

  it "align right", ->
    expect(e.alignRight(5)).to.exist
    expect(e.posX).to.eql re.loop().sizeX - e.sizeX + 5

  it "align left", ->
    expect(e.alignLeft(5)).to.exist
    expect(e.posX).to.eql 5

  it "align top", ->
    expect(e.alignTop(5)).to.exist
    expect(e.posY).to.eql 5

  it "align bottom", ->
    expect(e.alignBottom(5)).to.exist
    expect(e.posY).to.eql re.loop().sizeY - e.sizeY + 5



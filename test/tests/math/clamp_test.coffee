describe "clamp", ->
  e = undefined
  beforeEach ->
    e = re.e("clamp")

  it "should clamp by range", ->
    e.posX = 999
    expect(e.clamp("posX", 0, 100)).to.exist
    expect(e.posX).to.eql 100

  it "should clamp by range, global method", ->
    e.posX = 999
    e.posX = re.clamp(e.posX, 0, 100)
    expect(e.posX).to.eql 100

  it "should clamp by minimum", ->
    e.posX = 999
    expect(e.clamp("posX", 0)).to.exist
    expect(e.posX).to.eql 999
    e.posX = -1
    expect(e.clamp("posX", 0)).to.exist
    expect(e.posX).to.eql 0



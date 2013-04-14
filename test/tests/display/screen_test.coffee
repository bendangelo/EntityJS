describe "screen", ->
  e = undefined
  beforeEach ->
    e = re.e("screen")

  it "pos", ->
    expect(e.pos()).to.eql e
    expect(e.pos(10, 4)).to.eql e
    expect(e.posX).to.eql 10
    expect(e.posY).to.eql 4
    
    #set with object
    expect(e.pos(
      posX: 2
      posY: 3
    )).to.eql e
    expect(e.posX).to.eql 2
    expect(e.posY).to.eql 3

  it "toScreenx", ->
    expect(e.toScreenX(10)).to.exist

  it "toScreenY", ->
    expect(e.toScreenY(10)).to.exist



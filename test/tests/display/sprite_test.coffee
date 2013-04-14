describe "sprite", ->
  e = undefined
  beforeEach ->
    e = re.e("sprite " + f("image").name)
    e.bisect = 16
    e.sizeX = 2
    e.sizeY = 2

  it "frame", ->
    expect(e.frame()).to.eql 0
    expect(e.frame(1)).to.eql e
    expect(e.frameX).to.eql 1
    expect(e.frameY).to.eql 0
    expect(e.frame()).to.eql 1

  it "should display second row", ->
    e.bisect = 2001
    e.sizeY = 80
    e.sizeX = 87
    e.frame 22
    expect(e.frameX).to.eql 22
    expect(e.frameY).to.eql 0
    
    #tricky part
    e.frame 23
    expect(e.frameX).to.eql 0
    expect(e.frameY).to.eql 1

  it "draw", ->
    expect(e.draw(re.loop().context)).to.exist



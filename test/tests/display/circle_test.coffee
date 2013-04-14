describe "circle", ->
  e = undefined
  beforeEach ->
    e = re.e("circle")

  it "should create circle", ->
    expect(e).to.exist

  it "should draw", ->
    expect(e.draw(re.loop().context)).to.exist

  it "should radius", ->
    expect(e.radius(10), "object").to.exist
    expect(e.radius()).to.eql 10
    
    #chain call
    expect(e.set("radius", 14)).to.exist
    expect(e.radius()).to.eql 14



describe "displays/el", ->
  e = undefined
  beforeEach ->
    e = re.e("el")

  it "should define valid dom", ->
    expect(e.el, "htmldivelement").to.exist
    expect(e.posX()).to.eql 0
    expect(e.posY()).to.eql 0
    expect(e.sizeX()).to.eql 0
    expect(e.sizeY()).to.eql 0



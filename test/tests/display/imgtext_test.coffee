describe "imgtext", ->
  e = undefined
  beforeEach ->
    re.c("serif").requires(["imgtext", 'accept.png']).defines "imgtext", [1, 2, 3, 4, 3, 4, 5, 6, 7, 8, 9, 4, 5, 3, 4, 5, 6, 7, 2, 3, 4, 5]
    e = re.e("serif").set("text", "blah")

  it "visible", ->
    expect(e.visible()).to.be.ok
    e._text = null
    expect(e.visible()).to.not.be.ok

  it "draw", ->
    expect(e.draw(re.loop().context)).to.exist

  it "text", ->
    expect(e.text()).to.eql "blah"
    expect(e.text("new")).to.eql e
    expect(e.text()).to.eql "new"



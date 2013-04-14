describe "text", ->
  f = undefined
  beforeEach ->
    f = re.e("text")

  afterEach ->
    f.dispose()

  it "text", ->
    expect(f.text("pl")).to.be.ok
    expect(f.text()).to.eql "pl"

  it "visible", ->
    expect(f.text("ok")).to.exist
    expect(f.visible()).to.be.ok
    expect(f.text("")).to.exist
    expect(f.visible()).to.not.be.ok

  it "should join strings", ->
    f.text "blah", 10, "nice"
    expect(f.text()).to.eql "blah 10 nice"

  it "should draw", ->
    f.text "m\nlinesdfsdfsdfsdsdfsdfsdfsdfsdfsfsf"
    expect(f.draw(re.loop().context)).to.exist

    #make sure correct width is set
    expect(f.sizeX > 40).to.be.ok



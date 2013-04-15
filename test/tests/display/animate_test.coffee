describe "display/animate", ->
  e = undefined
  beforeEach ->
    e = re.e("animate")

  it "should animate", ->
    expect(e.animate()).to.exist



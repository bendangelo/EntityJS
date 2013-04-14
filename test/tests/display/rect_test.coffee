describe "rect", ->
  e = undefined
  beforeEach ->
    e = re.e("rect")

  it "draw", ->
    expect(e.draw(re.loop().context)).to.exist



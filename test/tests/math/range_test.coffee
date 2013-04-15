describe "math/range", ->
  it "should return range", ->
    i = re.range(0, 2, 1)
    expect(i).to.eql [0, 1]



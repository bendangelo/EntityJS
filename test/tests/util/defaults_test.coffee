describe "defaults", ->
  it "should default to zero", ->
    k = re.defaults(0, 10, 30)
    expect(k).to.eql 0

  it "should default to last", ->
    k = re.defaults(null, `undefined`, 100)
    expect(k).to.eql 100



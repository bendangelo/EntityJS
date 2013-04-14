describe "input/preventdefault", ->
  it "should save prevent default", ->
    d = "left right"
    re.preventDefault d
    expect(re.preventDefault.d["left"]).to.be.ok
    expect(re.preventDefault.d["right"]).to.be.ok



describe "pressed", ->
  it "single pressed", ->
    expect(re.pressed("d")).to.not.be.ok()
    re.pressed.d["d"] = true
    expect(re.pressed("d")).to.be.ok()
    re.pressed.d["d"] = false

  it "multi pressed", ->
    a = ["d", "w"]
    expect(re.pressed(a)).to.not.be.ok()
    re.pressed.d["d"] = true
    expect(re.pressed(a)).to.be.ok()
    re.pressed.d["d"] = false
    re.pressed.d["w"] = true
    expect(re.pressed(a)).to.be.ok()
    re.pressed.d["w"] = false



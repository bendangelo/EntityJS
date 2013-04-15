describe "util/clone", ->
  it "should clone object", ->
    k =
      ok: 10
      blah: []

    b = re.clone(k)
    expect(b.ok).to.eql k.ok
    expect(b.blah).to.eql k.blah

  it "should clone array", ->
    k = [1, 2]
    b = re.clone(k)
    expect(b).to.eql k



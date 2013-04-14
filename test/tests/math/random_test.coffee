describe "random", ->
  it "random 0-1", ->
    i = 100

    while i--
      n = re.random()
      expect(n >= 0).to.be.ok()
      expect(n <= 1).to.be.ok()

  it "random 0-3", ->
    i = 100

    while i--
      n = re.random(3)
      expect(n >= 0).to.be.ok()
      expect(n <= 3).to.be.ok()

  it "should get one or the other", ->
    first = false
    second = false
    i = 100

    while i--
      n = re.random([-10, 10])
      first = true  if n is 10
      second = true  if n is -10
      expect(n is -10 or n is 10).to.be.ok()
    expect(first).to.be.ok()
    expect(second).to.be.ok()

  it "random -10 to 10", ->
    i = 100

    while i--
      n = re.random(-10, 10)
      expect(n >= -10).to.be.ok()
      expect(n <= 10).to.be.ok()

  it "random prop from object", ->
    obj =
      ok: 10
      blah: 2
      t: 3

    prop = re.random(obj)
    expect(prop is "ok" or prop is "blah" or prop is "t").to.be.ok()



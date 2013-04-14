describe "flicker", ->
  e = undefined
  beforeEach ->
    e = re.e().set(
      health: 0
      flick: (v) ->
        @health += v
    ).comp("flicker")

  it "flicker", ->

    #should take 4 seconds to finis
    time = 4
    called = false
    called2 = false
    called3 = false
    e.on("flicker:start", ->
      called = true
    ).on("flicker:finish", (v) ->
      called2 = true
      expect(v, "string").to.exist
    ).on "flicker:update", (f, i, array, loop_) ->
      expect(f).to.exist
      expect(i).to.exist
      expect(array).to.exist
      expect(loop_).to.exist
      called3 = true

    e.flicker time, [5, 5, 5, 5], 1, "heal"
    expect(e.flickering("heal")).to.be.ok
    expect(e.flickering()).to.be.ok
    expect(called).to.be.ok

    #manually call update
    i = 0

    while i < 60 * time
      e.flicker_update re.loop().stepSize
      i++
    expect(e.health).to.eql 20
    expect(called2).to.be.ok
    expect(called3).to.be.ok

  it "should flicker correctly", ->
    e.flicker 1, [5]
    i = 0

    while i < 3
      e.flicker_update e.stepSize * 0.5
      i++
    expect(e.health).to.eql 5



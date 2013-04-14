describe "sound", ->

  e = undefined
  beforeEach ->
    e = re.e("sound alligator.sfx")

  it "play", (done)->
    called = false
    k = e.on("sound:finish", ->
      done()
    )
    expect(e.play()).to.exist


  it "currenttime", ->


  it "ended", ->



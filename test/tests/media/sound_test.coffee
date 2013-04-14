describe "sound", ->
  e = undefined
  beforeEach ->
    e = re.e("sound alligator.sfx")

  it "play", ->
    called = false
    k = e.on("sound:finish", ->
      called = true
    )
    expect(e.play()).to.exist
    waits 1500
    runs ->
      expect(called).to.be.ok()


  it "currenttime", ->

  
  #expect(e.currentTime()).to.exist
  it "ended", ->



#expect(e.ended()).to.exist

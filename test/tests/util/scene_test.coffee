describe "test", ->
  it "create new game scene", ->
    called = false
    val1 = undefined
    val2 = undefined
    re.scene("game").enter (t, c) ->
      called = true
      val1 = t
      val2 = c

    expect(not re.scene.current?).to.be.ok()
    re.scene("game").enter 10, "sd"
    expect(re.scene.current).to.eql "game"
    expect(called).to.be.ok()
    expect(val1).to.eql 10
    expect(val2).to.eql "sd"

  it "should exit properly", ->
    called = false
    val1 = undefined
    val2 = undefined
    re.scene("bob").exit (cal, s) ->
      called = true
      val1 = cal
      val2 = s

    
    #exit current scene
    re.scene("bob").exit 10, "s"
    expect(called).to.be.ok()
    expect(val1).to.eql 10
    expect(val2).to.eql "s"
    
    #current scene
    expect(re.scene()).to.eql null

  it "should exit once", ->
    called = 0
    re.scene("bob").exit(->
      called++
    ).enter()
    re.scene("blah").enter 10
    expect(called).to.eql 1



describe "cycle/tween", ->
  tween = undefined
  beforeEach ->
    tween = re.e("tween")
    tween.x = 0
    tween.y = 0

  it "should move object", ->
    called = false
    calledUpdate = false
    calledFinish = false
    tween.on "tween:update", ->
      calledUpdate = true

    tween.on "tween:finish", ->
      calledFinish = true

    tween.on "tween:start", ->
      called = true

    tween.tween 0,
      x: 100

    i = 60

    while i--
      tween.tween_update re.loop().stepSize
    expect(tween.x).to.eql 100
    expect(called).to.be.ok()
    expect(calledUpdate).to.be.ok()
    expect(calledFinish).to.be.ok()

  it "should move object in 60ms", ->
    tween.comp "tile"
    tween.x = -10
    tween.tween 1,
      x: 50
      tileY: 10

    step = re.loop().stepSize
    tween.tween_time = tween.tween_t * 0.5
    tween.tween_update step
    expect(tween.x).to.eql 21.62
    i = 60

    while i--
      tween.tween_update step
    expect(tween.x).to.eql 50
    expect(tween.tileY()).to.eql 10



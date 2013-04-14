describe "force", ->
  e = undefined
  beforeEach ->
    e = re.e("force")

  it "isIdle", ->
    expect(e.isIdle()).to.be.ok
    e.velY = 0
    e.accX = 0
    e.accY = 0
    e.velX = 1
    expect(e.isIdle()).to.not.be.ok
    e.velY = 0
    e.accX = 0
    e.accY = 1
    e.velX = 0
    expect(e.isIdle()).to.not.be.ok
    e.velY = 0
    e.accX = 1
    e.accY = 0
    e.velX = 0
    expect(e.isIdle()).to.not.be.ok
    e.velY = 1
    e.accX = 0
    e.accY = 0
    e.velX = 0
    expect(e.isIdle()).to.not.be.ok
    e.velY = 0
    e.accX = 0
    e.accY = 0
    e.velX = 0
    expect(e.isIdle()).to.be.ok

    #offset
    e.velY = 2
    expect(e.isIdle(2)).to.be.ok

  it "force", ->
    i = 10

    while i--
      expect(e.force(10, i, 0.5, i, 2)).to.eql ((10 + i) * 0.5 + i * 2)

  it "forceVel", ->
    i = 10

    while i--
      expect(e.forceVel(5, i, 0.5)).to.eql (5 + i) * 0.5

  it "forceGra", ->
    i = 10

    while i--
      expect(e.forceGra(i + 10, i)).to.eql (i + 10) * i

  it "forceRes", ->
    i = 50

    while i -= 5
      expect(e.forceRes(i, 3)).to.eql i * -3

  it "update being called", ->
    called = false
    e.on "aftermath", ->
      called = true

    e.trigger "update"
    expect(called).to.be.ok

  it "aftermath", ->
    called = false
    e.on "aftermath", ->
      called = true

    expect(e.aftermath(10, 10, false, false)).to.exist
    expect(e.posX).to.eql 10
    expect(e.posY).to.eql 10
    expect(called).to.be.ok
    e.aftermath 15, 15, true, true
    expect(e.velX is 15).to.not.be.ok
    expect(e.velY is 15).to.not.be.ok

  it "should update with hitmap", ->
    called = false
    hitmap = checkHit: ->
      called = true
      true

    e.hitmap = hitmap
    e.velX = 1
    e.velY = 1
    e.force_update()
    expect(e.posX is 0).to.not.be.ok
    expect(e.posY is 0).to.not.be.ok
    expect(called).to.be.ok

  it "should update with no hitmap", ->
    e.hitmap = null
    e.force_update()
    expect(e.posX).to.eql e.posX + e.velX
    expect(e.posY).to.eql e.posY + e.velY



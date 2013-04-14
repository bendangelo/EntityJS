describe "mouse", ->
  e = undefined
  mouse = undefined
  beforeEach ->
    mouse = re.s("mouse").create($("canvas")[0])
    e = re.e("mouse")

  it "mousedown", ->
    type = "mousedown"
    called = undefined
    called2 = undefined
    e.on type, (x, y, e) ->
      called = true
      expect(x).to.exist
      expect(y).to.exist
      expect(e).to.exist

    e.on type + ":middle", (m, e) ->
      called2 = true
      expect(m).to.exist

    mouse.event
      type: type
      offsetX: 0
      offsetY: 0
    , "middle"
    expect(called2).to.be.ok()
    expect(called).to.be.ok()

  it "mouseup", ->
    type = "mouseup"
    called = undefined
    called2 = undefined
    e.on type, (x, y, e) ->
      called = true
      expect(x).to.exist
      expect(y).to.exist
      expect(e).to.exist

    e.on type + ":middle", (m, e) ->
      called2 = true
      expect(m).to.exist

    mouse.event
      type: type
      offsetX: 0
      offsetY: 0
    , "middle"
    expect(called2).to.be.ok()
    expect(called).to.be.ok()

  it "mousemove", ->
    type = "mousemove"
    called = undefined
    e.on type, (x, y, e) ->
      called = true
      expect(x).to.exist
      expect(y).to.exist
      expect(e).to.exist

    mouse.event
      type: type
      offsetX: 0
      offsetY: 0

    expect(called).to.be.ok()

  it "click", ->
    type = "click"
    called = undefined
    e.on type, (x, y, e) ->
      called = true
      expect(e).to.exist
      expect(x).to.exist
      expect(y).to.exist

    mouse.event
      type: type
      offsetX: 50
      offsetY: 100

    expect(called).to.be.ok()

  it "dblclick", ->
    type = "dblclick"
    called = undefined
    e.on type, (x, y, e) ->
      called = true
      expect(x).to.exist
      expect(y).to.exist
      expect(e).to.exist

    mouse.event
      type: type
      offsetX: 0
      offsetY: 0

    expect(called).to.be.ok()

  it "contextmenu", ->
    type = "contextmenu"
    called = undefined
    e.on type, (x, y, e) ->
      called = true
      expect(x).to.exist
      expect(y).to.exist
      expect(e).to.exist

    mouse.event
      type: type
      offsetX: 0
      offsetY: 0

    expect(called).to.be.ok()



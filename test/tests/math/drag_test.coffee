describe "drag", ->
  e = undefined
  beforeEach ->
    e = re.e("drag")

  it "drag", ->
    called = undefined
    called2 = undefined
    called3 = undefined
    e.on("drag:start", ->
      called = true
    ).on("drag:update", ->
      called2 = true
    ).on "drag:finish", ->
      called3 = true

    expect(e.dragStart(0, 0)).to.exist
    expect(e.dragging).to.be.ok()
    expect(called).to.be.ok()
    expect(e.dragUpdate(10, 0)).to.exist
    expect(called2).to.be.ok()
    expect(e.dragFinish()).to.exist
    expect(called3).to.be.ok()



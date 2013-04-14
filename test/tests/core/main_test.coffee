describe "main", ->
  s = undefined
  beforeEach ->
    s = re.loop()

  it "init", ->
    expect(s.context).to.exist

  it "clear", ->
    expect(s.start()).to.exist
    spyOn s.context, "fillRect"
    expect(s.clear("#FF0000")).to.exist
    called s.context.fillRect
    expect(s.clear("rgb(200, 0, 0)")).to.exist
    called s.context.fillRect
    expect(s.clear()).to.exist
    expect(s.stop()).to.exist

  it "loop", ->
    called = false

    #setup custom loop
    s.attr(loop: ->
      called = true
    ).start().stop()
    s.loop()
    expect(called).to.be.ok



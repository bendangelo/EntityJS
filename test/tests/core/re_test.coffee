describe "re", ->
  re.e "queryre"
  it "should create array", ->
    expect(re([1]).length).to.eql 1

  it "should get element by id", ->
    setup_canvas()
    expect(re.$("#game-canvas")).to.exist
    expect(re.$("#game-canvas")).to.exist
    expect(re.$("#game-canvas")).to.exist
    teardown_canvas()

  it "should find array by tag", ->
    array = re().tag("10")
    expect(array.tag()).to.eql re("#10").tag()

  it "should get element by tag", ->
    setup_canvas()
    expect(re.$("canvas")).to.exist
    expect(re.$("canvas")).to.exist
    expect(re.$("canvas")).to.exist
    teardown_canvas()

  it "should create canvas", ->
    expect(re.$new("canvas"), "htmlcanvaselement").to.exist

  it "should re.is work", ->
    expect(re.expect({})).to.be.ok.to.exist
    expect(re.expect(1)).to.be.ok.to.exist
    expect(re.expect(1, "Number")).to.be.ok.to.exist
    expect(re.expect(null)).to.not.be.ok.to.exist
    expect(re.expect(`undefined`)).to.not.be.ok.to.exist
    expect(re.expect(null, "array")).to.not.be.ok.to.exist
    expect(re.expect(1, "string")).to.not.be.ok.to.exist
    expect(re.expect("", "number")).to.not.be.ok.to.exist
    expect(re.expect("", "Number")).to.not.be.ok.to.exist
    expect(re.expect("", "string")).to.be.ok.to.exist
    expect(re.expect(1, "number")).to.be.ok.to.exist
    expect(re.expect([], "array")).to.be.ok.to.exist
    expect(re.expect(/sd/, "regexp")).to.be.ok.to.exist

    #doesn't work in ie8
    #expect(re.expect(re.$new('canvas'), 'htmlcanvaselement')).to.be.ok.to.exist
    k = {}
    expect(re.expect(k, "object")).to.be.ok.to.exist
    f = ->

    expect(re.expect(f, "function")).to.be.ok.to.exist



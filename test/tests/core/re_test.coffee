describe "re", ->

  it "should create array", ->
    expect(re([1]).length).to.eql 1

  it "should get element by id", ->
    expect(re.$("#mocha")).to.exist
    expect(re.$("#mocha")).to.exist
    expect(re.$("#mocha")).to.exist

  it "should find array by tag", ->
    array = re().tag("10")
    expect(array.tag()).to.eql re("#10").tag()

  it "should get element by tag", ->
    expect(re.$("body")).to.exist
    expect(re.$("body")).to.exist
    expect(re.$("body")).to.exist

  it "create canvas", ->
    expect(re.$new("canvas"), "htmlcanvaselement").to.exist

  it "re.is work", ->
    expect(re.is({})).to.be.ok
    expect(re.is(1)).to.be.ok
    expect(re.is(1, "Number")).to.be.ok
    expect(re.is(null)).to.not.be.ok
    expect(re.is(`undefined`)).to.not.be.ok
    expect(re.is(null, "array")).to.not.be.ok
    expect(re.is(1, "string")).to.not.be.ok
    expect(re.is("", "number")).to.not.be.ok
    expect(re.is("", "Number")).to.not.be.ok
    expect(re.is("", "string")).to.be.ok
    expect(re.is(1, "number")).to.be.ok
    expect(re.is([], "array")).to.be.ok
    expect(re.is(/sd/, "regexp")).to.be.ok

    #doesn't work in ie8
    #expect(re.expect(re.$new('canvas'), 'htmlcanvaselement')).to.be.ok.to.exist
    k = {}
    expect(re.is(k, "object")).to.be.ok
    f = ->

    expect(re.is(f, "function")).to.be.ok



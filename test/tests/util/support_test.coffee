describe "support", ->
  it "find first support sound", ->
    expect(re.support("aac", "ogg", "mp3", "wav")).to.be.a "string"

  it "should support canvas", ->
    expect(re.support("canvas")).to.be.ok

  it "should support both", ->
    expect(re.support("text canvas")).to.be.ok


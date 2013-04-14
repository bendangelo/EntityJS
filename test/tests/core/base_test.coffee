describe "core/base", ->
  c = undefined
  beforeEach ->
    c = new re.base()

  it "should tag class", ->
    c.tag "bob"
    expect(re("#bob").tag()).to.eql c.tag()



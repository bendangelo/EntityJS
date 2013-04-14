describe "system", ->
  s = undefined
  re.s("base").defines blah: 99
  re.s("render2").requires("base").defines process: (e) ->
    e.ok = 10

  it "should process all entities", ->
    s = re.s("render2").create([{}, {}])
    s.processAll()
    expect(s.entities[0].ok).to.eql 10
    expect(s.entities[1].ok).to.eql 10

    #has class methods
    expect(s.get("blah")).to.eql 99



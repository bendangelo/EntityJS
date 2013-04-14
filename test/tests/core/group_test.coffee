describe "group", ->
  s = undefined
  re.g("base").defines blah: 99
  re.g("monsters").requires("base").defines findAt: (x, y) ->
    @find (e) ->
      e.x is x and e.y is y


  it "should create new group", ->
    val = 10
    re.g("monsters").create [val]
    expect(re("monsters").first(), val).to.be.ok
    mon = re.e("monsters").attr(
      x: 10
      y: 3
    )
    expect(re("monsters").findAt(10, 3).x).toEqual mon.x

    #has props
    expect(re("monsters").get("blah")).toEqual 99



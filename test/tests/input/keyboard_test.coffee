describe "keyboard", ->
  e = undefined
  keyboard = undefined
  beforeEach ->

    #create system
    keyboard = re.s("keyboard").create()
    e = re.e("keyboard")

  it "keydown listen", ->
    type = "keydown"
    called = undefined
    called2 = undefined
    e.on type, (key, e) ->
      expect(e).to.exist
      called = key

    e.on type + ":r", (key, e) ->
      expect(e).to.exist
      called2 = key


    #manually call
    keyboard.event #d
      type: type
      keyCode: 68

    expect(called).to.eql "d"
    expect(called2).to.eql undefined

    keyboard.event #r
      type: type
      keyCode: 82

    expect(called).to.eql "r"
    expect(called2).to.eql "r"

  it "keyup listen", ->
    type = "keyup"
    called = undefined
    called2 = undefined
    e.on type, (key, e) ->
      expect(e).to.exist
      called = key

    e.on type + ":r", (key, e) ->
      expect(e).to.exist
      called2 = key


    #manually call
    keyboard.event #d
      type: type
      keyCode: 68

    expect(called).to.eql "d"
    expect(called2).to.eql undefined
    keyboard.event #r
      type: type
      keyCode: 82

    expect(called).to.eql "r"
    expect(called2).to.eql "r"



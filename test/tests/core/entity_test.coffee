describe "entity", ->
  e = undefined
  c = undefined
  re.g("blah").create()
  beforeEach ->
    e = re.e()
    c = re.c(f("name"))

  it "should add / remove from group", ->
    e = re.e("blah")
    expect(re._g["blah"].contains(e)).to.be.ok()
    e.dispose()
    expect(not re._g["blah"].contains(e)).to.be.ok()

  it "should get", ->
    e.blah = 10
    e.bla = ->
      @blah

    expect(e.get("blah")).to.eql 10
    expect(e.get("bla")).to.eql 10

  it "should trigger once", ->
    count = 0
    e.once "blah", ->
      count++

    e.trigger "blah"
    e.trigger "blah"
    e.trigger "blah"
    expect(count).to.eql 1

  it "should define accessors", ->
    re.c("totally").accessors "posX posY"
    e.comp "totally"
    val = 4
    e.posX = val
    expect(e.posX).to.eql val
    expect(e._posX).to.eql val
    e.posY = val
    expect(e.posY).to.eql val
    expect(e._posY).to.eql val

  it "comp", ->
    e.comp "qwdqwd wer"
    expect(e.has("qwdqwd wer")).to.be.ok()
    e.comp ["yep45", "ok12"]
    expect(e.has("yep45 ok12")).to.be.ok()

  it "should add events from comp", ->
    func = ->

    c.events "mousedown", func
    e.comp c.name
    expect(e.mousedown).to.exist

  it "should define properly", ->
    re.c("blah1").defines f: ->
      false

    re.c("sdfdff").requires("blah1").defines f: ->
      true

    expect(re.e("sdfdff").f()).to.be.ok()

  it "should call init", ->
    called = false
    c.init ->
      called = true

    e.comp c.name
    expect(called).to.be.ok()

  it "requires", ->
    c.requires "bob"
    c.requires ["bob2"]
    e.comp c.name
    expect(e.has("bob bob2")).to.be.ok()

  it "comp defaults", ->
    c.defaults
      ok: 10
      b: 99

    c.defaults "yep", "y"
    e.ok = "same"
    e.comp c.name
    expect(e.ok).to.eql "same"
    expect(e.b).to.eql 99
    expect(e.yep).to.eql "y"

  it "comp defines", ->
    c.defines
      ok: 10
      b: 99

    c.defines "yep", "y"
    e.comp c.name
    expect(e.ok).to.eql 10
    expect(e.b).to.eql 99
    expect(e.yep).to.eql "y"

  it "removeComp", ->
    called = false
    c.dispose ->
      called = true

    called2 = false
    en = null
    e.comp c.name
    e.removeComp ["blah", c.name]
    expect(e.has(c.name)).to.not.be.ok()
    expect(called).to.be.ok()

  it "comps", ->
    e.comp "ok bob"
    expect(e.comps()).to.eql ["ok", "bob"]

  it "clone", ->
    e.comp "yep bob"
    expect(e.clone().comps()).to.eql e.comps()

  it "should clone empty entity", ->
    expect(re.e().clone()).to.exist

  it "super", ->
    c.defines("d", (v) ->
      v
    ).defaults "y", (v) ->
      v

    expect(e._super(c.name, "d", 100)).to.eql 100
    expect(e._super(c.name, "y", "bob")).to.eql "bob"
    e.comp c.name
    expect(e._super("", "has", c.name)).to.be.ok()

  it "attr overwrite method", ->
    called = false
    e.set blah: ->

    e.set blah: ->
      called = true

    e.blah()
    expect(called).to.be.ok()

  it "should dispose of all components properly", ->
    called = false
    called2 = false
    e.comp "image iso"
    re.c("draw").dispose ->
      called2 = true

    e.dispose()
    expect(called2).to.be.ok()

  it "should throw error on undefined parent method", ->
    called = false
    try
      e._super "image", "asdfsdf"
    catch e
      called = true
    expect(called).to.be.ok()

  it "has", ->
    e.comp "tst"
    expect(e.has("tst")).to.be.ok()

  it "bindings", ->
    called = false
    va = undefined
    va2 = undefined
    e.on "values", (v, v2) ->
      called = true
      va = v
      va2 = v2
      false

    expect(e.trigger("values", 10, 55)).to.eql e
    expect(called).to.be.ok()
    expect(va).to.eql 10
    expect(va2).to.eql 55
    func = ->

    e.on
      yep: ->

      ok: func

    e.off "yep"
    e.off ok: func
    
    #remove all
    e.on "key", ->

    expect(e.off()).to.exist
    expect(e._re_listens).to.eql {}

  it "should change context of event", ->
    obj = {}
    e.on
      blah: ->
        expect(obj).to.eql this
    , obj
    e.on "blah2", (->
      expect(obj).to.eql this
    ), obj
    e.trigger("blah2").trigger "blah"

  it "should add multiple events", ->
    called = false
    called2 = false
    e.on
      call: ->
        called = true

      call2: ->
        called2 = true

    e.trigger "call"
    e.trigger "call2"
    expect(called).to.be.ok()
    expect(called2).to.be.ok()

  it "attr", ->
    
    #add attributes
    e.set
      x: 10
      y: "sdd"
      func: ->

    expect(e.x).to.eql 10
    expect(e.y).to.eql "sdd"
    expect(e.func, "function").to.exist
    e.set "ok", 87
    expect(e.ok).to.eql 87
    
    #run setter methods
    e.posX = (value1) ->
      @val = value1

    e.set "posX", 154
    expect(e.val).to.eql 154
    
    #multiple
    e.size = (width, height) ->
      @width = width
      @height = height

    e.set size: [45, 40]
    expect(e.width).to.eql 45
    expect(e.height).to.eql 40

  it "def", ->
    e.first = 99
    e.def "first", 10
    expect(e.first).to.eql 99
    e.def
      ok: 10
      yep: 99

    expect(e.ok).to.eql 10
    expect(e.yep).to.eql 99

  it "dispose", ->
    called = false
    co = undefined
    
    #listen for dispose call on component
    c.dispose (comp) ->
      called = true
      co = comp

    
    #add comp to testing entity
    e.comp c.name
    called3 = false
    
    #listen for dispose trigger on entity
    e.on "dispose", ->
      called3 = true

    
    #call it
    e.dispose()
    
    #asserts
    expect(called).to.be.ok()
    expect(co).to.eql c
    expect(called3).to.be.ok()



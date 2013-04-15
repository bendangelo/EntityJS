describe "comp", ->
  k = undefined
  i = 0
  beforeEach ->
    i++
    k = re.c("stat" + i)

  it "should create statics", ->
    k.statics(type: 10).statics "yep", "yep"
    expect(re[k.name].type).to.eql 10
    expect(re[k.name].yep).to.eql "yep"

  it "should add accessor", ->
    k.accessors "a b"
    expect(k._re_getters.a).to.be.ok
    expect(k._re_getters.b).to.be.ok
    expect(k._re_setters.a).to.be.ok
    expect(k._re_setters.b).to.be.ok

  it "should create comp in new style", ->
    re.c "jump12",
      requires: "sdf"
      init: ->

      defines:
        ok: 10

      defaults:
        k: 10

      factory: ->

    expect(re.c("jump12")._re_requires).to.eql ["sdf"]
    expect(re.c("jump12")._re_defines).to.eql ok: 10
    expect(re.c("jump12")._re_defaults).to.eql k: 10

  it "should use default factory", ->
    a = 10
    expect(re[k.name]("blah", a).blah).to.eql a

  it "should create a factory", ->
    val = 10
    k.factory (ref) ->
      @ref = ref

    expect(re[k.name](val).ref).to.eql val

  it "should overwrite method", ->
    k.method ->
      expect(this).to.eql re[k.name]

    re[k.name]()

  it "should add events", ->
    k.events "mouseup", ->

    k.events mousedown: ->

    expect(k._re_events.mouseup).to.exist
    expect(k._re_events.mousedown).to.exist

  it "should requires", ->
    k.requires "test test2"
    expect(k._re_requires).to.include 'test'

    expect(k._re_requires).to.include "test2"
    k.requires ["test3"]
    expect(k._re_requires).to.include "test3"

  it "should alias", ->
    k.statics("bob", "bob").alias "bob"
    expect(re.c("bob") is k).to.be.ok

  it "should defaults", ->
    k.defaults(
      ok: 1
      ok2: 2
    ).defaults "ok3", 3
    expect(k._re_defaults["ok3"] is 3).to.be.ok
    expect(k._re_defaults["ok2"] is 2).to.be.ok
    expect(k._re_defaults["ok"] is 1).to.be.ok

  it "should namespaces", ->
    k = re.c("stat").namespaces(
      ok: 1
      ok2: 2
    ).namespaces("ok3", 3)
    expect(k._re_defines["stat_ok3"] is 3).to.be.ok
    expect(k._re_defines["stat_ok2"] is 2).to.be.ok
    expect(k._re_defines["stat_ok"] is 1).to.be.ok

  it "should defines", ->
    k.defines(
      b: 1
      b2: 2
    ).defines "b3", 3
    expect(k._re_defines["b3"] is 3).to.be.ok
    expect(k._re_defines["b2"] is 2).to.be.ok
    expect(k._re_defines["b"] is 1).to.be.ok

  it "should init", ->
    fun = ->

    k.init fun
    expect(k._re_init is fun).to.be.ok

  it "should dispose", ->
    fun = ->

    k.dispose fun
    expect(k._re_dispose is fun).to.be.ok

  it "should run", ->
    k.run ->
      expect(this is k).to.be.ok




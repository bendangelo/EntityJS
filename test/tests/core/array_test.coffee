describe "core/array", ->
  query = undefined
  beforeEach ->
    query = re()

  it "should find by tag", ->
    re._t["id"] = 10
    expect(re("#id")).to.eql 10

  it "should find by group", ->
    re._g["group"]

  it "should be right length", ->
    expect(re([2]).length).to.eql 1

  it "should query by value", ->
    v = re.e().team = num: 1


  #todo in the future?
  #a bit complicated
  #expect(re('team.num=1').length).to.eql( 1)
  it "should reject elements", ->
    k = re([1, 2, 3])
    that = this
    expect k.reject((e, i, l) ->
      expect(i).to.exist
      expect(l).to.exist
      expect(that).to.eql this
      e is 1 or e is 3
    , this)
    expect(k[0]).to.eql 2

  it "should return empty query", ->
    expect(re().length).to.eql 0


  #
  #  it('should select *', function(){
  #
  #      expect(re('*')).to.be.ok;
  #  });
  #
  it "should filter", ->
    query = re([1, 2, 3, 4])
    expect(query.filter((v) ->
      v is 1
    ).length).to.eql 1

  it "should create query from array", ->
    a = [1, 2, 3]
    q = re(a)
    expect(q[0]).to.eql a[0]
    expect(q[1]).to.eql a[1]
    expect(q[2]).to.eql a[2]

  it "invoke", ->
    query = re([re.e("ok")])
    expect(query.invoke("comp", "b").first().comps()).to.eql ["ok", "b"]

  it "each", ->
    i = 0
    expect re([re.e("dd")]).each((e, c, l) ->
      expect(i++).to.eql c
      expect(l).to.exist
    )

  it "sample", ->
    expect(re([1, 2, 3]).sample()).to.exist

  it "pluck", ->
    k = re([
      f: 0
      y: 0
    ]).pluck("f y")
    expect(k[0].f).to.eql 0
    expect(k[0].y).to.eql 0

  it "should last", ->
    b = re.e()
    query.push b
    expect(query.last()).to.eql b

  it "should first", ->
    b = re.e()
    query.unshift b
    expect(query.first()).to.eql b

  it "should findall", ->
    query = re([1, 5, 4, 5])
    that = this
    total = query.findAll((v) ->
      expect(that).to.eql this
      v is 5
    , that).length

    expect(total).to.eql 2

  it "addAfter", ->
    b = re.e()
    query.push 10, 6
    query.addAfter 10, b
    expect(query.indexOf(b)).to.eql 1

  it "addBefore", ->
    b = re.e()
    query.push 10, 6
    query.addBefore 6, b
    expect(query.indexOf(b)).to.eql 1

  it "swap", ->
    query.push 10, 6
    query.swap 10, 6
    expect(query[0]).to.eql 6
    expect(query[1]).to.eql 10

  it "should remove", ->
    q = re()
    e = re.e()
    q.push 10
    q.push e

    #add in
    n = re.e()
    q.remove e
    expect(q.contains(e)).to.not.be.ok

  it "should removeAt", ->
    query = re([1, 2, 3, 4])

    expect(query.removeAt(0, 2)).to.be.ok
    expect(query.length).to.eql 1

  it "should clear", ->
    query = re([1, 2, 3, 4])
    query.clear()
    expect(query.length).to.eql 0

  it "should count", ->
    query = re([1, 1, 1, 3, 4])
    that = this
    total = query.count((v) ->
      expect(that).to.eql this
      v is 1
    , that)

    expect(total).to.eql 3

  it "contains", ->
    en = re.e()
    query = re()
    expect(query.contains(en)).to.not.be.ok
    query.push en
    expect(query.contains(en)).to.be.ok

  it "min", ->
    query = re()
    query.push 0
    query.push 10
    query.push 2
    query.push 5
    min = query.min((e, i, l) ->
      expect(this).to.eql "ok"
      expect(i).to.exist
      expect(l).to.exist
      e
    , "ok")
    expect(min).to.eql 0

  it "max", ->
    query = re()
    query.push 0
    query.push 10
    query.push 2
    query.push 5
    highest = query.max((e, i, l) ->
      expect(this).to.eql "ok"
      expect(i).to.exist
      expect(l).to.exist
      e
    , "ok")
    expect(highest).to.eql 10

  it "find", ->
    e = re()
    e.push 1
    e.push 10

    #find index with 10
    result = e.find((t) ->
      expect(e).to.eql this
      t is 10
    )
    expect(result).to.eql 10

  it "isEmpty", ->
    expect(re().isEmpty()).to.be.ok

  it "every", ->

    #check if all entities in query have value blah
    e = re()
    e.push re.e()
    e.push re.e().set("blah", true)
    every = e.every((e) ->
      e.blah
    )
    expect(every).to.not.be.ok
    e.invoke "set", "blah", true

    #should now all have blah
    every = e.every((e) ->
      e.blah
    )
    expect(every).to.be.ok

    #length zero..
    every = re().every(->
      false
    )
    expect(every).to.be.ok



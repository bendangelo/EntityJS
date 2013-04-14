describe "automap", ->
  e = undefined
  beforeEach ->
    e = re.e("automap")

  it "automap", ->
    expect(e.automap(0, 0, 10)).to.exist
    expect(e.automap(0, 0)).to.eql 10
    expect(e.lenX).to.eql 1
    expect(e.lenY).to.eql 1

  it "within", ->
    expect(e.within(-1, 0)).to.not.be.ok()
    expect(e.within(10, 2)).to.not.be.ok()
    e.automap 10, 2, 0
    expect(e.within(10, 2)).to.be.ok()
    expect(e.within(10 / 0, 10 / 0)).to.not.be.ok()

  it "should copy map by value", ->
    level = [[1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1]]
    expect(e.automap(level, true)).to.exist
    expect(e.lenX).to.eql level[0].length
    expect(e.lenY).to.eql level.length
    expect(e.automap(0, 0)).to.eql 1
    expect(e.automap(0, 1)).to.eql 6

  it "should copy map by ref", ->
    level = [[1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1]]
    expect(e.automap(level)).to.exist
    expect(e.lenX).to.eql level[0].length
    expect(e.lenY).to.eql level.length
    expect(e.automap(0, 0)).to.eql 1
    expect(e.automap(0, 1)).to.eql 6
    expect(e._automap).to.eql level

  it "should contain right length", ->
    m = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0], [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 2, 2, 5, 0, 0, 0, 0, 7, 0, 0, 0, 6, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
    y = 0

    while y < m.length
      x = 0

      while x < m[0].length
        v = m[y][x]
        e.automap x, y, 1  if v
        x++
      y++
    expect(e.lenX).to.eql m[0].length
    expect(e.lenY).to.eql m.length
    expect(e._automap.length).to.eql m.length
    expect(e._automap[0].length).to.eql m[0].length



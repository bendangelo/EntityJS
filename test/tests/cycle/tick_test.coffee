describe "ticker", ->
  it "tick", ->
    t = re.e("tick")
    setTimeout 100

    expect(t.tick().toString()).to.match /[0-9]*/

    setTimeout 80

    expect(t.tick().toString()).to.match /[0-9]*/




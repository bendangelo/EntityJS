describe "ticker", ->
  it "tick", ->
    t = re.e("tick")
    waits 100
    runs ->
      expect(t.tick().toString()).to.match /[0-9]*/

    waits 80
    runs ->
      expect(t.tick().toString()).to.match /[0-9]*/




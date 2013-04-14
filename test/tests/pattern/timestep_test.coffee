describe "timestep", ->
  e = undefined
  beforeEach ->
    e = re.e("timestep")

  it "should call twice", ->
    e.stepSize = 100
    calls = 0
    e.timestep 200, ->
      calls++

    expect(calls).to.eql 2



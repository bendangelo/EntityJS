describe "cycle/wait", ->
  wait = undefined
  beforeEach ->
    wait = re.e("wait")

  it "should wait", ->
    called = false
    runs ->
      expect wait.wait(->
        called = true
      , 100)

    waits 101
    runs ->
      expect(called).to.be.ok




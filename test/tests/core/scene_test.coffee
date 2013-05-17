describe "core/scene", ->
    scene = null

    beforeEach ->
        scene = new en.Scene()

    it "should enter", ->
        scene.enter()

    it "should exit", ->
        scene.exit()
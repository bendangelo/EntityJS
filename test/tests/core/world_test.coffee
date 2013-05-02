describe "core/world", ->
    world = null
    canvas = document.createElement "canvas"
    scene = null

    beforeEach ->
        world = new en.World();
        scene = new en.Scene()
        world.sceneManager.add("home", scene);
        world.sceneManager.enter("home");

    it "should setcanvas", ->

        world.setCanvas(canvas)

        expect(world.canvas).to.eql canvas
        expect(world.context).to.exist

    it "should start / stop", ->

        world.start()
        expect(world.running).to.be.ok()
        world.stop()
        expect(world.running).to.not.be.ok()

    it "should stop", ->
        world.stop()
        expect(world.running).to.not.be.ok

    it "should run", ->
        updateSpy = sinon.stub(scene, "update")
        drawSpy = sinon.stub(scene, "draw")

        # force update to run
        sinon.stub(en.Timer, "tick").returns(world.stepSize);

        world.run()

        expect(updateSpy).to.be.called
        expect(drawSpy).to.be.called
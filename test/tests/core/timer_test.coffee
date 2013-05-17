describe "core/timer", ->

    it "should return tick", ->
        expect(en.Timer.tick()).to.be.above 0
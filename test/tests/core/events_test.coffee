describe "core/events", ->
    event = null

    beforeEach ->
       event = new en.Events()

    it "should trigger event", ->

        call = sinon.spy()
        context = 10;

        event.on("trigger", call, context);

        event.trigger("trigger", 10);

        expect(call).to.be.called
        expect(call).to.be.calledWith 10
        expect(event._events.trigger).to.exist

        event.off()

        expect(event._events.trigger).to.not.exist

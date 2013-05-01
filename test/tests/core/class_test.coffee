describe "core/class", ->
    Cat = cat = null

    beforeEach ->
       Cat = en.Class.extend
            name: "cat"

       cat = new Cat()

    it "should create new class", ->

        expect(cat.name).to.eql Cat.prototype.name
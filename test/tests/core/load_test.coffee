describe "load", ->
  it "load", ->
    
    #add images
    re.load.path = "__spec__/"
    img = "/__spec__/helpers/accept.png"
    sfx = "http://localhost:8888/__spec__/helpers/alligator.mp3"
    sfx2 = "helpers/alligator.ogg"
    called = false
    prog = false
    re.load([img, sfx, sfx2]).complete((assets) ->
      called = true
      expect(assets, "array").to.exist
      expect(prog).to.be.ok()
      expect(re.c("accept.png").image).to.exist
      expect(re.c("accept.img").image).to.exist
      expect(re.c("alligator.sfx").sound).to.exist
      b = re.e("accept.png")
      expect(b._image).to.exist
      expect(b.sizeX).to.eql b._image.width
      expect(b.sizeY).to.eql b._image.height
      expect(b.bisect).to.eql b._image.width
      b = re.e("alligator.sfx")
      expect(b._sound).to.exist
    ).progress((current, total, name) ->
      prog = true
      expect(name, "string").to.exist
      expect(current, "number").to.exist
      expect(total, "number").to.exist
    ).error ->
      expect(false).to.be.ok()

    waits 1000
    runs ->
      expect(called).to.be.ok()


  it "should call complete on empty load", ->
    called = false
    re.load([]).complete ->
      called = true

    expect(called).to.be.ok()

  it "should throw error on not found image", ->
    called = false
    re.load("sdfsdf.png").error (e) ->
      called = true

    waits 200
    runs ->
      expect(called).to.be.ok()




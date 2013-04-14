describe "image", ->
  i = undefined
  image_comp = undefined
  beforeEach ->
    image_comp = f("image")
    i = re.e(["image", image_comp.name])

  it "image", ->
    expect(i.image()).to.exist
    
    #set
    expect(i.image(image_comp.image)).to.exist
    expect(i.image()).to.eql image_comp.image

  it "visible", ->
    expect(i.visible()).to.be.ok()
    i._image = null
    expect(i.visible()).to.not.be.ok()

  it "draw", ->
    expect(i.draw(re.loop().context)).to.exist



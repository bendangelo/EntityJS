sandbox = null

# Global after/before each.
beforeEach ->
    sandbox = sinon.sandbox.create();

afterEach ->
    # release sinon stubs
    sandbox.restore();
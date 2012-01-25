
def setup_mygame
  root = File.dirname(__FILE__)+'/../..'
  Dir.chdir(root+'/mygame')
end

def teardown_mygame
  Dir.chdir('..')
end

def setup_mygame
  root = File.dirname(__FILE__)+'/../..'
  Dir.chdir(root+'/mygame')
  
  Entityjs::Dirc.game?
end

def teardown_mygame
  Dir.chdir('..')
end
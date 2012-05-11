
def setup_mygame
  root = File.dirname(__FILE__)+'/../..'
  
  if !File.directory? root+'/mygame'
    Dir.mkdir(root+'/mygame')
  end
  
  Dir.chdir(root+'/mygame')
  
  Entityjs::Dirc.game?
end

def teardown_mygame
  Dir.chdir('..')
end
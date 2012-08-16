
def setup_mygame

  root = File.dirname(__FILE__)+'/../..'
  
  if !File.directory? root+'/mygame'
    Dir.mkdir(root+'/mygame')
  end

  if !File.directory? root+'/mygame/scripts'
  	Dir.mkdir(root+'/mygame/scripts')
  end

  Dir.chdir(root+'/mygame')
  
  if !Entityjs::Dirc.game?
  	raise "Error game folder not found"
  end

end

def teardown_mygame
  Dir.chdir('..') if Entityjs::Dirc.game?
end
module Entityjs
  
  class Html
    
    def self.generate(name='')
      if !Dirc.game?
        return 2
      end
      
      puts "Creating HTML files"

      play = 'play.html'
      test = 'test.html'

      if File.exists?(play) || File.exists?(test)
        return 3
      end
      
      FileUtils.cp Entityjs::public_path+'/'+play, play
      FileUtils.cp Entityjs::public_path+'/'+test, test

      
      puts "Created #{play}"
      puts "Created #{test}"
      
      return 0
    end
    
  end
  
end
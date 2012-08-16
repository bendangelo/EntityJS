module Entityjs
  
  class Min
    
    def self.generate(args=nil)

    	if !Dirc.game?
    		return 2
    	end

    	Config.instance.reload

      #make build dir if not found
      if !File.directory?(Config.instance.build_path)
        Dir.mkdir(Config.instance.build_path)
      end

      final_name = Config.instance.build_name+'.js'
      path = Config.instance.build_path+'/'+final_name

      puts "Compiling code"

      out = Build.compile_game

      puts "Minifying"

      out = Build.minify(out)

      puts "Writing to #{path}"

      File.open(path, 'w') do |f|
      	f.write(out)
      end

      puts "Done"

      return 0
    end

  end

end
#The Page class renders html pages for the server
module Entityjs
  
  class Page
    
    def self.processor_ext
      return '.js'
    end
    
    def self.render_play
      self.set_vars("play.html")
    end
    
    def self.render_tests
      self.set_vars('tests.html', true)
    end
    
    def self.render_entityjs_src(path)
      path = Entityjs::root+'/src/'+path
      
      return IO.read(path)
    end
    
    def self.render_test(path)
      file = path.sub(/#{self.processor_ext}$/i, '');
      
      return Compile.test_to_js(file)
    end
    
    def self.render_script(path)
      file = path.sub(/#{self.processor_ext}$/i, '');
      return Compile.script_to_js(file)
    end
    
    def self.render_eunit(path)
      IO.read(Entityjs::root+"/public/qunit/#{path}")
    end
    
    protected
    #defines varaibles on the template htmls for view on webpage
    def self.set_vars(path, tests=false)
      #search locally first
      local = Dirc.game_root+'/'+path
      if File.file? local
        contents = IO.read(local);
      else
        contents = IO.read("#{Entityjs::root}/public/#{path}")
      end
      
      #reload config for changes
      Config.instance.reload
      
      #set width, height and canvas id
      contents = contents.sub("$WIDTH", Config.instance.width.to_s)
      contents = contents.sub("$HEIGHT", Config.instance.height.to_s)
      contents = contents.sub("$CANVAS_ID", Config.instance.canvas_id)
      
      #set javascript srcs
      contents.sub("$JS", self.compile_js_html(tests))
    end
    
    #compiles html js tags for render on webpage
    def self.compile_js_html(tests=false)
      js = %Q(
      <script type=\"text/javascript\">
      window.addEventListener\(\"load\", function(){
          #{Build.js_config}
          re.version = \"#{VERSION}\";
        }\);
      </script>
)
      ent = Dirc.find_entity_src_url(Config.instance.entity_ignore)
      srcs = Dirc.find_scripts_url(Config.instance.scripts_ignore, Config.instance.scripts_order)
      
      if tests
        tests_src = Dirc.find_tests_url(Config.instance.tests_ignore)
        ent += Dirc.find_eunit_src_url
      else
        tests_src = []
      end
      
      merg = ent | srcs | tests_src
      
      last = ''
      
      merg.each do |s|
        
        #output a divider for each js root
        first_folder = s.split('/').shift
        if last != first_folder
          js += "\n\n\t<!-- #{first_folder} -->\n"
          last = first_folder
        end
        
        #add processor extension to non-js files so the server processes it into js
        if s.match(/\.js$/).nil?
          s += self.processor_ext
        end
        
        js += "\t<script src=\"#{s}\" type=\"text/javascript\"></script>\n"
      end
      
      return js
    end
    
  end
  
end
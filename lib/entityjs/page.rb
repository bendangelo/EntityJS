#The Page class renders html pages for the server
module Entityjs
  
  class Page
    
    def self.processor_ext
      return '.js'
    end
    
    def self.render_play_page(ops={})
      self.set_vars("play.html", ops)
    end
    
    def self.render_favicon
      path = Entityjs::public_path+'/favicon.ico'
      
      return IO.read(path)
    end

    def self.render_test_page
      self.set_vars('test.html', :tests=>true)
    end
    
    def self.render_entityjs_src(path)
      path = Entityjs::root+'/src/'+path
      
      return IO.read(path)
    end
    
    def self.render_test(path)
      file = path.sub(/#{self.processor_ext}$/i, '')
      
      return Config.preprocess(Compile.test_to_js(file))
    end
    
    def self.render_script(path)
      file = path.sub(/#{self.processor_ext}$/i, '')
      return Config.preprocess(Compile.script_to_js(file))
    end
    
    def self.render_eunit(path)
      IO.read(Entityjs::root+"/public/qunit/#{path}")
    end

    protected
    def self.set_vars(path, ops={})
      #search locally first
      if Dirc::exists?(path)
        contents = IO.read(Dirc.game_root+'/'+path);
      else
        contents = IO.read("#{Entityjs::public_path}/#{path}")
      end

      contents = Config.preprocess(contents)

      #set javascript srcs
      if !ops[:js]
        js = self.compile_js_html(ops[:tests])
      else
        js = ops[:js]
      end

      contents = contents.sub("RE_JS", js)

      #add css
      if !ops[:css]
        css = self.compile_css_html
      else
        css = ops[:css]
      end

      contents = contents.sub("RE_CSS", css)
    end

    def self.compile_css_html
      styles_url = Dirc.find_styles_url(Config.instance.styles_ignore)

      css = ''

      styles_url.each do |s|

        css += "\t<link rel=\"stylesheet\" href=\"#{s}\" type=\"text/css\"/>\n"
      end

      return css
    end

    #compiles html js tags for render on webpage
    def self.compile_js_html(tests=false)
      tests ||= false

      js = %Q(
      <script type=\"text/javascript\">
      window.addEventListener\(\"load\", function(){
          #{Build.js_config}
          re.version = \"#{VERSION}\";
        }\);
      </script>
)
      ent_ignore = Config.instance.entity_ignore
      srcs_ignore = Config.instance.scripts_ignore

      if tests
        ent_ignore += Config.instance.tests_entity_ignore
        srcs_ignore += Config.instance.tests_scripts_ignore
      end

      ent = Dirc.find_entity_src_url(ent_ignore)
      srcs = Dirc.find_scripts_url(srcs_ignore, Config.instance.scripts_order)
      
      if tests
        tests_src = Dirc.find_eunit_src_url

        tests_src += Dirc.find_tests_url(Config.instance.tests_ignore)
      else
        tests_src = []
      end
      
      merg = ent | srcs | tests_src
      
      last = ''
      
      merg.each do |s|
        
        #output a divider for each js root
        folders = s.split('/')

        #remove file at the end
        folders.pop
        folders.join('/')

        first_folder = folders
        if last != first_folder
          if first_folder.is_a? Array
            line = first_folder.join('/')
          else
            line = first_folder
          end
          
          js += "\n\n\t<!-- #{line} -->\n"
          last = first_folder
        end
        
        #add processor extension to non-js files so the server processes it into js
        if !s.match(/^scripts\//).nil?
          #add processor to all files, because preprocessor needs it to activate
          s += self.processor_ext
        end
        
        js += "\t<script src=\"#{s}\" type=\"text/javascript\"></script>\n"
      end
      
      return js
    end
    
  end
  
end
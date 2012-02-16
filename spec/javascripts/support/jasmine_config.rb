module Jasmine
  class Config

    # Add your overrides or custom config code here
	def start_server(port = 8888) 

       # Jasmine will pass in 8888, but you can change it to whatever you  

       port = 2999

       handler = Rack::Handler.default 

       	handler.run Jasmine.app(self), :Port => port, :AccessLog => [] 
	end
	end
end


# Note - this is necessary for rspec2, which has removed the backtrace
module Jasmine
  class SpecBuilder
    def declare_spec(parent, spec)
      me = self
      example_name = spec["name"]
      @spec_ids << spec["id"]
      backtrace = @example_locations[parent.description + " " + example_name]
      parent.it example_name, {} do
        me.report_spec(spec["id"])
      end
    end
  end
end

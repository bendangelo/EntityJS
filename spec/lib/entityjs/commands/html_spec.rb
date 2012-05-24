require 'spec_helper'

describe 'Html' do

	before(:all) do
		setup_mygame
	end

	after(:all) do
		teardown_mygame
	end

	it 'should generate html files' do
		#remove files before hand
		if File.exists?("play.html")
			FileUtils.rm("play.html")
		end

		if File.exists?("tests.html")
			FileUtils.rm("tests.html")
		end
		Entityjs::Html.generate().should == 0
		File.exists?("play.html").should == true
		File.exists?("tests.html").should == true
	end

end
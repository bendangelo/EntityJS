def factory(type)
    
    case type
        when :assets
        
            files = []
    
            files.push Entityjs::Config.instance.assets_folder+'/levels/bob.json'
            files.push Entityjs::Config.instance.assets_folder+'/levels/bob.xml'
            files.push Entityjs::Config.instance.images_folder+'/yep.png'
            files.push Entityjs::Config.instance.images_folder+'/bdd.png'
            files.push Entityjs::Config.instance.sounds_folder+'/bdd.mp3'
            return files
        
        
    end
    
    return nil
end
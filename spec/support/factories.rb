def factory(type)
    
    case type
        when :assets
        
            files = []
            #files.push 'assets/levels/bob.xml'
            files.push 'assets/images/yep.png'
            files.push 'assets/images/bdd.png'
            files.push 'assets/sounds/bdd.mp3'
            return files
        
        
    end
    
    return nil
end
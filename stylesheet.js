var arrManagers = {}; //namespace

arrManagers.cssManager = (function(){ 
    
    //Private members
    var doc = document;
    var setAttributes = function(element, attributes){
        for(attribute in attributes){
            element[attribute] = attributes[attribute];
        }
    }
        
    return{
        //Public members
        addStyleSheet: function(id, url){
            var newStyleSheet = doc.createElement("link");
            setAttributes(newStyleSheet, {
                rel : "stylesheet",
                type : "text/css",
                id : id,
                href: url
            });
            doc.getElementsByTagName("head")[0].appendChild(newStyleSheet);
        },

        removeStyleSheet: function(id){
            var currentStyleSheet = doc.getElementById(id);
            if(currentStyleSheet){
                currentStyleSheet.parentNode.removeChild(currentStyleSheet);
            }
        },
            
        swapStyleSheet: function(id, url){
            this.removeStyleSheet(id);
            this.addStyleSheet(id, url);
        }
    }
})();

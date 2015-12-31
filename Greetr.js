;(function (global, $) {
    
    // 'new' an object
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    };
    
    // hidden within the scope of the IIFE and never directlu
    var supportedLangs = ['en', 'es'];
    
    // informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };
    
    // formal greetings
    var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'  
    };
    
    // logger messages
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion'
    };
    
    Greetr.prototype = {
        
        // 'this' refers to the calling object at execution time
        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        },
        
        validate: function(){
            // check that is a valid language
            // reference the externally inaccessible 'supportedLangs' within the closure
          if(supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },
        
        // retrieve messages from object by referring to properties using [] syntax
        greeting: function(){
            return greetings[this.language] + '' + this.firstName + '|';
        },
        
        formalGreeting: function() {
        return formalGreetings[this.language] + ' , ' + this.fullName();
    },
      
        // if undifined or null it will be coerced to 'false'
      greet: function(formal) {
          var msg;
          
          // if undefined or null it will be coerced to 'false'
          if (formal) {
              msg = this.formalGreeting();
          }
          else {
              msg = this.greeting();
          }
          
          if (console) {
              console.log(msg);
          }
          
          // 'this' refers to the calling object at execution time
          // makes the method chainable
          return this;
      },
          
          log: function() {
              if (console) {
                  console.log(logMessages[this.language] + ' : ' + this.fullName());
              }
            // make chainable
                        return this;      
          },
                             
        //set the language
                              setlang: function(lang) {
                      this.language = lang;
                      
                                  // Validate
                      this.validate();
                      
                                  // make chainable
                      return this;
                      
                  },
        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'jQuery not loaded';
            }
            
            if (!selector) {
                throw 'missing jQuery selector';
            }
            
            // determine the message
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting(); 
            }
            
            // inject the message in the chosen place in the DOM
            $(selector).html(msg);
            
            // make chainable
            return this;
        }
        
    };
    
    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Greetr.init = function(firstName, lastName, language) {
        
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language =language || 'en';
        
        self.validate();
        
    };
    
    // trick barrowed from jQuery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;
    
    // aatahc our Greetr to the global object, and provide a shorthand '$G' for ease of our poor finger
    global.Greetr = global.G$ = Greetr;
    
}(window, jQuery));
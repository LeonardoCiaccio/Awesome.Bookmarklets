( function(){
        
    // Rintracciamo la lingua altrimenti settiamo italiano default
    var __dLang  = "it-IT",
        __mylang = Bla.Sniff() || __dLang;
    
    // Setta un cookie, su Chrome in locale non lavora bene usa firefox
    function __setCookie( cname, cvalue, exminute ){
        
        if( !cname )return false;  
        
        exminute = exminute || 1;
        
        var d = new Date();
        
        d.setTime( d.getTime() + ( exminute * ( 60 * 1000 ) ) );        
        var expires = "expires=" + d.toUTCString();
        
        document.cookie = cname + "=" + cvalue + "; " + expires;
    
    };
    
    // Segna il cookie per la lingua
    function __signLang( lang ){
    
        // Settiamo il cookie
        __setCookie( "lang", lang );
        
        // Aggiorniamo la pagina
        document.location.reload();
    
    };

    // Carichiamo le lingue che ci occorrono e le librerie
    Bla.Load( [

        "langs/blajs." + __mylang + ".js",
        "libs/jquery.2.1.4.min.js",
        "libs/semantic-ui.2.0.7.min.js"

    ], function(){ // Callback eseguita alla fine del caricamento dei file passati
        
        // Instanzio un traduttore per la lingua in uso
        var i18n = new Bla.i18n( __mylang );
                
        // Estendiamo jQuery con la funzione .Bla();
        $.fn.extend( {

            Bla: function(){

                return this.each( function(){

                    // Tento di prelevare i 2 attributi
                    var a = $( this ).attr( "i18n" ),
                        b = $( this ).attr( "i18n-args" );

                    // Se ho i parametri li passo, comunque un array
                    b = ( b && b.length > 0 ) ? b.split( "," ) : [] ;       

                    // Controllo se ho la key che è richiesta
                    if( a && a.length > 0 ){

                        // Se ho gli argomenti e se il primo è il flag lo cambio con un valore booleano
                        if( b.length > 0 ){

                            switch( b[ 0 ].toLowerCase() ){

                                case "true":

                                    b[ 0 ] = true;
                                    break;

                                case "false":

                                    b[ 0 ] = false;
                                    break;

                            }


                        }

                        // Aggiungo al primo posto la key per la traduzione
                        b.unshift( a );

                        // In fine traduco passando l'array                                
                        $( this ).html( i18n.Bla( b ) );

                    }

                } );

            }

        } );
        
        // Aspettiamo che il documento sia caricato
        $( window ).load( function(){ // Start --->
                
            // Appendiamo gli eventi accessori
            $( ".special.cards .image" ).dimmer( {
                
                on: "hover"
            
            } );
            
            $( ".ui.button.bookmarklet" ).click( function(){
            
                alert( i18n.Bla( "bookmarklets click" ) );
                return false;
            
            } );
            
            $( "a[lang]" ).click( function(){
                
                // Preleviamo la lingua
                var lang = $( this ).attr( "lang" );
                
                if( !lang ){
                    
                    alert( i18n.Bla( "no lang" ) );
                    return false;
                
                }
                
                // Settiamo la lingua
                __signLang( lang );
            
            } );
            
            $( ".t-tip" ).popup();
            
            // Traduciamo la console
            $( "*" ).Bla();
            
            // Mostriamo il body
            $( "body" ).show();
        
        } ); // <--- Start

    } ); // <--- Blajs

} )();
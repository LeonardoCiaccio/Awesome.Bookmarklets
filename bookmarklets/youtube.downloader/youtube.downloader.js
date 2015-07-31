/*

    Recupera i links per il download su Youtube

*/

( function( Y ){
    
    "use strict";

    var reSite   = /^http(?:s?):\/\/www\.youtube\.com\/watch\?v\=/g,
        kill     = function(){
        
            alert( "This script have some problems, visit 'https://leonardociaccio.github.io/Awesome.Bookmarklets/' for new updates !" );
            return false;
        
        },
        success  = function(){
        
            alert( "Download links insert in to 'Information Tab' !" );
            return false;
        
        },
        noTarget = function(){
        
            alert( "Use this bookmarklet on 'www.youtube.com/watch?v=.....'" );
            return false;
        
        },
        dInfo    = "<em><b>If after click download won't start use rigth click and 'Save as ...'</b></em>",
        gLinks   = function(){
        
            // Riferimenti per il player
            var YD,
                YO = [];
            
            if( !Y )return YO;
                                
            //Abbiamo quello che ci occorre ?
            try{
                
                YD = Y.config.args.url_encoded_fmt_stream_map;
            
            }catch( e ){
                
                return YO;
            
            }
            
            try{
                
                var a01 = YD.split( "," );
                
                // quality= ; type= ; url=	
                for( var a02 = 0; a02 < a01.length; a02++ ){
                    
                    var a03 = a01[ a02 ].split( "&" ),
                        tmp = {};
                    
                    for( var a04 = 0; a04 < a03.length; a04++ ){
                        
                        var a05 = a03[ a04 ].split( "=" ),
                            key = decodeURIComponent( a05[ 0 ].toUpperCase() ),
                            value = decodeURIComponent( a05[ 1 ] );
                        
                        switch( key ){
                                
                            case "TYPE":
                                
                                tmp.type = value;
                                break;
                            
                            case "QUALITY":
                                
                                tmp.quality = value;
                                break;
                            
                            case "URL":
                                
                                tmp.url = value;
                                break;
                        
                        }
                        
                    }
                    
                    if( tmp.type && tmp.quality && tmp.url )YO.push( tmp );
                
                }
                
                return YO;
            
            }catch( e ){
                
                return YO;
                
            }
            
        };
    
    // Siamo sulla pagina giusta ?
    if( !reSite.test( document.location.href ) )return noTarget();
    
    // Ho l'oggetto che ci serve ?
    if( !Y )return kill();
    
    // Prelevo i link
    var all = gLinks();
    
    // Se non ho i link qualcosa non va
    if( !all )return kill();
    
    // Voglio inserlo nelle informazioni, se non lo trovo genero un errore
    var description = document.getElementById( "eow-description" );
    if( !description )return kill();
    
    // Dedichiamo lo spazio per i download            
    //description.setAttribute( "style", "max-height:2000px!important" );
    
    // Backup delle descrizioni
    var cc = description.innerHTML,
        ll = [];
    
    // Strutturiamo i link
    for( var i = 0; i < all.length; i++ ){
    
        ll.push( "<a href='" + all[ i ].url + "' download>" + all[ i ].quality + " - " + all[ i ].type + "</a>" );
    
    }
    
    // Aggiorniamo le descrizioni
    description.innerHTML = "<b>Download :</b><p>" + ll.join( "</p><p>" ) + "</p><p>" + dInfo + "</p><hr><p>" + cc + "</p>";    
    
    // Compatibilità browser
    return success();

} )( window.ytplayer );









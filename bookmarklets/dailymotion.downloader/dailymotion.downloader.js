/*

    Recupera i links per il download su Dailymotion

*/

( function(){
    
    "use strict";

    var reSearch = /http(?:s?):\\\/\\\/www\.dailymotion\.com\\\/cdn\\\/[a-zA-Z\-_0-9]{9,16}\\\/video\\\/[a-zA-Z\-_0-9]{3,12}\.[a-z0-9]{3,4}\?auth\=[a-zA-Z\-_0-9]{9,60}/g,
        reFormat = /[A-Z]{1,3}[0-9]{2,4}\-[0-9]{2,4}x[0-9]{2,4}/g,
        reSite   = /^http(?:s?):\/\/www\.dailymotion\.com\/video\//g,
        all      = document.getElementsByTagName( "html" )[ 0 ].innerHTML.match( reSearch ),
        response = [],
        kill     = function(){
        
            alert( "This script have some problems, visit 'https://leonardociaccio.github.io/Awesome.Bookmarklets/' for new updates !" );
            return false;
        
        },
        success  = function(){
        
            alert( "Download links insert in to 'Information Tab' !" );
            return false;
        
        },
        noTarget = function(){
        
            alert( "Use this bookmarklet on 'www.dailymotion.com/video/.....'" );
            return false;
        
        },
        dInfo    = "<em><b>If after click download won't start use rigth click and 'Save as ...'</b></em>";
    
    // Siamo sulla pagina giusta ?
    if( !reSite.test( document.location.href ) )return noTarget();
    
    // Se non abbiamo i link generiamo un errore
    if( !all )return kill();
    
    // Operazioni di pulizia
    for( var i = 0; i < all.length; i++ ){
        
        var tmp = all[ i ].toString().replace( /\\/g, "" ),
            tsp = tmp.match( reFormat );
        
        tsp = ( !tsp ) ? "Video " + ( i + 1 ) : tsp[ 0 ].toString() ;
        
        response.push( "<a href='" + tmp + "' download>" + tsp + "</a>" );
    
    }
    
    // Voglio inserlo nelle informazioni, se non lo trovo genero un errore
    var description = document.getElementById( "video_description" );
    if( !video_description )return kill();
    
    // Dedichiamo lo spazio per i download            
    description.setAttribute( "style", "max-height:2000px!important" );
    
    // Backup delle descrizioni
    var cc = description.innerHTML;
    
    // Aggiorniamo le descrizioni
    description.innerHTML = "<b>Download :</b><p>" + response.join( "</p><p>" ) + "</p><p>" + dInfo + "</p><hr><p>" + cc + "</p>";    
    
    // Compatibilità browser
    return success();

} )();









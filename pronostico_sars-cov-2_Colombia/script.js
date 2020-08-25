google.charts.load(
    'current',
    {
        'packages': ['geochart'] 

    }
);

google.charts.setOnLoadCallback( carga );

async function carga(){
//aca van los datos...

    var json = await obtener_informacion( ); // va a ir a esta url a 
//https://corona.lmao.ninja/countries a buscar datos... 
// actualizada -> https://corona.lmao.ninja/v2/countries 
/*[
    ['Pais', 'Valor'],
    [ 'Argentina', 1000],
    [ 'Colombia', 3000],
] */
    var datos = google.visualization.arrayToDataTable ( json ); //google espera un formato 
    var configuracion = {
        region: 'CO',
        dataMode: 'regions', //es que cada pais sea interactivo
        //width: 600,
       // height: 400,
        colorAxis: {colors: ['#ededed', 'forestgreen', 'yellow', 'orange', 'red']}
    }
    var lugar = document.getElementById('mapa');
// lugat es un htmlELEMENT de tipo DIV... 

   var grafico = new google.visualization.GeoChart( lugar );
    //grafico es un objeto de renderización de google
    //va a mostrar el grafico de geochart adentro del div
    // guardado en lugar (id='mapa')
    grafico.draw ( datos, configuracion);
    //lugar.innerHTML = 'cargó la api';
}

async function obtener_informacion( ){
    //fetch devuelve una Promesa... asincrónica, mientras esto piensa, 
    //el cód sigue de largo
    var info = await fetch( 'https://corona.lmao.ninja/v3/covid-19/countries' );
    var datos = await info.json( ); // esto convierte la rta a JSON (si está bien formateado)
    
    var respuesta = [ ];
        respuesta.push( [ 'País', 'Casos', 'Muertes' ] );

    for( var i in datos ){
        respuesta.push( [
                datos[i].country,
                datos[i].cases,
                datos[i].deaths
            ] );
    }
    return respuesta;
}
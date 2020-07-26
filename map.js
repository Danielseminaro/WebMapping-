
// PINTAR UN TILES

let myMap = L.map('myMap').setView ([-34.60,-59.10], 9 )   

var tilesProvider = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'). addTo(myMap)
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')


// ESCALA GRAFICA 

L.control.scale().addTo(myMap);


// MAPAS


var mapa1 = L.geoJSON(cuenca,{style:styleA,popup:popupA})
var mapa2 = L.geoJSON(muertos,{style:styleB,popup:popupB})
var mapa3 = L.geoJSON(divisoria,{style:styleC})
var mapa4 = L.geoJSON(usos_2010,{style:styleD,popup:popupD})


// ESTILOS DEL MAPA A

function getColorA(d) {
   return d > 4000 ? '#800026' :
          d > 3000 ? '#BD0026' :
          d > 2000 ? '#E31A1C' :
          d > 1000 ? '#FC4E2A' :
          d > 100  ? '#FD8D3C' :
          d > 200  ?  '#FEB24C' :
          d > 10   ? '#FED976' :
                     '#FFEDA0';
}



function styleA(feature) {
   return {
       fillColor: getColorA(feature.properties.nuevos_casos),
       weight: 2,
       opacity: 1,
       color: 'red',
       dashArray: '3',
       fillOpacity: 0.7
   };
}



//  ESTILOS DEL MAPA B

function getColorB(d) {
  return d > 100? '#f7fcf5' :
         d > 80 ? '#e5f5e0' :
         d > 70 ? '#c7e9c0' :
         d > 50 ? '#a1d99b' :
         d > 30 ? '#74c476' :
         d > 10 ?'#41ab5d' :
         d > 5  ?'#238b45' :
                  '#005a32';
}



function styleB(feature) {
  return {
      fillColor: getColorB(feature.properties.fallecidos),
      weight: 2,
      opacity: 1,
      color: 'green',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

// ESTILOS MAPA C 


function getColorC(d) {
    return  d ===1?'#fc9272':
              '#fc9272';

}



function styleC(feature) {
    return {
        fillColor: getColorC(feature.properties.id),
        weight: 2,
        opacity: 1,
        color: 'green',
        dashArray: '5',
        fillOpacity: 0.7
    };
}



// ESTILOS MAPA D 


  
function getColorD(d) {
    return  d ==='Urbano disperso'?'#99d8c9':
            d ==='Rural'?'#e6550d':
            d === 'Urbano compacto'?'#31a354':
                  '#31a354'       

}



function styleD(feature) {
    return {
        fillColor: getColorD(feature.properties.Name),
        weight: 2,
        opacity: 1,
        color: 'black',
        dashArray: '5',
        fillOpacity: 0.7
    };
}





// REFERENCIAS A



var legendA = L.control({position: 'bottomright'});

legendA.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [],
        from, to;


    
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorA(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};







// REFERENCIAS B



var legendB = L.control({position: 'bottomright'});

legendB.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100],
        labels = [],
        from, to;

    
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorB(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};



// REFERENCIAS MAPA C 



var legendC = L.control({position: 'bottomright'});
legendC.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
      grades = ['Cuenca del río Luján'],
      labels = [],
      from, to;
      
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
    '<i style="background:' + getColorC(grades[i]) + '"></i> ' + grades[i] + '<br>';
  };
  return div;
};




// REFERENCIAS D




var legendD= L.control({position: 'bottomright'});
legendD.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
      grades = ['Rural', 'Urbano compacto', 'Urbano disperso'],
      labels = [],
      from, to;
      
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
    '<i style="background:' + getColorD(grades[i]) + '"></i> ' + grades[i] + '<br>';
  };
  return div;
};





//POPUP  DEL MAPA A



function popupA (feature,layer){
    layer.bindPopup(
                    '<img src="'+ feature.properties.graficos +'" style="width:300px;height:200px;">'+
                    "</p>NOMBRE: "+feature.properties.NOMBRE+ 
                    "</p>CASOS:"+feature.properties.nuevos_casos+ 
                    "</p>"
                   );
}

mapa1 = L.geoJson(cuenca, { 
    style:styleA, onEachFeature: popupA
})

// POPUP DEL MAPA B




function popupB (feature,layer){
    layer.bindPopup(
                    "</p>NOMBRE: "+feature.properties.NOMBRE+ 
                    "</p>CASOS:"+feature.properties.fallecidos+ 
                    "</p>"
                   );
}

mapa2 = L.geoJson(muertos, { 
    style:styleB, onEachFeature: popupB
})


// POPUP DEL MAPA D


function popupD (feature,layer){
    layer.bindPopup(
                    "</p>Name: "+feature.properties.Name+ 
                    "</p>codigo:"+feature.properties.codigo+ 
                    "</p>"
                   );
}

mapa4 = L.geoJson(usos_2010, { 
    style:styleD, onEachFeature: popupD
})




// SELECTOR DE MAPAS 



var capas = {
   "Contagios": mapa1,
   "Muertos": mapa2,
   "Cuenca": mapa3,
   "Usos del Suelo año 2010": mapa4
};


var Base = {
    "Satelite":Esri_WorldImagery,
     "OSM": tilesProvider 
};




L.control.layers( capas, Base, {
  collapsed: false,
  position: 'topleft' 
}).addTo(myMap)


// FUNCION PARA SINCRONIZAR REFERENCIAS 



currentLegend = legendA;
        
       myMap.on('baselayerchange', function (eventLayer) {
            if (eventLayer.name === "Contagios") {
                myMap.removeControl(currentLegend);
                currentLegend = legendA;
                legendA.addTo(myMap);
            }
          else if  (eventLayer.name === 'Muertos') {
                myMap.removeControl(currentLegend );
                currentLegend = legendB;
                legendB.addTo(myMap);}
            
}) 




currentLegend = legendC
        
       myMap.on('baselayerchange', function (eventLayer) {
            if (eventLayer.name === "Cuenca") {
                myMap.removeControl(currentLegend);
                currentLegend = legendC;
                legendC.addTo(myMap);
            }
          else if  (eventLayer.name === 'Usos del Suelo año 2010') {
                myMap.removeControl(currentLegend );
                currentLegend = legendD;
                legendD.addTo(myMap);
            }
}) 








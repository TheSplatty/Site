function init() 
{
  var mapOptions = 
  {
    'center': new google.maps.LatLng(config['map']['x'], config['map']['y']),
    'zoom': config['map']['zoom'],
    'mapTypeId': google.maps.MapTypeId.HYBRID, // Или ROADMAP
    'disableDefaultUI': config['map']['ui']['disable'],
    'panControl': config['map']['ui']['pan'],
    'zoomControl': config['map']['ui']['zoom'],
    'mapTypeControl': config['map']['ui']['mapType'],
    'mapTypeControlOptions': 
    {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU // Или DEFAULT
    },
    'streetViewControl': config['map']['ui']['streetView'],
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);


  var circle = // Выносить в конфиг?
  {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: config['color']['white'],
    fillOpacity: 0.7,
    scale: 25,
    strokeColor: config['color']['blue'],
    strokeWeight: 11
  };

  var marker = new google.maps.Marker(
  {
    position: map.getCenter(),
    icon: circle,
    map: map
  });

  var info = new google.maps.InfoWindow(
  {
    content: config['map']['info'],
  });

  google.maps.event.addListener(marker, 'click', function()
  {
    info.open(map, marker);
  });

  log('Загрузил карту с такими координатами (x, y): ' + config['map']['x'] + ', ' + config['map']['y']);
};

function loadMap() 
{
  var data = 
  {
    'src': 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=init'
  };

  $('#map').append(compileText(templates['script'], data));
};

$('body').ready(loadMap);
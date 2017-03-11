console.log("The bot is starting...");

var Twit = require('twit');
var config = require('./config');
var jsonfile = require('jsonfile');
var file = 'data.json'

var T = new Twit(config);

var phrases = [

'porque es mujer', 'mujeres mensas', 'mujeres saben menos','mujeres a la cocina','mujeres no saben manejar', 'mujeres menos aptas',
'mujeres trabajan menos', 'mujeres menos capaces','mujeres a lavar', 'mujeres incompetentes', 'mujeres son basura', 'mujeres son muy malas', 'malas mujeres','mujeres mediocres','mujeres merecen menos','mujeres siempre amas de casa','mujeres no deben estudiar','mujeres sin oportunidad', 'no por ser mujer','no porque eres mujer'
];
var phrases2 = [
  'comportate como mujer','esa mujer es mala', 'mala esposa','mala madre','mala novia','pesima esposa','mujeres no sirven', 'mujeres sin futuro','culpa a las mujeres', 'mujeres no deben trabajar','mujeres a la casa', 'las mujeres no importan', 'los hombres son mejores', 'las mujeres no sirven', 'mujeres necesitan hombre', 'mujer no debe estar soltera','mujeres infieles', 'mujer cruel','mujer soltera no sirve','mujeres se deben de casar','las mujeres son mas tontas','mujeres menos inteligentes', 'mujeres solo para placer', 'prostituta', 'golfa', 'mujeres con cadenas', 'no al voto de la mujer', 'no a la equidad', 'no feminismo','abajo el feminismo', 'no somos iguales entre sexos', 'sexo superior', 'no a la igualdad'
]
var mexicoEstados  = [	/*CDMX*/'-99.32677', '19.18871', '-98.96044', '19.59275',
                        /*Puebla*/'-98.28257','18.94216','-98.10335','19.13792',
                        /*Aguascalientes*/ '-102.8748', '21.6221', '-101.8355', '22.459',
                        /*Baja California*/ '-118.4539', '27.9994', '-112.3266', '32.7186',
                        /*Baja California S*/ '-115.5966', '18.3662', '-109.3956', '28.3756',
                        /*Campeche*/  '-92.4679', '17.8095', '-89.1134', '20.8476',
                        /*Chiapas*/   '-94.2301', '14.5329', '-90.3679', '17.9845',
                        /*Chihuahua*/ '-109.0743', '25.5604', '-103.2989', '31.7841',
                        /*Coahuila*/ '-103.9507', '24.5415', '-99.8325','29.8799',
                        /*Colima*/  '-104.7010', '18.6846', '-103.4863', '19.5121',
                        /*Durango*/ '-107.2094', '22.3451', '-102.4718', '26.8444',
                        /*Guanajuato*/ '-102.0964', '19.9123', '-99.6715', '21.8392',
                        /*Guerrero*/ '-102.1834', '16.3159', '-98.0070', '18.8864',
                        /*Hidalgo*/ '-99.8640', '19.5966', '-97.9847', '21.3978',
                    ]
  var estadoMexDos = [
                        /*Jalisco*/ '-105.7013', '18.9256', '-101.5099', '22.7498',
                        /*Michoacan*/ '-103.7512', '17.9056', '-100.0622', '20.3937',
                        /*Morelos*/  '-99.4939', '18.3316', '-98.6327', '19.1322',
                        /*Nayarit*/  '-106.6964', '20.6028', '-103.7216', '23.0837',
                        /*Nuevo Leon*/ '-101.2062', '23.1650', '-98.4228', '27.7986',
                        /*Oaxaca*/ '-98.5508', '15.6456', '-93.8680', '18.6584',
                        /*Queretaro*/ '-100.5962', '20.0170', '-99.0467', '21.6691',
                        /*Quintana Roo*/ '-89.3143', '17.8665', '-86.7034', '21.6057',
                        /*San Luis Potosi*/ '-102.3030', '21.1592', '-98.3301', '24.4910',
                        /*Sinaloa*/ '-109.4488', '22.4664', '-105.3927', '27.0421',
                        /*Sonora*/'-115.0525', '26.2970', '-108.4237', '32.4938',
                        /*Tabasco*/ '-94.1299', '17.2500', '-90.9770', '18.6490',
                        /*Tamaulipas*/ '-100.1439', '22.2067', '-97.1478', '27.6788',
                        /*Tlaxcala*/ '-98.7116', '19.1042', '-97.6266', '19.7282',
                        /*Veracruz*/ '-98.6799', '17.1359', '-93.6077', '22.4712',
                        /*Yucatan*/ '-91.4135', '19.5374', '-87.3664', '22.5648',
                        /*Zacatecas*/ '-104.3281', '21.0418', '-100.7424', '25.1248'
  ]

var places = {};

var params = {
  language: 'es',
  locations: mexicoEstados, estadoMexDos
}
var stream = T.stream('statuses/filter', params);
stream.on('tweet', function (tweet) {    
  for(var i = 0; i < phrases.length; i++){
    var str  = tweet.text.toLowerCase();
    var n = str.indexOf(phrases[i]);

    if(n>=0){
      console.log("Alerta de violencia de genero...");
      console.log(tweet.text + ", tuiteado en: "+tweet.place.full_name+", por: "+tweet.user.name+" por la cuenta: "+tweet.user.screen_name);
      getContador(tweet);
      console.log(places[tweet.place.full_name]);
      jsonfile.writeFile(file,places,function(err){
        console.log(err);
      });
    }
  }
  for(var j = 0; j < phrases2.length; j++){
    var str  = tweet.text.toLowerCase();
    var n = str.indexOf(phrases2[j]);
    if(n>=0){
      console.log("Alerta de violencia de genero...");
      console.log(tweet.text + ", tuiteado en: "+tweet.place.full_name+", por: "+tweet.user.name+" por la cuenta: "+tweet.user.screen_name  );
      getContador(tweet);
      console.log(places[tweet.place.full_name]);
      jsonfile.writeFile(file,places,function(err){
        console.log(err);
      });
    }
  }
});

function getContador(tweet){
  if(places[tweet.place.full_name] == undefined){
    places[tweet.place.full_name] = 1;
  }
  else{
    places[tweet.place.full_name] = places[tweet.place.full_name]+1;
  }
}

/*Los datos que vamos a enviar son*/

var lugar = {};
var numero = {};
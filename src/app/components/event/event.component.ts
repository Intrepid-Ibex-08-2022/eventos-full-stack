import { Component, Input } from '@angular/core';
import { EventsResult } from '../../interface/event';
import { GetEventsService } from '../../services/get-events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent  {

  @Input() event: EventsResult = {};

  constructor(
    private eventServices: GetEventsService,
    private route: Router
  ) { }

  event_detail(event: EventsResult ){
    this.eventServices.setEventDetails(event);
    this.route.navigateByUrl('/event')

  ngOnInit(): void {}
  eventosCanarios = [
    {
      id: 1,
      tipo_event: 'Música',
      image:
        'https://assets-global.website-files.com/6151bdf804776f918cd21fd3/61a8955dd9c0cb0323eafc98_Dise%C3%B1o%20sin%20t%C3%ADtulo%20(16).jpg',
      title: 'Concierto sinfónico: &#x27;Encuentros del Atlántico&#x27;',
      description:
        'Concierto sinfónico que sintetiza el hermanamiento entre dos formaciones juveniles: una Uruguaya y la otra Canaria. Entradas a 10 euros.',
      date: {
        start_date: '25/8/2022',
        when: '20:30',
      },
      address: ['Teatro Auditorio de Agüimes - Agüimes.', 'Gran Canaria'],
      ticket_info:
        'https://entrees.es/evento/concierto-sinfonico-encuentros-del-atlantico-entradas',
    },
    {
      id: 2,
      tipo_event: 'Artes plásticas y visuales',
      image:
        'https://assets-global.website-files.com/6151bdf804776f918cd21fd3/62fcabc22d3e5daea3e84cb1_van%20gogh.jpg',
      title: 'Visita a la exposición: &#x27;El Mundo de Van Gogh&#x27;',
      description:
        'Visita organizada a esta exposición, con guagua que saldrá desde Ingenio. Entradas a 9 euros.',
      date: {
        start_date: '22/8/2022',
        when: '17:30',
      },
      address: ['Ingenio', 'Gran Canaria'],
      ticket_info:
        'https://ingenio.es/vive-con-artis-la-novedosa-exposicion-inmersiva-el-mundo-de-van-gogh/?fbclid=IwAR3qd0fA3MGvVc4jIDJAigcDXn9HFxDuwotwmizHHGzb_wwQ_7dSWIeMatw',
    },
    {
      id: 3,
      tipo_event: 'Música',
      image:
        'https://assets-global.website-files.com/6151bdf804776f918cd21fd3/62fb555034f16c25d1232099_atlantico.jpg',
      title: 'Concierto: &#x27;Músicas del Atlántico&#x27;',
      description:
        'Gala de conciertos con María Katzarava, Aquiles Machado y Augusto Brito. Entradas a 30 euros.',
      date: {
        start_date: '24/8/2022',
        when: '20:00',
      },
      address: [
        'Hotel Santa Catalina - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info:
        'https://entrees.es/evento/musicas-del-atlantico-gala-concierto-entradas',
    },
    {
      id: 4,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/07/LPA-04-2.jpg',
      title: 'Concierto de Cristina James Trío',
      description:
        'Concierto de esta artista con influencias norteamericana del neo- soul, el r&b y el jazz y por otro sus raíces canario-andaluzas. Entrada gratuita.(con reserva)',
      date: {
        start_date: '22/8/2022',
        when: '20:30',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info:
        'https://www.fabricaisleta.com/eventos/lpa-en-vivo-cristina-james-trio/',
    },
    {
      id: 5,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/07/RAP-NIGHT-web-2.jpg',
      title: 'RAP NIGHT - 23 DE AGOSTO',
      description:
        'Jam session de Hip Hop, Rap, Freestyle, scratch, Instrumentos en directo, Breakdance (anímate a bailar!) , y arte underground.',
      date: {
        start_date: '23/8/2022',
        when: '20:30',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info:
        'https://www.fabricaisleta.com/eventos/rap-night-23-de-agosto/',
    },
    {
      id: 6,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/08/DUPARTY-02-scaled.jpg',
      title: 'Gabriel Crowty y Elenup (Taller Salsa to Breaking)',
      description:
        'Somos el colectivo La DUPA (Diversión, Unidad, Paz y Amor), Promotores de la música y la danza de la cultura urbana más ligada al movimiento Hip Hop Social.',
      date: {
        start_date: '24/8/2022',
        when: '20:30',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info:
        'https://www.fabricaisleta.com/eventos/duparty-musica-danza/',
    },
    {
      id: 7,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/08/FLYER-WEB-2.0-01.png',
      title: 'JAZZ ENTRE AMIGOS - LOUIS MORENO QUINTETO',
      description:
        'Louis Moreno es un cantante provisto de una magnífica voz que se ha prodigado mucho últimamente como solista acompañado de BigBand. En esta ocasión nos presenta un repertorio adaptado a formato quinteto que hará el deleite de todo el público presente. Entrada anticipada web 8 € y en taquilla 12 €.',
      date: {
        start_date: '25/8/2022',
        when: '20:30',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info:
        'https://www.fabricaisleta.com/eventos/jazz-entre-amigos-louis-moreno-quinteto/',
    },
    {
      id: 8,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/08/carlos-catana-02-scaled.jpg',
      title: 'CARLOS CATANA & MARGARITA GALVÁN EN CONCIERTO',
      description:
        'Carlos Catana lleva 41 años girando con sus composiciones (poético musical) por toda España en formato dúo, bandas… Incluso ha participado en una película dedicada a su vida y obra musical dirigida por el periodista, músico y cineasta lanzaroteño José María de Paiz. Margarita Galván estudió piano en el Conservatorio Superior de música de Madrid, en estos momentos comparte su tiempo como profesora de piano, acompañante de solistas y algunas bandas del panorama nacional. Entradas anticipadas a 7 euros y a 10 euros en taquilla.',
      date: {
        start_date: '26/8/2022',
        when: '20:30',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info:
        'https://www.fabricaisleta.com/eventos/carlos-catana-margarita-galvan/',
    },
    {
      id: 9,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/08/Tequila-02-scaled.jpg',
      title: 'TRIBUTO A TEQUILA',
      description:
        'Tequila fue una banda de música rock española fundada hacia 1976. Fue formada por los músicos Ariel Rot, Alejo Stivel, Julián Infante, Felipe Lipe y Manolo Iglesias. Fue una de las bandas más populares en los primeros años de democracia en España. Entradas anticipadas a 8 euros y a 12 euros en taquilla.',
      date: {
        start_date: '26/8/2022',
        when: '22:30',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info: 'https://www.fabricaisleta.com/eventos/tributo-a-tequila/',
    },
    {
      id: 10,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/08/Tardeo-04-scaled.jpg',
      title: 'SÁBADO DE TARDEO - SAVIA NUEVA',
      description:
        'Savia Nueva en Directo!. Ellos son ElMusti y Jose Valido. Percusión y guitarra. Versionamos canciones de todo tipo, pop-rock y música latina. Entradas anticipadas a 3 euros(incluye caña + pincho) y a 5 euros(incluye caña + pincho) en taquilla.',
      date: {
        start_date: '27/8/2022',
        when: '18:00',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info:
        'https://www.fabricaisleta.com/eventos/sabado-de-tardeo-savia-nueva/',
    },
    {
      id: 11,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/07/fiesta-brasilera-03.jpg',
      title: 'FIESTA BRASILEÑA',
      description:
        'Primer grupo: Você - Você. Segundo Grupo: La Bossa Nostra Troupe. Tercer Grupo: Clave Do Samba. Y a partir de las 23 h GRACE DJ EN TERRAZA. Entradas anticipadas a 10 euros y a 14 euros en taquilla.',
      date: {
        start_date: '27/8/2022',
        when: '20:30',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info: 'https://www.fabricaisleta.com/eventos/fiesta-brasilena/',
    },
    {
      id: 12,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/07/Fabrica-Sunset-web.jpg',
      title: 'FÁBRICA SUNSET - LOEWIS GONZALEZ',
      description:
        'Luis Roca González, de nombre artístico Loewis González, (nacido en Las Palmas de Gran Canaria en 1997) es un joven cantautor de Gran Canaria que está dando sus primeros pasos en el mundo musical. Entradas anticipadas a 3 euros(incluye caña + pincho) y a 5 euros(incluye caña + pincho) en taquilla.',
      date: {
        start_date: '28/8/2022',
        when: '18:00',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info: 'https://www.fabricaisleta.com/eventos/loewis-gonzalez/',
    },
    {
      id: 13,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/08/Mararia-web.jpg',
      title: 'LA UNDERGROUND - MARARÍA',
      description:
        'Crecí entre letras de Sabina y Silvio Rodriguez; entre canciones de rock y boleros; entre escenarios y focos. Un día sentí que yo también quería contar y cantar historias. Me acompañan en el escenario Xavi, a la guitarra, y Ana, al piano. Entradas anticipadas a 4 euros y a 6 euros en taquilla.',
      date: {
        start_date: '28/8/2022',
        when: '21:00',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info:
        'https://www.fabricaisleta.com/eventos/la-underground-mararia/',
    },
    {
      id: 14,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/07/LPA-05-1.jpg',
      title: 'LPA EN VIVO - ANYELIA & YORELL',
      description:
        'Anyelia Y Yoriell «A tiempo de Son». Músicos: Anyelia Voz, Yoriell Guitarra y Voz, Lucas Arenciabia , Percusión «En estas nuevas canciones nadie queda indiferente, la mágia de las líneas melódicas son pegajosas y bailables. Y sus letras son poemas que despiertan la delicadeza de nuestro interior y al mismo tiempo nos transmite felicidad a ritmos del Son, Cumbia, Bachata y hasta un sutil Merengue Pambichao». Entrada gratuita.(con reserva)',
      date: {
        start_date: '29/8/2022',
        when: '20:30',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info:
        'https://www.fabricaisleta.com/eventos/lpa-en-vivo-anyelia-yorell/',
    },
    {
      id: 15,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/08/VELADA-DE-CANTAUTORES-WEB3.jpg',
      title: 'VELADA DE CANTAUTORES',
      description:
        'En la velada de cantautores le damos la oportunidad a las personas que han escrito sus propias canciones de compartirlas con el público y con músicos de sesión que les acompañarán y probablemente toquen por primera vez sus canciones con banda. Una noche especial para aquellos que busquen un evento emotivo y diferente en la ciudad. Entradas anticipadas a 4 euros y a 6 euros en taquilla.',
      date: {
        start_date: '30/8/2022',
        when: '20:30',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info:
        'https://www.fabricaisleta.com/eventos/velada-de-cantautores-4/',
    },
    {
      id: 16,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/08/JINETES-DEL-GROOVE-02-scaled.jpg',
      title: 'FIESTA FUNKY/DISCO CON LOS JINETES DEL GROOVE',
      description:
        'El grupo está formado por cuatro de los mejores músicos de la isla siendo saxo, guitarra, órgano y batería los instrumentos que forman este cuarteto. Su repertorio se compone de temas originales y directos, con influencias muy claras del acid jazz y el funk, lo que hace que sea una música muy rítmica y poderosa. Entradas anticipadas a 6 euros y a 8 euros en taquilla.',
      date: {
        start_date: '31/8/2022',
        when: '20:30',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info: 'https://www.fabricaisleta.com/eventos/fiesta-funky-disco/',
    },
    {
      id: 17,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/08/2-9-FRAGIL-EPIFANIA-web.jpg',
      title: 'FRÁGIL EPIFANÍA',
      description:
        '«Frágil epifanía» nace del querer contar mucho antes del poder cantar lo que la mente cuece, cual sorpresiva revelación. Aun así, la música que encierra no son más que unas letras escritas durante algunos años en la vida de Juanfra Gil Darias, en la cual ha sido inspirado primeramente por la música de cantautor intentando descubrir su propio estilo, así como lo hicieron Serrat, Sabina, Andrés Suárez, Marwan, Silvio Rodríguez y muchos otros. Además, también incluye atmósferas como las que se encuentran en el indie folk u otras como en el pop rock español de Leiva, Sidecars, Extremoduro, Mclan, etc. Entradas anticipadas a 8 euros y a 12 euros en taquilla.',
      date: {
        start_date: '03/9/2022',
        when: '20:30',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info: 'https://www.fabricaisleta.com/eventos/fragil-epifania/',
    },
    {
      id: 18,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/08/CARTEL-FABRICA-WEB.jpg',
      title: 'ESPECIAL IMPRO EN LA FÁBRICA',
      description:
        'LA NOCHE GAMBERRA. Un show de teatro improvisado en clave de humor. El ingenio de Delia Santana, el talento de La Tetera Impro desde Granada y la espontaneidad de Impro Canarias son los ingredientes perfectos para una noche de risas inolvidables donde el público se convierte en director/a de las escenas. Entradas anticipadas a 10 euros y a 12 euros en taquilla.',
      date: {
        start_date: '09/9/2022',
        when: '20:00',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info:
        'https://www.fabricaisleta.com/eventos/especial-impro-en-la-fabrica/',
    },
    {
      id: 19,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/08/CARTEL-FABRICA-WEB.jpg',
      title: 'ESPECIAL IMPRO EN LA FÁBRICA',
      description:
        'TE COMO LA VIDA. Es un espectáculo improvisado en el que veremos escenas inconexas cargadas de vulnerabilidad, ternura, gritos, risas o llantos. Escenas inspiradas en las propuestas de un público cómplice, que se sentirá reflejado en los conflictos eternamente universales a los que estamos afortunadamente atadas. Entradas anticipadas a 10 euros y a 12 euros en taquilla.',
      date: {
        start_date: '10/9/2022',
        when: '18:30',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info:
        'https://www.fabricaisleta.com/eventos/especial-impro-en-la-fabrica/',
    },
    {
      id: 20,
      tipo_event: 'Música',
      image:
        'https://www.fabricaisleta.com/wp-content/uploads/2022/08/9-8-CEFERINO-WEB.jpg',
      title: 'FARAOFF',
      description:
        'FARAOFF REPRESENTA el grado más bajo de la pirámide social. Sin ningún poder y sin derecho a expresarse en la sociedad actual, se viran las tornas y aunque sin poder real, si que tendrá voz durante un hora y un minuto. .El resto será historia y aunque parezca amortajado, el público tendrá la posibilidad de ver a una momia viviente, no por mucho tiempo.¡¡¡V’AMON RA-RA-RÁ!!! Entradas anticipadas a 8 euros y a 12 euros en taquilla.',
      date: {
        start_date: '9/9/2022',
        when: '22:00',
      },
      address: [
        'Fábrica La Isleta - Las Palmas de Gran Canaria.',
        'Gran Canaria',
      ],
      ticket_info: 'https://www.fabricaisleta.com/eventos/faraoff/',
    },
  ];
}

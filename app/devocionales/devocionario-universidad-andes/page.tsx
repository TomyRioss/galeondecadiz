import Link from "next/link";

export const metadata = {
  title: "Devocionario Universidad de los Andes — Galeona de Cádiz",
};

const secciones = [
  {
    titulo: "Oraciones",
    oraciones: [
      {
        nombre: "La señal de la Santa Cruz",
        texto: "Por la señal de la Santa Cruz, de nuestros enemigos, líbranos Señor, Dios nuestro. En el nombre del Padre, del Hijo y del Espíritu Santo. Amén.",
      },
      {
        nombre: "Padrenuestro",
        texto: "Padre nuestro que estás en los cielos, santificado sea tu nombre; venga a nosotros tu reino; hágase tu voluntad así en la tierra como en el cielo. El pan nuestro de cada día dánosle hoy; y perdónanos nuestras deudas, así como nosotros perdonamos a nuestros deudores; y no nos dejes caer en la tentación, mas líbranos del mal. Amén.",
      },
      {
        nombre: "Avemaría",
        texto: "Dios te salve, María, llena eres de gracia, el Señor es contigo. Bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros pecadores, ahora y en la hora de nuestra muerte. Amén.",
      },
      {
        nombre: "Gloria",
        texto: "Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.",
      },
      {
        nombre: "Ofrecimiento del día",
        texto: "¡Oh Jesús mío!, por medio del Corazón Inmaculado de María, te ofrezco las oraciones, obras, alegrías y sufrimientos de este día, en reparación de las ofensas cometidas contra ti, por las intenciones de todos los Apostolados del Sagrado Corazón de Jesús, y especialmente para las intenciones de la propagación de la Fe, del retorno de los no creyentes, y por la paz en el mundo.",
      },
      {
        nombre: "Ángel de la Guarda",
        texto: "Ángel de Dios, mi custodio fiel, pues la misericordia de Dios te ha confiado a mí, ilumíname, protégeme, dirígeme y gobiérname en este día (o esta noche). Amén.",
      },
      {
        nombre: "Credo",
        texto: "Creo en Dios Padre Todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, Nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos. Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén.",
      },
      {
        nombre: "Visita al Santísimo",
        texto: "Jesús sacramentado, yo te saludo y te adoro en el Santísimo Sacramento del Altar. Quiero amarte con todo mi corazón: por esto te pido perdón de los pecados que he cometido, y te doy gracias por los beneficios que continuamente derramas sobre mí.",
      },
      {
        nombre: "Comunión espiritual",
        texto: "Creo, Jesús mío, que estás real y verdaderamente presente en el Santísimo Sacramento del Altar. Te amo sobre todas las cosas y deseo recibirte en mi alma. Ya que no puedo ahora hacerlo sacramentalmente, ven al menos espiritualmente a mi corazón. Y como si ya te hubiera recibido, me abrazo a ti y me uno todo a ti; no permitas que me separe de ti nunca más.",
      },
      {
        nombre: "Oración al Espíritu Santo",
        texto: "V. Ven, Espíritu Santo, llena los corazones de tus fieles y enciende en ellos el fuego de tu amor. Envía tu espíritu y serán creadas todas las cosas.\nR. Y renovarás la faz de la tierra.\nV. ¡Oh Dios, que has instruido los corazones de tus fieles con la luz del Espíritu Santo!, concédenos según el mismo Espíritu, conocer las cosas rectas y gozar siempre de sus divinos consuelos. Por Jesucristo Nuestro Señor. Amén.",
      },
      {
        nombre: "Oraciones para bendecir la mesa",
        texto: "V. Bendícenos, Señor, y bendice estos alimentos que por tu bondad vamos a tomar.\nR. Amén.\nV. El Rey de la eterna gloria nos haga partícipes de la mesa celestial.\nR. Amén.\n\nAcción de gracias por la comida:\nV. Te damos gracias, omnipotente Dios, por todos tus beneficios. Tú que vives y reinas por los siglos de los siglos.\nR. Amén.",
      },
      {
        nombre: "Oración a San José",
        texto: "¡Oh bienaventurado San José!, yo te invoco como patrono y guardián de mi alma. A ti encomiendo la inocencia y la pureza de mi corazón; a ti la regularidad y fervor de mis devociones; a ti, especialmente, mi conversión sincera y la perseverancia en el bien hasta la hora de mi muerte. Consígueme del Señor, por tu poderosa intercesión, la gracia de amarlo en la tierra y de alabarlo eternamente en el Cielo. Amén.",
      },
      {
        nombre: "Oración para el estudio",
        texto: "Señor Dios, fuente de toda sabiduría, ilumina mi entendimiento para que comprenda las verdades que voy a estudiar. Fortalece mi voluntad para que rechace todo aquello que pudiera apartarme de mi deber. Concédeme la gracia de aprovechar cuanto estudie en bien de mi alma y en servicio de lo que me has encomendado.",
      },
    ],
  },
  {
    titulo: "Oraciones y Devociones a la Santísima Trinidad",
    oraciones: [
      {
        nombre: "Te Deum",
        texto: "Te Deum laudamus: te Dominum confitemur. Te aeternum Patrem omnis terra veneratur. Tibi omnes Angeli, tibi caeli et universae Potestates. Tibi Cherubim et Seraphim incessabili voce proclamant: Sanctus, Sanctus, Sanctus, Dominus Deus Sabaoth. Pleni sunt caeli et terra maiestatis gloriae tuae. Te gloriosus Apostolorum chorus, te Prophetarum laudabilis numerus, te Martyrum candidatus laudat exercitus. Te per orbem terrarum sancta confitetur Ecclesia, Patrem immensae maiestatis; venerandum tuum verum et unicum Filium; Sanctum quoque Paraclitum Spiritum. Tu Rex gloriae, Christe. Tu Patris sempiternus es Filius. Tu ad liberandum suscepturus hominem, non horruisti Virginis uterum. Tu, devicto mortis aculeo, aperuisti credentibus regna caelorum. Tu ad dexteram Dei sedes, in gloria Patris. Iudex crederis esse venturus. Te ergo quaesumus, tuis famulis subveni, quos pretioso sanguine redemisti. Aeterna fac cum sanctis tuis in gloria numerari. Salvum fac populum tuum, Domine, et benedic hereditati tuae. Et rege eos, et extolle illos usque in aeternum. Per singulos dies benedicimus te; et laudamus nomen tuum in saeculum, et in saeculum saeculi. Dignare, Domine, die isto sine peccato nos custodire. Miserere nostri, Domine, miserere nostri. Fiat misericordia tua, Domine, super nos, quemadmodum speravimus in te. In te, Domine, speravi: non confundar in aeternum.",
      },
      {
        nombre: "Símbolo Atanasiano (Quicumque vult)",
        texto: "Quicumque vult salvus esse, ante omnia opus est, ut teneat catholicam fidem: quam nisi quisque integram inviolatamque servaverit, absque dubio in aeternum peribit. Fides autem catholica haec est: ut unum Deum in Trinitate, et Trinitatem in unitate veneremur. Neque confundentes personas, neque substantiam separantes. Alia est enim persona Patris, alia Filii, alia Spiritus Sancti. Sed Patris, et Filii, et Spiritus Sancti una est divinitas, aequalis gloria, coaeterna maiestas. Qualis Pater, talis Filius, talis Spiritus Sanctus. Increatus Pater, increatus Filius, increatus Spiritus Sanctus. Immensus Pater, immensus Filius, immensus Spiritus Sanctus. Aeternus Pater, aeternus Filius, aeternus Spiritus Sanctus. Et tamen non tres aeterni, sed unus aeternus. Sicut non tres increati, nec tres immensi, sed unus increatus, et unus immensus. Similiter omnipotens Pater, omnipotens Filius, omnipotens Spiritus Sanctus. Et tamen non tres omnipotentes, sed unus omnipotens. Ita Deus Pater, Deus Filius, Deus Spiritus Sanctus. Et tamen non tres dii, sed unus est Deus. Ita Dominus Pater, Dominus Filius, Dominus Spiritus Sanctus. Et tamen non tres Domini, sed unus est Dominus. Quia, sicut singillatim unamquamque personam Deum ac Dominum confiteri christiana veritate compellimur: ita tres Deos aut Dominos dicere catholica religione prohibemur. Pater a nullo est factus: nec creatus, nec genitus. Filius a Patre solo est: non factus, nec creatus, sed genitus. Spiritus Sanctus a Patre et Filio: non factus, nec creatus, nec genitus, sed procedens. Unus ergo Pater, non tres Patres; unus Filius, non tres Filii; unus Spiritus Sanctus, non tres Spiritus Sancti. Et in hac Trinitate nihil prius aut posterius, nihil maius aut minus: sed totae tres personae coaeternae sibi sunt et coaequales. Ita, ut per omnia, sicut iam supra dictum est, et unitas in Trinitate, et Trinitas in unitate veneranda sit. Qui vult ergo salvus esse, ita de Trinitate sentiat. Sed necessarium est ad aeternam salutem, ut incarnationem quoque Domini nostri Iesu Christi fideliter credat. Est ergo fides recta ut credamus et confiteamur, quia Dominus noster Iesus Christus, Dei Filius, Deus pariter et homo est. Deus est ex substantia Patris ante saecula genitus: et homo est ex substantia matris in saeculo natus. Perfectus Deus, perfectus homo: ex anima rationali et humana carne subsistens. Aequalis Patri secundum divinitatem: minor Patre secundum humanitatem. Qui licet Deus sit et homo: non duo tamen, sed unus est Christus. Unus autem non conversione divinitatis in carnem: sed assumptione humanitatis in Deum. Unus omnino, non confusione substantiae: sed unitate personae. Nam sicut anima rationalis et caro unus est homo: ita Deus et homo unus est Christus. Qui passus est pro salute nostra: descendit ad inferos: tertia die resurrexit a mortuis. Ascendit ad caelos, sedet ad dexteram Dei Patris omnipotentis: inde venturus est iudicare vivos et mortuos. Ad cuius adventum omnes homines resurgere habent cum corporibus suis: et reddituri sunt de factis propriis rationem. Et qui bona egerunt, ibunt in vitam aeternam: qui vero mala, in ignem aeternum. Haec est fides catholica: quam nisi quisque fideliter firmiterque crediderit, salvus esse non poterit.",
      },
    ],
  },
  {
    titulo: "Devociones al Espíritu Santo",
    oraciones: [
      {
        nombre: "Letanías del Espíritu Santo",
        texto: "Señor, ten piedad.\nCristo, ten piedad.\nSeñor, ten piedad.\nCristo, óyenos.\nCristo, escúchanos.\nDios Padre del cielo, ten misericordia de nosotros.\nDios Hijo, Redentor del mundo, ten misericordia de nosotros.\nDios Espíritu Santo, ten misericordia de nosotros.\nSantísima Trinidad, un solo Dios, ten misericordia de nosotros.\n\nEspíritu Santo, ten misericordia de nosotros.\nEspíritu Santo, Consolador verdadero, ten misericordia de nosotros.\nEspíritu Santo, Don de Dios Altísimo, ten misericordia de nosotros.\nEspíritu Santo, fuego vivificante, ten misericordia de nosotros.\nEspíritu Santo, santificador de las almas, ten misericordia de nosotros.\nEspíritu Santo, que derramas el amor de Dios en nuestros corazones, ten misericordia de nosotros.\nEspíritu Santo, fuente de toda santidad, ten misericordia de nosotros.\nEspíritu Santo, que da vida a todas las cosas, ten misericordia de nosotros.\nEspíritu Santo, luz de los corazones, ten misericordia de nosotros.\nEspíritu Santo, dador de siete dones, ten misericordia de nosotros.\nEspíritu Santo, espíritu de sabiduría y entendimiento, ten misericordia de nosotros.\nEspíritu Santo, espíritu de consejo y fortaleza, ten misericordia de nosotros.\nEspíritu Santo, espíritu de ciencia y piedad, ten misericordia de nosotros.\nEspíritu Santo, espíritu de santo temor de Dios, ten misericordia de nosotros.\n\nCordero de Dios, que quitas el pecado del mundo, envía tu Espíritu Santo sobre nosotros.\nCordero de Dios, que quitas el pecado del mundo, manda tu Espíritu Santo a consolarnos.\nCordero de Dios, que quitas el pecado del mundo, danos tu Espíritu Santo.\n\nV. Ven, Espíritu Santo, llena los corazones de tus fieles.\nR. Y enciende en ellos el fuego de tu amor.",
      },
      {
        nombre: "Decenario al Espíritu Santo",
        texto: "(Rezar durante nueve días consecutivos)\n\nV. Ven, Espíritu Santo, llena los corazones de tus fieles y enciende en ellos el fuego de tu amor.\nR. Envía tu Espíritu y serán creadas todas las cosas, y renovarás la faz de la tierra.\n\nOración:\n¡Oh Dios, que has instruido los corazones de tus fieles con la luz del Espíritu Santo!, concédenos que por su divina inspiración, conozcamos lo que es recto, y siempre gocemos de sus divinos consuelos. Por Jesucristo Nuestro Señor. Amén.",
      },
    ],
  },
  {
    titulo: "Devociones a la Santísima Virgen",
    oraciones: [
      {
        nombre: "Ángelus",
        texto: "V. El ángel del Señor anunció a María.\nR. Y concibió por obra y gracia del Espíritu Santo.\n\nAvemaría…\n\nV. He aquí la esclava del Señor.\nR. Hágase en mí según tu palabra.\n\nAvemaría…\n\nV. Y el Verbo se hizo carne.\nR. Y habitó entre nosotros.\n\nAvemaría…\n\nV. Rogad por nosotros, Santa Madre de Dios.\nR. Para que seamos dignos de alcanzar las promesas de Nuestro Señor Jesucristo.\n\nOración:\nDerrama, Señor, tu gracia sobre nuestros corazones, para que los que, por el anuncio del ángel, hemos conocido la encarnación de tu Hijo, por su pasión y su cruz, lleguemos a la gloria de la resurrección. Por el mismo Jesucristo Nuestro Señor. Amén.",
      },
      {
        nombre: "Regina Coeli",
        texto: "Regina Coeli, laetare, alleluia.\nQuia quem meruisti portare, alleluia.\nResurrexit, sicut dixit, alleluia.\nOra pro nobis Deum, alleluia.\n\nV. Gaude et laetare, Virgo Maria, alleluia.\nR. Quia surrexit Dominus vere, alleluia.\n\nOración:\nDios, que por la resurrección de tu Hijo, Nuestro Señor Jesucristo, has alegrado al mundo, concédenos, te rogamos, que por su Madre, la Virgen María, alcancemos los gozos de la vida eterna. Por el mismo Jesucristo Nuestro Señor. Amén.",
      },
      {
        nombre: "Salve",
        texto: "Dios te salve, Reina y Madre, Madre de misericordia, vida, dulzura y esperanza nuestra. Dios te salve. A ti llamamos los desterrados hijos de Eva. A ti suspiramos, gimiendo y llorando en este valle de lágrimas. Hea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y después de este destierro, muéstranos a Jesús, fruto bendito de tu vientre. ¡Oh clemente, ¡oh piadosa, ¡oh dulce Virgen María! Ruega por nosotros, Santa Madre de Dios, para que seamos dignos de alcanzar las promesas de Nuestro Señor Jesucristo. Amén.",
      },
      {
        nombre: "Bendita sea tu pureza",
        texto: "Bendita sea tu pureza y eternamente lo sea, pues todo un Dios se recrea en tan graciosa belleza. A ti, celestial Princesa, Virgen Sagrada María, te ofrezco en este día alma, vida y corazón. Míranos con compasión, no nos dejes, Madre nuestra, y danos tu santa bendición. Amén.",
      },
      {
        nombre: "Sub tuum presidium confugimus",
        texto: "Sub tuum praesidium confugimus, Sancta Dei Genetrix. Nostras deprecationes ne despicias in necessitatibus nostris, sed a periculis cunctis libera nos semper, Virgo gloriosa et benedicta.\n\nBajo tu amparo nos acogemos, Santa Madre de Dios; no desprecies las súplicas que te dirigimos en nuestras necesidades, antes bien, líbranos de todo peligro, ¡oh Virgen gloriosa y bendita!",
      },
      {
        nombre: "Acordaos",
        texto: "Acordaos, oh piadosísima Virgen María, que jamás se ha oído decir que ninguno de los que han acudido a tu protección, implorando tu asistencia y reclamando tu socorro, haya sido desamparado. Animado por esta confianza, a ti también acudo, oh Madre, Virgen de las vírgenes, y gimiendo bajo el peso de mis pecados, me atrevo a comparecer ante tu presencia soberana. Oh Madre de Dios, no deseches mis súplicas, antes bien, escúchalas y accede a ellas. Amén.",
      },
      {
        nombre: "Santo Rosario",
        texto: "El rezo del Santo Rosario consta de cinco misterios que se meditan según el día de la semana:\n\n• Misterios Gozosos (Lunes y sábado): La Anunciación, la Visitación, el Nacimiento de Jesús, la Presentación, el Hallazgo de Jesús en el Templo.\n• Misterios Dolorosos (Martes y viernes): La Oración en el Huerto, la Flagelación, la Coronación de espinas, la Cruz a cuestas, la Crucifixión.\n• Misterios Gloriosos (Miércoles y domingo): La Resurrección, la Ascensión, la Venida del Espíritu Santo, la Asunción de la Virgen, la Coronación de la Virgen.\n• Misterios Luminosos (Jueves): El Bautismo de Jesús, las Bodas de Caná, el Anuncio del Reino, la Transfiguración, la Institución de la Eucaristía.\n\nCada misterio se reza con un Padrenuestro, diez Avemarías, un Gloria y la jaculatoria: «¡Oh Jesús mío!, perdona nuestras culpas, líbranos del fuego del infierno, lleva al cielo a todas las almas, especialmente a las más necesitadas de tu infinita misericordia».",
      },
      {
        nombre: "Mes de María",
        texto: "Durante el mes de mayo, mes de María, es tradición en la Iglesia católica dedicar oraciones especiales a la Santísima Virgen. Se puede rezar diariamente el Rosario, la Salve, o la Letanía Lauretana, y ofrecer flores o actos de amor y devoción a la Virgen María.",
      },
      {
        nombre: "Oración a la Virgen del Carmen",
        texto: "Virgen del Carmen, Madre y Señora del Monte Carmelo, míranos con ojos de misericordia. Tú que fuiste elevada sobre todos los coros de los ángeles, protégenos con tu manto santo. Aleja de nosotros todo mal, y guíanos por el camino de la salvación. Tú, que diste el Escapulario a San Simón Stock, concédenos llevarlo con amor y devoción, y alcánzanos la gracia de la perseverancia final. Amén.",
      },
    ],
  },
  {
    titulo: "Oraciones para preparar la Santa Misa y la Comunión",
    oraciones: [
      {
        nombre: "Oración antes de la Misa",
        texto: "Señor mío Jesucristo, por los méritos de tu pasión y muerte, concédeme la gracia de participar con devoción en este santo sacrificio, y de recibirte con amor en mi corazón. Puríficame de mis pecados, y haz que esta Santa Misa sea acepta a ti y provechosa para mi alma.",
      },
      {
        nombre: "Oración antes de la Comunión",
        texto: "Creo, Jesús mío, que estás real y verdaderamente presente en el Santísimo Sacramento del Altar. Te amo sobre todas las cosas y deseo recibirte en mi alma. Ya que no puedo ahora hacerlo sacramentalmente, ven al menos espiritualmente a mi corazón. Y como si ya te hubiera recibido, me abrazo a ti y me uno todo a ti; no permitas que me separe de ti nunca más.",
      },
      {
        nombre: "Oración después de la Comunión",
        texto: "Dulce Jesús mío, te doy gracias por haberte dignado a venir a mi corazón. Te pido que nunca me separe de ti, y que vivas en mí para siempre. Dame la fuerza para ser fiel a tus mandamientos, y la gracia de amarte cada día más. Amén.",
      },
    ],
  },
  {
    titulo: "Para orar a Dios",
    oraciones: [
      {
        nombre: "Oración de confianza",
        texto: "Señor, en tus manos pongo mi espíritu. Tú me redimiste, Dios de verdad. Confío en ti, oh Señor, mi Dios. En ti espero, Señor, que no sea confundido para siempre.",
      },
      {
        nombre: "Oración de acción de gracias",
        texto: "Te damos gracias, omnipotente Dios, por todos tus beneficios. Tú que vives y reinas por los siglos de los siglos. Amén.",
      },
      {
        nombre: "Oración de abandono",
        texto: "Señor, te entrego todo lo que soy y lo que tengo. Haz de mí lo que tú quieras. Tómalo todo: mi voluntad, mi inteligencia, mi memoria. Todo cuanto tengo y soy, tú me lo has dado. Te lo devuelvo, Señor. Dispón de ello enteramente según tu voluntad. Dame tu amor y tu gracia, con eso me basta.",
      },
    ],
  },
  {
    titulo: "Santos",
    oraciones: [
      {
        nombre: "Oración a todos los santos",
        texto: "Santos de Dios, interceded por nosotros. Ángeles y arcángeles, interceded por nosotros. Santos patriarcas y profetas, interceded por nosotros. Santos apóstoles y evangelistas, interceded por nosotros. Santos mártires, interceded por nosotros. Santos doctores, interceded por nosotros. Santos confesores, interceded por nosotros. Santos monjes y ermitaños, interceded por nosotros. Santos virgenes y viudas, interceded por nosotros. Todos los santos y santas de Dios, rogad por nosotros.",
      },
      {
        nombre: "Litánía de los santos",
        texto: "Señor, ten piedad.\nCristo, ten piedad.\nSeñor, ten piedad.\n\nCristo, óyenos.\nCristo, escúchanos.\n\nDios Padre del cielo, ten misericordia de nosotros.\nDios Hijo, Redentor del mundo, ten misericordia de nosotros.\nDios Espíritu Santo, ten misericordia de nosotros.\nSantísima Trinidad, un solo Dios, ten misericordia de nosotros.\n\nSanta María, ruega por nosotros.\nSan Miguel, ruega por nosotros.\nSan Gabriel, ruega por nosotros.\nSan Rafael, ruega por nosotros.\nTodos los santos ángeles y arcángeles, rogad por nosotros.\nTodos los santos coros de los bienaventurados espíritus, rogad por nosotros.\nSan Juan Bautista, ruega por nosotros.\nSan José, ruega por nosotros.\nTodos los santos patriarcas y profetas, rogad por nosotros.\nSan Pedro, ruega por nosotros.\nSan Pablo, ruega por nosotros.\nSan Andrés, ruega por nosotros.\nSan Juan, ruega por nosotros.\nTodos los santos apóstoles y evangelistas, rogad por nosotros.\nTodos los santos discípulos del Señor, rogad por nosotros.\nTodos los santos inocentes, rogad por nosotros.\nSan Esteban, ruega por nosotros.\nSan Lorenzo, ruega por nosotros.\nTodos los santos mártires, rogad por nosotros.\nSan Silvestre, ruega por nosotros.\nSan Gregorio, ruega por nosotros.\nSan Agustín, ruega por nosotros.\nTodos los santos obispos y confesores, rogad por nosotros.\nTodos los santos doctores, rogad por nosotros.\nSan Antonio, ruega por nosotros.\nSan Benito, ruega por nosotros.\nSan Francisco, ruega por nosotros.\nTodos los santos sacerdotes y levitas, rogad por nosotros.\nTodos los santos monjes y ermitaños, rogad por nosotros.\nSanta María Magdalena, ruega por nosotros.\nSanta Ágata, ruega por nosotros.\nSanta Lucía, ruega por nosotros.\nSanta Inés, ruega por nosotros.\nSanta Cecilia, ruega por nosotros.\nSanta Catalina, ruega por nosotros.\nSanta Anastasia, ruega por nosotros.\nTodos los santos virgenes y mártires, rogad por nosotros.\nTodos los santos y santas de Dios, rogad por nosotros.\n\nCordero de Dios, que quitas el pecado del mundo, perdónanos, Señor.\nCordero de Dios, que quitas el pecado del mundo, escúchanos, Señor.\nCordero de Dios, que quitas el pecado del mundo, ten misericordia de nosotros.",
      },
    ],
  },
];

const indice = [
  "La señal de la Santa Cruz · Padrenuestro · Avemaría · Gloria · Ofrecimiento del día · Ángel de la Guarda · Credo · Visita al Santísimo · Comunión espiritual · Oración al Espíritu Santo · Oraciones para bendecir la mesa · Oración a San José · Oración para el estudio",
  "Oraciones y Devociones a la Santísima Trinidad: Te Deum · Símbolo Atanasiano",
  "Devociones al Espíritu Santo: Letanías del Espíritu Santo · Decenario al Espíritu Santo",
  "Devociones a la Santísima Virgen: Ángelus · Regina Coeli · Salve · Bendita sea tu pureza · Sub tuum presidium · Acordaos · Santo Rosario · Mes de María · Oración a la Virgen del Carmen",
  "Oraciones para preparar la Santa Misa y la Comunión",
  "Para orar a Dios",
  "Santos",
];

export default function DevocionarioUniversidadAndesPage() {
  return (
    <div style={{ background: "#F5EDD6", minHeight: "100vh" }}>

      {/* HERO */}
      <section
        className="relative w-full py-16 md:py-24 px-4 flex flex-col items-center text-center overflow-hidden"
        style={{ background: "#1A3A5C" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(30deg, #B87333 0px, #B87333 1px, transparent 1px, transparent 60px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top, #F5EDD6, transparent)" }}
        />
        <Link
          href="/devocionales"
          className="relative text-[0.6rem] tracking-[0.25em] uppercase mb-6 hover:opacity-80 transition-opacity"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          ← Devocionales
        </Link>
        <p
          className="relative text-xs tracking-[0.3em] uppercase mb-3"
          style={{ color: "rgba(245,237,214,0.5)", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Oraciones y Devociones
        </p>
        <h1
          className="relative text-3xl md:text-4xl font-bold leading-tight mb-2 max-w-2xl"
          style={{ color: "#F5EDD6", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Devocionario
        </h1>
        <p
          className="relative text-lg font-semibold"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Universidad de los Andes
        </p>
        <p
          className="relative text-xs mt-2 max-w-sm"
          style={{ color: "rgba(245,237,214,0.45)", fontFamily: "var(--font-lora, serif)", fontStyle: "italic" }}
        >
          Las ilustraciones de este libro forman parte de la colección del Museo de Artes de la Universidad de los Andes.
        </p>
        <div
          className="relative mt-5 h-px w-24"
          style={{ background: "linear-gradient(90deg, transparent, #B87333, transparent)" }}
        />
      </section>

      {/* ÍNDICE */}
      <section className="max-w-2xl mx-auto px-4 pt-10 pb-4">
        <p
          className="text-[0.6rem] tracking-[0.2em] uppercase mb-4"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          Índice de contenidos
        </p>
        <div
          className="rounded-xl p-5 border-l-4 flex flex-col gap-3"
          style={{
            borderColor: "#B87333",
            background: "linear-gradient(90deg, #ddd3b5, #e8dfc4)",
          }}
        >
          {indice.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[0.6rem] font-bold flex-shrink-0 mt-0.5"
                style={{ background: "#1A3A5C", color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {i + 1}
              </span>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ORACIONES */}
      <section className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-10">
        {secciones.map(({ titulo, oraciones }) => (
          <div key={titulo}>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-1 h-10 rounded-full flex-shrink-0"
                style={{ background: "linear-gradient(180deg, #E8511A, #B87333)" }}
              />
              <h2
                className="text-base font-bold tracking-widest uppercase"
                style={{ color: "#1A3A5C", fontFamily: "var(--font-cinzel, serif)" }}
              >
                {titulo}
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              {oraciones.map(({ nombre, texto }) => (
                <div
                  key={nombre}
                  className="rounded-xl p-5 border"
                  style={{
                    borderColor: "#B87333",
                    background: "linear-gradient(135deg, #ede4cb 0%, #ddd3b5 100%)",
                  }}
                >
                  <p
                    className="text-[0.65rem] tracking-[0.2em] uppercase mb-3"
                    style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
                  >
                    {nombre}
                  </p>
                  {texto.split("\n").map((linea, i) => (
                    <p
                      key={i}
                      className="text-sm leading-relaxed mb-1 last:mb-0"
                      style={{ color: "#1A3A5C", fontFamily: "var(--font-lora, serif)" }}
                    >
                      {linea}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <section className="max-w-2xl mx-auto px-4 pb-14 flex justify-center">
        <p
          className="text-xs tracking-[0.2em]"
          style={{ color: "#B87333", fontFamily: "var(--font-cinzel, serif)" }}
        >
          www.galeonadecadiz.org/devocionales
        </p>
      </section>

    </div>
  );
}

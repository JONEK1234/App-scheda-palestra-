import { WorkoutDay, DayOfWeekId } from '../types/workout';

export const WORKOUT_DAYS: WorkoutDay[] = [
  {
    id: 1,
    dayName: 'Lunedì',
    dayNumber: 1,
    title: 'Giorno 1: Push, Spalle & Core',
    subtitle: 'Petto, Deltoidi, Tricipiti, Addome & Cardio',
    estimatedDuration: '65 - 75 min',
    accentColor: '#ef4444',
    exercises: [
      {
        id: 'g1_ex1',
        name: 'Riscaldamento: Tappeto',
        category: 'Riscaldamento',
        targetMuscles: ['Cardiovascolare', 'Gambe', 'Mobilità generale'],
        prescription: "10' Tappeto",
        isTimeBased: true,
        timeDurationSeconds: 600, // 10 minutes
        setsCount: 1,
        defaultReps: '10 min',
        defaultRestSeconds: 60,
        gripType: 'Nessuna / Appoggio leggero sui corrimano se necessario',
        setupDescription: 'Camminata a passo svelto (5.5 - 6.5 km/h) con leggera pendenza (2-4%) per riscaldare articolazioni di anche, ginocchia e caviglie, aumentando la temperatura corporea centrale prima dei carichi pesanti.',
        executionSteps: [
          'Sali sul tapis roulant e avvia a velocità moderata (3-4 km/h per il primo minuto).',
          'Aumenta gradualmente a 5.5 - 6.2 km/h con pendenza al 2-3%.',
          'Mantieni postura eretta, sguardo in avanti e rullata fluida del piede (tacco-punta).',
          'Oscilla le braccia in modo naturale per preparare anche le spalle.'
        ],
        keyTips: ['Non aggrapparti con forza ai corrimano per non alterare la postura.', 'Respira regolarmente e preparati mentalmente alla sessione di spinta.'],
        commonMistakes: ['Iniziare subito a correre a freddo.', 'Busto inclinato in avanti a guardare lo smartphone.', 'Passo troppo lungo che batte sul tallone.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/5UMCR8-hQJk',
        videoTitle: 'Tutorial Riscaldamento Tapis Roulant',
        illustrationKey: 'treadmill'
      },
      {
        id: 'g1_ex2',
        name: 'Chest Press',
        category: 'Petto',
        targetMuscles: ['Gran Pettorale', 'Deltoide Anteriore', 'Tricipiti'],
        prescription: '3x10',
        setsCount: 3,
        defaultReps: 10,
        defaultRestSeconds: 90,
        gripType: 'Presa prona salda con pollici avvolgenti. Impugnatura all\'altezza della parte media/bassa del petto.',
        setupDescription: 'Regola l\'altezza del sedile in modo che le impugnature orizzontali si trovino a livello della linea dei capezzoli. Schiena, glutei e nuca ben appoggiati allo schienale.',
        executionSteps: [
          'Adotta l\'assetto: deprimi e adduci le scapole ("spalle lontane dalle orecchie e schiena compatta").',
          'Afferra le maniglie con i polsi dritti (non iperestesi all\'indietro).',
          'Spingi in avanti espirando, focalizzandoti sulla spinta con i pettorali senza staccare le spalle dallo schienale.',
          'Fermati poco prima del blocco articolare completo dei gomiti.',
          'Controlla la fase eccentrica (discesa di 2-3 secondi) inspirando, sentendo il petto che si apre prima di ripartire.'
        ],
        keyTips: ['Mantieni sempre il petto "in fuori" (petto aperto).', 'Non lasciare che i gomiti salgano sopra l\'altezza delle spalle (angolo di circa 45-60° col busto).'],
        commonMistakes: ['Far scattare le spalle in avanti al massimo della spinta.', 'Polsi piegati che subiscono il peso.', 'Rimbalzo del pacco pesi a fine corsa.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/sqOw2Y68ecY',
        videoTitle: 'Chest Press Machine Form & Tutorial',
        illustrationKey: 'chest_press'
      },
      {
        id: 'g1_ex3',
        name: 'Pec Fly (Pectoral Machine)',
        category: 'Petto',
        targetMuscles: ['Pettorale (fasci sternocostali)', 'Deltoide Anteriore (stabilizzatore)'],
        prescription: '3x12',
        setsCount: 3,
        defaultReps: 12,
        defaultRestSeconds: 75,
        gripType: 'Presa neutra o appoggio avambracci sui cuscinetti (gomiti all\'altezza della metà del torace).',
        setupDescription: 'Regola il sedile per avere i gomiti e le mani alla stessa altezza del centro del petto. Piedi piantati a terra per massimizzare la stabilità.',
        executionSteps: [
          'Siediti con schiena aderente e scapole addotte.',
          'Con i gomiti leggermente flessi (e angolo fisso durante tutto il movimento), chiudi le braccia davanti a te.',
          'Nel punto di massima chiusura, contrai volontariamente il petto per 1 secondo pieno ("squeeze").',
          'Apri lentamente e con controllo, fermandoti quando senti un buon allungamento del pettorale senza stressare la capsula della spalla.'
        ],
        keyTips: ['Immagina di abbracciare una grande botte o un albero.', 'Il movimento parte dal petto, non dalle mani o dalle spalle.'],
        commonMistakes: ['Piegare ed estendere i gomiti trasformando l\'esercizio in una distensione.', 'Iper-allungare le braccia all\'indietro rischiando traumi alla cuffia dei rotatori.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/eGjt4lkGeZ4',
        videoTitle: 'Pec Fly Machine Esecuzione Perfetta',
        illustrationKey: 'pec_fly'
      },
      {
        id: 'g1_ex4',
        name: 'Shoulder Press',
        category: 'Spalle',
        targetMuscles: ['Deltoide Anteriore', 'Deltoide Laterale', 'Tricipiti', 'Trapezio superiore'],
        prescription: '3x10',
        setsCount: 3,
        defaultReps: 10,
        defaultRestSeconds: 90,
        gripType: 'Presa prona o semi-neutra, poco più larga della larghezza spalle. Polsi allineati con gli avambracci.',
        setupDescription: 'Regola il sedile in modo che le maniglie partano approssimativamente all\'altezza delle orecchie o della parte alta del mento.',
        executionSteps: [
          'Addome contratto e schiena aderente allo schienale.',
          'Spingi verso l\'alto espirando fino a distendere le braccia quasi completamente sopra la testa.',
          'Non serrare i gomiti violentemente.',
          'Ritorna lentamente in basso inspirando, arrivando all\'altezza degli occhi/orecchie prima della ripetizione successiva.'
        ],
        keyTips: ['Mantieni i gomiti leggermente proiettati in avanti rispetto al piano frontale (piano scapolare a 30°).', 'Non inarcare eccessivamente la zona lombare.'],
        commonMistakes: ['Spingere con la testa in avanti.', 'Inarcare la schiena staccando la zona lombare.', 'Gomiti troppo aperti verso l\'esterno a 90°.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/WvLMauqrnK8',
        videoTitle: 'Shoulder Press Machine Tutorial',
        illustrationKey: 'shoulder_press'
      },
      {
        id: 'g1_ex5',
        name: 'Alzate Laterali + Alzate Frontali',
        category: 'Spalle',
        targetMuscles: ['Deltoide Laterale (Alzate Laterali)', 'Deltoide Anteriore (Alzate Frontali)'],
        prescription: '12 + 12 (in Superset, 3 serie)',
        isSuperset: true,
        supersetNote: 'Esegui subito 12 Alzate Laterali, poi SENZA pausa 12 Alzate Frontali con manubri. Poi recupera 90".',
        setsCount: 3,
        defaultReps: '12 + 12',
        defaultRestSeconds: 90,
        gripType: 'Presa prona o neutra con manubri leggeri/medi. Impugnatura morbida senza stringere convulsamente.',
        setupDescription: 'In piedi, piedi larghezza spalle, ginocchia morbide, addome compatto. Manubri ai fianchi per le laterali, poi davanti alle cosce per le frontali.',
        executionSteps: [
          'PARTE A (Alzate Laterali x12): Solleva i manubri verso l\'esterno fino all\'altezza delle spalle, guidando il movimento con i gomiti ("versa l\'acqua da una brocca"). Gomiti leggermente piegati. Discesa controllata.',
          'IMMEDIATAMENTE DOPO (Alzate Frontali x12): Porta i manubri davanti alle cosce, sollevali dritti in avanti fino all\'altezza del mento o degli occhi senza oscillare con la schiena.',
          'Discesa lenta di 2 secondi, controllo costante della tensione continua.'
        ],
        keyTips: ['Non usare carichi eccessivi che ti costringano a darti slancio con il bacino.', 'Tieni le spalle basse e lontane dal collo (non contrarre il trapezio).'],
        commonMistakes: ['Slancio lombare all\'indietro durante la salita.', 'Alzare le braccia ben oltre le spalle stressando l\'articolazione acromion-claveare.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/3VcKaXpzqRo',
        videoTitle: 'Dumbbell Lateral & Front Raises Form',
        illustrationKey: 'lateral_front_raises'
      },
      {
        id: 'g1_ex6',
        name: 'French Press',
        category: 'Tricipiti',
        targetMuscles: ['Tricipite Brachiale (Capo Lungo e Mediale)'],
        prescription: '3x10',
        setsCount: 3,
        defaultReps: 10,
        defaultRestSeconds: 75,
        gripType: 'Presa prona su bilanciere EZ o neutra con 2 manubri. Mani distanziate a circa 20-25 cm.',
        setupDescription: 'Sdraiati sulla panca piana, piedi stabili a terra. Porta il carico sopra il petto con braccia inclinate di circa 70-80° indietro verso la testa (non a 90° perpendicolari, per mantenere tensione costante).',
        executionSteps: [
          'Blocca i gomiti nello spazio: i gomiti devono fungere da cerniera fissa.',
          'Fletti gli avambracci portando il bilanciere/manubri verso la fronte o appena sopra la sommità del capo.',
          'Senti l\'allungamento profondo del capo lungo del tricipite.',
          'Estendi le braccia tornando alla posizione iniziale contraendo i tricipiti ed espirando.'
        ],
        keyTips: ['Gomiti stretti, evita che si allarghino a campana verso l\'esterno.', 'Controllo millimetrico della discesa per proteggere fronte e gomiti.'],
        commonMistakes: ['Muovere le spalle avanti e indietro trasformando l\'esercizio in un pullover.', 'Gomiti che sbandano verso l\'esterno.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/d_KZxkY_0cM',
        videoTitle: 'French Press EZ Bar Guida Esecuzione',
        illustrationKey: 'french_press'
      },
      {
        id: 'g1_ex7',
        name: 'Push Down Sbarra Diritta',
        category: 'Tricipiti',
        targetMuscles: ['Tricipite Brachiale (Capo Laterale e Mediale)'],
        prescription: '3x12',
        setsCount: 3,
        defaultReps: 12,
        defaultRestSeconds: 60,
        gripType: 'Presa prona con palmi verso il basso sulla sbarra diritta, larghezza poco inferiore a quella delle spalle.',
        setupDescription: 'Cavo alto. Posizionati a mezzo passo dal cavo, busto leggermente inclinato in avanti (10-15°), ginocchia sbloccate, gomiti incollati ai fianchi.',
        executionSteps: [
          'Parti con gli avambracci paralleli al pavimento o appena sopra i 90° (massimo allungamento senza muovere il gomito).',
          'Spingi la sbarra verso il basso fino a distendere completamente le braccia.',
          'Schiaccia i tricipiti in contrazione di picco per 1 secondo.',
          'Risali controllando la sbarra fino a 90° inspirando, senza permettere ai gomiti di staccarsi dai fianchi.'
        ],
        keyTips: ['I gomiti sono inchiodati ai lati della cassa toracica.', 'Non caricare troppo peso da doverti buttare con il petto sopra la sbarra.'],
        commonMistakes: ['Gomiti che avanzano e indietreggiano durante ogni ripetizione.', 'Aiutarsi dondolando con la schiena.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/2-LAMcpzODU',
        videoTitle: 'Triceps Straight Bar Pushdown Tutorial',
        illustrationKey: 'pushdown_bar'
      },
      {
        id: 'g1_ex8',
        name: 'Push Down Cavo Singolo',
        category: 'Tricipiti',
        targetMuscles: ['Tricipite Brachiale (Isolamento Unilaterale)'],
        prescription: '3x12',
        setsCount: 3,
        defaultReps: 12,
        defaultRestSeconds: 60,
        gripType: 'Impugnatura singola o gommino del cavo, presa neutra/semiprona. 12 reps per braccio per 3 serie.',
        setupDescription: 'Cavo alto senza sbarra o con maniglia singola. Lavora un braccio alla volta per colmare sbilanciamenti di forza e massimizzare la concentrazione neuromuscolare.',
        executionSteps: [
          'Afferra la maniglia con un braccio, gomito saldo al fianco.',
          'Spingi verso il basso fino alla completa estensione del gomito, accentuando la contrazione laterale.',
          'Rallenta la risalita controllando la fase eccentrica.',
          'Completa 12 ripetizioni con il primo braccio, poi passa subito al secondo braccio prima del riposo.'
        ],
        keyTips: ['Ottimo esercizio per pareggiare il volume tra braccio destro e sinistro.', 'Mantieni le spalle stabili e parallele allo specchio.'],
        commonMistakes: ['Ruotare il busto per aiutarsi a spingere il cavo.', 'Gomito volante non ancorato al fianco.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/-xa-6cQaZKY',
        videoTitle: 'Single Arm Cable Pushdown Guide',
        illustrationKey: 'pushdown_single'
      },
      {
        id: 'g1_ex9',
        name: 'Crunch alla Torretta',
        category: 'Addome',
        targetMuscles: ['Retto dell\'Addome', 'Obliqui (stabilizzazione)'],
        prescription: '4x15',
        setsCount: 4,
        defaultReps: 15,
        defaultRestSeconds: 60,
        gripType: 'Presa neutra con la corda al cavo alto. Corde posizionate ai lati della testa/tempie o clavicole.',
        setupDescription: 'In ginocchio sotto il cavo alto, bacino bloccato e sedere fermo a mezza via (non sederti sui talloni). Corde afferrate saldamente vicino alle orecchie.',
        executionSteps: [
          'Fletti la colonna vertebrale "arrotolando" il torace verso il bacino (immagina di voler toccare le ginocchia con la fronte).',
          'Espira tutta l\'aria nei polmoni comprimendo fortemente gli addominali.',
          'Mantieni il bacino fermo: il movimento deve avvenire a livello della spina dorsale, non dell\'anca.',
          'Risali srotolando lentamente la schiena senza iperestenderla.'
        ],
        keyTips: ['Non tirare con le braccia o con i tricipiti: le braccia servono solo come gancio fisso.', 'Pensa ad accorciare la distanza tra sterno e pube.'],
        commonMistakes: ['Flettere le anche sedendosi sui talloni invece di arrotolare la spina dorsale.', 'Tirare la corda con le braccia come se fosse un pushdown.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/2fOROqkJpCA',
        videoTitle: 'Kneeling Cable Crunch Tutorial',
        illustrationKey: 'cable_crunch'
      },
      {
        id: 'g1_ex10',
        name: 'Defaticamento: Cyclette',
        category: 'Defaticamento',
        targetMuscles: ['Cardiovascolare', 'Gambe', 'Recupero attivo'],
        prescription: "10' Cyclette",
        isTimeBased: true,
        timeDurationSeconds: 600, // 10 minutes
        setsCount: 1,
        defaultReps: '10 min',
        defaultRestSeconds: 0,
        gripType: 'Appoggio leggero sul manubrio con spalle rilassate.',
        setupDescription: 'Regola l\'altezza della sella in modo che con il pedale nel punto più basso la gamba sia quasi completamente estesa (leggero angolo di 5-10° al ginocchio).',
        executionSteps: [
          'Pedala a cadenza costante (70-85 RPM) con resistenza bassa/moderata.',
          'Focalizzati sul respiro profondo e rilassato per abbassare il battito cardiaco.',
          'Favorisci il drenaggio e il recupero muscolare dopo la sessione pesante.'
        ],
        keyTips: ['Bassa intensità: devi essere in grado di sostenere una conversazione agevolmente.', 'Non pedalare con il tallone ma con l\'avampiede.'],
        commonMistakes: ['Sella troppo bassa che affatica le rotule.', 'Spingere a ritmi massimali vanificando l\'effetto defaticante.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/q3mZ45xMYKQ',
        videoTitle: 'Cool Down Stationary Bike Session',
        illustrationKey: 'bike'
      }
    ]
  },
  {
    id: 2,
    dayName: 'Mercoledì',
    dayNumber: 3,
    title: 'Giorno 2: Pull, Bicipiti & Core',
    subtitle: 'Dorso, Bicipiti, Addome & Cardio Finale',
    estimatedDuration: '65 - 75 min',
    accentColor: '#3b82f6',
    exercises: [
      {
        id: 'g2_ex1',
        name: 'Riscaldamento: Tappeto',
        category: 'Riscaldamento',
        targetMuscles: ['Cardiovascolare', 'Gambe', 'Mobilità globale'],
        prescription: "10' Tappeto",
        isTimeBased: true,
        timeDurationSeconds: 600,
        setsCount: 1,
        defaultReps: '10 min',
        defaultRestSeconds: 60,
        gripType: 'Nessuna impugnatura / Libera oscillazione braccia',
        setupDescription: '10 minuti di camminata a passo spedito su tapis roulant con pendenza graduale. Ottimale per preparare la colonna vertebrale e la catena cinetica posteriore alla trazione.',
        executionSteps: [
          'Inizia a 5.0 km/h, aumentando fino a 6.0 km/h al 2-3% di pendenza.',
          'Cammina con portamento fiero, spalle aperte.',
          'Esegui qualche rotazione delle spalle all\'indietro durante la camminata per scaldare cuffia dei rotatori e scapole.'
        ],
        keyTips: ['Riscalda anche le articolazioni superiori muovendo le braccia.', 'Idratati con piccoli sorsi d\'acqua.'],
        commonMistakes: ['Correre forte a freddo.', 'Piedi che sbattono pesantemente sul nastro.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/5UMCR8-hQJk',
        videoTitle: 'Tapis Roulant Riscaldamento',
        illustrationKey: 'treadmill'
      },
      {
        id: 'g2_ex2',
        name: 'Lat Machine Presa Larga + Lat Machine Presa Inversa',
        category: 'Dorso',
        targetMuscles: ['Gran Dorsale', 'Grande Rotondo', 'Romboidi', 'Bicipiti'],
        prescription: '10 + 8 (in Superset, 3 serie)',
        isSuperset: true,
        supersetNote: 'Esegui 10 reps a Presa Larga, poi cambia SUBITO presa a Presa Inversa (supina) per altre 8 reps. Riposa 90" tra le serie.',
        setsCount: 3,
        defaultReps: '10 + 8',
        defaultRestSeconds: 90,
        gripType: '1) Presa prona larga (poco oltre le spalle). 2) Presa supina inversa (palmi verso di te, larghezza spalle).',
        setupDescription: 'Blocca saldamente le cosce sotto i cuscinetti della lat machine. Mantieni il petto leggermente aperto con una leggera inclinazione del busto indietro (circa 15°).',
        executionSteps: [
          'PARTE 1 (Presa Larga x10): Tira la sbarra verso la parte alta dello sterno, guidando con i gomiti verso il basso e indietro. Deprimi le scapole e strizza il dorso.',
          'CAMBIO IMMEDIATO (Presa Inversa x8): Inverti la presa (palmi verso di te, larghezza spalle). Tira verso il petto concentrandoti sulla contrazione della parte bassa del gran dorsale e dei bicipiti.',
          'Risali sempre in modo controllato allungando completamente il dorso prima della ripetizione successiva.'
        ],
        keyTips: ['Non tirare dietro la nuca: sempre al petto per proteggere le spalle.', 'La forza deve partire dalla retrazione scapolare e dai gomiti, non dalle mani.'],
        commonMistakes: ['Dondolare con la schiena come se fosse un vogatore.', 'Spalle incassate nelle orecchie nella fase di risalita.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/CAwf7n6Luuc',
        videoTitle: 'Lat Machine Form: Wide Grip vs Reverse Grip',
        illustrationKey: 'lat_machine'
      },
      {
        id: 'g2_ex3',
        name: 'Pulley Basso',
        category: 'Dorso',
        targetMuscles: ['Gran Dorsale (Spessore)', 'Romboidi', 'Trapezio Medio', 'Deltoide Posteriore'],
        prescription: '3x12',
        setsCount: 3,
        defaultReps: 12,
        defaultRestSeconds: 75,
        gripType: 'Presa a triangolo / neutra stretta, pollici chiusi.',
        setupDescription: 'Siediti alla panca del pulley con i piedi sulle pedane, ginocchia leggermente flesse (non iperestese). Busto eretto perpendicolare al suolo con curva lombare neutra.',
        executionSteps: [
          'Inizia la trazione retraendo e abbassando le scapole.',
          'Tira il triangolo verso l\'ombelico/basso addome, tenendo i gomiti vicini ai fianchi.',
          'A fine corsa, spingi il petto in fuori e contrai il dorso per 1 secondo.',
          'Rilascia il carico con controllo distendendo le braccia e permettendo alle scapole di aprirsi senza flettere la zona lombare in avanti.'
        ],
        keyTips: ['Non oscillare avanti e indietro col busto per darti slancio.', 'Immagina di voler toccare i due gomiti dietro la schiena.'],
        commonMistakes: ['Usare la schiena lombare a fionda.', 'Tirare la maniglia troppo in alto verso il collo anziché verso la pancia.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/GZbfZ033f74',
        videoTitle: 'Seated Cable Row (Pulley Basso) Tutorial',
        illustrationKey: 'seated_cable_row'
      },
      {
        id: 'g2_ex4',
        name: 'Rematore Manubri',
        category: 'Dorso',
        targetMuscles: ['Gran Dorsale', 'Trapezio', 'Romboidi', 'Bicipiti'],
        prescription: '3x12',
        setsCount: 3,
        defaultReps: 12,
        defaultRestSeconds: 75,
        gripType: 'Presa neutra (palmi rivolti verso l\'interno). Lavoro a busto flesso o singolo su panca.',
        setupDescription: 'Appoggia un ginocchio e una mano sulla panca per il massimo supporto lombare. L\'altro piede ben saldo a terra. Busto orizzontale o inclinato a 45°.',
        executionSteps: [
          'Manubrio nella mano libera con braccio disteso e scapola aperta.',
          'Tira il manubrio tracciando un arco verso l\'anca (non verso la spalla), guidando con il gomito verso l\'alto.',
          'Tieni il gomito aderente al busto e contrai il gran dorsale al picco.',
          'Abbassa il manubrio lentamente sentendo il gran dorsale che si allunga.'
        ],
        keyTips: ['Tira verso la tasca dei pantaloni per massimizzare il reclutamento del gran dorsale.', 'Testa allineata con la spina dorsale, non ruotare il collo.'],
        commonMistakes: ['Ruotare il busto per sollevare il peso barando.', 'Tirare il manubrio dritto verso il petto usando troppo il bicipite.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/roCP6wCXPqo',
        videoTitle: 'One Arm Dumbbell Row Tutorial',
        illustrationKey: 'dumbbell_row'
      },
      {
        id: 'g2_ex5',
        name: 'Curl Manubri',
        category: 'Bicipiti',
        targetMuscles: ['Bicipite Brachiale', 'Brachiale', 'Brachioradiale'],
        prescription: '3x10',
        setsCount: 3,
        defaultReps: 10,
        defaultRestSeconds: 60,
        gripType: 'Presa da neutra a supina con supinazione del polso in salita (palmi verso l\'alto).',
        setupDescription: 'In piedi o seduto su panca a 75-90°. Spalle basse e indietro, gomiti posizionati appena davanti ai fianchi.',
        executionSteps: [
          'Parti con i manubri ai lati del corpo in presa neutra.',
          'Solleva flettendo i gomiti e ruotando il polso verso l\'esterno (supinazione) mentre sali.',
          'Nel punto più alto strizza i bicipiti, mantenendo i gomiti bloccati fermi.',
          'Scendi con controllo in 2-3 secondi fino a completa estensione.'
        ],
        keyTips: ['La supinazione del polso (girare il mignolo verso l\'esterno al picco) attiva il bicipite al 100%.', 'Non mandare i gomiti in avanti per facilitare il carico.'],
        commonMistakes: ['Oscillare col bacino (cheating).', 'Gomiti che si muovono avanti e indietro scaricando il lavoro sui deltoidi anteriori.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/ykJmrZ5v0Oo',
        videoTitle: 'Dumbbell Bicep Curl Form',
        illustrationKey: 'dumbbell_curl'
      },
      {
        id: 'g2_ex6',
        name: 'Curl Cavo',
        category: 'Bicipiti',
        targetMuscles: ['Bicipite Brachiale (Tensione Continua)'],
        prescription: '3x12',
        setsCount: 3,
        defaultReps: 12,
        defaultRestSeconds: 60,
        gripType: 'Presa supina su sbarra dritta o sagomata EZ al cavo basso.',
        setupDescription: 'Aggancia la sbarra alla carrucola bassa. Posizionati a circa 30-40 cm dal macchinario con piedi alla larghezza delle spalle.',
        executionSteps: [
          'Impugna la sbarra con presa supina, braccia distese e gomiti fissati ai lati del tronco.',
          'Fletti gli avambracci portando la sbarra verso il petto espirando.',
          'Tensione costante: a differenza dei manubri, il cavo mantiene il bicipite sotto carico anche all\'inizio e alla fine del raggio di movimento.',
          'Ritorna lentamente alla posizione iniziale contrastando il richiamo del cavo.'
        ],
        keyTips: ['Mantieni la tensione continua senza fermarti a riposare in basso o in alto.', 'Polsi saldi e dritti.'],
        commonMistakes: ['Staccare i gomiti dai fianchi facendoli salire verso il soffitto.', 'Spalle che si chiudono in avanti.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/NFzTWp2qpiE',
        videoTitle: 'Cable Bicep Curl Tutorial',
        illustrationKey: 'cable_curl'
      },
      {
        id: 'g2_ex7',
        name: 'Crunch Classico + Crunch Inverso',
        category: 'Addome',
        targetMuscles: ['Retto dell\'Addome (Superiore e Inferiore)', 'Flessori dell\'anca'],
        prescription: '10 + 12 (in Superset, 3 serie)',
        isSuperset: true,
        supersetNote: 'Esegui 10 Crunch Classici, poi SUBITO 12 Crunch Inversi a terra. Riposa 60" tra le serie.',
        setsCount: 3,
        defaultReps: '10 + 12',
        defaultRestSeconds: 60,
        gripType: 'Mani alle tempie (senza tirare il collo) o braccia incrociate al petto per il classico; mani lungo i fianchi per l\'inverso.',
        setupDescription: 'Tappetino a terra. Per il classico, ginocchia piegate e piedi al suolo. Per l\'inverso, gambe sollevate a tavolino con ginocchia a 90°.',
        executionSteps: [
          'PARTE 1 (Crunch Classico x10): Espira e solleva le scapole dal suolo arricciando la gabbia toracica verso il bacino. Mantieni la zona lombare incollata al pavimento. Scendi sfiorando il tappetino.',
          'PARTE 2 (Crunch Inverso x12): Braccia ai fianchi a terra. Solleva il bacino di 5-10 cm dal suolo portando le ginocchia verso il petto con la forza dell\'addome inferiore, senza darti slancio con le gambe.',
          'Scendi lentamente con il bacino sul pavimento prima della ripetizione successiva.'
        ],
        keyTips: ['Non tirare assolutamente la testa con le mani per evitare contratture cervicali.', 'Nel crunch inverso il movimento è un rotolamento del bacino, non un calcio in aria.'],
        commonMistakes: ['Tirare il collo forzando il mento contro lo sterno.', 'Inarcare la schiena e staccare la zona lombare dal pavimento.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/Xyd_fa5zoEU',
        videoTitle: 'Standard Crunch & Reverse Crunch Form',
        illustrationKey: 'crunch_superset'
      },
      {
        id: 'g2_ex8',
        name: 'Plank',
        category: 'Addome',
        targetMuscles: ['Trasverso dell\'Addome', 'Retto Addominale', 'Quadrato dei lombi', 'Glutei'],
        prescription: '45"',
        isTimeBased: true,
        timeDurationSeconds: 45,
        setsCount: 1,
        defaultReps: '45 sec',
        defaultRestSeconds: 60,
        gripType: 'Avambracci poggiati a terra paralleli o mani unite a triangolo.',
        setupDescription: 'Posizione prona con appoggio su avambracci e punte dei piedi. Gomiti esattamente sotto le spalle.',
        executionSteps: [
          'Solleva il corpo formando una linea perfettamente dritta da testa a talloni.',
          'Attiva la retroversione del bacino: contrai glutei e addome come se dovessi ricevere un pugno allo stomaco.',
          'Spingi attivamente i gomiti contro il pavimento per evitare che le scapole "alino" (scapole protratte).',
          'Mantieni il respiro fluido e diaframmatico per tutti i 45 secondi.'
        ],
        keyTips: ['Meglio 45 secondi di tenuta perfetta e contratta che 2 minuti con la schiena che cede.', 'Sguardo rivolto al pavimento tra le mani.'],
        commonMistakes: ['Bacino che crolla verso il basso sovraccaricando i lombi.', 'Sedere troppo alto a "piramide" che scarica il lavoro.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/ASdvN_XEl_c',
        videoTitle: 'How to Hold a Perfect Plank',
        illustrationKey: 'plank'
      },
      {
        id: 'g2_ex9',
        name: 'Cardio: Ellittica',
        category: 'Cardio',
        targetMuscles: ['Cardiovascolare', 'Gambe e Glutei', 'Spalle e Braccia'],
        prescription: "5' Ellittica",
        isTimeBased: true,
        timeDurationSeconds: 300,
        setsCount: 1,
        defaultReps: '5 min',
        defaultRestSeconds: 30,
        gripType: 'Impugnatura salda sui manubri mobili sincronizzata con la pedalata.',
        setupDescription: 'Pedane ellittiche. Ottimo esercizio cardio a basso impatto articolare dopo il lavoro di schiena e core.',
        executionSteps: [
          'Posiziona i piedi al centro delle pedane con il peso distribuito sull\'intera pianta.',
          'Inizia la pedalata con movimento fluido spingendo e tirando i manubri.',
          'Mantieni un ritmo costante (120-140 passi al minuto) a intensità aerobica moderata per 5 minuti.'
        ],
        keyTips: ['Non staccare i talloni dalle pedane durante il movimento.', 'Usa attivamente le braccia per coinvolgere la parte superiore.'],
        commonMistakes: ['Appoggiarsi con tutto il peso sui manubri fissi.', 'Pedalare all\'indietro senza controllo.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/pEwZzZ042C0',
        videoTitle: 'Elliptical Trainer Workout Guide',
        illustrationKey: 'elliptical'
      },
      {
        id: 'g2_ex10',
        name: 'Cardio: Vogatore (Rowing)',
        category: 'Cardio',
        targetMuscles: ['Cardiovascolare', 'Catena Posteriore', 'Dorsali', 'Gambe e Core'],
        prescription: "5' Vogatore",
        isTimeBased: true,
        timeDurationSeconds: 300,
        setsCount: 1,
        defaultReps: '5 min',
        defaultRestSeconds: 0,
        gripType: 'Presa prona salda sull\'impugnatura, polsi rilassati e dritti.',
        setupDescription: 'Cinghie fermapiedi regolate sul collo del piede. Schiena dritta, resistenza su livello medio (4-6 sul damper del Concept2).',
        executionSteps: [
          'Sequenza di spinta ("Drive"): Gambe -> Busto (inclinazione a ore 1) -> Braccia (tira la barra al costato).',
          'Sequenza di ritorno ("Recovery"): Braccia distese -> Busto in avanti (ore 11) -> Gambe che flettono verso il carrello.',
          'Mantieni un colpo fluido e potente sulle gambe (il 60% della potenza viene dalle gambe!).'
        ],
        keyTips: ['Pensa: Gambe - Busto - Braccia in spinta; Braccia - Busto - Gambe in ritorno.', 'Ottima chiusura full-body per la giornata dorso/bicipiti.'],
        commonMistakes: ['Piegare le ginocchia prima che la sbarra abbia superato le ginocchia nel ritorno.', 'Tirare solo con le braccia senza usare le gambe.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/H0r_ZGSzN4Y',
        videoTitle: 'Rowing Machine Technique Guide',
        illustrationKey: 'rower'
      }
    ]
  },
  {
    id: 3,
    dayName: 'Venerdì',
    dayNumber: 5,
    title: 'Giorno 3: Gambe, Glutei & Polpacci',
    subtitle: 'Quadricipiti, Ischiocrurali, Glutei & Defaticamento',
    estimatedDuration: '65 - 75 min',
    accentColor: '#10b981',
    exercises: [
      {
        id: 'g3_ex1',
        name: 'Riscaldamento: Tappeto',
        category: 'Riscaldamento',
        targetMuscles: ['Cardiovascolare', 'Gambe e Glutei', 'Mobilità bacino e caviglie'],
        prescription: "10' Tappeto",
        isTimeBased: true,
        timeDurationSeconds: 600,
        setsCount: 1,
        defaultReps: '10 min',
        defaultRestSeconds: 60,
        gripType: 'Nessuna / Braccia libere',
        setupDescription: '10 minuti di camminata a passo spedito con pendenza progressiva (3-6%) per irrorare le grandi masse muscolari delle gambe (quadricipiti, femorali e polpacci).',
        executionSteps: [
          'Inizia a pendenza 1% e velocità 5 km/h.',
          'Dal 3° minuto aumenta la pendenza al 4-5% per stimolare glutei e polpacci.',
          'Esegui passi decisi con appoggio sicuro della pianta del piede.'
        ],
        keyTips: ['Camminare in salita attiva glutei e ischiocrurali senza impatto traumatico sulle ginocchia.', 'Prepara la mente all\'allenamento gambe.'],
        commonMistakes: ['Tenersi saldamente al monitor alterando la postura.', 'Pendenza troppo elevata con passo ciondolante.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/5UMCR8-hQJk',
        videoTitle: 'Leg Day Warmup Treadmill',
        illustrationKey: 'treadmill'
      },
      {
        id: 'g3_ex2',
        name: 'Leg Press',
        category: 'Gambe',
        targetMuscles: ['Quadricipiti', 'Glutei', 'Femorali', 'Adduttori'],
        prescription: '3x8',
        setsCount: 3,
        defaultReps: 8,
        defaultRestSeconds: 90,
        gripType: 'Mani sulle maniglie laterali per ancorare saldamente il bacino e i glutei allo schienale.',
        setupDescription: 'Posiziona i piedi a larghezza spalle al centro della pedana, punte leggermente aperte a 15-30°. Schiena e glutei completamente incollati al sedile.',
        executionSteps: [
          'Sblocca la sicura con le gambe estese (senza serrare le ginocchia a blocco articolare).',
          'Scendi con controllo inspirando fino a portare le cosce ad almeno 90° rispetto alle ginocchia (o poco più giù, finché il bacino non tende a staccarsi dallo schienale).',
          'Spingi via la pedana premendo con tutta la pianta del piede ed espirando con forza.',
          'Fermati poco prima del blocco totale delle ginocchia per mantenere la tensione costante sul quadricipite.'
        ],
        keyTips: ['MAI bloccare a scatto le ginocchia a fine corsa per non gravare sulle articolazioni.', 'Non staccare mai l\'osso sacro dallo schienale (evita il "butt wink").'],
        commonMistakes: ['Ginocchia che collassano verso l\'interno (valgismo) durante la spinta.', 'Scendere troppo poco (mezze ripetizioni) o staccare il sedere dal sedile.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/IZxyjW7MPJQ',
        videoTitle: 'Leg Press Technique & Common Mistakes',
        illustrationKey: 'leg_press'
      },
      {
        id: 'g3_ex3',
        name: 'Leg Extension',
        category: 'Gambe',
        targetMuscles: ['Quadricipiti (Retto Femorale e Vasti)'],
        prescription: '3x10',
        setsCount: 3,
        defaultReps: 10,
        defaultRestSeconds: 75,
        gripType: 'Mani sulle maniglie laterali, tirando verso l\'alto per bloccare i glutei sul sedile.',
        setupDescription: 'Regola lo schienale in modo che il punto di rotazione del macchinario coincida con l\'articolazione del ginocchio. Il cuscinetto deve poggiare sulla parte bassa dello stinco, appena sopra le caviglie.',
        executionSteps: [
          'Siediti con schiena aderente e impugna saldamente le maniglie laterali.',
          'Estendi le gambe fino alla completa estensione, contraendo al massimo i quadricipiti.',
          'Mantieni la contrazione di picco per 1 secondo pieno in alto.',
          'Scendi lentamente in 2-3 secondi controllando il carico prima che il pacco pesi tocchi il fondo.'
        ],
        keyTips: ['Punta i piedi leggermente a martello per una tensione ottimale sui quadricipiti.', 'Controlla la discesa: non far cadere il peso.'],
        commonMistakes: ['Darsi lo slancio sollevando il bacino dalla seduta.', 'Regolazione errata con il cuscinetto sopra il piede o a metà tibia.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/YyvSfVjQeL0',
        videoTitle: 'Leg Extension Proper Form Tutorial',
        illustrationKey: 'leg_extension'
      },
      {
        id: 'g3_ex4',
        name: 'Leg Curl',
        category: 'Gambe',
        targetMuscles: ['Ischiocrurali (Bicipite Femorale, Semitendinoso, Semimembranoso)'],
        prescription: '3x12',
        setsCount: 3,
        defaultReps: 12,
        defaultRestSeconds: 75,
        gripType: 'Mani sulle impugnature dedicate per stabilizzare il corpo.',
        setupDescription: 'Da sdraiato (o seduto a seconda della macchina in palestra). Cuscinetto posizionato subito sotto i polpacci/sopra il tendine d\'Achille.',
        executionSteps: [
          'Ginocchia allineate con l\'asse di rotazione della macchina.',
          'Fletti le gambe portando i talloni verso i glutei con decisione.',
          'Strizza i femorali a fine corsa per 1 secondo.',
          'Ritorna lentamente alla posizione distesa, fermandoti prima di perdere la tensione muscolare.'
        ],
        keyTips: ['Mantieni il bacino ben premuto contro il cuscino (evita di inarcare la schiena se sei sul leg curl sdraiato).', 'Movimento fluido e controllato.'],
        commonMistakes: ['Sollevare il bacino dalla panca con colpo di reni.', 'Movimento troppo rapido con rimbalzo del carico.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/1Tq3QdYUuHs',
        videoTitle: 'Lying / Seated Leg Curl Guide',
        illustrationKey: 'leg_curl'
      },
      {
        id: 'g3_ex5',
        name: 'Affondi con Manubri',
        category: 'Gambe',
        targetMuscles: ['Quadricipiti', 'Glutei', 'Polpacci e Core (Equilibrio)'],
        prescription: '3x12',
        setsCount: 3,
        defaultReps: 12,
        defaultRestSeconds: 90,
        gripType: 'Due manubri lungo i fianchi con presa neutra salda.',
        setupDescription: 'In piedi con postura eretta, manubri lungo i fianchi, piedi alla larghezza delle anche. Spazio libero davanti o sul posto.',
        executionSteps: [
          'Fai un passo lungo in avanti appoggiando bene il tallone.',
          'Scendi flettendo entrambe le ginocchia fino a circa 90°: il ginocchio posteriore deve quasi sfiorare il pavimento.',
          'Il ginocchio anteriore deve rimanere in linea con la caviglia e il secondo dito del piede (non collassare all\'interno).',
          'Spingi con il tallone anteriore per risalire alla posizione iniziale ed esegui con l\'altra gamba (12 reps totali o per gamba).'
        ],
        keyTips: ['Busto perpendicolare al pavimento con addome attivo per mantenere l\'equilibrio.', 'Non fare passi troppo corti per non sovraccaricare il tendine rotuleo.'],
        commonMistakes: ['Ginocchio anteriore che va troppo avanti oltre la punta con tallone sollevato.', 'Perdita di equilibrio per piedi troppo allineati su una fune anziché su due binari.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/D7KaRcUTQeE',
        videoTitle: 'Dumbbell Walking / Stationary Lunges',
        illustrationKey: 'lunges'
      },
      {
        id: 'g3_ex6',
        name: 'Squat Sumo con Manubrio',
        category: 'Gambe',
        targetMuscles: ['Glutei', 'Adduttori (Interno Coscia)', 'Quadricipiti', 'Femorali'],
        prescription: '3x15',
        setsCount: 3,
        defaultReps: 15,
        defaultRestSeconds: 75,
        gripType: 'Unico manubrio pesante tenuto a due mani per la testa superiore o con presa a coppa ("Goblet/Sumo").',
        setupDescription: 'Stance molto larga (circa 1.5 volte la larghezza spalle), punte dei piedi ruotate verso l\'esterno a 45°. Manubrio tenuto sospeso tra le gambe.',
        executionSteps: [
          'Inizia il movimento aprendo le ginocchia in direzione delle punte dei piedi.',
          'Scendi spingendo il bacino indietro e verso il basso, mantenendo il torace aperto e fiero.',
          'Scendi finché il manubrio non sfiora quasi il suolo (o fino a cosce parallele al pavimento).',
          'Spingi con i talloni e l\'interno coscia contraendo energicamente i glutei quando torni in posizione eretta.'
        ],
        keyTips: ['Mantieni sempre le ginocchia orientate verso l\'esterno lungo la direzione delle dita dei piedi.', 'La schiena rimane compatta con petto alto.'],
        commonMistakes: ['Chiudere le ginocchia verso l\'interno nella risalita.', 'Piegare la schiena in avanti anziché flettere le anche e le ginocchia.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/9ZuDXYJ6B0c',
        videoTitle: 'Sumo Goblet Squat Tutorial',
        illustrationKey: 'sumo_squat'
      },
      {
        id: 'g3_ex7',
        name: 'Calf alla Macchina Squat',
        category: 'Polpacci',
        targetMuscles: ['Gastrocnemio (Gemelli)', 'Soleo'],
        prescription: '4x15',
        setsCount: 4,
        defaultReps: 15,
        defaultRestSeconds: 60,
        gripType: 'Cuscini sulle spalle (alla Calf machine in piedi o alla multipower/squat machine).',
        setupDescription: 'Avampiedi posizionati sul bordo del gradino/pedana con i talloni liberi nel vuoto. Ginocchia quasi completamente estese (non flesse).',
        executionSteps: [
          'Scendi lentamente con i talloni sotto il livello del gradino per ottenere il massimo allungamento del polpaccio.',
          'Mantieni l\'allungamento per 1 secondo in basso.',
          'Spingi con l\'avampiede sollevandoti sulla punta delle dita il più in alto possibile.',
          'Trattieni la massima contrazione in cima per 1 secondo pieno prima di ridiscendere.'
        ],
        keyTips: ['Evita il rimbalzo elastico: la pausa in basso e in alto costringe il muscolo a lavorare senza l\'aiuto del tendine d\'Achille.', 'Spinta centrata tra alluce e secondo dito.'],
        commonMistakes: ['Rimbalzare velocemente usando il riflesso tendineo anziché la contrazione muscolare.', 'Piegare le ginocchia trasformando il movimento in uno squat.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/gwLzBJYoWlI',
        videoTitle: 'Standing Calf Raise Proper Technique',
        illustrationKey: 'calf_machine'
      },
      {
        id: 'g3_ex8',
        name: 'Defaticamento: Cyclette',
        category: 'Defaticamento',
        targetMuscles: ['Cardiovascolare', 'Gambe', 'Recupero e smaltimento metabolico'],
        prescription: "10' Cyclette",
        isTimeBased: true,
        timeDurationSeconds: 600,
        setsCount: 1,
        defaultReps: '10 min',
        defaultRestSeconds: 0,
        gripType: 'Mani rilassate sul manubrio con spalle morbide.',
        setupDescription: '10 minuti di pedalata fluida per favorire il recupero muscolare dopo gli esercizi delle gambe e facilitare il ritorno venoso.',
        executionSteps: [
          'Pedala a resistenza minima con cadenza agile (80-90 giri al minuto).',
          'Rilassa la muscolatura delle gambe ad ogni pedalata.',
          'Termina con respirazioni lente e profonde per completare l\'allenamento.'
        ],
        keyTips: ['Pedalata agile e sciolta: l\'obiettivo è il recupero attivo, non affaticare ulteriormente le gambe.', 'Bevi acqua a piccoli sorsi per reidratarti.'],
        commonMistakes: ['Pedalare a resistenza dura.', 'Fermarsi all\'improvviso senza fase di raffreddamento.'],
        videoTutorialUrl: 'https://www.youtube-nocookie.com/embed/q3mZ45xMYKQ',
        videoTitle: 'Leg Day Cool Down Bike Routine',
        illustrationKey: 'bike'
      }
    ]
  }
];

export function getTodayWorkoutDayId(): DayOfWeekId {
  const day = new Date().getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
  if (day === 1) return 1; // Lunedì
  if (day === 3) return 2; // Mercoledì
  if (day === 5) return 3; // Venerdì
  // If today is a rest day (Tuesday, Thursday, Saturday, Sunday), default to closest or Monday
  if (day === 2) return 2; // Martedì -> prossimo è Mercoledì
  if (day === 4) return 3; // Giovedì -> prossimo è Venerdì
  return 1; // Sabato/Domenica/Altro -> prossimo è Lunedì
}

export function isActualWorkoutDay(): { isWorkoutDay: boolean; dayName: string; workoutDayId?: DayOfWeekId } {
  const day = new Date().getDay();
  const dayNames = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  const currentDayName = dayNames[day];
  
  if (day === 1) return { isWorkoutDay: true, dayName: currentDayName, workoutDayId: 1 };
  if (day === 3) return { isWorkoutDay: true, dayName: currentDayName, workoutDayId: 2 };
  if (day === 5) return { isWorkoutDay: true, dayName: currentDayName, workoutDayId: 3 };

  return { isWorkoutDay: false, dayName: currentDayName };
}

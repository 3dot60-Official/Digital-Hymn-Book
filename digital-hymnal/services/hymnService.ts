import { Hymn, Category, Language } from '../types';

const audioSources = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
];

const mockHymns: Hymn[] = [
  {
    id: 1, number: 22, title: { [Language.English]: "Blessed Jesus at Thy Word", [Language.Afrikaans]: "Geseënde Jesus by U Woord", [Language.Zulu]: "Ujesu Othandekayo Ezwini Lakho" }, category: Category.Songs,
    lyrics: {
      [Language.English]: `1. Blessed Jesus, at Thy Word\nWe are gathered all to hear Thee;\nLet our hearts and souls be stirred\nNow to seek and love and fear Thee,\nBy Thy teachings sweet and holy,\nDrawn from earth to love Thee solely.\n\n2. All our knowledge, sense, and sight\nLie in deepest darkness shrouded,\nTill Thy Spirit breaks our night\nWith the beams of truth unclouded;\nThou alone to God canst win us;\nThou must work all good within us.`,
      [Language.Afrikaans]: `1. Geseënde Jesus, by U Woord\nIs ons almal hier vergader;\nLaat ons hart en siel verhoord\nU nou soek, bemin en vrees, Heer.\nDeur U lering, soet en heilig,\nVan die aardse losgemaak, U alleen liefhê.`,
      [Language.Zulu]: `1. Ujesu Othandekayo, Ezwini Lakho\nSibuthene sonke ukuzokuzwa;\nMakuvuswe izinhliziyo nemiphefumulo yethu\nManje ukufuna nokukuthanda nokukwesaba,\nNgezimfundiso zakho ezimnandi nezingcwele,\nSidonswe emhlabeni ukuba sikuthande Wena wedwa.`
    },
    audioUrl: audioSources[0], createdAt: "2023-01-10T10:00:00Z",
  },
  {
    id: 2, number: 23, title: { [Language.English]: "God Himself is Present" }, category: Category.Songs,
    lyrics: { [Language.English]: `1. God Himself is present:\nLet us now adore Him,\nAnd with awe appear before Him.\nGod is in His temple,\nall within keep silence,\nProstrate lie with deepest reverence.\nHim alone God we own,\nHim our God and Savior;\nPraise His name for ever.` },
    audioUrl: audioSources[1], createdAt: "2023-01-11T10:00:00Z",
  },
  {
    id: 3, number: 24, title: { [Language.English]: "O Holy Spirit, Enter In" }, category: Category.Songs,
    lyrics: { [Language.English]: `1. O Holy Spirit, enter in,\nAnd in our hearts Thy work begin,\nThy temple deign to make us;\nSun of the soul, Thou Light divine,\nAround and in us brightly shine,\nTo joy and gladness wake us.\nThat we to Thee truly living,\nTo Thee giving prayer unceasing,\nMay in love be still increasing.` },
    audioUrl: audioSources[2], createdAt: "2023-01-12T10:00:00Z",
  },
  {
    id: 4, number: 25, title: { [Language.English]: "Open Now Thy Gates of Beauty" }, category: Category.Songs,
    lyrics: { [Language.English]: `1. Open now thy gates of beauty,\nZion, let me enter there,\nWhere my soul in joyful duty\nWaits for Him Who answers prayer.\nOh, how blessed is this place,\nFilled with solace, light and grace!` },
    audioUrl: audioSources[3], createdAt: "2023-01-13T10:00:00Z",
  },
  {
    id: 5, number: 26, title: { [Language.English]: "We Gather Together" }, category: Category.Songs,
    lyrics: { [Language.English]: `1. We gather together to ask the Lord’s blessing;\nHe chastens and hastens His will to make known.\nThe wicked oppressing now cease from distressing.\nSing praises to His Name; He forgets not His own.` },
    audioUrl: audioSources[0], createdAt: "2023-01-14T10:00:00Z",
  },
  {
    id: 6, number: 27, title: { [Language.English]: "Abide, O Dearest Jesus" }, category: Category.Songs,
    lyrics: { [Language.English]: `1. Abide, O dearest Jesus,\nAmong us with Thy grace,\nThat Satan may not harm us,\nNor we to sin give place.` },
    audioUrl: audioSources[1], createdAt: "2023-01-15T10:00:00Z",
  },
  {
    id: 7, number: 28, title: { [Language.English]: "In Peace and Joy I Now Depart" }, category: Category.Songs,
    lyrics: { [Language.English]: `1. In peace and joy I now depart\nAt God’s disposing;\nFor full of comfort is my heart,\nSoft reposing.\nSo the Lord hath promised me,\nAnd death is but a slumber.` },
    audioUrl: audioSources[2], createdAt: "2023-01-16T10:00:00Z",
  },
  {
    id: 8, number: 31, title: { [Language.English]: "Come, Thou Long-Expected Jesus" }, category: Category.Advent,
    lyrics: { [Language.English]: `1. Come, Thou long expected Jesus\nBorn to set Thy people free;\nFrom our fears and sins release us,\nLet us find our rest in Thee.\nIsrael’s strength and consolation,\nHope of all the earth Thou art,\nDear desire of every nation,\nJoy of every longing heart.` },
    audioUrl: audioSources[3], createdAt: "2023-01-17T10:00:00Z",
  },
  {
    id: 9, number: 32, title: { [Language.English]: "Comfort, Comfort Ye My People" }, category: Category.Advent,
    lyrics: { [Language.English]: `1. Comfort, comfort ye My people,\nSpeak ye peace, thus saith our God;\nComfort those who sit in darkness,\nMourning ’neath their sorrow’s load;\nSpeak ye to Jerusalem\nOf the peace that waits for them;\nTell her that her sins I cover,\nAnd her warfare now is over.` },
    audioUrl: audioSources[0], createdAt: "2023-01-18T10:00:00Z",
  },
  {
    id: 10, number: 61, title: { [Language.English]: "Joy to the World", [Language.Afrikaans]: "Vreugde vir die Wêreld", [Language.Zulu]: "Intokozo Ezweni Lonke" }, category: Category.Christmas,
    lyrics: {
      [Language.English]: `1. Joy to the world, the Lord is come!\nLet earth receive her King;\nLet every heart prepare Him room,\nAnd heaven and nature sing,\nAnd heaven and nature sing,\nAnd heaven, and heaven, and nature sing.\n\n2. Joy to the earth, the Savior reigns!\nLet men their songs employ;\nWhile fields and floods, rocks, hills and plains\nRepeat the sounding joy,\nRepeat the sounding joy,\nRepeat, repeat, the sounding joy.`,
      [Language.Afrikaans]: `1. Vreugde vir die wêreld, die Heer het gekom!\nLaat die aarde haar Koning ontvang;\nLaat elke hart vir Hom plek voorberei,\nEn hemel en natuur sing,\nEn hemel en natuur sing,\nEn hemel, en hemel, en natuur sing.`,
      [Language.Zulu]: `1. Intokozo emhlabeni, iNkosi ifikile!\nUmhlaba mawamukele iNkosi yawo;\nYonke inhliziyo mayilungise indawo yaYo,\nNezulu nemvelo kuhlabelele,\nNezulu nemvelo kuhlabelele,\nNezulu, nezulu, nemvelo kuhlabelele.`
    },
    audioUrl: audioSources[1], createdAt: "2023-01-19T10:00:00Z",
  },
  {
    id: 11, number: 68, title: { [Language.English]: "Silent Night" }, category: Category.Christmas,
    lyrics: { [Language.English]: `1. Silent night, holy night,\nAll is calm, all is bright\nRound yon Virgin Mother and Child.\nHoly Infant so tender and mild,\nSleep in heavenly peace,\nSleep in heavenly peace.` },
    audioUrl: audioSources[2], createdAt: "2023-01-20T10:00:00Z",
  },
  {
    id: 12, number: 85, title: { [Language.English]: "A Lamb Goes Uncomplaining Forth" }, category: Category.LentAndCross,
    lyrics: { [Language.English]: `1. A Lamb goes uncomplaining forth,\nThe guilt of all men bearing;\nAnd laden with the sins of earth,\nNone else the burden sharing!\nGoes patient on, grow weak and faint,\nTo slaughter led without complaint,\nThat spotless life to offer;` },
    audioUrl: audioSources[3], createdAt: "2023-01-21T10:00:00Z",
  },
  {
    id: 13, number: 106, title: { [Language.English]: "Christ the Lord Is Risen Today" }, category: Category.EasterAndAscension,
    lyrics: { [Language.English]: `1. Christ the Lord is risen today, Alleluia!\nSons of men and angels say, Alleluia!\nRaise your joys and triumphs high, Alleluia!\nSing, ye heavens, and earth reply, Alleluia!` },
    audioUrl: audioSources[0], createdAt: "2023-01-22T10:00:00Z",
  },
  {
    id: 14, number: 127, title: { [Language.English]: "A Mighty Fortress Is Our God" }, category: Category.Special,
    lyrics: { [Language.English]: `1. A mighty fortress is our God,\nA bulwark never failing;\nOur helper He, amid the flood\nOf mortal ills prevailing:\nFor still our ancient foe\nDoth seek to work us woe;\nHis craft and power are great,\nAnd, armed with cruel hate,\nOn earth is not his equal.` },
    audioUrl: audioSources[1], createdAt: "2023-01-23T10:00:00Z",
  },
  {
    id: 15, number: 192, title: { [Language.English]: "Amazing Grace", [Language.Afrikaans]: "Genade Onbeskryflik Groot", [Language.Zulu]: "Umusa Omangalisayo" }, category: Category.LentAndCross,
    lyrics: {
      [Language.English]: `1. Amazing grace! How sweet the sound\nThat saved a wretch like me!\nI once was lost, but now am found;\nWas blind, but now I see.\n\n2. ’Twas grace that taught my heart to fear,\nAnd grace my fears relieved;\nHow precious did that grace appear\nThe hour I first believed.`,
      [Language.Afrikaans]: `1. Genade onbeskryflik groot,\nhet my ook vrygekoop.\nEk was verlore, en is gevind,\nwas blind, maar nou kan ek sien.\n\n2. Genade het my hart geleer\nom God te vrees, te eer.\nHoe kosbaar is die reëlings nou\ndie uur toe ek begin vertrou.`,
      [Language.Zulu]: `1. Umusa omangalisayo! Yeka umsindo omnandi,\nOwasindisa isoni esinjengami!\nNgangilahlekile, kodwa manje ngitholakele,\nNgangiyimpumputhe, kodwa manje sengiyabona.\n\n2. Kwakungumusa owafundisa inhliziyo yami ukwesaba,\nFuthi umusa wakhulula ukwesaba kwami;\nYeka ukuthi wawuyigugu kangakanani lowomusa\nNgesikhathi ngiqala ukukholwa.`
    },
    audioUrl: audioSources[2], createdAt: "2023-01-24T10:00:00Z",
  },
  {
    id: 16, number: 193, title: { [Language.English]: "Be Still, My Soul" }, category: Category.LentAndCross,
    lyrics: { [Language.English]: `1. Be still, my soul: the Lord is on thy side.\nBear patiently the cross of grief or pain.\nLeave to thy God to order and provide;\nIn every change, He faithful will remain.\nBe still, my soul: thy best, thy heavenly Friend\nThrough thorny ways leads to a joyful end.` },
    audioUrl: audioSources[3], createdAt: "2023-01-25T10:00:00Z",
  },
  {
    id: 17, number: 224, title: { [Language.English]: "Come, Thou Fount of Every Blessing" }, category: Category.Worship,
    lyrics: { [Language.English]: `1. Come, Thou Fount of every blessing,\nTune my heart to sing Thy grace;\nStreams of mercy, never ceasing,\nCall for songs of loudest praise.\nTeach me some melodious sonnet,\nSung by flaming tongues above.\nPraise the mount! I’m fixed upon it,\nMount of Thy redeeming love.` },
    audioUrl: audioSources[0], createdAt: "2023-01-26T10:00:00Z",
  },
  {
    id: 18, number: 250, title: { [Language.English]: "All Creatures of Our God and King" }, category: Category.Praise,
    lyrics: { [Language.English]: `1. All creatures of our God and King\nLift up your voice and with us sing,\nAlleluia! Alleluia!\nThou burning sun with golden beam,\nThou silver moon with softer gleam!\nO praise Him! O praise Him!\nAlleluia! Alleluia! Alleluia!` },
    audioUrl: audioSources[1], createdAt: "2023-01-27T10:00:00Z",
  },
  {
    id: 19, number: 261, title: { [Language.English]: "Praise to the Lord, the Almighty" }, category: Category.Praise,
    lyrics: { [Language.English]: `1. Praise to the Lord, the Almighty, the King of creation!\nO my soul, praise Him, for He is thy health and salvation!\nAll ye who hear, Now to His temple draw near;\nPraise Him in glad adoration.` },
    audioUrl: audioSources[2], createdAt: "2023-01-28T10:00:00Z",
  },
  {
    id: 20, number: 275, title: { [Language.English]: "How Firm a Foundation" }, category: Category.Guidance,
    lyrics: { [Language.English]: `1. How firm a foundation, ye saints of the Lord,\nIs laid for your faith in His excellent Word!\nWhat more can He say than to you He hath said,\nYou, who unto Jesus for refuge have fled?` },
    audioUrl: audioSources[3], createdAt: "2023-01-29T10:00:00Z",
  },
];

// Simulate API call with a delay
const simulateFetch = <T,>(data: T): Promise<T> => {
  return new Promise(resolve => setTimeout(() => resolve(data), 500));
};

export const hymnService = {
  getAllHymns: async (): Promise<Hymn[]> => {
    return simulateFetch([...mockHymns].sort((a, b) => a.number - b.number));
  },
  getHymnById: async (id: number): Promise<Hymn | undefined> => {
    const hymn = mockHymns.find(h => h.id === id);
    return simulateFetch(hymn);
  },
  getRecentHymns: async (count: number): Promise<Hymn[]> => {
    const sorted = [...mockHymns].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return simulateFetch(sorted.slice(0, count));
  }
};
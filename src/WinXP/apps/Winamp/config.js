// from Webamp demo

const album = "Vlads' album";
const baseUrl =
  'https://raw.githubusercontent.com/vladkalyuzhny/vladkalyuzhny.github.io/site/music';

const makeUrl = fileName => `${baseUrl}/${encodeURIComponent(fileName)}`;

export const initialTracks = [
  {
    url: makeUrl('Diablo Swing Orchestra - Heroines.mp3'),
    duration: 322, // 5:22
    metaData: {
      title: 'Heroines',
      artist: 'Diablo Swing Orchestra',
      album,
    },
  },
  {
    url: makeUrl('The Prodigy - Spitfire (Original Mix).mp3'),
    duration: 206, // 3:26
    metaData: {
      title: 'Spitfire (Original Mix)',
      artist: 'The Prodigy',
      album,
    },
  },
  {
    url: makeUrl('Gorillaz - On Melancholy Hill.mp3'),
    duration: 233, // 3:53
    metaData: {
      title: 'On Melancholy Hill',
      artist: 'Gorillaz',
      album,
    },
  },
  {
    url: makeUrl('Scorpions - Humanity.mp3'),
    duration: 326, // 5:26
    metaData: {
      title: 'Humanity',
      artist: 'Scorpions',
      album,
    },
  },
  {
    url: makeUrl('Avenged Sevenfold - Hail To The King.mp3'),
    duration: 305, // 5:05
    metaData: {
      title: 'Hail To The King',
      artist: 'Avenged Sevenfold',
      album,
    },
  },
  {
    url: makeUrl('Bring Me The Horizon - Can You Feel My Heart.mp3'),
    duration: 227, // 3:47
    metaData: {
      title: 'Can You Feel My Heart',
      artist: 'Bring Me The Horizon',
      album,
    },
  },
  {
    url: makeUrl('Muse - Time Is Running Out.mp3'),
    duration: 236, // 3:56
    metaData: {
      title: 'Time Is Running Out',
      artist: 'Muse',
      album,
    },
  },
  {
    url: makeUrl('System Of A Down - B.Y.O.B..mp3'),
    duration: 255, // 4:15
    metaData: {
      title: 'B.Y.O.B.',
      artist: 'System Of A Down',
      album,
    },
  },
  {
    url: makeUrl('Papa Roach - Last Resort.mp3'),
    duration: 200, // 3:20
    metaData: {
      title: 'Last Resort',
      artist: 'Papa Roach',
      album,
    },
  },
  {
    url: makeUrl("Linkin Park - What I've Done.mp3"),
    duration: 205, // 3:25
    metaData: {
      title: "What I've Done",
      artist: 'Linkin Park',
      album,
    },
  },
];

export const albumSongData = [
  {
    number: 1,
    imageSrc: "/album.png",
    artist: "Tyler, The Creator",
    title: "November",
    plays: "29,293,230",
    explicit: true,
    duration: "3:10",
  },
  {
    number: 2,
    imageSrc: "/album.png",
    artist: "Tyler, The Creator",
    title: "See You Again",
    plays: "1,029,293,230",
    explicit: false,
    duration: "4:20",
  },
  {
    number: 3,
    imageSrc: "/album.png",
    artist: "Tyler, The Creator",
    title: "Potato Salad",
    plays: "1,129,293,230",
    explicit: true,
    duration: "5:10",
  },
];

export const playlistSongData = [
  {
    number: 1,
    title: "14",
    imageSrc: "/playlist.png",
    artist: "Gbenga",
    album: "14",
    dateAdded: "May 5, 2024",
    duration: "1:45",
    explicit: true,
  },
  {
    number: 2,
    title: "AKA",
    imageSrc: "/playlist.png",
    artist: "Namani",
    album: "TEXT LANGUAGE",
    dateAdded: "Dec 2, 2023",
    duration: "2:50",
    explicit: true,
  },
  {
    number: 3,
    title: "bad em up",
    imageSrc: "/playlist.png",
    artist: "oakland",
    album: "oakland refix vol. 2",
    dateAdded: "June 1, 2024",
    duration: "2:35",
    explicit: true,
  },
];

export const artists = [
  {
    name: "Kendrick Lamar",
    imageSrc: "/kendrick.png",
  },
  {
    name: "Tyler, The Creator",
    imageSrc: "/tyler.png",
  },
  {
    name: "Freddie Gibbs",
    imageSrc: "/freddie.png",
  },
];

export const albums = [
  {
    id: "kxjsnxoiewnce",
    name: "Flower Boy",
    imageSrc: "/album.png",
    artist: "Tyler, The Creator",
  },
  {
    id: "bakuenciepanxxa",
    name: "To Pimp A Butterfly",
    imageSrc: "/album.png",
    artist: "Kendrick Lamar",
  },
  {
    id: "kaiienceocjmwwam",
    name: "Free Fallin'",
    imageSrc: "/album.png",
    artist: "Amaria",
  },
];

export const playlists = [
  {
    id: "kxksjsnxknakjsxa",
    name: "Chilled UK Rap",
    imageSrc: "/playlist.png",
    creator: "insomniac",
  },
  {
    id: "ooqnqxpsdocoji",
    name: "$trictly Rap",
    imageSrc: "/playlist.png",
    creator: "insomniac",
  },
  {
    id: "xsowncosabcrem",
    name: "Rhythm & Bliss",
    imageSrc: "/playlist.png",
    creator: "insomniac",
  },
];

export const homeTabs = [
  {
    image: "/liked.jpg",
    name: "Liked Songs",
    href: "/playlist/liked-songs",
  },
  {
    image: "/flowerboy.png",
    name: "Flower Boy",
    href: `/album/${albums[0].id}`,
  },
  {
    image: "/playlist.png",
    name: "Rhythm & Bliss",
    href: `/playlist/${playlists[2].id}`,
  },
];

export const songs = [
  {
    title: "November",
    imageSrc: "/album.png",
    artist: "Tyler, The Creator",
  },
  {
    title: "Alright",
    imageSrc: "/album.png",
    artist: "Kendrick Lamar",
  },
  {
    title: "Crime Pays",
    imageSrc: "/album.png",
    artist: "Freddie Gibbs",
  },
  {
    title: "Life of a Party",
    imageSrc: "/album.png",
    artist: "Kanye West",
  },
  {
    title: "Where It's At",
    imageSrc: "/album.png",
    artist: "Joey Bada$$",
  },
];

export const oneSong = [
  {
    title: "November",
    imageSrc: "/album.png",
    artist: "Tyler, The Creator",
  },
];

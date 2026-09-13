import { ShowcaseMediaType } from '@backend/common/contracts';
import type { MediaModalItem } from './useMediaDetailModalStore';

export interface SimilarMediaItem {
  id?: string;
  title: string;
  posterUrl: string;
  type: ShowcaseMediaType;
  rating?: number;
  releaseYear?: number;
  subtitle?: string;
}

export interface MediaDetailPayload {
  title: string;
  subtitle: string;
  rank: number;
  miniPosterUrl: string;
  bannerUrl?: string;
  videoUrl: string;
  videoDuration: string;
  videoThumbnail: string;
  screenshots: string[];
  description: string;
  platformButton: {
    label: string;
    type:
      | 'steam'
      | 'riot'
      | 'battlenet'
      | 'epic'
      | 'minecraft'
      | 'roblox'
      | 'anilist'
      | 'tmdb'
      | 'crunchyroll'
      | 'netflix'
      | 'web'
      | 'myanimelist'
      | 'mal'
      | 'imdb';
    url: string;
  };
  reviews: {
    recentReviews?: {
      label: string;
      count: string;
      tone: 'mixed' | 'positive' | 'mostly-positive' | 'overwhelmingly-positive';
    };
    languageReviews?: {
      label: string;
      language: string;
      count: string;
      tone: 'mixed' | 'positive' | 'mostly-positive' | 'overwhelmingly-positive';
    };
    openCritic?: {
      tier: 'MIGHTY' | 'STRONG' | 'FAIR' | 'TOP 100';
      score: number;
    };
    metacritic?: number;
    userScore?: number;
  };
  details: {
    genres: string;
    publisher: string;
    developer: string;
    releaseDate: string;
    platform: string;
    socialLinks: {
      web?: string;
      facebook?: string;
      twitter?: string;
      instagram?: string;
      youtube?: string;
      reddit?: string;
      twitch?: string;
    };
    metadataSource: {
      name: string;
      url: string;
    };
    developerClaimUrl?: string;
  };
  similarItems: SimilarMediaItem[];
}

export const CURATED_MEDIA_CATALOG: Record<string, MediaDetailPayload> = {
  'dota 2': {
    title: 'Dota 2',
    subtitle: 'Strategy, MOBA',
    rank: 18,
    miniPosterUrl: '/icons/brands/dota2.png',
    bannerUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256692021/movie480.mp4',
    videoDuration: '1:52',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/ss_ad8eee787704745ccdecdfde3a5cd2733704898d.1920x1080.jpg?t=1769535998',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/ss_7ab506679d42bfc0c0e40639887176494e0466d9.1920x1080.jpg?t=1769535998',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/ss_c9118375a2400278590f29a3537769c986ef6e39.1920x1080.jpg?t=1769535998',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/ss_f9ebafedaf2d5cfb80ef1f74baa18eb08cad6494.1920x1080.jpg?t=1769535998',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/ss_27b6345f22243bd6b885cc64c5cda74e4bd9c3e8.1920x1080.jpg?t=1769535998',
    ],
    description:
      'Dota 2 is a multiplayer online battle arena video game and the stand-alone sequel to the Defense of the Ancients (DotA) mod. With regular updates that ensure a constant evolution of gameplay, features, and heroes, Dota 2 has taken on a life of its own.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/570/Dota_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Mixed (23 279)',
        tone: 'mixed',
      },
      languageReviews: {
        label: 'English Language Reviews',
        language: 'English',
        count: 'Very Positive (836 854)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 90,
      },
    },
    details: {
      genres: 'Strategy, MOBA',
      publisher: 'Valve',
      developer: 'Valve',
      releaseDate: 'July 9, 2013',
      platform: 'PC (Windows, macOS, Linux)',
      socialLinks: {
        web: 'https://www.dota2.com/',
        facebook: 'https://www.facebook.com/dota2',
        twitter: 'https://twitter.com/DOTA2',
        instagram: 'https://www.instagram.com/dota2/',
        youtube: 'https://www.youtube.com/user/dota2',
        reddit: 'https://www.reddit.com/r/DotA2/',
        twitch: 'https://www.twitch.tv/directory/game/Dota%202',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://www.igdb.com/games/dota-2',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Heroes of the Storm',
        posterUrl: '/images/shared/heroes-of-the-storm.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2015,
        subtitle: 'MOBA, Strategy',
      },
      {
        title: 'Smite 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2437170/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2024,
        subtitle: 'Action, MOBA',
      },
      {
        title: 'Mobile Legends: Bang Bang',
        posterUrl: '/images/shared/mobile-legends.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8,
        releaseYear: 2016,
        subtitle: 'MOBA, Mobile',
      },
      {
        title: 'Smite',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/386360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.2,
        releaseYear: 2014,
        subtitle: 'Third-Person MOBA',
      },
      {
        title: 'Deadlock',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1422450/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2024,
        subtitle: 'Shooter, MOBA',
      },
      {
        title: 'Predecessor',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/961200/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.3,
        releaseYear: 2022,
        subtitle: '3D MOBA',
      },
    ],
  },
  'elden ring': {
    title: 'ELDEN RING',
    subtitle: 'Action, RPG, Open World',
    rank: 1,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/capsule_231x87.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256875461/movie480.mp4',
    videoDuration: '3:00',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_943bf6fe62352757d9070c1d33e50b92fe8539f1.1920x1080.jpg?t=1787868578',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_dcdac9e4b26ac0ee5248bfd2967d764fd00cdb42.1920x1080.jpg?t=1787868578',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_3c41384a24d86dddd58a8f61db77f9dc0bfda8b5.1920x1080.jpg?t=1787868578',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_e0316c76f8197405c1312d072b84331dd735d60b.1920x1080.jpg?t=1787868578',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_ef61b771ee6b269b1f0cb484233e07a0bfb5f81b.1920x1080.jpg?t=1787868578',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_69e2c6123497d39ca8101a1811ecf60c41b80c35.1920x1080.jpg?t=1787868578',
    ],
    description:
      'THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. A vast world where open fields with a variety of situations and huge dungeons seamlessly connect.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1245620/ELDEN_RING/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (18 420)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'English Language Reviews',
        language: 'English',
        count: 'Very Positive (620 180)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 96,
      },
    },
    details: {
      genres: 'Action RPG, Souls-like',
      publisher: 'Bandai Namco Entertainment',
      developer: 'FromSoftware Inc.',
      releaseDate: 'February 25, 2022',
      platform: 'PC, PlayStation 5, Xbox Series X/S',
      socialLinks: {
        web: 'https://en.bandainamcoent.eu/elden-ring/elden-ring',
        twitter: 'https://twitter.com/ELDENRING',
        youtube: 'https://www.youtube.com/c/BandaiNamcoEntertainment',
        reddit: 'https://www.reddit.com/r/Eldenring/',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://www.igdb.com/games/elden-ring',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Dark Souls III',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/374320/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2016,
        subtitle: 'Action RPG, Souls-like',
      },
      {
        title: 'Bloodborne',
        posterUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rba.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2015,
        subtitle: 'Action RPG, Dark Fantasy',
      },
      {
        title: 'Sekiro: Shadows Die Twice',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/814380/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2019,
        subtitle: 'Action-adventure',
      },
      {
        title: 'Lies of P',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1627720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2023,
        subtitle: 'Souls-like, Steampunk',
      },
    ],
  },
  'counter-strike 2': {
    title: 'Counter-Strike 2',
    subtitle: 'Tactical Shooter, Esports',
    rank: 2,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/capsule_231x87.jpg',
    bannerUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_796601d9d67faf53486eeb26d0724347cea67ddc.1920x1080.jpg?t=1784564069',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_d830cfd0550fbb64d80e803e93c929c3abb02056.1920x1080.jpg?t=1784564069',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_13bb35638c0267759276f511ee97064773b37a51.1920x1080.jpg?t=1784564069',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_0f8cf82d019c614760fd20801f2bb4001da7ea77.1920x1080.jpg?t=1784564069',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_ef82850f036dac5772cb07dbc2d1116ea13eb163.1920x1080.jpg?t=1784564069',
    ],
    description:
      'As fires fade and the world falls into ruin, journey into a universe filled with more colossal enemies and environments. Players will be immersed into a world of epic atmosphere and darkness through faster gameplay and amplified combat intensity.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/730/CounterStrike_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (45 120)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'English Language Reviews',
        language: 'English',
        count: 'Very Positive (3 800 000+)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 89,
      },
    },
    details: {
      genres: 'Tactical Shooter, Action, Esports',
      publisher: 'Valve',
      developer: 'Valve',
      releaseDate: 'September 27, 2023',
      platform: 'PC (Windows, Linux)',
      socialLinks: {
        web: 'https://www.counter-strike.net/',
        twitter: 'https://twitter.com/CounterStrike',
        youtube: 'https://www.youtube.com/user/Valve',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://www.igdb.com/games/counter-strike-2',
      },
    },
    similarItems: [
      {
        title: 'Valorant',
        posterUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2mvt.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2020,
        subtitle: 'Tactical Shooter, 5v5',
      },
      {
        title: 'Team Fortress 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2007,
        subtitle: 'First-Person Shooter',
      },
      {
        title: 'Apex Legends',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2020,
        subtitle: 'Battle Royale, Action',
      },
      {
        title: "Tom Clancy's Rainbow Six Siege",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/359550/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2015,
        subtitle: 'Tactical Shooter',
      },
    ],
  },
  'cyberpunk 2077': {
    title: 'Cyberpunk 2077',
    subtitle: 'RPG, Open World, Cyberpunk',
    rank: 4,
    miniPosterUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/257081132/movie480.mp4',
    videoDuration: '2:10',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_2f649b68d579bf87011487d29bc4ccbfdd97d34f.1920x1080.jpg?t=1784714077',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_0e64170751e1ae20ff8fdb7001a8892fd48260e7.1920x1080.jpg?t=1784714077',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_af2804aa4bf35d4251043744412ce3b359a125ef.1920x1080.jpg?t=1784714077',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_7924f64b6e5d586a80418c9896a1c92881a7905b.1920x1080.jpg?t=1784714077',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_4eb068b1cf52c91b57157b84bed18a186ed7714b.1920x1080.jpg?t=1784714077',
    ],
    description:
      'Valorant delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (14 300)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'English Language Reviews',
        language: 'English',
        count: 'Very Positive (670 000+)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'RPG, Action, Open World',
      publisher: 'CD PROJEKT RED',
      developer: 'CD PROJEKT RED',
      releaseDate: 'December 10, 2020',
      platform: 'PC, PlayStation 5, Xbox Series X/S',
      socialLinks: {
        web: 'https://www.cyberpunk.net/',
        twitter: 'https://twitter.com/CyberpunkGame',
        youtube: 'https://www.youtube.com/user/CyberPunkGame',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://www.igdb.com/games/cyberpunk-2077',
      },
    },
    similarItems: [
      {
        title: 'The Witcher 3: Wild Hunt',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2015,
        subtitle: 'Action RPG, Open World',
      },
      {
        title: 'Deus Ex: Human Revolution',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/238010/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2011,
        subtitle: 'Cyberpunk, Stealth Action',
      },
      {
        title: 'ELDEN RING',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Action RPG, Open World',
      },
      {
        title: 'Grand Theft Auto V',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2015,
        subtitle: 'Open World, Action',
      },
    ],
  },
  'the witcher 3: wild hunt': {
    title: 'The Witcher 3: Wild Hunt',
    subtitle: 'Action RPG, Fantasy, Open World',
    rank: 3,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/capsule_231x87.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256927226/movie480.mp4',
    videoDuration: '2:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/ss_5710298af2318afd9aa72449ef29ac4a2ef64d8e.1920x1080.jpg?t=1788333513',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/ss_0901e64e9d4b8ebaea8348c194e7a3644d2d832d.1920x1080.jpg?t=1788333513',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/ss_112b1e176c1bd271d8a565eacb6feaf90f240bb2.1920x1080.jpg?t=1788333513',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/ss_d1b73b18cbcd5e9e412c7a1dead3c5cd7303d2ad.1920x1080.jpg?t=1788333513',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/ss_107600c1337accc09104f7a8aa7f275f23cad096.1920x1080.jpg?t=1788333513',
    ],
    description:
      'You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (28 400)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'English Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (750 000+)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 98,
      },
    },
    details: {
      genres: 'Action RPG, Open World, Fantasy',
      publisher: 'CD PROJEKT RED',
      developer: 'CD PROJEKT RED',
      releaseDate: 'May 18, 2015',
      platform: 'PC, PlayStation 5, Xbox Series X/S, Switch',
      socialLinks: {
        web: 'https://www.thewitcher.com/',
        twitter: 'https://twitter.com/witchergame',
        youtube: 'https://www.youtube.com/user/WitcherGame',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://www.igdb.com/games/the-witcher-3-wild-hunt',
      },
    },
    similarItems: [
      {
        title: 'The Elder Scrolls V: Skyrim',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2016,
        subtitle: 'RPG, Open World, Fantasy',
      },
      {
        title: 'ELDEN RING',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Action RPG, Souls-like',
      },
      {
        title: 'Cyberpunk 2077',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2020,
        subtitle: 'RPG, Open World, Cyberpunk',
      },
      {
        title: "Baldur's Gate 3",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2023,
        subtitle: 'CRPG, Turn-Based Tactics',
      },
    ],
  },
  "baldur's gate 3": {
    title: "Baldur's Gate 3",
    subtitle: 'Party-based RPG, Turn-Based Tactics',
    rank: 1,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/capsule_231x87.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '2:15',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_c73bc54415178c07fef85f54ee26621728c77504.1920x1080.jpg?t=1777363040',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_73d93bea842b93914d966622104dcb8c0f42972b.1920x1080.jpg?t=1777363040',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_cf936d31061b58e98e0c646aee00e6030c410cda.1920x1080.jpg?t=1777363040',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_b6a6ee6e046426d08ceea7a4506a1b5f44181543.1920x1080.jpg?t=1777363040',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_6b8faba0f6831a406ce015648958da9612d14dbb.1920x1080.jpg?t=1777363040',
    ],
    description:
      'The Elder Scrolls V: Skyrim delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1086940/Baldurs_Gate_3/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (18 500)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'English Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (560 000+)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 96,
      },
    },
    details: {
      genres: 'Party-based RPG, Turn-Based Tactics, D&D',
      publisher: 'Larian Studios',
      developer: 'Larian Studios',
      releaseDate: 'August 3, 2023',
      platform: 'PC, PlayStation 5, Xbox Series X/S, macOS',
      socialLinks: {
        web: 'https://baldursgate3.game/',
        twitter: 'https://twitter.com/baldursgate3',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://www.igdb.com/games/baldurs-gate-3',
      },
    },
    similarItems: [
      {
        title: 'Divinity: Original Sin 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/435150/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2017,
        subtitle: 'CRPG, Turn-Based Tactics',
      },
      {
        title: 'Dragon Age: Origins',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/47810/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2009,
        subtitle: 'Party-based RPG, Dark Fantasy',
      },
      {
        title: 'ELDEN RING',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Action RPG, Open World',
      },
      {
        title: 'The Witcher 3: Wild Hunt',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2015,
        subtitle: 'Action RPG, Open World',
      },
    ],
  },
  'grand theft auto v': {
    title: 'Grand Theft Auto V',
    subtitle: 'Action, Open World, Crime',
    rank: 5,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/capsule_231x87.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/257109786/movie480.mp4',
    videoDuration: '1:45',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/ss_32aa18ab3175e3002217862dd5917646d298ab6b.1920x1080.jpg?t=1765387725',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/ss_2744f112fa060320d191a50e8b3a92441a648a56.1920x1080.jpg?t=1765387725',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/ss_da39c16db175f6973770bae6b91d411251763152.1920x1080.jpg?t=1765387725',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/ss_bd5db78286be0a7c6b2c62519099a9e27e6b06f3.1920x1080.jpg?t=1765387725',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/ss_b1a1cb7959d6a0e6fcb2d06ebf97a66c9055cef3.1920x1080.jpg?t=1765387725',
    ],
    description:
      'Divinity: Original Sin 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (31 000)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'English Language Reviews',
        language: 'English',
        count: 'Very Positive (1 600 000+)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 97,
      },
    },
    details: {
      genres: 'Action, Open World, Crime',
      publisher: 'Rockstar Games',
      developer: 'Rockstar North',
      releaseDate: 'April 14, 2015',
      platform: 'PC, PlayStation, Xbox',
      socialLinks: {
        web: 'https://www.rockstargames.com/V/',
        twitter: 'https://twitter.com/RockstarGames',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://www.igdb.com/games/grand-theft-auto-v',
      },
    },
    similarItems: [
      {
        title: 'Red Dead Redemption 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2019,
        subtitle: 'Open World, Western',
      },
      {
        title: 'Cyberpunk 2077',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2020,
        subtitle: 'RPG, Open World, Cyberpunk',
      },
      {
        title: 'Mafia: Definitive Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1030840/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2020,
        subtitle: 'Crime, Action, Drama',
      },
      {
        title: 'Watch Dogs 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/447040/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2016,
        subtitle: 'Hackers, Open World',
      },
    ],
  },
  'dark souls iii': {
    title: 'DARK SOULS™ III',
    subtitle: 'Action, RPG',
    rank: 2,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/374320/capsule_231x87.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/header.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256663134/movie480.mp4',
    videoDuration: '2:12',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/ss_5efd318b85a3917d1c6e717f4cb813b47547cd6f.1920x1080.jpg?t=1748630784',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/ss_1c0fa39091901496d77cf4cecfea4ffb056d6452.1920x1080.jpg?t=1748630784',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/ss_1318a04ef11d87f38aebe6d47a96124f8f888ca8.1920x1080.jpg?t=1748630784',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/ss_61524dee9ebf72d462638f21adbbbea4c93d791d.1920x1080.jpg?t=1748630784',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/ss_fe1dc6761a9004aa39c2e6e62181593b7263edf9.1920x1080.jpg?t=1748630784',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/374320/ss_27397db724cfd5648655c1056ff5d184147a4c50.1920x1080.jpg?t=1748630784',
    ],
    description:
      'Red Dead Redemption 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/374320/DARK_SOULS_III/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (58 817)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'English Language Reviews',
        language: 'English',
        count: 'Very Positive (294 085)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 96,
      },
    },
    details: {
      genres: 'Action, RPG',
      publisher: 'FromSoftware, Inc., Bandai Namco Entertainment',
      developer: 'FromSoftware, Inc.',
      releaseDate: 'April 11, 2016',
      platform: 'PC (Windows, Steam)',
      socialLinks: {
        web: 'https://www.bandainamcoent.com/games/dark-souls-iii',
        twitter: 'https://twitter.com/DarkSoulsGame',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://www.igdb.com/games/dark-souls-iii',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'ELDEN RING',
        posterUrl:
          'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Action RPG, Souls-like',
      },
      {
        title: 'Bloodborne',
        posterUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rba.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2015,
        subtitle: 'Action RPG, Dark Fantasy',
      },
      {
        title: 'Sekiro: Shadows Die Twice',
        posterUrl:
          'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/814380/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2019,
        subtitle: 'Action-adventure',
      },
      {
        title: 'Lies of P',
        posterUrl:
          'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1627720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2023,
        subtitle: 'Souls-like, Steampunk',
      },
    ],
  },
  'devil may cry 5': {
    title: 'Devil May Cry 5',
    subtitle: 'Stylish Hack and Slash, Action, Demons',
    rank: 37,
    miniPosterUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/601150/library_600x900.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/601150/header.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256728780/movie480.mp4',
    videoDuration: '1:55',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/601150/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/601150/ss_4410bada2565843dae693b03ac3a50256ff5dd66.1920x1080.jpg?t=1768869803',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/601150/ss_4ce180ed8979a51c72de51f985e9e9ba13500508.1920x1080.jpg?t=1768869803',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/601150/ss_e2be70565f94a7f6c392cccddce08c67f2f87612.1920x1080.jpg?t=1768869803',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/601150/ss_d1e0b403f593f17ad195c5382a7788d71c6f406a.1920x1080.jpg?t=1768869803',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/601150/ss_f669d4627db07e61b87728d94d72bc1eabfd0349.1920x1080.jpg?t=1768869803',
    ],
    description:
      'ELDEN RING delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/601150/Devil_May_Cry_5/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (78 820)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'English Language Reviews',
        language: 'English',
        count: 'Very Positive (394 100)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 96,
      },
    },
    details: {
      genres: 'Hack and Slash, Action, Spectacle Fighter',
      publisher: 'CAPCOM Co., Ltd.',
      developer: 'CAPCOM Co., Ltd.',
      releaseDate: 'March 8, 2019',
      platform: 'PC (Windows, Steam), PS5, Xbox Series X',
      socialLinks: {
        web: 'https://www.devilmaycry5.com/',
        twitter: 'https://twitter.com/DevilMayCry',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://www.igdb.com/games/devil-may-cry-5',
      },
    },
    similarItems: [
      {
        title: 'Dark Souls III',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/374320/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2016,
        subtitle: 'Souls-like, Dark Fantasy',
      },
      {
        title: 'Sekiro: Shadows Die Twice',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/814380/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2019,
        subtitle: 'Action, Hack and Slash',
      },
      {
        title: 'ELDEN RING',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Souls-like, Masterpiece',
      },
      {
        title: 'Lies of P',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1627720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2023,
        subtitle: 'Souls-like, Steampunk',
      },
    ],
  },
  'mobile legends: bang bang': {
    title: 'Mobile Legends: Bang Bang',
    subtitle: 'MOBA, Team Strategy, 5v5',
    rank: 22,
    miniPosterUrl: '/images/shared/mobile-legends.jpg',
    bannerUrl:
      'https://play-lh.googleusercontent.com/hrpZdffP0Mt4nSZnr6FUk0OyeEm_GyXZ3TxCoQb7cSFoNOeF0KGEQoXgSR-PKqk1rlOyImJFvIPvZyXuoG3eXA=w1024-h576',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256692021/movie480.mp4',
    videoDuration: '1:45',
    videoThumbnail:
      'https://play-lh.googleusercontent.com/hrpZdffP0Mt4nSZnr6FUk0OyeEm_GyXZ3TxCoQb7cSFoNOeF0KGEQoXgSR-PKqk1rlOyImJFvIPvZyXuoG3eXA=w1024-h576',
    screenshots: [
      'https://play-lh.googleusercontent.com/hrpZdffP0Mt4nSZnr6FUk0OyeEm_GyXZ3TxCoQb7cSFoNOeF0KGEQoXgSR-PKqk1rlOyImJFvIPvZyXuoG3eXA=w1024-h576',
      '/images/shared/mobile-legends.jpg',
    ],
    description:
      'As fires fade and the world falls into ruin, journey into a universe filled with more colossal enemies and environments. Players will be immersed into a world of epic atmosphere and darkness through faster gameplay and amplified combat intensity.',
    platformButton: {
      label: 'Google Play',
      type: 'web',
      url: 'https://play.google.com/store/apps/details?id=com.mobile.legends',
    },
    reviews: {
      recentReviews: {
        label: 'Player Rating',
        count: 'Very Positive (32 400 000+)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Regional Reviews',
        language: 'Russian',
        count: 'Very Positive (1 800 000+)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 84,
      },
    },
    details: {
      genres: 'MOBA, Action, Strategy',
      publisher: 'Moonton',
      developer: 'Moonton',
      releaseDate: 'July 14, 2016',
      platform: 'Android, iOS',
      socialLinks: {
        web: 'https://m.mobilelegends.com/',
        youtube: 'https://www.youtube.com/c/MobileLegends5v5MOBA',
      },
      metadataSource: {
        name: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.mobile.legends',
      },
    },
    similarItems: [
      {
        title: 'Dota 2',
        posterUrl: '/icons/brands/dota2.png',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2013,
        subtitle: 'Strategy, MOBA',
      },
      {
        title: 'League of Legends',
        posterUrl: '/icons/brands/lol.png',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2009,
        subtitle: 'MOBA, Esports',
      },
      {
        title: 'Smite 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2437170/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2024,
        subtitle: 'Action, MOBA',
      },
    ],
  },
  'sword art online': {
    title: 'Sword Art Online',
    subtitle: 'Anime, Shounen, Virtual Reality, Action, Fantasy',
    rank: 14,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/11/39717l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/11/39717l.jpg',
    videoUrl: 'https://www.imdb.com/video/vi2122562585/',
    videoDuration: '1:42',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/11/39717l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/79/1d/15/791d158e769d837638e4f59017b38a3f.gif',
      'https://i.pinimg.com/originals/e5/ce/ac/e5ceac899d476dc6a4097eead898caef.gif',
      'https://i.pinimg.com/originals/a5/4f/fa/a54ffa220efb58379d1428ed5d1ced1b.gif',
      'https://i.pinimg.com/originals/89/d9/f0/89d9f07cdfd2fd374018991d71e332ae.gif',
      'https://i.pinimg.com/originals/9d/2f/24/9d2f24a4494f40aa97d1d3445d82c601.gif',
      'https://i.pinimg.com/originals/f9/52/3c/f9523c625ba79b2665a0d62f803b1093.gif',
      'https://i.pinimg.com/originals/ed/b7/1e/edb71e289d2f40a0fa18f877e42a873a.gif',
    ],
    description:
      'Dota 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'AniList',
      type: 'anilist',
      url: 'https://anilist.co/anime/11757/Sword-Art-Online/',
    },
    reviews: {
      recentReviews: {
        label: 'Audience Rating',
        count: '8.2 / 10',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'All Reviews',
        language: 'Russian',
        count: 'Very Positive (1 850 000+)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 82,
      },
    },
    details: {
      genres: 'Action, Fantasy, Adventure, Romance, Shounen',
      publisher: 'Aniplex / A-1 Pictures',
      developer: 'Tomohiko Ito (Director)',
      releaseDate: 'July 7, 2012',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://sao-project.net/',
        twitter: 'https://twitter.com/sao_anime',
      },
      metadataSource: {
        name: 'AniList',
        url: 'https://anilist.co/anime/11757/Sword-Art-Online/',
      },
    },
    similarItems: [
      {
        title: 'Attack on Titan',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2013,
        subtitle: 'Action, Drama',
      },
      {
        title: 'Death Note',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2006,
        subtitle: 'Thriller, Mystery',
      },
      {
        title: 'Jujutsu Kaisen',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.9,
        releaseYear: 2020,
        subtitle: 'Supernatural',
      },
      {
        title: 'Demon Slayer: Kimetsu no Yaiba',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9,
        releaseYear: 2019,
        subtitle: 'Action, Demons',
      },
    ],
  },
  "kuroko's basketball": {
    title: "Kuroko's Basketball",
    subtitle: 'Sports, Shounen, Basketball, Team Spirit',
    rank: 31,
    miniPosterUrl: 'https://i.pinimg.com/736x/51/85/94/518594395af20ac713088eca87f0b3b4.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/8/76793l.jpg',
    videoUrl: 'https://cdn.myanimelist.net/video/1479l.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://wallpapercat.com/w/middle-retina/6/4/5/883721-3840x2160-desktop-4k-kurokos-basketball-wallpaper.jpg',
    screenshots: [
      'https://wallpapercat.com/w/middle-retina/6/4/5/883721-3840x2160-desktop-4k-kurokos-basketball-wallpaper.jpg',
      'https://i.pinimg.com/736x/fc/17/dd/fc17dda85f94703dbb7483e6c56bd337.jpg',
      'https://i.pinimg.com/originals/16/e7/76/16e776be9d45e59ade7c064cc4e3ebc3.gif',
      'https://i.pinimg.com/1200x/33/4d/c8/334dc87358a8763d7bb1cf9823d5793a.jpg',
      'https://i.pinimg.com/originals/ea/1e/bc/ea1ebcc64d55420c62762c20a957067e.gif',
      'https://i.pinimg.com/originals/e7/26/5c/e7265c39cd7f274bbd0cbfe0a7abd3e2.gif',
      'https://i.pinimg.com/originals/24/c1/60/24c1600f69c494d067831d0ee8a2b7b1.gif',
    ],
    description:
      'After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/11771/Kuroko_no_Basket',
    },
    reviews: {
      recentReviews: {
        label: 'Audience Rating',
        count: '8.3 / 10',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'All Reviews',
        language: 'Russian',
        count: 'Very Positive (1 120 000+)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Sports, Shounen, Basketball, School, Comedy',
      publisher: 'Bandai Visual / Shueisha',
      developer: 'Production I.G',
      releaseDate: 'April 7, 2012',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://www.tv-tokyo.co.jp/anime/kurobas/',
        twitter: 'https://twitter.com/kurobasanime',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/11771/Kuroko_no_Basket',
      },
    },
    similarItems: [
      {
        title: 'Haikyuu!!',
        posterUrl: 'https://m.media-amazon.com/images/I/71uT+Js3kCS.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.8,
        releaseYear: 2014,
        subtitle: 'Sports, Volleyball, Shounen',
      },
      {
        title: 'Blue Lock',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1258/126929l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.4,
        releaseYear: 2022,
        subtitle: 'Sports, Soccer, Thriller',
      },
      {
        title: 'Free!',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/4/51085l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 7.9,
        releaseYear: 2013,
        subtitle: 'Sports, Swimming, Friendship',
      },
      {
        title: 'Slam Dunk',
        posterUrl: 'https://i.pinimg.com/736x/6c/b0/97/6cb097f36fb8438fca2a5ad3c456687c.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.6,
        releaseYear: 1993,
        subtitle: 'Classic, Basketball, Comedy',
      },
    ],
  },
  'attack on titan': {
    title: 'Attack on Titan',
    subtitle: 'Anime, Shounen, Action, Drama',
    rank: 2,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/449800/header.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:45',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/449800/header.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/6d/29/cc/6d29cc48ad122d9f1f3becb2c7b7b27d.gif',
      'https://i.pinimg.com/originals/9e/d8/ff/9ed8ffc99e4dbcc2e221740e1bfe4676.gif',
      'https://i.pinimg.com/originals/b3/c2/8b/b3c28b113075c274d11ebf20f9c2c756.gif',
      'https://i.pinimg.com/originals/b3/18/b1/b318b151b31e5f99fe92690110683630.gif',
      'https://i.pinimg.com/originals/46/e2/10/46e210972bfac779f023de46dfe1d3e1.gif',
    ],
    description:
      'Inspired by a small-stature volleyball ace known as the Little Giant, Shoyo Hinata creates a volleyball team in his final year of middle school and aims for the national tournament.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://www.crunchyroll.com/series/GR751KNZY/attack-on-titan',
    },
    reviews: {
      recentReviews: {
        label: 'Community Rating',
        count: 'Masterpiece (9.2 / 10)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'AniList Reviews',
        language: 'AniList',
        count: '90% average score (142 000+)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 95,
      },
    },
    details: {
      genres: 'Action, Drama, Fantasy, Shounen',
      publisher: 'Kodansha / Pony Canyon',
      developer: 'Wit Studio / MAPPA',
      releaseDate: 'April 7, 2013',
      platform: 'TV Series (4 seasons, 89 ep.)',
      socialLinks: {
        web: 'https://shingeki.tv/',
        twitter: 'https://twitter.com/anime_shingeki',
      },
      metadataSource: {
        name: 'AniList',
        url: 'https://anilist.co/anime/16498/Shingeki-no-Kyojin/',
      },
    },
    similarItems: [
      {
        title: 'Death Note',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2006,
        subtitle: 'Psychological Thriller, Thriller',
      },
      {
        title: 'Jujutsu Kaisen',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.9,
        releaseYear: 2020,
        subtitle: 'Shounen, Supernatural',
      },
      {
        title: 'Demon Slayer: Kimetsu no Yaiba',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.8,
        releaseYear: 2019,
        subtitle: 'Action, Historical',
      },
      {
        title: 'Sword Art Online',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/11/39717l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.2,
        releaseYear: 2012,
        subtitle: 'Shounen, Fantasy',
      },
    ],
  },
  'demon slayer: kimetsu no yaiba': {
    title: 'Demon Slayer: Kimetsu no Yaiba',
    subtitle: 'Action, Historical, Shounen, Demons',
    rank: 5,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1490890/header.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256842621/movie480.mp4',
    videoDuration: '1:50',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1490890/header.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/c1/a8/df/c1a8dffe0c9e0c36019be23835809708.gif',
      'https://i.pinimg.com/originals/94/bc/a5/94bca596779d4db3f3513cce1d73697e.gif',
      'https://i.pinimg.com/originals/e2/39/73/e23973e25f965eaecefd97aa81437975.gif',
      'https://i.pinimg.com/originals/82/8e/e1/828ee10bb71cda3ce13eac1049236c20.gif',
      'https://i.pinimg.com/originals/67/7b/ae/677bae7a40b03ec5b65c7979c4bb4c80.gif',
    ],
    description:
      'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a supernatural notebook capable of killing anyone whose name is written into it.',
    platformButton: {
      label: 'AniList',
      type: 'anilist',
      url: 'https://anilist.co/anime/101922/Kimetsu-no-Yaiba/',
    },
    reviews: {
      recentReviews: {
        label: 'Audience Rating',
        count: '8.8 / 10',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'All Reviews',
        language: 'Russian',
        count: 'Very Positive (120 400)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Action, Fantasy, Shounen',
      publisher: 'Aniplex / Shueisha',
      developer: 'ufotable',
      releaseDate: 'April 6, 2019',
      platform: 'TV, Streaming',
      socialLinks: {
        web: 'https://kimetsu.com/',
      },
      metadataSource: {
        name: 'AniList',
        url: 'https://anilist.co/anime/101922/Kimetsu-no-Yaiba/',
      },
    },
    similarItems: [
      {
        title: 'Jujutsu Kaisen',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.9,
        releaseYear: 2020,
        subtitle: 'Shounen, Supernatural',
      },
      {
        title: 'Attack on Titan',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2013,
        subtitle: 'Action, Drama',
      },
      {
        title: 'Bleach',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2022,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Sword Art Online',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/11/39717l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.2,
        releaseYear: 2012,
        subtitle: 'Shounen, Fantasy',
      },
    ],
  },
  'jujutsu kaisen': {
    title: 'Jujutsu Kaisen',
    subtitle: 'Shounen, Supernatural, Action, Curses',
    rank: 6,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1877020/header.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256974787/movie480.mp4',
    videoDuration: '1:35',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1877020/header.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/ab/a3/ad/aba3adb59b624f18c4d1284f61c98e41.gif',
      'https://i.pinimg.com/originals/c1/05/d5/c105d5bedb75d33dc1bbf141accfbe6b.gif',
      'https://i.pinimg.com/originals/c5/a6/17/c5a617ac4baf3f1fb844d5487486fe58.gif',
      'https://i.pinimg.com/originals/c7/63/19/c76319fb38068493dd49d2229619c0e4.gif',
      'https://i.pinimg.com/originals/80/8a/92/808a927200ed3552e01bf77b6349d2b8.gif',
      'https://i.pinimg.com/originals/11/a4/9a/11a49a89374048892e53d4223341f342.gif',
    ],
    description:
      "A boy swallows a cursed talisman—the finger of a demon—and becomes cursed himself. He enters a shaman school to be able to locate the demon's other body parts and thus exorcise himself.",
    platformButton: {
      label: 'AniList',
      type: 'anilist',
      url: 'https://anilist.co/anime/113415/Jujutsu-Kaisen/',
    },
    reviews: {
      recentReviews: {
        label: 'Audience Rating',
        count: '8.9 / 10',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'All Reviews',
        language: 'Russian',
        count: 'Very Positive (135 200)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Action, Supernatural, Shounen',
      publisher: 'TOHO animation / Shueisha',
      developer: 'MAPPA',
      releaseDate: 'October 3, 2020',
      platform: 'TV, Streaming',
      socialLinks: {
        web: 'https://jujutsukaisen.jp/',
      },
      metadataSource: {
        name: 'AniList',
        url: 'https://anilist.co/anime/113415/Jujutsu-Kaisen/',
      },
    },
    similarItems: [
      {
        title: 'Demon Slayer: Kimetsu no Yaiba',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9,
        releaseYear: 2019,
        subtitle: 'Action, Demons',
      },
      {
        title: 'Attack on Titan',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2013,
        subtitle: 'Action, Drama',
      },
      {
        title: 'Sword Art Online',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/11/39717l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.2,
        releaseYear: 2012,
        subtitle: 'Shounen, Fantasy',
      },
    ],
  },
  'death note': {
    title: 'Death Note',
    subtitle: 'Psychological Thriller, Mystery, Supernatural',
    rank: 4,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg',
    videoUrl:
      'https://cdn.discordapp.com/app-assets/356875988589740042/store/1486740188892893284.mp4?size=3072',
    videoDuration: '1:30',
    videoThumbnail: 'https://i.pinimg.com/originals/83/ef/2f/83ef2f5bce915c0018e66ba562e1a7fc.gif',
    screenshots: [
      'https://i.pinimg.com/originals/df/96/dd/df96dde688b52428d662a2cda33f2ec8.gif',
      'https://i.pinimg.com/originals/47/7c/60/477c6034eec101ff0a85ed37261f8434.gif',
      'https://i.pinimg.com/originals/80/27/c1/8027c15abc6b94dae01fd00a18a0885c.gif',
      'https://i.pinimg.com/originals/d0/4e/0c/d04e0c5554a1cfae0619f736704592c6.gif',
      'https://i.pinimg.com/originals/38/e1/2e/38e12eb1c1ec0992f037fea7746d3a60.gif',
    ],
    description:
      'Tanjiro Kamado joins the Demon Slayer Corps to find a cure for his sister Nezuko, who was turned into a demon, and to avenge the tragedy that befell his entire family.',
    platformButton: {
      label: 'AniList',
      type: 'anilist',
      url: 'https://anilist.co/anime/1535/Death-Note/',
    },
    reviews: {
      recentReviews: {
        label: 'Community Rating',
        count: '9.1 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'All Reviews',
        language: 'Russian',
        count: 'Very Positive (280 000)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 95,
      },
    },
    details: {
      genres: 'Psychological Thriller, Supernatural, Thriller',
      publisher: 'NTV / Shueisha',
      developer: 'Madhouse',
      releaseDate: 'October 3, 2006',
      platform: 'TV Series (37 ep.)',
      socialLinks: {
        web: 'https://www.j-deathnote.com/',
      },
      metadataSource: {
        name: 'AniList',
        url: 'https://anilist.co/anime/1535/Death-Note/',
      },
    },
    similarItems: [
      {
        title: 'Code Geass: Lelouch of the Rebellion',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/4/9391l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2006,
        subtitle: 'Mecha, Thriller',
      },
      {
        title: 'Attack on Titan',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2013,
        subtitle: 'Action, Drama',
      },
      {
        title: 'Jujutsu Kaisen',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.9,
        releaseYear: 2020,
        subtitle: 'Supernatural',
      },
    ],
  },
  'blue lock': {
    title: 'Blue Lock',
    subtitle: 'Sports, Soccer, Thriller, Shounen',
    rank: 35,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1258/126929l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1258/126929l.jpg',
    videoUrl:
      'https://cdn.discordapp.com/app-assets/356875988589740042/store/1486740188892893284.mp4?size=3072',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1258/126929l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/7a/88/e9/7a88e99555064fc22335e0794563754c.gif',
      'https://i.pinimg.com/originals/93/00/58/930058e0c2aa4553efb4df9eaf57dd5c.gif',
      'https://i.pinimg.com/originals/95/13/c9/9513c90be5af985db65f85da4307ec44.gif',
      'https://i.pinimg.com/originals/81/15/fb/8115fb21316758994697f617f5a55a07.gif',
      'https://i.pinimg.com/originals/b7/5d/90/b75d900c033734f29c3000ff390ffd01.gif',
      'https://i.pinimg.com/originals/80/b7/e9/80b7e9618a99a62da3000823a818394d.gif',
      'https://i.pinimg.com/originals/8c/56/ce/8c56cec962040750b1154f475f312ffd.gif',
    ],
    description:
      'After being granted a mysterious power to control others by an immortal witch, the exiled prince Lelouch leads a rebellion against the almighty Britannian Empire.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/49596/Blue_Lock',
    },
    reviews: {
      recentReviews: {
        label: 'Audience Rating',
        count: '8.4 / 10',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'All Reviews',
        language: 'Russian',
        count: 'Very Positive (850 000+)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Sports, Psychological Thriller, Soccer',
      publisher: 'Bandai Namco Filmworks / Kodansha',
      developer: 'Eight Bit',
      releaseDate: 'October 9, 2022',
      platform: 'TV, Streaming',
      socialLinks: {
        web: 'https://bluelock-pr.com/',
        twitter: 'https://twitter.com/BLUELOCK_PR',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/49596/Blue_Lock',
      },
    },
    similarItems: [
      {
        title: "Kuroko's Basketball",
        posterUrl: 'https://cdn.myanimelist.net/images/anime/11/50453l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.3,
        releaseYear: 2012,
        subtitle: 'Sports, Basketball, Shounen',
      },
      {
        title: 'Haikyuu!!',
        posterUrl: 'https://m.media-amazon.com/images/I/71uT+Js3kCS.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.8,
        releaseYear: 2014,
        subtitle: 'Sports, Volleyball, Shounen',
      },
      {
        title: 'Aoashi',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1321/122244l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.2,
        releaseYear: 2022,
        subtitle: 'Sports, Soccer, Drama',
      },
      {
        title: 'Captain Tsubasa',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/76803l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 7.8,
        releaseYear: 2018,
        subtitle: 'Sports, Soccer, Classic',
      },
    ],
  },
  'haikyuu!!': {
    title: 'Haikyuu!!',
    subtitle: 'Sports, Volleyball, School, Shounen',
    rank: 19,
    miniPosterUrl: 'https://m.media-amazon.com/images/I/71uT+Js3kCS.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/11/75274l.jpg',
    videoUrl:
      'https://cdn.discordapp.com/app-assets/356875988589740042/store/1486740188892893284.mp4?size=3072',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/11/75274l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/31/53/a9/3153a9461e7048533ba223d9af01217e.gif',
      'https://i.pinimg.com/originals/5a/6d/e7/5a6de782a5197b55934b45f7ebe4dded.gif',
      'https://i.pinimg.com/originals/6f/a1/9e/6fa19ed23211462cbe220ce3cd1eca9f.gif',
      'https://i.pinimg.com/originals/12/bd/97/12bd97c7554b36e232222ab3207d9903.gif',
      'https://i.pinimg.com/originals/5a/22/2d/5a222d6309025507c7a50fbb8f401a3f.gif',
      'https://i.pinimg.com/originals/60/e7/af/60e7af6c4c0e65c95b3016b273847dc9.gif',
      'https://i.pinimg.com/originals/2f/60/27/2f60270af11811cef51905e3d025fa95.gif',
    ],
    description:
      "Kuroko's Basketball delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.",
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/20583/Haikyuu',
    },
    reviews: {
      recentReviews: {
        label: 'Audience Rating',
        count: '8.8 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'All Reviews',
        language: 'Russian',
        count: 'Overwhelmingly Positive (1 500 000+)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 95,
      },
    },
    details: {
      genres: 'Sports, Comedy, Drama, Volleyball',
      publisher: 'TOHO animation / Shueisha',
      developer: 'Production I.G',
      releaseDate: 'April 6, 2014',
      platform: 'TV, Streaming',
      socialLinks: {
        web: 'https://haikyu.jp/',
        twitter: 'https://twitter.com/animehaikyu_com',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/20583/Haikyuu',
      },
    },
    similarItems: [
      {
        title: "Kuroko's Basketball",
        posterUrl: 'https://cdn.myanimelist.net/images/anime/11/50453l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.3,
        releaseYear: 2012,
        subtitle: 'Sports, Basketball, Shounen',
      },
      {
        title: 'Blue Lock',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1258/126929l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.4,
        releaseYear: 2022,
        subtitle: 'Sports, Soccer, Thriller',
      },
      {
        title: 'Slam Dunk',
        posterUrl: 'https://i.pinimg.com/736x/6c/b0/97/6cb097f36fb8438fca2a5ad3c456687c.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.6,
        releaseYear: 1993,
        subtitle: 'Classic, Basketball, Comedy',
      },
      {
        title: 'Free!',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/4/51085l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 7.9,
        releaseYear: 2013,
        subtitle: 'Sports, Swimming, Friendship',
      },
    ],
  },
  'code geass: lelouch of the rebellion': {
    title: 'Code Geass: Lelouch of the Rebellion',
    subtitle: 'Mecha, Military, Psychological Thriller, Drama, Supernatural',
    rank: 10,
    miniPosterUrl: 'https://i.pinimg.com/originals/63/13/a3/6313a32ff9553971bca05897042809ef.gif',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/4/9391l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://i.pinimg.com/originals/59/33/29/593329346f05b3c99842e1675e27a632.gif',
    screenshots: [
      'https://i.pinimg.com/originals/d6/8a/fd/d68afd516003e7527d263f93c71ca900.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/a0/d6/dc/a0d6dcbd791333fa0e839695e6be8dee.gif',
      'https://i.pinimg.com/originals/e3/ba/9c/e3ba9c5bb00d913c18024c34a44dfc0d.gif',
      'https://i.pinimg.com/originals/90/4f/a9/904fa97d9fd1a0529e1c8befb732e9bb.gif',
      'https://i.pinimg.com/originals/e8/05/97/e80597f7ee445bbb4eccb7e96387e19e.gif',
    ],
    description:
      "Kuroko's Basketball delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.",
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/1575/Code_Geass__Hangyaku_no_Lelouch',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.7 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '97% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Mecha, Military, Action, Psychological Thriller, Drama',
      publisher: 'Bandai Namco Filmworks / Mainichi Broadcasting',
      developer: 'Sunrise',
      releaseDate: 'October 5, 2006',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/1575/Code_Geass__Hangyaku_no_Lelouch',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/1575/Code_Geass__Hangyaku_no_Lelouch',
      },
    },
    similarItems: [
      {
        title: 'Death Note',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2006,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Neon Genesis Evangelion',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1314/108941l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 1995,
        subtitle: 'Mecha, Psychological Drama, Philosophy',
      },
      {
        title: 'Great Teacher Onizuka (GTO)',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/13/11460l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 1999,
        subtitle: 'Comedy, School, Shounen',
      },
      {
        title: 'Attack on Titan',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2013,
        subtitle: 'Shounen, Action',
      },
    ],
  },

  'great teacher onizuka (gto)': {
    title: 'Great Teacher Onizuka (GTO)',
    subtitle: 'Comedy, School, Shounen, Drama, Slice of Life',
    rank: 14,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/13/11460l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/13/11460l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/13/11460l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/b5/2e/7c/b52e7c4d2cf40db2d7a7c258b6a1b724.gif',
      'https://i.pinimg.com/originals/de/87/95/de879565125f2ab65511dbf51a93d57b.gif',
      'https://i.pinimg.com/originals/6f/3c/b3/6f3cb34fd6401cdd065f529c747516c7.gif',
      'https://i.pinimg.com/originals/ed/28/18/ed281857f96cbf3443332b10f3620af9.gif',
      'https://cdn.myanimelist.net/images/anime/13/11460l.jpg',
    ],
    description:
      'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a supernatural notebook capable of killing anyone whose name is written into it.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/245/Great_Teacher_Onizuka',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.6 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '96% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 96,
      },
    },
    details: {
      genres: 'Comedy, School, Drama, Shounen, Slice of Life',
      publisher: 'Kodansha / Fuji TV',
      developer: 'Studio Pierrot',
      releaseDate: 'June 30, 1999',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/245/Great_Teacher_Onizuka',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/245/Great_Teacher_Onizuka',
      },
    },
    similarItems: [
      {
        title: 'Assassination Classroom',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/5/75810l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.3,
        releaseYear: 2015,
        subtitle: 'Comedy, Action, School',
      },
      {
        title: 'Grand Blue Dreaming',
        posterUrl: 'https://i.pinimg.com/736x/1e/30/5f/1e305f379994088232bffdb81037ea4e.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2018,
        subtitle: 'Comedy, College Life, Diving',
      },
      {
        title: 'Classroom of the Elite',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/5/86830l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.3,
        releaseYear: 2017,
        subtitle: 'Psychological Thriller, School, Featured',
      },
      {
        title: 'Mob Psycho 100',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/8/80356l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2016,
        subtitle: 'Action, Comedy, Supernatural',
      },
    ],
  },

  'hunter x hunter (2011)': {
    title: 'Hunter x Hunter (2011)',
    subtitle: 'Shounen, Adventure, Fantasy, Action, Featured',
    rank: 5,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/40/d8/e7/40d8e7ab02b5a118c454c1fdfa4f18f7.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/6d/54/e6/6d54e627881efe2a9f152dbdeb1b6332.gif',
      'https://i.pinimg.com/originals/9c/2b/56/9c2b5679e268164fa34931f16d877c94.gif',
      'https://i.pinimg.com/originals/33/77/fa/3377faef13704e77bec4f03bb2c1110b.gif',
      'https://i.pinimg.com/originals/c7/c7/c4/c7c7c4de19111a666f99b9655d3b0927.gif',
    ],
    description:
      'A class of academic misfits is tasked with assassinating their tentacled, supersonic alien teacher before he destroys the Earth, learning vital life lessons along the way.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/11061/Hunter_x_Hunter_2011',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.8 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '98% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 98,
      },
    },
    details: {
      genres: 'Shounen, Action, Adventure, Fantasy, Martial Arts',
      publisher: 'Shueisha / Nippon Television',
      developer: 'Madhouse',
      releaseDate: 'October 2, 2011',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/11061/Hunter_x_Hunter_2011',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/11061/Hunter_x_Hunter_2011',
      },
    },
    similarItems: [
      {
        title: 'Naruto: Shippuden',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/13/17405l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2007,
        subtitle: 'Shounen, Ninja, Martial Arts',
      },
      {
        title: 'Jujutsu Kaisen',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2020,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Fullmetal Alchemist: Brotherhood',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1223/96541l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.9,
        releaseYear: 2009,
        subtitle: 'Shounen, Fantasy, Adventure',
      },
      {
        title: 'One Piece',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 1999,
        subtitle: 'Shounen, Adventure, Fantasy',
      },
    ],
  },

  'spirited away': {
    title: 'Spirited Away',
    subtitle: 'Fantasy, Adventure, Drama, Mysticism, Hayao Miyazaki Masterpiece',
    rank: 4,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/6/79597l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/6/79597l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/6/79597l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/ee/32/3e/ee323e09138f3efc5c3dc7dabb40ba59.gif',
      'https://i.pinimg.com/originals/59/fe/ec/59feec19de60f65ab7bb2f92d3fdbf03.gif',
      'https://i.pinimg.com/originals/ec/6e/87/ec6e87c83e3357966fc810b1ab98f8dc.gif',
      'https://i.pinimg.com/originals/6b/b4/f8/6bb4f8da0eb4cb5497e97bf1c86826e8.gif',
      'https://i.pinimg.com/originals/6d/71/e2/6d71e24e6d6ef7bf33b36637c0c117c2.gif',
      'https://i.pinimg.com/originals/80/26/84/802684ce9c07576c2a7cb4dea1605bde.gif',
      'https://i.pinimg.com/originals/9d/81/bd/9d81bd9a04858c4abb03fdc5ce493db7.gif',
    ],
    description:
      'Naruto Uzumaki, now older and stronger, returns to the Hidden Leaf Village and continues his quest to save his friend Sasuke from the darkness while protecting his ninja comrades.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/199/Sen_to_Chihiro_no_Kamikakushi',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.7 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '97% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Animated Feature Film, Fantasy, Adventure, Mythology',
      publisher: 'Toho / Tokuma Shoten',
      developer: 'Studio Ghibli',
      releaseDate: 'July 20, 2001',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/199/Sen_to_Chihiro_no_Kamikakushi',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/199/Sen_to_Chihiro_no_Kamikakushi',
      },
    },
    similarItems: [
      {
        title: 'Your Name (Kimi no Na wa)',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/5/87048l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2016,
        subtitle: 'Romance, Drama, Supernatural',
      },
      {
        title: 'A Silent Voice (Koe no Katachi)',
        posterUrl: 'https://image.tmdb.org/t/p/original/xojX4BFXkj92CnkYuwmlZXNjpr8.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2016,
        subtitle: 'Drama, School, Psychological Thriller',
      },
      {
        title: 'The Tunnel to Summer, the Exit of Goodbyes',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1761/123168l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2022,
        subtitle: 'Sci-Fi, Romance, Drama',
      },
      {
        title: 'The Disappearance of Haruhi Suzumiya',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1749/119934l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 2010,
        subtitle: 'Sci-Fi, Mysticism, School',
      },
    ],
  },

  'tengen toppa gurren lagann': {
    title: 'Tengen Toppa Gurren Lagann',
    subtitle: 'Mecha, Action, Adventure, Sci-Fi, Featured',
    rank: 15,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/4/5123l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/4/5123l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/4/5123l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/43/df/44/43df4433ed4d65de69fd7013e6bbb10e.gif',
      'https://i.pinimg.com/originals/79/af/f6/79aff694ec5c6cedc9ca6b65be25f980.gif',
      'https://i.pinimg.com/originals/f6/fc/88/f6fc88d7a52b63a983fe92337d32f0f3.gif',
      'https://i.pinimg.com/originals/92/ee/99/92ee9926cbc3c3455066aa15ce12d4f1.gif',
      'https://i.pinimg.com/originals/f1/dc/60/f1dc60e5d892d6beda53d8545a2d2ef0.gif',
      'https://i.pinimg.com/originals/4d/83/9c/4d839c6f283ef7aa74d516fdd350f173.gif',
      'https://i.pinimg.com/originals/f2/d7/af/f2d7af3b8d0252fbebb9da0ebe94da6d.gif',
    ],
    description:
      'Two teenagers share a profound, magical connection upon discovering they are swapping bodies across space and time, racing to meet before an impending disaster.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/2001/Tengen_Toppa_Gurren_Lagann',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.6 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '96% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 96,
      },
    },
    details: {
      genres: 'Mecha, Action, Adventure, Sci-Fi, Comedy',
      publisher: 'Aniplex / Konami / TV Tokyo',
      developer: 'Gainax',
      releaseDate: 'April 1, 2007',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/2001/Tengen_Toppa_Gurren_Lagann',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/2001/Tengen_Toppa_Gurren_Lagann',
      },
    },
    similarItems: [
      {
        title: 'Neon Genesis Evangelion',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1314/108941l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 1995,
        subtitle: 'Mecha, Psychological Drama, Philosophy',
      },
      {
        title: 'Code Geass: Lelouch of the Rebellion',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/4/9391l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2006,
        subtitle: 'Mecha, Military, Psychological Thriller',
      },
      {
        title: "JoJo's Bizarre Adventure",
        posterUrl: 'https://cdn.myanimelist.net/images/anime/3/40409l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2012,
        subtitle: 'Shounen, Action, Adventure',
      },
      {
        title: 'Attack on Titan',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2013,
        subtitle: 'Shounen, Action',
      },
    ],
  },

  berserk: {
    title: 'Berserk',
    subtitle: 'Dark Fantasy, Action, Drama, Featured, Military',
    rank: 8,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/10/79352l.jpg',
    bannerUrl: 'https://i.pinimg.com/originals/d1/b2/e7/d1b2e77c8b9366b1dc49f1e743254d85.gif',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/10/79352l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/d1/b2/e7/d1b2e77c8b9366b1dc49f1e743254d85.gif',
      'https://i.pinimg.com/originals/9e/9d/a4/9e9da43e721b184dfff6db82b2881db4.gif',
      'https://i.pinimg.com/originals/f2/7a/8c/f27a8c9ae07b507824f3197ac44bea35.gif',
      'https://i.pinimg.com/736x/f6/46/44/f6464445499b1b78c4359e28ff7cd998.jpg',
      'https://i.pinimg.com/736x/92/47/72/924772d8f36fe434b93f79b6ca83361c.jpg',
    ],
    description:
      'Shinji Ikari is summoned by his estranged father to pilot a colossal bio-mechanical mecha known as an Evangelion to protect humanity against enigmatic celestial Angels.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/33/Kenpuu_Denki_Berserk',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.8 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '98% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 98,
      },
    },
    details: {
      genres: 'Dark Fantasy, Action, Drama, Featured',
      publisher: 'Hakusensha / VAP',
      developer: 'OLM, Inc.',
      releaseDate: 'October 7, 1997',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/33/Kenpuu_Denki_Berserk',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/33/Kenpuu_Denki_Berserk',
      },
    },
    similarItems: [
      {
        title: 'Vinland Saga',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1500/103005l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Historical, Action, Drama',
      },
      {
        title: 'Dororo',
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYzk2ODAyZjctNjExNS00ZDk0LWE1ZDMtZmIyNzI2NjNjNjllXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2019,
        subtitle: 'Historical, Samurai, Dark Fantasy',
      },
      {
        title: 'Monster',
        posterUrl: 'https://pbs.twimg.com/media/F7TGWJWX0AAo17j.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2004,
        subtitle: 'Psychological Thriller, Mystery, Drama',
      },
      {
        title: 'Hellsing Ultimate',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/6/73245l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2006,
        subtitle: 'Action, Vampires, Horror',
      },
    ],
  },

  'steins;gate': {
    title: 'Steins;Gate',
    subtitle: 'Sci-Fi, Psychological Thriller, Time Travel',
    rank: 3,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1935/127974l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1935/127974l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1935/127974l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/05/b1/d2/05b1d2f5cc55d9454f5f02facd6deab9.gif',
      'https://i.pinimg.com/originals/91/3b/ca/913bca8cde88cfd5875adce042b32f93.gif',
      'https://i.pinimg.com/originals/c0/72/c8/c072c8bd32ac0937128e13f5e148f96d.gif',
      'https://i.pinimg.com/originals/75/0a/a8/750aa8003718f7db15451a1d0637177a.gif',
      'https://i.pinimg.com/originals/67/f5/42/67f5420d31a07474eb8384e3d4de45fc.gif',
      'https://i.pinimg.com/originals/83/57/78/83577860edaf9cefc515dd0843cb5fdf.gif',
    ],
    description:
      "Thorfinn pursues a journey with his father's killer in order to take revenge and end his life in a duel of honor, while an epic historical struggle engulfs the Viking world.",
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/9253/Steins_Gate',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.8 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '98% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 98,
      },
    },
    details: {
      genres: 'Sci-Fi, Thriller, Mystery, Psychological Thriller',
      publisher: 'Frontier Works / Kadokawa Shoten',
      developer: 'White Fox',
      releaseDate: 'April 6, 2011',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/9253/Steins_Gate',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/9253/Steins_Gate',
      },
    },
    similarItems: [
      {
        title: 'Death Note',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2006,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Code Geass: Lelouch of the Rebellion',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/4/9391l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2006,
        subtitle: 'Mecha, Military, Psychological Thriller',
      },
      {
        title: 'Monster',
        posterUrl: 'https://pbs.twimg.com/media/F7TGWJWX0AAo17j.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2004,
        subtitle: 'Psychological Thriller, Mystery, Drama',
      },
      {
        title: 'Re:Zero - Starting Life in Another World',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1522/128039l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2016,
        subtitle: 'Isekai, Psychological Thriller, Dark Fantasy',
      },
    ],
  },

  'one piece': {
    title: 'One Piece',
    subtitle: 'Shounen, Adventure, Fantasy, Comedy, Pirates',
    rank: 6,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/a7/8c/0b/a78c0bfab7503d6797ef148791a9b523.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/31/a2/74/31a274990407d389ed6bce0d53421b41.gif',
      'https://i.pinimg.com/originals/9c/f5/0c/9cf50c5cde5a32614e100cb44bb1fe2f.gif',
      'https://i.pinimg.com/originals/eb/50/2b/eb502b1cb1eb87d73dd2476dc9c0fb50.gif',
      'https://i.pinimg.com/originals/37/bc/c1/37bcc1de032e10855ffa271442d67f7b.gif',
    ],
    description:
      'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a supernatural notebook capable of killing anyone whose name is written into it.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/21/One_Piece',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.7 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '97% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Shounen, Action, Adventure, Fantasy, Comedy',
      publisher: 'Shueisha / Fuji TV',
      developer: 'Toei Animation',
      releaseDate: 'October 20, 1999',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/21/One_Piece',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/21/One_Piece',
      },
    },
    similarItems: [
      {
        title: 'Naruto: Shippuden',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/13/17405l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2007,
        subtitle: 'Shounen, Ninja, Martial Arts',
      },
      {
        title: 'Bleach',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2022,
        subtitle: 'Shounen, Action, Supernatural',
      },
      {
        title: 'Hunter x Hunter (2011)',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: 'Shounen, Adventure, Fantasy',
      },
      {
        title: 'Gintama',
        posterUrl: 'https://m.media-amazon.com/images/I/81GfsGOlNAS.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2006,
        subtitle: 'Comedy, Parody, Action',
      },
    ],
  },

  "frieren: beyond journey's end": {
    title: "Frieren: Beyond Journey's End",
    subtitle: 'Fantasy, Adventure, Drama, Philosophy, Featured',
    rank: 1,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/9b/85/62/9b8562f46bc5b8127783b7adeefeac57.gif',
      'https://i.pinimg.com/originals/2a/2f/0b/2a2f0bde7281bb17d4e326218a6a3303.gif',
      'https://i.pinimg.com/originals/3d/aa/c5/3daac57c1a68599a1c7b300038fb446e.gif',
      'https://i.pinimg.com/originals/8f/e1/d6/8fe1d6ed50df30ff05d38b2ed2d82cb6.gif',
      'https://i.pinimg.com/originals/5e/8f/1b/5e8f1b51598a2c10d59799b928031873.gif',
      'https://i.pinimg.com/originals/b7/90/16/b790164ba98ae10425b37bc7ba1a1c90.gif',
    ],
    description:
      'Naruto Uzumaki, now older and stronger, returns to the Hidden Leaf Village and continues his quest to save his friend Sasuke from the darkness while protecting his ninja comrades.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/52991/Sousou_no_Frieren',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.9 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '99% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 99,
      },
    },
    details: {
      genres: 'Fantasy, Adventure, Drama, Shounen',
      publisher: 'Shogakukan / TOHO animation',
      developer: 'Madhouse',
      releaseDate: 'September 29, 2023',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/52991/Sousou_no_Frieren',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/52991/Sousou_no_Frieren',
      },
    },
    similarItems: [
      {
        title: 'Vinland Saga',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1500/103005l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Historical, Action, Drama',
      },
      {
        title: 'Fullmetal Alchemist: Brotherhood',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1223/96541l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.9,
        releaseYear: 2009,
        subtitle: 'Shounen, Fantasy, Adventure',
      },
      {
        title: 'Dororo',
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYzk2ODAyZjctNjExNS00ZDk0LWE1ZDMtZmIyNzI2NjNjNjllXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2019,
        subtitle: 'Historical, Samurai, Dark Fantasy',
      },
      {
        title: 'Spirited Away',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/6/79597l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2001,
        subtitle: 'Fantasy, Adventure, Drama',
      },
    ],
  },

  gintama: {
    title: 'Gintama',
    subtitle: 'Comedy, Parody, Action, Samurai, Sci-Fi',
    rank: 7,
    miniPosterUrl: 'https://i.pinimg.com/originals/15/5b/5b/155b5b97a635dc96accf98635ddc1199.gif',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/10/73249l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://i.pinimg.com/originals/15/5b/5b/155b5b97a635dc96accf98635ddc1199.gif',
    screenshots: [
      'https://i.pinimg.com/originals/27/c8/75/27c8759455658514b0bad1aab1ac519c.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/b5/f3/fa/b5f3faaf992a13ae521c951e67fa57f9.gif',
      'https://i.pinimg.com/originals/b2/3f/65/b23f65a5e51f431626d465dc2f83c418.gif',
      'https://i.pinimg.com/originals/ed/1a/52/ed1a529a1f1e425166344f73a9a6e115.gif',
      'https://i.pinimg.com/originals/20/24/92/202492265bd015f4c2e71b8ea73f6da7.gif',
    ],
    description:
      "Thorfinn pursues a journey with his father's killer in order to take revenge and end his life in a duel of honor, while an epic historical struggle engulfs the Viking world.",
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/918/Gintama',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.7 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '97% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Comedy, Parody, Action, Historical, Sci-Fi',
      publisher: 'Shueisha / TV Tokyo',
      developer: 'Sunrise / Bandai Namco Pictures',
      releaseDate: 'April 4, 2006',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/918/Gintama',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/918/Gintama',
      },
    },
    similarItems: [
      {
        title: 'One Piece',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 1999,
        subtitle: 'Shounen, Adventure, Fantasy',
      },
      {
        title: 'Great Teacher Onizuka (GTO)',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/13/11460l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 1999,
        subtitle: 'Comedy, School, Shounen',
      },
      {
        title: 'Mob Psycho 100',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/8/80356l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2016,
        subtitle: 'Action, Comedy, Supernatural',
      },
      {
        title: 'Grand Blue Dreaming',
        posterUrl: 'https://i.pinimg.com/736x/1e/30/5f/1e305f379994088232bffdb81037ea4e.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2018,
        subtitle: 'Comedy, College Life, Diving',
      },
    ],
  },

  'vinland saga': {
    title: 'Vinland Saga',
    subtitle: 'Historical, Action, Drama, Vikings, Featured',
    rank: 9,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1500/103005l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1500/103005l.jpg',
    videoUrl: 'https://assets.pinterest.com/ext/embed.html?id=632896553931075238',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1500/103005l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/e5/0e/bf/e50ebf8f6304f472751eaa19194d653c.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/13/3b/b7/133bb762895fec345049daa4e58dcf46.gif',
      'https://i.pinimg.com/originals/94/3c/ca/943cca2bfa2586c4c83871121aacb5da.gif',
      'https://i.pinimg.com/originals/3c/bd/c3/3cbdc3aad0fe5855cd14ee1f6d8ca7c7.gif',
      'https://i.pinimg.com/originals/ac/1f/2b/ac1f2bddabff77ac7c32cb76f82474c1.gif',
    ],
    description:
      'Monkey D. Luffy sets sail with his crew of Straw Hat Pirates through the treacherous Grand Line to find the legendary treasure One Piece and become King of the Pirates.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/37521/Vinland_Saga',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.6 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '96% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 96,
      },
    },
    details: {
      genres: 'Historical, Action, Drama, Military, Featured',
      publisher: 'Kodansha / Twin Engine',
      developer: 'Wit Studio / MAPPA',
      releaseDate: 'July 8, 2019',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/37521/Vinland_Saga',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/37521/Vinland_Saga',
      },
    },
    similarItems: [
      {
        title: 'Berserk',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/79352l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 1997,
        subtitle: 'Dark Fantasy, Action, Drama',
      },
      {
        title: 'Attack on Titan',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2013,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Dororo',
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYzk2ODAyZjctNjExNS00ZDk0LWE1ZDMtZmIyNzI2NjNjNjllXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2019,
        subtitle: 'Historical, Samurai, Dark Fantasy',
      },
      {
        title: 'Monster',
        posterUrl: 'https://pbs.twimg.com/media/F7TGWJWX0AAo17j.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2004,
        subtitle: 'Psychological Thriller, Mystery, Drama',
      },
    ],
  },

  'your name (kimi no na wa)': {
    title: 'Your Name (Kimi no Na wa)',
    subtitle: 'Romance, Drama, Supernatural, Fantasy, Makoto Shinkai Masterpiece',
    rank: 11,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/5/87048l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/5/87048l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/5/87048l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/ef/c6/74/efc67448bb053ac31bf856623433c2b6.gif',
      'https://i.pinimg.com/originals/a0/25/ba/a025ba488e914cdd4ec1a0c3dac0758b.gif',
      'https://i.pinimg.com/originals/4b/cf/aa/4bcfaacc3c497169cd788c574fb446ba.gif',
      'https://i.pinimg.com/originals/a5/0b/30/a50b300ba787cd82cff8cfc1b391c9eb.gif',
      'https://i.pinimg.com/originals/b4/c9/42/b4c9421e1e14e591228c46bd66e23387.gif',
      'https://i.pinimg.com/originals/92/f2/29/92f229690f0ef055f25f2c11dab87148.gif',
    ],
    description:
      'Guts, a wandering mercenary known as the Black Swordsman, joins the Band of the Hawk under the charismatic Griffith, fighting ferocious battles in a dark and unforgiving medieval world.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/32281/Kimi_no_Na_wa',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.8 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '98% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 98,
      },
    },
    details: {
      genres: 'Romance, Drama, Supernatural, School',
      publisher: 'Toho',
      developer: 'CoMix Wave Films',
      releaseDate: 'August 26, 2016',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/32281/Kimi_no_Na_wa',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/32281/Kimi_no_Na_wa',
      },
    },
    similarItems: [
      {
        title: 'A Silent Voice (Koe no Katachi)',
        posterUrl: 'https://image.tmdb.org/t/p/original/xojX4BFXkj92CnkYuwmlZXNjpr8.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2016,
        subtitle: 'Drama, School, Psychological Thriller',
      },
      {
        title: 'Spirited Away',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/6/79597l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2001,
        subtitle: 'Fantasy, Adventure, Drama',
      },
      {
        title: 'The Tunnel to Summer, the Exit of Goodbyes',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1761/123168l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2022,
        subtitle: 'Sci-Fi, Romance, Drama',
      },
      {
        title: 'Horimiya',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1695/111486l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2021,
        subtitle: 'Romantic Comedy, School, Slice of Life',
      },
    ],
  },

  'a silent voice (koe no katachi)': {
    title: 'A Silent Voice (Koe no Katachi)',
    subtitle: 'Drama, School, Psychological Thriller, Featured, Romance',
    rank: 12,
    miniPosterUrl: 'https://image.tmdb.org/t/p/original/xojX4BFXkj92CnkYuwmlZXNjpr8.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/xojX4BFXkj92CnkYuwmlZXNjpr8.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://image.tmdb.org/t/p/original/xojX4BFXkj92CnkYuwmlZXNjpr8.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/13/71/90/1371902eb00ba3a753ecb49143b160f8.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/2e/46/2b/2e462b995f2c04000b91d1fb8339188e.gif',
      'https://i.pinimg.com/originals/d5/32/cf/d532cf5e2bb5f80c58f73883153e6f54.gif',
      'https://i.pinimg.com/originals/f2/27/08/f2270874a81476c0e039ba30fe810eb0.gif',
      'https://i.pinimg.com/originals/36/f0/72/36f072d7161aae44fb7e86ee3e592e35.gif',
      'https://i.pinimg.com/originals/50/cb/5c/50cb5cd8f238944acb1d09ff181a16e6.gif',
    ],
    description:
      'A former elementary school bully seeks redemption and reconciliation with the deaf girl he tormented years earlier, confronting his own demons along the way.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/28851/Koe_no_Katachi',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.7 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '97% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Drama, School, Shounen, Psychological Thriller',
      publisher: 'Shochiku / Kodansha',
      developer: 'Kyoto Animation',
      releaseDate: 'September 17, 2016',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/28851/Koe_no_Katachi',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/28851/Koe_no_Katachi',
      },
    },
    similarItems: [
      {
        title: 'Your Name (Kimi no Na wa)',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/5/87048l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2016,
        subtitle: 'Romance, Drama, Supernatural',
      },
      {
        title: 'Horimiya',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1695/111486l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2021,
        subtitle: 'Romantic Comedy, School, Slice of Life',
      },
      {
        title: 'The Fragrant Flower Blooms With Dignity',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1230/145610l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.3,
        releaseYear: 2025,
        subtitle: 'Romance, School, Drama',
      },
      {
        title: 'The Tunnel to Summer, the Exit of Goodbyes',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1761/123168l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2022,
        subtitle: 'Sci-Fi, Romance, Drama',
      },
    ],
  },

  'naruto: shippuden': {
    title: 'Naruto: Shippuden',
    subtitle: 'Shounen, Ninja, Martial Arts, Action, Friendship',
    rank: 13,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/13/17405l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/13/17405l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/13/17405l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/3f/83/e0/3f83e0e77946e4d824fce106d657fcd5.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/c8/6d/9d/c86d9d58ec5bacf269f375daedbb1b36.gif',
      'https://i.pinimg.com/originals/c7/1f/1c/c71f1cd83ea73ab458eabe8fed20687f.gif',
      'https://i.pinimg.com/originals/a9/11/11/a911113c3a726072d12d689d8f72e71b.gif',
      'https://i.pinimg.com/originals/8d/4d/b3/8d4db30dac973ecc09668b36ba19f11e.gif',
      'https://i.pinimg.com/originals/94/68/7d/94687d8e451e0fd41553ac0abca51adf.gif',
      'https://i.pinimg.com/originals/33/35/b9/3335b91e75ed2757581a63f404650aac.gif',
    ],
    description:
      'Two teenagers share a profound, magical connection upon discovering they are swapping bodies across space and time, racing to meet before an impending disaster.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/1735/Naruto__Shippuuden',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.6 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '96% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 96,
      },
    },
    details: {
      genres: 'Shounen, Action, Adventure, Martial Arts, Ninja',
      publisher: 'Shueisha / TV Tokyo',
      developer: 'Studio Pierrot',
      releaseDate: 'February 15, 2007',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/1735/Naruto__Shippuuden',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/1735/Naruto__Shippuuden',
      },
    },
    similarItems: [
      {
        title: 'Boruto: Naruto Next Generations',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/9/84460l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8,
        releaseYear: 2017,
        subtitle: 'Shounen, Ninja, Next Generation',
      },
      {
        title: 'Bleach',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2022,
        subtitle: 'Shounen, Action, Supernatural',
      },
      {
        title: 'One Piece',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 1999,
        subtitle: 'Shounen, Adventure, Fantasy',
      },
      {
        title: 'Hunter x Hunter (2011)',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: 'Shounen, Adventure, Fantasy',
      },
    ],
  },

  'boruto: naruto next generations': {
    title: 'Boruto: Naruto Next Generations',
    subtitle: 'Shounen, Ninja, Next Generation, Action, Adventure',
    rank: 45,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/9/84460l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/9/84460l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/9/84460l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/e2/20/a8/e220a8eb66d9b2b15f76dcf4c35a8a7d.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/d3/91/a6/d391a6d259e4b28cdce19dfb2576b968.gif',
      'https://i.pinimg.com/originals/55/57/95/555795390ba979491cf039cd6367a8a7.gif',
      'https://i.pinimg.com/originals/6a/21/a8/6a21a8ca00cce0642bcc92a6310ba356.gif',
      'https://i.pinimg.com/originals/53/d6/7e/53d67e34587fa155e3221c58a0d7732f.gif',
      'https://i.pinimg.com/originals/f8/24/dc/f824dc56a6099d6c2051bc46bc7978c1.gif',
    ],
    description:
      'Boruto Uzumaki, son of the Seventh Hokage Naruto, chooses to carve his own path in the ninja world alongside Sarada Uchiha and Mitsuki amidst technological revolutions.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/34566/Boruto__Naruto_Next_Generations',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '8.0 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '80% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 80,
      },
    },
    details: {
      genres: 'Shounen, Action, Adventure, Ninja',
      publisher: 'Shueisha / TV Tokyo',
      developer: 'Studio Pierrot',
      releaseDate: 'April 5, 2017',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/34566/Boruto__Naruto_Next_Generations',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/34566/Boruto__Naruto_Next_Generations',
      },
    },
    similarItems: [
      {
        title: 'Naruto: Shippuden',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/13/17405l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2007,
        subtitle: 'Shounen, Ninja, Martial Arts',
      },
      {
        title: 'Bleach',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2022,
        subtitle: 'Shounen, Action, Supernatural',
      },
      {
        title: 'Jujutsu Kaisen',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2020,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'My Hero Academia',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/78745l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2016,
        subtitle: 'Shounen, Superheroes, Action',
      },
    ],
  },

  bleach: {
    title: 'Bleach: Thousand-Year Blood War',
    subtitle: 'Shounen, Action, Supernatural, Featured',
    rank: 6,
    miniPosterUrl: 'https://i.pinimg.com/originals/e9/02/12/e90212a73dba3feec807042dc7c1dda1.gif',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://i.pinimg.com/originals/e9/02/12/e90212a73dba3feec807042dc7c1dda1.gif',
    screenshots: [
      'https://i.pinimg.com/originals/a6/c2/db/a6c2db3bb8a33ecacff250414e3a10b5.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/bb/4c/b0/bb4cb0323ce0f078e990e9f88c8e6686.gif',
      'https://i.pinimg.com/originals/62/92/03/6292035399b2d8cc0dd5dfcbfff8745a.gif',
      'https://i.pinimg.com/originals/5d/2c/44/5d2c44694918947aede42306cb7154d0.gif',
      'https://i.pinimg.com/originals/62/55/0f/62550f0baeb01b9a1a9683d2ba600c17.gif',
    ],
    description:
      'Naruto Uzumaki, now older and stronger, returns to the Hidden Leaf Village and continues his quest to save his friend Sasuke from the darkness while protecting his ninja comrades.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/41467/Bleach',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.8 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '98% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 98,
      },
    },
    details: {
      genres: 'Shounen, Action, Supernatural, Fantasy',
      publisher: 'Shueisha / TV Tokyo',
      developer: 'Studio Pierrot',
      releaseDate: 'October 11, 2022',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/41467/Bleach',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/41467/Bleach',
      },
    },
    similarItems: [
      {
        title: 'Naruto: Shippuden',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/13/17405l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2007,
        subtitle: 'Shounen, Ninja, Martial Arts',
      },
      {
        title: 'Jujutsu Kaisen',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2020,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Demon Slayer: Kimetsu no Yaiba',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'One Piece',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1244/138851l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 1999,
        subtitle: 'Shounen, Adventure, Fantasy',
      },
    ],
  },

  'mob psycho 100': {
    title: 'Mob Psycho 100',
    subtitle: 'Action, Comedy, Supernatural, Featured, Psychological Thriller',
    rank: 16,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/8/80356l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/8/80356l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/8/80356l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/17/d1/5d/17d15dbf4384e77a719dc7357af27105.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/a6/34/46/a63446d0a31da704f93ea36456b5c6e7.gif',
      'https://i.pinimg.com/originals/2a/7e/42/2a7e42c8a096727f801abbbdd0dc370b.gif',
      'https://i.pinimg.com/originals/8c/55/58/8c55589f5eef5722c406d5a29cf42dcf.gif',
      'https://i.pinimg.com/originals/a4/86/3f/a4863f1f2c92e459dd8a2b606775cac8.gif',
      'https://i.pinimg.com/originals/c8/1c/55/c81c558ff52706cb288fe3e0da852428.gif',
    ],
    description:
      'Naruto Uzumaki, now older and stronger, returns to the Hidden Leaf Village and continues his quest to save his friend Sasuke from the darkness while protecting his ninja comrades.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/32182/Mob_Psycho_100',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.6 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '96% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 96,
      },
    },
    details: {
      genres: 'Action, Comedy, Supernatural, Shounen',
      publisher: 'Warner Bros. Japan / Shogakukan',
      developer: 'Bones',
      releaseDate: 'July 12, 2016',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/32182/Mob_Psycho_100',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/32182/Mob_Psycho_100',
      },
    },
    similarItems: [
      {
        title: 'One Punch Man',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/12/76049l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2015,
        subtitle: 'Action, Comedy, Parody',
      },
      {
        title: 'Jujutsu Kaisen',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2020,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Great Teacher Onizuka (GTO)',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/13/11460l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 1999,
        subtitle: 'Comedy, School, Shounen',
      },
    ],
  },

  'one punch man': {
    title: 'One Punch Man',
    subtitle: 'Action, Comedy, Parody, Superheroes, Featured',
    rank: 17,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/12/76049l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/12/76049l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/12/76049l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/ab/de/38/abde38499c5774bd996a79157982115e.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/26/fc/7e/26fc7efb8a954a9b2b9e5e27e108d2ba.gif',
      'https://i.pinimg.com/originals/03/50/34/035034a8d71bfa7202944cd397f9c20b.gif',
      'https://i.pinimg.com/originals/44/27/c2/4427c225526e37096a0c957a0ec113d0.gif',
      'https://i.pinimg.com/originals/54/a9/24/54a924e9d9a8f2283a617d853f74045a.gif',
      'https://i.pinimg.com/originals/b3/e2/35/b3e235ff3bff01e22d5310cadb0967c9.gif',
    ],
    description:
      'The story of Saitama, a superhero who can defeat any opponent with a single punch but seeks to find a worthy opponent after growing bored by a lack of challenge.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/30276/One_Punch_Man',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.6 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '96% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 96,
      },
    },
    details: {
      genres: 'Action, Comedy, Parody, Superheroes, Sci-Fi',
      publisher: 'Bandai Visual / Shueisha',
      developer: 'Madhouse',
      releaseDate: 'October 5, 2015',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/30276/One_Punch_Man',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/30276/One_Punch_Man',
      },
    },
    similarItems: [
      {
        title: 'Mob Psycho 100',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/8/80356l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2016,
        subtitle: 'Action, Comedy, Supernatural',
      },
      {
        title: 'My Hero Academia',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/78745l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2016,
        subtitle: 'Shounen, Superheroes, Action',
      },
      {
        title: 'Jujutsu Kaisen',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2020,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Solo Leveling',
        posterUrl: 'https://m.media-amazon.com/images/I/811qwtjnRKL._AC_UF894,1000_QL80_.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2024,
        subtitle: 'Action, Fantasy, Dungeons',
      },
    ],
  },

  're:zero - starting life in another world': {
    title: 'Re:Zero - Starting Life in Another World',
    subtitle: 'Isekai, Psychological Thriller, Dark Fantasy, Drama',
    rank: 18,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1522/128039l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1522/128039l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1522/128039l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/f9/4f/28/f94f2859d08c9808aa19f3512fa9242a.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/79/f9/a7/79f9a795f329f2aa896b4b18ac9bed66.gif',
      'https://i.pinimg.com/originals/0b/dd/40/0bdd409fb5df3172db56ef85f3fa8b4a.gif',
      'https://i.pinimg.com/originals/4a/1f/ba/4a1fba9309bfa78d49a7ae3d0f120891.gif',
      'https://i.pinimg.com/originals/d4/c5/19/d4c519979cde34f3fffcef38786c3560.gif',
      'https://i.pinimg.com/originals/f5/c1/70/f5c170a919a02445509e021deae302de.gif',
    ],
    description:
      'A psychic middle school boy tries to live a normal life and keep his growing, volatile emotional powers under control, working under a charismatic charlatan mentor.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/31240/Re_Zero_kara_Hajimeru_Isekai_Seikatsu',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.4 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '94% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 94,
      },
    },
    details: {
      genres: 'Isekai, Drama, Dark Fantasy, Psychological Thriller',
      publisher: 'Kadokawa / TV Tokyo',
      developer: 'White Fox',
      releaseDate: 'April 4, 2016',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/31240/Re_Zero_kara_Hajimeru_Isekai_Seikatsu',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/31240/Re_Zero_kara_Hajimeru_Isekai_Seikatsu',
      },
    },
    similarItems: [
      {
        title: 'Steins;Gate',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1935/127974l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: 'Sci-Fi, Psychological Thriller, Time Travel',
      },
      {
        title: "KonoSuba: God's Blessing on this Wonderful World!",
        posterUrl: 'https://cdn.myanimelist.net/images/anime/8/77838l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 2016,
        subtitle: 'Comedy, Isekai, Parody',
      },
      {
        title: 'The Rising of the Shield Hero',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1490/101365l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2019,
        subtitle: 'Isekai, Dark Fantasy, Action',
      },
    ],
  },

  monster: {
    title: 'Monster',
    subtitle: 'Psychological Thriller, Mystery, Drama, Featured, Masterpiece',
    rank: 8,
    miniPosterUrl: 'https://i.pinimg.com/originals/27/77/ff/2777ffb86a4d99a4e32b2e322434b032.gif',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/10/67341l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://i.pinimg.com/originals/db/85/af/db85af78cf34ed35a07398e41e5634c5.gif',
    screenshots: [
      'https://i.pinimg.com/originals/db/85/af/db85af78cf34ed35a07398e41e5634c5.gif',
      'https://i.pinimg.com/originals/be/12/3c/be123c3a5dcaca96202ea511cb43c8e8.gif',
      'https://i.pinimg.com/originals/f8/a1/d3/f8a1d3e5f0857aa219ef6b01f232d259.gif',
      'https://i.pinimg.com/originals/27/77/ff/2777ffb86a4d99a4e32b2e322434b032.gif',
      'https://i.pinimg.com/originals/5b/9b/b2/5b9bb2be204276d5cc1c24aed859494d.gif',
    ],
    description:
      'A self-proclaimed mad scientist accidentally discovers a way to send text messages to the past, triggering unforeseen consequences that threaten the future of humanity.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/19/Monster',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.8 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '98% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 98,
      },
    },
    details: {
      genres: 'Psychological Thriller, Mystery, Drama, Featured',
      publisher: 'Shogakukan / Nippon Television',
      developer: 'Madhouse',
      releaseDate: 'April 7, 2004',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/19/Monster',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/19/Monster',
      },
    },
    similarItems: [
      {
        title: 'Death Note',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2006,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Code Geass: Lelouch of the Rebellion',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/4/9391l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2006,
        subtitle: 'Mecha, Military, Psychological Thriller',
      },
      {
        title: 'Vinland Saga',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1500/103005l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Historical, Action, Drama',
      },
      {
        title: 'Berserk',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/79352l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 1997,
        subtitle: 'Dark Fantasy, Action, Drama',
      },
    ],
  },

  'grand blue dreaming': {
    title: 'Grand Blue Dreaming',
    subtitle: 'Comedy, College Life, Diving, Unrestrained Humor',
    rank: 22,
    miniPosterUrl: 'https://i.pinimg.com/736x/1e/30/5f/1e305f379994088232bffdb81037ea4e.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1792/93740l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://i.pinimg.com/736x/1e/30/5f/1e305f379994088232bffdb81037ea4e.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/b6/77/a2/b677a2085bd9c35d4028a39c831b4019.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/ee/11/67/ee1167c5aff4f17bfa30803805f27803.gif',
      'https://i.pinimg.com/originals/a6/bd/cb/a6bdcb72857c3604b811e5036452cb23.gif',
      'https://i.pinimg.com/originals/5e/bc/b2/5ebcb28baf857585b022a30602098b49.gif',
      'https://i.pinimg.com/1200x/4f/00/dd/4f00ddf991bc9b5cbc21d55396ee29b5.jpg',
    ],
    description:
      'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a supernatural notebook capable of killing anyone whose name is written into it.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/37105/Grand_Blue',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.4 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '94% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 94,
      },
    },
    details: {
      genres: 'Comedy, Featured, Slice of Life, Sports',
      publisher: 'Kodansha / Avex Pictures',
      developer: 'Zero-G',
      releaseDate: 'July 14, 2018',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/37105/Grand_Blue',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/37105/Grand_Blue',
      },
    },
    similarItems: [
      {
        title: 'Great Teacher Onizuka (GTO)',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/13/11460l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 1999,
        subtitle: 'Comedy, School, Shounen',
      },
      {
        title: 'Gintama',
        posterUrl: 'https://m.media-amazon.com/images/I/81GfsGOlNAS.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2006,
        subtitle: 'Comedy, Parody, Action',
      },
      {
        title: "KonoSuba: God's Blessing on this Wonderful World!",
        posterUrl: 'https://cdn.myanimelist.net/images/anime/8/77838l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 2016,
        subtitle: 'Comedy, Isekai, Parody',
      },
      {
        title: 'Kaguya-sama: Love is War',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1295/106551l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Romantic Comedy, School, Psychological',
      },
    ],
  },

  'chainsaw man': {
    title: 'Chainsaw Man',
    subtitle: 'Action, Dark Fantasy, Supernatural, Demons, Madness',
    rank: 20,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/13/e7/ab/13e7abe4f8150ca9f3b25221b5da3d0d.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/45/98/03/459803401c356fece9f4e7173deead5a.gif',
      'https://i.pinimg.com/originals/d0/d0/f4/d0d0f497e74132aac08104ea8619e264.gif',
      'https://i.pinimg.com/originals/00/a3/5d/00a35d27d771aca1146ef10dbfdaae82.gif',
      'https://i.pinimg.com/originals/07/eb/c4/07ebc4b35c97266231615542f50896bd.gif',
    ],
    description:
      'Former biker gang leader Eikichi Onizuka decides to become the greatest high school teacher in the world, bringing unorthodox life lessons to a troubled classroom of misfits.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/44511/Chainsaw_Man',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.4 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '94% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 94,
      },
    },
    details: {
      genres: 'Action, Dark Fantasy, Supernatural, Shounen',
      publisher: 'Shueisha / TOHO animation',
      developer: 'MAPPA',
      releaseDate: 'October 12, 2022',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/44511/Chainsaw_Man',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/44511/Chainsaw_Man',
      },
    },
    similarItems: [
      {
        title: 'Jujutsu Kaisen',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2020,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Demon Slayer: Kimetsu no Yaiba',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Hellsing Ultimate',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/6/73245l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2006,
        subtitle: 'Action, Vampires, Horror',
      },
      {
        title: 'Dororo',
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYzk2ODAyZjctNjExNS00ZDk0LWE1ZDMtZmIyNzI2NjNjNjllXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2019,
        subtitle: 'Historical, Samurai, Dark Fantasy',
      },
    ],
  },

  'hellsing ultimate': {
    title: 'Hellsing Ultimate',
    subtitle: 'Action, Vampires, Horror, Supernatural, Dark Fantasy',
    rank: 21,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/6/73245l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/6/73245l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/6/73245l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/6/73245l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/6/73245l.jpg',
      'https://cdn.myanimelist.net/images/anime/6/73245l.jpg',
      'https://cdn.myanimelist.net/images/anime/6/73245l.jpg',
      'https://cdn.myanimelist.net/images/anime/6/73245l.jpg',
    ],
    description:
      "A boy swallows a cursed talisman—the finger of a demon—and becomes cursed himself. He enters a shaman school to be able to locate the demon's other body parts and thus exorcise himself.",
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/777/Hellsing_Ultimate',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.4 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '94% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 94,
      },
    },
    details: {
      genres: 'Action, Vampires, Horror, Supernatural, Featured',
      publisher: 'Geneon Universal Entertainment / Shonen Gahosha',
      developer: 'Satelight / Madhouse / Graphinica',
      releaseDate: 'February 10, 2006',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/777/Hellsing_Ultimate',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/777/Hellsing_Ultimate',
      },
    },
    similarItems: [
      {
        title: 'Berserk',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/79352l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 1997,
        subtitle: 'Dark Fantasy, Action, Drama',
      },
      {
        title: 'Chainsaw Man',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2022,
        subtitle: 'Action, Dark Fantasy, Supernatural',
      },
      {
        title: 'Dororo',
        posterUrl:
          'https://m.media-amazon.com/images/M/MV5BYzk2ODAyZjctNjExNS00ZDk0LWE1ZDMtZmIyNzI2NjNjNjllXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2019,
        subtitle: 'Historical, Samurai, Dark Fantasy',
      },
      {
        title: "JoJo's Bizarre Adventure",
        posterUrl: 'https://cdn.myanimelist.net/images/anime/3/40409l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2012,
        subtitle: 'Shounen, Action, Adventure',
      },
    ],
  },

  'initial d first stage': {
    title: 'Initial D First Stage',
    subtitle: 'Racing, Cars, Sports, Drift, Featured',
    rank: 24,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/13/21303l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/13/21303l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/13/21303l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/13/21303l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/13/21303l.jpg',
      'https://cdn.myanimelist.net/images/anime/13/21303l.jpg',
      'https://cdn.myanimelist.net/images/anime/13/21303l.jpg',
      'https://cdn.myanimelist.net/images/anime/13/21303l.jpg',
    ],
    description:
      'Guts, a wandering mercenary known as the Black Swordsman, joins the Band of the Hawk under the charismatic Griffith, fighting ferocious battles in a dark and unforgiving medieval world.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/185/Initial_D_First_Stage',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.3 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '93% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Racing, Cars, Sports, Drama, Featured',
      publisher: 'Kodansha / Avex Mode',
      developer: 'Studio Comet / Studio Gallop',
      releaseDate: 'April 18, 1998',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/185/Initial_D_First_Stage',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/185/Initial_D_First_Stage',
      },
    },
    similarItems: [
      {
        title: 'Haikyuu!!',
        posterUrl: 'https://m.media-amazon.com/images/I/71uT+Js3kCS.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 2014,
        subtitle: 'Shounen, Action',
      },
      {
        title: "Kuroko's Basketball",
        posterUrl: 'https://cdn.myanimelist.net/images/anime/11/50453l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.3,
        releaseYear: 2012,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Blue Lock',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1258/126926l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2022,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Great Teacher Onizuka (GTO)',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/13/11460l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 1999,
        subtitle: 'Comedy, School, Shounen',
      },
    ],
  },

  dororo: {
    title: 'Dororo',
    subtitle: 'Historical, Samurai, Dark Fantasy, Demons, Supernatural',
    rank: 23,
    miniPosterUrl: 'https://i.pinimg.com/originals/94/f1/81/94f18175dedf7a3054d3aaa7d47b15e8.gif',
    bannerUrl: 'https://i.pinimg.com/originals/94/f1/81/94f18175dedf7a3054d3aaa7d47b15e8.gif',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://i.pinimg.com/originals/bf/80/bb/bf80bbd9e98c4e8c62bf838aa70d7795.gif',
    screenshots: [
      'https://i.pinimg.com/originals/bf/80/bb/bf80bbd9e98c4e8c62bf838aa70d7795.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/62/bb/ba/62bbba409c55922de4d5375a02108d2d.gif',
      'https://i.pinimg.com/originals/57/60/8a/57608a4470999940395c51ab617c89a0.gif',
      'https://i.pinimg.com/originals/fe/e3/36/fee336228a7dc89de5c745764c72f7fe.gif',
      'https://i.pinimg.com/originals/03/a3/65/03a365f4eb5620e61e23f2140ca17969.gif',
    ],
    description:
      'Inspired by a small-stature volleyball ace known as the Little Giant, Shoyo Hinata creates a volleyball team in his final year of middle school and aims for the national tournament.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/37520/Dororo',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.2 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '92% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Historical, Dark Fantasy, Action, Samurai, Shounen',
      publisher: 'Twin Engine / Kodansha',
      developer: 'MAPPA / Tezuka Productions',
      releaseDate: 'January 7, 2019',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/37520/Dororo',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/37520/Dororo',
      },
    },
    similarItems: [
      {
        title: 'Berserk',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/79352l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 1997,
        subtitle: 'Dark Fantasy, Action, Drama',
      },
      {
        title: 'Demon Slayer: Kimetsu no Yaiba',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Vinland Saga',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1500/103005l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Historical, Action, Drama',
      },
      {
        title: 'Hellsing Ultimate',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/6/73245l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2006,
        subtitle: 'Action, Vampires, Horror',
      },
    ],
  },

  'solo leveling': {
    title: 'Solo Leveling',
    subtitle: 'Action, Fantasy, Dungeons, Progression, Hunters, Featured',
    rank: 18,
    miniPosterUrl: 'https://m.media-amazon.com/images/I/811qwtjnRKL._AC_UF894,1000_QL80_.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1598/141846l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://m.media-amazon.com/images/I/811qwtjnRKL._AC_UF894,1000_QL80_.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/51/91/da/5191daea9ea913dafdce238e65b01d8b.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/0e/b0/51/0eb051ba6b5cfe9cbfdc3ca92f20c87c.gif',
      'https://i.pinimg.com/originals/33/bd/d7/33bdd73f8ed677ef20a71935341b5c22.gif',
      'https://i.pinimg.com/originals/c1/25/62/c1256207b5fd0dc851da8d0ebd596c4e.gif',
      'https://i.pinimg.com/originals/d9/a1/f3/d9a1f394ff5722a94549f92fa3abcf0e.gif',
      'https://i.pinimg.com/originals/5f/d3/45/5fd345f7cbbc0b39ca4a615a0be62d5d.gif',
    ],
    description:
      'Guts, a wandering mercenary known as the Black Swordsman, joins the Band of the Hawk under the charismatic Griffith, fighting ferocious battles in a dark and unforgiving medieval world.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/52299/Ore_dake_Level_Up_na_Ken',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.4 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '94% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 94,
      },
    },
    details: {
      genres: 'Action, Adventure, Fantasy, Supernatural',
      publisher: 'Aniplex / D&C Media / Netmarble',
      developer: 'A-1 Pictures',
      releaseDate: 'January 7, 2024',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/52299/Ore_dake_Level_Up_na_Ken',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/52299/Ore_dake_Level_Up_na_Ken',
      },
    },
    similarItems: [
      {
        title: 'Jujutsu Kaisen',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2020,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Demon Slayer: Kimetsu no Yaiba',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Sword Art Online',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/11/39717l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.2,
        releaseYear: 2012,
        subtitle: 'Anime, Shounen, Virtual Reality',
      },
      {
        title: 'The Eminence in Shadow',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1874/121869l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 2022,
        subtitle: 'Action, Comedy, Isekai',
      },
    ],
  },

  'the disappearance of haruhi suzumiya': {
    title: 'The Disappearance of Haruhi Suzumiya',
    subtitle: 'Sci-Fi, Mysticism, School, Comedy, Masterpiece Kyoto Animation',
    rank: 19,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1749/119934l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1749/119934l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1749/119934l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/1749/119934l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/1749/119934l.jpg',
      'https://cdn.myanimelist.net/images/anime/1749/119934l.jpg',
      'https://cdn.myanimelist.net/images/anime/1749/119934l.jpg',
      'https://cdn.myanimelist.net/images/anime/1749/119934l.jpg',
    ],
    description:
      "A boy swallows a cursed talisman—the finger of a demon—and becomes cursed himself. He enters a shaman school to be able to locate the demon's other body parts and thus exorcise himself.",
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/7311/Suzumiya_Haruhi_no_Shoushitsu',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.5 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '95% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 95,
      },
    },
    details: {
      genres: 'Sci-Fi, Mysticism, School, Drama, Comedy',
      publisher: 'Kadokawa Shoten / Lantis',
      developer: 'Kyoto Animation',
      releaseDate: 'February 6, 2010',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/7311/Suzumiya_Haruhi_no_Shoushitsu',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/7311/Suzumiya_Haruhi_no_Shoushitsu',
      },
    },
    similarItems: [
      {
        title: 'Steins;Gate',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1935/127974l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: 'Sci-Fi, Psychological Thriller, Time Travel',
      },
      {
        title: 'Rascal Does Not Dream of Bunny Girl Senpai',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1301/93586l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.3,
        releaseYear: 2018,
        subtitle: 'Psychological Thriller, Romance, School',
      },
      {
        title: 'The Tunnel to Summer, the Exit of Goodbyes',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1761/123168l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2022,
        subtitle: 'Sci-Fi, Romance, Drama',
      },
      {
        title: 'Hyouka',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/13/37087l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2012,
        subtitle: 'Mystery, School, Slice of Life',
      },
    ],
  },

  'rascal does not dream of bunny girl senpai': {
    title: 'Rascal Does Not Dream of Bunny Girl Senpai',
    subtitle: 'Psychological Thriller, Romance, School, Supernatural, Drama',
    rank: 26,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1301/93586l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1301/93586l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1301/93586l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/1301/93586l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/1301/93586l.jpg',
      'https://cdn.myanimelist.net/images/anime/1301/93586l.jpg',
      'https://cdn.myanimelist.net/images/anime/1301/93586l.jpg',
      'https://cdn.myanimelist.net/images/anime/1301/93586l.jpg',
    ],
    description:
      'A self-proclaimed mad scientist accidentally discovers a way to send text messages to the past, triggering unforeseen consequences that threaten the future of humanity.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/37450/Seishun_Buta_Yarou_wa_Bunny_Girl_Senpai_no_Yume_wo_Minai',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.3 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '93% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Romance, Supernatural, School, Drama, Psychological Thriller',
      publisher: 'Aniplex / ASCII Media Works',
      developer: 'CloverWorks',
      releaseDate: 'October 4, 2018',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/37450/Seishun_Buta_Yarou_wa_Bunny_Girl_Senpai_no_Yume_wo_Minai',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/37450/Seishun_Buta_Yarou_wa_Bunny_Girl_Senpai_no_Yume_wo_Minai',
      },
    },
    similarItems: [
      {
        title: 'The Disappearance of Haruhi Suzumiya',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1749/119934l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 2010,
        subtitle: 'Sci-Fi, Mysticism, School',
      },
      {
        title: 'My Teen Romantic Comedy SNAFU',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/12/49605l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2013,
        subtitle: 'Romantic Comedy, School, Psychological Drama',
      },
      {
        title: 'The Tunnel to Summer, the Exit of Goodbyes',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1761/123168l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2022,
        subtitle: 'Sci-Fi, Romance, Drama',
      },
      {
        title: 'Horimiya',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1695/111486l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2021,
        subtitle: 'Romantic Comedy, School, Slice of Life',
      },
    ],
  },

  'the tunnel to summer, the exit of goodbyes': {
    title: 'The Tunnel to Summer, the Exit of Goodbyes',
    subtitle: 'Sci-Fi, Romance, Drama, Mysticism, Supernatural',
    rank: 30,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1761/123168l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1761/123168l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1761/123168l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/1761/123168l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/1761/123168l.jpg',
      'https://cdn.myanimelist.net/images/anime/1761/123168l.jpg',
      'https://cdn.myanimelist.net/images/anime/1761/123168l.jpg',
      'https://cdn.myanimelist.net/images/anime/1761/123168l.jpg',
    ],
    description:
      'Kyon wakes up on a freezing December morning to find that the SOS Brigade has ceased to exist, Haruhi is missing, and nobody remembers anything unusual.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/50593/Natsu_e_no_Tunnel_Sayonara_no_Deguchi',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.1 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '91% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Romance, Drama, Sci-Fi, Supernatural',
      publisher: 'Pony Canyon / Shogakukan',
      developer: 'CLAP',
      releaseDate: 'September 9, 2022',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/50593/Natsu_e_no_Tunnel_Sayonara_no_Deguchi',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/50593/Natsu_e_no_Tunnel_Sayonara_no_Deguchi',
      },
    },
    similarItems: [
      {
        title: 'Your Name (Kimi no Na wa)',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/5/87048l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2016,
        subtitle: 'Romance, Drama, Supernatural',
      },
      {
        title: 'A Silent Voice (Koe no Katachi)',
        posterUrl: 'https://image.tmdb.org/t/p/original/xojX4BFXkj92CnkYuwmlZXNjpr8.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2016,
        subtitle: 'Drama, School, Psychological Thriller',
      },
      {
        title: 'Rascal Does Not Dream of Bunny Girl Senpai',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1301/93586l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.3,
        releaseYear: 2018,
        subtitle: 'Psychological Thriller, Romance, School',
      },
      {
        title: 'The Disappearance of Haruhi Suzumiya',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1749/119934l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 2010,
        subtitle: 'Sci-Fi, Mysticism, School',
      },
    ],
  },

  'k-on!': {
    title: 'K-ON!',
    subtitle: 'Music, Comedy, School, Slice of Life, Friendship',
    rank: 27,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/10/76120l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/10/76120l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/10/76120l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/10/76120l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/10/76120l.jpg',
      'https://cdn.myanimelist.net/images/anime/10/76120l.jpg',
      'https://cdn.myanimelist.net/images/anime/10/76120l.jpg',
      'https://cdn.myanimelist.net/images/anime/10/76120l.jpg',
    ],
    description:
      'Two teenagers share a profound, magical connection upon discovering they are swapping bodies across space and time, racing to meet before an impending disaster.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/5680/K-On',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.2 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '92% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Music, Comedy, School, Slice of Life',
      publisher: 'Pony Canyon / Houbunsha / TBS',
      developer: 'Kyoto Animation',
      releaseDate: 'April 3, 2009',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/5680/K-On',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/5680/K-On',
      },
    },
    similarItems: [
      {
        title: 'Hyouka',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/13/37087l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2012,
        subtitle: 'Mystery, School, Slice of Life',
      },
      {
        title: 'Horimiya',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1695/111486l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2021,
        subtitle: 'Romantic Comedy, School, Slice of Life',
      },
      {
        title: 'The Pet Girl of Sakurasou',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/4/43643l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2012,
        subtitle: 'Romantic Comedy, Drama, Featured',
      },
      {
        title: 'My Dress-Up Darling',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1179/119897l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2022,
        subtitle: 'Romantic Comedy, Featured, Slice of Life',
      },
    ],
  },

  'spy x family': {
    title: 'SPY x FAMILY',
    subtitle: 'Comedy, Spies, Action, Family, Slice of Life',
    rank: 28,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/5a/35/1a/5a351aa5067e01fa2e00db8b4191c999.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/8c/da/a7/8cdaa7de3cffdb8a1536eaa28f0c576c.gif',
      'https://i.pinimg.com/originals/8a/cc/19/8acc197aa3de4d70a60fa1057e2ba7c4.gif',
      'https://i.pinimg.com/originals/d1/42/47/d142470724f0ff1a6c0d04331d156042.gif',
      'https://i.pinimg.com/originals/03/a6/3e/03a63e99455bc91f6511bf020e4261d3.gif',
      'https://i.pinimg.com/originals/bd/3a/3d/bd3a3d2e4b957f0998d5f1da1a4ab431.gif',
    ],
    description:
      'Energy-conserving high school student Hotaro Oreki joins the Classic Literature Club and finds himself constantly roped into solving curious everyday school mysteries.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/50265/Spy_x_Family',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.4 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '94% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 94,
      },
    },
    details: {
      genres: 'Comedy, Action, Spies, Shounen, Slice of Life',
      publisher: 'TOHO animation / Shueisha',
      developer: 'Wit Studio / CloverWorks',
      releaseDate: 'April 9, 2022',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/50265/Spy_x_Family',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/50265/Spy_x_Family',
      },
    },
    similarItems: [
      {
        title: 'Kaguya-sama: Love is War',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1295/106551l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Romantic Comedy, School, Psychological',
      },
      {
        title: 'Assassination Classroom',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/5/75810l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.3,
        releaseYear: 2015,
        subtitle: 'Comedy, Action, School',
      },
      {
        title: 'Mob Psycho 100',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/8/80356l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2016,
        subtitle: 'Action, Comedy, Supernatural',
      },
      {
        title: 'Gintama',
        posterUrl: 'https://m.media-amazon.com/images/I/81GfsGOlNAS.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2006,
        subtitle: 'Comedy, Parody, Action',
      },
    ],
  },

  overlord: {
    title: 'Overlord',
    subtitle: 'Isekai, Dark Fantasy, Action, Magic, Featured',
    rank: 29,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/7/88019l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/7/88019l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/7/88019l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/7/88019l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/7/88019l.jpg',
      'https://cdn.myanimelist.net/images/anime/7/88019l.jpg',
      'https://cdn.myanimelist.net/images/anime/7/88019l.jpg',
      'https://cdn.myanimelist.net/images/anime/7/88019l.jpg',
    ],
    description:
      'Student council president Miyuki Shirogane and vice-president Kaguya Shinomiya are in love, but both are too proud to confess first in a hilarious battle of romantic wits.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/29803/Overlord',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.1 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '91% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Isekai, Dark Fantasy, Action, Magic',
      publisher: 'Kadokawa / Enterbrain',
      developer: 'Madhouse',
      releaseDate: 'July 7, 2015',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/29803/Overlord',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/29803/Overlord',
      },
    },
    similarItems: [
      {
        title: 'That Time I Got Reincarnated as a Slime',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1694/93337l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2018,
        subtitle: 'Isekai, Fantasy, Action',
      },
      {
        title: 'The Eminence in Shadow',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1874/121869l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 2022,
        subtitle: 'Action, Comedy, Isekai',
      },
      {
        title: 'The Misfit of Demon King Academy',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1449/108428l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.9,
        releaseYear: 2020,
        subtitle: 'Action, Fantasy, Magic',
      },
      {
        title: 'Re:Zero - Starting Life in Another World',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1522/128039l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2016,
        subtitle: 'Isekai, Psychological Thriller, Dark Fantasy',
      },
    ],
  },

  'neon genesis evangelion': {
    title: 'Neon Genesis Evangelion',
    subtitle: 'Mecha, Psychological Drama, Philosophy, Apocalypse, Masterpiece',
    rank: 11,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1314/108941l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1314/108941l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1314/108941l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/c1/61/8d/c1618df57cff263d2170ecdd44dc8c9b.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/b3/74/d8/b374d881b4a02e4b5de07b42be54dd99.gif',
      'https://i.pinimg.com/originals/33/0e/4d/330e4dab16b861391eae167394f10bd9.gif',
      'https://i.pinimg.com/originals/c5/e3/1c/c5e31c57e333a87ac3a81204f0e72c7b.gif',
      'https://i.pinimg.com/originals/a3/42/16/a342166fc40a775ca339934e0e6a1f74.gif',
      'https://i.pinimg.com/originals/64/99/53/64995370265581c2765cbbea33a820f0.gif',
      'https://i.pinimg.com/originals/67/24/73/672473381ea72682e852bdc69f739492.gif',
    ],
    description:
      'An ordinary salaryman is stabbed and reincarnated in a fantasy world as a slime with predatory absorption skills, creating a thriving nation of unified monsters.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/30/Neon_Genesis_Evangelion',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.5 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '95% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 95,
      },
    },
    details: {
      genres: 'Mecha, Psychological Thriller, Drama, Sci-Fi',
      publisher: 'King Records / TV Tokyo',
      developer: 'Gainax / Tatsunoko Production',
      releaseDate: 'October 4, 1995',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/30/Neon_Genesis_Evangelion',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/30/Neon_Genesis_Evangelion',
      },
    },
    similarItems: [
      {
        title: 'Tengen Toppa Gurren Lagann',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/4/5123l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2007,
        subtitle: 'Mecha, Action, Adventure',
      },
      {
        title: 'Code Geass: Lelouch of the Rebellion',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/4/9391l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2006,
        subtitle: 'Mecha, Military, Psychological Thriller',
      },
      {
        title: 'Attack on Titan',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2013,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Berserk',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/79352l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 1997,
        subtitle: 'Dark Fantasy, Action, Drama',
      },
    ],
  },

  'that time i got reincarnated as a slime': {
    title: 'That Time I Got Reincarnated as a Slime',
    subtitle: 'Isekai, Fantasy, Action, Adventure, City Builder',
    rank: 32,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1694/93337l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1694/93337l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1694/93337l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/80/22/10/802210b0a3d7e45a0773f5ea4fae8f1e.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/33/99/d1/3399d196d17c0be39572ed5da1945cdb.gif',
      'https://i.pinimg.com/originals/13/75/93/1375935e0f75cda1471fa5e8b9bc6187.gif',
      'https://i.pinimg.com/originals/66/82/b5/6682b53a59d6737dea8c44ce79e53aa0.gif',
      'https://i.pinimg.com/originals/59/b2/88/59b2882ade9b53289858076697aa2dd6.gif',
      'https://i.pinimg.com/originals/87/d4/68/87d46866193d8b004b56609161d221c8.gif',
    ],
    description:
      'Two friends, Simon and Kamina, break out of their underground village to the surface world using a mecha known as Gurren Lagann, engaging in colossal battles that pierce the heavens.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/37430/Tensei_shitara_Slime_Datta_Ken',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.2 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '92% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Isekai, Fantasy, Action, Adventure, Comedy',
      publisher: 'Bandai Namco Arts / Kodansha',
      developer: 'Eight Bit',
      releaseDate: 'October 2, 2018',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/37430/Tensei_shitara_Slime_Datta_Ken',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/37430/Tensei_shitara_Slime_Datta_Ken',
      },
    },
    similarItems: [
      {
        title: 'Overlord',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/7/88019l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2015,
        subtitle: 'Isekai, Dark Fantasy, Action',
      },
      {
        title: 'The Eminence in Shadow',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1874/121869l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 2022,
        subtitle: 'Action, Comedy, Isekai',
      },
      {
        title: "KonoSuba: God's Blessing on this Wonderful World!",
        posterUrl: 'https://cdn.myanimelist.net/images/anime/8/77838l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 2016,
        subtitle: 'Comedy, Isekai, Parody',
      },
      {
        title: 'The Rising of the Shield Hero',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1490/101365l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2019,
        subtitle: 'Isekai, Dark Fantasy, Action',
      },
    ],
  },

  'kaguya-sama: love is war': {
    title: 'Kaguya-sama: Love is War',
    subtitle: 'Romantic Comedy, School, Psychological, Shounen',
    rank: 12,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1295/106551l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1295/106551l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1295/106551l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/9b/47/87/9b478717e82733c7ba5f87315e99e0bb.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/77/46/1f/77461f4d203c077d57a3620cae044dc9.gif',
      'https://i.pinimg.com/originals/5e/c4/1f/5ec41fd81b5bca6557a7459621177a3a.gif',
      'https://i.pinimg.com/originals/3d/e1/41/3de14134efc682e49d7d8c06259e238f.gif',
      'https://i.pinimg.com/originals/ec/ca/ad/eccaad3400c8fd34816191e8818e2daf.gif',
      'https://i.pinimg.com/originals/a6/d3/dd/a6d3dda0b8cc59c332c9ac9aa2db354d.gif',
    ],
    description:
      'A veteran MMORPG player remains logged in as the servers shut down, finding himself trapped as his powerful undead skeletal avatar, Momonga, commanding an army of loyal NPCs.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/37999/Kaguya-sama_wa_Kokurasetai__Tensai-tachi_no_Renai_Zunousen',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.6 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '96% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 96,
      },
    },
    details: {
      genres: 'Romantic Comedy, School, Psychological Thriller, Shounen',
      publisher: 'Aniplex / Shueisha',
      developer: 'A-1 Pictures',
      releaseDate: 'January 12, 2019',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/37999/Kaguya-sama_wa_Kokurasetai__Tensai-tachi_no_Renai_Zunousen',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/37999/Kaguya-sama_wa_Kokurasetai__Tensai-tachi_no_Renai_Zunousen',
      },
    },
    similarItems: [
      {
        title: 'SPY x FAMILY',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2022,
        subtitle: 'Comedy, Spies, Action',
      },
      {
        title: 'My Teen Romantic Comedy SNAFU',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/12/49605l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2013,
        subtitle: 'Romantic Comedy, School, Psychological Drama',
      },
      {
        title: 'Horimiya',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1695/111486l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2021,
        subtitle: 'Romantic Comedy, School, Slice of Life',
      },
      {
        title: 'My Dress-Up Darling',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1179/119897l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2022,
        subtitle: 'Romantic Comedy, Featured, Slice of Life',
      },
    ],
  },

  'the fragrant flower blooms with dignity': {
    title: 'The Fragrant Flower Blooms With Dignity',
    subtitle: 'Romance, School, Drama, Slice of Life, Featured',
    rank: 33,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1230/145610l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1230/145610l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1230/145610l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/1230/145610l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/1230/145610l.jpg',
      'https://cdn.myanimelist.net/images/anime/1230/145610l.jpg',
      'https://cdn.myanimelist.net/images/anime/1230/145610l.jpg',
      'https://cdn.myanimelist.net/images/anime/1230/145610l.jpg',
    ],
    description:
      'SPY x FAMILY delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/59784/Kaoru_Hana_wa_Rin_to_Saku',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.3 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '93% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Romance, School, Drama, Slice of Life',
      publisher: 'Kodansha / Aniplex',
      developer: 'CloverWorks',
      releaseDate: 'January 10, 2025',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/59784/Kaoru_Hana_wa_Rin_to_Saku',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/59784/Kaoru_Hana_wa_Rin_to_Saku',
      },
    },
    similarItems: [
      {
        title: 'Horimiya',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1695/111486l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2021,
        subtitle: 'Romantic Comedy, School, Slice of Life',
      },
      {
        title: 'The Angel Next Door Spoils Me Rotten',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1580/129373l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9,
        releaseYear: 2023,
        subtitle: 'Romance, Slice of Life, School',
      },
      {
        title: 'A Silent Voice (Koe no Katachi)',
        posterUrl: 'https://image.tmdb.org/t/p/original/xojX4BFXkj92CnkYuwmlZXNjpr8.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2016,
        subtitle: 'Drama, School, Psychological Thriller',
      },
      {
        title: 'My Dress-Up Darling',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1179/119897l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2022,
        subtitle: 'Romantic Comedy, Featured, Slice of Life',
      },
    ],
  },

  'my hero academia': {
    title: 'My Hero Academia',
    subtitle: 'Shounen, Superheroes, Action, School, Adventure',
    rank: 34,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/10/78745l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/10/78745l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/10/78745l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/d0/27/9d/d0279d9193e2198edaef231c0d620657.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/30/6a/18/306a1898b5874eb0cf315adccabdd6ad.gif',
      'https://i.pinimg.com/originals/b9/99/fc/b999fc4399d372d62c53933a62a4a365.gif',
      'https://i.pinimg.com/originals/ef/a6/7f/efa67f74206058e2c8d455144e0aa9c9.gif',
      'https://i.pinimg.com/originals/33/54/f1/3354f1f64bda5475dbdc5684ec6743c6.gif',
      'https://i.pinimg.com/originals/07/85/fb/0785fbf5c6152232e2166b90ae634c49.gif',
      'https://i.pinimg.com/originals/5c/fb/be/5cfbbeb5dad59a69056314ccd647aa79.gif',
    ],
    description:
      "Two contrasting high school classmates—popular Kyoko Hori and sullen Izumi Miyamura—discover each other's hidden true selves outside of school and build a tender bond.",
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/31964/Boku_no_Hero_Academia',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.1 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '91% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Shounen, Action, Superheroes, School',
      publisher: 'TOHO animation / Shueisha',
      developer: 'Bones',
      releaseDate: 'April 3, 2016',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/31964/Boku_no_Hero_Academia',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/31964/Boku_no_Hero_Academia',
      },
    },
    similarItems: [
      {
        title: 'Jujutsu Kaisen',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2020,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Naruto: Shippuden',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/13/17405l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2007,
        subtitle: 'Shounen, Ninja, Martial Arts',
      },
      {
        title: 'One Punch Man',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/12/76049l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2015,
        subtitle: 'Action, Comedy, Parody',
      },
      {
        title: 'Demon Slayer: Kimetsu no Yaiba',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Shounen, Action',
      },
    ],
  },

  horimiya: {
    title: 'Horimiya',
    subtitle: 'Romantic Comedy, School, Slice of Life, Drama',
    rank: 36,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1695/111486l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1695/111486l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1695/111486l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/e5/6c/ae/e56cae40e6607f1ceacbc9cf68e0b62c.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/7e/4f/8f/7e4f8f96daec4d25a05caeefcd78cf14.gif',
      'https://i.pinimg.com/originals/28/ec/6c/28ec6c3ec6961b08d659d315c02c5797.gif',
      'https://i.pinimg.com/originals/24/87/a7/2487a781beccd085b2a071737fa72b63.gif',
      'https://i.pinimg.com/originals/dd/80/a7/dd80a7e269817d3b7d7b79d05040a3de.gif',
      'https://i.pinimg.com/originals/c1/3c/86/c13c8674c0538a3f3b8aa50d15cf0fac.gif',
      'https://i.pinimg.com/originals/ff/f5/19/fff519e21f18d20709642d4d780a85bb.gif',
    ],
    description:
      "A boy swallows a cursed talisman—the finger of a demon—and becomes cursed himself. He enters a shaman school to be able to locate the demon's other body parts and thus exorcise himself.",
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/42897/Horimiya',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.2 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '92% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Romance, School, Comedy, Slice of Life, Shounen',
      publisher: 'Aniplex / Square Enix',
      developer: 'CloverWorks',
      releaseDate: 'January 10, 2021',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/42897/Horimiya',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/42897/Horimiya',
      },
    },
    similarItems: [
      {
        title: 'Kaguya-sama: Love is War',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1295/106551l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Romantic Comedy, School, Psychological',
      },
      {
        title: 'My Dress-Up Darling',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1179/119897l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2022,
        subtitle: 'Romantic Comedy, Featured, Slice of Life',
      },
      {
        title: 'The Angel Next Door Spoils Me Rotten',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1580/129373l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9,
        releaseYear: 2023,
        subtitle: 'Romance, Slice of Life, School',
      },
      {
        title: 'The Fragrant Flower Blooms With Dignity',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1230/145610l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.3,
        releaseYear: 2025,
        subtitle: 'Romance, School, Drama',
      },
    ],
  },

  'the angel next door spoils me rotten': {
    title: 'The Angel Next Door Spoils Me Rotten',
    subtitle: 'Romance, Slice of Life, School, Featured',
    rank: 37,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1580/129373l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1580/129373l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1580/129373l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/1580/129373l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/1580/129373l.jpg',
      'https://cdn.myanimelist.net/images/anime/1580/129373l.jpg',
      'https://cdn.myanimelist.net/images/anime/1580/129373l.jpg',
      'https://cdn.myanimelist.net/images/anime/1580/129373l.jpg',
    ],
    description:
      'Student council president Miyuki Shirogane and vice-president Kaguya Shinomiya are in love, but both are too proud to confess first in a hilarious battle of romantic wits.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/50739/Otonari_no_Tenshi-sama_ni_Itsunomanika_Dame_Ningen_ni_Sareteita_Ken',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.0 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '90% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 90,
      },
    },
    details: {
      genres: 'Romance, School, Slice of Life',
      publisher: 'TOHO animation / SB Creative',
      developer: 'project No.9',
      releaseDate: 'January 7, 2023',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/50739/Otonari_no_Tenshi-sama_ni_Itsunomanika_Dame_Ningen_ni_Sareteita_Ken',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/50739/Otonari_no_Tenshi-sama_ni_Itsunomanika_Dame_Ningen_ni_Sareteita_Ken',
      },
    },
    similarItems: [
      {
        title: 'Horimiya',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1695/111486l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2021,
        subtitle: 'Romantic Comedy, School, Slice of Life',
      },
      {
        title: 'My Dress-Up Darling',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1179/119897l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2022,
        subtitle: 'Romantic Comedy, Featured, Slice of Life',
      },
      {
        title: 'The Fragrant Flower Blooms With Dignity',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1230/145610l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.3,
        releaseYear: 2025,
        subtitle: 'Romance, School, Drama',
      },
      {
        title: 'The Quintessential Quintuplets',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1824/96982l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9,
        releaseYear: 2019,
        subtitle: 'Romantic Comedy, Harem, School',
      },
    ],
  },

  'soul eater': {
    title: 'Soul Eater',
    subtitle: 'Shounen, Action, Comedy, Supernatural, Featured',
    rank: 38,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/9/7804l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/9/7804l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/9/7804l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/9/7804l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/9/7804l.jpg',
      'https://cdn.myanimelist.net/images/anime/9/7804l.jpg',
      'https://cdn.myanimelist.net/images/anime/9/7804l.jpg',
      'https://cdn.myanimelist.net/images/anime/9/7804l.jpg',
    ],
    description:
      "Two contrasting high school classmates—popular Kyoko Hori and sullen Izumi Miyamura—discover each other's hidden true selves outside of school and build a tender bond.",
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/3588/Soul_Eater',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.1 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '91% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Shounen, Action, Comedy, Supernatural, Fantasy',
      publisher: 'Square Enix / TV Tokyo',
      developer: 'Bones',
      releaseDate: 'April 7, 2008',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/3588/Soul_Eater',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/3588/Soul_Eater',
      },
    },
    similarItems: [
      {
        title: 'Jujutsu Kaisen',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2020,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Bleach',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2022,
        subtitle: 'Shounen, Action, Supernatural',
      },
      {
        title: 'Mob Psycho 100',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/8/80356l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2016,
        subtitle: 'Action, Comedy, Supernatural',
      },
      {
        title: 'Fullmetal Alchemist: Brotherhood',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1223/96541l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.9,
        releaseYear: 2009,
        subtitle: 'Shounen, Fantasy, Adventure',
      },
    ],
  },

  'classroom of the elite': {
    title: 'Classroom of the Elite',
    subtitle: 'Psychological Thriller, School, Featured, Drama',
    rank: 39,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/5/86830l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/5/86830l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/5/86830l.jpg',
    screenshots: [
      'https://i.pinimg.com/736x/96/1d/27/961d27aa2dd8318d18c3f84db013ae15.jpg',
      'https://i.pinimg.com/originals/23/75/e5/2375e59c67fe6c1f30cbacfb09672beb.gif',
      'https://i.pinimg.com/originals/d2/2d/d7/d22dd7a1216fd4ae3c3c05f8b09bc8e4.gif',
      'https://i.pinimg.com/originals/55/17/8c/55178cd5d1194ae00347c99aaaa5da9b.gif',
      'https://i.pinimg.com/originals/3f/12/de/3f12def5452c442dc73c9674e04f2437.gif',
      'https://i.pinimg.com/originals/1c/9e/b0/1c9eb0dd20e5c25e1f85de5dca42444d.gif',
    ],
    description:
      "A boy swallows a cursed talisman—the finger of a demon—and becomes cursed himself. He enters a shaman school to be able to locate the demon's other body parts and thus exorcise himself.",
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/35507/Youkoso_Jitsuryoku_Shijou_Shugi_no_Kyoushitsu_e',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.3 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '93% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Psychological Thriller, School, Drama, Mystery',
      publisher: 'Kadokawa / Media Factory',
      developer: 'Lerche',
      releaseDate: 'July 12, 2017',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/35507/Youkoso_Jitsuryoku_Shijou_Shugi_no_Kyoushitsu_e',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/35507/Youkoso_Jitsuryoku_Shijou_Shugi_no_Kyoushitsu_e',
      },
    },
    similarItems: [
      {
        title: 'Death Note',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2006,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'My Teen Romantic Comedy SNAFU',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/12/49605l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2013,
        subtitle: 'Romantic Comedy, School, Psychological Drama',
      },
      {
        title: 'Code Geass: Lelouch of the Rebellion',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/4/9391l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.7,
        releaseYear: 2006,
        subtitle: 'Mecha, Military, Psychological Thriller',
      },
      {
        title: 'Kaguya-sama: Love is War',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1295/106551l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Romantic Comedy, School, Psychological',
      },
    ],
  },

  'my dress-up darling': {
    title: 'My Dress-Up Darling',
    subtitle: 'Romantic Comedy, Featured, Slice of Life',
    rank: 40,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1179/119897l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1179/119897l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1179/119897l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/72/61/eb/7261ebd7eaafbfa3290f5b111f5a290f.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/38/d2/a3/38d2a362ef2d838f8b40f0d7f501a591.gif',
      'https://i.pinimg.com/originals/10/88/32/108832225965e44ed027904885a71680.gif',
      'https://i.pinimg.com/originals/96/9c/af/969cafa49a4eba6cec7875532a36e698.gif',
      'https://i.pinimg.com/originals/70/55/13/705513af3c9d6e4f5ccb48275f7ae415.gif',
      'https://i.pinimg.com/originals/35/b1/e4/35b1e495c0633874a3460b3c89f1fee6.gif',
    ],
    description:
      'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a supernatural notebook capable of killing anyone whose name is written into it.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/48736/Sono_Bisque_Doll_wa_Koi_wo_Suru',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.2 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '92% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Romance, Comedy, Featured, Slice of Life',
      publisher: 'Aniplex / Square Enix',
      developer: 'CloverWorks',
      releaseDate: 'January 9, 2022',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/48736/Sono_Bisque_Doll_wa_Koi_wo_Suru',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/48736/Sono_Bisque_Doll_wa_Koi_wo_Suru',
      },
    },
    similarItems: [
      {
        title: 'Horimiya',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1695/111486l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2021,
        subtitle: 'Romantic Comedy, School, Slice of Life',
      },
      {
        title: 'Kaguya-sama: Love is War',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1295/106551l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Romantic Comedy, School, Psychological',
      },
      {
        title: 'The Angel Next Door Spoils Me Rotten',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1580/129373l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9,
        releaseYear: 2023,
        subtitle: 'Romance, Slice of Life, School',
      },
      {
        title: 'The Quintessential Quintuplets',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1824/96982l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9,
        releaseYear: 2019,
        subtitle: 'Romantic Comedy, Harem, School',
      },
    ],
  },

  'the quintessential quintuplets': {
    title: 'The Quintessential Quintuplets',
    subtitle: 'Romantic Comedy, Harem, School, Featured',
    rank: 41,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1824/96982l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1824/96982l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1824/96982l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/1824/96982l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/1824/96982l.jpg',
      'https://cdn.myanimelist.net/images/anime/1824/96982l.jpg',
      'https://cdn.myanimelist.net/images/anime/1824/96982l.jpg',
      'https://cdn.myanimelist.net/images/anime/1824/96982l.jpg',
    ],
    description:
      "Two contrasting high school classmates—popular Kyoko Hori and sullen Izumi Miyamura—discover each other's hidden true selves outside of school and build a tender bond.",
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/38101/5-toubun_no_Hanayome',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.0 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '90% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 90,
      },
    },
    details: {
      genres: 'Romantic Comedy, School, Harem, Shounen',
      publisher: 'Pony Canyon / Kodansha',
      developer: 'Tezuka Productions / Bibury Animation Studios',
      releaseDate: 'January 11, 2019',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/38101/5-toubun_no_Hanayome',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/38101/5-toubun_no_Hanayome',
      },
    },
    similarItems: [
      {
        title: 'Kaguya-sama: Love is War',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1295/106551l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Romantic Comedy, School, Psychological',
      },
      {
        title: 'Horimiya',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1695/111486l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2021,
        subtitle: 'Romantic Comedy, School, Slice of Life',
      },
      {
        title: 'The Pet Girl of Sakurasou',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/4/43643l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2012,
        subtitle: 'Romantic Comedy, Drama, Featured',
      },
      {
        title: 'My Dress-Up Darling',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1179/119897l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2022,
        subtitle: 'Romantic Comedy, Featured, Slice of Life',
      },
    ],
  },

  'the pet girl of sakurasou': {
    title: 'The Pet Girl of Sakurasou',
    subtitle: 'Romantic Comedy, Drama, Featured, School, Talent',
    rank: 42,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/4/43643l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/4/43643l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/4/43643l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/4/43643l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/4/43643l.jpg',
      'https://cdn.myanimelist.net/images/anime/4/43643l.jpg',
      'https://cdn.myanimelist.net/images/anime/4/43643l.jpg',
      'https://cdn.myanimelist.net/images/anime/4/43643l.jpg',
    ],
    description:
      'Student council president Miyuki Shirogane and vice-president Kaguya Shinomiya are in love, but both are too proud to confess first in a hilarious battle of romantic wits.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/13759/Sakurasou_no_Pet_na_Kanojo',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.1 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '91% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Romantic Comedy, Drama, School',
      publisher: 'Media Factory / ASCII Media Works',
      developer: 'J.C.Staff',
      releaseDate: 'October 9, 2012',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/13759/Sakurasou_no_Pet_na_Kanojo',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/13759/Sakurasou_no_Pet_na_Kanojo',
      },
    },
    similarItems: [
      {
        title: 'My Teen Romantic Comedy SNAFU',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/12/49605l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2013,
        subtitle: 'Romantic Comedy, School, Psychological Drama',
      },
      {
        title: 'Horimiya',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1695/111486l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2021,
        subtitle: 'Romantic Comedy, School, Slice of Life',
      },
      {
        title: 'Rascal Does Not Dream of Bunny Girl Senpai',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1301/93586l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.3,
        releaseYear: 2018,
        subtitle: 'Psychological Thriller, Romance, School',
      },
      {
        title: 'The Quintessential Quintuplets',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1824/96982l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9,
        releaseYear: 2019,
        subtitle: 'Romantic Comedy, Harem, School',
      },
    ],
  },

  'arifureta: from commonplace to world’s strongest': {
    title: 'Arifureta: From Commonplace to World’s Strongest',
    subtitle: 'Isekai, Action, Adventure, Harem, Featured',
    rank: 43,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1805/101859l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1805/101859l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1805/101859l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/1805/101859l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/1805/101859l.jpg',
      'https://cdn.myanimelist.net/images/anime/1805/101859l.jpg',
      'https://cdn.myanimelist.net/images/anime/1805/101859l.jpg',
      'https://cdn.myanimelist.net/images/anime/1805/101859l.jpg',
    ],
    description:
      'Cynical high schooler Hachiman Hikigaya is forced to join the Volunteer Service Club by his teacher, helping fellow students resolve complex social dilemmas.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/36882/Arifureta_Shokugyou_de_Sekai_Saikyou',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '8.7 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '87% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 87,
      },
    },
    details: {
      genres: 'Isekai, Action, Dark Fantasy, Adventure',
      publisher: 'Overlap / AT-X',
      developer: 'Asread / White Fox / studio MOTHER',
      releaseDate: 'July 8, 2019',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/36882/Arifureta_Shokugyou_de_Sekai_Saikyou',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/36882/Arifureta_Shokugyou_de_Sekai_Saikyou',
      },
    },
    similarItems: [
      {
        title: 'The Rising of the Shield Hero',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1490/101365l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2019,
        subtitle: 'Isekai, Dark Fantasy, Action',
      },
      {
        title: 'Solo Leveling',
        posterUrl: 'https://m.media-amazon.com/images/I/811qwtjnRKL._AC_UF894,1000_QL80_.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2024,
        subtitle: 'Action, Fantasy, Dungeons',
      },
      {
        title: 'Sword Art Online',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/11/39717l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.2,
        releaseYear: 2012,
        subtitle: 'Anime, Shounen, Virtual Reality',
      },
      {
        title: 'The Eminence in Shadow',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1874/121869l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 2022,
        subtitle: 'Action, Comedy, Isekai',
      },
    ],
  },

  "konosuba: god's blessing on this wonderful world!": {
    title: "KonoSuba: God's Blessing on this Wonderful World!",
    subtitle: 'Comedy, Isekai, Parody, Adventure, Fantasy',
    rank: 15,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/8/77838l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/8/77838l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/8/77838l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/8/77838l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/8/77838l.jpg',
      'https://cdn.myanimelist.net/images/anime/8/77838l.jpg',
      'https://cdn.myanimelist.net/images/anime/8/77838l.jpg',
      'https://cdn.myanimelist.net/images/anime/8/77838l.jpg',
    ],
    description:
      'Naofumi Iwatani is summoned as the Shield Hero, falsely accused of crimes, and casts aside naivety to survive, protect the world, and clear his name.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/30831/Kono_Subarashii_Sekai_ni_Shukufuku_wo',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.5 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '95% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 95,
      },
    },
    details: {
      genres: 'Isekai, Comedy, Parody, Adventure, Fantasy',
      publisher: 'Kadokawa / Nippon Columbia',
      developer: 'Studio Deen / Drive',
      releaseDate: 'January 14, 2016',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/30831/Kono_Subarashii_Sekai_ni_Shukufuku_wo',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/30831/Kono_Subarashii_Sekai_ni_Shukufuku_wo',
      },
    },
    similarItems: [
      {
        title: 'Re:Zero - Starting Life in Another World',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1522/128039l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2016,
        subtitle: 'Isekai, Psychological Thriller, Dark Fantasy',
      },
      {
        title: 'That Time I Got Reincarnated as a Slime',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1694/93337l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2018,
        subtitle: 'Isekai, Fantasy, Action',
      },
      {
        title: 'Grand Blue Dreaming',
        posterUrl: 'https://i.pinimg.com/736x/1e/30/5f/1e305f379994088232bffdb81037ea4e.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2018,
        subtitle: 'Comedy, College Life, Diving',
      },
      {
        title: 'The Eminence in Shadow',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1874/121869l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 2022,
        subtitle: 'Action, Comedy, Isekai',
      },
    ],
  },

  'in another world with my smartphone': {
    title: 'In Another World With My Smartphone',
    subtitle: 'Isekai, Fantasy, Harem, Adventure, Magic',
    rank: 44,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/8/87340l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/8/87340l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/8/87340l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/8/87340l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/8/87340l.jpg',
      'https://cdn.myanimelist.net/images/anime/8/87340l.jpg',
      'https://cdn.myanimelist.net/images/anime/8/87340l.jpg',
      'https://cdn.myanimelist.net/images/anime/8/87340l.jpg',
    ],
    description:
      'Subaru Natsuki is suddenly summoned to another world, discovering that upon death, he has the terrifying ability to rewind time back to a previous point in history.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/35203/Isekai_wa_Smartphone_to_Tomo_ni',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '8.2 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '82% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 82,
      },
    },
    details: {
      genres: 'Isekai, Adventure, Fantasy, Comedy',
      publisher: 'Hobby Japan / AT-X',
      developer: 'Production Reed / J.C.Staff',
      releaseDate: 'July 11, 2017',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/35203/Isekai_wa_Smartphone_to_Tomo_ni',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/35203/Isekai_wa_Smartphone_to_Tomo_ni',
      },
    },
    similarItems: [
      {
        title: "Wise Man's Grandchild",
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1183/98338l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.4,
        releaseYear: 2019,
        subtitle: 'Isekai, Fantasy, Action',
      },
      {
        title: 'Death March to the Parallel World Rhapsody',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/8/89907l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.3,
        releaseYear: 2018,
        subtitle: 'Isekai, Fantasy, Adventure',
      },
      {
        title: 'That Time I Got Reincarnated as a Slime',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1694/93337l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2018,
        subtitle: 'Isekai, Fantasy, Action',
      },
      {
        title: 'Arifureta: From Commonplace to World’s Strongest',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1805/101859l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.7,
        releaseYear: 2019,
        subtitle: 'Isekai, Action, Adventure',
      },
    ],
  },

  "wise man's grandchild": {
    title: "Wise Man's Grandchild",
    subtitle: 'Isekai, Fantasy, Action, Magic, Featured',
    rank: 46,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1183/98338l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1183/98338l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1183/98338l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/1183/98338l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/1183/98338l.jpg',
      'https://cdn.myanimelist.net/images/anime/1183/98338l.jpg',
      'https://cdn.myanimelist.net/images/anime/1183/98338l.jpg',
      'https://cdn.myanimelist.net/images/anime/1183/98338l.jpg',
    ],
    description:
      "Wise Man's Grandchild delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.",
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/36407/Kenja_no_Mago',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '8.4 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '84% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 84,
      },
    },
    details: {
      genres: 'Isekai, Action, Fantasy, Comedy, Magic',
      publisher: 'Kadokawa / AT-X',
      developer: 'Silver Link',
      releaseDate: 'April 10, 2019',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/36407/Kenja_no_Mago',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/36407/Kenja_no_Mago',
      },
    },
    similarItems: [
      {
        title: 'In Another World With My Smartphone',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/8/87340l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.2,
        releaseYear: 2017,
        subtitle: 'Isekai, Fantasy, Harem',
      },
      {
        title: 'The Misfit of Demon King Academy',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1449/108428l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.9,
        releaseYear: 2020,
        subtitle: 'Action, Fantasy, Magic',
      },
      {
        title: 'The Irregular at Magic High School',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/11/64019l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.8,
        releaseYear: 2014,
        subtitle: 'Magic, Sci-Fi, Action',
      },
      {
        title: 'The Eminence in Shadow',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1874/121869l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 2022,
        subtitle: 'Action, Comedy, Isekai',
      },
    ],
  },

  'the eminence in shadow': {
    title: 'The Eminence in Shadow',
    subtitle: 'Action, Comedy, Isekai, Fantasy, Parody, Shadow Magic',
    rank: 17,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1874/121869l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1874/121869l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1874/121869l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/3c/26/ab/3c26abe6720ae65608af2157792e32ad.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/f0/6c/9f/f06c9ff9208bd56225c95118b3f8d313.gif',
      'https://i.pinimg.com/originals/75/e9/66/75e9664f8efe5fc629b4532b4ebb0f91.gif',
      'https://i.pinimg.com/originals/de/71/b5/de71b5f3156053a9708361e261ebdbac.gif',
      'https://i.pinimg.com/originals/2c/34/db/2c34db8d32bd19d734aca73e5ee49ffc.gif',
      'https://i.pinimg.com/originals/cc/1f/c6/cc1fc6bf5e2b15d1ecdac7eb1c255c57.gif',
    ],
    description:
      'After accidentally being killed by God, Touya Mochizuki is reincarnated into a magical world with an upgraded physical body and his smartphone.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/48316/Kage_no_Jitsuryokusha_ni_Naritakute',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.5 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '95% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 95,
      },
    },
    details: {
      genres: 'Action, Comedy, Isekai, Fantasy, Parody',
      publisher: 'Kadokawa / AT-X',
      developer: 'Nexus',
      releaseDate: 'October 5, 2022',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/48316/Kage_no_Jitsuryokusha_ni_Naritakute',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/48316/Kage_no_Jitsuryokusha_ni_Naritakute',
      },
    },
    similarItems: [
      {
        title: 'Overlord',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/7/88019l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2015,
        subtitle: 'Isekai, Dark Fantasy, Action',
      },
      {
        title: 'The Misfit of Demon King Academy',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1449/108428l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.9,
        releaseYear: 2020,
        subtitle: 'Action, Fantasy, Magic',
      },
      {
        title: "KonoSuba: God's Blessing on this Wonderful World!",
        posterUrl: 'https://cdn.myanimelist.net/images/anime/8/77838l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 2016,
        subtitle: 'Comedy, Isekai, Parody',
      },
      {
        title: 'Solo Leveling',
        posterUrl: 'https://m.media-amazon.com/images/I/811qwtjnRKL._AC_UF894,1000_QL80_.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2024,
        subtitle: 'Action, Fantasy, Dungeons',
      },
    ],
  },

  'the rising of the shield hero': {
    title: 'The Rising of the Shield Hero',
    subtitle: 'Isekai, Dark Fantasy, Action, Drama, Adventure',
    rank: 35,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1490/101365l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1490/101365l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1490/101365l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/4b/15/72/4b15723e67aff0a621437868004ec4d3.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/f7/a0/64/f7a06478d2e0cae7991173b0637a8118.gif',
      'https://i.pinimg.com/originals/d1/dc/3d/d1dc3d12693c09f088c32a98a9ed8ef4.gif',
      'https://i.pinimg.com/originals/59/c8/fa/59c8fafd9540f06ebc30c1937c2f1524.gif',
      'https://i.pinimg.com/originals/75/bb/67/75bb67a443efda64ccee2fd7ba14863e.gif',
      'https://i.pinimg.com/originals/b1/e0/16/b1e016b9e1d7e14dc0c56fac856344bc.gif',
    ],
    description:
      'A veteran MMORPG player remains logged in as the servers shut down, finding himself trapped as his powerful undead skeletal avatar, Momonga, commanding an army of loyal NPCs.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/35790/Tate_no_Yuusha_no_Nariagari',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.1 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '91% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Isekai, Dark Fantasy, Action, Adventure, Drama',
      publisher: 'Kadokawa / Crunchyroll',
      developer: 'Kinema Citrus',
      releaseDate: 'January 9, 2019',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/35790/Tate_no_Yuusha_no_Nariagari',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/35790/Tate_no_Yuusha_no_Nariagari',
      },
    },
    similarItems: [
      {
        title: 'Arifureta: From Commonplace to World’s Strongest',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1805/101859l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.7,
        releaseYear: 2019,
        subtitle: 'Isekai, Action, Adventure',
      },
      {
        title: 'That Time I Got Reincarnated as a Slime',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1694/93337l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2018,
        subtitle: 'Isekai, Fantasy, Action',
      },
      {
        title: 'Re:Zero - Starting Life in Another World',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1522/128039l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2016,
        subtitle: 'Isekai, Psychological Thriller, Dark Fantasy',
      },
      {
        title: 'Solo Leveling',
        posterUrl: 'https://m.media-amazon.com/images/I/811qwtjnRKL._AC_UF894,1000_QL80_.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2024,
        subtitle: 'Action, Fantasy, Dungeons',
      },
    ],
  },

  'death march to the parallel world rhapsody': {
    title: 'Death March to the Parallel World Rhapsody',
    subtitle: 'Isekai, Fantasy, Adventure, Magic, Featured',
    rank: 47,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/8/89907l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/8/89907l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/8/89907l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/8/89907l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/8/89907l.jpg',
      'https://cdn.myanimelist.net/images/anime/8/89907l.jpg',
      'https://cdn.myanimelist.net/images/anime/8/89907l.jpg',
      'https://cdn.myanimelist.net/images/anime/8/89907l.jpg',
    ],
    description:
      'Hajime Nagumo is transported to another world with his classmates, betrayed and thrown into an abyss, where he claws his way back up with monstrous power.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/34497/Death_March_kara_Hajimaru_Isekai_Kyousoukyoku',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '8.3 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '83% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 83,
      },
    },
    details: {
      genres: 'Isekai, Adventure, Fantasy, Slice of Life',
      publisher: 'Kadokawa / Tokyo MX',
      developer: 'Silver Link / Connect',
      releaseDate: 'January 11, 2018',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/34497/Death_March_kara_Hajimaru_Isekai_Kyousoukyoku',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/34497/Death_March_kara_Hajimaru_Isekai_Kyousoukyoku',
      },
    },
    similarItems: [
      {
        title: 'In Another World With My Smartphone',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/8/87340l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.2,
        releaseYear: 2017,
        subtitle: 'Isekai, Fantasy, Harem',
      },
      {
        title: "Wise Man's Grandchild",
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1183/98338l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.4,
        releaseYear: 2019,
        subtitle: 'Isekai, Fantasy, Action',
      },
      {
        title: 'That Time I Got Reincarnated as a Slime',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1694/93337l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2018,
        subtitle: 'Isekai, Fantasy, Action',
      },
      {
        title: 'Is It Wrong to Try to Pick Up Girls in a Dungeon?',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/2/70187l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9,
        releaseYear: 2015,
        subtitle: 'Fantasy, Action, Adventure',
      },
    ],
  },

  'is it wrong to try to pick up girls in a dungeon?': {
    title: 'Is It Wrong to Try to Pick Up Girls in a Dungeon?',
    subtitle: 'Fantasy, Action, Adventure, Dungeons, Gods and Heroes',
    rank: 33,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/2/70187l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/2/70187l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/2/70187l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/2/70187l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/2/70187l.jpg',
      'https://cdn.myanimelist.net/images/anime/2/70187l.jpg',
      'https://cdn.myanimelist.net/images/anime/2/70187l.jpg',
      'https://cdn.myanimelist.net/images/anime/2/70187l.jpg',
    ],
    description:
      'After accidentally being killed by God, Touya Mochizuki is reincarnated into a magical world with an upgraded physical body and his smartphone.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/28121/Dungeon_ni_Deai_wo_Motomeru_no_wa_Machigatteiru_Darou_ka',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.0 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '90% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 90,
      },
    },
    details: {
      genres: 'Fantasy, Action, Adventure, Shounen',
      publisher: 'Warner Bros. Japan / SB Creative',
      developer: 'J.C.Staff',
      releaseDate: 'April 4, 2015',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/28121/Dungeon_ni_Deai_wo_Motomeru_no_wa_Machigatteiru_Darou_ka',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/28121/Dungeon_ni_Deai_wo_Motomeru_no_wa_Machigatteiru_Darou_ka',
      },
    },
    similarItems: [
      {
        title: 'Sword Art Online',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/11/39717l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.2,
        releaseYear: 2012,
        subtitle: 'Anime, Shounen, Virtual Reality',
      },
      {
        title: 'Solo Leveling',
        posterUrl: 'https://m.media-amazon.com/images/I/811qwtjnRKL._AC_UF894,1000_QL80_.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2024,
        subtitle: 'Action, Fantasy, Dungeons',
      },
      {
        title: 'The Rising of the Shield Hero',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1490/101365l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2019,
        subtitle: 'Isekai, Dark Fantasy, Action',
      },
      {
        title: 'Arifureta: From Commonplace to World’s Strongest',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1805/101859l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.7,
        releaseYear: 2019,
        subtitle: 'Isekai, Action, Adventure',
      },
    ],
  },

  'the misfit of demon king academy': {
    title: 'The Misfit of Demon King Academy',
    subtitle: 'Action, Fantasy, Magic, School, Demon King, Featured',
    rank: 31,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1449/108428l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1449/108428l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1449/108428l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/1449/108428l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/1449/108428l.jpg',
      'https://cdn.myanimelist.net/images/anime/1449/108428l.jpg',
      'https://cdn.myanimelist.net/images/anime/1449/108428l.jpg',
      'https://cdn.myanimelist.net/images/anime/1449/108428l.jpg',
    ],
    description:
      'In the near future, thousands of players log into the groundbreaking VRMMORPG Sword Art Online only to discover they cannot log out. Death in the game means death in reality, and the only escape is clearing all 100 floors of the floating fortress Aincrad.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/40496/Maou_Gakuin_no_Futekigousha__Shijou_Saikyou_no_Maou_no_Shiso_Tensei_shite_Shison-tachi_no_Gakkou_e_Kayou',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '8.9 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '89% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 89,
      },
    },
    details: {
      genres: 'Action, Fantasy, Magic, School',
      publisher: 'Aniplex / Square Enix',
      developer: 'Silver Link',
      releaseDate: 'July 4, 2020',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/40496/Maou_Gakuin_no_Futekigousha__Shijou_Saikyou_no_Maou_no_Shiso_Tensei_shite_Shison-tachi_no_Gakkou_e_Kayou',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/40496/Maou_Gakuin_no_Futekigousha__Shijou_Saikyou_no_Maou_no_Shiso_Tensei_shite_Shison-tachi_no_Gakkou_e_Kayou',
      },
    },
    similarItems: [
      {
        title: 'The Eminence in Shadow',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1874/121869l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 2022,
        subtitle: 'Action, Comedy, Isekai',
      },
      {
        title: 'The Irregular at Magic High School',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/11/64019l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.8,
        releaseYear: 2014,
        subtitle: 'Magic, Sci-Fi, Action',
      },
      {
        title: 'Overlord',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/7/88019l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.1,
        releaseYear: 2015,
        subtitle: 'Isekai, Dark Fantasy, Action',
      },
      {
        title: "Wise Man's Grandchild",
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1183/98338l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.4,
        releaseYear: 2019,
        subtitle: 'Isekai, Fantasy, Action',
      },
    ],
  },

  hyouka: {
    title: 'Hyouka',
    subtitle: 'Mystery, School, Slice of Life, Riddles and Puzzles, Masterpiece Kyoto Animation',
    rank: 23,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/13/37087l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/13/37087l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/13/37087l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/13/37087l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/13/37087l.jpg',
      'https://cdn.myanimelist.net/images/anime/13/37087l.jpg',
      'https://cdn.myanimelist.net/images/anime/13/37087l.jpg',
      'https://cdn.myanimelist.net/images/anime/13/37087l.jpg',
    ],
    description:
      'Cid Kagenou is reincarnated into a magical world and creates an imaginary secret organization called Shadow Garden, unaware that his theatrical conspiracies are completely real.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/12189/Hyouka',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.2 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '92% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Mystery, School, Slice of Life, Slice of Life',
      publisher: 'Kadokawa Shoten / Lantis',
      developer: 'Kyoto Animation',
      releaseDate: 'April 23, 2012',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/12189/Hyouka',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/12189/Hyouka',
      },
    },
    similarItems: [
      {
        title: 'The Disappearance of Haruhi Suzumiya',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1749/119934l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.5,
        releaseYear: 2010,
        subtitle: 'Sci-Fi, Mysticism, School',
      },
      {
        title: 'My Teen Romantic Comedy SNAFU',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/12/49605l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2013,
        subtitle: 'Romantic Comedy, School, Psychological Drama',
      },
      {
        title: 'Rascal Does Not Dream of Bunny Girl Senpai',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1301/93586l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.3,
        releaseYear: 2018,
        subtitle: 'Psychological Thriller, Romance, School',
      },
      {
        title: 'K-ON!',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/76120l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2009,
        subtitle: 'Music, Comedy, School',
      },
    ],
  },

  'assassination classroom': {
    title: 'Assassination Classroom',
    subtitle: 'Comedy, Action, School, Shounen, Featured',
    rank: 21,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/5/75810l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/5/75810l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/5/75810l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/5/75810l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/5/75810l.jpg',
      'https://cdn.myanimelist.net/images/anime/5/75810l.jpg',
      'https://cdn.myanimelist.net/images/anime/5/75810l.jpg',
      'https://cdn.myanimelist.net/images/anime/5/75810l.jpg',
    ],
    description:
      'Kyon wakes up on a freezing December morning to find that the SOS Brigade has ceased to exist, Haruhi is missing, and nobody remembers anything unusual.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/24833/Ansatsu_Kyoushitsu',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.3 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '93% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Comedy, Action, School, Shounen',
      publisher: 'Fuji TV / Shueisha',
      developer: 'Lerche',
      releaseDate: 'January 10, 2015',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/24833/Ansatsu_Kyoushitsu',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/24833/Ansatsu_Kyoushitsu',
      },
    },
    similarItems: [
      {
        title: 'Great Teacher Onizuka (GTO)',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/13/11460l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 1999,
        subtitle: 'Comedy, School, Shounen',
      },
      {
        title: 'Classroom of the Elite',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/5/86830l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.3,
        releaseYear: 2017,
        subtitle: 'Psychological Thriller, School, Featured',
      },
      {
        title: 'SPY x FAMILY',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.4,
        releaseYear: 2022,
        subtitle: 'Comedy, Spies, Action',
      },
      {
        title: 'Mob Psycho 100',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/8/80356l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2016,
        subtitle: 'Action, Comedy, Supernatural',
      },
    ],
  },

  'the irregular at magic high school': {
    title: 'The Irregular at Magic High School',
    subtitle: 'Magic, Sci-Fi, Action, School, Featured',
    rank: 48,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/11/64019l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/11/64019l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/11/64019l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/11/64019l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/11/64019l.jpg',
      'https://cdn.myanimelist.net/images/anime/11/64019l.jpg',
      'https://cdn.myanimelist.net/images/anime/11/64019l.jpg',
      'https://cdn.myanimelist.net/images/anime/11/64019l.jpg',
    ],
    description:
      'Former biker gang leader Eikichi Onizuka decides to become the greatest high school teacher in the world, bringing unorthodox life lessons to a troubled classroom of misfits.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/20785/Mahouka_Koukou_no_Rettousei',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '8.8 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '88% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 88,
      },
    },
    details: {
      genres: 'Magic, Sci-Fi, Action, School',
      publisher: 'Aniplex / ASCII Media Works',
      developer: 'Madhouse / Eight Bit',
      releaseDate: 'April 6, 2014',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/20785/Mahouka_Koukou_no_Rettousei',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/20785/Mahouka_Koukou_no_Rettousei',
      },
    },
    similarItems: [
      {
        title: 'The Misfit of Demon King Academy',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1449/108428l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.9,
        releaseYear: 2020,
        subtitle: 'Action, Fantasy, Magic',
      },
      {
        title: 'Sword Art Online',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/11/39717l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.2,
        releaseYear: 2012,
        subtitle: 'Anime, Shounen, Virtual Reality',
      },
      {
        title: 'Classroom of the Elite',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/5/86830l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.3,
        releaseYear: 2017,
        subtitle: 'Psychological Thriller, School, Featured',
      },
      {
        title: "Wise Man's Grandchild",
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1183/98338l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 8.4,
        releaseYear: 2019,
        subtitle: 'Isekai, Fantasy, Action',
      },
    ],
  },

  'my teen romantic comedy snafu': {
    title: 'My Teen Romantic Comedy SNAFU',
    subtitle: 'Romantic Comedy, School, Psychological Drama, Realism',
    rank: 25,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/12/49605l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/12/49605l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/12/49605l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/12/49605l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/12/49605l.jpg',
      'https://cdn.myanimelist.net/images/anime/12/49605l.jpg',
      'https://cdn.myanimelist.net/images/anime/12/49605l.jpg',
      'https://cdn.myanimelist.net/images/anime/12/49605l.jpg',
    ],
    description:
      'The legendary Demon King of Tyranny, Anos Voldigoad, reincarnates after 2,000 years to find the magical academy completely underestimating his godlike power.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/14813/Yahari_Ore_no_Seishun_Love_Comedy_wa_Machigatteiru',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.2 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '92% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Romance, School, Comedy, Drama, Psychological Thriller',
      publisher: 'Marvelous / Shogakukan',
      developer: "Brain's Base / feel.",
      releaseDate: 'April 5, 2013',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/14813/Yahari_Ore_no_Seishun_Love_Comedy_wa_Machigatteiru',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/14813/Yahari_Ore_no_Seishun_Love_Comedy_wa_Machigatteiru',
      },
    },
    similarItems: [
      {
        title: 'Rascal Does Not Dream of Bunny Girl Senpai',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1301/93586l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.3,
        releaseYear: 2018,
        subtitle: 'Psychological Thriller, Romance, School',
      },
      {
        title: 'Hyouka',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/13/37087l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.2,
        releaseYear: 2012,
        subtitle: 'Mystery, School, Slice of Life',
      },
      {
        title: 'Classroom of the Elite',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/5/86830l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.3,
        releaseYear: 2017,
        subtitle: 'Psychological Thriller, School, Featured',
      },
      {
        title: 'Kaguya-sama: Love is War',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1295/106551l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Romantic Comedy, School, Psychological',
      },
    ],
  },

  'the seven deadly sins': {
    title: 'The Seven Deadly Sins',
    subtitle: 'Shounen, Fantasy, Action, Adventure, Featured',
    rank: 30,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/8/65409l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/8/65409l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/8/65409l.jpg',
    screenshots: [
      'https://cdn.myanimelist.net/images/anime/8/65409l.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.myanimelist.net/images/anime/8/65409l.jpg',
      'https://cdn.myanimelist.net/images/anime/8/65409l.jpg',
      'https://cdn.myanimelist.net/images/anime/8/65409l.jpg',
      'https://cdn.myanimelist.net/images/anime/8/65409l.jpg',
    ],
    description:
      'Sakuta Azusagawa meets wild bunny girl Mai Sakurajima in a library, learning she suffers from Adolescence Syndrome, which renders her invisible to everyone else.',
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/23755/Nanatsu_no_Taizai',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.0 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '90% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 90,
      },
    },
    details: {
      genres: 'Shounen, Action, Fantasy, Adventure',
      publisher: 'Aniplex / Kodansha',
      developer: 'A-1 Pictures / Studio Deen',
      releaseDate: 'October 5, 2014',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/23755/Nanatsu_no_Taizai',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/23755/Nanatsu_no_Taizai',
      },
    },
    similarItems: [
      {
        title: 'Fullmetal Alchemist: Brotherhood',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1223/96541l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.9,
        releaseYear: 2009,
        subtitle: 'Shounen, Fantasy, Adventure',
      },
      {
        title: 'Hunter x Hunter (2011)',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: 'Shounen, Adventure, Fantasy',
      },
      {
        title: 'Bleach',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2022,
        subtitle: 'Shounen, Action, Supernatural',
      },
      {
        title: 'Naruto: Shippuden',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/13/17405l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2007,
        subtitle: 'Shounen, Ninja, Martial Arts',
      },
    ],
  },

  'fullmetal alchemist: brotherhood': {
    title: 'Fullmetal Alchemist: Brotherhood',
    subtitle: 'Shounen, Fantasy, Adventure, Military, Drama, Philosophy, Absolute Masterpiece',
    rank: 2,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/1223/96541l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/1223/96541l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/1223/96541l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/9e/09/41/9e0941bd49ef8ef44d4aa1e6c9c0b9bd.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/81/22/e5/8122e579c822adcda48963d29c631435.gif',
      'https://i.pinimg.com/originals/74/96/a9/7496a9d34072efb7cd925c69e89bd365.gif',
      'https://i.pinimg.com/originals/4a/35/85/4a35855073434d9fc6397a622424fbbd.gif',
      'https://i.pinimg.com/originals/32/90/d5/3290d59c3deaa347f2bca311daa03780.gif',
      'https://i.pinimg.com/originals/ef/54/6a/ef546a8084f84cfad33958af51fa27c1.gif',
    ],
    description:
      "Two brothers, Edward and Alphonse Elric, embark on a perilous journey to search for the Philosopher's Stone to restore their bodies after a failed human transmutation.",
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.9 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '99% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 99,
      },
    },
    details: {
      genres: 'Shounen, Action, Adventure, Drama, Fantasy, Military',
      publisher: 'Aniplex / Square Enix',
      developer: 'Bones',
      releaseDate: 'April 5, 2009',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/5114/Fullmetal_Alchemist__Brotherhood',
      },
    },
    similarItems: [
      {
        title: "Frieren: Beyond Journey's End",
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.9,
        releaseYear: 2023,
        subtitle: 'Fantasy, Adventure, Drama',
      },
      {
        title: 'Hunter x Hunter (2011)',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: 'Shounen, Adventure, Fantasy',
      },
      {
        title: 'Attack on Titan',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2013,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Steins;Gate',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1935/127974l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: 'Sci-Fi, Psychological Thriller, Time Travel',
      },
    ],
  },

  "jojo's bizarre adventure": {
    title: "JoJo's Bizarre Adventure",
    subtitle: 'Shounen, Action, Adventure, Supernatural, Martial Arts, Featured',
    rank: 16,
    miniPosterUrl: 'https://cdn.myanimelist.net/images/anime/3/40409l.jpg',
    bannerUrl: 'https://cdn.myanimelist.net/images/anime/3/40409l.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.myanimelist.net/images/anime/3/40409l.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/6c/2d/23/6c2d236b4ea89f66ab84e4f6404579e0.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/98/d6/ff/98d6ffa6e565cf146812dfaf75103fdd.gif',
      'https://i.pinimg.com/originals/c1/25/56/c125567f814ecc1ec1eeccc1ebc65775.gif',
      'https://i.pinimg.com/originals/35/76/a3/3576a37970c02f6644c6d9f7d6ec64a2.gif',
      'https://i.pinimg.com/originals/ee/b0/95/eeb095b945446eb6a32bc6ddcb927eec.gif',
      'https://i.pinimg.com/originals/73/48/d1/7348d185fd3b9d1b9364a2d2a466808e.gif',
    ],
    description:
      "Frieren: Beyond Journey's End delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.",
    platformButton: {
      label: 'Crunchyroll',
      type: 'crunchyroll',
      url: 'https://myanimelist.net/anime/14719/JoJo_no_Kimyou_na_Bouken_TV',
    },
    reviews: {
      recentReviews: {
        label: 'MyAnimeList Rating',
        count: '9.4 / 10',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: '94% (AniList)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 94,
      },
    },
    details: {
      genres: 'Shounen, Action, Adventure, Supernatural, Featured',
      publisher: 'Warner Bros. Japan / Shueisha',
      developer: 'David Production',
      releaseDate: 'October 6, 2012',
      platform: 'TV, Streaming (Crunchyroll, Netflix)',
      socialLinks: {
        web: 'https://myanimelist.net/anime/14719/JoJo_no_Kimyou_na_Bouken_TV',
      },
      metadataSource: {
        name: 'MyAnimeList',
        url: 'https://myanimelist.net/anime/14719/JoJo_no_Kimyou_na_Bouken_TV',
      },
    },
    similarItems: [
      {
        title: 'Hunter x Hunter (2011)',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: 'Shounen, Adventure, Fantasy',
      },
      {
        title: 'Bleach',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.8,
        releaseYear: 2022,
        subtitle: 'Shounen, Action, Supernatural',
      },
      {
        title: 'Jujutsu Kaisen',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2020,
        subtitle: 'Shounen, Action',
      },
      {
        title: 'Tengen Toppa Gurren Lagann',
        posterUrl: 'https://cdn.myanimelist.net/images/anime/4/5123l.jpg',
        type: ShowcaseMediaType.ANIME,
        rating: 9.6,
        releaseYear: 2007,
        subtitle: 'Mecha, Action, Adventure',
      },
    ],
  },

  interstellar: {
    title: 'Interstellar',
    subtitle: 'Sci-Fi, Drama, Adventure',
    rank: 3,
    miniPosterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    videoUrl:
      'https://cdn.discordapp.com/app-assets/356875988589740042/store/1486740188892893284.mp4?size=3072',
    videoDuration: '2:27',
    videoThumbnail: 'https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    screenshots: [
      'https://image.tmdb.org/t/p/original/rAiYTnrLEHV4iB4A9Xnwh8n8Keq.jpg',
      'https://image.tmdb.org/t/p/original/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg',
      'https://image.tmdb.org/t/p/original/pbrkL804c8yAv3zBZR4QPEafpAR.jpg',
    ],
    description:
      'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage in search of a new home for humanity.',
    platformButton: {
      label: 'TMDB',
      type: 'tmdb',
      url: 'https://www.themoviedb.org/movie/157336-interstellar',
    },
    reviews: {
      recentReviews: {
        label: 'IMDb Rating',
        count: '8.7 / 10 (2 100 000+ ratings)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Rotten Tomatoes',
        language: 'Critics',
        count: 'Certified Fresh (87%)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Sci-Fi, Drama, Adventure',
      publisher: 'Paramount Pictures / Warner Bros.',
      developer: 'Christopher Nolan (Director)',
      releaseDate: 'November 5, 2014',
      platform: 'Theaters, IMAX, Digital 4K',
      socialLinks: {
        web: 'https://www.paramountmovies.com/movies/interstellar',
        facebook: 'https://www.facebook.com/InterstellarMovie',
        twitter: 'https://twitter.com/Interstellar',
      },
      metadataSource: {
        name: 'TMDB',
        url: 'https://www.themoviedb.org/movie/157336-interstellar',
      },
    },
    similarItems: [
      {
        title: 'Oppenheimer',
        posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        type: ShowcaseMediaType.MOVIE,
        rating: 8.9,
        releaseYear: 2023,
        subtitle: 'Biography, Drama, History',
      },
      {
        title: 'Inception',
        posterUrl: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
        type: ShowcaseMediaType.MOVIE,
        rating: 8.8,
        releaseYear: 2010,
        subtitle: 'Sci-Fi, Action',
      },
      {
        title: 'The Martian',
        posterUrl: 'https://image.tmdb.org/t/p/w500/5BHuvQ6p9kQTSpEuz6qvMuLQGR.jpg',
        type: ShowcaseMediaType.MOVIE,
        rating: 8.2,
        releaseYear: 2015,
        subtitle: 'Sci-Fi, Drama',
      },
      {
        title: 'Dune: Part Two',
        posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
        type: ShowcaseMediaType.MOVIE,
        rating: 9.6,
        releaseYear: 2024,
        subtitle: 'Sci-Fi, Adventure',
      },
    ],
  },

  'counter-strike: global offensive': {
    title: 'Counter-Strike: Global Offensive',
    subtitle: 'Tactical Shooter, Esports, FPS, Action',
    rank: 1,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
    ],
    description:
      'Oppenheimer delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/730/CounterStrike_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (47 550)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (180 690)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Tactical Shooter, Esports, FPS, Action',
      publisher: 'Valve',
      developer: 'Valve, Hidden Path Entertainment',
      releaseDate: 'August 21, 2012',
      platform: 'PC (Windows, Steam, Linux)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/730/CounterStrike_2/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/730/CounterStrike_2/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Counter-Strike 1.6',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/10/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2000,
        subtitle: 'Classic Shooter, Club Legends',
      },
      {
        title: 'Counter-Strike 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2023,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Valorant',
        posterUrl:
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2020,
        subtitle: 'First-Person Tactical Shooter, Hero FPS',
      },
      {
        title: "Tom Clancy's Rainbow Six Siege",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/359550/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2015,
        subtitle: 'Tactical Special Forces, Environmental Destruction',
      },
    ],
  },

  'counter-strike 1.6': {
    title: 'Counter-Strike 1.6',
    subtitle: 'Classic Shooter, Club Legends, FPS',
    rank: 2,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/10/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/10/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/10/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/10/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/10/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/10/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/10/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/10/header.jpg',
    ],
    description:
      'Counter-Strike 1.6 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/10/CounterStrike/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (49 370)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (187 606)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Classic Shooter, Club Legends, FPS',
      publisher: 'Valve',
      developer: 'Valve',
      releaseDate: 'November 1, 2000',
      platform: 'PC (Windows, Steam)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/10/CounterStrike/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/10/CounterStrike/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Counter-Strike: Global Offensive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2012,
        subtitle: 'Tactical Shooter, Esports',
      },
      {
        title: 'Counter-Strike 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2023,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Half-Life 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/220/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2004,
        subtitle: 'Gordon Freeman, Gravity Gun',
      },
      {
        title: 'Team Fortress 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2007,
        subtitle: 'Cult Classic Team Shooter, Featured',
      },
    ],
  },

  'league of legends': {
    title: 'League of Legends',
    subtitle: 'MOBA, Competitive Strategy, Action',
    rank: 3,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256692021/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
      // You can insert links to your own screenshots here:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    ],
    description:
      'Counter-Strike: Global Offensive delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Riot Games',
      type: 'riot',
      url: 'https://www.leagueoflegends.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Player Rating',
        count: 'Very Positive (48 390)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: 'Very Positive (183 882)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'MOBA, Competitive Strategy, Action',
      publisher: 'Riot Games',
      developer: 'Riot Games',
      releaseDate: 'October 27, 2009',
      platform: 'PC (Windows, macOS)',
      socialLinks: {
        web: 'https://www.leagueoflegends.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Riot Games',
        url: 'https://www.leagueoflegends.com/',
      },
    },
    similarItems: [
      {
        title: 'Dota 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2013,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'SMITE',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/386360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.3,
        releaseYear: 2015,
        subtitle: 'Third-Person MOBA, Featured',
      },
      {
        title: 'Deadlock',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1422450/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2024,
        subtitle: 'Featured, MOBA',
      },
      {
        title: 'Valorant',
        posterUrl:
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2020,
        subtitle: 'First-Person Tactical Shooter, Hero FPS',
      },
    ],
  },

  valorant: {
    title: 'Valorant',
    subtitle: 'First-Person Tactical Shooter, Hero FPS',
    rank: 4,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://i.pinimg.com/originals/2d/d1/f0/2dd1f0d601311527c878a67b6d74226b.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/aa/41/27/aa4127430e2bebc155a8d1effe681bc0.gif',
      'https://i.pinimg.com/originals/1b/9e/e5/1b9ee55324c023928ecd2895aa602baa.gif',
      'https://i.pinimg.com/originals/eb/56/b6/eb56b6c9acece2a24afed57454bcc5b7.gif',
      'https://i.pinimg.com/originals/12/82/ff/1282ff2f0289bcf54c295435cbdf3cc2.gif',
      'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/af8618ac0d1565363a107aac8294360226b6b2a2-1920x1080.jpg',
    ],
    description:
      'Dota 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Riot Games',
      type: 'riot',
      url: 'https://playvalorant.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Player Rating',
        count: 'Very Positive (80 / 100)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: 'Very Positive (28+ million players)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 89,
      },
    },
    details: {
      genres: 'First-Person Tactical Shooter, Hero FPS',
      publisher: 'Riot Games',
      developer: 'Riot Games',
      releaseDate: 'June 2, 2020',
      platform: 'PC (Windows), PlayStation 5, Xbox Series X/S',
      socialLinks: {
        web: 'https://playvalorant.com/',
        twitter: 'https://twitter.com/playvalorant',
        youtube: 'https://youtube.com/c/playvalorant',
        reddit: 'https://reddit.com/r/VALORANT',
        twitch: 'https://twitch.tv/directory/game/VALORANT',
      },
      metadataSource: {
        name: 'Riot Games',
        url: 'https://playvalorant.com/',
      },
    },
    similarItems: [
      {
        title: 'Counter-Strike: Global Offensive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2012,
        subtitle: 'Tactical Shooter, Esports',
      },
      {
        title: 'Counter-Strike 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2023,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Overwatch 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2357570/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.2,
        releaseYear: 2022,
        subtitle: 'Shooter, Action',
      },
      {
        title: 'Apex Legends',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2019,
        subtitle: 'Battle Royale, Hero Shooter',
      },
    ],
  },

  deadlock: {
    title: 'Deadlock',
    subtitle: 'Featured, MOBA, Action',
    rank: 5,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1422450/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1422450/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1422450/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1422450/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1422450/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1422450/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1422450/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1422450/header.jpg',
    ],
    description:
      'Counter-Strike: Global Offensive delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1422450/Deadlock/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (49 580)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (188 404)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 94,
      },
    },
    details: {
      genres: 'Featured, MOBA, Action',
      publisher: 'Valve',
      developer: 'Valve',
      releaseDate: '2024 (Playtest)',
      platform: 'PC (Windows, Steam)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1422450/Deadlock/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1422450/Deadlock/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Dota 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2013,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Team Fortress 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2007,
        subtitle: 'Cult Classic Team Shooter, Featured',
      },
      {
        title: 'Overwatch 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2357570/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.2,
        releaseYear: 2022,
        subtitle: 'Shooter, Action',
      },
      {
        title: 'SMITE',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/386360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.3,
        releaseYear: 2015,
        subtitle: 'Third-Person MOBA, Featured',
      },
    ],
  },

  fortnite: {
    title: 'Fortnite',
    subtitle: 'Battle Royale, Building, Sandbox',
    rank: 6,
    miniPosterUrl: 'https://i.ebayimg.com/images/g/rKYAAOSwqY5fhrmq/s-l1200.jpg',
    bannerUrl: 'https://i.pinimg.com/originals/c9/c6/52/c9c65279fe2d3d057d70a62364333dc5.gif',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://i.ebayimg.com/images/g/rKYAAOSwqY5fhrmq/s-l1200.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/c9/c6/52/c9c65279fe2d3d057d70a62364333dc5.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/46/d0/f8/46d0f8e29daa45514d826492602acd68.gif',
      'https://i.pinimg.com/originals/24/e0/82/24e0825e148b7444c9850e358430991b.gif',
      'https://static.wikia.nocookie.net/fortnite/images/c/cf/Lobby_%28v39.00%29_-_User_Interface_-_Fortnite.png/revision/latest?cb=20251205213058',
      'https://interfaceingame.com/wp-content/uploads/fortnite/fortnite-victory-royale-500x281.jpg',
    ],
    description:
      'Dota 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Epic Games',
      type: 'epic',
      url: 'https://www.fortnite.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Player Rating',
        count: 'Very Positive (47 900)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: 'Very Positive (182 020)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 88,
      },
    },
    details: {
      genres: 'Battle Royale, Building, Sandbox',
      publisher: 'Epic Games',
      developer: 'Epic Games',
      releaseDate: 'July 21, 2017',
      platform: 'PC, PlayStation 5, Xbox Series X/S, Nintendo Switch, Android',
      socialLinks: {
        web: 'https://www.fortnite.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Epic Games',
        url: 'https://www.fortnite.com/',
      },
    },
    similarItems: [
      {
        title: 'Apex Legends',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2019,
        subtitle: 'Battle Royale, Hero Shooter',
      },
      {
        title: 'PUBG: BATTLEGROUNDS',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.4,
        releaseYear: 2017,
        subtitle: 'Battle Royale, Tactical Survival Simulator',
      },
      {
        title: 'Fall Guys',
        posterUrl:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2020,
        subtitle: 'RPG',
      },
      {
        title: 'ROBLOX',
        posterUrl: 'https://www.artsyfartsy.eu/cdn/shop/files/17026.jpg?v=1760384946&width=320',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2006,
        subtitle: 'Featured',
      },
    ],
  },

  'apex legends': {
    title: 'Apex Legends',
    subtitle: 'Battle Royale, Hero Shooter, Parkour',
    rank: 7,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg',
    ],
    description:
      'Apex Legends delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1172470/Apex_Legends/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (47 620)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (180 956)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 86,
      },
    },
    details: {
      genres: 'Battle Royale, Hero Shooter, Parkour',
      publisher: 'Electronic Arts',
      developer: 'Respawn Entertainment',
      releaseDate: 'February 4, 2019',
      platform: 'PC (Windows, Steam), PS5, PS4, Xbox, Switch',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1172470/Apex_Legends/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1172470/Apex_Legends/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Titanfall 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1237970/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2020,
        subtitle: 'Featured, Parkour',
      },
      {
        title: 'Overwatch 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2357570/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.2,
        releaseYear: 2022,
        subtitle: 'Shooter, Action',
      },
      {
        title: 'Valorant',
        posterUrl:
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2020,
        subtitle: 'First-Person Tactical Shooter, Hero FPS',
      },
      {
        title: 'THE FINALS',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2073850/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2023,
        subtitle: 'Dynamic Shooter, Featured',
      },
    ],
  },

  'overwatch 2': {
    title: 'Overwatch 2',
    subtitle: 'Shooter, Action, FPS',
    rank: 8,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2357570/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2357570/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2357570/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2357570/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2357570/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2357570/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2357570/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/2357570/header.jpg',
    ],
    description:
      'Titanfall 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/2357570/Overwatch_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (46 640)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (177 232)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 82,
      },
    },
    details: {
      genres: 'Shooter, Action, FPS',
      publisher: 'Blizzard Entertainment',
      developer: 'Blizzard Entertainment',
      releaseDate: 'October 4, 2022',
      platform: 'PC (Battle.net, Steam), PS5, Xbox, Switch',
      socialLinks: {
        web: 'https://store.steampowered.com/app/2357570/Overwatch_2/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/2357570/Overwatch_2/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Team Fortress 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2007,
        subtitle: 'Cult Classic Team Shooter, Featured',
      },
      {
        title: 'Valorant',
        posterUrl:
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2020,
        subtitle: 'First-Person Tactical Shooter, Hero FPS',
      },
      {
        title: 'Apex Legends',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2019,
        subtitle: 'Battle Royale, Hero Shooter',
      },
      {
        title: 'Deadlock',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1422450/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2024,
        subtitle: 'Featured, MOBA',
      },
    ],
  },

  'rocket league': {
    title: 'Rocket League',
    subtitle: 'Vehicular Soccer, Arcade, Physics, Sports',
    rank: 9,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg',
    bannerUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg',
    screenshots: [
      'https://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg',
      // You can insert links to your own screenshots here:
      'https://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg',
    ],
    description:
      'Team Fortress 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Epic Games',
      type: 'epic',
      url: 'https://www.rocketleague.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Player Rating',
        count: 'Very Positive (50 210)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: 'Very Positive (190 798)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Vehicular Soccer, Arcade, Physics, Sports',
      publisher: 'Epic Games',
      developer: 'Psyonix',
      releaseDate: 'July 7, 2015',
      platform: 'PC (Epic Games), PlayStation, Xbox, Switch',
      socialLinks: {
        web: 'https://www.rocketleague.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Epic Games',
        url: 'https://www.rocketleague.com/',
      },
    },
    similarItems: [
      {
        title: 'Brawlhalla',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/291550/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.4,
        releaseYear: 2017,
        subtitle: 'Featured, Arena',
      },
      {
        title: 'Fall Guys',
        posterUrl:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2020,
        subtitle: 'RPG',
      },
      {
        title: 'Stumble Guys',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1677740/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
      {
        title: 'Forza Horizon 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
    ],
  },

  'pubg: battlegrounds': {
    title: 'PUBG: BATTLEGROUNDS',
    subtitle: 'Battle Royale, Tactical Survival Simulator',
    rank: 10,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/578080/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg',
    ],
    description:
      'Brawlhalla delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (48 180)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (183 084)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 84,
      },
    },
    details: {
      genres: 'Battle Royale, Tactical Survival Simulator',
      publisher: 'KRAFTON, Inc.',
      developer: 'KRAFTON, Inc.',
      releaseDate: 'December 21, 2017',
      platform: 'PC (Windows, Steam), PlayStation, Xbox, Mobile',
      socialLinks: {
        web: 'https://store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/578080/PUBG_BATTLEGROUNDS/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Apex Legends',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2019,
        subtitle: 'Battle Royale, Hero Shooter',
      },
      {
        title: 'Counter-Strike: Global Offensive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2012,
        subtitle: 'Tactical Shooter, Esports',
      },
      {
        title: 'DayZ',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/221100/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2018,
        subtitle: 'Zombie Apocalypse, Featured',
      },
      {
        title: 'Escape from Tarkov',
        posterUrl:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2017,
        subtitle: 'Hardcore Realistic Extraction Shooter, Raids',
      },
    ],
  },

  "tom clancy's rainbow six siege": {
    title: "Tom Clancy's Rainbow Six Siege",
    subtitle: 'Tactical Special Forces, Environmental Destruction, Strategy',
    rank: 11,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/359550/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359550/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359550/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359550/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359550/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359550/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359550/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/359550/header.jpg',
    ],
    description:
      'Apex Legends delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/359550/Tom_Clancys_Rainbow_Six_Siege/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (50 000)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (190 000)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 88,
      },
    },
    details: {
      genres: 'Tactical Special Forces, Environmental Destruction, Strategy',
      publisher: 'Ubisoft',
      developer: 'Ubisoft Montreal',
      releaseDate: 'December 1, 2015',
      platform: 'PC (Windows, Steam), PS5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/359550/Tom_Clancys_Rainbow_Six_Siege/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/359550/Tom_Clancys_Rainbow_Six_Siege/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Counter-Strike: Global Offensive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2012,
        subtitle: 'Tactical Shooter, Esports',
      },
      {
        title: 'Counter-Strike 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2023,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Ready or Not',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1144200/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2023,
        subtitle: 'Tactical SWAT Simulator, Realism',
      },
      {
        title: 'Valorant',
        posterUrl:
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2020,
        subtitle: 'First-Person Tactical Shooter, Hero FPS',
      },
    ],
  },

  'the finals': {
    title: 'THE FINALS',
    subtitle: 'Dynamic Shooter, Featured, Arena',
    rank: 12,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2073850/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2073850/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2073850/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2073850/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2073850/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2073850/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2073850/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/2073850/header.jpg',
    ],
    description:
      'Counter-Strike: Global Offensive delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/2073850/THE_FINALS/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (50 070)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (190 266)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 87,
      },
    },
    details: {
      genres: 'Dynamic Shooter, Featured, Arena',
      publisher: 'Embark Studios',
      developer: 'Embark Studios',
      releaseDate: 'December 8, 2023',
      platform: 'PC (Windows, Steam), PlayStation 5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/2073850/THE_FINALS/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/2073850/THE_FINALS/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Apex Legends',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2019,
        subtitle: 'Battle Royale, Hero Shooter',
      },
      {
        title: 'Overwatch 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2357570/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.2,
        releaseYear: 2022,
        subtitle: 'Shooter, Action',
      },
      {
        title: 'Battlefield 2042',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1517290/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 7.8,
        releaseYear: 2021,
        subtitle: 'Near-Future Warfare 2042, Featured',
      },
      {
        title: 'Battlefield 1',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238840/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2016,
        subtitle: 'World War I Battlefield, Featured',
      },
    ],
  },

  'delta force': {
    title: 'Delta Force',
    subtitle: 'Shooter, Featured, Extraction',
    rank: 13,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2507950/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2507950/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2507950/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2507950/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2507950/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2507950/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2507950/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/2507950/header.jpg',
    ],
    description:
      'Apex Legends delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/2507950/Delta_Force/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (50 840)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (193 192)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 88,
      },
    },
    details: {
      genres: 'Shooter, Featured, Extraction',
      publisher: 'TiMi Studio Group',
      developer: 'Team Jade',
      releaseDate: '2024',
      platform: 'PC (Windows, Steam), Consoles, Mobile',
      socialLinks: {
        web: 'https://store.steampowered.com/app/2507950/Delta_Force/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/2507950/Delta_Force/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Battlefield 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238860/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2013,
        subtitle: 'Featured',
      },
      {
        title: 'Battlefield 1',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238840/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2016,
        subtitle: 'World War I Battlefield, Featured',
      },
      {
        title: 'Escape from Tarkov',
        posterUrl:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2017,
        subtitle: 'Hardcore Realistic Extraction Shooter, Raids',
      },
      {
        title: 'Call of Duty: Modern Warfare III',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2519060/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.2,
        releaseYear: 2023,
        subtitle: 'Military Shooter, Multiplayer',
      },
    ],
  },

  'naraka: bladepoint': {
    title: 'NARAKA: BLADEPOINT',
    subtitle: 'Martial Arts Battle Royale, Parkour, Hack and Slash',
    rank: 14,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1203220/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1203220/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256728780/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1203220/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1203220/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1203220/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1203220/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1203220/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1203220/header.jpg',
    ],
    description:
      'Battlefield 4 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (50 560)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (192 128)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 86,
      },
    },
    details: {
      genres: 'Martial Arts Battle Royale, Parkour, Hack and Slash',
      publisher: 'NetEase Games',
      developer: '24 Entertainment',
      releaseDate: 'August 12, 2021',
      platform: 'PC (Windows, Steam), PlayStation 5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1203220/NARAKA_BLADEPOINT/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Black Myth: Wukong',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2024,
        subtitle: 'Action-RPG, Mythology',
      },
      {
        title: 'ELDEN RING',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Brawlhalla',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/291550/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.4,
        releaseYear: 2017,
        subtitle: 'Featured, Arena',
      },
      {
        title: 'Devil May Cry 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/601150/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  brawlhalla: {
    title: 'Brawlhalla',
    subtitle: 'Featured, Arena',
    rank: 15,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/291550/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/291550/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256728780/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/291550/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/291550/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/291550/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/291550/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/291550/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/291550/header.jpg',
    ],
    description:
      'Black Myth: Wukong delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/291550/Brawlhalla/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (50 280)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (191 064)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 84,
      },
    },
    details: {
      genres: 'Featured, Arena',
      publisher: 'Ubisoft',
      developer: 'Blue Mammoth Games',
      releaseDate: 'October 17, 2017',
      platform: 'PC (Windows, Steam), PS5, Xbox, Switch, Mobile',
      socialLinks: {
        web: 'https://store.steampowered.com/app/291550/Brawlhalla/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/291550/Brawlhalla/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'SMITE',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/386360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.3,
        releaseYear: 2015,
        subtitle: 'Third-Person MOBA, Featured',
      },
      {
        title: 'Rocket League',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2015,
        subtitle: 'Vehicular Soccer, Arcade',
      },
      {
        title: 'Mortal Kombat X',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/307780/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2015,
        subtitle: 'Featured',
      },
      {
        title: 'Stumble Guys',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1677740/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
    ],
  },

  smite: {
    title: 'SMITE',
    subtitle: 'Third-Person MOBA, Featured, Action',
    rank: 16,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/386360/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/386360/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256875461/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/386360/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/386360/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/386360/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/386360/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/386360/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/386360/header.jpg',
    ],
    description:
      'SMITE delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/386360/SMITE/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (50 350)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (191 330)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 83,
      },
    },
    details: {
      genres: 'Third-Person MOBA, Featured, Action',
      publisher: 'Hi-Rez Studios',
      developer: 'Titan Forge Games',
      releaseDate: 'March 25, 2014',
      platform: 'PC (Windows, Steam), PlayStation, Xbox, Switch',
      socialLinks: {
        web: 'https://store.steampowered.com/app/386360/SMITE/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/386360/SMITE/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Dota 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2013,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'League of Legends',
        posterUrl:
          'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2009,
        subtitle: 'MOBA, Competitive Strategy',
      },
      {
        title: 'Deadlock',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1422450/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2024,
        subtitle: 'Featured, MOBA',
      },
      {
        title: 'NARAKA: BLADEPOINT',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1203220/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2021,
        subtitle: 'Martial Arts Battle Royale, Parkour',
      },
    ],
  },

  'team fortress 2': {
    title: 'Team Fortress 2',
    subtitle: 'Cult Classic Team Shooter, Featured, FPS',
    rank: 17,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/440/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/440/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/440/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/440/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/440/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/440/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg',
    ],
    description:
      'Dota 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/440/Team_Fortress_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (54 270)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (206 226)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Cult Classic Team Shooter, Featured, FPS',
      publisher: 'Valve',
      developer: 'Valve',
      releaseDate: 'October 10, 2007',
      platform: 'PC (Windows, Steam, Linux)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/440/Team_Fortress_2/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/440/Team_Fortress_2/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Counter-Strike: Global Offensive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2012,
        subtitle: 'Tactical Shooter, Esports',
      },
      {
        title: 'Overwatch 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2357570/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.2,
        releaseYear: 2022,
        subtitle: 'Shooter, Action',
      },
      {
        title: 'Deadlock',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1422450/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2024,
        subtitle: 'Featured, MOBA',
      },
      {
        title: 'Half-Life 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/220/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2004,
        subtitle: 'Gordon Freeman, Gravity Gun',
      },
    ],
  },

  aimlabs: {
    title: 'Aimlabs',
    subtitle: 'Sports, Aim Trainer',
    rank: 18,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/714010/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/714010/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/714010/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/714010/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/714010/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/714010/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/714010/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/714010/header.jpg',
    ],
    description:
      'Counter-Strike: Global Offensive delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/714010/Aimlabs/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (54 340)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (206 492)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Sports, Aim Trainer',
      publisher: 'State Space Labs, Inc.',
      developer: 'State Space Labs, Inc.',
      releaseDate: 'June 16, 2023',
      platform: 'PC (Windows, Steam)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/714010/Aimlabs/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/714010/Aimlabs/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Counter-Strike 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2023,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Valorant',
        posterUrl:
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2020,
        subtitle: 'First-Person Tactical Shooter, Hero FPS',
      },
      {
        title: 'Apex Legends',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2019,
        subtitle: 'Battle Royale, Hero Shooter',
      },
      {
        title: 'osu!',
        posterUrl:
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2007,
        subtitle: 'Rhythm, Featured',
      },
    ],
  },

  'black myth: wukong': {
    title: 'Black Myth: Wukong',
    subtitle: 'Action-RPG, Mythology, Souls-like, Hack and Slash',
    rank: 20,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256875461/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg',
    ],
    description:
      'Counter-Strike 2 is the largest technical leap forward in Counter-Strike history. Built on the Source 2 engine, it features overhauled graphics, dynamic volumetric smoke grenades, sub-tick server updates, and legendary 5v5 tactical shooter gameplay.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/2358720/Black_Myth_Wukong/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (56 580)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (215 004)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 96,
      },
    },
    details: {
      genres: 'Action-RPG, Mythology, Souls-like, Hack and Slash',
      publisher: 'Game Science',
      developer: 'Game Science',
      releaseDate: 'August 20, 2024',
      platform: 'PC (Windows, Steam, Epic Games), PlayStation 5',
      socialLinks: {
        web: 'https://store.steampowered.com/app/2358720/Black_Myth_Wukong/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/2358720/Black_Myth_Wukong/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'ELDEN RING',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Dark Souls III',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/374320/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2016,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Devil May Cry 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/601150/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'God of War',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Third-Person Action, Mythology',
      },
    ],
  },

  'warhammer 40,000: space marine 2': {
    title: 'Warhammer 40,000: Space Marine 2',
    subtitle: 'Shooter, Co-op, Warhammer 40K',
    rank: 21,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2183900/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2183900/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2183900/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2183900/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2183900/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2183900/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2183900/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/2183900/header.jpg',
    ],
    description:
      'ELDEN RING delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/2183900/Warhammer_40000_Space_Marine_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (55 600)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (211 280)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Shooter, Co-op, Warhammer 40K',
      publisher: 'Focus Entertainment',
      developer: 'Saber Interactive',
      releaseDate: 'September 9, 2024',
      platform: 'PC (Windows, Steam), PlayStation 5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/2183900/Warhammer_40000_Space_Marine_2/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/2183900/Warhammer_40000_Space_Marine_2/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Deep Rock Galactic',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/548430/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2020,
        subtitle: 'Featured',
      },
      {
        title: 'Left 4 Dead 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/550/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2009,
        subtitle: 'Shooter, Featured',
      },
      {
        title: "Baldur's Gate 3",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2023,
        subtitle: 'CRPG, Adventure',
      },
      {
        title: 'ELDEN RING',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Souls-like, RPG',
      },
    ],
  },

  'red dead redemption 2': {
    title: 'Red Dead Redemption 2',
    subtitle: 'Western, Open World, Masterpiece',
    rank: 22,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
    ],
    description:
      'Deep Rock Galactic delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (58 120)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (220 856)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 98,
      },
    },
    details: {
      genres: 'Western, Open World, Masterpiece',
      publisher: 'Rockstar Games',
      developer: 'Rockstar Games',
      releaseDate: 'November 5, 2019',
      platform: 'PC (Windows, Steam, Rockstar Launcher), PS4, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Grand Theft Auto V',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Grand Theft Auto: San Andreas',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/12120/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2004,
        subtitle: 'Legendary Action, Open World',
      },
      {
        title: 'Mafia: Definitive Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1030840/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2020,
        subtitle: 'Featured',
      },
      {
        title: 'The Witcher 3: Wild Hunt',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'grand theft auto: san andreas': {
    title: 'Grand Theft Auto: San Andreas',
    subtitle: 'Legendary Action, Open World, Classic',
    rank: 23,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/12120/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/12120/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/12120/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/12120/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/12120/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/12120/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/12120/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/12120/header.jpg',
    ],
    description:
      'When a young street hustler, a retired bank robber, and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld and the U.S. government, they must pull off a series of dangerous heists.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/12120/Grand_Theft_Auto_San_Andreas/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (58 540)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (222 452)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 98,
      },
    },
    details: {
      genres: 'Legendary Action, Open World, Classic',
      publisher: 'Rockstar Games',
      developer: 'Rockstar North',
      releaseDate: 'October 26, 2004',
      platform: 'PC (Windows, Steam), Consoles, Mobile',
      socialLinks: {
        web: 'https://store.steampowered.com/app/12120/Grand_Theft_Auto_San_Andreas/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/12120/Grand_Theft_Auto_San_Andreas/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Grand Theft Auto V',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Red Dead Redemption 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2019,
        subtitle: 'Western, Open World',
      },
      {
        title: 'Mafia II: Definitive Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1030830/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2020,
        subtitle: 'Vito Scaletta, Featured',
      },
      {
        title: 'Watch_Dogs 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/447040/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2016,
        subtitle: 'Hackers, Featured',
      },
    ],
  },

  'the elder scrolls v: skyrim special edition': {
    title: 'The Elder Scrolls V: Skyrim Special Edition',
    subtitle: 'RPG, Open World, Dragons, Fantasy',
    rank: 24,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/489830/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256927226/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/489830/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/489830/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/489830/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/489830/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/489830/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg',
    ],
    description:
      'When a young street hustler, a retired bank robber, and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld and the U.S. government, they must pull off a series of dangerous heists.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/489830/The_Elder_Scrolls_V_Skyrim_Special_Edition/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (58 610)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (222 718)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'RPG, Open World, Dragons, Fantasy',
      publisher: 'Bethesda Softworks',
      developer: 'Bethesda Game Studios',
      releaseDate: 'October 28, 2016',
      platform: 'PC (Windows, Steam), PS5, Xbox Series X/S, Switch',
      socialLinks: {
        web: 'https://store.steampowered.com/app/489830/The_Elder_Scrolls_V_Skyrim_Special_Edition/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/489830/The_Elder_Scrolls_V_Skyrim_Special_Edition/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'The Witcher 3: Wild Hunt',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'ELDEN RING',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Fallout 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/377160/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2015,
        subtitle: 'Post-Apocalyptic, RPG',
      },
      {
        title: "Baldur's Gate 3",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2023,
        subtitle: 'CRPG, RPG',
      },
    ],
  },

  'fallout 4': {
    title: 'Fallout 4',
    subtitle: 'Post-Apocalyptic, RPG, Building, Featured',
    rank: 25,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/377160/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/377160/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/377160/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/377160/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/377160/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/377160/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/377160/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/377160/header.jpg',
    ],
    description:
      'You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/377160/Fallout_4/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (56 230)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (213 674)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 89,
      },
    },
    details: {
      genres: 'Post-Apocalyptic, RPG, Building, Featured',
      publisher: 'Bethesda Softworks',
      developer: 'Bethesda Game Studios',
      releaseDate: 'November 10, 2015',
      platform: 'PC (Windows, Steam), PS5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/377160/Fallout_4/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/377160/Fallout_4/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'The Elder Scrolls V: Skyrim Special Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2016,
        subtitle: 'RPG, Open World',
      },
      {
        title: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1643320/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2024,
        subtitle: 'Featured, Atmospheric Shooter',
      },
      {
        title: 'Metro Exodus',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/412020/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2019,
        subtitle: 'Post-Apocalyptic, Featured',
      },
      {
        title: 'Cyberpunk 2077',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2020,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'god of war ragnarök': {
    title: 'God of War Ragnarök',
    subtitle: 'Action-Adventure, Featured, Hack and Slash',
    rank: 26,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2322010/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256875461/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2322010/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/2322010/header.jpg',
    ],
    description:
      'The Elder Scrolls V: Skyrim Special Edition delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/2322010/God_of_War_Ragnarok/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (59 100)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (224 580)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 96,
      },
    },
    details: {
      genres: 'Action-Adventure, Featured, Hack and Slash',
      publisher: 'PlayStation Publishing LLC',
      developer: 'Santa Monica Studio',
      releaseDate: 'September 19, 2024',
      platform: 'PC (Windows, Steam), PlayStation 5, PlayStation 4',
      socialLinks: {
        web: 'https://store.steampowered.com/app/2322010/God_of_War_Ragnarok/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/2322010/God_of_War_Ragnarok/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'God of War',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Third-Person Action, Mythology',
      },
      {
        title: 'Black Myth: Wukong',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2024,
        subtitle: 'Action-RPG, Mythology',
      },
      {
        title: 'ELDEN RING',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Devil May Cry 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/601150/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'god of war': {
    title: 'God of War',
    subtitle: 'Third-Person Action, Mythology, Featured',
    rank: 27,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256875461/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg',
    ],
    description:
      'God of War delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1593500/God_of_War/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (59 870)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (227 506)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Third-Person Action, Mythology, Featured',
      publisher: 'PlayStation Publishing LLC',
      developer: 'Santa Monica Studio',
      releaseDate: 'January 14, 2022',
      platform: 'PC (Windows, Steam), PlayStation 4, PlayStation 5',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1593500/God_of_War/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1593500/God_of_War/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'God of War Ragnarök',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2322010/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2024,
        subtitle: 'Action-Adventure, Featured',
      },
      {
        title: 'Black Myth: Wukong',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2024,
        subtitle: 'Action-RPG, Mythology',
      },
      {
        title: 'ELDEN RING',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'The Witcher 3: Wild Hunt',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'hogwarts legacy': {
    title: 'Hogwarts Legacy',
    subtitle: 'Magic High School, Open World, Harry Potter Universe, RPG',
    rank: 28,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/990080/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/990080/header.jpg',
    ],
    description:
      'God of War Ragnarök delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/990080/Hogwarts_Legacy/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (58 190)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (221 122)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Magic High School, Open World, Harry Potter Universe, RPG',
      publisher: 'Warner Bros. Games',
      developer: 'Avalanche Software',
      releaseDate: 'February 10, 2023',
      platform: 'PC (Windows, Steam), PS5, Xbox Series X/S, Switch',
      socialLinks: {
        web: 'https://store.steampowered.com/app/990080/Hogwarts_Legacy/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/990080/Hogwarts_Legacy/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'The Witcher 3: Wild Hunt',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'The Elder Scrolls V: Skyrim Special Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2016,
        subtitle: 'RPG, Open World',
      },
      {
        title: "Baldur's Gate 3",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2023,
        subtitle: 'CRPG, RPG',
      },
      {
        title: 'Cyberpunk 2077',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2020,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'atomic heart': {
    title: 'Atomic Heart',
    subtitle: 'Alternate USSR, Biopunk, First-Person Shooter',
    rank: 29,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/668580/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/668580/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/668580/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/668580/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/668580/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/668580/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/668580/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/668580/header.jpg',
    ],
    description:
      'You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/668580/Atomic_Heart/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (57 560)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (218 728)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 88,
      },
    },
    details: {
      genres: 'Alternate USSR, Biopunk, First-Person Shooter',
      publisher: 'Focus Entertainment, 4Divinity',
      developer: 'Mundfish',
      releaseDate: 'February 21, 2023',
      platform: 'PC (Windows, Steam, VK Play), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/668580/Atomic_Heart/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/668580/Atomic_Heart/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1643320/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2024,
        subtitle: 'Featured, Atmospheric Shooter',
      },
      {
        title: 'Metro Exodus',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/412020/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2019,
        subtitle: 'Post-Apocalyptic, Featured',
      },
      {
        title: 'Fallout 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/377160/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2015,
        subtitle: 'Post-Apocalyptic, RPG',
      },
      {
        title: 'Half-Life 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/220/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2004,
        subtitle: 'Gordon Freeman, Gravity Gun',
      },
    ],
  },

  's.t.a.l.k.e.r. 2: heart of chornobyl': {
    title: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
    subtitle: 'Featured, Atmospheric Shooter, Survival',
    rank: 30,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1643320/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1643320/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1643320/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1643320/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1643320/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1643320/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1643320/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1643320/header.jpg',
    ],
    description:
      'S.T.A.L.K.E.R. 2: Heart of Chornobyl delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1643320/STALKER_2_Heart_of_Chornobyl/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (59 730)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (226 974)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Featured, Atmospheric Shooter, Survival',
      publisher: 'GSC Game World',
      developer: 'GSC Game World',
      releaseDate: 'November 20, 2024',
      platform: 'PC (Windows, Steam), Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1643320/STALKER_2_Heart_of_Chornobyl/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1643320/STALKER_2_Heart_of_Chornobyl/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Metro Exodus',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/412020/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2019,
        subtitle: 'Post-Apocalyptic, Featured',
      },
      {
        title: 'Atomic Heart',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/668580/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2023,
        subtitle: 'Alternate USSR, Biopunk',
      },
      {
        title: 'Escape from Tarkov',
        posterUrl:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2017,
        subtitle: 'Hardcore Realistic Extraction Shooter, Raids',
      },
      {
        title: 'DayZ',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/221100/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2018,
        subtitle: 'Zombie Apocalypse, Featured',
      },
    ],
  },

  'metro exodus': {
    title: 'Metro Exodus',
    subtitle: 'Post-Apocalyptic, Featured, Shooter',
    rank: 31,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/412020/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/412020/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/412020/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/412020/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/412020/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/412020/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/412020/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/412020/header.jpg',
    ],
    description:
      'Metro Exodus delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/412020/Metro_Exodus/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (59 800)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (227 240)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Post-Apocalyptic, Featured, Shooter',
      publisher: 'Deep Silver',
      developer: '4A Games',
      releaseDate: 'February 15, 2019',
      platform: 'PC (Windows, Steam), PS5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/412020/Metro_Exodus/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/412020/Metro_Exodus/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1643320/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2024,
        subtitle: 'Featured, Atmospheric Shooter',
      },
      {
        title: 'Atomic Heart',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/668580/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2023,
        subtitle: 'Alternate USSR, Biopunk',
      },
      {
        title: 'Fallout 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/377160/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2015,
        subtitle: 'Post-Apocalyptic, RPG',
      },
      {
        title: 'Dying Light',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/239140/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2015,
        subtitle: 'Parkour, First-Person Zombie Action',
      },
    ],
  },

  'diablo iv': {
    title: 'Diablo IV',
    subtitle: 'ARPG, Dark Fantasy, Featured, Looter',
    rank: 32,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2344520/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2344520/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256927226/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2344520/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2344520/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2344520/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2344520/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2344520/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/2344520/header.jpg',
    ],
    description:
      'S.T.A.L.K.E.R. 2: Heart of Chornobyl delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/2344520/Diablo_IV/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (58 470)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (222 186)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 87,
      },
    },
    details: {
      genres: 'ARPG, Dark Fantasy, Featured, Looter',
      publisher: 'Blizzard Entertainment',
      developer: 'Blizzard Entertainment',
      releaseDate: 'June 5, 2023',
      platform: 'PC (Battle.net, Steam), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/2344520/Diablo_IV/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/2344520/Diablo_IV/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Path of Exile',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/238960/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2013,
        subtitle: 'Hardcore ARPG, Featured',
      },
      {
        title: "Baldur's Gate 3",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2023,
        subtitle: 'CRPG, RPG',
      },
      {
        title: 'Dead Cells',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/588650/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2018,
        subtitle: 'Rogue-lite, Metroidvania',
      },
      {
        title: 'ELDEN RING',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'path of exile': {
    title: 'Path of Exile',
    subtitle: 'Hardcore ARPG, Featured, Seasons',
    rank: 33,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/238960/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238960/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238960/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238960/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238960/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238960/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/238960/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/238960/header.jpg',
    ],
    description:
      'Path of Exile delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/238960/Path_of_Exile/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (60 990)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (231 762)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Hardcore ARPG, Featured, Seasons',
      publisher: 'Grinding Gear Games',
      developer: 'Grinding Gear Games',
      releaseDate: 'October 23, 2013',
      platform: 'PC (Windows, Steam), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/238960/Path_of_Exile/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/238960/Path_of_Exile/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Diablo IV',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2344520/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2023,
        subtitle: 'ARPG, Dark Fantasy',
      },
      {
        title: "Baldur's Gate 3",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2023,
        subtitle: 'CRPG, RPG',
      },
      {
        title: 'Dark Souls III',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/374320/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2016,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Dead Cells',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/588650/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2018,
        subtitle: 'Rogue-lite, Metroidvania',
      },
    ],
  },

  'dark souls ii: scholar of the first sin': {
    title: 'Dark Souls II: Scholar of the First Sin',
    subtitle: 'Souls-like, Dark Fantasy, Hardcore, Featured',
    rank: 34,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/335300/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/335300/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256875461/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/335300/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/335300/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/335300/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/335300/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/335300/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/335300/header.jpg',
    ],
    description:
      'Diablo IV delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/335300/DARK_SOULS_II_Scholar_of_the_First_Sin/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (59 660)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (226 708)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 88,
      },
    },
    details: {
      genres: 'Souls-like, Dark Fantasy, Hardcore, Featured',
      publisher: 'Bandai Namco Entertainment',
      developer: 'FromSoftware',
      releaseDate: 'April 1, 2015',
      platform: 'PC (Windows, Steam), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/335300/DARK_SOULS_II_Scholar_of_the_First_Sin/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/335300/DARK_SOULS_II_Scholar_of_the_First_Sin/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Dark Souls III',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/374320/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2016,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'ELDEN RING',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Black Myth: Wukong',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2024,
        subtitle: 'Action-RPG, Mythology',
      },
      {
        title: 'Devil May Cry 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/601150/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'detroit: become human': {
    title: 'Detroit: Become Human',
    subtitle: 'Featured, Cyberpunk, Androids, Choice',
    rank: 35,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1222140/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222140/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/257081132/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222140/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222140/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222140/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222140/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222140/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1222140/header.jpg',
    ],
    description:
      'As fires fade and the world falls into ruin, journey into a universe filled with more colossal enemies and environments. Players will be immersed into a world of epic atmosphere and darkness through faster gameplay and amplified combat intensity.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1222140/Detroit_Become_Human/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (62 180)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (236 284)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 94,
      },
    },
    details: {
      genres: 'Featured, Cyberpunk, Androids, Choice',
      publisher: 'Quantic Dream',
      developer: 'Quantic Dream',
      releaseDate: 'June 18, 2020',
      platform: 'PC (Windows, Steam), PlayStation 4',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1222140/Detroit_Become_Human/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1222140/Detroit_Become_Human/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Cyberpunk 2077',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2020,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Alan Wake',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/108710/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2012,
        subtitle: 'Psychological Thriller, Featured',
      },
      {
        title: 'The Witcher 3: Wild Hunt',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Batman: Arkham Knight',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/208650/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2015,
        subtitle: 'Batman, Batmobile',
      },
    ],
  },

  'destiny 2': {
    title: 'Destiny 2',
    subtitle: 'Shooter, Raids, Space Opera',
    rank: 36,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg',
    ],
    description:
      'Cyberpunk 2077 is an open-world, action-adventure RPG set in Night City, a megalopolis obsessed with power, glamour, and body modification. Play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1085660/Destiny_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (59 800)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (227 240)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 86,
      },
    },
    details: {
      genres: 'Shooter, Raids, Space Opera',
      publisher: 'Bungie',
      developer: 'Bungie',
      releaseDate: 'October 1, 2019',
      platform: 'PC (Windows, Steam), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1085660/Destiny_2/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1085660/Destiny_2/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Warframe',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/230410/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2013,
        subtitle: 'Featured, Co-op Action',
      },
      {
        title: 'Halo: The Master Chief Collection',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/976730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2019,
        subtitle: 'Legendary Space Opera, Master Chief',
      },
      {
        title: 'Apex Legends',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2019,
        subtitle: 'Battle Royale, Hero Shooter',
      },
      {
        title: 'Borderlands 3',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/397540/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2020,
        subtitle: 'Mad Looter Shooter, Co-op',
      },
    ],
  },

  warframe: {
    title: 'Warframe',
    subtitle: 'Featured, Co-op Action, Looter',
    rank: 37,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/230410/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/230410/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/230410/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/230410/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/230410/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/230410/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/230410/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/230410/header.jpg',
    ],
    description:
      'Warframe delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/230410/Warframe/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (61 620)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (234 156)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 90,
      },
    },
    details: {
      genres: 'Featured, Co-op Action, Looter',
      publisher: 'Digital Extremes',
      developer: 'Digital Extremes',
      releaseDate: 'March 25, 2013',
      platform: 'PC (Windows, Steam), PlayStation, Xbox, Switch, iOS',
      socialLinks: {
        web: 'https://store.steampowered.com/app/230410/Warframe/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/230410/Warframe/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Destiny 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2019,
        subtitle: 'Shooter, Raids',
      },
      {
        title: 'THE FINALS',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2073850/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2023,
        subtitle: 'Dynamic Shooter, Featured',
      },
      {
        title: 'Titanfall 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1237970/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2020,
        subtitle: 'Featured, Parkour',
      },
      {
        title: 'Deep Rock Galactic',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/548430/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2020,
        subtitle: 'Featured',
      },
    ],
  },

  'halo: the master chief collection': {
    title: 'Halo: The Master Chief Collection',
    subtitle: 'Legendary Space Opera, Master Chief, FPS',
    rank: 38,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/976730/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/976730/header.jpg',
    ],
    description:
      'Destiny 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/976730/Halo_The_Master_Chief_Collection/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (63 090)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (239 742)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Legendary Space Opera, Master Chief, FPS',
      publisher: 'Xbox Game Studios',
      developer: '343 Industries, Bungie',
      releaseDate: 'December 3, 2019',
      platform: 'PC (Windows, Steam), Xbox Series X/S, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/976730/Halo_The_Master_Chief_Collection/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/976730/Halo_The_Master_Chief_Collection/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Destiny 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2019,
        subtitle: 'Shooter, Raids',
      },
      {
        title: 'Titanfall 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1237970/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2020,
        subtitle: 'Featured, Parkour',
      },
      {
        title: 'Battlefield 1',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238840/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2016,
        subtitle: 'World War I Battlefield, Featured',
      },
      {
        title: "Baldur's Gate 3",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2023,
        subtitle: 'CRPG, Adventure',
      },
    ],
  },

  'titanfall 2': {
    title: 'Titanfall 2',
    subtitle: 'Featured, Parkour, FPS',
    rank: 39,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1237970/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1237970/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1237970/header.jpg',
    ],
    description:
      'Destiny 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1237970/Titanfall_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (64 910)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (246 658)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Featured, Parkour, FPS',
      publisher: 'Electronic Arts',
      developer: 'Respawn Entertainment',
      releaseDate: 'June 18, 2020',
      platform: 'PC (Windows, Steam), PlayStation 4, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1237970/Titanfall_2/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1237970/Titanfall_2/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Apex Legends',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2019,
        subtitle: 'Battle Royale, Hero Shooter',
      },
      {
        title: 'Half-Life 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/220/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2004,
        subtitle: 'Gordon Freeman, Gravity Gun',
      },
      {
        title: 'THE FINALS',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2073850/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2023,
        subtitle: 'Dynamic Shooter, Featured',
      },
      {
        title: 'Destiny 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2019,
        subtitle: 'Shooter, Raids',
      },
    ],
  },

  'call of duty: modern warfare iii': {
    title: 'Call of Duty: Modern Warfare III',
    subtitle: 'Military Shooter, Multiplayer, Warzone, Special Operations',
    rank: 40,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2519060/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2519060/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2519060/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2519060/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2519060/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2519060/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2519060/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/2519060/header.jpg',
    ],
    description:
      'Apex Legends delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/2519060/Call_of_Duty_Modern_Warfare_III/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (60 080)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (228 304)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 82,
      },
    },
    details: {
      genres: 'Military Shooter, Multiplayer, Warzone, Special Operations',
      publisher: 'Activision',
      developer: 'Sledgehammer Games, Infinity Ward',
      releaseDate: 'November 10, 2023',
      platform: 'PC (Windows, Steam, Battle.net), PS5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/2519060/Call_of_Duty_Modern_Warfare_III/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/2519060/Call_of_Duty_Modern_Warfare_III/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Battlefield 1',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238840/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2016,
        subtitle: 'World War I Battlefield, Featured',
      },
      {
        title: 'Battlefield 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238860/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2013,
        subtitle: 'Featured',
      },
      {
        title: 'Delta Force',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2507950/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2024,
        subtitle: 'Shooter, Featured',
      },
      {
        title: 'Counter-Strike: Global Offensive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2012,
        subtitle: 'Tactical Shooter, Esports',
      },
    ],
  },

  'borderlands 3': {
    title: 'Borderlands 3',
    subtitle: 'Mad Looter Shooter, Co-op, Featured',
    rank: 41,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/397540/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/397540/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/397540/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/397540/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/397540/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/397540/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/397540/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/397540/header.jpg',
    ],
    description:
      'Battlefield 1 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/397540/Borderlands_3/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (62 600)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (237 880)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 88,
      },
    },
    details: {
      genres: 'Mad Looter Shooter, Co-op, Featured',
      publisher: '2K',
      developer: 'Gearbox Software',
      releaseDate: 'March 13, 2020',
      platform: 'PC (Windows, Steam), PlayStation, Xbox, Switch',
      socialLinks: {
        web: 'https://store.steampowered.com/app/397540/Borderlands_3/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/397540/Borderlands_3/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Destiny 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2019,
        subtitle: 'Shooter, Raids',
      },
      {
        title: 'Warframe',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/230410/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2013,
        subtitle: 'Featured, Co-op Action',
      },
      {
        title: 'Deep Rock Galactic',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/548430/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2020,
        subtitle: 'Featured',
      },
      {
        title: 'Cyberpunk 2077',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2020,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'batman: arkham knight': {
    title: 'Batman: Arkham Knight',
    subtitle: 'Batman, Batmobile, Gotham City, Mystery, Stealth',
    rank: 42,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/208650/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/208650/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/208650/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/208650/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/208650/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/208650/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/208650/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/208650/header.jpg',
    ],
    description:
      'Destiny 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/208650/Batman_Arkham_Knight/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (64 420)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (244 796)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Batman, Batmobile, Gotham City, Mystery, Stealth',
      publisher: 'Warner Bros. Games',
      developer: 'Rocksteady Studios',
      releaseDate: 'June 23, 2015',
      platform: 'PC (Windows, Steam), PlayStation 4, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/208650/Batman_Arkham_Knight/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/208650/Batman_Arkham_Knight/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Grand Theft Auto V',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Watch_Dogs 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/447040/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2016,
        subtitle: 'Hackers, Featured',
      },
      {
        title: "Assassin's Creed Odyssey",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/812140/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2018,
        subtitle: 'Featured, Mythology',
      },
      {
        title: 'Detroit: Become Human',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1222140/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2020,
        subtitle: 'Featured, Cyberpunk',
      },
    ],
  },

  'watch_dogs 2': {
    title: 'Watch_Dogs 2',
    subtitle: 'Hackers, Featured, Open World',
    rank: 43,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/447040/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/447040/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/447040/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/447040/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/447040/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/447040/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/447040/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/447040/header.jpg',
    ],
    description:
      'When a young street hustler, a retired bank robber, and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld and the U.S. government, they must pull off a series of dangerous heists.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/447040/Watch_Dogs_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (63 790)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (242 402)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 89,
      },
    },
    details: {
      genres: 'Hackers, Featured, Open World',
      publisher: 'Ubisoft',
      developer: 'Ubisoft Montreal',
      releaseDate: 'November 28, 2016',
      platform: 'PC (Windows, Steam), PlayStation 4, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/447040/Watch_Dogs_2/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/447040/Watch_Dogs_2/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Grand Theft Auto V',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Grand Theft Auto: San Andreas',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/12120/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2004,
        subtitle: 'Legendary Action, Open World',
      },
      {
        title: 'Cyberpunk 2077',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2020,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Batman: Arkham Knight',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/208650/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2015,
        subtitle: 'Batman, Batmobile',
      },
    ],
  },

  "assassin's creed odyssey": {
    title: "Assassin's Creed Odyssey",
    subtitle: 'Featured, Mythology, Parkour, RPG',
    rank: 44,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/812140/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/812140/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256875461/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/812140/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/812140/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/812140/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/812140/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/812140/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/812140/header.jpg',
    ],
    description:
      'When a young street hustler, a retired bank robber, and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld and the U.S. government, they must pull off a series of dangerous heists.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/812140/Assassins_Creed_Odyssey/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (64 560)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (245 328)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 90,
      },
    },
    details: {
      genres: 'Featured, Mythology, Parkour, RPG',
      publisher: 'Ubisoft',
      developer: 'Ubisoft Quebec',
      releaseDate: 'October 5, 2018',
      platform: 'PC (Windows, Steam), PlayStation 4, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/812140/Assassins_Creed_Odyssey/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/812140/Assassins_Creed_Odyssey/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'The Witcher 3: Wild Hunt',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'The Elder Scrolls V: Skyrim Special Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2016,
        subtitle: 'RPG, Open World',
      },
      {
        title: 'Black Myth: Wukong',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2024,
        subtitle: 'Action-RPG, Mythology',
      },
      {
        title: 'God of War',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Third-Person Action, Mythology',
      },
    ],
  },

  'genshin impact': {
    title: 'Genshin Impact',
    subtitle: 'Anime-RPG, Open World Teyvat, Featured, Gacha',
    rank: 45,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
      // You can insert links to your own screenshots here:
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
    ],
    description:
      'You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.',
    platformButton: {
      label: 'HoYoverse',
      type: 'web',
      url: 'https://genshin.hoyoverse.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Player Rating',
        count: 'Very Positive (65 680)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: 'Very Positive (249 584)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Anime-RPG, Open World Teyvat, Featured, Gacha',
      publisher: 'HoYoverse',
      developer: 'miHoYo / HoYoverse',
      releaseDate: 'September 28, 2020',
      platform: 'PC, PlayStation 5, PlayStation 4, iOS, Android',
      socialLinks: {
        web: 'https://genshin.hoyoverse.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'HoYoverse',
        url: 'https://genshin.hoyoverse.com/',
      },
    },
    similarItems: [
      {
        title: 'Honkai: Star Rail',
        posterUrl:
          'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2023,
        subtitle: 'Space Station, RPG',
      },
      {
        title: 'Zenless Zone Zero',
        posterUrl:
          'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2024,
        subtitle: 'Urban Fantasy, Featured',
      },
      {
        title: 'Wuthering Waves',
        posterUrl:
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2024,
        subtitle: 'Anime, Action-RPG',
      },
      {
        title: 'The Witcher 3: Wild Hunt',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'honkai: star rail': {
    title: 'Honkai: Star Rail',
    subtitle: 'Space Station, RPG, Anime, Gacha',
    rank: 46,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
      // You can insert links to your own screenshots here:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    ],
    description:
      'Honkai: Star Rail delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'HoYoverse',
      type: 'web',
      url: 'https://hsr.hoyoverse.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Player Rating',
        count: 'Very Positive (66 450)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: 'Very Positive (252 510)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Space Station, RPG, Anime, Gacha',
      publisher: 'HoYoverse',
      developer: 'miHoYo / HoYoverse',
      releaseDate: 'April 26, 2023',
      platform: 'PC, PlayStation 5, iOS, Android',
      socialLinks: {
        web: 'https://hsr.hoyoverse.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'HoYoverse',
        url: 'https://hsr.hoyoverse.com/',
      },
    },
    similarItems: [
      {
        title: 'Genshin Impact',
        posterUrl:
          'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2020,
        subtitle: 'Anime-RPG, Open World Teyvat',
      },
      {
        title: 'Zenless Zone Zero',
        posterUrl:
          'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2024,
        subtitle: 'Urban Fantasy, Featured',
      },
      {
        title: 'Wuthering Waves',
        posterUrl:
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2024,
        subtitle: 'Anime, Action-RPG',
      },
      {
        title: "Baldur's Gate 3",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2023,
        subtitle: 'CRPG, RPG',
      },
    ],
  },

  'zenless zone zero': {
    title: 'Zenless Zone Zero',
    subtitle: 'Urban Fantasy, Featured, Anime',
    rank: 47,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256728780/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
      // You can insert links to your own screenshots here:
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    ],
    description:
      'Genshin Impact delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'HoYoverse',
      type: 'web',
      url: 'https://zenless.hoyoverse.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Player Rating',
        count: 'Very Positive (66 170)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: 'Very Positive (251 446)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Urban Fantasy, Featured, Anime',
      publisher: 'HoYoverse',
      developer: 'miHoYo / HoYoverse',
      releaseDate: 'July 4, 2024',
      platform: 'PC, PlayStation 5, iOS, Android',
      socialLinks: {
        web: 'https://zenless.hoyoverse.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'HoYoverse',
        url: 'https://zenless.hoyoverse.com/',
      },
    },
    similarItems: [
      {
        title: 'Devil May Cry 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/601150/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Genshin Impact',
        posterUrl:
          'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2020,
        subtitle: 'Anime-RPG, Open World Teyvat',
      },
      {
        title: 'Honkai: Star Rail',
        posterUrl:
          'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2023,
        subtitle: 'Space Station, RPG',
      },
      {
        title: 'Wuthering Waves',
        posterUrl:
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2024,
        subtitle: 'Anime, Action-RPG',
      },
    ],
  },

  'wuthering waves': {
    title: 'Wuthering Waves',
    subtitle: 'Anime, Action-RPG, Parkour',
    rank: 48,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      // You can insert links to your own screenshots here:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    ],
    description:
      'The ultimate Devil Hunter returns in style, in the game action fans have been waiting for. A brand new entry in the legendary action series, directed by Hideaki Itsuno, featuring Nero, Dante, and the mysterious new protagonist V.',
    platformButton: {
      label: 'Official Website',
      type: 'web',
      url: 'https://wutheringwaves.kurogames.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (66 240)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (251 712)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 90,
      },
    },
    details: {
      genres: 'Anime, Action-RPG, Parkour',
      publisher: 'Kuro Games',
      developer: 'Kuro Games',
      releaseDate: 'May 22, 2024',
      platform: 'PC, iOS, Android',
      socialLinks: {
        web: 'https://wutheringwaves.kurogames.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://wutheringwaves.kurogames.com/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Genshin Impact',
        posterUrl:
          'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2020,
        subtitle: 'Anime-RPG, Open World Teyvat',
      },
      {
        title: 'Zenless Zone Zero',
        posterUrl:
          'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2024,
        subtitle: 'Urban Fantasy, Featured',
      },
      {
        title: 'Black Myth: Wukong',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2024,
        subtitle: 'Action-RPG, Mythology',
      },
      {
        title: 'Devil May Cry 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/601150/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'black desert': {
    title: 'Black Desert',
    subtitle: 'MMORPG, Featured, Open World',
    rank: 49,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/582660/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/582660/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/582660/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/582660/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/582660/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/582660/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/582660/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/582660/header.jpg',
    ],
    description:
      'Genshin Impact delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/582660/Black_Desert/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (64 910)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (246 658)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 85,
      },
    },
    details: {
      genres: 'MMORPG, Featured, Open World',
      publisher: 'Pearl Abyss',
      developer: 'Pearl Abyss',
      releaseDate: 'May 24, 2017',
      platform: 'PC (Windows, Steam), PlayStation, Xbox, Mobile',
      socialLinks: {
        web: 'https://store.steampowered.com/app/582660/Black_Desert/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/582660/Black_Desert/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'World of Warcraft',
        posterUrl:
          'https://cdn.discordapp.com/app-icons/356875762940379136/52a7ab86855bd1f28cb0871daecef1ee.webp?size=160&keep_aspect_ratio=true',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2004,
        subtitle: 'RPG, Azeroth',
      },
      {
        title: 'The Elder Scrolls Online',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/306130/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2014,
        subtitle: 'Featured, MMORPG',
      },
      {
        title: 'Albion Online',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/761890/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2017,
        subtitle: 'Hardcore Sandbox MMORPG, Featured',
      },
      {
        title: 'Crimson Desert',
        posterUrl:
          'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2025,
        subtitle: 'Action, Open World',
      },
    ],
  },

  'where winds meet': {
    title: 'Where Winds Meet',
    subtitle: 'Action, Featured, Martial Arts, RPG',
    rank: 50,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      // You can insert links to your own screenshots here:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    ],
    description:
      'World of Warcraft delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Official Website',
      type: 'web',
      url: 'https://www.wherewindsmeetgame.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (67 080)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (254 904)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 90,
      },
    },
    details: {
      genres: 'Action, Featured, Martial Arts, RPG',
      publisher: 'NetEase Games',
      developer: 'Everstone Studio',
      releaseDate: '2024',
      platform: 'PC (Windows)',
      socialLinks: {
        web: 'https://www.wherewindsmeetgame.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://www.wherewindsmeetgame.com/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Black Myth: Wukong',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2024,
        subtitle: 'Action-RPG, Mythology',
      },
      {
        title: 'NARAKA: BLADEPOINT',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1203220/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2021,
        subtitle: 'Martial Arts Battle Royale, Parkour',
      },
      {
        title: 'Crimson Desert',
        posterUrl:
          'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2025,
        subtitle: 'Action, Open World',
      },
      {
        title: "Assassin's Creed Odyssey",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/812140/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2018,
        subtitle: 'Featured, Mythology',
      },
    ],
  },

  'crimson desert': {
    title: 'Crimson Desert',
    subtitle: 'Action, Open World, Featured',
    rank: 51,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
      // You can insert links to your own screenshots here:
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    ],
    description:
      'Black Myth: Wukong delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Official Website',
      type: 'web',
      url: 'https://crimsondesert.pearlabyss.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (69 250)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (263 150)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 95,
      },
    },
    details: {
      genres: 'Action, Open World, Featured',
      publisher: 'Pearl Abyss',
      developer: 'Pearl Abyss',
      releaseDate: '2025',
      platform: 'PC (Windows, Steam), PlayStation 5, Xbox Series X/S',
      socialLinks: {
        web: 'https://crimsondesert.pearlabyss.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://crimsondesert.pearlabyss.com/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'The Witcher 3: Wild Hunt',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Black Desert',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/582660/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2017,
        subtitle: 'MMORPG, Featured',
      },
      {
        title: 'ELDEN RING',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Black Myth: Wukong',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2024,
        subtitle: 'Action-RPG, Mythology',
      },
    ],
  },

  'world of warcraft': {
    title: 'World of Warcraft',
    subtitle: 'RPG, Azeroth, Featured',
    rank: 52,
    miniPosterUrl:
      'https://cdn.discordapp.com/app-icons/356875762940379136/52a7ab86855bd1f28cb0871daecef1ee.webp?size=160&keep_aspect_ratio=true',
    bannerUrl:
      'https://cdn.discordapp.com/app-icons/356875762940379136/52a7ab86855bd1f28cb0871daecef1ee.webp?size=160&keep_aspect_ratio=true',
    videoUrl:
      'https://cdn.discordapp.com/app-assets/356875762940379136/store/1486743449570119751.mp4?size=3072',
    videoDuration: '1:30',
    videoThumbnail:
      'https://cdn.discordapp.com/app-icons/356875762940379136/52a7ab86855bd1f28cb0871daecef1ee.webp?size=160&keep_aspect_ratio=true',
    screenshots: [
      'https://bnetcmsus-a.akamaihd.net/cms/content_entry_media/8R2E1EOIUX771755622003460.png',
      // You can insert links to your own screenshots here:
      'https://bnetcmsus-a.akamaihd.net/cms/blog_header/n3/N3GH7HIQYZ6O1772140315297.png',
      'https://cdn.mos.cms.futurecdn.net/mXMvzzCjAEgBnFpY3k38iU.jpg',
      'https://bnetcmsus-a.akamaihd.net/cms/content_entry_media/38/38211M4C7MFB1756832277522.png',
      'https://gamingbolt.com/wp-content/uploads/2026/02/world-of-warcraft-midnight.jpg',
      'https://rus.egw.news/_next/image?url=https%3A%2F%2Fegw.news%2Fuploads%2Fnews%2F1%2F17%2F1774899152033_1774899152034.webp&w=1920&q=75',
    ],
    description:
      'You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.',
    platformButton: {
      label: 'Battle.net',
      type: 'battlenet',
      url: 'https://worldofwarcraft.blizzard.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Player Rating',
        count: 'Very Positive (69 320)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: 'Very Positive (263 416)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 94,
      },
    },
    details: {
      genres: 'RPG, Azeroth, Featured',
      publisher: 'Blizzard Entertainment',
      developer: 'Blizzard Entertainment',
      releaseDate: 'November 23, 2004',
      platform: 'PC (Windows, macOS)',
      socialLinks: {
        web: 'https://worldofwarcraft.blizzard.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Battle.net',
        url: 'https://worldofwarcraft.blizzard.com/',
      },
    },
    similarItems: [
      {
        title: 'The Elder Scrolls Online',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/306130/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2014,
        subtitle: 'Featured, MMORPG',
      },
      {
        title: 'Albion Online',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/761890/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2017,
        subtitle: 'Hardcore Sandbox MMORPG, Featured',
      },
      {
        title: 'Hearthstone',
        posterUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9IPTBhlbYOyh4Y-KUVX4mDzgrgIF5RuFFxLESjXlq0esm_d2T1AydZSoa&s=10',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2014,
        subtitle: 'Featured, Warcraft Universe',
      },
      {
        title: 'Black Desert',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/582660/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2017,
        subtitle: 'MMORPG, Featured',
      },
    ],
  },

  'the elder scrolls online': {
    title: 'The Elder Scrolls Online',
    subtitle: 'Featured, MMORPG',
    rank: 53,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/306130/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/306130/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/306130/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/306130/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/306130/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/306130/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/306130/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/306130/header.jpg',
    ],
    description:
      'The Elder Scrolls Online delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/306130/The_Elder_Scrolls_Online/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (67 290)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (255 702)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 87,
      },
    },
    details: {
      genres: 'Featured, MMORPG',
      publisher: 'Bethesda Softworks',
      developer: 'ZeniMax Online Studios',
      releaseDate: 'April 4, 2014',
      platform: 'PC (Windows, Steam), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/306130/The_Elder_Scrolls_Online/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/306130/The_Elder_Scrolls_Online/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'The Elder Scrolls V: Skyrim Special Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2016,
        subtitle: 'RPG, Open World',
      },
      {
        title: 'World of Warcraft',
        posterUrl:
          'https://cdn.discordapp.com/app-icons/356875762940379136/52a7ab86855bd1f28cb0871daecef1ee.webp?size=160&keep_aspect_ratio=true',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2004,
        subtitle: 'RPG, Azeroth',
      },
      {
        title: 'Albion Online',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/761890/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2017,
        subtitle: 'Hardcore Sandbox MMORPG, Featured',
      },
      {
        title: 'Black Desert',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/582660/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2017,
        subtitle: 'MMORPG, Featured',
      },
    ],
  },

  'albion online': {
    title: 'Albion Online',
    subtitle: 'Hardcore Sandbox MMORPG, Featured, Economy',
    rank: 54,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/761890/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/761890/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/761890/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/761890/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/761890/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/761890/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/761890/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/761890/header.jpg',
    ],
    description:
      'The Elder Scrolls V: Skyrim Special Edition delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/761890/Albion_Online/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (67 360)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (255 968)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 86,
      },
    },
    details: {
      genres: 'Hardcore Sandbox MMORPG, Featured, Economy',
      publisher: 'Sandbox Interactive GmbH',
      developer: 'Sandbox Interactive GmbH',
      releaseDate: 'July 17, 2017',
      platform: 'PC (Windows, Steam, Linux), iOS, Android',
      socialLinks: {
        web: 'https://store.steampowered.com/app/761890/Albion_Online/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/761890/Albion_Online/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'World of Warcraft',
        posterUrl:
          'https://cdn.discordapp.com/app-icons/356875762940379136/52a7ab86855bd1f28cb0871daecef1ee.webp?size=160&keep_aspect_ratio=true',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2004,
        subtitle: 'RPG, Azeroth',
      },
      {
        title: 'The Elder Scrolls Online',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/306130/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2014,
        subtitle: 'Featured, MMORPG',
      },
      {
        title: 'Rust',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2018,
        subtitle: 'Relentless Survival, Base Raids',
      },
      {
        title: 'Escape from Tarkov',
        posterUrl:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2017,
        subtitle: 'Hardcore Realistic Extraction Shooter, Raids',
      },
    ],
  },

  hearthstone: {
    title: 'Hearthstone',
    subtitle: 'Featured, Warcraft Universe, Strategy',
    rank: 55,
    miniPosterUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9IPTBhlbYOyh4Y-KUVX4mDzgrgIF5RuFFxLESjXlq0esm_d2T1AydZSoa&s=10',
    bannerUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS13NATWJdAAXWX5jJ6yZBnQf2l2PzDLukbT-aBbgb-luXZHGJbAtL2hcG5&s=10',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256692021/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9IPTBhlbYOyh4Y-KUVX4mDzgrgIF5RuFFxLESjXlq0esm_d2T1AydZSoa&s=10',
    screenshots: [
      'https://i.pinimg.com/originals/a6/89/64/a68964ff00b6a2d860c6a2e15942ebb9.gif',
      // You can insert links to your own screenshots here:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS13NATWJdAAXWX5jJ6yZBnQf2l2PzDLukbT-aBbgb-luXZHGJbAtL2hcG5&s=10',
      'https://bnetcmsus-a.akamaihd.net/cms/blog_header/6h/6HFAF7MPYZHI1770401499024.jpg',
      'https://play-lh.googleusercontent.com/BOVBDdLyi8m_UyC25-awBFQAfNnNTrJOTLmo15JBkQOQILatviRmlEm6DKyi2k92VPMa8no7E3RmrwOwfb8e=w526-h296-rw',
      'https://gfn.am/en/games/media/images/screen_mLbWtdI.2e16d0ba.fill-992x558.format-webp.webpquality-50.webp',
    ],
    description:
      'World of Warcraft delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Battle.net',
      type: 'battlenet',
      url: 'https://hearthstone.blizzard.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Player Rating',
        count: 'Very Positive (68 480)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: 'Very Positive (260 224)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 88,
      },
    },
    details: {
      genres: 'Featured, Warcraft Universe, Strategy',
      publisher: 'Blizzard Entertainment',
      developer: 'Blizzard Entertainment',
      releaseDate: 'March 11, 2014',
      platform: 'PC (Windows, macOS), iOS, Android',
      socialLinks: {
        web: 'https://hearthstone.blizzard.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Battle.net',
        url: 'https://hearthstone.blizzard.com/',
      },
    },
    similarItems: [
      {
        title: 'World of Warcraft',
        posterUrl:
          'https://cdn.discordapp.com/app-icons/356875762940379136/52a7ab86855bd1f28cb0871daecef1ee.webp?size=160&keep_aspect_ratio=true',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2004,
        subtitle: 'RPG, Azeroth',
      },
      {
        title: 'Dota 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2013,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Bloons TD 6',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/960090/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2018,
        subtitle: 'Tower Defense, Featured',
      },
      {
        title: 'Plants vs. Zombies GOTY Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/3590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2009,
        subtitle: 'Featured',
      },
    ],
  },

  'world of tanks': {
    title: 'World of Tanks',
    subtitle: 'Simulator, Armored Vehicles, Tactics',
    rank: 56,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1407200/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1407200/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1407200/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1407200/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1407200/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1407200/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1407200/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1407200/header.jpg',
    ],
    description:
      'World of Warcraft delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1407200/World_of_Tanks/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (68 200)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (259 160)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 86,
      },
    },
    details: {
      genres: 'Simulator, Armored Vehicles, Tactics',
      publisher: 'Wargaming Group Limited',
      developer: 'Wargaming Group Limited',
      releaseDate: 'August 12, 2010',
      platform: 'PC (Windows, Steam, Wargaming.net)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1407200/World_of_Tanks/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1407200/World_of_Tanks/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'War Thunder',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/236390/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2013,
        subtitle: 'Military Tank Simulator, Featured',
      },
      {
        title: 'Arma 3',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/107410/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2013,
        subtitle: 'Simulator, Realism',
      },
      {
        title: 'Battlefield 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238860/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2013,
        subtitle: 'Featured',
      },
      {
        title: 'Battlefield 1',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238840/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2016,
        subtitle: 'World War I Battlefield, Featured',
      },
    ],
  },

  'war thunder': {
    title: 'War Thunder',
    subtitle: 'Military Tank Simulator, Featured, Realism',
    rank: 57,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/236390/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/236390/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/236390/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/236390/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/236390/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/236390/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/236390/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/236390/header.jpg',
    ],
    description:
      'War Thunder delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/236390/War_Thunder/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (69 670)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (264 746)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 89,
      },
    },
    details: {
      genres: 'Military Tank Simulator, Featured, Realism',
      publisher: 'Gaijin Network Ltd',
      developer: 'Gaijin Network Ltd',
      releaseDate: 'August 15, 2013',
      platform: 'PC (Windows, Steam, Linux), PS5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/236390/War_Thunder/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/236390/War_Thunder/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'World of Tanks',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1407200/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2010,
        subtitle: 'Simulator, Armored Vehicles',
      },
      {
        title: 'Arma 3',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/107410/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2013,
        subtitle: 'Simulator, Realism',
      },
      {
        title: 'Battlefield 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238860/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2013,
        subtitle: 'Featured',
      },
      {
        title: 'iRacing',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/266410/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2015,
        subtitle: 'Sports, iRating System',
      },
    ],
  },

  trove: {
    title: 'Trove',
    subtitle: 'Featured, Sandbox, Dungeons',
    rank: 58,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/304050/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304050/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304050/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304050/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304050/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304050/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304050/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/304050/header.jpg',
    ],
    description:
      'World of Tanks delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/304050/Trove/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (67 290)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (255 702)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 81,
      },
    },
    details: {
      genres: 'Featured, Sandbox, Dungeons',
      publisher: 'gamigo US Inc.',
      developer: 'gamigo US Inc.',
      releaseDate: 'July 9, 2015',
      platform: 'PC (Windows, Steam), PlayStation, Xbox, Switch',
      socialLinks: {
        web: 'https://store.steampowered.com/app/304050/Trove/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/304050/Trove/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Minecraft',
        posterUrl: 'https://i.ebayimg.com/images/g/Y9IAAOSwM2ddrpX2/s-l1200.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: 'Featured, Survival',
      },
      {
        title: 'Terraria',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: '2D Sandbox, Adventure',
      },
      {
        title: 'ROBLOX',
        posterUrl: 'https://www.artsyfartsy.eu/cdn/shop/files/17026.jpg?v=1760384946&width=320',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2006,
        subtitle: 'Featured',
      },
      {
        title: 'Albion Online',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/761890/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2017,
        subtitle: 'Hardcore Sandbox MMORPG, Featured',
      },
    ],
  },

  vrchat: {
    title: 'VRChat',
    subtitle: 'Featured, VR, Avatars',
    rank: 59,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/438100/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/438100/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/438100/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/438100/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/438100/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/438100/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/438100/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/438100/header.jpg',
    ],
    description:
      'Minecraft delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/438100/VRChat/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (71 210)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (270 598)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Featured, VR, Avatars',
      publisher: 'VRChat Inc.',
      developer: 'VRChat Inc.',
      releaseDate: 'February 1, 2017',
      platform: 'PC (Windows, Steam, VR Headsets, Quest, Android)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/438100/VRChat/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/438100/VRChat/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'ROBLOX',
        posterUrl: 'https://www.artsyfartsy.eu/cdn/shop/files/17026.jpg?v=1760384946&width=320',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2006,
        subtitle: 'Featured',
      },
      {
        title: "Garry's Mod",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/4000/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2006,
        subtitle: 'Sandbox, Source Engine',
      },
      {
        title: 'Among Us',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/945360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2018,
        subtitle: 'Featured',
      },
      {
        title: 'Fall Guys',
        posterUrl:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2020,
        subtitle: 'RPG',
      },
    ],
  },

  roblox: {
    title: 'ROBLOX',
    subtitle: 'Featured, Sandbox',
    rank: 60,
    miniPosterUrl: 'https://www.artsyfartsy.eu/cdn/shop/files/17026.jpg?v=1760384946&width=320',
    bannerUrl:
      'https://images.unsplash.com/photo-1612287233207-6f81c967520e?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://www.artsyfartsy.eu/cdn/shop/files/17026.jpg?v=1760384946&width=320',
    screenshots: [
      'https://media.wired.com/photos/611e8c4c616d2959940414e8/3:2/w_2560%2Cc_limit/Games-Roblox-Exploitation.jpg',
      // You can insert links to your own screenshots here:
      'https://www.classificationoffice.govt.nz/media/images/content_on_Roblox_1444x672.width-1440.png',
      'https://media.wired.com/photos/604be13a1d09b7f18fe49d6c/4:3/w_1440,h_1080,c_limit/Gear-Roblox-jailbreak_1920x1080.jpg',
      'https://static.wixstatic.com/media/0a4a01_a0e84b3fa2004f86a1a44decb9cb6462~mv2.webp/v1/fill/w_568,h_320,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0a4a01_a0e84b3fa2004f86a1a44decb9cb6462~mv2.webp',
      'https://www.exitlag.com/blog/wp-content/uploads/2024/12/How-to-Update-Roblox.webp',
    ],
    description:
      'ROBLOX delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Roblox Client',
      type: 'roblox',
      url: 'https://www.roblox.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Player Rating',
        count: 'Very Positive (69 530)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: 'Very Positive (264 214)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 85,
      },
    },
    details: {
      genres: 'Featured, Sandbox',
      publisher: 'Roblox Corporation',
      developer: 'Roblox Corporation',
      releaseDate: 'September 1, 2006',
      platform: 'PC, PlayStation, Xbox, iOS, Android, Meta Quest',
      socialLinks: {
        web: 'https://www.roblox.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Roblox',
        url: 'https://www.roblox.com/',
      },
    },
    similarItems: [
      {
        title: 'Minecraft',
        posterUrl: 'https://i.ebayimg.com/images/g/Y9IAAOSwM2ddrpX2/s-l1200.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: 'Featured, Survival',
      },
      {
        title: 'VRChat',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/438100/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2017,
        subtitle: 'Featured',
      },
      {
        title: "Garry's Mod",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/4000/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2006,
        subtitle: 'Sandbox, Source Engine',
      },
      {
        title: 'Fortnite',
        posterUrl: 'https://i.ebayimg.com/images/g/rKYAAOSwqY5fhrmq/s-l1200.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2017,
        subtitle: 'Battle Royale, Building',
      },
    ],
  },

  "garry's mod": {
    title: "Garry's Mod",
    subtitle: 'Sandbox, Source Engine, Modding',
    rank: 61,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/4000/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4000/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4000/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4000/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4000/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4000/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4000/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/4000/header.jpg',
    ],
    description:
      'Minecraft delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/4000/Garrys_Mod/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (74 500)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (283 100)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 98,
      },
    },
    details: {
      genres: 'Sandbox, Source Engine, Modding',
      publisher: 'Valve',
      developer: 'Facepunch Studios',
      releaseDate: 'November 29, 2006',
      platform: 'PC (Windows, Steam, Linux)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/4000/Garrys_Mod/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/4000/Garrys_Mod/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Half-Life 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/220/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2004,
        subtitle: 'Gordon Freeman, Gravity Gun',
      },
      {
        title: 'Team Fortress 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2007,
        subtitle: 'Cult Classic Team Shooter, Featured',
      },
      {
        title: 'Rust',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2018,
        subtitle: 'Relentless Survival, Base Raids',
      },
      {
        title: 'ROBLOX',
        posterUrl: 'https://www.artsyfartsy.eu/cdn/shop/files/17026.jpg?v=1760384946&width=320',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2006,
        subtitle: 'Featured',
      },
    ],
  },

  minecraft: {
    title: 'Minecraft',
    subtitle: 'Sandbox, Survival, Open World, Featured, Voxel Blocks',
    rank: 1,
    miniPosterUrl: 'https://content1.rozetka.com.ua/goods/images/big/30144346.jpg',
    bannerUrl:
      'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=1200&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail: 'https://content1.rozetka.com.ua/goods/images/big/30144346.jpg',
    screenshots: [
      'https://i.pinimg.com/originals/6e/85/f7/6e85f7e0111ac569249afb790efff78f.gif',
      // You can insert links to your own screenshots here:
      'https://i.pinimg.com/originals/20/e2/65/20e265360d6142294ce17dcc3929d9e9.gif',
      'https://i.pinimg.com/originals/f7/19/65/f71965732082901a89adedcde2051bd7.gif',
      'https://cdn.modrinth.com/data/BozC53Fy/images/67d9442a3057a09392f9f8e84ded92c883483410.png',
      'https://media.forgecdn.net/attachments/1557/403/dark-ui-png.png',
      'https://static.fandomspot.com/images/05/6498/00-featured-smart-hud-mod-minecraft.jpg',
    ],
    description:
      'Half-Life 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Minecraft.net',
      type: 'minecraft',
      url: 'https://www.minecraft.net/',
    },
    reviews: {
      recentReviews: {
        label: 'Critic Score',
        count: '93 / 100 (Metacritic)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: 'Overwhelmingly Positive (300+ million players)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 98,
      },
    },
    details: {
      genres: 'Sandbox, Survival, Adventure, Featured',
      publisher: 'Xbox Game Studios / Mojang',
      developer: 'Mojang Studios',
      releaseDate: 'November 18, 2011',
      platform: 'PC (Windows, macOS, Linux), Consoles, iOS, Android',
      socialLinks: {
        web: 'https://www.minecraft.net/',
        twitter: 'https://twitter.com/Minecraft',
        youtube: 'https://youtube.com/minecraft',
        reddit: 'https://reddit.com/r/Minecraft',
        twitch: 'https://twitch.tv/directory/game/Minecraft',
      },
      metadataSource: {
        name: 'Mojang Studios',
        url: 'https://www.minecraft.net/',
      },
    },
    similarItems: [
      {
        title: 'Terraria',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: '2D Sandbox, Adventure',
      },
      {
        title: 'Stardew Valley',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2016,
        subtitle: 'Simulator, Featured',
      },
      {
        title: 'Rust',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2018,
        subtitle: 'Relentless Survival, Base Raids',
      },
      {
        title: 'ROBLOX',
        posterUrl: 'https://www.artsyfartsy.eu/cdn/shop/files/17026.jpg?v=1760384946&width=320',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2006,
        subtitle: 'Featured',
      },
    ],
  },

  terraria: {
    title: 'Terraria',
    subtitle: '2D Sandbox, Adventure, Bosses, Featured, Pixel Art',
    rank: 63,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/105600/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg',
    ],
    description:
      'Terraria delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/105600/Terraria/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (75 340)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (286 292)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 98,
      },
    },
    details: {
      genres: '2D Sandbox, Adventure, Bosses, Featured, Pixel Art',
      publisher: 'Re-Logic, 505 Games',
      developer: 'Re-Logic',
      releaseDate: 'May 16, 2011',
      platform: 'PC (Windows, Steam), Consoles, Mobile',
      socialLinks: {
        web: 'https://store.steampowered.com/app/105600/Terraria/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/105600/Terraria/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Minecraft',
        posterUrl: 'https://i.ebayimg.com/images/g/Y9IAAOSwM2ddrpX2/s-l1200.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: 'Featured, Survival',
      },
      {
        title: 'Stardew Valley',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2016,
        subtitle: 'Simulator, Featured',
      },
      {
        title: "Don't Starve Together",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/322330/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2016,
        subtitle: 'Survival, Featured',
      },
      {
        title: 'Dead Cells',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/588650/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2018,
        subtitle: 'Rogue-lite, Metroidvania',
      },
    ],
  },

  'stardew valley': {
    title: 'Stardew Valley',
    subtitle: 'Simulator, Featured',
    rank: 64,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg',
    ],
    description:
      'Minecraft delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/413150/Stardew_Valley/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (76 110)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (289 218)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 99,
      },
    },
    details: {
      genres: 'Simulator, Featured',
      publisher: 'ConcernedApe',
      developer: 'ConcernedApe',
      releaseDate: 'February 26, 2016',
      platform: 'PC (Windows, Steam), Consoles, Mobile',
      socialLinks: {
        web: 'https://store.steampowered.com/app/413150/Stardew_Valley/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/413150/Stardew_Valley/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Terraria',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: '2D Sandbox, Adventure',
      },
      {
        title: 'Minecraft',
        posterUrl: 'https://i.ebayimg.com/images/g/Y9IAAOSwM2ddrpX2/s-l1200.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: 'Featured, Survival',
      },
      {
        title: 'The Sims 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1222670/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2014,
        subtitle: 'Life Simulator, Home Building',
      },
      {
        title: "Don't Starve Together",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/322330/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2016,
        subtitle: 'Survival, Featured',
      },
    ],
  },

  rust: {
    title: 'Rust',
    subtitle: 'Relentless Survival, Base Raids, PvP, Open World',
    rank: 65,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252490/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252490/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252490/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252490/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252490/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252490/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg',
    ],
    description:
      'Terraria delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/252490/Rust/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (72 330)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (274 854)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 87,
      },
    },
    details: {
      genres: 'Relentless Survival, Base Raids, PvP, Open World',
      publisher: 'Facepunch Studios',
      developer: 'Facepunch Studios',
      releaseDate: 'February 8, 2018',
      platform: 'PC (Windows, Steam), PlayStation 4, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/252490/Rust/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/252490/Rust/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'DayZ',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/221100/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2018,
        subtitle: 'Zombie Apocalypse, Featured',
      },
      {
        title: 'Escape from Tarkov',
        posterUrl:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2017,
        subtitle: 'Hardcore Realistic Extraction Shooter, Raids',
      },
      {
        title: 'ARK: Survival Evolved',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/346110/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2017,
        subtitle: 'Featured',
      },
      {
        title: '7 Days to Die',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/251570/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2013,
        subtitle: 'Survival, Featured',
      },
    ],
  },

  dayz: {
    title: 'DayZ',
    subtitle: 'Zombie Apocalypse, Featured, Hardcore Simulator',
    rank: 66,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/221100/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/221100/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/221100/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/221100/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/221100/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/221100/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/221100/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/221100/header.jpg',
    ],
    description:
      'DayZ delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/221100/DayZ/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (72 050)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (273 790)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 85,
      },
    },
    details: {
      genres: 'Zombie Apocalypse, Featured, Hardcore Simulator',
      publisher: 'Bohemia Interactive',
      developer: 'Bohemia Interactive',
      releaseDate: 'December 13, 2018',
      platform: 'PC (Windows, Steam), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/221100/DayZ/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/221100/DayZ/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Rust',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2018,
        subtitle: 'Relentless Survival, Base Raids',
      },
      {
        title: 'Escape from Tarkov',
        posterUrl:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2017,
        subtitle: 'Hardcore Realistic Extraction Shooter, Raids',
      },
      {
        title: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1643320/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2024,
        subtitle: 'Featured, Atmospheric Shooter',
      },
      {
        title: 'Project Zomboid',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/108600/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2013,
        subtitle: 'Survival',
      },
    ],
  },

  'escape from tarkov': {
    title: 'Escape from Tarkov',
    subtitle: 'Hardcore Realistic Extraction Shooter, Raids',
    rank: 67,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      // You can insert links to your own screenshots here:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    ],
    description:
      'Rust delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Battlestate Games',
      type: 'web',
      url: 'https://www.escapefromtarkov.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Player Rating',
        count: 'Very Positive (74 570)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Community Score',
        language: 'English',
        count: 'Very Positive (283 366)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Hardcore Realistic Extraction Shooter, Raids',
      publisher: 'Battlestate Games',
      developer: 'Battlestate Games',
      releaseDate: 'July 28, 2017 (Beta)',
      platform: 'PC (Windows)',
      socialLinks: {
        web: 'https://www.escapefromtarkov.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Battlestate Games',
        url: 'https://www.escapefromtarkov.com/',
      },
    },
    similarItems: [
      {
        title: 'DayZ',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/221100/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2018,
        subtitle: 'Zombie Apocalypse, Featured',
      },
      {
        title: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1643320/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2024,
        subtitle: 'Featured, Atmospheric Shooter',
      },
      {
        title: 'Rust',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2018,
        subtitle: 'Relentless Survival, Base Raids',
      },
      {
        title: 'Delta Force',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2507950/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2024,
        subtitle: 'Shooter, Featured',
      },
    ],
  },

  valheim: {
    title: 'Valheim',
    subtitle: 'Survival, Vikings, Bosses, Building',
    rank: 68,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/892970/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/892970/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/892970/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/892970/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/892970/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/892970/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/892970/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/892970/header.jpg',
    ],
    description:
      'DayZ delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/892970/Valheim/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (76 390)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (290 282)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 95,
      },
    },
    details: {
      genres: 'Survival, Vikings, Bosses, Building',
      publisher: 'Coffee Stain Publishing',
      developer: 'Iron Gate AB',
      releaseDate: 'February 2, 2021',
      platform: 'PC (Windows, Steam, Linux), Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/892970/Valheim/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/892970/Valheim/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Rust',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2018,
        subtitle: 'Relentless Survival, Base Raids',
      },
      {
        title: 'The Forest',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/242760/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2018,
        subtitle: 'Featured, Mutant Cannibals',
      },
      {
        title: 'Palworld',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1623730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2024,
        subtitle: 'Survival with Pals, Featured',
      },
      {
        title: 'Minecraft',
        posterUrl: 'https://i.ebayimg.com/images/g/Y9IAAOSwM2ddrpX2/s-l1200.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: 'Featured, Survival',
      },
    ],
  },

  palworld: {
    title: 'Palworld',
    subtitle: 'Survival with Pals, Featured, Base Automation',
    rank: 69,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1623730/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1623730/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1623730/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1623730/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1623730/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1623730/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1623730/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1623730/header.jpg',
    ],
    description:
      'Rust delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1623730/Palworld/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (76 110)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (289 218)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Survival with Pals, Featured, Base Automation',
      publisher: 'Pocketpair',
      developer: 'Pocketpair',
      releaseDate: 'January 19, 2024',
      platform: 'PC (Windows, Steam), PlayStation 5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1623730/Palworld/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1623730/Palworld/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Valheim',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/892970/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2021,
        subtitle: 'Survival, Vikings',
      },
      {
        title: 'Rust',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2018,
        subtitle: 'Relentless Survival, Base Raids',
      },
      {
        title: 'ARK: Survival Evolved',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/346110/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2017,
        subtitle: 'Featured',
      },
      {
        title: 'Genshin Impact',
        posterUrl:
          'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2020,
        subtitle: 'Anime-RPG, Open World Teyvat',
      },
    ],
  },

  'lethal company': {
    title: 'Lethal Company',
    subtitle: 'Co-op Space Horror, Featured',
    rank: 70,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1966720/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1966720/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1966720/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1966720/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1966720/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1966720/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1966720/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1966720/header.jpg',
    ],
    description:
      'Valheim delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1966720/Lethal_Company/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (78 280)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (297 464)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 98,
      },
    },
    details: {
      genres: 'Co-op Space Horror, Featured',
      publisher: 'Zeekerss',
      developer: 'Zeekerss',
      releaseDate: 'October 24, 2023',
      platform: 'PC (Windows, Steam)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1966720/Lethal_Company/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1966720/Lethal_Company/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Phasmophobia',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/739630/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2020,
        subtitle: 'Ghost Hunting, Psychological Horror',
      },
      {
        title: 'R.E.P.O.',
        posterUrl:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2025,
        subtitle: 'Tactical Co-op Stealth Horror, Featured',
      },
      {
        title: 'Chained Together',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2567870/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2024,
        subtitle: 'Co-op Platformer, Featured',
      },
      {
        title: 'Among Us',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/945360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2018,
        subtitle: 'Featured',
      },
    ],
  },

  'chained together': {
    title: 'Chained Together',
    subtitle: 'Co-op Platformer, Featured, Physics',
    rank: 71,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2567870/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2567870/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2567870/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2567870/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2567870/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2567870/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2567870/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/2567870/header.jpg',
    ],
    description:
      'Phasmophobia delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/2567870/Chained_Together/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (75 900)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (288 420)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 90,
      },
    },
    details: {
      genres: 'Co-op Platformer, Featured, Physics',
      publisher: 'Anegar Games',
      developer: 'Anegar Games',
      releaseDate: 'June 19, 2024',
      platform: 'PC (Windows, Steam)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/2567870/Chained_Together/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/2567870/Chained_Together/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Lethal Company',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1966720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2023,
        subtitle: 'Co-op Space Horror, Featured',
      },
      {
        title: 'Fall Guys',
        posterUrl:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2020,
        subtitle: 'RPG',
      },
      {
        title: 'Stumble Guys',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1677740/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
      {
        title: 'Portal 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2011,
        subtitle: 'Puzzle of the Century, Featured',
      },
    ],
  },

  phasmophobia: {
    title: 'Phasmophobia',
    subtitle: 'Ghost Hunting, Psychological Horror, Voice',
    rank: 72,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/739630/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/739630/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/739630/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/739630/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/739630/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/739630/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/739630/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/739630/header.jpg',
    ],
    description:
      'Lethal Company delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/739630/Phasmophobia/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (78 420)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (297 996)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 96,
      },
    },
    details: {
      genres: 'Ghost Hunting, Psychological Horror, Voice',
      publisher: 'Kinetic Games',
      developer: 'Kinetic Games',
      releaseDate: 'September 18, 2020',
      platform: 'PC (Windows, Steam, VR), PS5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/739630/Phasmophobia/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/739630/Phasmophobia/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Dead by Daylight',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/381210/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2016,
        subtitle: 'Asymmetric 4v1 Horror, Featured',
      },
      {
        title: 'Lethal Company',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1966720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2023,
        subtitle: 'Co-op Space Horror, Featured',
      },
      {
        title: 'Alan Wake',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/108710/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2012,
        subtitle: 'Psychological Thriller, Featured',
      },
      {
        title: 'Resident Evil 7 Biohazard',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/418370/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2017,
        subtitle: 'Featured, Baker Family in Louisiana',
      },
    ],
  },

  'dead by daylight': {
    title: 'Dead by Daylight',
    subtitle: 'Asymmetric 4v1 Horror, Featured',
    rank: 73,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/381210/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/381210/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/381210/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/381210/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/381210/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/381210/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/381210/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/381210/header.jpg',
    ],
    description:
      'Dead by Daylight delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/381210/Dead_by_Daylight/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (76 040)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (288 952)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 88,
      },
    },
    details: {
      genres: 'Asymmetric 4v1 Horror, Featured',
      publisher: 'Behaviour Interactive Inc.',
      developer: 'Behaviour Interactive Inc.',
      releaseDate: 'June 14, 2016',
      platform: 'PC (Windows, Steam), PlayStation, Xbox, Switch',
      socialLinks: {
        web: 'https://store.steampowered.com/app/381210/Dead_by_Daylight/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/381210/Dead_by_Daylight/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Phasmophobia',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/739630/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2020,
        subtitle: 'Ghost Hunting, Psychological Horror',
      },
      {
        title: 'Dying Light',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/239140/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2015,
        subtitle: 'Parkour, First-Person Zombie Action',
      },
      {
        title: 'Left 4 Dead 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/550/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2009,
        subtitle: 'Shooter, Featured',
      },
      {
        title: 'Resident Evil 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2023,
        subtitle: 'Masterpiece survival-horror, Featured',
      },
    ],
  },

  'deep rock galactic': {
    title: 'Deep Rock Galactic',
    subtitle: 'Featured, Co-op',
    rank: 74,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/548430/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/548430/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/257081132/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/548430/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/548430/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/548430/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/548430/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/548430/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/548430/header.jpg',
    ],
    description:
      'Phasmophobia delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/548430/Deep_Rock_Galactic/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (79 610)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (302 518)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Featured, Co-op',
      publisher: 'Coffee Stain Publishing',
      developer: 'Ghost Ship Games',
      releaseDate: 'May 13, 2020',
      platform: 'PC (Windows, Steam), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/548430/Deep_Rock_Galactic/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/548430/Deep_Rock_Galactic/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Left 4 Dead 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/550/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2009,
        subtitle: 'Shooter, Featured',
      },
      {
        title: 'Warhammer 40,000: Space Marine 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2183900/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2024,
        subtitle: 'Shooter, Co-op',
      },
      {
        title: 'Borderlands 3',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/397540/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2020,
        subtitle: 'Mad Looter Shooter, Co-op',
      },
      {
        title: "Baldur's Gate 3",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2023,
        subtitle: 'CRPG, Adventure',
      },
    ],
  },

  'sea of thieves': {
    title: 'Sea of Thieves',
    subtitle: 'Adventure, Naval Combat, Treasure Hunting',
    rank: 75,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1172620/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172620/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172620/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172620/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172620/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172620/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172620/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1172620/header.jpg',
    ],
    description:
      'Left 4 Dead 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1172620/Sea_of_Thieves/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (77 580)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (294 804)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 90,
      },
    },
    details: {
      genres: 'Adventure, Naval Combat, Treasure Hunting',
      publisher: 'Xbox Game Studios',
      developer: 'Rare Ltd',
      releaseDate: 'June 3, 2020',
      platform: 'PC (Windows, Steam), PlayStation 5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1172620/Sea_of_Thieves/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1172620/Sea_of_Thieves/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Raft',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/648800/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2022,
        subtitle: 'Oceanic Survival, Featured',
      },
      {
        title: 'Valheim',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/892970/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2021,
        subtitle: 'Survival, Vikings',
      },
      {
        title: 'Rust',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2018,
        subtitle: 'Relentless Survival, Base Raids',
      },
      {
        title: 'Subnautica',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/264710/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2018,
        subtitle: 'Underwater, Featured',
      },
    ],
  },

  'project zomboid': {
    title: 'Project Zomboid',
    subtitle: 'Survival',
    rank: 76,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/108600/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/108600/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/108600/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/108600/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/108600/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/108600/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/108600/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/108600/header.jpg',
    ],
    description:
      'Raft delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/108600/Project_Zomboid/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (79 400)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (301 720)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 94,
      },
    },
    details: {
      genres: 'Survival',
      publisher: 'The Indie Stone',
      developer: 'The Indie Stone',
      releaseDate: 'November 8, 2013',
      platform: 'PC (Windows, Steam, Linux)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/108600/Project_Zomboid/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/108600/Project_Zomboid/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'DayZ',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/221100/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2018,
        subtitle: 'Zombie Apocalypse, Featured',
      },
      {
        title: '7 Days to Die',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/251570/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2013,
        subtitle: 'Survival, Featured',
      },
      {
        title: "Don't Starve Together",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/322330/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2016,
        subtitle: 'Survival, Featured',
      },
      {
        title: 'RimWorld',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/294100/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2018,
        subtitle: 'Story Generator, Galactic Colony',
      },
    ],
  },

  'the forest': {
    title: 'The Forest',
    subtitle: 'Featured, Mutant Cannibals, Building',
    rank: 77,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/242760/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/242760/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/242760/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/242760/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/242760/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/242760/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/242760/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/242760/header.jpg',
    ],
    description:
      'DayZ delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/242760/The_Forest/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (80 170)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (304 646)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 95,
      },
    },
    details: {
      genres: 'Featured, Mutant Cannibals, Building',
      publisher: 'Endnight Games Ltd',
      developer: 'Endnight Games Ltd',
      releaseDate: 'April 30, 2018',
      platform: 'PC (Windows, Steam), PlayStation 4',
      socialLinks: {
        web: 'https://store.steampowered.com/app/242760/The_Forest/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/242760/The_Forest/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Raft',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/648800/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2022,
        subtitle: 'Oceanic Survival, Featured',
      },
      {
        title: 'Rust',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2018,
        subtitle: 'Relentless Survival, Base Raids',
      },
      {
        title: 'Subnautica',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/264710/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2018,
        subtitle: 'Underwater, Featured',
      },
      {
        title: "Baldur's Gate 3",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2023,
        subtitle: 'CRPG, Adventure',
      },
    ],
  },

  raft: {
    title: 'Raft',
    subtitle: 'Oceanic Survival, Featured, Shark',
    rank: 78,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/648800/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/648800/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/648800/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/648800/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/648800/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/648800/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/648800/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/648800/header.jpg',
    ],
    description:
      'Raft delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/648800/Raft/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (79 890)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (303 582)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Oceanic Survival, Featured, Shark',
      publisher: 'Axolot Games',
      developer: 'Red Beet Interactive',
      releaseDate: 'June 20, 2022',
      platform: 'PC (Windows, Steam)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/648800/Raft/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/648800/Raft/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Subnautica',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/264710/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2018,
        subtitle: 'Underwater, Featured',
      },
      {
        title: 'Sea of Thieves',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1172620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2020,
        subtitle: 'Adventure, Naval Combat',
      },
      {
        title: 'The Forest',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/242760/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2018,
        subtitle: 'Featured, Mutant Cannibals',
      },
      {
        title: 'Valheim',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/892970/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2021,
        subtitle: 'Survival, Vikings',
      },
    ],
  },

  'ark: survival evolved': {
    title: 'ARK: Survival Evolved',
    subtitle: 'Featured, Survival',
    rank: 79,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/346110/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/346110/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/346110/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/346110/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/346110/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/346110/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/346110/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/346110/header.jpg',
    ],
    description:
      'Subnautica delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/346110/ARK_Survival_Evolved/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (77 860)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (295 868)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 86,
      },
    },
    details: {
      genres: 'Featured, Survival',
      publisher: 'Studio Wildcard',
      developer: 'Studio Wildcard',
      releaseDate: 'August 27, 2017',
      platform: 'PC (Windows, Steam), PlayStation, Xbox, Switch',
      socialLinks: {
        web: 'https://store.steampowered.com/app/346110/ARK_Survival_Evolved/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/346110/ARK_Survival_Evolved/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Rust',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2018,
        subtitle: 'Relentless Survival, Base Raids',
      },
      {
        title: 'Palworld',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1623730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2024,
        subtitle: 'Survival with Pals, Featured',
      },
      {
        title: 'Valheim',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/892970/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2021,
        subtitle: 'Survival, Vikings',
      },
      {
        title: 'The Forest',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/242760/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2018,
        subtitle: 'Featured, Mutant Cannibals',
      },
    ],
  },

  '7 days to die': {
    title: '7 Days to Die',
    subtitle: 'Survival, Featured',
    rank: 80,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/251570/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/251570/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/251570/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/251570/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/251570/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/251570/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/251570/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/251570/header.jpg',
    ],
    description:
      'Rust delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/251570/7_Days_to_Die/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (78 980)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (300 124)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 88,
      },
    },
    details: {
      genres: 'Survival, Featured',
      publisher: 'The Fun Pimps Entertainment LLC',
      developer: 'The Fun Pimps',
      releaseDate: 'December 13, 2013',
      platform: 'PC (Windows, Steam, Linux), PS5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/251570/7_Days_to_Die/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/251570/7_Days_to_Die/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Rust',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2018,
        subtitle: 'Relentless Survival, Base Raids',
      },
      {
        title: 'DayZ',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/221100/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2018,
        subtitle: 'Zombie Apocalypse, Featured',
      },
      {
        title: 'Project Zomboid',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/108600/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2013,
        subtitle: 'Survival',
      },
      {
        title: 'Dying Light',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/239140/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2015,
        subtitle: 'Parkour, First-Person Zombie Action',
      },
    ],
  },

  "don't starve together": {
    title: "Don't Starve Together",
    subtitle: 'Survival, Featured, Co-op',
    rank: 81,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/322330/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322330/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322330/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322330/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322330/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322330/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322330/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/322330/header.jpg',
    ],
    description:
      'Rust delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/322330/Dont_Starve_Together/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (82 200)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (312 360)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 96,
      },
    },
    details: {
      genres: 'Survival, Featured, Co-op',
      publisher: 'Klei Entertainment',
      developer: 'Klei Entertainment',
      releaseDate: 'April 21, 2016',
      platform: 'PC (Windows, Steam), PlayStation, Xbox, Switch',
      socialLinks: {
        web: 'https://store.steampowered.com/app/322330/Dont_Starve_Together/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/322330/Dont_Starve_Together/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Terraria',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: '2D Sandbox, Adventure',
      },
      {
        title: 'Stardew Valley',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2016,
        subtitle: 'Simulator, Featured',
      },
      {
        title: 'RimWorld',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/294100/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2018,
        subtitle: 'Story Generator, Galactic Colony',
      },
      {
        title: 'Project Zomboid',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/108600/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2013,
        subtitle: 'Survival',
      },
    ],
  },

  subnautica: {
    title: 'Subnautica',
    subtitle: 'Underwater, Featured',
    rank: 82,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/264710/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/264710/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/264710/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/264710/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/264710/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/264710/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/264710/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/264710/header.jpg',
    ],
    description:
      'Terraria delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/264710/Subnautica/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (82 970)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (315 286)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Underwater, Featured',
      publisher: 'Unknown Worlds Entertainment',
      developer: 'Unknown Worlds Entertainment',
      releaseDate: 'January 23, 2018',
      platform: 'PC (Windows, Steam), PlayStation, Xbox, Switch',
      socialLinks: {
        web: 'https://store.steampowered.com/app/264710/Subnautica/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/264710/Subnautica/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Subnautica: Below Zero',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/848450/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2021,
        subtitle: 'Frozen Ocean, Arctic Depths',
      },
      {
        title: 'Raft',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/648800/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2022,
        subtitle: 'Oceanic Survival, Featured',
      },
      {
        title: 'The Forest',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/242760/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2018,
        subtitle: 'Featured, Mutant Cannibals',
      },
      {
        title: 'Sea of Thieves',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1172620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2020,
        subtitle: 'Adventure, Naval Combat',
      },
    ],
  },

  'subnautica: below zero': {
    title: 'Subnautica: Below Zero',
    subtitle: 'Frozen Ocean, Arctic Depths, Aliens',
    rank: 83,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/848450/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/848450/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/848450/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/848450/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/848450/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/848450/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/848450/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/848450/header.jpg',
    ],
    description:
      'Subnautica: Below Zero delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/848450/Subnautica_Below_Zero/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (81 640)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (310 232)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Frozen Ocean, Arctic Depths, Aliens',
      publisher: 'Unknown Worlds Entertainment',
      developer: 'Unknown Worlds Entertainment',
      releaseDate: 'May 14, 2021',
      platform: 'PC (Windows, Steam), PlayStation, Xbox, Switch',
      socialLinks: {
        web: 'https://store.steampowered.com/app/848450/Subnautica_Below_Zero/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/848450/Subnautica_Below_Zero/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Subnautica',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/264710/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2018,
        subtitle: 'Underwater, Featured',
      },
      {
        title: 'Raft',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/648800/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2022,
        subtitle: 'Oceanic Survival, Featured',
      },
      {
        title: 'The Forest',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/242760/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2018,
        subtitle: 'Featured, Mutant Cannibals',
      },
      {
        title: 'Valheim',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/892970/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2021,
        subtitle: 'Survival, Vikings',
      },
    ],
  },

  'dying light': {
    title: 'Dying Light',
    subtitle: 'Parkour, First-Person Zombie Action, Featured',
    rank: 84,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/239140/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/239140/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/239140/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/239140/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/239140/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/239140/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/239140/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/239140/header.jpg',
    ],
    description:
      'Subnautica delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/239140/Dying_Light/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (83 110)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (315 818)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 95,
      },
    },
    details: {
      genres: 'Parkour, First-Person Zombie Action, Featured',
      publisher: 'Techland',
      developer: 'Techland',
      releaseDate: 'January 27, 2015',
      platform: 'PC (Windows, Steam), PlayStation 4, Xbox One, Switch',
      socialLinks: {
        web: 'https://store.steampowered.com/app/239140/Dying_Light/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/239140/Dying_Light/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Left 4 Dead 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/550/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2009,
        subtitle: 'Shooter, Featured',
      },
      {
        title: 'Dead by Daylight',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/381210/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2016,
        subtitle: 'Asymmetric 4v1 Horror, Featured',
      },
      {
        title: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1643320/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2024,
        subtitle: 'Featured, Atmospheric Shooter',
      },
      {
        title: "Baldur's Gate 3",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2023,
        subtitle: 'CRPG, Adventure',
      },
    ],
  },

  'left 4 dead 2': {
    title: 'Left 4 Dead 2',
    subtitle: 'Shooter, Featured',
    rank: 85,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/550/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/550/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/550/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/550/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/550/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/550/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/550/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/550/header.jpg',
    ],
    description:
      'Left 4 Dead 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/550/Left_4_Dead_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (84 230)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (320 074)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Shooter, Featured',
      publisher: 'Valve',
      developer: 'Valve',
      releaseDate: 'November 17, 2009',
      platform: 'PC (Windows, Steam, Linux)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/550/Left_4_Dead_2/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/550/Left_4_Dead_2/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Counter-Strike: Global Offensive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2012,
        subtitle: 'Tactical Shooter, Esports',
      },
      {
        title: 'Team Fortress 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2007,
        subtitle: 'Cult Classic Team Shooter, Featured',
      },
      {
        title: 'PAYDAY 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/218620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2013,
        subtitle: 'Bank Heists, Featured',
      },
      {
        title: 'Killing Floor 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/232090/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2016,
        subtitle: 'Shooter, Featured',
      },
    ],
  },

  'payday 2': {
    title: 'PAYDAY 2',
    subtitle: 'Bank Heists, Featured, Co-op Shooter',
    rank: 86,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/218620/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/218620/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/218620/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/218620/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/218620/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/218620/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/218620/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/218620/header.jpg',
    ],
    description:
      'Counter-Strike: Global Offensive delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/218620/PAYDAY_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (82 200)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (312 360)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 90,
      },
    },
    details: {
      genres: 'Bank Heists, Featured, Co-op Shooter',
      publisher: 'Starbreeze Publishing AB',
      developer: 'OVERKILL - a Starbreeze Studio.',
      releaseDate: 'August 13, 2013',
      platform: 'PC (Windows, Steam, Linux)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/218620/PAYDAY_2/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/218620/PAYDAY_2/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Left 4 Dead 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/550/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2009,
        subtitle: 'Shooter, Featured',
      },
      {
        title: 'Ready or Not',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1144200/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2023,
        subtitle: 'Tactical SWAT Simulator, Realism',
      },
      {
        title: 'Grand Theft Auto V',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Counter-Strike: Global Offensive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2012,
        subtitle: 'Tactical Shooter, Esports',
      },
    ],
  },

  'killing floor 2': {
    title: 'Killing Floor 2',
    subtitle: 'Shooter, Featured',
    rank: 87,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/232090/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/232090/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/232090/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/232090/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/232090/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/232090/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/232090/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/232090/header.jpg',
    ],
    description:
      'Left 4 Dead 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/232090/Killing_Floor_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (82 270)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (312 626)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 89,
      },
    },
    details: {
      genres: 'Shooter, Featured',
      publisher: 'Tripwire Interactive',
      developer: 'Tripwire Interactive',
      releaseDate: 'November 18, 2016',
      platform: 'PC (Windows, Steam), PlayStation 4, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/232090/Killing_Floor_2/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/232090/Killing_Floor_2/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Left 4 Dead 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/550/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2009,
        subtitle: 'Shooter, Featured',
      },
      {
        title: 'PAYDAY 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/218620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2013,
        subtitle: 'Bank Heists, Featured',
      },
      {
        title: 'Warhammer 40,000: Space Marine 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2183900/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2024,
        subtitle: 'Shooter, Co-op',
      },
      {
        title: 'Deep Rock Galactic',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/548430/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2020,
        subtitle: 'Featured',
      },
    ],
  },

  'ready or not': {
    title: 'Ready or Not',
    subtitle: 'Tactical SWAT Simulator, Realism',
    rank: 88,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1144200/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1144200/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1144200/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1144200/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1144200/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1144200/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1144200/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1144200/header.jpg',
    ],
    description:
      'Left 4 Dead 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1144200/Ready_or_Not/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (83 740)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (318 212)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Tactical SWAT Simulator, Realism',
      publisher: 'VOID Interactive',
      developer: 'VOID Interactive',
      releaseDate: 'December 13, 2023',
      platform: 'PC (Windows, Steam)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1144200/Ready_or_Not/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1144200/Ready_or_Not/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: "Tom Clancy's Rainbow Six Siege",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/359550/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2015,
        subtitle: 'Tactical Special Forces, Environmental Destruction',
      },
      {
        title: 'Counter-Strike: Global Offensive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2012,
        subtitle: 'Tactical Shooter, Esports',
      },
      {
        title: 'Escape from Tarkov',
        posterUrl:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2017,
        subtitle: 'Hardcore Realistic Extraction Shooter, Raids',
      },
      {
        title: 'Arma 3',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/107410/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2013,
        subtitle: 'Simulator, Realism',
      },
    ],
  },

  barony: {
    title: 'Barony',
    subtitle: 'Hardcore First-Person Voxel Roguelike, RPG',
    rank: 89,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/371970/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/371970/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/371970/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/371970/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/371970/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/371970/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/371970/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/371970/header.jpg',
    ],
    description:
      "Tom Clancy's Rainbow Six Siege delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.",
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/371970/Barony/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (84 160)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (319 808)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Hardcore First-Person Voxel Roguelike, RPG',
      publisher: 'Turning Wheel LLC',
      developer: 'Turning Wheel LLC',
      releaseDate: 'June 23, 2015',
      platform: 'PC (Windows, Steam, Linux)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/371970/Barony/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/371970/Barony/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Dead Cells',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/588650/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2018,
        subtitle: 'Rogue-lite, Metroidvania',
      },
      {
        title: 'Terraria',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: '2D Sandbox, Adventure',
      },
      {
        title: 'Unturned',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/304930/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2014,
        subtitle: 'Free-to-Play Voxel Zombie Survival Sandbox',
      },
      {
        title: 'Minecraft',
        posterUrl: 'https://i.ebayimg.com/images/g/Y9IAAOSwM2ddrpX2/s-l1200.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: 'Featured, Survival',
      },
    ],
  },

  unturned: {
    title: 'Unturned',
    subtitle: 'Free-to-Play Voxel Zombie Survival Sandbox',
    rank: 90,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/304930/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304930/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304930/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304930/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304930/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304930/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304930/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/304930/header.jpg',
    ],
    description:
      'Dead Cells delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/304930/Unturned/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (84 230)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (320 074)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Free-to-Play Voxel Zombie Survival Sandbox',
      publisher: 'Smartly Dressed Games',
      developer: 'Smartly Dressed Games',
      releaseDate: 'July 7, 2014',
      platform: 'PC (Windows, Steam, macOS, Linux)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/304930/Unturned/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/304930/Unturned/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Rust',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252490/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2018,
        subtitle: 'Relentless Survival, Base Raids',
      },
      {
        title: 'Minecraft',
        posterUrl: 'https://i.ebayimg.com/images/g/Y9IAAOSwM2ddrpX2/s-l1200.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: 'Featured, Survival',
      },
      {
        title: 'DayZ',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/221100/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2018,
        subtitle: 'Zombie Apocalypse, Featured',
      },
      {
        title: 'ROBLOX',
        posterUrl: 'https://www.artsyfartsy.eu/cdn/shop/files/17026.jpg?v=1760384946&width=320',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2006,
        subtitle: 'Featured',
      },
    ],
  },

  'dead cells': {
    title: 'Dead Cells',
    subtitle: 'Rogue-lite, Metroidvania, Featured',
    rank: 91,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/588650/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/588650/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256728780/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/588650/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/588650/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/588650/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/588650/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/588650/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/588650/header.jpg',
    ],
    description:
      'Rust delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/588650/Dead_Cells/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (86 750)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (329 650)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Rogue-lite, Metroidvania, Featured',
      publisher: 'Motion Twin',
      developer: 'Motion Twin',
      releaseDate: 'August 7, 2018',
      platform: 'PC (Windows, Steam), Consoles, Mobile',
      socialLinks: {
        web: 'https://store.steampowered.com/app/588650/Dead_Cells/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/588650/Dead_Cells/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Undertale',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/391540/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2015,
        subtitle: 'RPG, Toby Fox Masterpiece',
      },
      {
        title: 'Terraria',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: '2D Sandbox, Adventure',
      },
      {
        title: "Baldur's Gate 3",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2023,
        subtitle: 'CRPG, Adventure',
      },
      {
        title: 'ELDEN RING',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2022,
        subtitle: 'Souls-like, RPG',
      },
    ],
  },

  undertale: {
    title: 'Undertale',
    subtitle: 'RPG, Toby Fox Masterpiece, Music',
    rank: 92,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/391540/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/391540/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/391540/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/391540/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/391540/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/391540/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/391540/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/391540/header.jpg',
    ],
    description:
      'Undertale delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/391540/Undertale/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (87 870)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (333 906)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 99,
      },
    },
    details: {
      genres: 'RPG, Toby Fox Masterpiece, Music',
      publisher: 'tobyfox',
      developer: 'tobyfox',
      releaseDate: 'September 15, 2015',
      platform: 'PC (Windows, Steam), Consoles',
      socialLinks: {
        web: 'https://store.steampowered.com/app/391540/Undertale/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/391540/Undertale/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Dead Cells',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/588650/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2018,
        subtitle: 'Rogue-lite, Metroidvania',
      },
      {
        title: 'Portal 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2011,
        subtitle: 'Puzzle of the Century, Featured',
      },
      {
        title: 'Stardew Valley',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2016,
        subtitle: 'Simulator, Featured',
      },
      {
        title: 'Half-Life 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/220/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2004,
        subtitle: 'Gordon Freeman, Gravity Gun',
      },
    ],
  },

  'portal 2': {
    title: 'Portal 2',
    subtitle: 'Puzzle of the Century, Featured, GLaDOS, Valve',
    rank: 93,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/620/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg',
    ],
    description:
      'Dead Cells delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/620/Portal_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (88 290)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (335 502)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 99,
      },
    },
    details: {
      genres: 'Puzzle of the Century, Featured, GLaDOS, Valve',
      publisher: 'Valve',
      developer: 'Valve',
      releaseDate: 'April 19, 2011',
      platform: 'PC (Windows, Steam, Linux), Consoles',
      socialLinks: {
        web: 'https://store.steampowered.com/app/620/Portal_2/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/620/Portal_2/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Half-Life 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/220/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2004,
        subtitle: 'Gordon Freeman, Gravity Gun',
      },
      {
        title: 'Team Fortress 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/440/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2007,
        subtitle: 'Cult Classic Team Shooter, Featured',
      },
      {
        title: 'Deadlock',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1422450/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2024,
        subtitle: 'Featured, MOBA',
      },
      {
        title: 'Chained Together',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2567870/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2024,
        subtitle: 'Co-op Platformer, Featured',
      },
    ],
  },

  'half-life 2': {
    title: 'Half-Life 2',
    subtitle: 'Gordon Freeman, Gravity Gun, Featured, Valve',
    rank: 94,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/220/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/220/header.jpg',
    ],
    description:
      'Half-Life 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/220/HalfLife_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (88 710)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (337 098)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 99,
      },
    },
    details: {
      genres: 'Gordon Freeman, Gravity Gun, Featured, Valve',
      publisher: 'Valve',
      developer: 'Valve',
      releaseDate: 'November 16, 2004',
      platform: 'PC (Windows, Steam, Linux)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/220/HalfLife_2/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/220/HalfLife_2/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Portal 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2011,
        subtitle: 'Puzzle of the Century, Featured',
      },
      {
        title: 'Counter-Strike: Global Offensive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2012,
        subtitle: 'Tactical Shooter, Esports',
      },
      {
        title: "Garry's Mod",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/4000/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2006,
        subtitle: 'Sandbox, Source Engine',
      },
      {
        title: 'Atomic Heart',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/668580/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2023,
        subtitle: 'Alternate USSR, Biopunk',
      },
    ],
  },

  'among us': {
    title: 'Among Us',
    subtitle: 'Featured',
    rank: 95,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/945360/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/945360/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/945360/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/945360/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/945360/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/945360/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/945360/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/945360/header.jpg',
    ],
    description:
      'Portal 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/945360/Among_Us/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (86 680)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (329 384)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Featured',
      publisher: 'Innersloth',
      developer: 'Innersloth',
      releaseDate: 'November 16, 2018',
      platform: 'PC (Windows, Steam), Consoles, Mobile',
      socialLinks: {
        web: 'https://store.steampowered.com/app/945360/Among_Us/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/945360/Among_Us/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Fall Guys',
        posterUrl:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2020,
        subtitle: 'RPG',
      },
      {
        title: 'Lethal Company',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1966720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2023,
        subtitle: 'Co-op Space Horror, Featured',
      },
      {
        title: 'VRChat',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/438100/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2017,
        subtitle: 'Featured',
      },
      {
        title: 'Stumble Guys',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1677740/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
    ],
  },

  'fall guys': {
    title: 'Fall Guys',
    subtitle: 'RPG',
    rank: 96,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      // You can insert links to your own screenshots here:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    ],
    description:
      'Fall Guys delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Official Website',
      type: 'web',
      url: 'https://www.fallguys.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (85 350)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (324 330)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 87,
      },
    },
    details: {
      genres: 'RPG',
      publisher: 'Epic Games',
      developer: 'Mediatonic',
      releaseDate: 'August 4, 2020',
      platform: 'PC (Epic Games), PlayStation, Xbox, Switch',
      socialLinks: {
        web: 'https://www.fallguys.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://www.fallguys.com/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Stumble Guys',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1677740/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
      {
        title: 'Among Us',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/945360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2018,
        subtitle: 'Featured',
      },
      {
        title: 'Rocket League',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2015,
        subtitle: 'Vehicular Soccer, Arcade',
      },
      {
        title: 'Chained Together',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2567870/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2024,
        subtitle: 'Co-op Platformer, Featured',
      },
    ],
  },

  'stumble guys': {
    title: 'Stumble Guys',
    subtitle: 'Featured',
    rank: 97,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1677740/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1677740/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1677740/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1677740/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1677740/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1677740/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1677740/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1677740/header.jpg',
    ],
    description:
      'Stumble Guys delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1677740/Stumble_Guys/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (85 420)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (324 596)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 86,
      },
    },
    details: {
      genres: 'Featured',
      publisher: 'Scopely',
      developer: 'Scopely',
      releaseDate: 'October 7, 2021',
      platform: 'PC (Windows, Steam), Consoles, iOS, Android',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1677740/Stumble_Guys/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1677740/Stumble_Guys/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Fall Guys',
        posterUrl:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2020,
        subtitle: 'RPG',
      },
      {
        title: 'Among Us',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/945360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2018,
        subtitle: 'Featured',
      },
      {
        title: 'Rocket League',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/252950/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2015,
        subtitle: 'Vehicular Soccer, Arcade',
      },
      {
        title: 'Brawlhalla',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/291550/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.4,
        releaseYear: 2017,
        subtitle: 'Featured, Arena',
      },
    ],
  },

  'the sims 4': {
    title: 'The Sims 4',
    subtitle: 'Life Simulator, Home Building, Family, Featured',
    rank: 98,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1222670/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222670/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222670/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222670/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222670/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222670/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222670/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1222670/header.jpg',
    ],
    description:
      'Fall Guys delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1222670/The_Sims_4/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (86 190)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (327 522)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 87,
      },
    },
    details: {
      genres: 'Life Simulator, Home Building, Family, Featured',
      publisher: 'Electronic Arts',
      developer: 'Maxis',
      releaseDate: 'September 2, 2014',
      platform: 'PC (Windows, Steam, EA app), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1222670/The_Sims_4/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1222670/The_Sims_4/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Stardew Valley',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2016,
        subtitle: 'Simulator, Featured',
      },
      {
        title: 'Minecraft',
        posterUrl: 'https://i.ebayimg.com/images/g/Y9IAAOSwM2ddrpX2/s-l1200.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: 'Featured, Survival',
      },
      {
        title: 'RimWorld',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/294100/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2018,
        subtitle: 'Story Generator, Galactic Colony',
      },
      {
        title: 'ROBLOX',
        posterUrl: 'https://www.artsyfartsy.eu/cdn/shop/files/17026.jpg?v=1760384946&width=320',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2006,
        subtitle: 'Featured',
      },
    ],
  },

  'geometry dash': {
    title: 'Geometry Dash',
    subtitle: 'Featured, Hardcore Demons, Music',
    rank: 99,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/322170/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322170/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322170/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322170/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322170/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322170/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/322170/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/322170/header.jpg',
    ],
    description:
      'Stardew Valley delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/322170/Geometry_Dash/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (89 410)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (339 758)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 95,
      },
    },
    details: {
      genres: 'Featured, Hardcore Demons, Music',
      publisher: 'RobTop Games',
      developer: 'RobTop Games',
      releaseDate: 'December 22, 2014',
      platform: 'PC (Windows, Steam), iOS, Android',
      socialLinks: {
        web: 'https://store.steampowered.com/app/322170/Geometry_Dash/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/322170/Geometry_Dash/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'osu!',
        posterUrl:
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2007,
        subtitle: 'Rhythm, Featured',
      },
      {
        title: 'Undertale',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/391540/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2015,
        subtitle: 'RPG, Toby Fox Masterpiece',
      },
      {
        title: 'Dead Cells',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/588650/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2018,
        subtitle: 'Rogue-lite, Metroidvania',
      },
      {
        title: 'Stumble Guys',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1677740/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
    ],
  },

  'bloons td 6': {
    title: 'Bloons TD 6',
    subtitle: 'Tower Defense, Featured, Strategy',
    rank: 100,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/960090/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/960090/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256692021/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/960090/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/960090/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/960090/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/960090/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/960090/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/960090/header.jpg',
    ],
    description:
      'osu! delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/960090/Bloons_TD_6/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (90 530)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (344 014)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Tower Defense, Featured, Strategy',
      publisher: 'Ninja Kiwi',
      developer: 'Ninja Kiwi',
      releaseDate: 'December 17, 2018',
      platform: 'PC (Windows, Steam), iOS, Android',
      socialLinks: {
        web: 'https://store.steampowered.com/app/960090/Bloons_TD_6/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/960090/Bloons_TD_6/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Plants vs. Zombies GOTY Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/3590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2009,
        subtitle: 'Featured',
      },
      {
        title: 'Mindustry',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1127400/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Featured, Logistics',
      },
      {
        title: 'Hearthstone',
        posterUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9IPTBhlbYOyh4Y-KUVX4mDzgrgIF5RuFFxLESjXlq0esm_d2T1AydZSoa&s=10',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2014,
        subtitle: 'Featured, Warcraft Universe',
      },
      {
        title: 'Factorio',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2020,
        subtitle: 'Factory Automation, Featured',
      },
    ],
  },

  'plants vs. zombies goty edition': {
    title: 'Plants vs. Zombies GOTY Edition',
    subtitle: 'Featured',
    rank: 101,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/3590/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3590/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3590/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3590/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3590/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3590/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3590/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/3590/header.jpg',
    ],
    description:
      'Plants vs. Zombies GOTY Edition delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/3590/Plants_vs_Zombies_GOTY_Edition/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (90 950)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (345 610)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Featured',
      publisher: 'Electronic Arts',
      developer: 'PopCap Games, Inc.',
      releaseDate: 'May 5, 2009',
      platform: 'PC (Windows, Steam), Mobile, Consoles',
      socialLinks: {
        web: 'https://store.steampowered.com/app/3590/Plants_vs_Zombies_GOTY_Edition/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/3590/Plants_vs_Zombies_GOTY_Edition/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Bloons TD 6',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/960090/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2018,
        subtitle: 'Tower Defense, Featured',
      },
      {
        title: 'Hearthstone',
        posterUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9IPTBhlbYOyh4Y-KUVX4mDzgrgIF5RuFFxLESjXlq0esm_d2T1AydZSoa&s=10',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2014,
        subtitle: 'Featured, Warcraft Universe',
      },
      {
        title: 'Stardew Valley',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2016,
        subtitle: 'Simulator, Featured',
      },
      {
        title: 'Terraria',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: '2D Sandbox, Adventure',
      },
    ],
  },

  'osu!': {
    title: 'osu!',
    subtitle: 'Rhythm, Featured, Anime Openings',
    rank: 102,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      // You can insert links to your own screenshots here:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    ],
    description:
      'Bloons TD 6 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Official Website',
      type: 'web',
      url: 'https://osu.ppy.sh/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (90 320)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (343 216)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 94,
      },
    },
    details: {
      genres: 'Rhythm, Featured, Anime Openings',
      publisher: 'ppy Pty Ltd',
      developer: 'ppy Pty Ltd / Dean Herbert',
      releaseDate: 'September 16, 2007',
      platform: 'PC (Windows, macOS, Linux)',
      socialLinks: {
        web: 'https://osu.ppy.sh/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://osu.ppy.sh/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Geometry Dash',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/322170/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2014,
        subtitle: 'Featured, Hardcore Demons',
      },
      {
        title: 'Aimlabs',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/714010/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2023,
        subtitle: 'Sports, Aim Trainer',
      },
      {
        title: 'Genshin Impact',
        posterUrl:
          'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2020,
        subtitle: 'Anime-RPG, Open World Teyvat',
      },
      {
        title: 'Undertale',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/391540/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2015,
        subtitle: 'RPG, Toby Fox Masterpiece',
      },
    ],
  },

  factorio: {
    title: 'Factorio',
    subtitle: 'Factory Automation, Featured',
    rank: 103,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/427520/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256692021/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/427520/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/427520/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/427520/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/427520/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/427520/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg',
    ],
    description:
      'Geometry Dash delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/427520/Factorio/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (92 490)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (351 462)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 99,
      },
    },
    details: {
      genres: 'Factory Automation, Featured',
      publisher: 'Wube Software LTD.',
      developer: 'Wube Software LTD.',
      releaseDate: 'August 14, 2020',
      platform: 'PC (Windows, Steam, macOS, Linux), Switch',
      socialLinks: {
        web: 'https://store.steampowered.com/app/427520/Factorio/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/427520/Factorio/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Mindustry',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1127400/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Featured, Logistics',
      },
      {
        title: 'RimWorld',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/294100/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2018,
        subtitle: 'Story Generator, Galactic Colony',
      },
      {
        title: 'Frostpunk',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/323190/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2018,
        subtitle: 'City Survival in Frozen Hell, Featured',
      },
      {
        title: 'Terraria',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2011,
        subtitle: '2D Sandbox, Adventure',
      },
    ],
  },

  mindustry: {
    title: 'Mindustry',
    subtitle: 'Featured, Logistics',
    rank: 104,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1127400/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1127400/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1127400/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1127400/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1127400/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1127400/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1127400/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1127400/header.jpg',
    ],
    description:
      'Mindustry delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1127400/Mindustry/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (91 860)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (349 068)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 96,
      },
    },
    details: {
      genres: 'Featured, Logistics',
      publisher: 'Anuke',
      developer: 'Anuke',
      releaseDate: 'September 26, 2019',
      platform: 'PC (Windows, Steam, Linux), Android',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1127400/Mindustry/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1127400/Mindustry/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Factorio',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2020,
        subtitle: 'Factory Automation, Featured',
      },
      {
        title: 'Bloons TD 6',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/960090/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2018,
        subtitle: 'Tower Defense, Featured',
      },
      {
        title: 'RimWorld',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/294100/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2018,
        subtitle: 'Story Generator, Galactic Colony',
      },
      {
        title: 'Cell to Singularity - Evolution Never Ends',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/977400/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
    ],
  },

  rimworld: {
    title: 'RimWorld',
    subtitle: 'Story Generator, Galactic Colony, Survival',
    rank: 105,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/294100/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/294100/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/294100/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/294100/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/294100/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/294100/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/294100/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/294100/header.jpg',
    ],
    description:
      'Factorio delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/294100/RimWorld/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (92 980)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (353 324)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 98,
      },
    },
    details: {
      genres: 'Story Generator, Galactic Colony, Survival',
      publisher: 'Ludeon Studios',
      developer: 'Ludeon Studios',
      releaseDate: 'October 17, 2018',
      platform: 'PC (Windows, Steam, Mac, Linux), Consoles',
      socialLinks: {
        web: 'https://store.steampowered.com/app/294100/RimWorld/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/294100/RimWorld/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Factorio',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2020,
        subtitle: 'Factory Automation, Featured',
      },
      {
        title: 'Frostpunk',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/323190/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2018,
        subtitle: 'City Survival in Frozen Hell, Featured',
      },
      {
        title: 'Project Zomboid',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/108600/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2013,
        subtitle: 'Survival',
      },
      {
        title: "Don't Starve Together",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/322330/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2016,
        subtitle: 'Survival, Featured',
      },
    ],
  },

  frostpunk: {
    title: 'Frostpunk',
    subtitle: 'City Survival in Frozen Hell, Featured',
    rank: 106,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/323190/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/323190/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/323190/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/323190/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/323190/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/323190/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/323190/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/323190/header.jpg',
    ],
    description:
      'Factorio delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/323190/Frostpunk/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (91 300)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (346 940)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'City Survival in Frozen Hell, Featured',
      publisher: '11 bit studios',
      developer: '11 bit studios',
      releaseDate: 'April 24, 2018',
      platform: 'PC (Windows, Steam), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/323190/Frostpunk/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/323190/Frostpunk/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'RimWorld',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/294100/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2018,
        subtitle: 'Story Generator, Galactic Colony',
      },
      {
        title: "Sid Meier's Civilization VI",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2016,
        subtitle: 'Strategy, Featured',
      },
      {
        title: 'Factorio',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2020,
        subtitle: 'Factory Automation, Featured',
      },
      {
        title: 'Metro Exodus',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/412020/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2019,
        subtitle: 'Post-Apocalyptic, Featured',
      },
    ],
  },

  "sid meier's civilization vi": {
    title: "Sid Meier's Civilization VI",
    subtitle: 'Strategy, Featured',
    rank: 107,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/289070/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256692021/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/289070/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/289070/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/289070/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/289070/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/289070/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg',
    ],
    description:
      'RimWorld delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/289070/Sid_Meiers_Civilization_VI/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (90 670)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (344 546)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 89,
      },
    },
    details: {
      genres: 'Strategy, Featured',
      publisher: '2K',
      developer: 'Firaxis Games',
      releaseDate: 'October 21, 2016',
      platform: 'PC (Windows, Steam), PlayStation, Xbox, Switch, iOS',
      socialLinks: {
        web: 'https://store.steampowered.com/app/289070/Sid_Meiers_Civilization_VI/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/289070/Sid_Meiers_Civilization_VI/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: "Sid Meier's Civilization V",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/8930/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2010,
        subtitle: 'Strategy, Hexagonal Grid Map',
      },
      {
        title: 'Hearts of Iron IV',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/394360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2016,
        subtitle: 'World War II Warfare, Grand Strategy',
      },
      {
        title: 'Crusader Kings III',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1158310/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2020,
        subtitle: 'Medieval Dynasty Simulator, Court Intrigue',
      },
      {
        title: 'Total War: ROME II - Emperor Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/214950/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2013,
        subtitle: 'Ancient Roman Legions, Featured',
      },
    ],
  },

  "sid meier's civilization v": {
    title: "Sid Meier's Civilization V",
    subtitle: 'Strategy, Hexagonal Grid Map',
    rank: 108,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/8930/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/8930/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256692021/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/8930/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/8930/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/8930/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/8930/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/8930/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/8930/header.jpg',
    ],
    description:
      "Sid Meier's Civilization V delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.",
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/8930/Sid_Meiers_Civilization_V/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (93 540)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (355 452)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 96,
      },
    },
    details: {
      genres: 'Strategy, Hexagonal Grid Map',
      publisher: '2K',
      developer: 'Firaxis Games',
      releaseDate: 'September 21, 2010',
      platform: 'PC (Windows, Steam, Linux)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/8930/Sid_Meiers_Civilization_V/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/8930/Sid_Meiers_Civilization_V/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: "Sid Meier's Civilization VI",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2016,
        subtitle: 'Strategy, Featured',
      },
      {
        title: 'Hearts of Iron IV',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/394360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2016,
        subtitle: 'World War II Warfare, Grand Strategy',
      },
      {
        title: 'Total War: ROME II - Emperor Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/214950/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2013,
        subtitle: 'Ancient Roman Legions, Featured',
      },
      {
        title: 'Crusader Kings III',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1158310/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2020,
        subtitle: 'Medieval Dynasty Simulator, Court Intrigue',
      },
    ],
  },

  'hearts of iron iv': {
    title: 'Hearts of Iron IV',
    subtitle: 'World War II Warfare, Grand Strategy, Military Warfare',
    rank: 109,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/394360/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/394360/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256692021/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/394360/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/394360/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/394360/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/394360/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/394360/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/394360/header.jpg',
    ],
    description:
      "Sid Meier's Civilization VI delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.",
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/394360/Hearts_of_Iron_IV/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (92 210)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (350 398)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'World War II Warfare, Grand Strategy, Military Warfare',
      publisher: 'Paradox Interactive',
      developer: 'Paradox Development Studio',
      releaseDate: 'June 6, 2016',
      platform: 'PC (Windows, Steam, macOS, Linux)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/394360/Hearts_of_Iron_IV/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/394360/Hearts_of_Iron_IV/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Crusader Kings III',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1158310/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2020,
        subtitle: 'Medieval Dynasty Simulator, Court Intrigue',
      },
      {
        title: "Sid Meier's Civilization VI",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2016,
        subtitle: 'Strategy, Featured',
      },
      {
        title: 'Total War: ROME II - Emperor Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/214950/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2013,
        subtitle: 'Ancient Roman Legions, Featured',
      },
      {
        title: 'War Thunder',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/236390/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2013,
        subtitle: 'Military Tank Simulator, Featured',
      },
    ],
  },

  'crusader kings iii': {
    title: 'Crusader Kings III',
    subtitle: 'Medieval Dynasty Simulator, Court Intrigue, Featured',
    rank: 110,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1158310/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1158310/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256927226/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1158310/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1158310/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1158310/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1158310/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1158310/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1158310/header.jpg',
    ],
    description:
      'Crusader Kings III delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1158310/Crusader_Kings_III/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (92 980)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (353 324)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Medieval Dynasty Simulator, Court Intrigue, Featured',
      publisher: 'Paradox Interactive',
      developer: 'Paradox Development Studio',
      releaseDate: 'September 1, 2020',
      platform: 'PC (Windows, Steam, Linux), PS5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1158310/Crusader_Kings_III/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1158310/Crusader_Kings_III/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Hearts of Iron IV',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/394360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2016,
        subtitle: 'World War II Warfare, Grand Strategy',
      },
      {
        title: 'Mount & Blade II: Bannerlord',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/261550/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2022,
        subtitle: 'Featured',
      },
      {
        title: "Sid Meier's Civilization VI",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2016,
        subtitle: 'Strategy, Featured',
      },
      {
        title: "Baldur's Gate 3",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2023,
        subtitle: 'CRPG, RPG',
      },
    ],
  },

  'mount & blade ii: bannerlord': {
    title: 'Mount & Blade II: Bannerlord',
    subtitle: 'Featured',
    rank: 111,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/261550/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/261550/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256927226/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/261550/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/261550/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/261550/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/261550/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/261550/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/261550/header.jpg',
    ],
    description:
      'Hearts of Iron IV delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/261550/Mount__Blade_II_Bannerlord/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (92 350)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (350 930)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 89,
      },
    },
    details: {
      genres: 'Featured',
      publisher: 'TaleWorlds Entertainment',
      developer: 'TaleWorlds Entertainment',
      releaseDate: 'October 25, 2022',
      platform: 'PC (Windows, Steam), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/261550/Mount__Blade_II_Bannerlord/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/261550/Mount__Blade_II_Bannerlord/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Crusader Kings III',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1158310/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2020,
        subtitle: 'Medieval Dynasty Simulator, Court Intrigue',
      },
      {
        title: 'Total War: ROME II - Emperor Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/214950/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2013,
        subtitle: 'Ancient Roman Legions, Featured',
      },
      {
        title: 'Black Myth: Wukong',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2024,
        subtitle: 'Action-RPG, Mythology',
      },
      {
        title: 'The Witcher 3: Wild Hunt',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'total war: rome ii - emperor edition': {
    title: 'Total War: ROME II - Emperor Edition',
    subtitle: 'Ancient Roman Legions, Featured, Tactics',
    rank: 112,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/214950/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214950/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214950/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214950/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214950/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214950/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/214950/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/214950/header.jpg',
    ],
    description:
      'Crusader Kings III delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/214950/Total_War_ROME_II__Emperor_Edition/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (92 420)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (351 196)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 88,
      },
    },
    details: {
      genres: 'Ancient Roman Legions, Featured, Tactics',
      publisher: 'SEGA',
      developer: 'CREATIVE ASSEMBLY',
      releaseDate: 'September 3, 2013',
      platform: 'PC (Windows, Steam, macOS)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/214950/Total_War_ROME_II__Emperor_Edition/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/214950/Total_War_ROME_II__Emperor_Edition/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Mount & Blade II: Bannerlord',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/261550/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2022,
        subtitle: 'Featured',
      },
      {
        title: "Sid Meier's Civilization VI",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/289070/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2016,
        subtitle: 'Strategy, Featured',
      },
      {
        title: 'Hearts of Iron IV',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/394360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2016,
        subtitle: 'World War II Warfare, Grand Strategy',
      },
      {
        title: 'Crusader Kings III',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1158310/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2020,
        subtitle: 'Medieval Dynasty Simulator, Court Intrigue',
      },
    ],
  },

  'cell to singularity - evolution never ends': {
    title: 'Cell to Singularity - Evolution Never Ends',
    subtitle: 'Featured',
    rank: 113,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/977400/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/977400/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/977400/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/977400/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/977400/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/977400/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/977400/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/977400/header.jpg',
    ],
    description:
      'Mount & Blade II: Bannerlord delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/977400/Cell_to_Singularity__Evolution_Never_Ends/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (93 890)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (356 782)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Featured',
      publisher: 'Computer Lunch',
      developer: 'Computer Lunch',
      releaseDate: 'November 3, 2021',
      platform: 'PC (Windows, Steam, Linux), iOS, Android',
      socialLinks: {
        web: 'https://store.steampowered.com/app/977400/Cell_to_Singularity__Evolution_Never_Ends/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/977400/Cell_to_Singularity__Evolution_Never_Ends/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Mindustry',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1127400/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Featured, Logistics',
      },
      {
        title: 'Factorio',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/427520/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.9,
        releaseYear: 2020,
        subtitle: 'Factory Automation, Featured',
      },
      {
        title: 'Bloons TD 6',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/960090/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2018,
        subtitle: 'Tower Defense, Featured',
      },
      {
        title: 'Geometry Dash',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/322170/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2014,
        subtitle: 'Featured, Hardcore Demons',
      },
    ],
  },

  'forza horizon 5': {
    title: 'Forza Horizon 5',
    subtitle: 'Featured, Open World',
    rank: 114,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
    ],
    description:
      'Mindustry delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1551360/Forza_Horizon_5/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (95 010)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (361 038)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Featured, Open World',
      publisher: 'Xbox Game Studios',
      developer: 'Playground Games',
      releaseDate: 'November 9, 2021',
      platform: 'PC (Windows, Steam, Xbox app), Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1551360/Forza_Horizon_5/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1551360/Forza_Horizon_5/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Forza Horizon 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1293830/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2018,
        subtitle: 'British Countryside, Featured',
      },
      {
        title: 'BeamNG.drive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/284160/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2015,
        subtitle: 'Featured',
      },
      {
        title: 'Assetto Corsa',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/244210/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2014,
        subtitle: 'Simulator, Featured',
      },
      {
        title: 'Need for Speed Heat',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1222680/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2019,
        subtitle: 'Sports, Featured',
      },
    ],
  },

  'forza horizon 4': {
    title: 'Forza Horizon 4',
    subtitle: 'British Countryside, Featured, Drift, Racing',
    rank: 115,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1293830/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1293830/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256728780/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1293830/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1293830/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1293830/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1293830/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1293830/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1293830/header.jpg',
    ],
    description:
      'Forza Horizon 4 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1293830/Forza_Horizon_4/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (95 080)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (361 304)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'British Countryside, Featured, Drift, Racing',
      publisher: 'Xbox Game Studios',
      developer: 'Playground Games',
      releaseDate: 'March 9, 2021',
      platform: 'PC (Windows, Steam), Xbox Series X/S, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1293830/Forza_Horizon_4/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1293830/Forza_Horizon_4/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Forza Horizon 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
      {
        title: 'BeamNG.drive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/284160/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2015,
        subtitle: 'Featured',
      },
      {
        title: 'The Crew 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/646910/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.4,
        releaseYear: 2018,
        subtitle: 'Cars, Featured',
      },
      {
        title: 'Need for Speed Unbound',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1846380/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.3,
        releaseYear: 2022,
        subtitle: 'Featured, Anime Style',
      },
    ],
  },

  'forza horizon 6': {
    title: 'Forza Horizon 6',
    subtitle: 'Featured',
    rank: 116,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600&auto=format&fit=crop&q=80',
      // You can insert links to your own screenshots here:
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600&auto=format&fit=crop&q=80',
    ],
    description:
      'Forza Horizon 5 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Official Website',
      type: 'web',
      url: 'https://forza.net/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (96 550)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (366 890)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 95,
      },
    },
    details: {
      genres: 'Featured',
      publisher: 'Xbox Game Studios',
      developer: 'Playground Games',
      releaseDate: '2025',
      platform: 'PC (Windows, Steam), Xbox Series X/S',
      socialLinks: {
        web: 'https://forza.net/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://forza.net/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Forza Horizon 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
      {
        title: 'Forza Horizon 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1293830/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2018,
        subtitle: 'British Countryside, Featured',
      },
      {
        title: 'BeamNG.drive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/284160/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2015,
        subtitle: 'Featured',
      },
      {
        title: 'Assetto Corsa',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/244210/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2014,
        subtitle: 'Simulator, Featured',
      },
    ],
  },

  'beamng.drive': {
    title: 'BeamNG.drive',
    subtitle: 'Featured, Sandbox',
    rank: 117,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/284160/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/284160/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/284160/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/284160/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/284160/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/284160/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/284160/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/284160/header.jpg',
    ],
    description:
      'Forza Horizon 5 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/284160/BeamNGdrive/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (97 670)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (371 146)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Featured, Sandbox',
      publisher: 'BeamNG',
      developer: 'BeamNG',
      releaseDate: 'May 29, 2015',
      platform: 'PC (Windows, Steam)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/284160/BeamNGdrive/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/284160/BeamNGdrive/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Assetto Corsa',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/244210/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2014,
        subtitle: 'Simulator, Featured',
      },
      {
        title: 'Euro Truck Simulator 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/227300/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2012,
        subtitle: 'Trucking Across Europe, Romance',
      },
      {
        title: 'Forza Horizon 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
      {
        title: "Garry's Mod",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/4000/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2006,
        subtitle: 'Sandbox, Source Engine',
      },
    ],
  },

  'assetto corsa': {
    title: 'Assetto Corsa',
    subtitle: 'Simulator, Featured',
    rank: 118,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/244210/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/244210/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/244210/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/244210/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/244210/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/244210/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/244210/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/244210/header.jpg',
    ],
    description:
      'Assetto Corsa delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/244210/Assetto_Corsa/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (97 040)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (368 752)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 94,
      },
    },
    details: {
      genres: 'Simulator, Featured',
      publisher: 'Kunos Simulazioni',
      developer: 'Kunos Simulazioni',
      releaseDate: 'December 19, 2014',
      platform: 'PC (Windows, Steam), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/244210/Assetto_Corsa/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/244210/Assetto_Corsa/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'iRacing',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/266410/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2015,
        subtitle: 'Sports, iRating System',
      },
      {
        title: 'BeamNG.drive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/284160/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2015,
        subtitle: 'Featured',
      },
      {
        title: 'Forza Horizon 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
      {
        title: 'Euro Truck Simulator 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/227300/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2012,
        subtitle: 'Trucking Across Europe, Romance',
      },
    ],
  },

  iracing: {
    title: 'iRacing',
    subtitle: 'Sports, iRating System',
    rank: 119,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/266410/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/266410/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/266410/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/266410/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/266410/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/266410/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/266410/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/266410/header.jpg',
    ],
    description:
      'iRacing delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/266410/iRacing/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (95 360)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (362 368)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 88,
      },
    },
    details: {
      genres: 'Sports, iRating System',
      publisher: 'iRacing.com Motorsport Simulations',
      developer: 'iRacing.com Motorsport Simulations',
      releaseDate: 'January 12, 2015',
      platform: 'PC (Windows, Steam)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/266410/iRacing/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/266410/iRacing/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Assetto Corsa',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/244210/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2014,
        subtitle: 'Simulator, Featured',
      },
      {
        title: 'BeamNG.drive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/284160/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2015,
        subtitle: 'Featured',
      },
      {
        title: 'Forza Horizon 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
      {
        title: 'Euro Truck Simulator 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/227300/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2012,
        subtitle: 'Trucking Across Europe, Romance',
      },
    ],
  },

  'euro truck simulator 2': {
    title: 'Euro Truck Simulator 2',
    subtitle: 'Trucking Across Europe, Romance, Featured',
    rank: 120,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/227300/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/227300/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/227300/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/227300/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/227300/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/227300/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/227300/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/227300/header.jpg',
    ],
    description:
      'Assetto Corsa delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/227300/Euro_Truck_Simulator_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (98 930)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (375 934)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Trucking Across Europe, Romance, Featured',
      publisher: 'SCS Software',
      developer: 'SCS Software',
      releaseDate: 'October 19, 2012',
      platform: 'PC (Windows, Steam, Linux)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/227300/Euro_Truck_Simulator_2/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/227300/Euro_Truck_Simulator_2/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'BeamNG.drive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/284160/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2015,
        subtitle: 'Featured',
      },
      {
        title: 'Forza Horizon 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
      {
        title: 'Assetto Corsa',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/244210/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2014,
        subtitle: 'Simulator, Featured',
      },
      {
        title: 'The Crew 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/646910/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.4,
        releaseYear: 2018,
        subtitle: 'Cars, Featured',
      },
    ],
  },

  'the crew 2': {
    title: 'The Crew 2',
    subtitle: 'Cars, Featured, Sports',
    rank: 121,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/646910/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/646910/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/646910/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/646910/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/646910/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/646910/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/646910/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/646910/header.jpg',
    ],
    description:
      'BeamNG.drive delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/646910/The_Crew_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (94 800)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (360 240)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 84,
      },
    },
    details: {
      genres: 'Cars, Featured, Sports',
      publisher: 'Ubisoft',
      developer: 'Ivory Tower',
      releaseDate: 'June 29, 2018',
      platform: 'PC (Windows, Steam), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/646910/The_Crew_2/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/646910/The_Crew_2/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Forza Horizon 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
      {
        title: 'Need for Speed Heat',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1222680/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2019,
        subtitle: 'Sports, Featured',
      },
      {
        title: 'Euro Truck Simulator 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/227300/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2012,
        subtitle: 'Trucking Across Europe, Romance',
      },
      {
        title: 'Grand Theft Auto V',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'need for speed: most wanted': {
    title: 'Need for Speed: Most Wanted',
    subtitle: 'Featured, Police',
    rank: 122,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1262560/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262560/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256728780/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262560/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262560/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262560/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262560/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262560/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1262560/header.jpg',
    ],
    description:
      'Forza Horizon 5 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1262560/Need_for_Speed_Most_Wanted/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (95 570)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (363 166)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 85,
      },
    },
    details: {
      genres: 'Featured, Police',
      publisher: 'Electronic Arts',
      developer: 'Criterion Games',
      releaseDate: 'June 18, 2020',
      platform: 'PC (Windows, Steam), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1262560/Need_for_Speed_Most_Wanted/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1262560/Need_for_Speed_Most_Wanted/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Need for Speed Heat',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1222680/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2019,
        subtitle: 'Sports, Featured',
      },
      {
        title: 'Need for Speed Unbound',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1846380/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.3,
        releaseYear: 2022,
        subtitle: 'Featured, Anime Style',
      },
      {
        title: 'Forza Horizon 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
      {
        title: 'Grand Theft Auto V',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'need for speed heat': {
    title: 'Need for Speed Heat',
    subtitle: 'Sports, Featured',
    rank: 123,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1222680/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222680/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256728780/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222680/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222680/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222680/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222680/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222680/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1222680/header.jpg',
    ],
    description:
      'Need for Speed Heat delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1222680/Need_for_Speed_Heat/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (97 040)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (368 752)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 88,
      },
    },
    details: {
      genres: 'Sports, Featured',
      publisher: 'Electronic Arts',
      developer: 'Ghost Games',
      releaseDate: 'November 8, 2019',
      platform: 'PC (Windows, Steam), PlayStation, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1222680/Need_for_Speed_Heat/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1222680/Need_for_Speed_Heat/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Need for Speed Unbound',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1846380/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.3,
        releaseYear: 2022,
        subtitle: 'Featured, Anime Style',
      },
      {
        title: 'Need for Speed: Most Wanted',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1262560/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2012,
        subtitle: 'Featured',
      },
      {
        title: 'Forza Horizon 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
      {
        title: 'The Crew 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/646910/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.4,
        releaseYear: 2018,
        subtitle: 'Cars, Featured',
      },
    ],
  },

  'need for speed unbound': {
    title: 'Need for Speed Unbound',
    subtitle: 'Featured, Anime Style',
    rank: 124,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1846380/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1846380/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1846380/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1846380/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1846380/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1846380/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1846380/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1846380/header.jpg',
    ],
    description:
      'Need for Speed Unbound delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1846380/Need_for_Speed_Unbound/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (95 710)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (363 698)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 83,
      },
    },
    details: {
      genres: 'Featured, Anime Style',
      publisher: 'Electronic Arts',
      developer: 'Criterion Games',
      releaseDate: 'November 29, 2022',
      platform: 'PC (Windows, Steam), PlayStation 5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1846380/Need_for_Speed_Unbound/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1846380/Need_for_Speed_Unbound/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Need for Speed Heat',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1222680/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2019,
        subtitle: 'Sports, Featured',
      },
      {
        title: 'Forza Horizon 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
      {
        title: 'Need for Speed: Most Wanted',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1262560/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2012,
        subtitle: 'Featured',
      },
      {
        title: 'Cyberpunk 2077',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2020,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'mafia: definitive edition': {
    title: 'Mafia: Definitive Edition',
    subtitle: 'Featured, Salieri Crime Family',
    rank: 125,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1030840/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030840/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030840/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030840/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030840/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030840/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030840/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1030840/header.jpg',
    ],
    description:
      'Need for Speed Heat delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1030840/Mafia_Definitive_Edition/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (99 280)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (377 264)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Featured, Salieri Crime Family',
      publisher: '2K',
      developer: 'Hangar 13',
      releaseDate: 'September 25, 2020',
      platform: 'PC (Windows, Steam), PlayStation 4, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1030840/Mafia_Definitive_Edition/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1030840/Mafia_Definitive_Edition/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Mafia II: Definitive Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1030830/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2020,
        subtitle: 'Vito Scaletta, Featured',
      },
      {
        title: 'Mafia III: Definitive Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/360430/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 7.9,
        releaseYear: 2020,
        subtitle: 'Featured',
      },
      {
        title: 'Red Dead Redemption 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2019,
        subtitle: 'Western, Open World',
      },
      {
        title: 'Grand Theft Auto V',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'mafia ii: definitive edition': {
    title: 'Mafia II: Definitive Edition',
    subtitle: 'Vito Scaletta, Featured, Mafia',
    rank: 126,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1030830/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030830/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030830/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030830/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030830/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030830/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1030830/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1030830/header.jpg',
    ],
    description:
      'Mafia II: Definitive Edition delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1030830/Mafia_II_Definitive_Edition/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (97 950)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (372 210)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 87,
      },
    },
    details: {
      genres: 'Vito Scaletta, Featured, Mafia',
      publisher: '2K',
      developer: 'Hangar 13, D3T',
      releaseDate: 'May 19, 2020',
      platform: 'PC (Windows, Steam), PlayStation 4, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1030830/Mafia_II_Definitive_Edition/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1030830/Mafia_II_Definitive_Edition/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Mafia: Definitive Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1030840/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2020,
        subtitle: 'Featured',
      },
      {
        title: 'Mafia III: Definitive Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/360430/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 7.9,
        releaseYear: 2020,
        subtitle: 'Featured',
      },
      {
        title: 'Grand Theft Auto V',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Red Dead Redemption 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2019,
        subtitle: 'Western, Open World',
      },
    ],
  },

  'mafia iii: definitive edition': {
    title: 'Mafia III: Definitive Edition',
    subtitle: 'Featured, Revenge on the Marcano Family',
    rank: 127,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/360430/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/360430/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/360430/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/360430/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/360430/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/360430/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/360430/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/360430/header.jpg',
    ],
    description:
      'Mafia: Definitive Edition delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/360430/Mafia_III_Definitive_Edition/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (95 570)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (363 166)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 79,
      },
    },
    details: {
      genres: 'Featured, Revenge on the Marcano Family',
      publisher: '2K',
      developer: 'Hangar 13',
      releaseDate: 'May 19, 2020',
      platform: 'PC (Windows, Steam), PlayStation 4, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/360430/Mafia_III_Definitive_Edition/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/360430/Mafia_III_Definitive_Edition/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Mafia: Definitive Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1030840/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2020,
        subtitle: 'Featured',
      },
      {
        title: 'Mafia II: Definitive Edition',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1030830/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2020,
        subtitle: 'Vito Scaletta, Featured',
      },
      {
        title: 'Grand Theft Auto V',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Watch_Dogs 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/447040/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2016,
        subtitle: 'Hackers, Featured',
      },
    ],
  },

  'battlefield 1': {
    title: 'Battlefield 1',
    subtitle: 'World War I Battlefield, Featured',
    rank: 128,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238840/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238840/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238840/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238840/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238840/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238840/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238840/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1238840/header.jpg',
    ],
    description:
      'Mafia: Definitive Edition delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1238840/Battlefield_1/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (100 890)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (383 382)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'World War I Battlefield, Featured',
      publisher: 'Electronic Arts',
      developer: 'DICE',
      releaseDate: 'June 11, 2020',
      platform: 'PC (Windows, Steam), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1238840/Battlefield_1/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1238840/Battlefield_1/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Battlefield 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238860/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2013,
        subtitle: 'Featured',
      },
      {
        title: 'Battlefield 3',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238820/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2011,
        subtitle: 'Featured',
      },
      {
        title: 'Battlefield V',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238810/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.4,
        releaseYear: 2018,
        subtitle: 'World War II Warfare, Featured',
      },
      {
        title: 'Delta Force',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2507950/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2024,
        subtitle: 'Shooter, Featured',
      },
    ],
  },

  'battlefield 3': {
    title: 'Battlefield 3',
    subtitle: 'Featured',
    rank: 129,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238820/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238820/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238820/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238820/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238820/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238820/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238820/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1238820/header.jpg',
    ],
    description:
      'Battlefield 4 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1238820/Battlefield_3/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (100 960)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (383 648)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Featured',
      publisher: 'Electronic Arts',
      developer: 'DICE',
      releaseDate: 'June 11, 2020',
      platform: 'PC (Windows, Steam), PlayStation 3, Xbox 360',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1238820/Battlefield_3/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1238820/Battlefield_3/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Battlefield 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238860/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2013,
        subtitle: 'Featured',
      },
      {
        title: 'Battlefield 1',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238840/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2016,
        subtitle: 'World War I Battlefield, Featured',
      },
      {
        title: 'Battlefield V',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238810/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.4,
        releaseYear: 2018,
        subtitle: 'World War II Warfare, Featured',
      },
      {
        title: 'Call of Duty: Modern Warfare III',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2519060/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.2,
        releaseYear: 2023,
        subtitle: 'Military Shooter, Multiplayer',
      },
    ],
  },

  'battlefield 4': {
    title: 'Battlefield 4',
    subtitle: 'Featured, Tanks',
    rank: 130,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238860/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238860/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238860/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238860/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238860/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238860/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238860/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1238860/header.jpg',
    ],
    description:
      'Battlefield 4 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1238860/Battlefield_4/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (101 030)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (383 914)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Featured, Tanks',
      publisher: 'Electronic Arts',
      developer: 'DICE',
      releaseDate: 'June 11, 2020',
      platform: 'PC (Windows, Steam), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1238860/Battlefield_4/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1238860/Battlefield_4/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Battlefield 1',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238840/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2016,
        subtitle: 'World War I Battlefield, Featured',
      },
      {
        title: 'Battlefield 3',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238820/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2011,
        subtitle: 'Featured',
      },
      {
        title: 'Delta Force',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2507950/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2024,
        subtitle: 'Shooter, Featured',
      },
      {
        title: 'Battlefield 2042',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1517290/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 7.8,
        releaseYear: 2021,
        subtitle: 'Near-Future Warfare 2042, Featured',
      },
    ],
  },

  'battlefield v': {
    title: 'Battlefield V',
    subtitle: 'World War II Warfare, Featured, Aerial Dogfights, Tanks',
    rank: 131,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238810/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238810/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238810/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238810/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238810/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238810/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1238810/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1238810/header.jpg',
    ],
    description:
      'Battlefield 1 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1238810/Battlefield_V/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (99 000)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (376 200)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 84,
      },
    },
    details: {
      genres: 'World War II Warfare, Featured, Aerial Dogfights, Tanks',
      publisher: 'Electronic Arts',
      developer: 'DICE',
      releaseDate: 'June 11, 2020',
      platform: 'PC (Windows, Steam), PlayStation 4, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1238810/Battlefield_V/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1238810/Battlefield_V/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Battlefield 1',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238840/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2016,
        subtitle: 'World War I Battlefield, Featured',
      },
      {
        title: 'Battlefield 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238860/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2013,
        subtitle: 'Featured',
      },
      {
        title: 'War Thunder',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/236390/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2013,
        subtitle: 'Military Tank Simulator, Featured',
      },
      {
        title: 'Call of Duty: Modern Warfare III',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2519060/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.2,
        releaseYear: 2023,
        subtitle: 'Military Shooter, Multiplayer',
      },
    ],
  },

  'battlefield 2042': {
    title: 'Battlefield 2042',
    subtitle: 'Near-Future Warfare 2042, Featured, 128 Players',
    rank: 132,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1517290/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1517290/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/257081132/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1517290/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1517290/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1517290/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1517290/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1517290/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1517290/header.jpg',
    ],
    description:
      'Battlefield 1 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1517290/Battlefield_2042/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (97 320)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (369 816)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 78,
      },
    },
    details: {
      genres: 'Near-Future Warfare 2042, Featured, 128 Players',
      publisher: 'Electronic Arts',
      developer: 'DICE',
      releaseDate: 'November 19, 2021',
      platform: 'PC (Windows, Steam), PS5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1517290/Battlefield_2042/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1517290/Battlefield_2042/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Battlefield 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238860/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2013,
        subtitle: 'Featured',
      },
      {
        title: 'Battlefield 1',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1238840/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2016,
        subtitle: 'World War I Battlefield, Featured',
      },
      {
        title: 'THE FINALS',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2073850/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2023,
        subtitle: 'Dynamic Shooter, Featured',
      },
      {
        title: 'Delta Force',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2507950/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2024,
        subtitle: 'Shooter, Featured',
      },
    ],
  },

  'far cry 3': {
    title: 'Far Cry 3',
    subtitle: 'Vaas Montenegro, Madness on a Tropical Island, Stealth',
    rank: 133,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/220240/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220240/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220240/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220240/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220240/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220240/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220240/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/220240/header.jpg',
    ],
    description:
      'Battlefield 4 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/220240/Far_Cry_3/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (103 690)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (394 022)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 95,
      },
    },
    details: {
      genres: 'Vaas Montenegro, Madness on a Tropical Island, Stealth',
      publisher: 'Ubisoft',
      developer: 'Ubisoft Montreal',
      releaseDate: 'November 29, 2012',
      platform: 'PC (Windows, Steam), PlayStation, Xbox',
      socialLinks: {
        web: 'https://store.steampowered.com/app/220240/Far_Cry_3/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/220240/Far_Cry_3/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Far Cry 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/552520/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2018,
        subtitle: 'Featured',
      },
      {
        title: 'Far Cry 6',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2369390/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.4,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
      {
        title: 'Dying Light',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/239140/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2015,
        subtitle: 'Parkour, First-Person Zombie Action',
      },
      {
        title: 'Grand Theft Auto V',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'far cry 5': {
    title: 'Far Cry 5',
    subtitle: 'Featured',
    rank: 134,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/552520/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/552520/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/552520/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/552520/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/552520/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/552520/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/552520/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/552520/header.jpg',
    ],
    description:
      'Far Cry 5 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/552520/Far_Cry_5/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (101 660)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (386 308)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 88,
      },
    },
    details: {
      genres: 'Featured',
      publisher: 'Ubisoft',
      developer: 'Ubisoft Montreal',
      releaseDate: 'March 27, 2018',
      platform: 'PC (Windows, Steam), PlayStation 4, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/552520/Far_Cry_5/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/552520/Far_Cry_5/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Far Cry 3',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/220240/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2012,
        subtitle: 'Vaas Montenegro, Madness on a Tropical Island',
      },
      {
        title: 'Far Cry 6',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2369390/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.4,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
      {
        title: 'Just Cause 3',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/225540/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2015,
        subtitle: 'Featured',
      },
      {
        title: 'S.T.A.L.K.E.R. 2: Heart of Chornobyl',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1643320/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.3,
        releaseYear: 2024,
        subtitle: 'Featured, Atmospheric Shooter',
      },
    ],
  },

  'far cry 6': {
    title: 'Far Cry 6',
    subtitle: 'Featured',
    rank: 135,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2369390/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2369390/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2369390/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2369390/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2369390/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2369390/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2369390/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/2369390/header.jpg',
    ],
    description:
      'Far Cry 3 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/2369390/Far_Cry_6/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (100 680)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (382 584)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 84,
      },
    },
    details: {
      genres: 'Featured',
      publisher: 'Ubisoft',
      developer: 'Ubisoft Toronto',
      releaseDate: 'May 11, 2023',
      platform: 'PC (Windows, Steam), PS5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/2369390/Far_Cry_6/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/2369390/Far_Cry_6/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Far Cry 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/552520/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2018,
        subtitle: 'Featured',
      },
      {
        title: 'Far Cry 3',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/220240/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2012,
        subtitle: 'Vaas Montenegro, Madness on a Tropical Island',
      },
      {
        title: 'Just Cause 4 Reloaded',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/517630/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.1,
        releaseYear: 2018,
        subtitle: 'Featured',
      },
      {
        title: 'Cyberpunk 2077',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2020,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'just cause 3': {
    title: 'Just Cause 3',
    subtitle: 'Featured',
    rank: 136,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/225540/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/225540/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/225540/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/225540/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/225540/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/225540/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/225540/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/225540/header.jpg',
    ],
    description:
      'Far Cry 5 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/225540/Just_Cause_3/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (102 850)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (390 830)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 89,
      },
    },
    details: {
      genres: 'Featured',
      publisher: 'Square Enix',
      developer: 'Avalanche Studios',
      releaseDate: 'December 1, 2015',
      platform: 'PC (Windows, Steam), PlayStation 4, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/225540/Just_Cause_3/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/225540/Just_Cause_3/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Just Cause 4 Reloaded',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/517630/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.1,
        releaseYear: 2018,
        subtitle: 'Featured',
      },
      {
        title: 'Grand Theft Auto V',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Far Cry 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/552520/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2018,
        subtitle: 'Featured',
      },
      {
        title: 'Watch_Dogs 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/447040/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2016,
        subtitle: 'Hackers, Featured',
      },
    ],
  },

  'just cause 4 reloaded': {
    title: 'Just Cause 4 Reloaded',
    subtitle: 'Featured, Sandbox of Chaos',
    rank: 137,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/517630/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/517630/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/517630/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/517630/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/517630/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/517630/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/517630/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/517630/header.jpg',
    ],
    description:
      'Just Cause 4 Reloaded delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/517630/Just_Cause_4_Reloaded/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (100 470)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (381 786)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 81,
      },
    },
    details: {
      genres: 'Featured, Sandbox of Chaos',
      publisher: 'Square Enix',
      developer: 'Avalanche Studios',
      releaseDate: 'December 4, 2018',
      platform: 'PC (Windows, Steam), PlayStation 4, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/517630/Just_Cause_4_Reloaded/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/517630/Just_Cause_4_Reloaded/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Just Cause 3',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/225540/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2015,
        subtitle: 'Featured',
      },
      {
        title: 'Battlefield 2042',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1517290/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 7.8,
        releaseYear: 2021,
        subtitle: 'Near-Future Warfare 2042, Featured',
      },
      {
        title: 'Far Cry 6',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2369390/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.4,
        releaseYear: 2021,
        subtitle: 'Featured',
      },
      {
        title: 'Grand Theft Auto V',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'arma 3': {
    title: 'Arma 3',
    subtitle: 'Simulator, Realism, Modding, Altis',
    rank: 138,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/107410/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/107410/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/107410/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/107410/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/107410/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/107410/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/107410/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/107410/header.jpg',
    ],
    description:
      'Just Cause 3 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/107410/Arma_3/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (105 090)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (399 342)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 93,
      },
    },
    details: {
      genres: 'Simulator, Realism, Modding, Altis',
      publisher: 'Bohemia Interactive',
      developer: 'Bohemia Interactive',
      releaseDate: 'September 12, 2013',
      platform: 'PC (Windows, Steam, Linux)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/107410/Arma_3/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/107410/Arma_3/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'DayZ',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/221100/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2018,
        subtitle: 'Zombie Apocalypse, Featured',
      },
      {
        title: 'Escape from Tarkov',
        posterUrl:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2017,
        subtitle: 'Hardcore Realistic Extraction Shooter, Raids',
      },
      {
        title: 'War Thunder',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/236390/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.9,
        releaseYear: 2013,
        subtitle: 'Military Tank Simulator, Featured',
      },
      {
        title: 'Ready or Not',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1144200/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2023,
        subtitle: 'Tactical SWAT Simulator, Realism',
      },
    ],
  },

  'mortal kombat x': {
    title: 'Mortal Kombat X',
    subtitle: 'Featured',
    rank: 139,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/307780/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/307780/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/307780/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/307780/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/307780/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/307780/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/307780/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/307780/header.jpg',
    ],
    description:
      'DayZ delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/307780/Mortal_Kombat_X/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (104 110)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (395 618)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 89,
      },
    },
    details: {
      genres: 'Featured',
      publisher: 'Warner Bros. Games',
      developer: 'NetherRealm Studios',
      releaseDate: 'April 14, 2015',
      platform: 'PC (Windows, Steam), PlayStation 4, Xbox One',
      socialLinks: {
        web: 'https://store.steampowered.com/app/307780/Mortal_Kombat_X/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/307780/Mortal_Kombat_X/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Brawlhalla',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/291550/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.4,
        releaseYear: 2017,
        subtitle: 'Featured, Arena',
      },
      {
        title: 'NARAKA: BLADEPOINT',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1203220/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2021,
        subtitle: 'Martial Arts Battle Royale, Parkour',
      },
      {
        title: 'Devil May Cry 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/601150/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Action, Adventure',
      },
      {
        title: 'Black Myth: Wukong',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2024,
        subtitle: 'Action-RPG, Mythology',
      },
    ],
  },

  'alan wake': {
    title: 'Alan Wake',
    subtitle: 'Psychological Thriller, Featured',
    rank: 140,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/108710/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/108710/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/108710/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/108710/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/108710/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/108710/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/108710/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/108710/header.jpg',
    ],
    description:
      'Brawlhalla delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/108710/Alan_Wake/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (105 580)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (401 204)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Psychological Thriller, Featured',
      publisher: 'Xbox Game Studios',
      developer: 'Remedy Entertainment',
      releaseDate: 'February 16, 2012',
      platform: 'PC (Windows, Steam)',
      socialLinks: {
        web: 'https://store.steampowered.com/app/108710/Alan_Wake/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/108710/Alan_Wake/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Resident Evil 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2023,
        subtitle: 'Masterpiece survival-horror, Featured',
      },
      {
        title: 'Resident Evil 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/883710/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2019,
        subtitle: 'Featured',
      },
      {
        title: 'Detroit: Become Human',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1222140/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2020,
        subtitle: 'Featured, Cyberpunk',
      },
      {
        title: 'Resident Evil 7 Biohazard',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/418370/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2017,
        subtitle: 'Featured, Baker Family in Louisiana',
      },
    ],
  },

  'resident evil / biohazard hd remaster': {
    title: 'Resident Evil / biohazard HD REMASTER',
    subtitle: 'Featured, Classic Horror',
    rank: 141,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/304240/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304240/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304240/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304240/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304240/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304240/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/304240/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/304240/header.jpg',
    ],
    description:
      'Resident Evil 4 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/304240/Resident_Evil/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (106 000)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (402 800)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Featured, Classic Horror',
      publisher: 'CAPCOM Co., Ltd.',
      developer: 'CAPCOM Co., Ltd.',
      releaseDate: 'January 20, 2015',
      platform: 'PC (Windows, Steam), Consoles',
      socialLinks: {
        web: 'https://store.steampowered.com/app/304240/Resident_Evil/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/304240/Resident_Evil/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Resident Evil 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/883710/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2019,
        subtitle: 'Featured',
      },
      {
        title: 'Resident Evil 3',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/952060/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2020,
        subtitle: 'Jill Valentine, Featured',
      },
      {
        title: 'Resident Evil 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2023,
        subtitle: 'Masterpiece survival-horror, Featured',
      },
      {
        title: 'Resident Evil 7 Biohazard',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/418370/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2017,
        subtitle: 'Featured, Baker Family in Louisiana',
      },
    ],
  },

  'resident evil 2': {
    title: 'Resident Evil 2',
    subtitle: 'Featured',
    rank: 142,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/883710/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/883710/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/883710/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/883710/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/883710/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/883710/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/883710/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/883710/header.jpg',
    ],
    description:
      'Resident Evil 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/883710/Resident_Evil_2/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (108 170)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (411 046)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Featured',
      publisher: 'CAPCOM Co., Ltd.',
      developer: 'CAPCOM Co., Ltd.',
      releaseDate: 'January 25, 2019',
      platform: 'PC (Windows, Steam), PS5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/883710/Resident_Evil_2/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/883710/Resident_Evil_2/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Resident Evil 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2023,
        subtitle: 'Masterpiece survival-horror, Featured',
      },
      {
        title: 'Resident Evil 3',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/952060/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.6,
        releaseYear: 2020,
        subtitle: 'Jill Valentine, Featured',
      },
      {
        title: 'Resident Evil Village',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1196590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2021,
        subtitle: 'Featured, Werewolves',
      },
      {
        title: 'Alan Wake',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/108710/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2012,
        subtitle: 'Psychological Thriller, Featured',
      },
    ],
  },

  'resident evil 3': {
    title: 'Resident Evil 3',
    subtitle: 'Jill Valentine, Featured',
    rank: 143,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/952060/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/952060/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/952060/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/952060/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/952060/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/952060/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/952060/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/952060/header.jpg',
    ],
    description:
      'Resident Evil 4 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/952060/Resident_Evil_3/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (104 740)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (398 012)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 86,
      },
    },
    details: {
      genres: 'Jill Valentine, Featured',
      publisher: 'CAPCOM Co., Ltd.',
      developer: 'CAPCOM Co., Ltd.',
      releaseDate: 'April 3, 2020',
      platform: 'PC (Windows, Steam), PS5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/952060/Resident_Evil_3/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/952060/Resident_Evil_3/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Resident Evil 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/883710/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2019,
        subtitle: 'Featured',
      },
      {
        title: 'Resident Evil 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2023,
        subtitle: 'Masterpiece survival-horror, Featured',
      },
      {
        title: 'Resident Evil 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/21690/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2009,
        subtitle: 'African Heat, Chris & Sheva Co-op',
      },
      {
        title: 'Dying Light',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/239140/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2015,
        subtitle: 'Parkour, First-Person Zombie Action',
      },
    ],
  },

  'resident evil 4': {
    title: 'Resident Evil 4',
    subtitle: 'Masterpiece survival-horror, Featured',
    rank: 144,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
    ],
    description:
      'Resident Evil 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/2050650/Resident_Evil_4/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (109 010)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (414 238)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 97,
      },
    },
    details: {
      genres: 'Masterpiece survival-horror, Featured',
      publisher: 'CAPCOM Co., Ltd.',
      developer: 'CAPCOM Co., Ltd.',
      releaseDate: 'March 24, 2023',
      platform: 'PC (Windows, Steam), PlayStation 5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/2050650/Resident_Evil_4/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/2050650/Resident_Evil_4/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Resident Evil 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/883710/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2019,
        subtitle: 'Featured',
      },
      {
        title: 'Resident Evil Village',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1196590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2021,
        subtitle: 'Featured, Werewolves',
      },
      {
        title: 'Resident Evil 7 Biohazard',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/418370/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2017,
        subtitle: 'Featured, Baker Family in Louisiana',
      },
      {
        title: 'The Witcher 3: Wild Hunt',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2015,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'resident evil 5': {
    title: 'Resident Evil 5',
    subtitle: 'African Heat, Chris & Sheva Co-op, Albert Wesker',
    rank: 145,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/21690/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/21690/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/21690/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/21690/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/21690/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/21690/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/21690/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/21690/header.jpg',
    ],
    description:
      'Resident Evil 2 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/21690/Resident_Evil_5/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (106 280)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (403 864)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 88,
      },
    },
    details: {
      genres: 'African Heat, Chris & Sheva Co-op, Albert Wesker',
      publisher: 'CAPCOM Co., Ltd.',
      developer: 'CAPCOM Co., Ltd.',
      releaseDate: 'September 15, 2009',
      platform: 'PC (Windows, Steam), Consoles',
      socialLinks: {
        web: 'https://store.steampowered.com/app/21690/Resident_Evil_5/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/21690/Resident_Evil_5/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Resident Evil 6',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/221040/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8,
        releaseYear: 2013,
        subtitle: 'Featured, 4 Campaigns',
      },
      {
        title: 'Resident Evil 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2023,
        subtitle: 'Masterpiece survival-horror, Featured',
      },
      {
        title: 'Left 4 Dead 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/550/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2009,
        subtitle: 'Shooter, Featured',
      },
      {
        title: 'Dying Light',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/239140/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2015,
        subtitle: 'Parkour, First-Person Zombie Action',
      },
    ],
  },

  'resident evil 6': {
    title: 'Resident Evil 6',
    subtitle: 'Featured, 4 Campaigns, Co-op',
    rank: 146,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/221040/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/221040/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/221040/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/221040/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/221040/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/221040/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/221040/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/221040/header.jpg',
    ],
    description:
      'Resident Evil 6 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/221040/Resident_Evil_6/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (103 900)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (394 820)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 80,
      },
    },
    details: {
      genres: 'Featured, 4 Campaigns, Co-op',
      publisher: 'CAPCOM Co., Ltd.',
      developer: 'CAPCOM Co., Ltd.',
      releaseDate: 'March 22, 2013',
      platform: 'PC (Windows, Steam), Consoles',
      socialLinks: {
        web: 'https://store.steampowered.com/app/221040/Resident_Evil_6/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/221040/Resident_Evil_6/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Resident Evil 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/21690/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.8,
        releaseYear: 2009,
        subtitle: 'African Heat, Chris & Sheva Co-op',
      },
      {
        title: 'Resident Evil 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/883710/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2019,
        subtitle: 'Featured',
      },
      {
        title: 'Resident Evil 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2023,
        subtitle: 'Masterpiece survival-horror, Featured',
      },
      {
        title: 'Devil May Cry 5',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/601150/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2019,
        subtitle: 'Action, Adventure',
      },
    ],
  },

  'resident evil 7 biohazard': {
    title: 'Resident Evil 7 Biohazard',
    subtitle: 'Featured, Baker Family in Louisiana, Horror',
    rank: 147,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/418370/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/418370/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/418370/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/418370/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/418370/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/418370/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/418370/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/418370/header.jpg',
    ],
    description:
      'Resident Evil 5 delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/418370/Resident_Evil_7_Biohazard/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (109 570)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (416 366)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 95,
      },
    },
    details: {
      genres: 'Featured, Baker Family in Louisiana, Horror',
      publisher: 'CAPCOM Co., Ltd.',
      developer: 'CAPCOM Co., Ltd.',
      releaseDate: 'January 24, 2017',
      platform: 'PC (Windows, Steam), PS5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/418370/Resident_Evil_7_Biohazard/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/418370/Resident_Evil_7_Biohazard/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Resident Evil Village',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1196590/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2021,
        subtitle: 'Featured, Werewolves',
      },
      {
        title: 'Resident Evil 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/883710/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2019,
        subtitle: 'Featured',
      },
      {
        title: 'Phasmophobia',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/739630/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2020,
        subtitle: 'Ghost Hunting, Psychological Horror',
      },
      {
        title: 'Alan Wake',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/108710/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2012,
        subtitle: 'Psychological Thriller, Featured',
      },
    ],
  },

  'resident evil village': {
    title: 'Resident Evil Village',
    subtitle: 'Featured, Werewolves',
    rank: 148,
    miniPosterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1196590/header.jpg',
    bannerUrl:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1196590/library_hero.jpg',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1196590/header.jpg',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1196590/library_hero.jpg',
      // You can insert links to your own screenshots here:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1196590/capsule_616x353.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1196590/header.jpg',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1196590/page_bg_generated_v6b.jpg',
      'https://cdn.akamai.steamstatic.com/steam/apps/1196590/header.jpg',
    ],
    description:
      'Resident Evil Village delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Steam',
      type: 'steam',
      url: 'https://store.steampowered.com/app/1196590/Resident_Evil_Village/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Overwhelmingly Positive (109 990)',
        tone: 'overwhelmingly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Overwhelmingly Positive (417 962)',
        tone: 'overwhelmingly-positive',
      },
      openCritic: {
        tier: 'TOP 100',
        score: 95,
      },
    },
    details: {
      genres: 'Featured, Werewolves',
      publisher: 'CAPCOM Co., Ltd.',
      developer: 'CAPCOM Co., Ltd.',
      releaseDate: 'May 7, 2021',
      platform: 'PC (Windows, Steam), PS5, Xbox Series X/S',
      socialLinks: {
        web: 'https://store.steampowered.com/app/1196590/Resident_Evil_Village/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'Steam',
        url: 'https://store.steampowered.com/app/1196590/Resident_Evil_Village/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Resident Evil 7 Biohazard',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/418370/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2017,
        subtitle: 'Featured, Baker Family in Louisiana',
      },
      {
        title: 'Resident Evil 4',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2023,
        subtitle: 'Masterpiece survival-horror, Featured',
      },
      {
        title: 'Resident Evil 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/883710/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2019,
        subtitle: 'Featured',
      },
      {
        title: 'Black Myth: Wukong',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2024,
        subtitle: 'Action-RPG, Mythology',
      },
    ],
  },

  'arc raiders': {
    title: 'ARC Raiders',
    subtitle: 'Shooter, Featured',
    rank: 149,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/257081132/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      // You can insert links to your own screenshots here:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    ],
    description:
      'Resident Evil 7 Biohazard delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Official Website',
      type: 'web',
      url: 'https://arcraiders.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (109 360)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (415 568)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 92,
      },
    },
    details: {
      genres: 'Shooter, Featured',
      publisher: 'Embark Studios',
      developer: 'Embark Studios',
      releaseDate: '2025',
      platform: 'PC (Windows, Steam), PlayStation 5, Xbox Series X/S',
      socialLinks: {
        web: 'https://arcraiders.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://arcraiders.com/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'THE FINALS',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2073850/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2023,
        subtitle: 'Dynamic Shooter, Featured',
      },
      {
        title: 'Escape from Tarkov',
        posterUrl:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.1,
        releaseYear: 2017,
        subtitle: 'Hardcore Realistic Extraction Shooter, Raids',
      },
      {
        title: 'Warhammer 40,000: Space Marine 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2183900/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2024,
        subtitle: 'Shooter, Co-op',
      },
      {
        title: "Baldur's Gate 3",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2023,
        subtitle: 'CRPG, Adventure',
      },
    ],
  },

  'r.e.p.o.': {
    title: 'R.E.P.O.',
    subtitle: 'Tactical Co-op Stealth Horror, Featured',
    rank: 150,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      // You can insert links to your own screenshots here:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    ],
    description:
      'THE FINALS delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Official Website',
      type: 'web',
      url: 'https://store.steampowered.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (109 080)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (414 504)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 90,
      },
    },
    details: {
      genres: 'Tactical Co-op Stealth Horror, Featured',
      publisher: 'Indie Publisher',
      developer: 'Repo Team',
      releaseDate: '2025',
      platform: 'PC (Windows, Steam)',
      socialLinks: {
        web: 'https://store.steampowered.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://store.steampowered.com/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Lethal Company',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1966720/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.8,
        releaseYear: 2023,
        subtitle: 'Co-op Space Horror, Featured',
      },
      {
        title: 'Phasmophobia',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/739630/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2020,
        subtitle: 'Ghost Hunting, Psychological Horror',
      },
      {
        title: 'Ready or Not',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1144200/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2023,
        subtitle: 'Tactical SWAT Simulator, Realism',
      },
      {
        title: 'PAYDAY 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/218620/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2013,
        subtitle: 'Bank Heists, Featured',
      },
    ],
  },

  peak: {
    title: 'Peak',
    subtitle: 'Featured, Climbing Physics, Mountains',
    rank: 151,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
      // You can insert links to your own screenshots here:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    ],
    description:
      'Lethal Company delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Official Website',
      type: 'web',
      url: 'https://store.steampowered.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (109 500)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (416 100)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 90,
      },
    },
    details: {
      genres: 'Featured, Climbing Physics, Mountains',
      publisher: 'Peak Studio',
      developer: 'Peak Studio',
      releaseDate: '2025',
      platform: 'PC (Windows, Steam)',
      socialLinks: {
        web: 'https://store.steampowered.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://store.steampowered.com/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Chained Together',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2567870/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2024,
        subtitle: 'Co-op Platformer, Featured',
      },
      {
        title: 'Subnautica',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/264710/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2018,
        subtitle: 'Underwater, Featured',
      },
      {
        title: 'The Forest',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/242760/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.5,
        releaseYear: 2018,
        subtitle: 'Featured, Mutant Cannibals',
      },
      {
        title: 'BeamNG.drive',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/284160/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2015,
        subtitle: 'Featured',
      },
    ],
  },

  'echoes of aincrad': {
    title: 'Echoes of Aincrad',
    subtitle: 'Anime MMORPG, Featured, 100 Floors of Aincrad',
    rank: 152,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
      // You can insert links to your own screenshots here:
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
    ],
    description:
      'Chained Together delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Official Website',
      type: 'web',
      url: 'https://store.steampowered.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (110 270)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (419 026)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: 91,
      },
    },
    details: {
      genres: 'Anime MMORPG, Featured, 100 Floors of Aincrad',
      publisher: 'Aincrad Project',
      developer: 'Aincrad Project',
      releaseDate: '2025',
      platform: 'PC (Windows, Steam)',
      socialLinks: {
        web: 'https://store.steampowered.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://store.steampowered.com/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Genshin Impact',
        posterUrl:
          'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9.2,
        releaseYear: 2020,
        subtitle: 'Anime-RPG, Open World Teyvat',
      },
      {
        title: 'Black Desert',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/582660/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.5,
        releaseYear: 2017,
        subtitle: 'MMORPG, Featured',
      },
      {
        title: 'World of Warcraft',
        posterUrl:
          'https://cdn.discordapp.com/app-icons/356875762940379136/52a7ab86855bd1f28cb0871daecef1ee.webp?size=160&keep_aspect_ratio=true',
        type: ShowcaseMediaType.GAME,
        rating: 9.4,
        releaseYear: 2004,
        subtitle: 'RPG, Azeroth',
      },
      {
        title: 'Wuthering Waves',
        posterUrl:
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2024,
        subtitle: 'Anime, Action-RPG',
      },
    ],
  },

  'mecha chameleon': {
    title: 'MECHA CHAMELEON',
    subtitle: 'Mecha Action, Featured, Tactics',
    rank: 153,
    miniPosterUrl:
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    bannerUrl:
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    videoUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4',
    videoDuration: '1:30',
    videoThumbnail:
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    screenshots: [
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
      // You can insert links to your own screenshots here:
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    ],
    description:
      'Genshin Impact delivers an acclaimed and immersive experience featuring deep mechanics, rich atmospheric design, and high replayability. Celebrated by millions of players and fans worldwide across competitive and story-driven communities.',
    platformButton: {
      label: 'Official Website',
      type: 'web',
      url: 'https://store.steampowered.com/',
    },
    reviews: {
      recentReviews: {
        label: 'Recent Reviews',
        count: 'Very Positive (109 990)',
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: 'Language Reviews',
        language: 'English',
        count: 'Very Positive (417 962)',
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'STRONG',
        score: 89,
      },
    },
    details: {
      genres: 'Mecha Action, Featured, Tactics',
      publisher: 'Mecha Studio',
      developer: 'Mecha Studio',
      releaseDate: '2025',
      platform: 'PC (Windows, Steam)',
      socialLinks: {
        web: 'https://store.steampowered.com/',
        twitter: 'https://twitter.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: 'https://twitch.tv',
      },
      metadataSource: {
        name: 'IGDB',
        url: 'https://store.steampowered.com/',
      },
      developerClaimUrl: 'https://partner.steamgames.com/',
    },
    similarItems: [
      {
        title: 'Titanfall 2',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1237970/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.7,
        releaseYear: 2020,
        subtitle: 'Featured, Parkour',
      },
      {
        title: 'THE FINALS',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/2073850/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 8.7,
        releaseYear: 2023,
        subtitle: 'Dynamic Shooter, Featured',
      },
      {
        title: 'Warframe',
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/230410/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9,
        releaseYear: 2013,
        subtitle: 'Featured, Co-op Action',
      },
      {
        title: "Baldur's Gate 3",
        posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
        type: ShowcaseMediaType.GAME,
        rating: 9.6,
        releaseYear: 2023,
        subtitle: 'CRPG, Adventure',
      },
    ],
  },
};

/**
 * Deterministically generates a rich 1-to-1 MediaDetailPayload for ANY item
 * so even custom or unlisted titles render completely without empty holes.
 */
export function getMediaDetails(item: MediaModalItem): MediaDetailPayload {
  const normTitle = (item.title || '').trim().toLowerCase();

  const ALIAS_MAP: Record<string, string> = {
    sao: 'sword art online',
    cs2: 'counter-strike 2',
    'cs:go': 'counter-strike 2',
    csgo: 'counter-strike 2',
    'counter-strike': 'counter-strike 2',
    'the witcher 3': 'the witcher 3: wild hunt',
    'witcher 3': 'the witcher 3: wild hunt',
    'baldurs gate 3': "baldur's gate 3",
    'gta 5': 'grand theft auto v',
    'gta v': 'grand theft auto v',
    'dark souls 3': 'dark souls iii',
    ds3: 'dark souls iii',
    'demon slayer': 'demon slayer: kimetsu no yaiba',
    kuroko: "kuroko's basketball",
    'kuroko no basket': "kuroko's basketball",
    "kuroko's basketball": "kuroko's basketball",
    'kuroko’s basketball': "kuroko's basketball",
    "kuroko's bassketball": "kuroko's basketball",
    dmc5: 'devil may cry 5',
    'dmc 5': 'devil may cry 5',
    'mobile legends': 'mobile legends: bang bang',
    mlbb: 'mobile legends: bang bang',
    haikyuu: 'haikyuu!!',
    haikyu: 'haikyuu!!',
    kirito: 'sword art online',
    'code geass: lelouch of the rebellion': 'code geass: lelouch of the rebellion',
    lelouch: 'code geass: lelouch of the rebellion',
    'great teacher onizuka (gto)': 'great teacher onizuka (gto)',
    onizuka: 'great teacher onizuka (gto)',
    gto: 'great teacher onizuka (gto)',
    'hunter x hunter (2011)': 'hunter x hunter (2011)',
    hxh: 'hunter x hunter (2011)',
    'spirited away': 'spirited away',
    'tengen toppa gurren lagann': 'tengen toppa gurren lagann',
    berserk: 'berserk',
    guts: 'berserk',
    'steins;gate': 'steins;gate',
    'steins gate': 'steins;gate',
    'one piece': 'one piece',
    luffy: 'one piece',
    "frieren: beyond journey's end": "frieren: beyond journey's end",
    frieren: "frieren: beyond journey's end",
    gintama: 'gintama',
    'vinland saga': 'vinland saga',
    'basketball kuroko': "kuroko's basketball",
    'your name (kimi no na wa)': 'your name (kimi no na wa)',
    'kimi no na wa': 'your name (kimi no na wa)',
    'a silent voice (koe no katachi)': 'a silent voice (koe no katachi)',
    'voice shape': 'a silent voice (koe no katachi)',
    'koe no katachi': 'a silent voice (koe no katachi)',
    volleyball: 'haikyuu!!',
    'naruto: shippuden': 'naruto: shippuden',
    naruto: 'naruto: shippuden',
    'boruto: naruto next generations': 'boruto: naruto next generations',
    boruto: 'boruto: naruto next generations',
    'bleach: thousand-year blood war': 'bleach',
    bleach: 'bleach',
    'mob psycho 100': 'mob psycho 100',
    'mob psycho': 'mob psycho 100',
    'one punch man': 'one punch man',
    're:zero - starting life in another world': 're:zero - starting life in another world',
    're:zero': 're:zero - starting life in another world',
    monster: 'monster',
    'grand blue dreaming': 'grand blue dreaming',
    'the endless ocean': 'grand blue dreaming',
    'grand blue': 'grand blue dreaming',
    'chainsaw man': 'chainsaw man',
    'hellsing ultimate': 'hellsing ultimate',
    hellsing: 'hellsing ultimate',
    'initial d first stage': 'initial d first stage',
    ae86: 'initial d first stage',
    'initial d': 'initial d first stage',
    dororo: 'dororo',
    'solo leveling': 'solo leveling',
    'magic battle': 'jujutsu kaisen',
    'the disappearance of haruhi suzumiya': 'the disappearance of haruhi suzumiya',
    haruhi: 'the disappearance of haruhi suzumiya',
    'rascal does not dream of bunny girl senpai': 'rascal does not dream of bunny girl senpai',
    'bunny girl senpai': 'rascal does not dream of bunny girl senpai',
    'dreaming girl': 'rascal does not dream of bunny girl senpai',
    'the tunnel to summer, the exit of goodbyes': 'the tunnel to summer, the exit of goodbyes',
    'tunnel into summer': 'the tunnel to summer, the exit of goodbyes',
    'exit of farewells': 'the tunnel to summer, the exit of goodbyes',
    'k-on!': 'k-on!',
    kayon: 'k-on!',
    keion: 'k-on!',
    'k-on': 'k-on!',
    'spy x family': 'spy x family',
    'spy family': 'spy x family',
    overlord: 'overlord',
    'neon genesis evangelion': 'neon genesis evangelion',
    evangelion: 'neon genesis evangelion',
    'that time i got reincarnated as a slime': 'that time i got reincarnated as a slime',
    'reincarnation as a slime': 'that time i got reincarnated as a slime',
    'kaguya-sama: love is war': 'kaguya-sama: love is war',
    'kaguya sama': 'kaguya-sama: love is war',
    'love is war': 'kaguya-sama: love is war',
    'the fragrant flower blooms with dignity': 'the fragrant flower blooms with dignity',
    'fragrant flower blooms with dignity': 'the fragrant flower blooms with dignity',
    'my hero academia': 'my hero academia',
    'my hero': 'my hero academia',
    ', ': 'my hero academia',
    horimiya: 'horimiya',
    horimia: 'horimiya',
    'the angel next door spoils me rotten': 'the angel next door spoils me rotten',
    'the angel next door': 'the angel next door spoils me rotten',
    'soul eater': 'soul eater',
    'classroom of the elite': 'classroom of the elite',
    'welcome to classroom of excellence': 'classroom of the elite',
    'my dress-up darling': 'my dress-up darling',
    'this porcelain doll fell in love': 'my dress-up darling',
    'the quintessential quintuplets': 'the quintessential quintuplets',
    'five brides': 'the quintessential quintuplets',
    quintuplets: 'the quintessential quintuplets',
    'the pet girl of sakurasou': 'the pet girl of sakurasou',
    'the cat from sakurasou': 'the pet girl of sakurasou',
    sakurasou: 'the pet girl of sakurasou',
    'arifureta: from commonplace to world’s strongest':
      'arifureta: from commonplace to world’s strongest',
    arifureta: 'arifureta: from commonplace to world’s strongest',
    "konosuba: god's blessing on this wonderful world!":
      "konosuba: god's blessing on this wonderful world!",
    'the goddess blesses this beautiful world': "konosuba: god's blessing on this wonderful world!",
    konosuba: "konosuba: god's blessing on this wonderful world!",
    'in another world with my smartphone': 'in another world with my smartphone',
    'in another world with a smartphone': 'in another world with my smartphone',
    "wise man's grandchild": "wise man's grandchild",
    'the sage': "wise man's grandchild",
    's grandchild': "wise man's grandchild",
    'the eminence in shadow': 'the eminence in shadow',
    'climbing in the shadows': 'the eminence in shadow',
    'eminence in shadow': 'the eminence in shadow',
    'the rising of the shield hero': 'the rising of the shield hero',
    'death march to the parallel world rhapsody': 'death march to the parallel world rhapsody',
    'death march into the rhapsody of a parallel world':
      'death march to the parallel world rhapsody',
    'is it wrong to try to pick up girls in a dungeon?':
      'is it wrong to try to pick up girls in a dungeon?',
    "maybe i'll meet you in the dungeon": 'is it wrong to try to pick up girls in a dungeon?',
    'the misfit of demon king academy': 'the misfit of demon king academy',
    hyouka: 'hyouka',
    'assassination classroom': 'assassination classroom',
    'assasination classroom': 'assassination classroom',
    'the irregular at magic high school': 'the irregular at magic high school',
    'my teen romantic comedy snafu': 'my teen romantic comedy snafu',
    oregairu: 'my teen romantic comedy snafu',
    'the seven deadly sins': 'the seven deadly sins',
    'fullmetal alchemist: brotherhood': 'fullmetal alchemist: brotherhood',
    fma: 'fullmetal alchemist: brotherhood',
    fmab: 'fullmetal alchemist: brotherhood',
    aot: 'attack on titan',
    "jojo's bizarre adventure": "jojo's bizarre adventure",
    jojo: "jojo's bizarre adventure",

    // Game Aliases
    'cs 1.6': 'counter-strike 1.6',
    'cs1.6': 'counter-strike 1.6',
    '1.6': 'counter-strike 1.6',
    lol: 'league of legends',
    val: 'valorant',
    apex: 'apex legends',
    ow: 'overwatch 2',
    ow2: 'overwatch 2',
    pubg: 'pubg: battlegrounds',
    r6: "tom clancy's rainbow six siege",
    r6s: "tom clancy's rainbow six siege",
    'rainbow six': "tom clancy's rainbow six siege",
    'rainbow six siege': "tom clancy's rainbow six siege",
    finals: 'the finals',
    naraka: 'naraka: bladepoint',
    tf2: 'team fortress 2',
    bg3: "baldur's gate 3",
    wukong: 'black myth: wukong',
    sm2: 'warhammer 40,000: space marine 2',
    'space marine 2': 'warhammer 40,000: space marine 2',
    rdr2: 'red dead redemption 2',
    'rdr 2': 'red dead redemption 2',
    'gta sa': 'grand theft auto: san andreas',
    'san andreas': 'grand theft auto: san andreas',
    skyrim: 'the elder scrolls v: skyrim special edition',
    fallout: 'fallout 4',
    'fallout 4': 'fallout 4',
    'gow ragnarok': 'god of war ragnarök',
    'god of war ragnarok': 'god of war ragnarök',
    gow: 'god of war',
    hogwarts: 'hogwarts legacy',
    'atomic heart': 'atomic heart',
    'stalker 2': 's.t.a.l.k.e.r. 2: heart of chornobyl',
    stalker: 's.t.a.l.k.e.r. 2: heart of chornobyl',
    'diablo 4': 'diablo iv',
    poe: 'path of exile',
    ds2: 'dark souls ii: scholar of the first sin',
    'dark souls 2': 'dark souls ii: scholar of the first sin',
    halo: 'halo: the master chief collection',
    'cod mw3': 'call of duty: modern warfare iii',
    'watch dogs 2': 'watch_dogs 2',
    're village': 'resident evil village',
  };

  const lookupKey = ALIAS_MAP[normTitle] || normTitle;

  // 1. Return exact curated match if available
  if (CURATED_MEDIA_CATALOG[lookupKey]) {
    const curated = CURATED_MEDIA_CATALOG[lookupKey];
    const isWideSteamHeader = Boolean(item.posterUrl && item.posterUrl.includes('/header.jpg'));
    const isGenericFallback = !item.posterUrl || item.posterUrl.includes('apps/570/header.jpg');
    const preferCurated = Boolean(
      curated.miniPosterUrl && (isGenericFallback || isWideSteamHeader || !item.posterUrl),
    );

    return {
      ...curated,
      miniPosterUrl: preferCurated
        ? curated.miniPosterUrl
        : item.posterUrl || curated.miniPosterUrl,
      title: curated.title || item.title,
    };
  }

  // 2. Deterministic generator based on type & title hash
  const title = item.title || 'Untitled';
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash << 5) - hash + title.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  const derivedRank = 1 + (absHash % 48);
  const derivedRating = item.rating || Number((7.5 + (absHash % 24) / 10).toFixed(1));
  const openCriticScore = Math.min(98, Math.max(78, Math.round(derivedRating * 10)));
  const derivedReviewsCount = 10000 + (absHash % 90000);

  const isGame = item.type === ShowcaseMediaType.GAME;
  const isAnime = item.type === ShowcaseMediaType.ANIME;
  const isSportsAnime =
    isAnime && /(?:basketball|kuroko|lock|haikyuu|slam|ippo|free|sports)/i.test(title);

  // Curated high-performance direct MP4 streaming trailers (0.1s load time)
  const sampleVideos = isGame
    ? [
        'https://cdn.cloudflare.steamstatic.com/steam/apps/256875461/movie480.mp4', // Elden Ring
        'https://cdn.cloudflare.steamstatic.com/steam/apps/257081132/movie480.mp4', // Cyberpunk 2077
        'https://cdn.cloudflare.steamstatic.com/steam/apps/256692021/movie480.mp4', // Dota 2
        'https://cdn.cloudflare.steamstatic.com/steam/apps/256972298/movie480.mp4', // CS2
        'https://cdn.cloudflare.steamstatic.com/steam/apps/256987424/movie480.mp4', // Baldur's Gate 3
        'https://cdn.cloudflare.steamstatic.com/steam/apps/256927226/movie480.mp4', // The Witcher 3
        'https://cdn.cloudflare.steamstatic.com/steam/apps/256728780/movie480.mp4', // Devil May Cry 5
      ]
    : isAnime
      ? isSportsAnime
        ? [
            'https://cdn.discordapp.com/app-assets/356875988589740042/store/1486740188892893284.mp4?size=3072',
          ]
        : [
            'https://cdn.cloudflare.steamstatic.com/steam/apps/256703995/movie480.mp4', // SAO
            'https://cdn.cloudflare.steamstatic.com/steam/apps/256666958/movie480.mp4', // Attack on Titan
            'https://cdn.cloudflare.steamstatic.com/steam/apps/256842621/movie480.mp4', // Demon Slayer
            'https://cdn.cloudflare.steamstatic.com/steam/apps/256974787/movie480.mp4', // Jujutsu Kaisen
          ]
      : [
          'https://cdn.discordapp.com/app-assets/356875988589740042/store/1486740188892893284.mp4?size=3072',
          'https://cdn.cloudflare.steamstatic.com/steam/apps/256875461/movie480.mp4',
        ];

  const videoUrl = sampleVideos[absHash % sampleVideos.length];

  // High-definition 1080p screenshots tailored specifically to the medium
  const gameScreenshots = [
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_943bf6fe62352757d9070c1d33e50b92fe8539f1.1920x1080.jpg?t=1787868578',
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_2f649b68d579bf87011487d29bc4ccbfdd97d34f.1920x1080.jpg?t=1784714077',
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/ss_5710298af2318afd9aa72449ef29ac4a2ef64d8e.1920x1080.jpg?t=1788333513',
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_c73bc54415178c07fef85f54ee26621728c77504.1920x1080.jpg?t=1777363040',
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/ss_ad8eee787704745ccdecdfde3a5cd2733704898d.1920x1080.jpg?t=1769535998',
    'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_796601d9d67faf53486eeb26d0724347cea67ddc.1920x1080.jpg?t=1784564069',
  ];

  const animeScreenshots = isSportsAnime
    ? [
        'https://cdn.myanimelist.net/images/anime/11/50453l.jpg',
        'https://cdn.myanimelist.net/images/anime/1258/126929l.jpg',
        'https://cdn.myanimelist.net/images/anime/11/75274l.jpg',
        'https://cdn.myanimelist.net/images/anime/9/56155l.jpg',
        'https://cdn.myanimelist.net/images/anime/4/68299l.jpg',
        'https://cdn.myanimelist.net/images/anime/10/78663l.jpg',
      ]
    : [
        'https://cdn.myanimelist.net/images/anime/11/39717l.jpg',
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/449800/ss_d97bb3eee60a98e0a040ac0f351504bb5bd68d15.1920x1080.jpg?t=1780891495',
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1490890/ss_098b736d17296bf0d2205795f7e3d5e0210bae42.1920x1080.jpg?t=1762753763',
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1877020/ss_35ba539268b35d55ee204417b1559020603a4eea.1920x1080.jpg?t=1734085250',
        'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/607890/ss_2ec43d93e9fc35865f1a698d02eac771906193c0.1920x1080.jpg?t=1750782337',
      ];

  const cinemaScreenshots = [
    'https://image.tmdb.org/t/p/original/rAiYTnrLEHV4iB4A9Xnwh8n8Keq.jpg',
    'https://image.tmdb.org/t/p/original/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg',
    'https://image.tmdb.org/t/p/original/pbrkL804c8yAv3zBZR4QPEafpAR.jpg',
    'https://image.tmdb.org/t/p/original/rLb2cw0iwgfFQMs900oo7j3UQ9.jpg',
    'https://image.tmdb.org/t/p/original/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg',
  ];

  const selectedPool = isGame ? gameScreenshots : isAnime ? animeScreenshots : cinemaScreenshots;
  const screenshots = [item.posterUrl, ...selectedPool].filter(Boolean);

  const subtitle =
    item.subtitle ||
    (isGame
      ? 'Action, Adventure, RPG'
      : isAnime
        ? 'Shounen, Fantasy, Action'
        : 'Drama, Thriller, Sci-Fi');

  const defaultDescription =
    item.userComment ||
    `${title} offers an immersive experience featuring rich narratives, distinct art direction, and memorable characters. Enjoyed by millions of fans worldwide with ongoing updates and a dedicated community.`;

  const platformButtonType = isGame ? 'steam' : isAnime ? 'anilist' : 'tmdb';

  const platformButtonLabel = isGame ? 'Steam' : isAnime ? 'AniList' : 'TMDB';

  const similarItems: SimilarMediaItem[] = isGame
    ? [
        {
          title: 'Elden Ring',
          posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
          type: ShowcaseMediaType.GAME,
          rating: 9.7,
          releaseYear: 2022,
          subtitle: 'Souls-like, RPG',
        },
        {
          title: 'Cyberpunk 2077',
          posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
          type: ShowcaseMediaType.GAME,
          rating: 9.0,
          releaseYear: 2020,
          subtitle: 'RPG, Open World',
        },
        {
          title: 'The Witcher 3: Wild Hunt',
          posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
          type: ShowcaseMediaType.GAME,
          rating: 9.8,
          releaseYear: 2015,
          subtitle: 'Action RPG',
        },
        {
          title: "Baldur's Gate 3",
          posterUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
          type: ShowcaseMediaType.GAME,
          rating: 9.6,
          releaseYear: 2023,
          subtitle: 'CRPG, Adventure',
        },
      ]
    : isAnime
      ? [
          {
            title: 'Attack on Titan',
            posterUrl: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg',
            type: ShowcaseMediaType.ANIME,
            rating: 9.2,
            releaseYear: 2013,
            subtitle: 'Action, Drama',
          },
          {
            title: 'Death Note',
            posterUrl: 'https://cdn.myanimelist.net/images/anime/9/9453l.jpg',
            type: ShowcaseMediaType.ANIME,
            rating: 9.1,
            releaseYear: 2006,
            subtitle: 'Thriller, Mystery',
          },
          {
            title: 'Jujutsu Kaisen',
            posterUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg',
            type: ShowcaseMediaType.ANIME,
            rating: 8.9,
            releaseYear: 2020,
            subtitle: 'Supernatural',
          },
          {
            title: 'Demon Slayer: Kimetsu no Yaiba',
            posterUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
            type: ShowcaseMediaType.ANIME,
            rating: 9.0,
            releaseYear: 2019,
            subtitle: 'Action, Demons',
          },
        ]
      : [
          {
            title: 'Interstellar',
            posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
            type: ShowcaseMediaType.MOVIE,
            rating: 8.7,
            releaseYear: 2014,
            subtitle: 'Sci-Fi, Drama',
          },
          {
            title: 'Oppenheimer',
            posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
            type: ShowcaseMediaType.MOVIE,
            rating: 8.9,
            releaseYear: 2023,
            subtitle: 'Biography, Drama',
          },
          {
            title: 'Dune: Part Two',
            posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
            type: ShowcaseMediaType.MOVIE,
            rating: 9.6,
            releaseYear: 2024,
            subtitle: 'Sci-Fi, Adventure',
          },
        ];

  return {
    title,
    subtitle,
    rank: derivedRank,
    miniPosterUrl: item.posterUrl,
    bannerUrl: item.customBannerUrl || item.posterUrl,
    videoUrl,
    videoDuration: '0:48',
    videoThumbnail: item.posterUrl,
    screenshots,
    description: defaultDescription,
    platformButton: {
      label: platformButtonLabel,
      type: platformButtonType,
      url: item.externalUrl || 'https://store.steampowered.com/',
    },
    reviews: {
      recentReviews: {
        label: isGame ? 'Recent Reviews' : 'Audience Rating',
        count: isGame
          ? `Very Positive (${derivedReviewsCount.toLocaleString()})`
          : `${derivedRating} / 10`,
        tone: 'mostly-positive',
      },
      languageReviews: {
        label: isGame ? 'English Language Reviews' : 'All Reviews',
        language: 'English',
        count: `Very Positive (${(derivedReviewsCount * 5).toLocaleString()})`,
        tone: 'mostly-positive',
      },
      openCritic: {
        tier: 'MIGHTY',
        score: openCriticScore,
      },
    },
    details: {
      genres: subtitle,
      publisher: isGame
        ? 'Official Publisher'
        : isAnime
          ? 'Studio Production'
          : 'Production Studio',
      developer: isGame
        ? 'Lead Development Team'
        : isAnime
          ? 'Animation Studio'
          : 'Director / Creators',
      releaseDate: item.releaseYear ? `October 15, ${item.releaseYear}` : 'October 10, 2020',
      platform: isGame ? 'PC (Windows, Steam)' : isAnime ? 'TV, Streaming' : 'Theaters, Streaming',
      socialLinks: {
        web: item.externalUrl || undefined,
        facebook: 'https://facebook.com',
        twitter: 'https://x.com',
        instagram: 'https://instagram.com',
        youtube: 'https://youtube.com',
        reddit: 'https://reddit.com',
        twitch: isGame ? 'https://twitch.tv' : undefined,
      },
      metadataSource: {
        name: isGame ? 'IGDB' : isAnime ? 'AniList' : 'TMDB',
        url:
          item.externalUrl ||
          (isGame
            ? 'https://www.igdb.com'
            : isAnime
              ? 'https://anilist.co'
              : 'https://www.themoviedb.org'),
      },
      developerClaimUrl: isGame ? 'https://partner.steamgames.com/' : undefined,
    },
    similarItems,
  };
}

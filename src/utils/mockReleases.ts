import { Release } from '../types';

export const mockReleases: Release[] = [
    {
        id: "GC001",
        title: "Summer Nights",
        artist: "Desert Rose",
        type: "EP",
        labelCode: "GC001",
        releaseDate: "2024-01-15",
        artworkUrl: "https://picsum.photos/400/400",
        tracks: [
            {
                id: "GC001-1",
                title: "Midnight Drive",
                artist: "Desert Rose",
                trackUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                trackNumber: 1
            },
            {
                id: "GC001-2",
                title: "Neon Dreams",
                artist: "Desert Rose",
                trackUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
                trackNumber: 2
            },
            {
                id: "GC001-3",
                title: "Desert Wind",
                artist: "Desert Rose",
                trackUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                trackNumber: 3
            }
        ]
    },
    {
        id: "GC002",
        title: "Moonlight",
        artist: "Silver Echo",
        type: "SINGLE",
        labelCode: "GC002",
        releaseDate: "2024-02-01",
        artworkUrl: "https://picsum.photos/400/400",
        tracks: [
            {
                id: "GC002-1",
                title: "Moonlight",
                artist: "Silver Echo",
                trackUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                trackNumber: 1
            }
        ]
    }
];

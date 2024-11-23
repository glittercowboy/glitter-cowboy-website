export interface Track {
  id: string;
  title: string;
  artist: string;
  trackUrl: string;
  trackNumber: number;
  releaseId: string;
}

export interface Release {
  id: string;
  title: string;
  artist: string;
  type: 'SINGLE' | 'EP' | 'ALBUM';
  labelCode: string;
  releaseDate: string;
  artworkUrl: string;
  tracks: Track[];
}
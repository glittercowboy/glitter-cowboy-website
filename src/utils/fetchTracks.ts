import { Release } from '../types';

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycby5oXfM-uce6jANoQgdMDBJY5X3l2aHF4n3BwE6qzdpArQnNDEsk8fkiWQrNzuGSjan/exec";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

let cachedReleases: Release[] | null = null;
let lastFetchTime: number | null = null;

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<any> {
    try {
        console.log(`Fetching from ${url}...`);
        const response = await fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Response data:', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        if (retries > 0) {
            console.log(`Retry attempt ${MAX_RETRIES - retries + 1} of ${MAX_RETRIES}`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            return fetchWithRetry(url, retries - 1);
        }
        throw error;
    }
}

async function fetchTracks(): Promise<Release[]> {
    // Check cache first
    if (cachedReleases && lastFetchTime && (Date.now() - lastFetchTime < CACHE_DURATION)) {
        console.log('Returning cached releases');
        return cachedReleases;
    }

    try {
        console.log('Fetching tracks from Google Sheets...');
        const tracks = await fetchWithRetry(GOOGLE_SHEET_URL);
        console.log('Raw data from sheets:', tracks);
        
        // Check if we received an error from the Apps Script
        if (tracks.error) {
            throw new Error(`Apps Script error: ${tracks.error}`);
        }

        // Check if tracks is an array
        if (!Array.isArray(tracks)) {
            console.error('Invalid data format:', tracks);
            throw new Error('Invalid data format received from spreadsheet');
        }

        const releases = processTracksIntoReleases(tracks);
        console.log('Processed releases:', releases);
        
        // Update cache
        cachedReleases = releases;
        lastFetchTime = Date.now();
        
        return releases;
    } catch (error) {
        console.error("Failed to fetch tracks:", error);
        // If fetch fails but we have cached data, return it as fallback
        if (cachedReleases) {
            console.log('Returning cached releases after fetch failure');
            return cachedReleases;
        }
        throw error;
    }
}

function processTracksIntoReleases(tracks: any[]): Release[] {
    const releasesMap = new Map<string, Release>();

    tracks.forEach(track => {
        if (!track['Label Code']) {
            console.warn('Track missing Label Code:', track);
            return;
        }

        const labelCode = track['Label Code'];
        
        if (!releasesMap.has(labelCode)) {
            // Create new release
            releasesMap.set(labelCode, {
                id: labelCode,
                title: track['Album'] || '',
                artist: track['Artist'] || '',
                type: track['Release Type'] || 'SINGLE',
                labelCode: labelCode,
                releaseDate: track['Release Date'] || '',
                artworkUrl: track['Cover Art URL'] || '',
                tracks: []
            });
        }

        // Add track to release
        const release = releasesMap.get(labelCode)!;
        release.tracks.push({
            id: `${labelCode}-${track['Track Number'] || '1'}`,
            title: track['Track Title'] || '',
            artist: track['Artist'] || '',
            trackUrl: track['Track URL'] || '',
            trackNumber: parseInt(track['Track Number'] || '1'),
            releaseId: labelCode
        });

        // Sort tracks by track number
        release.tracks.sort((a, b) => a.trackNumber - b.trackNumber);
    });

    return Array.from(releasesMap.values());
}

export { fetchTracks };
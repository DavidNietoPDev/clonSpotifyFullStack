import axios from 'axios';
const router = require('express').Router();
const dotenv = require('dotenv');
require('dotenv').config();


router.get('/:songId', async (req: any, res: any) => {
    try {
        const songId = req.params.songId;

        // Obtener información de la canción por su ID
        const songUrl = `${process.env.urlSpotifyTrack}/${songId}`;
        const songResponse = await handleSpotifyRequest(songUrl, res);

        if (typeof songResponse !== 'undefined' && songResponse !== null) {
            // Si songResponse no es undefined ni null, se puede realizar una verificación de tipo
            const artists = (songResponse as any).artists;
            const albumId = (songResponse as any).album.id;

            // Obtener información de los artistas de la canción por su ID
            if (albumId) {
                const albumUrl = `${process.env.urlSpotifyAlbum}/${albumId}`;
                const albumResponse = await handleSpotifyRequest(albumUrl, res);

                if (artists) {
                    const artistIds = artists.map((artist: any) => artist.id);
                    const artistUrls = artistIds.map((artistId: string) => `${process.env.urlSpotifyArtist}/${artistId}`);
                    const artistsResponses = await Promise.all(artistUrls.map((url: string) => handleSpotifyRequest(url, res)));

                    const artistAlbums = artistIds.map((artistId: string) => `${process.env.urlSpotifyArtist}/${artistId}/albums`);
                    const artistAlbumsResponses = await Promise.all(artistAlbums.map((url: string) => handleSpotifyRequest(url, res)));

                    const artistTracks = artistIds.map((artistId: string) => `${process.env.urlSpotifyArtist}/${artistId}/top-tracks`);
                    const artistTracksResponses = await Promise.all(artistTracks.map((url: string) => handleSpotifyRequest(url, res)));

                    const artistRelatedArtist = artistIds.map((artistId: string) => `${process.env.urlSpotifyArtist}/${artistId}/related-artists`);
                    const artistRelatedArtistResponses = await Promise.all(artistRelatedArtist.map((url: string) => handleSpotifyRequest(url, res)));
                    // Obtener recomendaciones basadas en la canción
                    const recommendationUrl = `https://api.spotify.com/v1/recommendations?seed_tracks=${songId}&seed_artists=${artistIds}&limit=10`;
                    const recommendationResponse = await handleSpotifyRequest(recommendationUrl, res);


                    res.json({
                        song: songResponse,
                        artists: artistsResponses,
                        artistsAlbums: artistAlbumsResponses,
                        artistTracks: artistTracksResponses,
                        artistRelated: artistRelatedArtistResponses,
                        recommendations: recommendationResponse,
                        albumInfo: albumResponse
                    });

                } else {
                    throw new Error('La respuesta de la API de Spotify no contiene la propiedad "artists".');
                }
            } else {
                throw new Error('La respuesta de la API de Spotify no contiene la propiedad "album".');
            }
        } else {
            throw new Error('La respuesta de la API de Spotify es undefined o null.');
        }

    } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
        res.status(500).json({ error: 'Error al realizar la búsqueda' });
    }
});


export async function handleSpotifyRequest(url: string, res: any) {
    try { // Función para hacer la petición a spotify de búsqueda de artista

        const tokenSpotify = process.env.SPOTIFY_ACCESS_TOKEN || '';
        const responseSpotify = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${tokenSpotify}`
            }
        });
        return responseSpotify.data;
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
            console.log('El token de acceso de Spotify ha expirado. Refrescando el token...');
            try {
                await getNewToken(); // Método para refrescar el token
                console.log('Token refrescado correctamente. Intentando de nuevo la solicitud a Spotify...');
                // Volver a intentar la solicitud a Spotify
                return handleSpotifyRequest(url, res);
            } catch (refreshError) {
                console.error('Error al refrescar el token de acceso:', refreshError);
                res.status(500).json({ error: 'Error al refrescar el token de acceso' });
            }
        } else {
            console.error('Error al realizar la solicitud a Spotify en handleSpotifyRequest:', error);
            res.status(error.response.status || 500).json({ error: 'Error al realizar la solicitud a Spotify' });
        }
    }
}





export async function getNewToken() {

    const clientId = process.env.clientId || '';
    const clientSecret = process.env.clientSecret || '';
    const baseUrlSpotifyToken = process.env.baseUrlSpotifyToken || '';
    // Realizar la solicitud para obtener un nuevo token de Spotify (utiliza tu lógica específica aquí)
    const authOptions = {
        url: baseUrlSpotifyToken,
        method: 'post',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'grant_type=client_credentials'
    };
    // Realizar la solicitud para obtener el token de acceso de Spotify
    axios(authOptions)
        .then(response => {
            if (response.status === 200) {
                const token = response.data.access_token;

                dotenv.config();
                process.env.SPOTIFY_ACCESS_TOKEN = token;
                console.log('Token de acceso de Spotify guardado en.env:', token);
            } else {
                console.error('Error al obtener el token de acceso de Spotify:', response.status);
            }
        })
        .catch(error => {
            console.error('Error al realizar la solicitud para obtener el token de acceso de Spotify:', error);
        });

}

module.exports = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewToken = exports.handleSpotifyRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const router = require('express').Router();
const dotenv = require('dotenv');
require('dotenv').config();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    const type = ['track', 'artist', 'playlist', 'album'];
    try {
        yield handleSpotifyRequest(req, res, query, type);
    }
    catch (error) {
        console.log(error);
    }
}));
function handleSpotifyRequest(req, res, query, type) {
    return __awaiter(this, void 0, void 0, function* () {
        try { // Función para hacer la petición a spotify de búsqueda de artista
            const baseUrlSpotify = process.env.baseUrlSpotify || '';
            const tokenSpotify = process.env.SPOTIFY_ACCESS_TOKEN || '';
            const responseSpotify = yield axios_1.default.get(baseUrlSpotify, {
                params: {
                    q: query,
                    type: type.join(','),
                    limit: 50
                },
                headers: {
                    'Authorization': `Bearer ${tokenSpotify}`
                }
            });
            res.json(responseSpotify.data);
        }
        catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('El token de acceso de Spotify ha expirado. Refrescando el token...');
                try {
                    yield getNewToken(); // Método para refrescar el token
                    console.log('Token refrescado correctamente. Intentando de nuevo la solicitud a Spotify...');
                    // Volver a intentar la solicitud a Spotify
                    return handleSpotifyRequest(req, res, query, type);
                }
                catch (refreshError) {
                    console.error('Error al refrescar el token de acceso:', refreshError);
                    res.status(500).json({ error: 'Error al refrescar el token de acceso' });
                }
            }
            else {
                console.error('Error al realizar la solicitud a Spotify en handleSpotifyRequest:', error);
                res.status(error.response.status || 500).json({ error: 'Error al realizar la solicitud a Spotify' });
            }
        }
    });
}
exports.handleSpotifyRequest = handleSpotifyRequest;
function getNewToken() {
    return __awaiter(this, void 0, void 0, function* () {
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
        (0, axios_1.default)(authOptions)
            .then(response => {
            if (response.status === 200) {
                const token = response.data.access_token;
                dotenv.config();
                process.env.SPOTIFY_ACCESS_TOKEN = token;
                console.log('Token de acceso de Spotify guardado en.env:', process.env.SPOTIFY_ACCESS_TOKEN, token);
            }
            else {
                console.error('Error al obtener el token de acceso de Spotify:', response.status);
            }
        })
            .catch(error => {
            console.error('Error al realizar la solicitud para obtener el token de acceso de Spotify:', error);
        });
    });
}
exports.getNewToken = getNewToken;
module.exports = router;
//     try {
//         const { artist } = req.query;
//         const baseUrl = process.env.baseUrl || '';
//         const responses = await Promise.all([
//             axios.get(baseUrl, {
//                 params: {
//                     method: 'artist.search',
//                     limit: 6,
//                     artist: artist,
//                     api_key: process.env.apiKey,
//                     format: 'json'
//                 }
//             }),
//             axios.get(baseUrl, {
//                 params: {
//                     method: 'artist.getInfo',
//                     artist: artist,
//                     autocorrect: 1,
//                     api_key: process.env.apiKey,
//                     format: 'json'
//                 }
//             }),
//             axios.get(baseUrl, {
//                 params: {
//                     method: 'artist.getSimilar',
//                     artist: artist,
//                     limit: 6,
//                     autocorrect: 1,
//                     api_key: process.env.apiKey,
//                     format: 'json'
//                 }
//             }),
//             axios.get(baseUrl, {
//                 params: {
//                     method: 'artist.getTopTracks',
//                     artist: artist,
//                     autocorrect: 1,
//                     limit: 5,
//                     api_key: process.env.apiKey,
//                     format: 'json'
//                 }
//             }),
//             axios.get(baseUrl, {
//                 params: {
//                     method: 'artist.getTopAlbums',
//                     artist: artist,
//                     limit: 6,
//                     api_key: process.env.apiKey,
//                     format: 'json'
//                 }
//             })
//         ]);
//         const [artistSearch, artistInfo, artistSimilar, topTracks, topAlbums] = responses.map(response => response.data);
//         //Obtener imagen del artista
//         const urlsSimilar = artistSimilar.similarartists.artist.map((similar: any) => similar.url);
//         const imagesSimilar = await getSimilarImage(urlsSimilar);
//         const similarWithImages = artistSimilar.similarartists.artist.map((similar: any, element: number) => {
//             return {
//                 ...similar,                       //...track: Esto copia todas las propiedades de la pista actual (track) en un nuevo objeto. 
//                                                 //... es el operador de propagación de objetos de JavaScript, que permite copiar todas las propiedades de un objeto a otro.
//                 imagesSimilar: imagesSimilar[element]
//                 //Esto agrega una nueva propiedad llamada images al objeto de la pista actual y le asigna el valor de la imagen correspondiente 
//                 //del array images basado en el mismo índice
//             };
//         });
//         const urlTopAlbums = topAlbums.topalbums.album.map((album: any)=> album.url);
//         const imagesAlbums = await getAlbumImage(urlTopAlbums);
//         const albumsWithImages = topAlbums.topalbums.album.map((album: any, reference: number)=> {
//             return {
//                 ...album,
//                 imagesAlbums: imagesAlbums[reference]
//             };
//     });        
//         const urls = topTracks.toptracks.track.map((track: any) => track.url);
//         const images = await scrapeImagesTracks(urls)
//         const topTracksWithImages = topTracks.toptracks.track.map((track: any, index: number) => {
//             return {
//                 ...track,                       //...track: Esto copia todas las propiedades de la pista actual (track) en un nuevo objeto. 
//                                                 //... es el operador de propagación de objetos de JavaScript, que permite copiar todas las propiedades de un objeto a otro.
//                 images: images[index]
//                 //Esto agrega una nueva propiedad llamada images al objeto de la pista actual y le asigna el valor de la imagen correspondiente 
//                 //del array images basado en el mismo índice
//             };
//         });
//         const mbid: string = artistInfo.artist.mbid;
//         const artista: string = artistInfo.artist.name;
//         const imageUrl = await getArtistImage(mbid, artista);
//         //Combinar todos los datos y enviar la respuesta
//         const responseData = {
//             artistSearch: artistSearch,
//             artistInfo: artistInfo,
//             artistSimilar: similarWithImages,
//             topTracks: topTracksWithImages,
//             topAlbums: albumsWithImages,
//             imagUrl: imageUrl,
//         };
//         res.json(responseData);
//     } catch (error) {
//         console.error('Error al realizar la búsqueda de artistas:', error);
//         res.status(500).json({ error: 'Error al buscar artistas' });
//     }
// });
// async function scrapeImagesTracks(urls: string[]) {
//     const images: string[][] = [];
//     for (const url of urls) {
//         try {
//             // Realizar solicitud HTTP a la URL de la canción
//             const response = await axios.get(url);
//             const htmlContent = response.data;
//             // Cargar el contenido HTML en Cheerio
//             const $ = cheerio.load(htmlContent);
//             // Realizar el scraping para extraer la URL de la imagen de la canción
//             const imageUrl = $('.js-video-preview-playlink img.video-preview').first().attr('src');
//             if (imageUrl) {
//                 images.push([imageUrl]); // Usar un array de una sola imagen
//             } else {
//                 console.error('No se encontró la URL de la imagen en la página:', url);
//                 images.push([]);
//              } // Añadir un array vacío en caso de no encontrar la imagen
//         } catch (error) {
//             console.error('Error al realizar la solicitud a la URL:', url, error);
//             images.push([]);
//         }
//     }
//     return images;
// }
// async function getArtistImage(mbid: string, artist: string): Promise<string> {
//     try {
//         const url:any = `${process.env.baseUrlImage}${artist}${'/+images/'}${mbid}`;
//         const response = await axios.get(url);
//         const $ = cheerio.load(response.data);
//         const imageUrl = $('.js-gallery-image').attr('src');
//         return imageUrl || '';
//     } catch (error) {
//         console.error('Error al obtener la imagen del artista desde Last.fm:', error);
//         return ''; // Retorna una cadena vacía en caso de error
//     }
//  }
// async function getSimilarImage(urls: string[]) {
//     const images: string[][] = [];
//     for (const url of urls) {
//         try {
//             // Realizar solicitud HTTP a la URL de la canción
//             const response = await axios.get(url);
//             const htmlContent = response.data;
//             // Cargar el contenido HTML en Cheerio
//             const $ = cheerio.load(htmlContent);
//             // Realizar el scraping para extraer la URL de la imagen de la canción
//             const imageUrl = $('.sidebar-image-list-image').attr('src');
//             if (imageUrl) {
//                 images.push([imageUrl]); // Usar un array de una sola imagen
//             } else {
//                 console.error('No se encontró la URL de la imagen en la página:', url);
//                 images.push([]);
//              } // Añadir un array vacío en caso de no encontrar la imagen
//         } catch (error) {
//             console.error('Error al realizar la solicitud a la URL:', url, error);
//             images.push([]);
//         }
//     }
//     return images;
// }
// async function getAlbumImage(urls: string[]) {
//     const images: string[][] = [];
//     for (const url of urls) {
//         try {
//             // Realizar solicitud HTTP a la URL de la canción
//             const response = await axios.get(url);
//             const htmlContent = response.data;
//             // Cargar el contenido HTML en Cheerio
//             const $ = cheerio.load(htmlContent);
//             // Realizar el scraping para extraer la URL de la imagen de la canción
//             const imageUrl = $('.cover-art img').attr('src');
//             if (imageUrl) {
//                 images.push([imageUrl]); // Usar un array de una sola imagen
//             } else {
//                 console.error('No se encontró la URL de la imagen en la página:', url);
//                 images.push([]);
//              } // Añadir un array vacío en caso de no encontrar la imagen
//         } catch (error) {
//             console.error('Error al realizar la solicitud a la URL:', url, error);
//             images.push([]);
//         }
//     }
//     return images;
// }

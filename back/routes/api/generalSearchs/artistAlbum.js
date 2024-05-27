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
    const type = 'album';
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
                    type: type,
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
                console.log('Token de acceso de Spotify guardado en.env:', token);
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
// router.get('/', async (req: any, res: any) => {
//     try {
//         const baseUrl = process.env.baseUrl || '';
//         const { artist } = req.query;
//         const response = await axios.get(baseUrl, {
//             params: {
//                 method: 'artist.getTopAlbums',
//                 artist: artist,
//                 api_key: process.env.apiKey,
//                 format: 'json'
//             }
//         });
//         //Recogemos las URLs de las canciones en base a la respuesta 
//         const urls = response.data.topalbums.album.map((album: any) => album.url);
//         //Usamos la función de scrapear la imagen de la canción
//         const images = await scrapeImagesTracks(urls)
//               //itera sobre cada pista en el array track de la respuesta de la API. 
//         //map() es un método de array que recorre cada elemento y devuelve un nuevo array con los resultados de llamar a una función dada en cada elemento
//         const topAlbumsWithImages = response.data.topalbums.album.map((album: any, index: number) => {
//             return {
//                 ...album,                       //...track: Esto copia todas las propiedades de la pista actual (track) en un nuevo objeto. 
//                                                 //... es el operador de propagación de objetos de JavaScript, que permite copiar todas las propiedades de un objeto a otro.
//                 images: images[index]
//                 //Esto agrega una nueva propiedad llamada images al objeto de la pista actual y le asigna el valor de la imagen correspondiente 
//                 //del array images basado en el mismo índice
//             };
//         });
//         res.json(topAlbumsWithImages);
//     } catch (error) {
//         console.error('Error al realizar la búsqueda de artistas', error);
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
//             const randomIndex = Math.floor(Math.random() * 3);
//             const imageUrl = $('.album-overview-cover-art.js-focus-controls-container img').first().attr('src');
//             const imageUrl2 = $('a.gallery-preview-image--' + randomIndex + ' img').attr('src');
//             if (imageUrl) {
//                 images.push([imageUrl]); // Usar un array de una sola imagen
//             } else if (imageUrl2) {
//                 images.push([imageUrl2]); 
//                 console.log('Usando imagen por defecto:', url);
//              } else {
//                 console.error('No se encontró la URL de la imagen en la página:', url);
//                 images.push([]);
//              }// Añadir un array vacío en caso de no encontrar la imagen
//         } catch (error) {
//             console.error('Error al realizar la solicitud a la URL:', url, error);
//             images.push([]);
//         }
//     }
//     return images;
// }
module.exports = router;

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
exports.getNewToken = exports.handleSpotifyRequestSearchs = exports.handleSpotifyRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const router = require('express').Router();
const dotenv = require('dotenv');
require('dotenv').config();
router.get('/:categories_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories_id = req.params.categories_id;
    const { query } = req.query;
    const type = ['track', 'artist', 'playlist', 'album'];
    if (!categories_id) {
        return res.status(400).json({ error: 'ID de artista no proporcionado' });
    }
    try {
        const [categoryInfo, searchs] = yield Promise.all([
            handleSpotifyRequest(`${process.env.urlSpotifyCategories}/${categories_id}`, req),
            handleSpotifyRequestSearchs(req, res, query, type)
        ]);
        res.json({
            categoryInfo,
            searchs
        });
    }
    catch (error) {
        console.error('Error al realizar las solicitudes a Spotify:', error);
        res.status(error.response.status || 500).json({ error: 'Error al realizar las solicitudes a Spotify' });
    }
}));
function handleSpotifyRequest(url, req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tokenSpotify = process.env.SPOTIFY_ACCESS_TOKEN || '';
            const responseSpotify = yield axios_1.default.get(url, {
                headers: {
                    'Authorization': `Bearer ${tokenSpotify}`
                }
            });
            return responseSpotify.data;
        }
        catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('El token de acceso de Spotify ha expirado. Refrescando el token...');
                try {
                    yield getNewToken(); // Método para refrescar el token
                    console.log('Token refrescado correctamente. Intentando de nuevo la solicitud a Spotify...');
                    // Volver a intentar la solicitud a Spotify
                    return handleSpotifyRequest(url, req);
                }
                catch (refreshError) {
                    console.error('Error al refrescar el token de acceso:', refreshError);
                    throw new Error('Error al refrescar el token de acceso');
                }
            }
            else {
                console.error('Error al realizar la solicitud a Spotify en handleSpotifyRequest:', error);
                throw error;
            }
        }
    });
}
exports.handleSpotifyRequest = handleSpotifyRequest;
function handleSpotifyRequestSearchs(req, res, query, type) {
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
            return responseSpotify.data;
        }
        catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('El token de acceso de Spotify ha expirado. Refrescando el token...');
                try {
                    yield getNewToken(); // Método para refrescar el token
                    console.log('Token refrescado correctamente. Intentando de nuevo la solicitud a Spotify...');
                    // Volver a intentar la solicitud a Spotify
                    return handleSpotifyRequestSearchs(req, res, query, type);
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
exports.handleSpotifyRequestSearchs = handleSpotifyRequestSearchs;
function getNewToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
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
            const response = yield (0, axios_1.default)(authOptions);
            if (response.status === 200) {
                const token = response.data.access_token;
                dotenv.config();
                process.env.SPOTIFY_ACCESS_TOKEN = token;
                console.log('Token de acceso de Spotify guardado en.env:', token);
            }
            else {
                console.error('Error al obtener el token de acceso de Spotify:', response.status);
            }
        }
        catch (error) {
            console.error('Error al realizar la solicitud para obtener el token de acceso de Spotify:', error);
        }
    });
}
exports.getNewToken = getNewToken;
module.exports = router;

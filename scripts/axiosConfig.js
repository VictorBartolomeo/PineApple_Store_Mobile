import axios from 'axios';
import * as SecureStore from "expo-secure-store";

console.log(process.env.EXPO_PUBLIC_API_URL)


const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 1000,
});

// Ajouter un interceptor pour les requêtes
instance.interceptors.request.use(
    async config => {
        // Récupérer le token depuis AsyncStorage
        const token = SecureStore.getItem('token');

        // Si le token existe, l'ajouter à l'en-tête de la requête
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        // Faites quelque chose avec l'erreur de la requête
        console.error('Erreur de requête:', error);
        return Promise.reject(error);
    }
);

// Ajouter un interceptor pour les réponses
instance.interceptors.response.use(
    response => {
        // Faites quelque chose avec la réponse
        //console.log('Réponse reçue:', response);
        return response;
    },
    error => {
        // Faites quelque chose avec l'erreur de la réponse
        console.error('Erreur de réponse:', error);
        return Promise.reject(error);
    }
);

export default instance;
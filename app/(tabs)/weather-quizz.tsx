import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Pressable, Animated, Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface WeatherData {
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    city: string;
    country: string;
}

interface QuizQuestion {
    weather: WeatherData;
    options: string[];
    correctAnswer: string;
}

const MAJOR_CITIES = [
    { name: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503 },
    { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
    { name: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060 },
    { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
    { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 },
    { name: 'Dubai', country: 'UAE', lat: 25.2048, lon: 55.2708 },
    { name: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777 },
    { name: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lon: -43.1729 },
    { name: 'Cairo', country: 'Egypt', lat: 30.0444, lon: 31.2357 },
    { name: 'Moscow', country: 'Russia', lat: 55.7558, lon: 37.6176 },
    { name: 'Seoul', country: 'South Korea', lat: 37.5665, lon: 126.9780 },
    { name: 'Mexico City', country: 'Mexico', lat: 19.4326, lon: -99.1332 },
    { name: 'Bangkok', country: 'Thailand', lat: 13.7563, lon: 100.5018 },
    { name: 'Lagos', country: 'Nigeria', lat: 6.5244, lon: 3.3792 },
    { name: 'Istanbul', country: 'Turkey', lat: 41.0082, lon: 28.9784 },
    { name: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lon: -58.3816 },
    { name: 'Berlin', country: 'Germany', lat: 52.5200, lon: 13.4050 },
    { name: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198 },
    { name: 'Los Angeles', country: 'United States', lat: 34.0522, lon: -118.2437 },
    { name: 'Beijing', country: 'China', lat: 39.9042, lon: 116.4074 }
];

export default function WeatherQuizScreen() {
    const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
    const [loading, setLoading] = useState(false);
    const [score, setScore] = useState(0);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    // Animations
    const glitchAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Glitch effect animation
        const glitchLoop = () => {
            Animated.sequence([
                Animated.timing(glitchAnim, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(glitchAnim, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.delay(Math.random() * 3000 + 2000),
            ]).start(glitchLoop);
        };
        glitchLoop();
    }, []);

    const getRandomCity = () => {
        return MAJOR_CITIES[Math.floor(Math.random() * MAJOR_CITIES.length)];
    };

    const getWeatherData = async (city: any): Promise<WeatherData | null> => {
        try {
            // Using OpenWeatherMap API (you'll need to replace with your API key)
            // For demo purposes, I'll simulate weather data
            const weatherDescriptions = [
                'Clear sky', 'Few clouds', 'Scattered clouds', 'Broken clouds',
                'Shower rain', 'Rain', 'Thunderstorm', 'Snow', 'Mist', 'Overcast'
            ];

            return {
                temperature: Math.round(Math.random() * 40 - 5), // -5 to 35°C
                description: weatherDescriptions[Math.floor(Math.random() * weatherDescriptions.length)],
                humidity: Math.round(Math.random() * 100),
                windSpeed: Math.round(Math.random() * 30),
                city: city.name,
                country: city.country
            };
        } catch (error) {
            console.error('Weather API error:', error);
            return null;
        }
    };

    const generateQuestion = async () => {
        setLoading(true);

        const correctCity = getRandomCity();
        const weatherData = await getWeatherData(correctCity);

        if (!weatherData) {
            setLoading(false);
            return;
        }

        // Generate 3 wrong options
        const wrongCities = [];
        while (wrongCities.length < 3) {
            const randomCity = getRandomCity();
            const fullName = `${randomCity.name}, ${randomCity.country}`;
            const correctFullName = `${correctCity.name}, ${correctCity.country}`;

            if (fullName !== correctFullName && !wrongCities.includes(fullName)) {
                wrongCities.push(fullName);
            }
        }

        const correctAnswer = `${correctCity.name}, ${correctCity.country}`;
        const options = [...wrongCities, correctAnswer].sort(() => Math.random() - 0.5);

        setCurrentQuestion({
            weather: weatherData,
            options,
            correctAnswer
        });

        setLoading(false);
    };

    const startGame = () => {
        setGameStarted(true);
        setScore(0);
        setQuestionsAnswered(0);
        generateQuestion();
    };

    const handleAnswer = (answer: string) => {
        if (selectedAnswer || !currentQuestion) return;

        setSelectedAnswer(answer);
        setShowResult(true);

        if (answer === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }

        setQuestionsAnswered(questionsAnswered + 1);

        // Glitch effect on answer
        Animated.sequence([
            Animated.timing(fadeAnim, { toValue: 0.3, duration: 200, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();
    };

    const nextQuestion = () => {
        setSelectedAnswer(null);
        setShowResult(false);
        generateQuestion();
    };

    const glitchTransform = glitchAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 5],
    });

    if (!gameStarted) {
        return (
            <SafeAreaView style={styles.container}>
                <ThemedView style={styles.startScreen}>
                    <Animated.View style={{ transform: [{ translateX: glitchTransform }] }}>
                        <ThemedText style={styles.title}>WEATHER_QUIZ.EXE</ThemedText>
                        <ThemedText style={styles.glitchText}>W3ATH3R_QU1Z.3X3</ThemedText>
                    </Animated.View>

                    <ThemedText style={styles.subtitle}>
                        [SYSTEM] Analyze weather patterns{'\n'}
                        [TASK] Identify global locations{'\n'}
                        [DIFFICULTY] ∞
                    </ThemedText>

                    <Pressable style={styles.startButton} onPress={startGame}>
                        <ThemedText style={styles.startButtonText}>INITIALIZE_PROTOCOL</ThemedText>
                    </Pressable>
                </ThemedView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View
                style={[
                    styles.gameScreen,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }, { translateX: glitchTransform }]
                    }
                ]}
            >
                {/* Header */}
                <ThemedView style={styles.header}>
                    <ThemedText style={styles.scoreText}>
                        SCORE: {score}/{questionsAnswered} | ACCURACY: {questionsAnswered > 0 ? Math.round((score/questionsAnswered)*100) : 0}%
                    </ThemedText>
                </ThemedView>

                {loading ? (
                    <ThemedView style={styles.loadingContainer}>
                        <ThemedText style={styles.loadingText}>
                            [SCANNING] Global weather patterns...{'\n'}
                            [STATUS] Acquiring data...
                        </ThemedText>
                    </ThemedView>
                ) : currentQuestion ? (
                    <>
                        {/* Weather Data Display */}
                        <ThemedView style={styles.weatherContainer}>
                            <ThemedText style={styles.weatherTitle}>ATMOSPHERIC_DATA.LOG</ThemedText>
                            <View style={styles.weatherGrid}>
                                <ThemedText style={styles.weatherItem}>
                                    TEMP: {currentQuestion.weather.temperature}°C
                                </ThemedText>
                                <ThemedText style={styles.weatherItem}>
                                    CONDITION: {currentQuestion.weather.description.toUpperCase()}
                                </ThemedText>
                                <ThemedText style={styles.weatherItem}>
                                    HUMIDITY: {currentQuestion.weather.humidity}%
                                </ThemedText>
                                <ThemedText style={styles.weatherItem}>
                                    WIND: {currentQuestion.weather.windSpeed} km/h
                                </ThemedText>
                            </View>
                        </ThemedView>

                        {/* Options */}
                        <ThemedView style={styles.optionsContainer}>
                            <ThemedText style={styles.questionText}>LOCATION_QUERY:</ThemedText>
                            {currentQuestion.options.map((option, index) => (
                                <Pressable
                                    key={index}
                                    style={[
                                        styles.optionButton,
                                        selectedAnswer === option && styles.selectedOption,
                                        showResult && option === currentQuestion.correctAnswer && styles.correctOption,
                                        showResult && selectedAnswer === option && option !== currentQuestion.correctAnswer && styles.wrongOption
                                    ]}
                                    onPress={() => handleAnswer(option)}
                                    disabled={selectedAnswer !== null}
                                >
                                    <ThemedText style={styles.optionText}>
                                        [{String.fromCharCode(65 + index)}] {option}
                                    </ThemedText>
                                </Pressable>
                            ))}
                        </ThemedView>

                        {/* Result and Next Button */}
                        {showResult && (
                            <ThemedView style={styles.resultContainer}>
                                <ThemedText style={[
                                    styles.resultText,
                                    selectedAnswer === currentQuestion.correctAnswer ? styles.correctText : styles.wrongText
                                ]}>
                                    {selectedAnswer === currentQuestion.correctAnswer ?
                                        '[SUCCESS] Target acquired' :
                                        `[ERROR] Target was: ${currentQuestion.correctAnswer}`
                                    }
                                </ThemedText>

                                <Pressable style={styles.nextButton} onPress={nextQuestion}>
                                    <ThemedText style={styles.nextButtonText}>NEXT_QUERY &gt;&gt;</ThemedText>
                                </Pressable>
                            </ThemedView>
                        )}
                    </>
                ) : null}
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    startScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    gameScreen: {
        flex: 1,
        padding: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'monospace',
        marginBottom: 5,
    },
    glitchText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ff6b6b',
        textAlign: 'center',
        fontFamily: 'monospace',
        position: 'absolute',
        opacity: 0.3,
    },
    subtitle: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        fontFamily: 'monospace',
        marginVertical: 30,
        lineHeight: 20,
    },
    startButton: {
        backgroundColor: '#333',
        borderColor: '#666',
        borderWidth: 2,
        paddingHorizontal: 30,
        paddingVertical: 15,
        marginTop: 20,
    },
    startButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        paddingBottom: 10,
    },
    scoreText: {
        fontSize: 12,
        color: '#888',
        fontFamily: 'monospace',
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'monospace',
        textAlign: 'center',
        lineHeight: 20,
    },
    weatherContainer: {
        backgroundColor: '#111',
        borderWidth: 2,
        borderColor: '#333',
        padding: 15,
        marginBottom: 20,
    },
    weatherTitle: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'monospace',
        marginBottom: 15,
        textAlign: 'center',
    },
    weatherGrid: {
        gap: 8,
    },
    weatherItem: {
        fontSize: 12,
        color: '#ccc',
        fontFamily: 'monospace',
        backgroundColor: '#1a1a1a',
        padding: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#666',
    },
    optionsContainer: {
        flex: 1,
        gap: 10,
    },
    questionText: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'monospace',
        marginBottom: 10,
    },
    optionButton: {
        backgroundColor: '#222',
        borderWidth: 1,
        borderColor: '#444',
        padding: 15,
        marginVertical: 3,
    },
    selectedOption: {
        borderColor: '#666',
        backgroundColor: '#333',
    },
    correctOption: {
        borderColor: '#4CAF50',
        backgroundColor: '#1B5E20',
    },
    wrongOption: {
        borderColor: '#f44336',
        backgroundColor: '#B71C1C',
    },
    optionText: {
        fontSize: 12,
        color: '#ccc',
        fontFamily: 'monospace',
    },
    resultContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    resultText: {
        fontSize: 14,
        fontFamily: 'monospace',
        textAlign: 'center',
        marginBottom: 15,
    },
    correctText: {
        color: '#4CAF50',
    },
    wrongText: {
        color: '#f44336',
    },
    nextButton: {
        backgroundColor: '#444',
        borderWidth: 2,
        borderColor: '#666',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
});
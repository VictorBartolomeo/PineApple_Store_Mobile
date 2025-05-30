import {Image} from 'expo-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NierStyles} from '@/constants/NierTheme';
import {GlobalStyles} from "@/constants/GobalStyles";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import * as SecureStore from "expo-secure-store";
import {useEffect, useState} from "react";
import {Course} from "@/models/Course";
import axios from "@/scripts/axiosConfig";
import {WelcomeHeader} from "@/components/WelcomeHeader";
import {SectionTitle} from "@/components/SectionTitle";
import {MissionCard} from "@/components/MissionCard";
import {CoursesList} from "@/components/CoursesList";
import {SystemStatusCard} from "@/components/SystemStatusCard";

export default function HomeScreen() {
    const [upcomingCourses, setUpcomingCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const jwt = await SecureStore.getItemAsync("token");
                if (jwt) {
                    const response = await axios.get("/coach/2/courses/upcoming");
                    setUpcomingCourses(response.data);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCourses();
    }, []);

    return (
        <SafeAreaView style={NierStyles.container}>
            <ParallaxScrollView
                headerBackgroundColor={{light: '#D0D0D0', dark: '#353636'}}
                headerImage={<Image source={'@/assets/images/nier_background.jpg'} style={GlobalStyles.headerImage}/>}
            >
                <WelcomeHeader />

                <SectionTitle title="MAIN_TERMINAL" />

                <MissionCard />

                <SectionTitle title="COURS_À_VENIR" />

                <CoursesList courses={upcomingCourses} isLoading={isLoading} />

                <SystemStatusCard />
            </ParallaxScrollView>
        </SafeAreaView>
    );
}
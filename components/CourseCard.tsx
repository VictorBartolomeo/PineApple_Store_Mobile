// components/CourseCard.tsx
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GlobalStyles } from '@/constants/GobalStyles';
import { Course } from '@/models/Course';

const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    return date.toLocaleDateString('fr-FR', options);
};

const formatTime = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

interface CourseCardProps {
    course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const formattedDate = formatDate(course.startDatetime);
    const startTime = formatTime(course.startDatetime);
    const endTime = formatTime(course.endDatetime);
    const spotsLeft = course.maxCapacity - course.registrations.length;

    return (
        <ThemedView variant="card" style={GlobalStyles.card}>
            <ThemedText type="subtitle">
                [{course.courseType.name}] {course.title}
            </ThemedText>
            <ThemedText type="muted" style={GlobalStyles.timestamp}>
                DATE: {formattedDate} • {startTime}-{endTime}
            </ThemedText>
            <ThemedText style={GlobalStyles.missionText}>
                {course.description}
                {'\n\n'}
                <ThemedText type="system">
                    Places disponibles: {spotsLeft}/{course.maxCapacity}
                </ThemedText>
            </ThemedText>
        </ThemedView>
    );
};
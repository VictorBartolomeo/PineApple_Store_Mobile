// components/CoursesList.tsx
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GlobalStyles } from '@/constants/GobalStyles';
import { Course } from '@/models/Course';
import { CourseCard } from './CourseCard';

interface CoursesListProps {
    courses: Course[];
    isLoading: boolean;
}

export const CoursesList: React.FC<CoursesListProps> = ({ courses, isLoading }) => {
    if (isLoading) {
        return (
            <ThemedView variant="surface" style={GlobalStyles.statusCard}>
                <ThemedText type="system">Chargement des cours...</ThemedText>
            </ThemedView>
        );
    }

    if (courses.length === 0) {
        return (
            <ThemedView variant="surface" style={GlobalStyles.statusCard}>
                <ThemedText type="system">Aucun cours à venir</ThemedText>
            </ThemedView>
        );
    }

    return (
        <>
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </>
    );
};
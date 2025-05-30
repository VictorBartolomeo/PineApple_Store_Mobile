// components/SectionTitle.tsx
import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GlobalStyles } from '@/constants/GobalStyles';

interface SectionTitleProps {
    title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
    return (
        <ThemedView style={GlobalStyles.titleContainer}>
            <ThemedText type="title">{title}</ThemedText>
        </ThemedView>
    );
};
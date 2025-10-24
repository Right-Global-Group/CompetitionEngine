<script setup>
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import HeroSection from '@/Components/Hero/HeroSection.vue';
import StatsSection from '@/Components/Stats/StatsSection.vue';
import LaunchSteps from '@/Components/Launch/LaunchSteps.vue';
import GameConfigurator from '@/Components/Configurator/GameConfigurator.vue';
import EcosystemFeatures from '@/Components/Ecosystem/EcosystemFeatures.vue';
import NextGenPlatform from '@/Components/Platform/NextGenPlatform.vue';
import AIFeatures from '@/Components/Platform/AIFeatures.vue';
import ModernPlatform from '@/Components/Modern/ModernPlatform.vue';
import ComparisonTable from '@/Components/Comparison/ComparisonTable.vue';
import PricingCards from '@/Components/Pricing/PricingCards.vue';
import FAQSection from '@/Components/FAQ/FAQSection.vue';
import BookingSection from '@/Components/Booking/BookingSection.vue';
</script>

<template>
    <Head title="Competition Engine - Ultimate Competition Platform" />

    <AppLayout>
        <!-- Hero Section -->
        <HeroSection />

        <!-- Stats Section -->
        <StatsSection />

        <!-- Launch Steps -->
        <LaunchSteps />

        <!-- Game Configurator -->
        <GameConfigurator />

        <!-- Ecosystem Features -->
        <EcosystemFeatures />

        <!-- Next Gen Platform -->
        <NextGenPlatform />

        <!-- AI Features -->
        <AIFeatures />

        <!-- Modern Platform -->
        <ModernPlatform />

        <!-- Comparison -->
        <ComparisonTable />

        <!-- Pricing -->
        <PricingCards />

        <!-- FAQ -->
        <FAQSection />

        <!-- Booking (NO id attribute here - it's inside the component) -->
        <BookingSection />
    </AppLayout>
</template>
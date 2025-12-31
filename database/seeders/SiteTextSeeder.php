<?php

namespace Database\Seeders;

use App\Models\SiteText;
use Illuminate\Database\Seeder;

class SiteTextSeeder extends Seeder
{
    public function run(): void
    {
        $texts = [
            // Hero Section
            ['section' => 'hero', 'key' => 'hero.title', 'content' => 'The Ultimate Competition Platform', 'type' => 'heading', 'order' => 1],
            ['section' => 'hero', 'key' => 'hero.title_keyword', 'content' => 'Ultimate Competition', 'type' => 'heading', 'order' => 2],
            ['section' => 'hero', 'key' => 'hero.subtitle', 'content' => 'Effortlessly create, manage, and scale engaging competitions that your audience will love. No code, no hassle.', 'type' => 'paragraph', 'order' => 3],
            ['section' => 'hero', 'key' => 'hero.button_primary', 'content' => 'Book a Demo', 'type' => 'button', 'order' => 4],
            ['section' => 'hero', 'key' => 'hero.button_secondary', 'content' => 'Game Studio', 'type' => 'button', 'order' => 5],

            // Stats Section
            ['section' => 'stats', 'key' => 'stats.heading', 'content' => 'Trusted by the Best', 'type' => 'heading', 'order' => 1],
            ['section' => 'stats', 'key' => 'stats.heading_keyword', 'content' => 'Best', 'type' => 'heading', 'order' => 2],
            ['section' => 'stats', 'key' => 'stats.description', 'content' => 'Our platform powers successful competitions at scale, every single day.', 'type' => 'paragraph', 'order' => 3],
            ['section' => 'stats', 'key' => 'stats.label_orders', 'content' => 'Orders Processed', 'type' => 'label', 'order' => 4],
            ['section' => 'stats', 'key' => 'stats.label_tickets', 'content' => 'Tickets Sold This Month', 'type' => 'label', 'order' => 5],
            ['section' => 'stats', 'key' => 'stats.label_uptime', 'content' => 'Uptime Percentage', 'type' => 'label', 'order' => 6],

            // Launch Steps
            ['section' => 'launch', 'key' => 'launch.heading', 'content' => 'Launch in Minutes', 'type' => 'heading', 'order' => 1],
            ['section' => 'launch', 'key' => 'launch.heading_keyword', 'content' => 'Minutes', 'type' => 'heading', 'order' => 2],
            ['section' => 'launch', 'key' => 'launch.description', 'content' => 'A straightforward path from idea to live competition.', 'type' => 'paragraph', 'order' => 3],
            ['section' => 'launch', 'key' => 'launch.step1_title', 'content' => 'Choose Your Game', 'type' => 'subheading', 'order' => 4],
            ['section' => 'launch', 'key' => 'launch.step1_desc', 'content' => 'Select from a variety of engaging competition types like scratch cards, spin wheels, and more.', 'type' => 'paragraph', 'order' => 5],
            ['section' => 'launch', 'key' => 'launch.step2_title', 'content' => 'Customize Everything', 'type' => 'subheading', 'order' => 6],
            ['section' => 'launch', 'key' => 'launch.step2_desc', 'content' => 'Brand your competition with your logos, colors, and unique messaging to make it truly yours.', 'type' => 'paragraph', 'order' => 7],
            ['section' => 'launch', 'key' => 'launch.step3_title', 'content' => 'Define the Rules', 'type' => 'subheading', 'order' => 8],
            ['section' => 'launch', 'key' => 'launch.step3_desc', 'content' => 'Define entry criteria, prize allocation, and competition duration with our intuitive rule-builder.', 'type' => 'paragraph', 'order' => 9],
            ['section' => 'launch', 'key' => 'launch.step4_title', 'content' => 'Go Live!', 'type' => 'subheading', 'order' => 10],
            ['section' => 'launch', 'key' => 'launch.step4_desc', 'content' => 'Launch and watch the engagement roll in. Monitor everything from your powerful dashboard.', 'type' => 'paragraph', 'order' => 11],

            // Configurator
            ['section' => 'configurator', 'key' => 'configurator.label', 'content' => 'Game Studio', 'type' => 'label', 'order' => 1],
            ['section' => 'configurator', 'key' => 'configurator.heading', 'content' => 'Build Your Game', 'type' => 'heading', 'order' => 2],
            ['section' => 'configurator', 'key' => 'configurator.description', 'content' => 'Customize every detail in real-time', 'type' => 'paragraph', 'order' => 3],

            // Ecosystem Features
            ['section' => 'ecosystem', 'key' => 'ecosystem.heading', 'content' => 'Your Complete Raffle Ecosystem', 'type' => 'heading', 'order' => 1],
            ['section' => 'ecosystem', 'key' => 'ecosystem.heading_keyword', 'content' => 'Raffle Ecosystem', 'type' => 'heading', 'order' => 2],
            ['section' => 'ecosystem', 'key' => 'ecosystem.description', 'content' => 'We provide the essential infrastructure to launch, operate, and scale your raffle business, all in one place.', 'type' => 'paragraph', 'order' => 3],
            
            // Next Gen Platform
            ['section' => 'nextgen', 'key' => 'nextgen.heading', 'content' => 'Next Generation Platform', 'type' => 'heading', 'order' => 1],
            ['section' => 'nextgen', 'key' => 'nextgen.heading_keyword', 'content' => 'Next Generation', 'type' => 'heading', 'order' => 2],
            ['section' => 'nextgen', 'key' => 'nextgen.description', 'content' => 'Competition Engine isn\'t just another tool; it\'s a complete evolution. Built on a serverless, edge-first architecture, we provide unparalleled speed, security, and scalability that legacy systems can\'t match.', 'type' => 'paragraph', 'order' => 3],

            // Modern Platform (WordPress Alternative)
            ['section' => 'modern', 'key' => 'modern.heading', 'content' => 'Bye Bye, WordPress.', 'type' => 'heading', 'order' => 1],
            ['section' => 'modern', 'key' => 'modern.heading_keyword', 'content' => 'Bye Bye, WordPress.', 'type' => 'heading', 'order' => 2],
            ['section' => 'modern', 'key' => 'modern.subheading', 'content' => 'Hello, Modern Platform.', 'type' => 'subheading', 'order' => 3],
            ['section' => 'modern', 'key' => 'modern.description', 'content' => 'Tired of slow, insecure, and clunky WordPress plugins? Competition Engine is built from the ground up for one purpose: to run flawless competitions at scale.', 'type' => 'paragraph', 'order' => 4],

            // AI Features
            ['section' => 'ai', 'key' => 'ai.heading', 'content' => 'The Future is AI-Powered', 'type' => 'heading', 'order' => 1],
            ['section' => 'ai', 'key' => 'ai.heading_keyword', 'content' => 'AI-Powered', 'type' => 'heading', 'order' => 2],
            ['section' => 'ai', 'key' => 'ai.description', 'content' => 'Supercharge your competition site with the first AI-powered platform. Get ready for smarter analytics, automated marketing, and effortless content creation.', 'type' => 'paragraph', 'order' => 3],

            // Comparison
            ['section' => 'comparison', 'key' => 'comparison.heading', 'content' => 'Competition Engine vs. Others', 'type' => 'heading', 'order' => 1],
            ['section' => 'comparison', 'key' => 'comparison.description', 'content' => 'See how we stack up against the competition.', 'type' => 'paragraph', 'order' => 2],

            // Pricing
            ['section' => 'pricing', 'key' => 'pricing.heading', 'content' => 'Simple, Transparent Pricing', 'type' => 'heading', 'order' => 1],
            ['section' => 'pricing', 'key' => 'pricing.heading_keyword', 'content' => 'Simple, Transparent', 'type' => 'heading', 'order' => 2],
            ['section' => 'pricing', 'key' => 'pricing.description', 'content' => 'Choose the plan that\'s right for you.', 'type' => 'paragraph', 'order' => 3],

            // Footer
            ['section' => 'footer', 'key' => 'footer.description', 'content' => 'The modern platform for creating and managing viral competitions.', 'type' => 'paragraph', 'order' => 1],
            ['section' => 'footer', 'key' => 'footer.copyright', 'content' => '© 2024 Competition Engine. All rights reserved.', 'type' => 'label', 'order' => 2],
        ];

        foreach ($texts as $text) {
            SiteText::updateOrCreate(
                ['key' => $text['key']],
                $text
            );
        }
    }
}
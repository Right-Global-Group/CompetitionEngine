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
            [
                'section' => 'hero', 
                'key' => 'hero.title', 
                'content' => '', 
                'type' => 'heading', 
                'order' => 1,
                'heading_before' => 'The',
                'heading_keyword' => 'Ultimate Competition',
                'heading_after' => 'Platform'
            ],
            ['section' => 'hero', 'key' => 'hero.subtitle', 'content' => 'Effortlessly create, manage, and scale engaging competitions that your audience will love. No code, no hassle.', 'type' => 'paragraph', 'order' => 2],
            ['section' => 'hero', 'key' => 'hero.button_primary', 'content' => 'Book a Demo', 'type' => 'button', 'order' => 3],
            ['section' => 'hero', 'key' => 'hero.button_secondary', 'content' => 'Game Studio', 'type' => 'button', 'order' => 4],

            // Stats Section
            [
                'section' => 'stats', 
                'key' => 'stats.heading', 
                'content' => '', 
                'type' => 'heading', 
                'order' => 1,
                'heading_before' => 'Trusted by the',
                'heading_keyword' => 'Best',
                'heading_after' => ''
            ],
            ['section' => 'stats', 'key' => 'stats.description', 'content' => 'Our platform powers successful competitions at scale, every single day.', 'type' => 'paragraph', 'order' => 2],
            ['section' => 'stats', 'key' => 'stats.value_orders', 'content' => '42000', 'type' => 'number', 'order' => 3],
            ['section' => 'stats', 'key' => 'stats.label_orders', 'content' => 'Orders Processed', 'type' => 'label', 'order' => 4],
            ['section' => 'stats', 'key' => 'stats.value_tickets', 'content' => '1250000', 'type' => 'number', 'order' => 5],
            ['section' => 'stats', 'key' => 'stats.label_tickets', 'content' => 'Tickets Sold This Month', 'type' => 'label', 'order' => 6],
            ['section' => 'stats', 'key' => 'stats.value_uptime', 'content' => '99.9', 'type' => 'number', 'order' => 7],
            ['section' => 'stats', 'key' => 'stats.label_uptime', 'content' => 'Uptime Percentage', 'type' => 'label', 'order' => 8],

            // Launch Steps
            [
                'section' => 'launch', 
                'key' => 'launch.heading', 
                'content' => '', 
                'type' => 'heading', 
                'order' => 1,
                'heading_before' => 'Launch in',
                'heading_keyword' => 'Minutes',
                'heading_after' => ''
            ],
            ['section' => 'launch', 'key' => 'launch.description', 'content' => 'A straightforward path from idea to live competition.', 'type' => 'paragraph', 'order' => 2],
            ['section' => 'launch', 'key' => 'launch.step1_title', 'content' => 'Choose Your Game', 'type' => 'subheading', 'order' => 3],
            ['section' => 'launch', 'key' => 'launch.step1_desc', 'content' => 'Select from a variety of engaging competition types like scratch cards, spin wheels, and more.', 'type' => 'paragraph', 'order' => 4],
            ['section' => 'launch', 'key' => 'launch.step2_title', 'content' => 'Customize Everything', 'type' => 'subheading', 'order' => 5],
            ['section' => 'launch', 'key' => 'launch.step2_desc', 'content' => 'Brand your competition with your logos, colors, and unique messaging to make it truly yours.', 'type' => 'paragraph', 'order' => 6],
            ['section' => 'launch', 'key' => 'launch.step3_title', 'content' => 'Define the Rules', 'type' => 'subheading', 'order' => 7],
            ['section' => 'launch', 'key' => 'launch.step3_desc', 'content' => 'Define entry criteria, prize allocation, and competition duration with our intuitive rule-builder.', 'type' => 'paragraph', 'order' => 8],
            ['section' => 'launch', 'key' => 'launch.step4_title', 'content' => 'Go Live!', 'type' => 'subheading', 'order' => 9],
            ['section' => 'launch', 'key' => 'launch.step4_desc', 'content' => 'Launch and watch the engagement roll in. Monitor everything from your powerful dashboard.', 'type' => 'paragraph', 'order' => 10],

            // Configurator
            ['section' => 'configurator', 'key' => 'configurator.label', 'content' => 'Game Studio', 'type' => 'label', 'order' => 1],
            ['section' => 'configurator', 'key' => 'configurator.heading', 'content' => 'Build Your Game', 'type' => 'heading', 'order' => 2],
            ['section' => 'configurator', 'key' => 'configurator.description', 'content' => 'Customize every detail in real-time', 'type' => 'paragraph', 'order' => 3],

            // Ecosystem Features
            [
                'section' => 'ecosystem', 
                'key' => 'ecosystem.heading', 
                'content' => '', 
                'type' => 'heading', 
                'order' => 1,
                'heading_before' => 'Your Complete',
                'heading_keyword' => 'Raffle Ecosystem',
                'heading_after' => ''
            ],
            ['section' => 'ecosystem', 'key' => 'ecosystem.description', 'content' => 'We provide the essential infrastructure to launch, operate, and scale your raffle business, all in one place.', 'type' => 'paragraph', 'order' => 2],
            
            // Ecosystem Feature Cards
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature1_icon', 'content' => '💳', 'type' => 'label', 'order' => 3],
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature1_title', 'content' => 'Compliant Payments', 'type' => 'subheading', 'order' => 4],
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature1_description', 'content' => 'Navigate complex regulations with our pre-approved payment providers, ensuring smooth, secure transactions without the usual hurdles.', 'type' => 'paragraph', 'order' => 5],
            
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature2_icon', 'content' => '🏦', 'type' => 'label', 'order' => 6],
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature2_title', 'content' => 'Simplified Banking', 'type' => 'subheading', 'order' => 7],
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature2_description', 'content' => 'Leverage our established relationships with approved banks for straightforward and hassle-free financial management from day one.', 'type' => 'paragraph', 'order' => 8],
            
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature3_icon', 'content' => '⚖️', 'type' => 'label', 'order' => 9],
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature3_title', 'content' => 'Legal Framework', 'type' => 'subheading', 'order' => 10],
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature3_description', 'content' => 'Launch with confidence. We provide comprehensive, lawyer-approved terms and conditions to ensure your site meets all necessary regulations.', 'type' => 'paragraph', 'order' => 11],
            
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature4_icon', 'content' => '📱', 'type' => 'label', 'order' => 12],
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature4_title', 'content' => 'Native iOS & Android Apps', 'type' => 'subheading', 'order' => 13],
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature4_description', 'content' => 'Maximise engagement and sales with dedicated mobile apps, featuring push notifications to keep your audience instantly updated.', 'type' => 'paragraph', 'order' => 14],
            
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature5_icon', 'content' => '👍', 'type' => 'label', 'order' => 15],
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature5_title', 'content' => 'Social Ad-Ready', 'type' => 'subheading', 'order' => 16],
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature5_description', 'content' => 'Expand your reach with our expert guidance on meeting Facebook\'s strict advertising requirements, unlocking a massive audience.', 'type' => 'paragraph', 'order' => 17],
            
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature6_icon', 'content' => '⚡', 'type' => 'label', 'order' => 18],
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature6_title', 'content' => 'Instant Wins', 'type' => 'subheading', 'order' => 19],
            ['section' => 'ecosystem', 'key' => 'ecosystem.feature6_description', 'content' => 'Amplify excitement and drive repeat sales with our highly popular instant win feature, keeping customers engaged between main draws.', 'type' => 'paragraph', 'order' => 20],
            
            // Next Gen Platform
            [
                'section' => 'nextgen', 
                'key' => 'nextgen.heading', 
                'content' => '', 
                'type' => 'heading', 
                'order' => 1,
                'heading_before' => '',
                'heading_keyword' => 'Next Generation',
                'heading_after' => 'Platform'
            ],
            ['section' => 'nextgen', 'key' => 'nextgen.description', 'content' => 'Competition Engine isn\'t just another tool; it\'s a complete evolution. Built on a serverless, edge-first architecture, we provide unparalleled speed, security, and scalability that legacy systems can\'t match.', 'type' => 'paragraph', 'order' => 2],

            // Modern Platform (WordPress Alternative)
            [
                'section' => 'modern', 
                'key' => 'modern.heading', 
                'content' => '', 
                'type' => 'heading', 
                'order' => 1,
                'heading_before' => '',
                'heading_keyword' => 'Bye Bye, WordPress.',
                'heading_after' => ''
            ],
            ['section' => 'modern', 'key' => 'modern.subheading', 'content' => 'Hello, Modern Platform.', 'type' => 'subheading', 'order' => 2],
            ['section' => 'modern', 'key' => 'modern.description', 'content' => 'Tired of slow, insecure, and clunky WordPress plugins? Competition Engine is built from the ground up for one purpose: to run flawless competitions at scale.', 'type' => 'paragraph', 'order' => 3],

            // AI Features
            [
                'section' => 'ai', 
                'key' => 'ai.heading', 
                'content' => '', 
                'type' => 'heading', 
                'order' => 1,
                'heading_before' => 'The Future is',
                'heading_keyword' => 'AI-Powered',
                'heading_after' => ''
            ],
            ['section' => 'ai', 'key' => 'ai.description', 'content' => 'Supercharge your competition site with the first AI-powered platform. Get ready for smarter analytics, automated marketing, and effortless content creation.', 'type' => 'paragraph', 'order' => 2],

            // Comparison
            ['section' => 'comparison', 'key' => 'comparison.heading', 'content' => 'Competition Engine vs. Others', 'type' => 'heading', 'order' => 1],
            ['section' => 'comparison', 'key' => 'comparison.description', 'content' => 'See how we stack up against the competition.', 'type' => 'paragraph', 'order' => 2],

            // Pricing
            [
                'section' => 'pricing', 
                'key' => 'pricing.heading', 
                'content' => '', 
                'type' => 'heading', 
                'order' => 1,
                'heading_before' => '',
                'heading_keyword' => 'Simple, Transparent',
                'heading_after' => 'Pricing'
            ],
            ['section' => 'pricing', 'key' => 'pricing.description', 'content' => 'Choose the plan that\'s right for you.', 'type' => 'paragraph', 'order' => 2],

            // FAQ
            ['section' => 'faq', 'key' => 'faq.heading', 'content' => 'Frequently Asked Questions', 'type' => 'heading', 'order' => 1],

            // Booking
            ['section' => 'booking', 'key' => 'booking.heading', 'content' => 'Ready to Launch?', 'type' => 'heading', 'order' => 1],
            ['section' => 'booking', 'key' => 'booking.description', 'content' => 'Book a demo and see Competition Engine in action.', 'type' => 'paragraph', 'order' => 2],

            // Footer
            ['section' => 'footer', 'key' => 'footer.description', 'content' => 'The modern platform for creating and managing viral competitions.', 'type' => 'paragraph', 'order' => 1],
            ['section' => 'footer', 'key' => 'footer.copyright', 'content' => '© 2025 Competition Engine. All rights reserved.', 'type' => 'label', 'order' => 2],
        ];

        foreach ($texts as $text) {
            SiteText::updateOrCreate(
                ['key' => $text['key']],
                $text
            );
        }
    }
}
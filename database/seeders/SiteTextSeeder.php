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
            ['section' => 'stats', 'key' => 'stats.value_orders', 'content' => '1500000', 'type' => 'number', 'order' => 3],
            ['section' => 'stats', 'key' => 'stats.label_orders', 'content' => 'Orders Processed', 'type' => 'label', 'order' => 4],
            ['section' => 'stats', 'key' => 'stats.value_tickets', 'content' => '120000000', 'type' => 'number', 'order' => 5],
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

            // Next Gen Platform Features
            ['section' => 'nextgen', 'key' => 'nextgen.feature1_title', 'content' => 'Global Edge Network:', 'type' => 'label', 'order' => 3],
            ['section' => 'nextgen', 'key' => 'nextgen.feature1_desc', 'content' => 'Competitions load instantly for users anywhere in the world.', 'type' => 'paragraph', 'order' => 4],

            ['section' => 'nextgen', 'key' => 'nextgen.feature2_title', 'content' => 'Serverless Infrastructure:', 'type' => 'label', 'order' => 5],
            ['section' => 'nextgen', 'key' => 'nextgen.feature2_desc', 'content' => 'Infinite scalability without the bottlenecks. Handle viral traffic spikes without a sweat.', 'type' => 'paragraph', 'order' => 6],

            ['section' => 'nextgen', 'key' => 'nextgen.feature3_title', 'content' => 'API-First Design:', 'type' => 'label', 'order' => 7],
            ['section' => 'nextgen', 'key' => 'nextgen.feature3_desc', 'content' => 'Integrate and automate everything. Connect to your existing tools with our powerful, easy-to-use API.', 'type' => 'paragraph', 'order' => 8],

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
            [
                'section' => 'comparison', 
                'key' => 'comparison.heading', 
                'content' => '', 
                'type' => 'heading', 
                'order' => 1,
                'heading_before' => 'Competition Engine vs.',
                'heading_keyword' => 'Others',
                'heading_after' => ''
            ],
            ['section' => 'comparison', 'key' => 'comparison.description', 'content' => 'See how we stack up against the competition.', 'type' => 'paragraph', 'order' => 2],
            
            // Comparison Table Data
            ['section' => 'comparison', 'key' => 'comparison.feature1', 'content' => 'Performance', 'type' => 'label', 'order' => 3],
            ['section' => 'comparison', 'key' => 'comparison.feature1_us', 'content' => 'Excellent', 'type' => 'label', 'order' => 4],
            ['section' => 'comparison', 'key' => 'comparison.feature1_wp', 'content' => 'Variable', 'type' => 'label', 'order' => 5],
            ['section' => 'comparison', 'key' => 'comparison.feature1_saas', 'content' => 'Slow', 'type' => 'label', 'order' => 6],
            
            ['section' => 'comparison', 'key' => 'comparison.feature2', 'content' => 'Security', 'type' => 'label', 'order' => 7],
            ['section' => 'comparison', 'key' => 'comparison.feature2_us', 'content' => 'High', 'type' => 'label', 'order' => 8],
            ['section' => 'comparison', 'key' => 'comparison.feature2_wp', 'content' => 'Vulnerable', 'type' => 'label', 'order' => 9],
            ['section' => 'comparison', 'key' => 'comparison.feature2_saas', 'content' => 'Moderate', 'type' => 'label', 'order' => 10],
            
            ['section' => 'comparison', 'key' => 'comparison.feature3', 'content' => 'Scalability', 'type' => 'label', 'order' => 11],
            ['section' => 'comparison', 'key' => 'comparison.feature3_us', 'content' => 'Unlimited', 'type' => 'label', 'order' => 12],
            ['section' => 'comparison', 'key' => 'comparison.feature3_wp', 'content' => 'Limited', 'type' => 'label', 'order' => 13],
            ['section' => 'comparison', 'key' => 'comparison.feature3_saas', 'content' => 'Limited', 'type' => 'label', 'order' => 14],
            
            ['section' => 'comparison', 'key' => 'comparison.feature4', 'content' => 'Ease of Use', 'type' => 'label', 'order' => 15],
            ['section' => 'comparison', 'key' => 'comparison.feature4_us', 'content' => 'Intuitive', 'type' => 'label', 'order' => 16],
            ['section' => 'comparison', 'key' => 'comparison.feature4_wp', 'content' => 'Complex', 'type' => 'label', 'order' => 17],
            ['section' => 'comparison', 'key' => 'comparison.feature4_saas', 'content' => 'Clunky', 'type' => 'label', 'order' => 18],
            
            ['section' => 'comparison', 'key' => 'comparison.feature5', 'content' => 'Support', 'type' => 'label', 'order' => 19],
            ['section' => 'comparison', 'key' => 'comparison.feature5_us', 'content' => 'Dedicated', 'type' => 'label', 'order' => 20],
            ['section' => 'comparison', 'key' => 'comparison.feature5_wp', 'content' => 'Community Forum', 'type' => 'label', 'order' => 21],
            ['section' => 'comparison', 'key' => 'comparison.feature5_saas', 'content' => 'Email Only', 'type' => 'label', 'order' => 22],

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

            // Plan 1: Pay As You Go
            ['section' => 'pricing', 'key' => 'pricing.plan1_name', 'content' => 'Pay As You Go', 'type' => 'subheading', 'order' => 3],
            ['section' => 'pricing', 'key' => 'pricing.plan1_price', 'content' => '5p - 10p', 'type' => 'label', 'order' => 4],
            ['section' => 'pricing', 'key' => 'pricing.plan1_subtext', 'content' => 'per order', 'type' => 'label', 'order' => 5],
            ['section' => 'pricing', 'key' => 'pricing.plan1_description', 'content' => 'Perfect for businesses of any size. Only pay for what you use.', 'type' => 'paragraph', 'order' => 6],
            ['section' => 'pricing', 'key' => 'pricing.plan1_feature1', 'content' => 'All Competition Types', 'type' => 'label', 'order' => 7],
            ['section' => 'pricing', 'key' => 'pricing.plan1_feature2', 'content' => 'Full Analytics Dashboard', 'type' => 'label', 'order' => 8],
            ['section' => 'pricing', 'key' => 'pricing.plan1_feature3', 'content' => 'Email Support', 'type' => 'label', 'order' => 9],
            ['section' => 'pricing', 'key' => 'pricing.plan1_feature4', 'content' => 'And many more...', 'type' => 'label', 'order' => 10],
            ['section' => 'pricing', 'key' => 'pricing.plan1_button', 'content' => 'Get Started', 'type' => 'button', 'order' => 11],
            ['section' => 'pricing', 'key' => 'pricing.plan1_highlighted', 'content' => 'false', 'type' => 'label', 'order' => 12],
            ['section' => 'pricing', 'key' => 'pricing.plan1_badge', 'content' => '', 'type' => 'label', 'order' => 13],
            ['section' => 'pricing', 'key' => 'pricing.plan1_action', 'content' => 'scroll', 'type' => 'label', 'order' => 14],

            // Plan 2: Enterprise
            ['section' => 'pricing', 'key' => 'pricing.plan2_name', 'content' => 'Enterprise', 'type' => 'subheading', 'order' => 15],
            ['section' => 'pricing', 'key' => 'pricing.plan2_price', 'content' => 'Custom', 'type' => 'label', 'order' => 16],
            ['section' => 'pricing', 'key' => 'pricing.plan2_subtext', 'content' => 'pricing', 'type' => 'label', 'order' => 17],
            ['section' => 'pricing', 'key' => 'pricing.plan2_description', 'content' => 'For larger businesses that need tailored solutions.', 'type' => 'paragraph', 'order' => 18],
            ['section' => 'pricing', 'key' => 'pricing.plan2_feature1', 'content' => 'Volume Discounts', 'type' => 'label', 'order' => 19],
            ['section' => 'pricing', 'key' => 'pricing.plan2_feature2', 'content' => 'Dedicated Account Manager', 'type' => 'label', 'order' => 20],
            ['section' => 'pricing', 'key' => 'pricing.plan2_feature3', 'content' => 'Custom Integrations & API Access', 'type' => 'label', 'order' => 21],
            ['section' => 'pricing', 'key' => 'pricing.plan2_feature4', 'content' => 'Priority Support & Onboarding', 'type' => 'label', 'order' => 22],
            ['section' => 'pricing', 'key' => 'pricing.plan2_feature5', 'content' => 'And many more...', 'type' => 'label', 'order' => 23],
            ['section' => 'pricing', 'key' => 'pricing.plan2_button', 'content' => 'Book a Call', 'type' => 'button', 'order' => 24],
            ['section' => 'pricing', 'key' => 'pricing.plan2_highlighted', 'content' => 'true', 'type' => 'label', 'order' => 25],
            ['section' => 'pricing', 'key' => 'pricing.plan2_badge', 'content' => 'BEST VALUE', 'type' => 'label', 'order' => 26],
            ['section' => 'pricing', 'key' => 'pricing.plan2_action', 'content' => 'calendly', 'type' => 'label', 'order' => 27],

            // FAQ
            [
                'section' => 'faq', 
                'key' => 'faq.heading', 
                'content' => '', 
                'type' => 'heading', 
                'order' => 1,
                'heading_before' => 'Frequently Asked',
                'heading_keyword' => 'Questions',
                'heading_after' => ''
            ],
            ['section' => 'faq', 'key' => 'faq.description', 'content' => 'Got questions? We\'ve got answers.', 'type' => 'paragraph', 'order' => 2],
            
            // FAQ Items
            ['section' => 'faq', 'key' => 'faq.q1', 'content' => 'What types of competitions can I create?', 'type' => 'subheading', 'order' => 3],
            ['section' => 'faq', 'key' => 'faq.a1', 'content' => 'You can create a wide variety of competitions including raffles, instant win games (slots, scratch cards, spin wheels), sweepstakes, and more. Our platform is flexible and can accommodate most competition formats.', 'type' => 'paragraph', 'order' => 4],
            
            ['section' => 'faq', 'key' => 'faq.q2', 'content' => 'How quickly can I launch a competition?', 'type' => 'subheading', 'order' => 5],
            ['section' => 'faq', 'key' => 'faq.a2', 'content' => 'With our intuitive interface, you can have a competition up and running in minutes. Choose your game type, customize the look and feel, set your rules, and you\'re ready to go live!', 'type' => 'paragraph', 'order' => 6],
            
            ['section' => 'faq', 'key' => 'faq.q3', 'content' => 'Is Competition Engine secure and compliant?', 'type' => 'subheading', 'order' => 7],
            ['section' => 'faq', 'key' => 'faq.a3', 'content' => 'Absolutely. We take security and compliance very seriously. Our platform is built with enterprise-grade security, and we provide comprehensive legal frameworks to ensure your competitions meet all necessary regulations.', 'type' => 'paragraph', 'order' => 8],
            
            ['section' => 'faq', 'key' => 'faq.q4', 'content' => 'Can I integrate Competition Engine with my existing tools?', 'type' => 'subheading', 'order' => 9],
            ['section' => 'faq', 'key' => 'faq.a4', 'content' => 'Yes! Competition Engine is API-first, which means you can easily integrate with your existing CRM, email marketing tools, analytics platforms, and more. Our robust API makes automation and custom integrations straightforward.', 'type' => 'paragraph', 'order' => 10],

            // Booking
            [
                'section' => 'booking', 
                'key' => 'booking.heading', 
                'content' => '', 
                'type' => 'heading', 
                'order' => 1,
                'heading_before' => 'Ready to',
                'heading_keyword' => 'Launch?',
                'heading_after' => ''
            ],
            ['section' => 'booking', 'key' => 'booking.description', 'content' => 'Book a demo and see Competition Engine in action.', 'type' => 'paragraph', 'order' => 2],

            // Footer
            ['section' => 'footer', 'key' => 'footer.description', 'content' => 'The modern platform for creating and managing viral competitions.', 'type' => 'paragraph', 'order' => 1],
            ['section' => 'footer', 'key' => 'footer.copyright', 'content' => '© 2025 Competition Engine. All rights reserved.', 'type' => 'label', 'order' => 2],

            // ========================================
            // ABOUT PAGE
            // ========================================
            [
                'section' => 'about',
                'key' => 'about.hero_heading',
                'content' => '',
                'type' => 'heading',
                'order' => 1,
                'heading_before' => 'Unique',
                'heading_keyword' => 'By Design',
                'heading_after' => ''
            ],
            ['section' => 'about', 'key' => 'about.hero_description', 'content' => 'Manchester-born, globally focused. Our vision is simple: every competition site deserves its own Unique Identity.', 'type' => 'paragraph', 'order' => 2],

            // About Core Values
            ['section' => 'about', 'key' => 'about.value1_number', 'content' => '01', 'type' => 'label', 'order' => 3],
            ['section' => 'about', 'key' => 'about.value1_title', 'content' => 'Zero Repetition', 'type' => 'subheading', 'order' => 4],
            ['section' => 'about', 'key' => 'about.value1_description', 'content' => 'We reject the "plugin-and-play" culture. Your brand is unique, and your platform should be a bespoke reflection of that vision.', 'type' => 'paragraph', 'order' => 5],

            ['section' => 'about', 'key' => 'about.value2_number', 'content' => '02', 'type' => 'label', 'order' => 6],
            ['section' => 'about', 'key' => 'about.value2_title', 'content' => 'Identity as Logic', 'type' => 'subheading', 'order' => 7],
            ['section' => 'about', 'key' => 'about.value2_description', 'content' => 'Customisation isn\'t just skin deep. We build unique workflows, logic, and prize systems tailored specifically to your audience.', 'type' => 'paragraph', 'order' => 8],

            ['section' => 'about', 'key' => 'about.value3_number', 'content' => '03', 'type' => 'label', 'order' => 9],
            ['section' => 'about', 'key' => 'about.value3_title', 'content' => 'Elite Experience', 'type' => 'subheading', 'order' => 10],
            ['section' => 'about', 'key' => 'about.value3_description', 'content' => 'Every pixel is an opportunity to engage. We provide the tools to build immersive worlds, not just raffle listings.', 'type' => 'paragraph', 'order' => 11],

            // About Vision Section
            [
                'section' => 'about',
                'key' => 'about.vision_heading',
                'content' => '',
                'type' => 'heading',
                'order' => 12,
                'heading_before' => 'Our Vision for',
                'heading_keyword' => 'Individuality',
                'heading_after' => ''
            ],
            ['section' => 'about', 'key' => 'about.vision_paragraph1', 'content' => 'The internet is becoming a sea of sameness. Competition Engine was founded to break the cycle of identical WordPress sites that all look, feel, and fail in the same way.', 'type' => 'paragraph', 'order' => 13],
            ['section' => 'about', 'key' => 'about.vision_paragraph2', 'content' => 'We give creators the power of elite-tier engineering while maintaining complete creative freedom. Our vision is to empower every site owner to stand out with a distinct digital footprint that is impossible to copy and hard to forget.', 'type' => 'paragraph', 'order' => 14],

            // About CTA
            ['section' => 'about', 'key' => 'about.cta_heading', 'content' => 'Ready to build your identity?', 'type' => 'heading', 'order' => 15],
            ['section' => 'about', 'key' => 'about.cta_button', 'content' => 'Work With Us', 'type' => 'button', 'order' => 16],

            // ========================================
            // CONTACT PAGE
            // ========================================
            [
                'section' => 'contact',
                'key' => 'contact.hero_heading',
                'content' => '',
                'type' => 'heading',
                'order' => 1,
                'heading_before' => 'Let\'s',
                'heading_keyword' => 'Connect',
                'heading_after' => ''
            ],
            ['section' => 'contact', 'key' => 'contact.hero_description', 'content' => 'Have questions about scaling your competition? Our experts are here to help you build the ultimate engagement machine.', 'type' => 'paragraph', 'order' => 2],

            // Email Card
            ['section' => 'contact', 'key' => 'contact.email_title', 'content' => 'Email Us', 'type' => 'subheading', 'order' => 3],
            ['section' => 'contact', 'key' => 'contact.email_subtitle', 'content' => 'for all enquires please use the below email', 'type' => 'paragraph', 'order' => 4],
            ['section' => 'contact', 'key' => 'contact.email_address', 'content' => 'contact@compengine.io', 'type' => 'label', 'order' => 5],

            // Location Card
            ['section' => 'contact', 'key' => 'contact.location_title', 'content' => 'Location', 'type' => 'subheading', 'order' => 6],
            ['section' => 'contact', 'key' => 'contact.location_subtitle', 'content' => 'Visit us for a coffee and a demo', 'type' => 'paragraph', 'order' => 7],
            ['section' => 'contact', 'key' => 'contact.location_city', 'content' => 'Manchester', 'type' => 'label', 'order' => 8],

            // Live Chat Card
            ['section' => 'contact', 'key' => 'contact.chat_title', 'content' => 'Live Chat', 'type' => 'subheading', 'order' => 9],
            ['section' => 'contact', 'key' => 'contact.chat_subtitle', 'content' => 'Available Mon-Fri, 9am - 6pm', 'type' => 'paragraph', 'order' => 10],
            ['section' => 'contact', 'key' => 'contact.chat_button', 'content' => 'Start a conversation', 'type' => 'button', 'order' => 11],

            // Contact Form
            ['section' => 'contact', 'key' => 'contact.form_success', 'content' => 'Thanks for reaching out! We\'ll be in touch shortly.', 'type' => 'paragraph', 'order' => 12],
            ['section' => 'contact', 'key' => 'contact.form_first_name', 'content' => 'First Name', 'type' => 'label', 'order' => 13],
            ['section' => 'contact', 'key' => 'contact.form_first_name_placeholder', 'content' => 'John', 'type' => 'label', 'order' => 14],
            ['section' => 'contact', 'key' => 'contact.form_last_name', 'content' => 'Last Name', 'type' => 'label', 'order' => 15],
            ['section' => 'contact', 'key' => 'contact.form_last_name_placeholder', 'content' => 'Doe', 'type' => 'label', 'order' => 16],
            ['section' => 'contact', 'key' => 'contact.form_email', 'content' => 'Email Address', 'type' => 'label', 'order' => 17],
            ['section' => 'contact', 'key' => 'contact.form_email_placeholder', 'content' => 'john@company.com', 'type' => 'label', 'order' => 18],
            ['section' => 'contact', 'key' => 'contact.form_phone', 'content' => 'Phone Number', 'type' => 'label', 'order' => 19],
            ['section' => 'contact', 'key' => 'contact.form_phone_placeholder', 'content' => '+44 0000 000000', 'type' => 'label', 'order' => 20],
            ['section' => 'contact', 'key' => 'contact.form_message', 'content' => 'Message', 'type' => 'label', 'order' => 21],
            ['section' => 'contact', 'key' => 'contact.form_message_placeholder', 'content' => 'How can we help your competition business grow?', 'type' => 'label', 'order' => 22],
            ['section' => 'contact', 'key' => 'contact.form_button', 'content' => 'Send Message', 'type' => 'button', 'order' => 23],
        ];

        // Using firstOrCreate ensures existing records are NEVER updated
        // Only new records are created
        foreach ($texts as $text) {
            SiteText::firstOrCreate(
                ['key' => $text['key']], // Check if this key already exists
                $text // If not, create with this data
            );
        }
    }
}
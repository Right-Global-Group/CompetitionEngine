import { computed } from 'vue';

/**
 * Get heading parts for rendering with keyword animation
 * Expects data structure from API with heading_before, heading_keyword, heading_after
 */
export function useHeadingParts() {
    const getHeadingParts = (getText, key, fallbackBefore = '', fallbackKeyword = '', fallbackAfter = '') => {
        // Try to get the structured heading parts
        const before = getText(`${key}.before`, fallbackBefore);
        const keyword = getText(`${key}.keyword`, fallbackKeyword);
        const after = getText(`${key}.after`, fallbackAfter);
        
        // Build parts array for rendering
        const parts = [];
        
        if (before && before.trim()) {
            parts.push({ text: before, isKeyword: false });
        }
        
        if (keyword && keyword.trim()) {
            parts.push({ text: keyword, isKeyword: true });
        }
        
        if (after && after.trim()) {
            parts.push({ text: after, isKeyword: false });
        }
        
        return parts;
    };
    
    return {
        getHeadingParts
    };
}
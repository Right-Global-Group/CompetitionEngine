import { computed } from 'vue';

export function useHeadingParser() {
    const parseHeading = (text) => {
        const parts = [];
        let currentIndex = 0;
        
        const regex = /\{keyword\}(.*?)\{\/keyword\}/g;
        let match;
        
        while ((match = regex.exec(text)) !== null) {
            if (match.index > currentIndex) {
                parts.push({
                    text: text.substring(currentIndex, match.index),
                    isKeyword: false
                });
            }
            
            parts.push({
                text: match[1],
                isKeyword: true
            });
            
            currentIndex = match.index + match[0].length;
        }
        
        if (currentIndex < text.length) {
            parts.push({
                text: text.substring(currentIndex),
                isKeyword: false
            });
        }
        
        return parts;
    };
    
    return { parseHeading };
}
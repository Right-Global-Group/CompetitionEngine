<script setup>
import { ref, computed } from 'vue';

const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());
const selectedDate = ref(null);
const selectedTime = ref(null);

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
];

const daysInMonth = computed(() => {
    return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
});

const firstDayOfMonth = computed(() => {
    return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

const calendarDays = computed(() => {
    const days = [];
    const totalDays = daysInMonth.value;
    const firstDay = firstDayOfMonth.value;
    
    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        days.push({ day: null, disabled: true });
    }
    
    // Actual days
    const today = new Date();
    for (let day = 1; day <= totalDays; day++) {
        const date = new Date(currentYear.value, currentMonth.value, day);
        const isPast = date < today.setHours(0, 0, 0, 0);
        days.push({ day, disabled: isPast });
    }
    
    return days;
});

const selectDate = (day) => {
    if (day.disabled || !day.day) return;
    selectedDate.value = day.day;
    selectedTime.value = null;
};

const selectTime = (time) => {
    selectedTime.value = time;
};

const previousMonth = () => {
    if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value--;
    } else {
        currentMonth.value--;
    }
    selectedDate.value = null;
    selectedTime.value = null;
};

const nextMonth = () => {
    if (currentMonth.value === 11) {
        currentMonth.value = 0;
        currentYear.value++;
    } else {
        currentMonth.value++;
    }
    selectedDate.value = null;
    selectedTime.value = null;
};

const confirmBooking = () => {
    if (selectedDate.value && selectedTime.value) {
        alert(`Demo booked for ${monthNames[currentMonth.value]} ${selectedDate.value}, ${currentYear.value} at ${selectedTime.value}`);
    }
};

const bookingConfirmation = computed(() => {
    if (selectedDate.value && selectedTime.value) {
        return `${monthNames[currentMonth.value]} ${selectedDate.value}, ${currentYear.value} at ${selectedTime.value}`;
    }
    return '';
});
</script>

<template>
    <section id="booking" class="py-20 bg-[#161B22]">
        <div class="container mx-auto px-4 sm:px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                    Book Your <span class="keyword-animate">Free Demo</span>
                </h2>
                <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                    See Competition Engine in action. Choose a time that works for you.
                </p>
            </div>

            <div class="max-w-5xl mx-auto liquid-glass rounded-xl p-8">
                <div class="grid md:grid-cols-2 gap-8">
                    <!-- Calendar -->
                    <div>
                        <div class="flex justify-between items-center mb-6">
                            <button 
                                @click="previousMonth"
                                class="p-2 hover:bg-gray-700 rounded-lg transition"
                            >
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                            </button>
                            <h3 class="text-xl font-bold text-white">
                                {{ monthNames[currentMonth] }} {{ currentYear }}
                            </h3>
                            <button 
                                @click="nextMonth"
                                class="p-2 hover:bg-gray-700 rounded-lg transition"
                            >
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>

                        <!-- Days of week -->
                        <div class="grid grid-cols-7 gap-2 mb-2">
                            <div 
                                v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
                                :key="day"
                                class="text-center text-sm text-gray-400 font-semibold"
                            >
                                {{ day }}
                            </div>
                        </div>

                        <!-- Calendar days -->
                        <div class="grid grid-cols-7 gap-2">
                            <button
                                v-for="(dayObj, index) in calendarDays"
                                :key="index"
                                @click="selectDate(dayObj)"
                                :disabled="dayObj.disabled || !dayObj.day"
                                :class="[
                                    'calendar-day p-3 rounded-lg text-center transition-all',
                                    dayObj.day && !dayObj.disabled ? 'bg-gray-700 text-white hover:bg-accent-purple cursor-pointer' : 'invisible',
                                    selectedDate === dayObj.day ? 'selected bg-accent-orange text-white' : '',
                                    dayObj.disabled && dayObj.day ? 'opacity-30 cursor-not-allowed' : ''
                                ]"
                            >
                                {{ dayObj.day }}
                            </button>
                        </div>
                    </div>

                    <!-- Time Slots -->
                    <div class="border-t border-gray-700 md:border-t-0 md:border-l md:pl-8 pt-8 md:pt-0">
                        <h3 class="text-xl font-semibold text-white mb-4 text-center md:text-left">Select a Time</h3>
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <button
                                v-for="time in timeSlots"
                                :key="time"
                                @click="selectTime(time)"
                                :disabled="!selectedDate"
                                :class="[
                                    'time-slot p-3 border border-gray-600 rounded-lg transition-all',
                                    !selectedDate ? 'opacity-50 cursor-not-allowed' : 'hover:border-pink-400 cursor-pointer',
                                    selectedTime === time ? 'selected bg-accent-orange text-white border-accent-orange' : 'text-white'
                                ]"
                            >
                                {{ time }}
                            </button>
                        </div>
                        <div class="mt-6">
                            <p class="text-center h-6 text-pink-400 mb-2">
                                {{ bookingConfirmation }}
                            </p>
                            <button 
                                @click="confirmBooking"
                                :disabled="!selectedDate || !selectedTime"
                                class="w-full bg-[#A020F0] text-white font-semibold py-3 rounded-lg hover:bg-[#FF00E6] transition glow-button disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Confirm Demo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.calendar-day:not(.disabled):hover {
    background-color: #6A3FF4;
    color: #11052C;
    transform: scale(1.1);
}

.calendar-day.selected {
    background-color: #FF9900;
    color: #11052C;
    font-weight: bold;
}

.time-slot.selected {
    background-color: #FF9900;
    color: #11052C;
    border-color: #FF9900;
}
</style>
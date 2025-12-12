import { ref, computed } from 'vue';

export function useCalendar() {
    const currentDate = ref(new Date());
    const selectedDate = ref(null);
    const selectedTime = ref(null);

    const monthYear = computed(() => {
        return currentDate.value.toLocaleString('default', { 
            month: 'long', 
            year: 'numeric' 
        });
    });

    const daysInMonth = computed(() => {
        const year = currentDate.value.getFullYear();
        const month = currentDate.value.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        
        const dayOffset = (firstDay === 0) ? 6 : firstDay - 1;
        const days = [];

        // Add blank days
        for (let i = 0; i < dayOffset; i++) {
            days.push({ day: null, disabled: true });
        }

        // Add actual days
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let day = 1; day <= lastDate; day++) {
            const date = new Date(year, month, day);
            days.push({
                day,
                date,
                disabled: date < today,
                isToday: date.toDateString() === new Date().toDateString()
            });
        }

        return days;
    });

    const previousMonth = () => {
        currentDate.value = new Date(
            currentDate.value.getFullYear(),
            currentDate.value.getMonth() - 1,
            1
        );
    };

    const nextMonth = () => {
        currentDate.value = new Date(
            currentDate.value.getFullYear(),
            currentDate.value.getMonth() + 1,
            1
        );
    };

    const selectDate = (date) => {
        selectedDate.value = date;
    };

    const selectTime = (time) => {
        selectedTime.value = time;
    };

    const canConfirm = computed(() => {
        return selectedDate.value && selectedTime.value;
    });

    return {
        currentDate,
        selectedDate,
        selectedTime,
        monthYear,
        daysInMonth,
        previousMonth,
        nextMonth,
        selectDate,
        selectTime,
        canConfirm
    };
}
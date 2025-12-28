import { writable } from 'svelte/store';

export const toast = writable({
	message: '',
	type: 'success', // 'success' | 'error'
	show: false
});

export const showToast = (msg: string, type = 'success') => {
	toast.set({ message: msg, type, show: true });
	setTimeout(() => toast.set({ message: '', type: 'success', show: false }), 3000);
};

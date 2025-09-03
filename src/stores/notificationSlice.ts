import type { StateCreator } from "zustand";
import type { FavoriteSliceType } from "./favoritesSlice";

type Notificaction = {
    text: string;
    error: boolean;
    show: boolean;
}

export type NotificationSliceType = {
    notification: Notificaction;
    showNotification: (payload: Pick<Notificaction, 'text' | 'error'>) => void;
    hiddeNotification: () => void;
}

export const createNotificactionSlice: StateCreator<NotificationSliceType & FavoriteSliceType, [], [], NotificationSliceType> = (set, get) => ({
    notification: {
        text: '',
        error: false,
        show: false,
    },
    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true,
            }
        });
        setTimeout(() => {
            get().hiddeNotification();
        }, 3000);
    },
    hiddeNotification: () => {
        set({
            notification: {
                text: '',
                error: false,
                show: false,
            },
        });
    }
})
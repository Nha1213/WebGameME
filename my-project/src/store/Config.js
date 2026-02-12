import {create} from 'zustand';
export const countStore = create((set) => {
    return {
        config: {
            team: null,
        },
        SetConfig: (params) => set((state) => ({ config: params }))
    }
})
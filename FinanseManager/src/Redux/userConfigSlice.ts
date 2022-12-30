import {createSlice} from "@reduxjs/toolkit";

interface config {
    isNotification: boolean
    isRest: boolean
    notificationTime: Date
    synchronizationTime: Date
}

const config: config = {
    isNotification: true,
    isRest: true,
    notificationTime: new Date(),
    synchronizationTime: new Date()
}

const configSlice = createSlice({
    name: "config",
    initialState: {config},
    reducers: {
        toggleIsNotification(state, action) {
            state.config.isNotification = action.payload
        },
        toggleIsRest(state, action) {
            state.config.isRest = action.payload
        },
        getNotificationTime(state, action) {
            state.config.notificationTime = action.payload.currentDate
        },
        getSynchronizationTime(state, action) {
            state.config.synchronizationTime = action.payload.synchronizationTime
        }
    }
})

export const {toggleIsNotification, toggleIsRest, getNotificationTime, getSynchronizationTime} = configSlice.actions;

export default configSlice.reducer
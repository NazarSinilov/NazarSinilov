import Synchronization from "./Synchronization/Synchronization";
import {getSynchronizationTime} from "../../../redux/userConfigSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

const SynchronizationContainer = () => {
    const dispatch = useDispatch()
    const setSynchTime = () => {
        const synchronizationDate = new Date()
        dispatch(getSynchronizationTime({synchronizationDate}))
    }
    const synchronizationTime = useSelector((state: RootState) => state.config.config.synchronizationTime)

    return (
        <Synchronization setSynchTime={setSynchTime} synchronizationTime={synchronizationTime}/>
    );
};

export default SynchronizationContainer;
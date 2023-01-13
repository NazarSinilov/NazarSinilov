import Rest from "./Rest/Rest";
import {toggleIsRest} from "../../../redux/userConfigSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

const RestContainer = () => {
    const dispatch = useDispatch()
    const isRest = useSelector((state: RootState) => state.config.config.isRest)
    const toggleSwitchRest = () => {
        dispatch(toggleIsRest(!isRest))
    }

    return (
        <Rest toggleSwitchRest={toggleSwitchRest} isRest={isRest}/>
    );
};

export default RestContainer;
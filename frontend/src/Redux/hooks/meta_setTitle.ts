import { META_SET_TITLE_INTERFACE } from "@redux/actions/meta";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function (title: string) {
    const dispatch = useDispatch();
    useEffect(() => {
        const action: META_SET_TITLE_INTERFACE = {
            type: "META_SET_TITLE_ACTION",
            title
        };
        dispatch(action);
    }, []);

}
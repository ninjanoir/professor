//import style from "../scss/styles.module.scss";
import { Embed } from "semantic-ui-react";

const Video = () => {
    return (
        <Embed
        autoplay={true}
        color="white"
        hd={false}
        id="FzUClKWmDho"
        iframe={{
            allowFullScreen: false,
            style: {
            padding: 10,
            },
        }}
        source="youtube"
        className="container centered"
        placeholder='https://cdn.pixabay.com/photo/2017/10/06/16/22/head-2823697_960_720.jpg'
        />
    );
};

export default Video;

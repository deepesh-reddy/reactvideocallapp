import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const VideoPage = () => {
    const { id } = useParams();

    // Placeholder function to get URL parameters
    const getUrlParams = () => {
        return new URLSearchParams(window.location.search);
    };

    // Placeholder function to generate random IDs
    const randomID = (length) => {
        return Math.random().toString(36).substring(2, 2 + length);
    };

    const roomID = getUrlParams().get('roomID') || randomID(5);

    let myMeeting = (element) => {
        // generate Kit Token
        const appID = 1565879379;
        const serverSecret = "c3e54c6577fcd04219b2ebfdfe66778b";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        '?roomID=' +
                        roomID,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
            },
        });
    };

    return (
        <div>
            VideoCall App by Deepesh Reddy {id}
            <div ref={myMeeting}></div>
        </div>
    );
};

export default VideoPage;

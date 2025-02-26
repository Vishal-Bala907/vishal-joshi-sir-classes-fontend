"use client";
import React, { useEffect, useState } from "react";
import AgoraRTC, {
  LocalUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
  RemoteUser,
} from "agora-rtc-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { BsTelephoneXFill } from "react-icons/bs";
import { setIsLive } from "@/Redux/Reducers/isLiveSlice";
import { updateSessionById } from "@/server/sessions";
import { PiCameraDuotone, PiCameraSlashDuotone } from "react-icons/pi";
import "./LiveStream.css"; // For custom styles

interface LiveSessoinProps {
  liveSessionId: string;
}

const LiveStream: React.FC<LiveSessoinProps> = ({ liveSessionId }) => {
  const [calling, setCalling] = useState(true);
  const isConnected = useIsConnected();

  // Get data from Redux
  const data = useSelector((state: RootState) => state.videoCall);
  const user = useSelector((state: any) => state.user);
  const isLive = useSelector((state: RootState) => state.isLive.isLive);
  const dispatch = useDispatch();

  // Agora Config
  const [appId] = useState("d4eb747bac0449b59a596c72b267a498");
  const [token, setToken] = useState(data.token);

  // Update token if it changes in Redux
  useEffect(() => {
    setToken(data.token);
  }, [data.token]);

  // Join logic for the broadcaster
  useJoin(
    {
      appid: appId,
      channel: data.CHANNEL_NAME,
      token: token || null,
      uid: user._id,
    },
    calling
  );

  // Local microphone and camera for broadcaster
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  // Publish local tracks for the broadcaster
  usePublish([localMicrophoneTrack, localCameraTrack]);

  // Remote users (viewers)
  const remoteUsers = useRemoteUsers();

  // End call for broadcaster
  function handleCallEnd() {
    if (user.role === "admin") {
      updateSessionById("TAKEN", liveSessionId)
        .then(() => {
          setCalling(false);
          dispatch(setIsLive(false));
          location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setCalling(false);
      dispatch(setIsLive(false));
      location.reload();
    }
  }

  // Effect to handle local camera
  useEffect(() => {
    if (localCameraTrack) {
      try {
        if (cameraOn) {
          localCameraTrack.play("lsc-local-video");
        } else {
          localCameraTrack.stop();
        }
      } catch (err) {
        console.error("Error playing/stopping local video track:", err);
      }
    }

    return () => {
      if (localCameraTrack) {
        localCameraTrack.stop();
      }
    };
  }, [localCameraTrack, cameraOn]);

  console.log(remoteUsers);

  return (
    <div className="lsc-livestream-container">
      {user.role === "admin" ? (
        <div className="lsc-content">
          <div className="lsc-broadcaster">
            <LocalUser
              audioTrack={localMicrophoneTrack}
              cameraOn={cameraOn}
              micOn={micOn}
              videoTrack={localCameraTrack}
              cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
              style={{ height: "100%", width: "100%" }}
            />
            <div className="lsc-controls">
              <button onClick={() => setMic((prev) => !prev)}>
                {micOn ? "Mute Mic" : "Unmute Mic"}
              </button>
              <button onClick={() => setCamera((prev) => !prev)}>
                {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
              </button>
              <button className="lsc-end-call" onClick={handleCallEnd}>
                End Call
              </button>
            </div>
          </div>

          <div className="lsc-chat-container">
            <div className="lsc-chat-messages"></div>
            <div className="lsc-chat-input">
              <input type="text" placeholder="Type a message..." />
              <button>Send</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="lsc-content">
          <div className="lsc-broadcaster">
            {remoteUsers.map(
              (user) =>
                user.uid === "67b6c38104a818e90df30d51" && (
                  <RemoteUser
                    key={user.uid}
                    user={user}
                    style={{ width: "100%", height: "100%" }}
                  >
                    {/* <span>{user.uid}</span> */}
                  </RemoteUser>
                )
            )}
          </div>

          <div className="lsc-chat-container">
            <div className="lsc-chat-messages"></div>
            <div className="lsc-chat-input">
              <input type="text" placeholder="Type a message..." />
              <button>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStream;

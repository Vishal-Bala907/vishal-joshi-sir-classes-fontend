"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import AgoraRTC, {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaMicrophoneAltSlash } from "react-icons/fa";
import { PiCameraDuotone } from "react-icons/pi";
import { PiCameraSlashDuotone } from "react-icons/pi";
import { BsTelephoneXFill } from "react-icons/bs";
import { setIsLive } from "@/Redux/Reducers/isLiveSlice";
import { updateSessionById } from "@/server/sessions";

interface LiveSessoinProps {
  liveSessionId: string;
}

const VideoCall: React.FC<LiveSessoinProps> = ({ liveSessionId }) => {
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

  // Join logic
  useJoin(
    {
      appid: appId,
      channel: data.CHANNEL_NAME,
      token: token || null,
      uid: user._id,
    },
    calling
  );

  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  function handleCallEnd() {
    if (user.role === "admin") {
      updateSessionById("TAKEN", liveSessionId)
        .then((data) => {
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

  useEffect(() => {
    if (localCameraTrack) {
      try {
        if (cameraOn) {
          localCameraTrack.play("local-video");
        } else {
          localCameraTrack.stop();
        }
      } catch (err) {
        console.error("Error playing/stopping local video track:", err);
      }
    }
    return () => {
      // handleCallEnd();
    };
  }, [localCameraTrack, cameraOn]);

  // Publish local tracks
  usePublish([localMicrophoneTrack, localCameraTrack]);

  // Remote users
  const remoteUsers = useRemoteUsers();

  useEffect(() => {
    console.log("Remote Users Updated:", remoteUsers);
  }, [remoteUsers]);

  return (
    <div>
      {/* <div
        id="local-video"
        style={{ border: "2px solid ", width: "400px", height: "400px" }}
      ></div> */}
      <LocalUser
        audioTrack={localMicrophoneTrack}
        cameraOn={cameraOn}
        micOn={micOn}
        videoTrack={localCameraTrack}
        cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
        style={{
          height: "400px",
          width: "400px",
        }}
      >
        <div className="controls d-flex gap-4 py-2 px-3">
          <samp className="user-name">You</samp>
          {micOn ? (
            <FaMicrophoneAlt
              style={{
                fontSize: "x-large",
                color: "green",
              }}
              onClick={() => setMic((prev) => !prev)}
            />
          ) : (
            <FaMicrophoneAltSlash
              style={{
                fontSize: "x-large",
                color: "red",
              }}
              onClick={() => setMic((prev) => !prev)}
            />
          )}

          {cameraOn ? (
            <PiCameraDuotone
              // className="px-4"
              style={{
                fontSize: "x-large",
                color: "green",
              }}
              onClick={() => setCamera((prev) => !prev)}
            />
          ) : (
            <PiCameraSlashDuotone
              // className="px-4"
              style={{
                fontSize: "x-large",
                color: "red",
              }}
              onClick={() => setCamera((prev) => !prev)}
            />
          )}
          {calling && (
            <BsTelephoneXFill
              style={{
                fontSize: "x-large",
                color: "red",
              }}
              onClick={handleCallEnd}
            />
          )}
        </div>
      </LocalUser>
      <div className="user-list">
        {remoteUsers.map((user) => (
          <div className="user" key={user.uid}>
            <RemoteUser
              style={{ height: "400px", width: "400px" }}
              cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
              user={user}
            >
              <span className="user-name">{user.uid}</span>
            </RemoteUser>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCall;

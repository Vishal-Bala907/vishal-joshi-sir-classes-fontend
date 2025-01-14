"use client";
import React, { useEffect, useState } from "react";
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
import { BsTelephoneXFill } from "react-icons/bs";
import { setIsLive } from "@/Redux/Reducers/isLiveSlice";
import { updateSessionById } from "@/server/sessions";
import { PiCameraDuotone, PiCameraSlashDuotone } from "react-icons/pi";

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

  useEffect(() => {
    console.log("Remote Users Updated:", remoteUsers);
  }, [remoteUsers]);

  // End call for broadcaster
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

  // Effect to handle local camera
  useEffect(() => {
    if (localCameraTrack) {
      try {
        if (cameraOn) {
          // Play the local camera track on the "local-video" element
          localCameraTrack.play("local-video");
        } else {
          // Stop the local camera track when it's turned off
          localCameraTrack.stop();
        }
      } catch (err) {
        console.error("Error playing/stopping local video track:", err);
      }
    }

    // Cleanup: stop the local camera when the component is unmounted
    return () => {
      if (localCameraTrack) {
        localCameraTrack.stop();
      }
    };
  }, [localCameraTrack, cameraOn]);

  return (
    <div>
      {/* Local broadcaster video */}
      {user.role === "admin" && (
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
          {/* Controls for broadcaster */}
          <div className="controls d-flex gap-4 py-2 px-3">
            <samp className="user-name">You (Broadcaster)</samp>
            {micOn ? (
              <BsTelephoneXFill
                style={{
                  fontSize: "x-large",
                  color: "green",
                }}
                onClick={() => setMic((prev) => !prev)}
              />
            ) : (
              <BsTelephoneXFill
                style={{
                  fontSize: "x-large",
                  color: "red",
                }}
                onClick={() => setMic((prev) => !prev)}
              />
            )}
            {cameraOn ? (
              <PiCameraDuotone
                style={{
                  fontSize: "x-large",
                  color: "green",
                }}
                onClick={() => setCamera((prev) => !prev)}
              />
            ) : (
              <PiCameraSlashDuotone
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
      )}

      {/* Remote viewers */}
      <div className="user-list">
        {remoteUsers.map((remoteUser) => (
          <div className="user" key={remoteUser.uid}>
            <RemoteUser
              style={{ height: "400px", width: "400px" }}
              cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
              user={remoteUser}
            >
              <span className="user-name">{remoteUser.uid}</span>
            </RemoteUser>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveStream;

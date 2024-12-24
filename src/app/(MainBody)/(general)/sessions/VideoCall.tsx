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
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";

const VideoCall = () => {
  const [calling, setCalling] = useState(true);
  const isConnected = useIsConnected();

  // Get data from Redux
  const data = useSelector((state: RootState) => state.videoCall);
  const user = useSelector((state: RootState) => state.user);

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

  // useEffect(() => {
  //   if (calling && data.CHANNEL_NAME && token) {
  //     joinCall();
  //   }
  // }, [calling, data.CHANNEL_NAME, token, joinCall]);

  // Local tracks
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

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
      <div id="local-video" style={{ width: "400px", height: "400px" }}></div>
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
      <div className="controls">
        <button onClick={() => setMic((prev) => !prev)}>
          {micOn ? "Mute Mic" : "Unmute Mic"}
        </button>
        <button onClick={() => setCamera((prev) => !prev)}>
          {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
        </button>
      </div>
    </div>
  );
};

export default VideoCall;

import { FC, useState } from "react";
import { View } from "react-native";
import AudioPreview from "../components/AudioPreview";
import VideoPreview from "../components/VideoPreview";

const Home: FC = () => {
  const [videoSource, setVideoSource] = useState<null | string>(null);
  const [audioSource, setAudioSource] = useState<null | string>(null);

  return (
    <View
      style={{
        flex: 1,
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
    >
      {!audioSource && (
        <VideoPreview source={videoSource} setVideoSource={setVideoSource} />
      )}
      {!videoSource && (
        <AudioPreview source={audioSource!} setAudioSource={setAudioSource} />
      )}
    </View>
  );
};

export default Home;

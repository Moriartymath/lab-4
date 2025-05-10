import { FC, useState } from "react";
import { Platform, Text, View } from "react-native";
import { Button } from "react-native-paper";
import VideoPreview from "../components/ViewPreview";
import { launchImageLibraryAsync } from "expo-image-picker";

const Home: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoSource, setVideoSource] = useState<null | string>(null);
  const [audioSource, setAudioSource] = useState<null | string>(null);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {videoSource ? (
        <VideoPreview
          source={videoSource}
          onClose={() => setVideoSource(null)}
        />
      ) : (
        <Button
          loading={isLoading}
          disabled={isLoading}
          mode="contained"
          onPress={async () => {
            setIsLoading(true);
            try {
              const res = await launchImageLibraryAsync({
                selectionLimit: 1,
                mediaTypes: "videos",
              });

              if (res.assets?.length) {
                setVideoSource(res.assets[0].uri!);
              }
            } catch {
            } finally {
              setIsLoading(false);
            }
          }}
        >
          Choose Video
        </Button>
      )}
    </View>
  );
};

export default Home;

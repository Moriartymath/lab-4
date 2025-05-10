import { useEvent } from "expo";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useVideoPlayer, VideoView } from "expo-video";
import { FC, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

interface Props {
  source: string | null;
  setVideoSource: React.Dispatch<React.SetStateAction<string | null>>;
}

const VideoPreview: FC<Props> = ({ source, setVideoSource }) => {
  const [isLoading, setIsLoading] = useState(false);
  const player = useVideoPlayer(source, (player) => {
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View
      style={{
        flex: 1,
        gap: 20,
        width: "100%",
      }}
    >
      {source && (
        <VideoView
          style={{
            height: "80%",
          }}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      )}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 10,
          width: "100%",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {source ? (
          <>
            <Button
              mode="contained"
              onPress={() => {
                if (isPlaying) player.pause();
                else player.play();
              }}
            >
              {isPlaying ? "Stop playing" : "Resume"}
            </Button>
            <Button onPress={() => setVideoSource(null)} mode="contained">
              Close Preview
            </Button>
          </>
        ) : (
          <Button
            loading={isLoading}
            disabled={isLoading}
            style={{
              alignSelf: "center",
            }}
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
    </View>
  );
};

export default VideoPreview;

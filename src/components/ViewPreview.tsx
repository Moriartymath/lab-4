import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { FC } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

interface Props {
  source: string;
  onClose: () => void;
}

const VideoPreview: FC<Props> = ({ source, onClose }) => {
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
        padding: 12,
        width: "100%",
      }}
    >
      <VideoView
        style={{
          height: "80%",
        }}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
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
        <Button
          mode="contained"
          onPress={() => {
            if (isPlaying) player.pause();
            else player.play();
          }}
        >
          {isPlaying ? "Stop playing" : "Resume"}
        </Button>
        <Button onPress={onClose} mode="contained">
          Close Preview
        </Button>
      </View>
    </View>
  );
};

export default VideoPreview;

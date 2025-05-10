import { AudioStatus, useAudioPlayer } from "expo-audio";
import * as DocumentPicker from "expo-document-picker";
import { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
interface Props {
  source: string | null;
  setAudioSource: React.Dispatch<React.SetStateAction<string | null>>;
}

const AudioPreview: FC<Props> = ({ source, setAudioSource }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useAudioPlayer(source);

  useEffect(() => {
    const update = (status: AudioStatus) => {
      setIsPlaying(status.playing);
    };
    player.addListener("playbackStatusUpdate", update);

    return () => {
      player.removeListener("playbackStatusUpdate", update);
    };
  }, [source]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {source ? (
        <>
          <Button
            mode="contained"
            onPress={() => {
              if (player.playing) player.pause();
              else player.play();
            }}
          >
            {isPlaying ? "Stop playing" : "Resume"}
          </Button>
          <Button onPress={() => setAudioSource(null)}>Cancel</Button>
        </>
      ) : (
        <Button
          loading={isLoading}
          disabled={isLoading}
          mode="contained"
          onPress={async () => {
            setIsLoading(true);
            try {
              const res = await DocumentPicker.getDocumentAsync({});

              if (res.assets?.length) {
                setAudioSource(res.assets[0].uri!);
              }
            } catch {
            } finally {
              setIsLoading(false);
            }
          }}
        >
          Choose Audio
        </Button>
      )}
    </View>
  );
};

export default AudioPreview;

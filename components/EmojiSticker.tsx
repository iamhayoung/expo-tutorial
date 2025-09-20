import { Image } from 'expo-image';
import { ImageSourcePropType, View } from 'react-native';

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  return (
    <View
      style={{
        // TODO: position should be dynamic
        top: -350,
        left: 150,
      }}
    >
      <Image
        source={stickerSource}
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}

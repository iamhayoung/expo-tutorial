import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '@/components/Button';
import CircleButton from '@/components/CircleButton';
import EmojiPickerModal from '@/components/EmojiPickerModal';
import IconButton from '@/components/IconButton';
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [showSelectedImageAction, setShowSelectedImageAction] =
    useState<boolean>(false);
  const [isEmojiPickerModalOpen, setIsEmojiPickerModalOpen] =
    useState<boolean>(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowSelectedImageAction(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowSelectedImageAction(false);
  };

  const onAddSticker = () => {
    setIsEmojiPickerModalOpen(true);
  };

  const onEmojiPickerModalClose = () => {
    setIsEmojiPickerModalOpen(false);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          imgSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>

      {showSelectedImageAction ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowSelectedImageAction(true)}
          />
        </View>
      )}

      <EmojiPickerModal
        isOpen={isEmojiPickerModalOpen}
        onClose={onEmojiPickerModalClose}
      >
        {/* Emoji list component will go here */}
      </EmojiPickerModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

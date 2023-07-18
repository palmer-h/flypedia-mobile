import React from 'react';
import { Alert, Share } from 'react-native';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import IconButton from '~/components/common/IconButton/IconButton';
import type { Props } from '~/components/common/ShareButton/types';

const ShareButton: React.FC<Props> = props => {
  const handleShare = async () => {
    try {
      await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <IconButton
      icon={faShareNodes}
      size={props.size || 28}
      style={props.style}
      accessibilityLabel="share button"
      accessibilityHint="press to share"
      onPress={handleShare}
    />
  );
};

export default ShareButton;

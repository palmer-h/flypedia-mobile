import React from 'react';
import { Alert, Share } from 'react-native';
import IconButton from '~/components/common/IconButton/IconButton';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
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
      size={props.size || 32}
      style={props.style}
      onPress={handleShare}
    />
  );
};

export default ShareButton;
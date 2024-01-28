import {
  faBackwardStep,
  faCaretLeft,
  faCaretRight,
  faForwardStep,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { Props } from '~/components/common/PaginationControls/types';
import theme from '~/theme';
import IconButton from '~/components/common/IconButton/IconButton';
import {
  FIRST_PAGE_BUTTON_ACCESSIBILITY_HINT,
  FIRST_PAGE_BUTTON_ACCESSIBILITY_LABEL,
} from '~/components/common/PaginationControls/constants';
import styles from '~/components/common/PaginationControls/styles';

const PaginationControls: React.FC<Props> = props => {
  const handleGoToFirstPage = (): void => {
    if (props.pageNumber === 1) {
      return;
    }

    props.onGoToPage(1);
  };

  const handleGoToPreviousPage = (): void => {
    if (props.pageNumber === 1) {
      return;
    }

    props.onGoToPage(props.pageNumber - 1);
  };

  const handleGoToNextPage = (): void => {
    if (props.pageNumber === props.totalPages) {
      return;
    }
    props.onGoToPage(props.pageNumber + 1);
  };

  const handleGoToLastPage = (): void => {
    if (props.pageNumber === props.totalPages) {
      return;
    }
    props.onGoToPage(props.totalPages);
  };

  if (props.totalPages < 2) {
    return;
  }

  return (
    <View style={styles.container}>
      <IconButton
        icon={faBackwardStep}
        size={28}
        iconColor={theme.colors.primary}
        backgroundColor={theme.colors.background}
        disabled={props.pageNumber === 1}
        accessibilityLabel={FIRST_PAGE_BUTTON_ACCESSIBILITY_LABEL}
        accessibilityHint={FIRST_PAGE_BUTTON_ACCESSIBILITY_HINT}
        onPress={handleGoToFirstPage}
      />
      <IconButton
        icon={faCaretLeft}
        size={36}
        iconColor={theme.colors.primary}
        backgroundColor={theme.colors.background}
        disabled={props.pageNumber === 1}
        accessibilityLabel={FIRST_PAGE_BUTTON_ACCESSIBILITY_LABEL}
        accessibilityHint={FIRST_PAGE_BUTTON_ACCESSIBILITY_HINT}
        onPress={handleGoToPreviousPage}
      />
      {Array.from(Array(props.totalPages), (_e, i) => (
        <Text
          key={i}
          style={[
            styles.pageNumberText,
            props.pageNumber === i + 1
              ? styles.activePageNumberText
              : undefined,
          ]}>
          {i + 1}
        </Text>
      ))}
      <IconButton
        icon={faCaretRight}
        size={36}
        iconColor={theme.colors.primary}
        backgroundColor={theme.colors.background}
        disabled={props.pageNumber === props.totalPages}
        accessibilityLabel={FIRST_PAGE_BUTTON_ACCESSIBILITY_LABEL}
        accessibilityHint={FIRST_PAGE_BUTTON_ACCESSIBILITY_HINT}
        onPress={handleGoToNextPage}
      />
      <IconButton
        icon={faForwardStep}
        size={28}
        iconColor={theme.colors.primary}
        backgroundColor={theme.colors.background}
        disabled={props.pageNumber === props.totalPages}
        accessibilityLabel={FIRST_PAGE_BUTTON_ACCESSIBILITY_LABEL}
        accessibilityHint={FIRST_PAGE_BUTTON_ACCESSIBILITY_HINT}
        onPress={handleGoToLastPage}
      />
    </View>
  );
};

export default PaginationControls;

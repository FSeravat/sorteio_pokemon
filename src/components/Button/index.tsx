import React from 'react';
import { Button as ElementsButton, ButtonProps } from 'react-native-elements';

import { styles } from './styles';

type Props = ButtonProps & {};

export default function Button({ ...rest }: Props) {
  return (
    <ElementsButton
      buttonStyle={styles.mainButton}
      containerStyle={styles.elementsContainer}
      titleStyle={styles.title}
      {...rest}
    />
  );
}

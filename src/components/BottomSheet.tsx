import {height as h} from '../utils/helpers';
import {Grey400} from '../common';
import React, {forwardRef} from 'react';
import RBSheet, {RBSheetProps} from 'react-native-raw-bottom-sheet';

interface RbSheet {
  height: number;
  children: React.ReactNode;
  style: any;
  onClose: () => void;
  onOpen: () => void;
}

const BottomSheet = forwardRef<RBSheet, RBSheetProps>(
  ({height, children, style, onClose, onOpen}: RbSheet, ref) => {
    return (
      <RBSheet
        ref={ref}
        onClose={onClose}
        onOpen={onOpen}
        height={height || h / 2}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            // blurRadius: 4,
          },
          draggableIcon: {
            backgroundColor: Grey400,
          },
          container: {
            borderRadius: 4,
            ...style,
          },
        }}>
        {children}
      </RBSheet>
    );
  },
);

export default BottomSheet;

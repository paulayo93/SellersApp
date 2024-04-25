import {
  Container,
  InputBox,
  BottomSheet,
  CurrencyTextInput,
  Content,
} from '../components';
import React, {useState, useEffect, useRef} from 'react';
import {
  useAppDispatch,
  addProduct,
  resetProduct,
  useAppSelector,
} from '../store';
import uuid from 'react-native-uuid';
import {
  View,
  StyleSheet,
  ActionSheetIOS,
  Platform,
  Image,
  Pressable,
} from 'react-native';
import {iOS, isAndroid, ms} from '../common/utils';
import {RegularText, SmallText} from '../common/Text';

import {
  Button,
  Grey400,
  RitualCyan100,
  RitualCyan200,
  RoyalBlue600,
  White,
} from '../common';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const OPTIONS = ['Choose from Library', 'Cancel'];
const pickerOptions = {
  maxHeight: 500,
  maxWidth: 500,
  selectionLimit: 1,
  mediaType: 'photo',
  quality: 0.8,
  includeBase64: false,
  saveToPhotos: false,
};
import {CameraIcon} from '../../assets/icons/icons';
import {toast} from '../utils/notify';

const handleSelect = (res, setImages) => {
  if (res.didCancel) {
    console.log('User cancelled image picker');
  } else if (res.error) {
    console.log('ImagePicker Error: ', res.error);
  } else if (res.customButton) {
    console.log('User tapped custom button: ', res.customButton);
    // alert(res.customButton);
  } else if (res.errorCode === 'camera_unavailable') {
    console.log('camera not available');
  } else {
    return setImages(res.assets);
  }
};

const fromLibrary = setImages =>
  launchImageLibrary(pickerOptions, res => handleSelect(res, setImages));
const fromCamera = setImages =>
  launchCamera(pickerOptions, res => handleSelect(res, setImages));

interface Errors {
  productName: {message: string} | null;
  productImage: {message: string} | null;
  productPrice: {message: string} | null;
}

const ProductScreen = ({navigation}) => {
  const dispatch = useAppDispatch();
  const refRBSheet = useRef();
  const {maximumProductExceeded} = useAppSelector(state => state.product);
  const [startUpload, setStartUpload] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [productPrice, setProductPrice] = useState('');
  const [productName, setProductName] = useState('');
  const [errors, setErrors] = useState<Errors>({
    productName: null,
    productImage: null,
    productPrice: null,
  });

  const handleBlur = () => {
    if (
      !!productName &&
      !!productPrice &&
      !!productImage &&
      productImage.length > 0
    ) {
      setHasErrors(false);
      setErrors(prevErrors => ({
        ...prevErrors,
        productName: null,
        productPrice: null,
        productImage: null,
      }));
    } else {
      setHasErrors(true);
    }
  };

  const [hasErrors, setHasErrors] = useState(true);

  const publishProduct = async () => {
    if (maximumProductExceeded) {
      toast('Number of Product Exceeded', 'error');
      return;
    }

    dispatch(
      addProduct({
        id: uuid.v4().toString(),
        productName: productName,
        productPrice: productPrice,
        productImage: productImage,
      }),
    );
    toast('Product Added to Store', 'success');
    setStartUpload(false);
    setProductName('');
    setProductPrice('');
    setProductImage(null);

    return navigation.navigate('store');
  };

  useEffect(() => {
    if (startUpload === true) {
      if (iOS) {
        selectAction();
      } else if (isAndroid) {
        refRBSheet?.current?.open();
      }
    }
  }, [startUpload]);

  const handleSheetPressAndroid = async index => {
    if (index === 0) {
      fromLibrary(selectFile);
    } else if (index === 1) {
      refRBSheet?.current?.close();
    }
  };

  const selectFile = file => {
    refRBSheet?.current?.close();
    setProductImage(file);
  };

  const selectAction = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: OPTIONS,
          cancelButtonIndex: OPTIONS.length - 1,
          userInterfaceStyle: 'dark',
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            fromLibrary(setProductImage);
          } else if (buttonIndex === 1) {
            // cancel action
          }
        },
      );
    }
  };

  const handleNameChange = text => {
    setProductName(text);
  };

  useEffect(() => {
    handleBlur();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productName, productPrice]);
  return (
    <Container padded={true} light={false}>
      <Content style={styles.content}>

        
        <View>
          <RegularText text="Add Product" />
          <View>
            <Pressable onPress={() => setStartUpload(x => !x)}>
              <View style={uploadStyles.container}>
                <View style={uploadStyles.content}>
                  {productImage?.length ? (
                    <Image
                      source={{uri: productImage?.[0].uri}}
                      style={uploadStyles.image}
                    />
                  ) : (
                    <CameraIcon />
                  )}
                </View>

                <SmallText
                  text=" Tap to upload image"
                  style={{color: RoyalBlue600}}
                />
              </View>
            </Pressable>
          </View>

          <View
            style={{
              marginTop: ms(34),
            }}>
            <InputBox
              style={{backgroundColor: RitualCyan100, marginBottom: ms(34)}}
              placeholder="Enter Product Name"
              onChangeText={handleNameChange}
              handleBlur={handleBlur}
              value={productName}
            />
            <CurrencyTextInput
              value={productPrice}
              placeholder="0.00"
              onChangeValue={setProductPrice}
              handleBlur={handleBlur}
            />
          </View>
        </View>

        <BottomSheet
          ref={refRBSheet}
          height={150}
          style={{backgroundColor: 'transparent'}}>
          <View
            style={{
              flex: 1,
              // marginTop: -25,
              height: '100%',
              borderRadius: 8,
            }}>
            <View
              style={{
                marginHorizontal: 30,
                backgroundColor: '#000000',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 10,
              }}>
              {OPTIONS.map((option, index) => (
                <Pressable
                  key={index}
                  onPress={() => handleSheetPressAndroid(index)}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 50,
                      borderBottomColor: '#FFFFFF20',
                      borderBottomWidth: index === 2 ? 0 : 1,
                    }}>
                    <SmallText
                      text={option}
                      style={{
                        color: RoyalBlue600,
                        fontFamily: 'Inter-Medium',
                      }}
                    />
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </BottomSheet>
      </Content>

      <View style={styles.actionWrapper}>
        <Button
          disabled={hasErrors}
          text="Publish"
          textStyle={[styles.buttonText, {color: hasErrors ? Grey400 : White}]}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: hasErrors ? RitualCyan200 : RoyalBlue600,
            width: 340,
          }}
          onPress={publishProduct}
        />
      </View>
    </Container>
  );
};
const uploadStyles = StyleSheet.create({
  image: {width: '100%', height: '100%'},
  container: {
    borderRadius: 4,
    borderColor: '#E2E9F0',
    borderWidth: 1,
    borderStyle: 'dashed',
    width: '100%',
    marginTop: 5,
    marginBottom: 24,
    // backgroundColor: '#EDF2F770',
    backgroundColor: 'rgba(237, 242, 247, 0.3)',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    borderRadius: 8,
    backgroundColor: '#A0B1C0',
    width: 124,
    height: 124,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
const styles = StyleSheet.create({
  buttonText: {
    color: RoyalBlue600,
    fontFamily: 'Inter-Bold',
    fontSize: ms(17),
    lineHeight: 22,
  },
  actionWrapper: {},
  content: {
    paddingVertical: ms(20),
  },

  smallText: {
    opacity: 0.6,
  },
  semiBoldText: {
    fontSize: ms(28),
  },
});
export default ProductScreen;

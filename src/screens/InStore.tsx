import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {Container} from '../components';
import {
  Button,
  Grey400,
  RegularText,
  RoyalBlue600,
  SmallText,
  White,
  ms,
} from '../common';
import accounting from 'accounting';
import {removeProduct, useAppDispatch, useAppSelector} from '../store';
import {NairaIcon} from '../../assets/icons/icons';

const ProductListCard = ({
  productId,
  productName,
  productPrice,
  productImage,
}) => {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.product}>
      <Image
        style={{width: ms(100), height: ms(100), borderRadius: ms(10)}}
        source={{uri: productImage}}
      />
      <View style={{marginLeft: ms(26)}}>
        <View>
          <SmallText text={productName} />
          <View style={styles.money}>
            <NairaIcon />
            <SmallText text={accounting.formatMoney(productPrice, '', 2)} />
          </View>
        </View>
        <View style={{top: 18, right: 15}}>
          <Button
            text="Remove"
            textStyle={[styles.removeButtonText, {color: White}]}
            style={{
              backgroundColor: Grey400,
              width: ms(70),
              height: ms(30),
            }}
            onPress={() => dispatch(removeProduct({id: productId}))}
          />
        </View>
      </View>
    </View>
  );
};

const InStore = ({navigation}) => {
  const {products, maximumProductExceeded} = useAppSelector(
    state => state?.product,
  );
  return (
    <Container padded={true} light={false}>
      <View style={styles.content}>
        <RegularText text="In-Store" />
      </View>

      <View style={styles.list}>
        <FlatList
          data={products}
          // eslint-disable-next-line react/no-unstable-nested-components
          ListFooterComponent={() => {
            return (
              <View>
                {!maximumProductExceeded && (
                  <Button
                    text="Add Product"
                    textStyle={[styles.buttonText, {color: White}]}
                    style={styles.button}
                    onPress={() => navigation.navigate('product')}
                  />
                )}
              </View>
            );
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View style={{paddingBottom: ms(12)}}>
                <ProductListCard
                  key={item.id}
                  productImage={item.productImage?.[0].uri}
                  productName={item.productName}
                  productPrice={item.productPrice}
                  productId={item.id}
                />
              </View>
            );
          }}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  removeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    lineHeight: 19,
    color: RoyalBlue600,
  },
  product: {flexDirection: 'row', marginBottom: ms(20)},
  money: {
    flexDirection: 'row',
    marginTop: ms(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingVertical: ms(20),
  },
  list: {
    marginTop: ms(40),
  },
  button: {
    backgroundColor: RoyalBlue600,
    width: 340,
  },
  buttonText: {
    color: RoyalBlue600,
    fontFamily: 'Inter-Bold',
    fontSize: ms(17),
    lineHeight: 22,
  },
});

export default InStore;

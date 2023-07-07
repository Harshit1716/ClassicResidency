import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  AlertButton,
  BackHandler,
  Platform,
} from 'react-native';
import {COLORS, FONTS, ICONS, SIZES} from '../resources';
import ProfileTextInput from './ProfileTextInput';

let isBuyOrder: boolean = false;

const BuySellBottomSheet = ({isVisible, onClose}: any) => {
  const regex = /(<([^>]+)>)/gi;
  const [show, setShow] = useState(false);
  const [selectedAccount, setSelectedAccount] =
    useState<string>('Select Account');
  const [selectedExpiryType, setSelectedExpiryType] = useState<string>('');
  const [price, setPrice] = useState(0);
  const [isPriceFieldEditable, setIsPriceFieldEditable] = useState(false);
  const [selectedPriceBtn, setSelectedPriceBtn] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);
  const [selectedQuantityToggle, setSelectedQuantityToggle] = useState(1);
  const [selectedAccountObj, setSelectedAccountObj] = useState();
  const [fee, setFee] = useState<number>(0);
  const [totalOrderAmount, setTotalOrderAmount] = useState<number>(0);
  const [valueOfShares, setValueOfShares] = useState<number>(0);
  const [remAccBalance, setremAccBalance] = useState<number>(0);
  const [flag, setFlag] = useState(true);
  const [accountList, setAccountList] = useState<[]>();
  const [brokerFee, setBrokerFee] = useState(0);
  // const [equityFee, setEquityFee] = useState<Fee>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [strPrice, setStrPrice] = useState<string>();
  const [accountTypeIndex, setAccountTypeIndex] = useState<number>();
  const [replaceOrderData, setReplaceOrderData] = useState();
  const [replaceOrderDetails, setReplaceOrderDetails] = useState();
  const [currencyObj, setCurrencyObj] = useState();
  const [strQuantity, setStrQuantity] = useState<string>();
  const [strAmount, setStrAmount] = useState<string>();
  const [saveForLater, setSaveForLater] = useState<boolean>(false);

  // Header Component
  const RenderBuySellHeader = () => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onClose}>
            <Image
              source={ICONS.CLOSE_ICON}
              style={styles.dismissButton}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.headingContainer}>
            <Text style={styles.stockSymbol}>Add Tenant</Text>
          </View>
        </View>
        <View style={styles.separatorLine} />
      </View>
    );
  };

  // Footer
  const OrderDetails = () => {
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={() => {
            // agreementCheck(selectedAccountObj?.account_number ?? 0) ?
            // serverHitForInitatingOrder();
            //: null;
          }}
          style={styles.buyButton}>
          <Text style={styles.buyText}>{true ? 'ADD' : 'SELL'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal animationType={'slide'} transparent={true} visible={isVisible}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.popupContainer}>
          <RenderBuySellHeader />
          <ScrollView>
            <View style={styles.enterDetailsContainer}>
              <Text style={{...FONTS.h3, marginLeft: 20}}>Name</Text>
              <ProfileTextInput
                title="Email"
                disabled={false}
                onChangeText={text => console.log(text)}
                placeholder="Email"
              />
              <Text style={{...FONTS.h3, marginLeft: 20, marginTop: 10}}>
                Email
              </Text>
              <ProfileTextInput
                title="UserName"
                disabled={true}
                onChangeText={text => console.log(text)}
                placeholder="UserName"
              />
              <Text style={{...FONTS.h3, marginLeft: 20, marginTop: 10}}>
                Email
              </Text>
              <ProfileTextInput
                title="UserName"
                disabled={true}
                onChangeText={text => console.log(text)}
                placeholder="UserName"
              />
              <Text style={{...FONTS.h3, marginLeft: 20, marginTop: 10}}>
                Email
              </Text>
              <ProfileTextInput
                title="UserName"
                disabled={true}
                onChangeText={text => console.log(text)}
                placeholder="UserName"
              />
            </View>
            <OrderDetails />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default BuySellBottomSheet;

const radiusStyle = {
  borderWidth: 1,
  borderColor: COLORS.lightGray1,
  borderRadius: 5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'flex-end',
    paddingTop: 120,
  },
  popupContainer: {
    height: '80%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%',
  },
  dismissButton: {
    width: 20,
    height: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  headingContainer: {
    alignItems: 'center',
    flex: 1,
  },
  separatorLine: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.lightGray1,
  },
  stockSymbol: {
    fontFamily: 'Poppins-Medium',
    ...FONTS.h2,
    color: COLORS.primary,
    textAlign: 'center',
  },
  stockName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.gray,
    width: '80%',
    textAlign: 'center',
  },
  enterDetailsContainer: {
    // paddingHorizontal: 20,
    paddingTop: 25,
  },
  selectAccountHeader: {
    color: COLORS.gray,
    marginBottom: 5,
    ...FONTS.h2,
  },
  selectAccountContainer: {
    marginBottom: 15,
  },
  selectExpiryContainer: {
    marginBottom: 10,
  },
  selectAccountButton: {
    width: '100%',
    padding: 10,
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...radiusStyle,
  },
  selectAccountButtonOpacity: {
    width: '100%',
    padding: 10,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...radiusStyle,
  },
  selectedAccountText: {
    flexShrink: 1,
    marginRight: 10,
    color: COLORS.gray,
    ...FONTS.body5,
  },
  priceContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 32,
    marginBottom: 20,
  },
  quantityContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 32,
    marginBottom: 5,
  },
  priceToggleView: {
    flexDirection: 'row',
    width: '100%',
    marginRight: 15,
  },
  priceButtons: {
    flex: 1,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    ...radiusStyle,
  },
  quantityText: {
    ...FONTS.h4,
  },
  priceInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
    ...radiusStyle,
  },
  currencyView: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    height: '100%',
  },
  currencyText: {
    ...FONTS.h4,
    color: COLORS.white,
  },
  priceInput: {
    flex: 1,
    paddingLeft: 5,
    paddingVertical: 5,
    color: COLORS.black,
  },
  quantityInput: {
    flex: 1,
    paddingLeft: 5,
    paddingVertical: 5,
    color: COLORS.black,
  },
  accInfoContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quantityAmountView: {
    width: '100%',
    marginTop: 5,
    marginBottom: 15,
  },
  accBalanceContainer: {
    flexDirection: 'row',
    flex: 2,
  },
  estAmountContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  estAmountText: {
    ...FONTS.h5,
    color: COLORS.gray,
    flexShrink: 13,
  },
  footerContainer: {
    marginTop: 20,
    paddingHorizontal: '10%',
    // position: 'absolute',
    flex: 1,
    width: '100%',

    // bottom: -SIZES.height * 0.3,
  },
  orderDetailsContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: COLORS.lightGray,
    ...radiusStyle,
    marginBottom: 25,
  },
  feeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  buyButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buyText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  orderDetailsLeftText: {
    ...FONTS.h5,
    color: COLORS.gray,
    marginRight: 20,
    flex: 1.6,
  },
  orderDetailsRightText: {
    ...FONTS.h4,
    color: COLORS.gray,
    flex: 1.4,
    flexShrink: 1,
    textAlign: 'right',
  },
});

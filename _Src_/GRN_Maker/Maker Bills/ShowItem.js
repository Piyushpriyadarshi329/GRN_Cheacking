import { StyleSheet, Text, View, FlatList, TouchableOpacity,} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Card } from 'react-native-shadow-cards';
import Icon from 'react-native-vector-icons/Ionicons';
import { TestScheduler } from 'jest';
import { Checkbox, Button, Divider, TextInput, Dialog, Portal, Provider } from 'react-native-paper';
import axios from 'axios';
import { Picker } from '@react-native-community/picker';
import AppFunction from '../../AppFunction'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppConstants from '../../AppConstant';


// console.log("item", route.params.item)
const ShowItem = ({ route, navigation }) => {

  const [list, setlist] = useState();
  const [Salebillfooter, setsalebillfooter] = useState();
  const [flag, setflag] = useState(false);
  const [SelectedBatch, setSelectedBatch] = useState();
  const [listHeader, setlistHeader] = useState();
  const [dialog, setdialog] = useState(false);

  const { header: header, billno: billno, domainrecno: domainrecno, domainuserrecno: domainuserrecno, ApiCall } = route.params;
  // console.log('i=>', i);

  useEffect(() => {
    getcounterbill();
  }, [])


  console.log("list ---> ", list)


  const showDialog = () => setdialog(true);

  const hideDialog = () => setdialog(false);


  var BatchList = [
    { name: 'A1', value: 0 },
    { name: 'B1', value: 1 },
    { name: 'C1', value: 2 },
    { name: 'D1', value: 3 },
    // { name: '', value: 2 },
    // { name: 'Shrink', value: 2 },
  ]


  // Api Call for items according to bill
  async function getcounterbill() {

    console.log("ApiCall // getcounterbill", "billno:", billno, 'maker date:', 36363737, "domainrecno:", domainrecno, "domainuserrecno:", domainuserrecno)

    var sendapidata = {
      "domainrecno": domainrecno,
      "billno": billno,
      "domainuserrecno": domainuserrecno
    }

    const { data: UpdateBillData } = await axios.post(AppConstants.APIurl2 + 'getcounterbill/', sendapidata);
    console.log("ApiRes // getcounterbill", UpdateBillData.Message.items)

    setlistHeader(UpdateBillData.Message);

    if (UpdateBillData.Success == true) {
      setlist(UpdateBillData.Message.items);
    }

  }


  // Resend Data to previous status 
  async function resendCounterBill(itm) {

    let senddataapi = {
      "items": [
        {
          "recno": itm.recno,
          "shortguid": itm.shortguid,
          "itemrecno": itm.itemrecno,
          "itembatchno": itm.itembatchno,
          "expdate": itm.expdate,
          "qty": itm.qty,
          "rate": itm.rate,
          "amount": itm.amount,
          "discountamt": itm.discountamt,
          "picked": itm.picked,
          "active": itm.active,
          "approvalstatus": itm.approvalstatus,
          "descn": itm.descn,
          "code": itm.code,
          "hsn": itm.hsn,
          "cgstrate": itm.cgstrate,
          "igstrate": itm.igstrate,
          "sgstrate": itm.sgstrate,
          "packtyperecno": itm.packtyperecno,
          "packtypedescn": itm.packtypedescn,
          "categoryrecno": itm.categoryrecno,
          "categorydescn": itm.categorydescn,
          "uomrecno": itm.uomrecno,
          "UOM": itm.UOM,
          "salerate": itm.salerate,
          "mrp": itm.mrp,
        }
      ],
           ...listHeader,
      "image": "",
      "custDescn": listHeader.custDescn,
      "creditallowed": listHeader.creditallowed,
      "shortguid": listHeader.shortguid,
      "customerdomainrecno": listHeader.customerdomainrecno,
      "customerrecno": listHeader.customerrecno,
      "mobile": listHeader.mobile,
      "trdate": listHeader.trdate,
      "trtime": listHeader.trtime,
      "billno": listHeader.billno,
      "lockedby": listHeader.lockedby,
      "lockedby": listHeader.lockedby,
      "status": "R",
      "message": listHeader.message,
      "makerdate": listHeader.makerdate,
      "makertime": listHeader.makertime,
      "checkerdate": listHeader.checkerdate,
      "checkertime": listHeader.checkertime,
      "packerdate": listHeader.packerdate,
      "packertime": listHeader.packertime,
      "dispatchdate": listHeader.dispatchdate,
      "dispatchtime": listHeader.dispatchtime,
      "transportpickup": listHeader.transportpickup,
      "transportdate": listHeader.transportdate,
      "transporttime": listHeader.transporttime,
      "receiverdate": listHeader.receiverdate,
      "receivertime": listHeader.receivertime,
      "boxes": listHeader.boxes,
      "active": listHeader.active,
      "amount": listHeader.amount,
      "discountamt": listHeader.discountamt,
      "logo": listHeader.logo,
      "cashamt": listHeader.cashamt,
      "cardamt": listHeader.cardamt,
      "walletamt": listHeader.walletamt,
      "pointsamt": listHeader.pointsamt,
      "creditamt": listHeader.creditamt,
      "salereturnamt": listHeader.salereturnamt,
      "cardrefid": listHeader.cardrefid,
      "walletrefid": listHeader.walletrefid,
      "cgstamt": listHeader.cgstamt,
      "sgstamt": listHeader.sgstamt,
      "igstamt": listHeader.igstamt,
      "roundamt": listHeader.roundamt,
      "spotdiscountamt": listHeader.spotdiscountamt,
      "tokenno": listHeader.tokenno,
      "domainposrecno": listHeader.domainposrecno,
      "domainrecno": listHeader.domainrecno,
      "domainuserrecno": listHeader.domainuserrecno,
    }

    console.log('Resenddataapi----', senddataapi);

    const { data: UpdateBillData } = await axios.post(AppConstants.APIurl2 + 'addcounterbill/', senddataapi);
    console.log("ApiRes // getcounterbill", UpdateBillData)

    if (UpdateBillData.Success == true) {
      ApiCall();
      navigation.navigate('Maker');
    }

  }


  // Post Api Call (Send to next page) 
  async function addcounterbill(itm) {

    let senddataapi = {
      "items": [
        {
          "recno": itm.recno,
          "shortguid": itm.shortguid,
          "itemrecno": itm.itemrecno,
          "itembatchno": itm.itembatchno,
          "expdate": itm.expdate,
          "qty": itm.qty,
          "rate": itm.rate,
          "amount": itm.amount,
          "discountamt": itm.discountamt,
          "picked": !itm.picked,
          "active": itm.active,
          "approvalstatus": itm.approvalstatus,
          "descn": itm.descn,
          "code": itm.code,
          "hsn": itm.hsn,
          "cgstrate": itm.cgstrate,
          "igstrate": itm.igstrate,
          "sgstrate": itm.sgstrate,
          "packtyperecno": itm.packtyperecno,
          "packtypedescn": itm.packtypedescn,
          "categoryrecno": itm.categoryrecno,
          "categorydescn": itm.categorydescn,
          "uomrecno": itm.uomrecno,
          "UOM": itm.UOM,
          "salerate": itm.salerate,
          "mrp": itm.mrp,
        }
      ],
      "image": "",
      "custDescn": listHeader.custDescn,
      "creditallowed": listHeader.creditallowed,
      "shortguid": listHeader.shortguid,
      "customerdomainrecno": listHeader.customerdomainrecno,
      "customerrecno": listHeader.customerrecno,
      "mobile": listHeader.mobile,
      "trdate": listHeader.trdate,
      "trtime": listHeader.trtime,
      "billno": listHeader.billno,
      "lockedby": listHeader.lockedby,
      "lockedby": listHeader.lockedby,
      "status": "C",
      "message": listHeader.message,
      "makerdate": AppFunction.getToday().dataDate,
      "makertime": AppFunction.getTime().dataTime,
      "checkerdate": listHeader.checkerdate,
      "checkertime": listHeader.checkertime,
      "packerdate": listHeader.packerdate,
      "packertime": listHeader.packertime,
      "dispatchdate": listHeader.dispatchdate,
      "dispatchtime": listHeader.dispatchtime,
      "transportpickup": listHeader.transportpickup,
      "transportdate": listHeader.transportdate,
      "transporttime": listHeader.transporttime,
      "receiverdate": listHeader.receiverdate,
      "receivertime": listHeader.receivertime,
      "boxes": listHeader.boxes,
      "active": listHeader.active,
      "amount": listHeader.amount,
      "discountamt": listHeader.discountamt,
      "logo": listHeader.logo,
      "cashamt": listHeader.cashamt,
      "cardamt": listHeader.cardamt,
      "walletamt": listHeader.walletamt,
      "pointsamt": listHeader.pointsamt,
      "creditamt": listHeader.creditamt,
      "salereturnamt": listHeader.salereturnamt,
      "cardrefid": listHeader.cardrefid,
      "walletrefid": listHeader.walletrefid,
      "cgstamt": listHeader.cgstamt,
      "sgstamt": listHeader.sgstamt,
      "igstamt": listHeader.igstamt,
      "roundamt": listHeader.roundamt,
      "spotdiscountamt": listHeader.spotdiscountamt,
      "tokenno": listHeader.tokenno,
      "domainposrecno": listHeader.domainposrecno,
      "domainrecno": listHeader.domainrecno,
      "domainuserrecno": listHeader.domainuserrecno
    }

    console.log('senddataapi----', senddataapi);

    const { data: UpdateBillData } = await axios.post(AppConstants.APIurl2 + 'addcounterbill/', senddataapi);
    console.log("ApiRes // getcounterbill", UpdateBillData)

    if (UpdateBillData.Success == true) {
      ApiCall();
      navigation.navigate('Maker');
    }

  }


  // Checkbox Select Api Call
  async function counterbillfooter(item) {

    console.log("ApiCall // counterbillfooter/", item);

    var senddataapi = {
      "recno": item.recno,
      "shortguid": item.shortguid,
      "itemrecno": item.itemrecno,
      "itembatchno": item.itembatchno,
      "expdate": item.expdate,
      "qty": item.qty,
      "rate": item.rate,
      "amount": item.amount,
      "discountamt": item.discountamt,
      "picked": item.picked,
      "active": item.active,
      "approvalstatus": item.approvalstatus,
      "descn": item.descn,
      "code": item.code,
      "hsn": item.hsn,
      "cgstrate": item.cgstrate,
      "igstrate": item.igstrate,
      "sgstrate": item.sgstrate,
      "packtyperecno": item.packtyperecno,
      "packtypedescn": item.packtypedescn,
      "categoryrecno": item.categoryrecno,
      "categorydescn": item.categorydescn,
      "uomrecno": item.uomrecno,
      "UOM": item.UOM,
      "salerate": item.salerate,
      "mrp": item.mrp,
      "outerbox": item.outerbox,
      "innerbox": item.innerbox,
      "pack": item.pack,
      "unit": item.unit
    }

    console.log("Senddataapi----", senddataapi);

    const FooterBillData = await axios.patch(AppConstants.APIurl2 + 'counterbillfooter/', senddataapi);
    console.log("ApiRes // counterbillfooter/", FooterBillData.data)
    // setsalebillfooter(FooterBillData.data);
  }


  // Function to check all checkbox is true  
  function SubmitCondition() {
    const result = list.filter(Check);

    function Check(item) {
      return item.picked == false;
    }
    console.log("Check------>", result.length)
    if (result.length == 0) {
      list.map((itm) => {
        console.log('itm=======', itm);
        addcounterbill(itm);
      })
    }
    else {
      alert('Please Check All box')
    }
  }


  // Formating Function For Date by DDMMYYYY
  const showDate_ddmmyy = (ab) => {
    let x = ab;
    // console.log("sec", x);
    let dt = ""
    if (x != null) {

      let y = x.toString();
      // dt = y.slice(6, 8) + "/" + y.slice(4, 6) + "/" + y.slice(0, 4);
      dt = y.slice(4, 6) + "/" + y.slice(0, 4);
    }
    return dt;
  };


  // Exp date format (datadate)
  const formatDate = (d) => {

    let year = d.slice(3, 7);
    let month = d.slice(0, 2);

    var dataDate = year + month

    // console.log("dataDate---------",dataDate);
  }


  // Flatlist Header
  const ListHeader = () => {
    //View to set in Header
    return (
      <Card style={{ width: '100%', backgroundColor: 'ghostwhite', marginBottom: '2%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <MaterialCommunityIcons name={'account-circle'} size={32} color={'orange'} />
        <Text style={{ ...styles.content_text, fontWeight: '600', color: 'grey', fontSize: 18, marginRight: '35%' }}>{listHeader?.custDescn}</Text>
      </Card>
    );
  };


  // render Function
  function renderItems({ item, index }) {
    return (
      <>
        <View style={{ flex: 1, margin: "1%", marginHorizontal: '3%' }}>

          <Card style={styles.Body_Main_Card}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

              {/* Item Name */}

              <View style={{ ...styles.card_subViews, flex: 1.7, }}>
                <Text style={styles.Heder_Text} >{item.descn}</Text>
              </View>

              {/* Checkbox View */}

              <View style={{ flex: 0.9, justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: 'lightgray', borderRadius: 12, flexDirection: 'row' }}>

                <View>
                  {
                    item.picked == false ? (<><Text style={{ fontWeight: '700', fontSize: 15, }}>Pick-up</Text></>) : (<><Text style={{ fontSize: 15, fontWeight: '700', color: 'dodgerblue' }}>Discard</Text></>)
                  }
                </View>

                <View>
                  <Checkbox

                    color={'dodgerblue'}
                    // key={item.key}
                    status={list[index].picked ? 'checked' : 'unchecked'}
                    onPress={(n) => {
                      // console.log('n==>', n)
                      setlist((p) => {
                        p[index].picked = !p[index].picked;
                        let item = p[index];
                        counterbillfooter(item)

                        return [...p]
                      })

                    }}
                  />
                </View>
              </View>

            </View>

            <Divider style={{ marginRight: '5%', marginTop: '1%' }} />

            {/* Item Details */}

            <View style={{ ...styles.card_subViews, justifyContent: 'space-around', marginTop: '1%', flexDirection: 'row', height: 70 }}>

              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>

                {/*  Qty and Amount */}
                <View style={{ alignItems: 'center', flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginVertical: '2%' }}>

                  <View>
                    <Text style={{ fontWeight: '400' }}>Quntity : </Text>
                  </View>
                  <View>
                    {/* <Text style={{ fontWeight: '800' }}>{item.qty}</Text> */}
                    <TextInput
                      placeholder={item.qty.toString()}
                      style={{ height: 30, width: 60 }}
                      onChangeText={(text) => {
                        setlist((p) => {
                          p[index].qty = text;
                          return [...p]
                        })
                      }}
                      keyboardType='number-pad'

                    />
                  </View>


                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: '2%' }}>

                    <View>
                      <Text style={{ fontWeight: '400' }}>Amount : </Text>
                    </View>

                    <View>
                      {/* <Text style={{ fontWeight: '600' }}>Rs. {item.amount}</Text> */}
                      <TextInput
                        style={{ fontWeight: '600', height: 40 }}
                        defaultValue={item.amount.toString()}
                        onChangeText={(text) => {
                          setlist((p) => {
                            p[index].amount = text;
                            return [...p]
                          })
                          console.log('p---------->', list)
                        }}
                      />
                    </View>
                  </View>
                </View>

                {/*  Expiry Date and MRP  */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%', marginVertical: '2%' }}>

                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: '6%' }}>

                    <View>
                      <Text style={{ fontWeight: '400' }}>Expiry Date</Text>
                    </View>
                    <View>

                      <TextInput
                        style={{ fontWeight: '600', height: 30 }}
                        defaultValue={showDate_ddmmyy(item.expdate)}
                        onChangeText={(text) => {
                          let dt = text;
                          setlist((p) => {
                            let formatdate = formatDate(dt);
                            p[index].expdate = formatdate;
                            return [...p]
                          })
                          console.log('Format Exp Date---------->', list)
                        }}
                      />
                    </View>

                    <View>
                      <Text style={{ fontWeight: '600' }}>MRP</Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: '600' }}>{item.mrp}</Text>
                    </View>

                  </View>

                </View>

              </View>

            </View>

            {/*  Box Atributes  */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '60%', marginTop: '5%', }}>
              <Text>Box</Text>
              <Text style={{ fontSize: 17 }}> {item?.outerbox}  X  {item?.innerbox}  X  {item?.pack}  X  {item?.unit}</Text>
            </View>

            {/*  Batch No  */}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', marginVertical: '2%' }}>

              <View>
                <Text style={{ fontWeight: '400' }}>Batch No : </Text>
              </View>

              <View>
                <TextInput
                  style={{ fontWeight: '600', height: 40 }}
                  defaultValue={item.itembatchno}
                  onChangeText={(text) => {
                    setlist((p) => {
                      p[index].itembatchno = text;
                      return [...p]
                    })
                  }}
                />
              </View>

              {/* Dropdown for batch seleection */}
              {/* <Picker
                selectedValue={SelectedBatch}
                style={{ width: '40%' }}
                onValueChange={(BatchValue) => {

                  setSelectedBatch(BatchValue.name) */}
              {/* // console.log('------>',SelectedWarehouse.value)
                  // setApiData(p => {
                  //     var newdata = p
                  //     newdata[index].Warehouse = itemValue
                  //     console.log("newdata", newdata)

                  //     return [...newdata]
                  // })
                }
                }
              // mode='dropdown' 
              > */}
              {/* <Picker.Item label={"select"} />

                {
                  BatchList.map(batch => {

                    return (
                      <Picker.Item label={batch.name} value={batch} />
                    )
                  })
                }

              </Picker> */}

            </View>

            {/*  Location name and code  */}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: '2%' }}>

              <View>
                <Text style={{ fontWeight: '400' }}>Location :</Text>
              </View>

              <View>
                <Text style={{ fontWeight: '400' }}>{item.location}</Text>
              </View>

              <View>
                <Text style={{ fontWeight: '400' }}>Location code :</Text>
              </View>

              <View>
                <Text style={{ fontWeight: '400' }}>{item.locationcode}</Text>
              </View>

            </View>

          </Card>
        </View >
      </>
    )
  }

  return (
    <Provider>
      <View style={{ flex: 1 }}>

        <FlatList
          // data={BillDetails}
          data={list}
          renderItem={renderItems}
          showsVerticalScrollIndicator={true}
          // onEndReached={onEndReachedHandler}
          keyExtractor={(item) => item.recno.toString()}
          ListHeaderComponent={ListHeader}

        />

        {/* Submit And Revert button */}

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'ghostwhite', paddingVertical: '1%' }}>

          {/*  Revert Bill  */}
          <TouchableOpacity>
            <Button
              style={{ backgroundColor: 'white', alignSelf: 'center', borderWidth: 0.5, borderColor: 'orange', elevation: 6 }}
              onPress={() => setdialog(true)}
            >
              <Text style={{ color: 'orange' }}>Revert</Text>
            </Button>
          </TouchableOpacity>


          {/*  Submit Bill  */}
          <TouchableOpacity>
            <Button
              style={{ backgroundColor: 'orange', alignSelf: 'center', elevation: 6 }}
              onPress={SubmitCondition}
            >
              <Text style={{ color: 'white' }}>Submit</Text>
            </Button>
          </TouchableOpacity>

        </View>

        {
          dialog ? (
            <Portal>
              <Dialog visible={showDialog} onDismiss={hideDialog} style={{ height: '40%', justifyContent: 'space-between' }}>
                
                <View>

                  <Dialog.Title>Message</Dialog.Title>

                  <TextInput
                    style={{ fontWeight: '600', height: 40, width: '85%', alignSelf: 'center' }}
                    // multiline={true}
                    onChangeText={(text) => {
                      listHeader.message = text

                      console.log('listHeader---------->', listHeader)
                    }}
                  />

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Button onPress={() => {
                    list.map((itm) => {
                      console.log('itm=======', itm);
                      resendCounterBill(itm);
                    })
                  }} >Resend</Button>

                  <Button onPress={hideDialog}>Exit</Button>
                </View>

              </Dialog>
            </Portal>
          ) : null
        }

      </View>
    </Provider>
  )
}

export default ShowItem

const styles = StyleSheet.create({

  content_text: {
    fontSize: 15,
    color: 'black',
    marginLeft: '2%',
    marginVertical: '2.5%'
  },
  Body_Main_Card: {
    width: '98%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '2%',
    marginHorizontal: 5,

  },
  card_subViews: {
    padding: '1%'
  },
  Heder_Text: {
    color: "black",
    fontSize: 15,
    fontWeight: '500',
    // fontFamily: 'monospace'
  },

  textStyle: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    padding: 7,
  },

})
import * as React from 'react';

import {
  APP_NAME,
  BUTTON_TEXTS,
  COLORS,
  DEVICE_NAME,
  GET_DETAILS_TRANSACTION_ID,
  ICONS,
  SCANNER_TEXT,
} from '../constants';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Header, ListItem, Text} from 'react-native-elements';
import {
  createPopulateDevicesAction,
  createRequestPermissionAction,
  createToggleLoadingAction,
} from '../../../store/actions';
import {useDispatch, useSelector} from 'react-redux';

import {BleManager} from 'react-native-ble-plx';
import {enableBluetooth} from 'react-native-ble-manager';
import homeStyle from '../style';
import {pick} from 'lodash';

const {useEffect, useState} = React;
const {RETRY: RETRY_TEXT} = BUTTON_TEXTS;
const {HOME: HOME_ICON} = ICONS;
const {main, margin10, rescanContainer, buttonCenter} = homeStyle;
const {WHITE} = COLORS;
const {
  PLEASE_WAIT,
  DEVICE_FOUND,
  START_SENSOR,
  NO_DEVICE_FOUND,
  DEVICE_DETAILS,
  RESCAN,
} = SCANNER_TEXT;

const Scanner = () => {
  const dispatch = useDispatch();

  const {scanning, devices} = useSelector((state: {main: any}) => {
    return state.main;
  });

  const [manager] = useState(new BleManager({}));
  const [displayDeviceData, setdisplayDeviceData] = useState(false);
  const [device, setDevice] = useState<any>({
    name: '',
    id: '',
    rssi: 0,
    mtu: 0,
    txPowerLevel: 0,
  });

  useEffect(() => {
    dispatch(createRequestPermissionAction());
    scanForDevices();
    return () => manager.destroy();
  }, []);

  const handlePress = async (peripheral: any) => {
    dispatch(createToggleLoadingAction());
    try {
      !(await manager.isDeviceConnected(peripheral.id))
        ? await manager.connectToDevice(peripheral.id)
        : null;
      const device = await manager.discoverAllServicesAndCharacteristicsForDevice(
        peripheral.id,
        GET_DETAILS_TRANSACTION_ID,
      );
      const info = pick(device, ['name', 'id', 'mtu', 'rssi', 'txPowerLevel']);
      dispatch(createToggleLoadingAction());
      setDevice(info);
      setdisplayDeviceData(true);
    } catch (error) {
      dispatch(createToggleLoadingAction());
      console.log(error);
    }
  };

  const scanForDevices = async () => {
    dispatch(createToggleLoadingAction());
    setdisplayDeviceData(false);
    manager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        if (error.errorCode === 102) {
          await enableBluetooth();
          dispatch(createToggleLoadingAction());
          scanForDevices();
        } else {
          Alert.alert(String(error.reason));
        }
      } else if (device?.name === DEVICE_NAME)
        dispatch(createToggleLoadingAction()),
          dispatch(createPopulateDevicesAction([device])),
          manager.stopDeviceScan();
      else dispatch(createToggleLoadingAction()), manager.stopDeviceScan();
    });
  };

  return (
    <ScrollView>
      <Header
        leftComponent={{icon: HOME_ICON, color: WHITE}}
        centerComponent={{
          text: APP_NAME.toUpperCase(),
          style: {color: WHITE},
        }}></Header>
      {scanning ? (
        <View style={main}>
          <Text>{PLEASE_WAIT}</Text>
          <ActivityIndicator size="large" />
        </View>
      ) : !!devices.length ? (
        <View>
          <Text style={margin10} h4>
            {DEVICE_FOUND}
          </Text>
          {devices.map((device: any, index: number) => (
            <TouchableOpacity onPress={() => handlePress(device)} key={index}>
              <ListItem title={device.name} />
            </TouchableOpacity>
          ))}
          <Text style={margin10}>{START_SENSOR}</Text>
          {displayDeviceData ? (
            <>
              <Text style={margin10}>{DEVICE_DETAILS}</Text>
              {Object.keys(device).map((key, index) => {
                if (device.hasOwnProperty(key))
                  return (
                    <ListItem
                      key={index}
                      title={key}
                      subtitle={String(device[key])}
                    />
                  );
              })}
              <Button
                buttonStyle={buttonCenter}
                onPress={scanForDevices}
                title={RESCAN}
              />
            </>
          ) : null}
        </View>
      ) : (
        <View style={rescanContainer}>
          <Text h4>{NO_DEVICE_FOUND}</Text>
          <Button onPress={scanForDevices} title={RETRY_TEXT} />
        </View>
      )}
    </ScrollView>
  );
};

export default Scanner;

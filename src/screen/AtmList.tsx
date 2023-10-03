import React, {useState, useEffect} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import {PermissionsAndroid, Image, View, Text, ScrollView} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import jenisDokumentasiRepo from '../api/jenisDokumentasiRepo';
import SearchATM from '../components/SearchATM';

export default function AtmList({navigation}: any) {
  return (
    <ScrollView>
      <SearchATM></SearchATM>
      <Background>
        <Logo />
        <Paragraph>ATM LIST</Paragraph>
      </Background>
    </ScrollView>
  );
}

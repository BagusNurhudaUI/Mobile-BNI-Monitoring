import {View, Text} from 'react-native';
import React from 'react';

export interface AssetModel {
  latitude: string | null;
  longitude: string | null;
  name: string | null;
  gps_active: boolean;
}

// Set default values when creating an instance of AssetModel
export const defaultAsset: AssetModel = {
  latitude: null,
  longitude: null,
  name: null,
  gps_active: false,
};

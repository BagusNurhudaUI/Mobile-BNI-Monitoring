import AsyncStorage from '@react-native-async-storage/async-storage';

// Save token
const saveAuthToken = async (token: any) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

const saveUserInfo = async (json: any) => {
  try {
    await AsyncStorage.setItem('userInfo', json);
  } catch (error) {
    console.error('Error saving JSON userInfo:', error);
  }
};

const getUserInfo = async () => {
  try {
    const user = await AsyncStorage.getItem('userInfo');
    return user;
  } catch (error) {
    console.error('Error getting JSON userInfo:', error);
    return null;
  }
};

// Get token
const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Remove token
const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

export {
  saveAuthToken,
  getAuthToken,
  removeAuthToken,
  saveUserInfo,
  getUserInfo,
};

import React from 'react';
import {Image, StatusBar, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from '../core/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UPPER_HEADER_HEIGHT = 32;
const UPPER_HEADER_PADDING_TOP = 4;
const LOWER_HEADER_HEIGHT = 96;

export default function Header(props: any) {
  return (
    // <View
    //   style={{
    //     height: 60,
    //     backgroundColor: '#f76617',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}>
    //   <Text style={{color: '#fff', fontSize: 20}}>Your Header Template</Text>
    // </View>

    <View style={styles.container}>
      {/* <StatusBar barStyle="light-content" /> */}

      {/* <SafeAreaView>
        <View style={styles.upperHeaderPlaceholder} />
      </SafeAreaView> */}

      <SafeAreaView style={styles.header}>
        <View style={styles.upperHeader}>
          <View style={styles.searchContainer}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              Halo bagus
            </Text>
          </View>

          <Image
            source={require('../../assets/gme-icon1.png')}
            style={styles.bell}
          />
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={30}
            color="#ffffff"
            style={{marginRight: 5}}
          />
        </View>
      </SafeAreaView>

      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={e => {
          const offsetY = e.nativeEvent.contentOffset.y;
          scrollDirection.current =
            offsetY - lastOffsetY.current > 0 ? 'down' : 'up';
          lastOffsetY.current = offsetY;
          animatedValue.setValue(offsetY);
        }}
        onScrollEndDrag={() => {
          scrollViewRef.current?.scrollTo({
            y: scrollDirection.current === 'down' ? 100 : 0,
            animated: true,
          });
        }}
        scrollEventThrottle={16}>
        <View style={styles.spaceForHeader} />
        <View style={styles.scrollViewContent} />
      </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#f76617',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // header: {
  //   fontSize: 21,
  //   color: theme.colors.primary,
  //   fontWeight: 'bold',
  //   paddingVertical: 12,
  // },
  icon16: {
    width: 16,
    height: 16,
  },
  icon32: {
    width: 32,
    height: 32,
  },
  upperHeaderPlaceholder: {
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },
  header: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'f76617',
  },
  upperHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: UPPER_HEADER_HEIGHT + UPPER_HEADER_PADDING_TOP,
    paddingTop: UPPER_HEADER_PADDING_TOP,
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  featureIcon: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: 8,
  },
  bell: {
    width: 16,
    height: 16,
    marginHorizontal: 32,
  },
  avatar: {
    width: 28,
    height: 28,
  },
  lowerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: LOWER_HEADER_HEIGHT,
    paddingHorizontal: 16,
  },
  searchInput: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: 'white',
    borderRadius: 4,
    paddingVertical: 4,
    paddingLeft: 32,
  },
  feature: {
    alignItems: 'center',
  },
  featureName: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 14,
    color: '#FFFFFF',
    marginTop: 12,
  },
  spaceForHeader: {
    height: LOWER_HEADER_HEIGHT,
  },
  scrollViewContent: {
    height: 1000,
    backgroundColor: 'white',
  },
});

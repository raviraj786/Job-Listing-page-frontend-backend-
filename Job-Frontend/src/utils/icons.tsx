import { AntDesign, Entypo, Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { ComponentType } from 'react';
import { TextProps } from 'react-native';

export interface IconInfo {
  lib: ComponentType<TextProps & { name: string; size?: number; color?: string }>;
  name: string;
}

export type IconName =
  | 'home'
  | 'message'
  | 'network'
  | 'post'
  | 'profile'
  | 'settings'
  | 'camera'
  | 'plus'
  |'arrow-back-sharp'
  |'notification'
  |'search'
  | 'location'
  |'bookmark'
  |'backarrow'
  |'chevron'
  |'cross'
  | 'like'
  |'comment'
  |'follow'
  |'clock'
  |'share'
  


export const TAB_ICONS: Record<IconName, IconInfo> = {
  home: {
    lib: Entypo,
    name: 'home',
  },
  message: {
    lib: MaterialCommunityIcons,
    name: 'message-processing',
  },
  network: {
    lib: Feather,
    name: 'users',
  },
  post: {
    lib: Feather,
    name: 'plus-circle',
  },
  profile: {
    lib: FontAwesome,
    name: 'user',
  },
  settings: {
    lib: MaterialIcons,
    name: 'settings',
  },
  camera: {
    lib: Ionicons,
    name: 'camera-outline',
  },
  plus: {
    lib: Entypo,
    name: 'circle-with-plus',
  },
  notification: {
    lib: Ionicons,
    name: 'notifications-outline',
  },
  search: {
    lib: Feather,
    name: 'search',
  },
  search: {
    lib: Feather,
    name: 'search',
  },
  location: {
    lib: Entypo,
    name: 'location-pin',
  },
  bookmark: {
    lib: MaterialCommunityIcons,
    name: 'bookmark-plus-outline',
  },
  backarrow: {
    lib: Ionicons,
    name: 'arrow-back-outline',
  },
  chevron: {
    lib: Ionicons,
    name: 'chevron-back',
  },
  cross: {
    lib: Entypo,
    name: 'cross',
  },
  like: {
    lib: AntDesign,
    name: 'like2',
  },
  comment: {
    lib: MaterialCommunityIcons,
    name: 'message-reply-text-outline',
  },
  follow:{
    lib : AntDesign,
    name : 'adduser'
  },
  clock:{
    lib : Entypo,
    name: 'stopwatch',
  },
  share:{
    lib : AntDesign,
    name:'sharealt'

  }



};

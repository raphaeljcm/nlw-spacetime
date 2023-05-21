import blurBg from './assets/bg-blur.png';
import NlwLogo from './assets/nlw-logo.svg';
import Stripes from './assets/stripes.svg';
import { api } from './src/lib/api';
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { styled } from 'nativewind';
import { useEffect } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

const StylesStripes = styled(Stripes);

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/ applications/462a426ada0d31c98a69',
};

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  const [_, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '462a426ada0d31c98a69',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;

      api
        .post('/register', { code })
        .then(res => {
          const { token } = res.data;

          SecureStore.setItemAsync('token', token);
        })
        .catch(console.log);
    }
  }, [response]);

  if (!hasLoadedFonts) return null;

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 items-center bg-gray-900 px-8 py-10"
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
    >
      <StylesStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <NlwLogo />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          className="rounded-full bg-green-500 px-5 py-2"
          activeOpacity={0.7}
        >
          <Text
            className="font-alt text-sm uppercase text-black"
            onPress={() => signInWithGithub()}
          >
            Cadastrar Lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>

      <StatusBar style="light" translucent />
    </ImageBackground>
  );
}

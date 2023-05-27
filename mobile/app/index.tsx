import NlwLogo from '../assets/nlw-logo.svg';
import { api } from '../src/lib/api';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/ applications/462a426ada0d31c98a69',
};

export default function App() {
  const router = useRouter();

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

  const handleGithubOAuthCode = useCallback(
    async (code: string) => {
      try {
        const response = await api.post('/register', { code });

        const { token } = response.data;

        await SecureStore.setItemAsync('token', token);

        router.push('/memories');
      } catch (error) {
        console.log(error);
      }
    },
    [router],
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      handleGithubOAuthCode(code);
    }
  }, [response, handleGithubOAuthCode]);

  return (
    <View className="flex-1 items-center px-8 py-10">
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
    </View>
  );
}

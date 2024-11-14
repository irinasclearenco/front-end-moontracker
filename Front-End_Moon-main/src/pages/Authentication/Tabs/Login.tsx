import {Button, Icon, Input, Layout, Spinner} from '@ui-kitten/components';
import React, {FC, ReactElement, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TouchableWithoutFeedback, StyleSheet, View, ScrollView} from 'react-native';

import {GoogleIcon} from '../../../assets/Icons';
import ErrorMessage from '../../../components/ErrorMessage';
import {routeNames} from '../../../constants/routeNames';
import {useSignIn} from '../../../hooks/api/useSignIn';
import {SignInParams} from '../../../services/interfaces';
import {renderCaption} from '../../../utils';
import {formRules, signInForm} from '../consts';

const Login: FC = ({navigation, promptAsync, googleError, googleIsPending}: any) => {
  const {mutateAsync, error, isPending} = useSignIn();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const renderIcon = (props): ReactElement => (
    <TouchableWithoutFeedback onPress={() => setSecureTextEntry(!secureTextEntry)}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const onSignInButtonPress = ({email, password}: SignInParams) => {
    mutateAsync({email, password}).then(() => {
      if (!isPending && !error) {
        if (email.endsWith('@moon.tracker.com')) {
          navigation.navigate(routeNames.CABINET);
        } else {
          navigation.navigate(routeNames.DETAILS);
        }
      }
    });
  };

  return (
    <ScrollView>
      <Layout style={styles.tabContainer}>
        {signInForm.map(({placeholder, type}) => (
          <Controller
            control={control}
            rules={formRules[type]}
            name={type}
            key={type}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                textContentType={type === 'email' ? 'emailAddress' : 'password'}
                autoComplete={type}
                autoCapitalize="none"
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                caption={() => renderCaption(type, errors)}
                accessoryRight={type === 'password' && renderIcon}
                secureTextEntry={type === 'password' && secureTextEntry}
              />
            )}
          />
        ))}
        <Button onPress={handleSubmit(onSignInButtonPress)} style={styles.button}>
          Login
        </Button>
        {isPending && <Spinner status="danger" />}
        {error ? <ErrorMessage message={error} /> : null}
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => {
              promptAsync();
            }}
            accessoryLeft={GoogleIcon}
            appearance="outline"
            size="large"
            style={styles.button}>
            Continue with Google
          </Button>
        </View>
        {googleIsPending && <Spinner status="danger" />}
        {googleError ? <ErrorMessage message={error} /> : null}
      </Layout>
    </ScrollView>
  );
};
export default Login;
const styles = StyleSheet.create({
  tabContainer: {
    padding: 20,
    paddingTop: 30,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'stretch',
  },
  buttonsContainer: {
    marginTop: 20,
    display: 'flex',
    gap: 10,
    alignSelf: 'stretch',
  },
});

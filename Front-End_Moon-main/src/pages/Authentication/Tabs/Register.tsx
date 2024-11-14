import {Button, Icon, Input, Layout, Spinner} from '@ui-kitten/components';
import React, {FC, ReactElement, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {TouchableWithoutFeedback, StyleSheet, View, ScrollView} from 'react-native';

import {GoogleIcon} from '../../../assets/Icons';
import ErrorMessage from '../../../components/ErrorMessage';
import {routeNames} from '../../../constants/routeNames';
import {useSignUp} from '../../../hooks/api/useSignUp';
import {SignUpParams} from '../../../services/interfaces';
import {renderCaption} from '../../../utils';
import {formRules, signUpForm} from '../consts';

const Register: FC = ({navigation, promptAsync, googleError, googleIsPending}: any) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [notMatchedPasswordsError, setNotMatchedPasswordsError] = useState('');
  const {mutateAsync, error, isPending} = useSignUp();

  const renderIcon = (props: any): ReactElement => (
    <TouchableWithoutFeedback onPress={() => setSecureTextEntry(!secureTextEntry)}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );
  const onSignUpButtonPress = ({email, password, confirmPassword}: SignUpParams) => {
    if (confirmPassword !== password) {
      setNotMatchedPasswordsError('Passwords do not match');
      return;
    }
    setNotMatchedPasswordsError('');
    mutateAsync({email, password}).then(() => {
      if (email.endsWith('@moon.tracker.com')) {
        navigation.navigate(routeNames.CABINET);
      } else {
        navigation.navigate(routeNames.WAYTOUSE);
      }
    });
  };

  return (
    <ScrollView>
      <Layout style={styles.tabContainer}>
        {signUpForm.map(({placeholder, type}) => (
          <Controller
            control={control}
            rules={formRules[type]}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                textContentType={type === 'email' ? 'emailAddress' : 'password'}
                autoCapitalize="none"
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                caption={() => renderCaption(type, errors)}
                accessoryRight={type.includes('word') && renderIcon}
                secureTextEntry={type.includes('word') && secureTextEntry}
              />
            )}
            name={type}
            key={type}
          />
        ))}
        <Button onPress={handleSubmit(onSignUpButtonPress)} style={styles.button}>
          Register
        </Button>
        {isPending && <Spinner status="danger" />}
        {notMatchedPasswordsError || error ? (
          <ErrorMessage message={error || notMatchedPasswordsError} />
        ) : null}
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => promptAsync()}
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
export default Register;
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

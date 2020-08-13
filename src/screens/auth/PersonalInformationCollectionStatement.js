import React, { memo } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { WhiteBackground } from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';

const PersonalInformationCollectionStatement = ({ navigation }) => {

  const _onAgree = async () => {
    navigation.navigate('RegisterScreen');
  };

  const _onDisagree = async () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <WhiteBackground>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Header>Personal Information Collection Statement</Header>
      <ScrollView>
        <Text style={styles.paragraph}>
          This Personal Information Collection Statement gives you information that WeDerm Limited is required by the Personal Data (Privacy) Ordinance ("the Ordinance") and applicable laws to provide to you in relation to the personal data WeDerm may collect from you.
          {'\n\n'}
          WeDerm may collect your personal data from time to time in its dealing with you, for example, when you purchase products or services at WeDerm; register with WeDerm app; participate in or attend any activity of WeDerm; join WeDerm membership; make product or service enquiry.
          {'\n\n'}
          Depending on the purpose of the collection, the personal data WeDerm may collect from you includes your name, contact address, contact telephone number, email address, occupation, health condition and medical history. WeDerm will indicate on the forms collecting the personal data from you which of the data requested on such form is mandatory. If you do not supply the mandatory data, WeDerm may not be able to supply the products, services or information in relation to which the data is collected.
        </Text>

        <Text style={styles.heading}>Use of personal data</Text>
        <Text style={styles.paragraph}>
          During the term of business operation, the personal data collected by WeDerm may be electronically or manually processed/used by WeDerm for the following purposes within the jurisdictions in which WeDerm and/or data processors conduct businesses:
          {'\n1. '}processing your orders for products of WeDerm;
          {'\n2. '}processing your registration or order for services of WeDerm;
          {'\n3. '}verifying your identity for access to private contents of WeDerm’s app  or event of  WeDerm or for participating in activities of WeDerm;
          {'\n4. '}research and customer survey;
          {'\n5. '}processing your application for membership at WeDerm; managing, operating and maintaining the WeDerm membership;  and providing you with information on the activities and benefits of the WeDerm membership;
          {'\n6. '}billing and debt collection;
          {'\n7. '}dealing with your suggestion, enquiry and complaint;
          {'\n8. '}communicating with you generally;
          {'\n9. '}subject to the provisions of applicable laws to direct market WeDerm's products and services to you.
        </Text>

        <Text style={styles.heading}>Transfer of Personal Data</Text>
        <Text style={styles.paragraph}>
          Your personal data held by WeDerm will be kept confidential, but WeDerm may transfer your personal data to a data processor (e.g. printer, production house, providers of mailing services, cloud servers, storage providers, or a third party who powers WeDerm’s product) engaged by WeDerm to process or handle personal data on its behalf, subject to a duty of confidentiality.
          {'\n\n'}
          Because the internet is a global environment, you accept and agree that this will include the transfer of your personal information to other countries and regions around the world, including Japan, India, Middle East, UK, USA, Canada, Singapore, Australia, Philippines, China (including Mainland China, Hong Kong, Macao and Taiwan), Egypt, and European Economic Area.
        </Text>

        <Text style={styles.heading}>Rights of Access and Correction to Data Collected</Text>
        <Text style={styles.paragraph}>
          You have a right to (i) request access to; (ii) obtain a copy of; (iii) supplement or request correction of; (iv) request that WeDerm cease the collection, processing, or use of; or (v) request that WeDerm delete your personal data held by WeDerm. If you wish to exercise your rights, please contact WeDerm's Legal Department by email at ml.wederm@gmail.com. WeDerm will not charge you any fees with this regard.
          {'\n\n'}
          This Statement may be revised from time to time. If there is any inconsistency between the English and Chinese version of this Statement, the English version shall prevail.
        </Text>

      </ScrollView>



      <View style={styles.row}>
        <Button mode="text" style={styles.button} onPress={_onDisagree}>
          Disagree
        </Button>

        <Button mode="contained" style={styles.button} onPress={_onAgree}>
          Agree
        </Button>
      </View>

    </WhiteBackground>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
    alignSelf: 'flex-end'
  },
  button : {
    width: '50%'
  },
  paragraph: {
    color: theme.colors.secondary,
    textAlign: 'justify',
    lineHeight: 20,
    fontSize: 16,
    marginBottom: 20
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  }
});

export default memo(PersonalInformationCollectionStatement);

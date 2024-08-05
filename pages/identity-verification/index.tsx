import { useTranslation } from 'next-i18next';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import { Tabs } from '../../components/common/Tabs';
import { IdentityVerificationIcon } from '../../components/icons/IdentityVerificationIcon';
import PrivatePageLayout from '../../components/layout/PrivatePageLayout';
import { LabelConstants } from '../../types/i18n.labels';
import {
  ConfigurationKey,
  ELMChoice,
  Locales,
  UserProfileStatus,
} from '../../types/enums';
import { ProfileService } from '../../helpers/services';
import { useRouter } from 'next/router';
import ConfigurationService from '../../helpers/services/configuration.service';
import AbsherVerification from '../../components/identity-verification/AbsherVerification';
import AddressVerification from '../../components/identity-verification/AddressVerification';

const IdentityVerification = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [showTab1, setShowTab1] = useState<boolean>(false);
  const [showTab2, setShowTab2] = useState<boolean>(false);
  const [userChoice, setUserChoice] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);
  const [checkTabs, setCheckTabs] = useState<boolean>(false);
  const [elmConfiguration, setELMConfiguration] = useState<{
    userConfig: {
      absherVerification: boolean;
      addressVerification: boolean;
      isAbsherVerified: boolean;
      isYakeenVerified: boolean;
      status: UserProfileStatus;
      isActive: boolean;
      birthDate: string;
    };
    globalConfig: { absherVerification: boolean; addressVerification: boolean };
  }>();

  useEffect(() => {
    const initialLoad = async () => {
      const [profile, absherVerification, addressVerification] =
        await Promise.all([
          ProfileService.fetchUserData(router.locale),
          ConfigurationService.fetchConfigurationValue(
            ConfigurationKey.IsAbsherVerificationRequired,
            router.locale
          ),
          ConfigurationService.fetchConfigurationValue(
            ConfigurationKey.IsUserAddressVerificationRequired,
            router.locale
          ),
        ]);
      setELMConfiguration({
        userConfig: {
          isAbsherVerified: profile.IsAbsherVerified,
          isYakeenVerified: profile.IsYakeenVerified,
          absherVerification: profile.IsAbsherVerificationRequired,
          addressVerification: profile.IsAddressVerificationRequired,
          status: profile.UserProfileStatusKey as UserProfileStatus,
          isActive: profile.IsActive,
          birthDate: profile.BirthDate,
        },
        globalConfig: {
          absherVerification: absherVerification.ConfigurationValue === 'true',
          addressVerification:
            addressVerification.ConfigurationValue === 'true',
        },
      });

      const globalLevelAbsherVerification =
        absherVerification.ConfigurationValue === 'true';
      const globalLevelAddressVerification =
        addressVerification.ConfigurationValue === 'true';
      const userLevelAbsherVerification = profile.IsAbsherVerificationRequired;
      const userLevelAddressVerification =
        profile.IsAddressVerificationRequired;
      const isAbsherVerified = profile.IsAbsherVerified;
      const isYakeenVerified = profile.IsYakeenVerified;
      if (
        globalLevelAbsherVerification !== null &&
        userLevelAbsherVerification !== null &&
        globalLevelAddressVerification !== null &&
        userLevelAddressVerification !== null
      ) {
        if (isAbsherVerified) {
          router.push(
            `/identity-verification?tab=Step2${
              router.query.redirectUrl
                ? `&redirectUrl=${router.query.redirectUrl}`
                : ``
            }`,
            undefined,
            {
              shallow: true,
            }
          );
        }
        if (
          isAbsherVerified &&
          globalLevelAbsherVerification &&
          userLevelAbsherVerification
        ) {
          setShowTab1(true);
        }
        if (
          (!isAbsherVerified &&
            globalLevelAbsherVerification &&
            userLevelAbsherVerification) ||
          (!isYakeenVerified &&
            globalLevelAddressVerification &&
            userLevelAddressVerification)
        ) {
          if (
            !isAbsherVerified &&
            globalLevelAbsherVerification &&
            userLevelAbsherVerification
          ) {
            setShowTab1(true);
          }

          if (
            !isYakeenVerified &&
            globalLevelAddressVerification &&
            userLevelAddressVerification
          ) {
            setShowTab2(true);
          }

          if (
            globalLevelAbsherVerification &&
            globalLevelAddressVerification &&
            userLevelAbsherVerification &&
            userLevelAddressVerification
          ) {
            setCheckTabs(true);
          } else {
            setCheckTabs(false);
          }
        } else {
          router.push('/profile');
        }
      }
    };
    initialLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const refreshUserData = async () => {
    if (elmConfiguration) {
      const profile = await ProfileService.fetchUserData(router.locale);
      setELMConfiguration({
        globalConfig: { ...elmConfiguration?.globalConfig },
        userConfig: {
          isAbsherVerified: profile.IsAbsherVerified,
          isYakeenVerified: profile.IsYakeenVerified,
          absherVerification: profile.IsAbsherVerificationRequired,
          addressVerification: profile.IsAddressVerificationRequired,
          status: profile.UserProfileStatusKey as UserProfileStatus,
          isActive: profile.IsActive,
          birthDate: profile.BirthDate,
        },
      });
    }
  };

  return (
    <PrivatePageLayout title={t(LabelConstants.IDENTITY_VERIFICATION_LINK)}>
      <>
        {(showTab1 || showTab2) && (
          <div className="container mx-auto mt-8">
            {(elmConfiguration && !elmConfiguration.userConfig.status) ||
            (elmConfiguration &&
              (elmConfiguration.userConfig.status ===
                UserProfileStatus.YetToCreate ||
                elmConfiguration.userConfig.status ===
                  UserProfileStatus.Draft)) ? (
              <div
                className={'flex items-center justify-center w-auto h-48 my-8'}
              >
                <div>
                  <h1 className="text-base">
                    {t(LabelConstants.PROFILE_VERIFICATION_TITLE)}
                  </h1>
                  <div className="flex items-center justify-center mt-4">
                    <button
                      className="diagonal-btn  btn-primary"
                      onClick={() => router.push('/profile')}
                    >
                      {t(LabelConstants.GO_BACK_BUTTON_MSG)}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              elmConfiguration && (
                <div className="">
                  <div className="flex md:flex-row flex-col w-full mt-4">
                    <div className="md:w-1/2 w-full p-20">
                      <IdentityVerificationIcon />
                    </div>
                    <div className="flex justify-center p-6 md:w-1/2 w-full">
                      {elmConfiguration &&
                      elmConfiguration.userConfig.isAbsherVerified &&
                      elmConfiguration.userConfig.isYakeenVerified ? (
                        <h1 className="text-2xl text-black mt-4">
                          {t(LabelConstants.IDENTITY_VERIFICATION_SUCCESSFUL)}
                        </h1>
                      ) : (
                        <div className="w-full">
                          {!userChoice && (
                            <div className="flex flex-col gap-4 items-center justify-center w-full my-4">
                              <h1 className="text-black text-xl">
                                {t(LabelConstants.QUESTION_HEADING)}
                              </h1>
                              <div className="flex gap-4">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={(e) =>
                                      setUserChoice(ELMChoice.Nin)
                                    }
                                    className="btn btn-primary w-full uppercase"
                                  >
                                    {t(LabelConstants.NIN)}
                                  </button>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={(e) =>
                                      setUserChoice(ELMChoice.Iqama)
                                    }
                                    className="btn btn-primary w-full uppercase"
                                  >
                                    {t(LabelConstants.IQAMA_NUMBER)}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          {!checkTabs ? (
                            userChoice && showTab1 === true ? (
                              <AbsherVerification
                                userChoice={userChoice}
                                refreshUserData={refreshUserData}
                                setUserId={setUserId}
                                showTab2={showTab2}
                              />
                            ) : elmConfiguration.userConfig.isAbsherVerified &&
                              showTab1 === true ? (
                              <h1 className="text-base mt-4">
                                {t(LabelConstants.ABSHER_VERIFIED_PROFILE)}
                              </h1>
                            ) : null
                          ) : null}

                          {!checkTabs
                            ? userChoice &&
                              showTab2 === true && (
                                <AddressVerification
                                  userChoice={userChoice}
                                  userId={userId}
                                  dob={elmConfiguration.userConfig.birthDate}
                                />
                              )
                            : null}

                          {showTab1 === true &&
                            showTab2 === true &&
                            userChoice && (
                              <Tabs default="Step1">
                                <Tabs.Item id="Step1">
                                  <div className="text-lg cursor-pointer ">
                                    {t(LabelConstants.STEP_1)}
                                  </div>
                                </Tabs.Item>
                                <Tabs.Item
                                  id="Step2"
                                  disabled={
                                    !elmConfiguration.userConfig
                                      .isAbsherVerified
                                  }
                                >
                                  <div className="text-lg cursor-pointer ">
                                    {t(LabelConstants.STEP_2)}
                                  </div>
                                </Tabs.Item>
                                <Tabs.Page id="Step1">
                                  {showTab1 && (
                                    <div>
                                      {userChoice &&
                                      elmConfiguration.userConfig
                                        .isAbsherVerified ? (
                                        <h1 className="text-base mt-4 mb-4">
                                          {t(
                                            LabelConstants.ABSHER_VERIFIED_PROFILE
                                          )}
                                        </h1>
                                      ) : (
                                        <AbsherVerification
                                          userChoice={userChoice}
                                          refreshUserData={refreshUserData}
                                          setUserId={setUserId}
                                          showTab2={showTab2}
                                        />
                                      )}
                                    </div>
                                  )}
                                </Tabs.Page>
                                <Tabs.Page id="Step2">
                                  <div>
                                    {userChoice && (
                                      <AddressVerification
                                        userChoice={userChoice}
                                        userId={userId}
                                        dob={
                                          elmConfiguration.userConfig.birthDate
                                        }
                                      />
                                    )}
                                  </div>
                                </Tabs.Page>
                              </Tabs>
                            )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </>
    </PrivatePageLayout>
  );
};

export default IdentityVerification;

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};

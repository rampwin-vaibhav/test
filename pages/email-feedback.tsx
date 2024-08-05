import React, { useEffect, useState } from 'react';
import type {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../types/enums';
import { useRouter } from 'next/router';
import { LabelConstants } from '../types/i18n.labels';
import PrivatePageLayout from '../components/layout/PrivatePageLayout';
import {
  FeedbackArtifactTypes,
  FeedbackQuestions,
  FetchEmailFeedbackResponse,
  PostFeedbackResponse,
  FeedbackResponse,
} from '../types/models';
import { SupportService } from '../helpers/services';
import { toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormRating, FormTextarea, FormFile } from '../components/common/Form';
import MessageBox from '../components/common/MessageBox';
import { CommonUtils } from '../helpers/utilities';

type IFormInput = {
  feedbackText: string;
  images: Array<File>;
  video: File;
} & { [x: string]: number };

type EmailFeedBackPageProps = {};

const EmailFeedBackPage: NextPage<EmailFeedBackPageProps> = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const router = useRouter();
  const { t } = useTranslation();

  const schema: any = yup
    .object({
      Que1: yup
        .number()
        .test(
          'ratingRequired',
          LabelConstants.RATING_REQUIRED,
          (number) =>
            !(initialLoadData?.feedbackQuestionIds.includes(1) && !number)
        ),
      Que2: yup
        .number()
        .test(
          'ratingRequired',
          LabelConstants.RATING_REQUIRED,
          (number) =>
            !(initialLoadData?.feedbackQuestionIds.includes(2) && !number)
        ),
      Que3: yup
        .number()
        .test(
          'ratingRequired',
          LabelConstants.RATING_REQUIRED,
          (number) =>
            !(initialLoadData?.feedbackQuestionIds.includes(3) && !number)
        ),
      Que4: yup
        .number()
        .test(
          'ratingRequired',
          LabelConstants.RATING_REQUIRED,
          (number) =>
            !(initialLoadData?.feedbackQuestionIds.includes(4) && !number)
        ),
      Que5: yup
        .number()
        .test(
          'ratingRequired',
          LabelConstants.RATING_REQUIRED,
          (number) =>
            !(initialLoadData?.feedbackQuestionIds.includes(5) && !number)
        ),
      feedbackText: yup
        .string()
        .test(
          'feedbackTextRequired',
          LabelConstants.ADVISE_FOR_IMPROVEMENT,
          (value) =>
            !(
              ((getValues('Que1') && getValues('Que1') <= 3) ||
                (getValues('Que2') && getValues('Que2') <= 3) ||
                (getValues('Que3') && getValues('Que3') <= 3) ||
                (getValues('Que4') && getValues('Que4') <= 3) ||
                (getValues('Que5') && getValues('Que5') <= 3)) &&
              value === undefined
            )
        )
        .test(
          'feedbackTextLengthCheck',
          LabelConstants.ALLOWED_MAX_200_CHAR,
          (value) => String(value)?.length <= 200
        ),
    })
    .required();

  const { control, handleSubmit, watch, setValue, getValues, resetField } =
    useForm<IFormInput>({
      resolver: yupResolver(schema),
    });
  const { images, video } = watch();

  const allowedImageFileSize = 5242880;
  const allowedVideoFileSize = 102400 * 100;

  const [feedbackId, setFeedbackId] = useState<string>();
  const [initialLoadData, setInitialLoadData] = useState<{
    feedbackQuestions: Array<FeedbackQuestions>;
    artifactData: Array<FeedbackArtifactTypes>;
    feedbackQuestionIds: Array<number>;
  }>();

  useEffect(() => {
    const { fd } = router.query;
    const id = Buffer.from(String(fd), 'base64').toString();
    if (id) setFeedbackId(id);
    else router.replace('/404');
  }, [router]);

  useEffect(() => {
    const initialLoad = async () => {
      const response: FetchEmailFeedbackResponse =
        await SupportService.fetchEmailFeedback(router.locale, feedbackId!);
      if (response) {
        setInitialLoadData({
          feedbackQuestions: response.FeedbackQuestions,
          artifactData: response.FeedbackArtifactTypes,
          feedbackQuestionIds: response.FeedbackQuestions.map(
            (value) => value.FeedbackQuestionId
          ),
        });
      }
    };
    initialLoad();
  }, [feedbackId, router]);

  useEffect(() => {
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        if (images[i].size > allowedImageFileSize) {
          MessageBox.open({
            content: t(LabelConstants.FILE_SIZE_EXCEEDS_5_MB),
          });
          if (i === 0) setValue('images', []);
          else setValue('images', [images[0]]);
        } else if (
          images[i].type !== 'image/jpeg' &&
          images[i].type !== 'image/png' &&
          images[i].type !== 'image/jpg' &&
          images[i].type !== 'application/pdf'
        ) {
          MessageBox.open({
            content: t(LabelConstants.IMAGE_SELECTION_FORMAT),
          });
          if (i === 0) setValue('images', []);
          else setValue('images', [images[0]]);
        }
      }
    }
  }, [images, t, setValue, resetField, allowedImageFileSize]);

  useEffect(() => {
    if (video) {
      const mediaType = video && video.type.toLowerCase();
      if (video.size > allowedVideoFileSize) {
        MessageBox.open({
          content: t(LabelConstants.FILE_SIZE_EXCEEDS_10_MB),
        });
        resetField('video');
      } else if (
        mediaType !== 'video/mp4' &&
        mediaType !== 'video/avi' &&
        mediaType !== 'video/mpg'
      ) {
        MessageBox.open({
          content: t(LabelConstants.VIDEO_SELECTION_FORMAT),
        });
        resetField('video');
      }
    }
  }, [video, t, setValue, resetField, allowedVideoFileSize]);

  const submitFeedbackData: SubmitHandler<IFormInput> = async (
    data: IFormInput
  ) => {
    const feedbackKeys = Object.keys(data).filter((value) => {
      if (value.includes('Que')) return value;
    });
    const feedbackResponseList: Array<FeedbackResponse> = feedbackKeys.map(
      (x) => {
        return {
          FeedbackQuestionId: Number(x?.replace('Que', '')),
          Rating: data[x],
        };
      }
    );
    let payload = {
      FeedbackId: feedbackId!,
      FeedbackResponseList: feedbackResponseList,
      FeedbackText: data.feedbackText,
    };
    const result: PostFeedbackResponse = await SupportService.postEmailFeedback(
      payload
    );
    if (result.IsSuccess) {
      if (data.images !== undefined && data.images !== null) {
        for (let i = 0; i < data.images.length; i++) {
          const imageData = {
            FeedbackId: feedbackId!,
            ArtifactTypeId:
              initialLoadData && initialLoadData.artifactData[0]
                ? initialLoadData.artifactData[0].ArtifactTypeId
                : null,
            FileName: data.images[i].name,
            FileData: await CommonUtils.convertBase64(data.images[i]),
          };
          const artifactResult: number =
            await SupportService.uploadFeedbackArtifact(imageData);
          if (!artifactResult) {
            toast.error(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR));
            return;
          }
        }
      }
      if (data.video !== undefined && data.video !== null) {
        const videoDataPayload = {
          FeedbackId: feedbackId!,
          ArtifactTypeId:
            initialLoadData && initialLoadData.artifactData[1]
              ? initialLoadData.artifactData[1].ArtifactTypeId
              : null,
          FileName: data.video.name,
          FileData: await CommonUtils.convertBase64(data.video),
        };
        const videoUploadResult: number =
          await SupportService.uploadFeedbackArtifact(videoDataPayload);
        if (!videoUploadResult) {
          toast.error(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR));
          return;
        }
      }
    }
    if (result.Message === LabelConstants.FEEDBACK_THANK_YOU_MSG) {
      await MessageBox.open({
        content: t(LabelConstants.THANK_YOU_SPENDING_VALUABLE_TIME),
      });
      router.replace('/');
    } else if (result.Message === LabelConstants.FEEDBACK_ALREADY_SUBMITTED) {
      await MessageBox.open({
        content: t(LabelConstants.ALREADY_SUBMITTED_FEEDBACK),
      });
      router.replace('/');
    } else if (result.Message === LabelConstants.LINK_EXPIRED) {
      await MessageBox.open({
        content: t(LabelConstants.LINK_EXPIRED),
      });
      router.replace('/');
    } else {
      await MessageBox.open({
        content: t(LabelConstants.SOMETHING_WENT_WRONG_ERROR),
      });
    }
  };

  return (
    <PrivatePageLayout title={t(LabelConstants.FEEDBACK)}>
      <form onSubmit={handleSubmit(submitFeedbackData)}>
        <div className="flex flex-col gap-[1.875rem]">
          {initialLoadData?.feedbackQuestions.map((data, index) => (
            <div
              key={data.FeedbackQuestionId}
              className="flex flex-row font-bold"
            >
              <FormRating
                key={data.FeedbackQuestionId}
                control={control}
                name={`Que${data.FeedbackQuestionId}`}
                label={`${index + 1}  ${data.FeedbackQuestion}*`}
              />
            </div>
          ))}
        </div>
        <div className="mt-8">
          <FormTextarea
            control={control}
            name="feedbackText"
            label={t(LabelConstants.ADDITIONAL_INPUTS)}
            placeholder={t(LabelConstants.MAXIMUM_200_CHARACTERS)}
            rows={3}
          />
        </div>
        <div className="flex gap-10 mt-10">
          <div className="w-1/2">
            <label>{t(LabelConstants.UPLOAD_IMAGES)}</label>
            <h1 className={`mt-2 text-xs text-gray-500 mb-4`}>
              {t(LabelConstants.UPLOAD_TWO_IMAGES)}
            </h1>
            <FormFile
              label=""
              control={control}
              name="images"
              accept="image/png, image/jpeg"
              multiple={true}
              max={2}
            />
          </div>
          <div className="w-1/2">
            <label>{t(LabelConstants.UPLOAD_VIDEOS)}</label>
            <h1 className={`mt-2 text-xs text-gray-500 mb-4`}>
              ({t(LabelConstants.UPLOAD_ONE_VIDEO)})
            </h1>
            <FormFile
              label=""
              control={control}
              name="video"
              accept=".mp4, .avi, .mpg"
              preview="specific"
            />
          </div>
        </div>
        <div className="flex gap-4 mt-5">
          <button
            type="button"
            className={'btn btn-secondary uppercase'}
            onClick={() => {
              router.back();
            }}
          >
            {t(LabelConstants.CANCEL)}
          </button>
          <button type="submit" className={'btn btn-primary uppercase'}>
            {t(LabelConstants.SUBMIT)}
          </button>
        </div>
      </form>
    </PrivatePageLayout>
  );
};
export default EmailFeedBackPage;

export const getStaticProps: GetStaticProps<EmailFeedBackPageProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};

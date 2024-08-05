import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import { ListingImageArtifact, ProfileArtifact } from '../../types/models';
import DocumentPreview from '../common/DocumentPreview';
import { DownloadIcon, VideoPlayIcon } from '../icons';

type VehicleVideosProps = {
  externalVideoArtifacts: Array<ListingImageArtifact | ProfileArtifact>;
};

const VehicleVideos = ({ externalVideoArtifacts }: VehicleVideosProps) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<{
    show: boolean;
    url?: string;
    mimeType?: string;
  }>({ show: false });

  useEffect(() => {
    return () => setPreview({ show: false });
  }, []);

  const downloadVideo = (doc: ListingImageArtifact | ProfileArtifact) => {
    if (doc?.ArtifactUrlPath) {
      const a = document.createElement('a');
      a.href = doc?.ArtifactUrlPath;
      a.setAttribute(
        'download',
        (doc as ListingImageArtifact)?.Description || ''
      );
      a.click();
    }
  };

  if (
    externalVideoArtifacts &&
    (externalVideoArtifacts?.length == 0 ||
      externalVideoArtifacts.filter((x) => x.ArtifactUrl).length == 0)
  )
    return <></>;

  return (
    <>
      <h3 className="text-2xl mb-4">{t(LabelConstants.EXPLORE_MORE)}</h3>
      <div className="sm:w-[30rem] grid grid-cols-2 gap-4 w-auto">
        {externalVideoArtifacts &&
          externalVideoArtifacts?.length > 0 &&
          externalVideoArtifacts?.map(
            (doc: ListingImageArtifact | ProfileArtifact, index: number) => {
              if (!doc.ArtifactUrl) {
                return <React.Fragment key={index}></React.Fragment>;
              } else {
                return (
                  <div
                    className="bg-white relative rounded p-[0.6rem] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
                    key={index}
                  >
                    <video
                      className="w-full aspect-video rounded"
                      autoPlay={false}
                    >
                      <source
                        src={doc.ArtifactUrlPath!}
                        type={doc?.MimeType!}
                      />
                    </video>
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="relative h-full w-full">
                        <div className="flex justify-center items-center w-full h-full cursor-pointer">
                          <span
                            className="contents"
                            onClick={() =>
                              setPreview({
                                show: true,
                                url: doc.ArtifactUrlPath!,
                                mimeType: doc?.MimeType!,
                              })
                            }
                          >
                            <VideoPlayIcon className="w-1/6 text-white cursor-pointer opacity-80 hover:opacity-100 hover:scale-[1.1] transition-all duration-500" />
                          </span>
                        </div>
                        <div
                          className="absolute bottom-4 right-4"
                          onClick={() => {
                            downloadVideo(doc);
                          }}
                        >
                          <DownloadIcon className="w-5 h-5 cursor-pointer text-white hover:text-selection" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            }
          )}
      </div>
      {preview.show && (
        <DocumentPreview
          showPopUp={preview.show}
          closeModal={() => {
            setPreview({ show: false });
          }}
          documentUrl={preview.url! || ''}
          mimeType={preview.mimeType! || ''}
          documentName={preview.url!}
        />
      )}
    </>
  );
};

export default VehicleVideos;

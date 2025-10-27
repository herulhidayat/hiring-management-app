import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Webcam from 'react-webcam';
import axios from 'axios';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import * as fp from 'fingerpose';
import ButtonCustom from '../Button/ButtonCustom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { OneGesture, ThreeIndexMiddleRing, TwoGesture } from '../Helper/finger-gesture.helper';

const videoConstraints: MediaTrackConstraints = {
  facingMode: { ideal: 'environment' }, // Prefer the rear camera on mobile
};

const TARGET_GESTURE = 'victory';
const COUNTDOWN_DURATION = 3;

interface Props {
  callbackData?: (value: any) => void
}

const CameraCapture: React.FC<Props> = ({callbackData}: Props) => {
  const webcamRef = useRef<Webcam | null>(null);
  // const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const detectionModelRef = useRef<handpose.HandPose | null>(null);
  const rafRef = useRef<number>(0);
  const countdownTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const gestureEstimatorRef = useRef(
    new fp.GestureEstimator([
      OneGesture,
      TwoGesture,
      ThreeIndexMiddleRing
    ])
  );

  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [captureDimensions, setCaptureDimensions] = useState({ width: 640, height: 480 });
  const [gesture, setGesture] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [captureState, setCaptureState] = useState(0);
  const [isModelReady, setIsModelReady] = useState(false);

  // const drawOverlay = useCallback(() => {
  //   const canvas = canvasRef.current;
  //   const video = webcamRef.current?.video;
  //   if (!canvas || !video) {
  //     return;
  //   }

  //   // Keep the drawing buffer aligned with the incoming video
  //   if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //   }

  //   const context = canvas.getContext('2d');
  //   if (!context) {
  //     return;
  //   }

  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //   if (countdown > 0) {
  //     context.font = '32px sans-serif';
  //     context.fillStyle = '#FAFAFA';
  //     context.textAlign = 'center';
  //     context.textBaseline = 'middle';

  //     const centerX = canvas.width / 2;
  //     const centerY = canvas.height / 2;
  //     const lineSpacing = 36; // Adds breathing room between the label and countdown

  //     context.fillText('Capturing photo in', centerX, centerY - lineSpacing / 2);
  //     context.fillText(`${countdown}`, centerX, centerY + lineSpacing / 2);
  //   }
  // }, [countdown]);

  const detect = useCallback(async () => {
    const net = detectionModelRef.current;
    const video = webcamRef.current?.video;
    if (!net || !video || video.readyState !== 4) {
      rafRef.current = requestAnimationFrame(detect);
      return;
    }

    const predictions = await net.estimateHands(video);
    if (predictions.length > 0) {
      const estimation = gestureEstimatorRef.current.estimate(predictions[0].landmarks as any, 8.0);
      if (estimation.gestures.length > 0) {
        const confidence = estimation.gestures.map((prediction) => prediction.score);
        const maxConfidence = confidence.indexOf(Math.max(...confidence));
        setGesture(estimation.gestures[maxConfidence].name);
      } else {
        setGesture(null);
      }
    } else {
      setGesture(null);
    }

    rafRef.current = requestAnimationFrame(detect);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadHandpose = async () => {
      try {
        setIsModelReady(false);
        await tf.setBackend('webgl');
        await tf.ready();
        if (!isMounted) return;

        detectionModelRef.current = await handpose.load();
        if (!isMounted) return;

        setIsModelReady(true);
        detect();
      } catch (error) {
        console.error('Failed to initialize handpose model', error);
        if (isMounted) {
          setIsModelReady(false);
        }
      }
    };

    loadHandpose();

    return () => {
      isMounted = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      detectionModelRef.current = null;
      if (countdownTimerRef.current) {
        clearTimeout(countdownTimerRef.current);
      }
    };
  }, [detect]);

  // useEffect(() => {
  //   drawOverlay();
  // }, [countdown, drawOverlay]);

  const capturePhoto = useCallback(() => {
    const video = webcamRef.current?.video;
    const screenshot = webcamRef.current?.getScreenshot?.();
    if (screenshot) {
      setCaptureDimensions({
        width: video?.videoWidth || 640,
        height: video?.videoHeight || 480,
      });
      setImgSrc(screenshot);
      setCountdown(0);
    }
  }, []);

  useEffect(() => {
    // if (gesture !== TARGET_GESTURE || countdown > 0 || imgSrc) {
    //   return;
    // }
    if (gesture === 'three') {
      setCaptureState(1);
    } else if (gesture === 'two' && captureState === 1) {
      setCaptureState(2);
    } else if (gesture === 'one' && captureState === 2) {
      setCaptureState(3);
      setCountdown(COUNTDOWN_DURATION);
    }

  }, [gesture, countdown, imgSrc]);

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    countdownTimerRef.current = setTimeout(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          capturePhoto();
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => {
      if (countdownTimerRef.current) {
        clearTimeout(countdownTimerRef.current);
      }
    };
  }, [countdown, capturePhoto]);

  const renderCountdown = useMemo(() => {
    return (
      <div className="w-full h-full flex justify-center items-center gap-2 bg-[rgba(0,0,0,0.5)]">
        <div className='flex flex-col justify-center items-center gap-2'>
          <p className='text-xl text-white font-bold'>Capturing photo in</p>
          <p className='text-4xl text-white font-bold'>{countdown}</p>
        </div>
      </div>
    )
  }, [countdown]);

  return (
    <div>
      {imgSrc ? (
        <>
          <div className="flex flex-col gap-4">
            <Image
              src={imgSrc}
              alt="Captured"
              width={captureDimensions.width}
              height={captureDimensions.height}
              style={{ width: '100%', height: 'auto'}}
            />
            <div className="flex gap-2 justify-center text-sm font-bold">
              <ButtonCustom
                optionsConfig={{
                  onClick:() => {
                    setImgSrc(null)
                    setCaptureState(0)
                  }
                }}
                styleConfig={{
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid var(--color-neutral-40)',
                  color: 'var(--color-neutral-90)',
                  '&:hover': {
                    backgroundColor: 'var(--color-neutral-30)',
                    boxShadow: 'none'
                  }
                }}
              >Retake Photo</ButtonCustom>
              <ButtonCustom
                optionsConfig={{
                  onClick:() => {
                    if(callbackData) callbackData(imgSrc)
                  }
                }}
              >Submit</ButtonCustom>
            </div>
          </div>
        </>
      ): (
        <div className='flex flex-col gap-4'>
          <div className='relative'>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              style={{ width: '100%', height: 'auto' }}
            />
            {countdown > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                }}
              >
                {renderCountdown}
              </div>
            )}
            {(!isModelReady) && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                }}
              >
                <div className="w-full h-full flex justify-center items-center gap-2 bg-[rgba(0,0,0,0.5)]">
                  <p className='text-xl text-white font-bold'>Initializing model...</p>
                </div>
              </div>
            )}
          </div>
          <div className='flex flex-col justify-center items-center gap-4'>
            <p className='text-sm'>To take a picture, follow the hand poses in the order shown below. The system will automatically capture the image once the final pose is detected.</p>
            <div className='flex gap-2 text-3xl justify-center items-center'>
              <div className={captureState === 1 ? 'border-2 border-primary' : ''}>
                <Image 
                  src={"/assets/hand-3.png"} 
                  alt="hand-3" 
                  width={57} 
                  height={57} 
                />
              </div>
              <ArrowForwardIosIcon />
              <div className={captureState === 2 ? 'border-2 border-primary' : ''}>
                <Image 
                  src={"/assets/hand-2.png"} 
                  alt="hand-2" 
                  width={57} 
                  height={57} 
                />
              </div>
              <ArrowForwardIosIcon />
              <div className={captureState === 3 ? 'border-2 border-primary' : ''}>
                <Image 
                  src={"/assets/hand-1.png"} 
                  alt="hand-2" 
                  width={57} 
                  height={57} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;

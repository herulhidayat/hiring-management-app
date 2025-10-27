import * as fp from 'fingerpose';

// ===== ONE: hanya telunjuk lurus =====
export const OneGesture = new fp.GestureDescription('one');
// Telunjuk lurus
OneGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
OneGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 0.9);
OneGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 0.5);
OneGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 0.5);
// Jari lain menekuk
[fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky, fp.Finger.Thumb].forEach(f => {
  OneGesture.addCurl(f, fp.FingerCurl.FullCurl, 0.9);
  OneGesture.addCurl(f, fp.FingerCurl.HalfCurl, 0.5);
});

// ===== TWO / VICTORY: telunjuk + tengah lurus =====
export const TwoGesture = new fp.GestureDescription('two');
// Telunjuk & Tengah lurus
[fp.Finger.Index, fp.Finger.Middle].forEach(f => {
  TwoGesture.addCurl(f, fp.FingerCurl.NoCurl, 1.0);
  TwoGesture.addDirection(f, fp.FingerDirection.VerticalUp, 0.9);
  TwoGesture.addDirection(f, fp.FingerDirection.DiagonalUpLeft, 0.5);
  TwoGesture.addDirection(f, fp.FingerDirection.DiagonalUpRight, 0.5);
});
// Ibu jari opsional (sedikit menekuk atau ke samping)
TwoGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.7);
TwoGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 0.3);
// Ring & Kelingking menekuk
[fp.Finger.Ring, fp.Finger.Pinky].forEach(f => {
  TwoGesture.addCurl(f, fp.FingerCurl.FullCurl, 0.9);
  TwoGesture.addCurl(f, fp.FingerCurl.HalfCurl, 0.7);
});

// ===== THREE (versi 1): 👍 + ☝️ + ✌️ =====
export const ThreeThumbIndexMiddle = new fp.GestureDescription('three_thumb_index_middle');
// Thumb, Index, Middle lurus/terbuka
[fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle].forEach(f => {
  ThreeThumbIndexMiddle.addCurl(f, fp.FingerCurl.NoCurl, 1.0);
});
// Arah fleksibel (atas/diagonal)
[fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle].forEach(f => {
  ThreeThumbIndexMiddle.addDirection(f, fp.FingerDirection.VerticalUp, 0.7);
  ThreeThumbIndexMiddle.addDirection(f, fp.FingerDirection.DiagonalUpLeft, 0.5);
  ThreeThumbIndexMiddle.addDirection(f, fp.FingerDirection.DiagonalUpRight, 0.5);
});
// Ring & Pinky menekuk
[fp.Finger.Ring, fp.Finger.Pinky].forEach(f => {
  ThreeThumbIndexMiddle.addCurl(f, fp.FingerCurl.FullCurl, 0.9);
  ThreeThumbIndexMiddle.addCurl(f, fp.FingerCurl.HalfCurl, 0.7);
});

// ===== THREE (versi 2): ☝️ + ✌️ + 💍 (ibu jari menekuk) =====
export const ThreeIndexMiddleRing = new fp.GestureDescription('three');
// Index, Middle, Ring lurus
[fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring].forEach(f => {
  ThreeIndexMiddleRing.addCurl(f, fp.FingerCurl.NoCurl, 1.0);
  ThreeIndexMiddleRing.addDirection(f, fp.FingerDirection.VerticalUp, 0.9);
  ThreeIndexMiddleRing.addDirection(f, fp.FingerDirection.DiagonalUpLeft, 0.5);
  ThreeIndexMiddleRing.addDirection(f, fp.FingerDirection.DiagonalUpRight, 0.5);
});
// Thumb & Pinky menekuk
[fp.Finger.Thumb, fp.Finger.Pinky].forEach(f => {
  ThreeIndexMiddleRing.addCurl(f, fp.FingerCurl.FullCurl, 0.9);
  ThreeIndexMiddleRing.addCurl(f, fp.FingerCurl.HalfCurl, 0.7);
});

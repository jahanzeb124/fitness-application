import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import AudioRecord from 'react-native-audio-record';

export default function audio() {
  const [blob, setBlob] = useState();

  const options = {
    sampleRate: 16000, // default 44100
    channels: 1, // 1 or 2, default 1
    bitsPerSample: 16, // 8 or 16, default 16
    audioSource: 6, // android only (see below)
    wavFile: 'test.wav', // default 'audio.wav'
  };

  const start = () => {
    console.log('started');
    AudioRecord.init(options);
    AudioRecord.start();
  };
  const stopRecord = async () => {
    console.log('stopped');
    let audioFile = await AudioRecord.stop();
    let res = await fetch('file:///' + audioFile).then((r) => r.blob());

    setBlob(res);
  };

  // or to get the wav file path

  //   var audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';
  //   const startRecord = async () => {
  //     await AudioRecorder.prepareRecordingAtPath(audioPath, {
  //       SampleRate: 22050,
  //       Channels: 1,
  //       AudioQuality: 'Low',
  //       AudioEncoding: 'wav',
  //       IncludeBase64: true,
  //     }).catch((err) => console.log(err));
  //     await AudioRecorder.startRecording((success) => {
  //       console.log(success);
  //     }).catch((err) => console.log(err));
  //   };

  //   const stopRecord = () => {
  //     AudioRecorder.stopRecording();
  //     // AudioRecorder.onFinished((res) => {
  //     //   console.log(res.audioFileURL);
  //     // });
  //     console.log(audioPath);
  //   };

  return (
    <View>
      <Button title="Start" onPress={start}></Button>
      <Button title="Stop" onPress={stopRecord}>
        <Text>Stop Recording</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});

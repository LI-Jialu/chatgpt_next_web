// 导入 Azure Speech SDK
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const fs = require("fs");

// 测试函数
async function testAzureTTS() {
  // Azure Speech Service 配置
  const subscriptionKey = "b598a045db804d67ac3e57f4a0b984e8"; // 替换为你的订阅密钥
  const serviceRegion = "eastasia"; // 替换为你的服务区域
  const voiceName = "zh-HK-HiuMaanNeural"; // 粤语语音

  // 初始化 Speech SDK 配置
  const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
  speechConfig.speechSynthesisVoiceName = voiceName;
  speechConfig.speechSynthesisOutputFormat =
    sdk.SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3;

  const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

  // 测试文本
  const text = "你好！这是一个测试语音合成的例子。";

  try {
    console.log("开始语音合成...");
    const result = await new Promise((resolve, reject) => {
      synthesizer.speakTextAsync(
        text,
        (res) => resolve(res),
        (err) => reject(err)
      );
    });

    if (result.audioData) {
      console.log("语音合成完成，保存音频...");

      // 将 ArrayBuffer 转换为 Buffer
      const buffer = Buffer.from(result.audioData);

      // 保存为 MP3 文件
      fs.writeFileSync("output.mp3", buffer);
      console.log("音频已保存为 output.mp3");
    } else {
      console.error("未收到音频数据！");
    }
  } catch (error) {
    console.error("语音合成出错：", error);
  } finally {
    synthesizer.close(); // 释放资源
  }
}

// 运行测试函数
testAzureTTS();

import React, { useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "../styles/GenerateDiaryPage.scss";
import Back from "../assets/diary/back.svg";
import { useNavigate } from "react-router-dom";
import Apis from "../apis/Apis";

const GenerateDiaryPage = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [finish, setFinish] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const fileInputRef = useRef(null);

  // 이미지 업로드 핸들러
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setSelectedFile(file);
    }
  };

  // Preview 영역을 클릭하면 파일 업로드 input을 트리거
  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setFinish(true);
  };

  // FormData로 서버에 이미지와 transcript 전송
  const handleSubmit = async () => {
    if (!selectedFile || !transcript) return;

    const formData = new FormData();
    formData.append("voiceText", transcript);
    formData.append("image", selectedFile);

     Apis.post("/api/v1/diary/", formData)
     .then((res) => {
        console.log(res)
        navigate('/diary/' + res.data.data.diaryId)
     });
  };

  return (
    <>
      <div className="Generate--Wrapper">
        <img
          src={Back}
          alt="Back"
          onClick={() => navigate("/")}
          className="Generate--Back"
        />
        <div className="Generate--Preview--Container">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            style={{ display: "none" }} // input을 숨김
          />
          {preview ? (
            <div className="Generate--Preview" onClick={handleDivClick}>
              <img src={preview} alt="Preview" className="ImagePreview" />
            </div>
          ) : (
            <div className="Generate--NoPreview" onClick={handleDivClick}>
              여기를 눌러 이미지를 등록해주세요!
            </div>
          )}
        </div>
        <div className="Generate--VoiceText">{transcript}</div>
        {!finish || transcript.length === 0 ? (
          <div
            className="Generate--Voice--Button"
            onClick={!listening ? startListening : stopListening}
          >
            {!listening ? "녹음하기" : "녹음 중단하기"}
          </div>
        ) : (
          <button
            className="Generate--Voice--Button"
            onClick={handleSubmit}
            disabled={!selectedFile || !transcript}
          >
            일기생성
          </button>
        )}
      </div>
    </>
  );
};

export default GenerateDiaryPage;

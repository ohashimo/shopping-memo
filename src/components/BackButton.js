// src/components/BackButton.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style.css';

const BackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 戻るボタンを非表示にするルートを指定
  const hideBackButtonPaths = ["/"];

  // 現在のパスが非表示リストに含まれる場合は何もレンダリングしない
  if (hideBackButtonPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      ← 戻る
    </button>
  );
};

export default BackButton;

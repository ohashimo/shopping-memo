import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import CategoryList from './CategoryList';
import MemoPage from './MemoPage';
import EditCategory from './EditCategory';
import BackButton from './BackButton'; // 戻るボタンをインポート
import categoriesData from '../data/categories';
import '../style.css';
import './Button.css';
import CalendarPage from '../components/CalendarPage';

function App() {
  // 初期データをローカルストレージから取得
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('categories');
    return savedCategories ? JSON.parse(savedCategories) : categoriesData;
  });

  // categoriesが変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  return (
    <Router>
      <div>
        <h1>MEMO</h1>

        {/* 戻るボタンを常にレンダリングし、ルートごとに表示を制御 */}
        <BackButton />
        <div>
          <nav className="nav-buttons">
            <Link to="/calendar" className="nav-button">カレンダー</Link>
          </nav>
          <Routes>
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </div>

        <Routes>
          {/* 種類一覧 */}
          <Route
            path="/"
            element={
              <CategoryList categories={categories} setCategories={setCategories} />
            }
          />

          {/* 各種類のメモページ */}
          <Route
            path="/category/:id"
            element={<MemoPage categories={categories} setCategories={setCategories} />}
          />

          {/* 種類編集ページ */}
          <Route
            path="/edit-category/:id"
            element={<EditCategory categories={categories} setCategories={setCategories} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

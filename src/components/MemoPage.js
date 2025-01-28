import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../style.css';

function MemoPage({ categories, setCategories }) {
  const { id } = useParams();
  const category = categories.find((cat) => cat.id === parseInt(id));

  // 初期化用のstate
  const [memos, setMemos] = useState([]);
  const [newMemo, setNewMemo] = useState('');
  const [selectedMemos, setSelectedMemos] = useState([]);

  // 初期化時にカテゴリのメモをstateに同期
  useEffect(() => {
    if (category) {
      setMemos(category.memos || []);
    }
  }, [category]);

  // メモのソート関数
  const sortMemosByAlphabet = (memos) => {
    return [...memos].sort((a, b) => a.text.localeCompare(b.text, 'ja'));
  };

  const addMemo = () => {
    if (newMemo.trim() !== '') {
      const updatedMemos = [...memos, { id: Date.now(), text: newMemo, checked: false }];
      const sortedMemos = sortMemosByAlphabet(updatedMemos);
      setMemos(sortedMemos);
      updateCategoryMemos(sortedMemos);
      setNewMemo('');
    }
  };

  const deleteSelectedMemos = () => {
    const updatedMemos = memos.filter((memo) => !selectedMemos.includes(memo.id));
    setMemos(updatedMemos);
    updateCategoryMemos(updatedMemos);
    setSelectedMemos([]);
  };

  const updateCategoryMemos = (updatedMemos) => {
    const updatedCategories = categories.map((cat) =>
      cat.id === category.id ? { ...cat, memos: updatedMemos } : cat
    );
    setCategories(updatedCategories);
  };

  const toggleMemoCheck = (id) => {
    const updatedMemos = memos.map((memo) =>
      memo.id === id ? { ...memo, checked: !memo.checked } : memo
    );
    setMemos(updatedMemos);
    updateCategoryMemos(updatedMemos);
  };

  const toggleSelectMemo = (id) => {
    setSelectedMemos((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  // UIを分岐して表示
  if (!category) {
    return <p>カテゴリが見つかりません。URLを確認してください。</p>;
  }

  return (
    <div className="App">
      <h1>{category.name}</h1>
      <ul>
        {memos.filter((memo) => !memo.checked).map((memo) => (
          <li key={memo.id}>
            <input
              type="checkbox"
              className="checkbox"
              checked={selectedMemos.includes(memo.id)}
              onChange={() => toggleSelectMemo(memo.id)}
            />
            {memo.text}
            <button onClick={() => toggleMemoCheck(memo.id)}>済</button>
          </li>
        ))}
      </ul>

      <div className='memo-completion'>
        <h2>済み</h2>
        <ul>
          {memos.filter((memo) => memo.checked).map((memo) => (
            <li key={memo.id}>
              <input
                type="checkbox"
                className="checkbox"
                checked={selectedMemos.includes(memo.id)}
                onChange={() => toggleSelectMemo(memo.id)}
              />
              {memo.text}
              <button onClick={() => toggleMemoCheck(memo.id)}>戻す</button>
            </li>
          ))}
        </ul>
      </div>

      <input
        type="text"
        value={newMemo}
        onChange={(e) => setNewMemo(e.target.value)}
        placeholder="新しいメモを追加"
      />
      <div>
        <button onClick={addMemo} disabled={newMemo.trim() === ''}>
          追加
        </button>
        <button onClick={deleteSelectedMemos} disabled={selectedMemos.length === 0}>
          選択して削除
        </button>
      </div>
    </div>
  );
}

export default MemoPage;

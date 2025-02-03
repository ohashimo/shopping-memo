import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../style.css';

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [memos, setMemos] = useState({});

  // 初期データをローカルストレージから取得
  useEffect(() => {
    const savedMemos = localStorage.getItem('memos');
    if (savedMemos) {
      setMemos(JSON.parse(savedMemos));
    }
  }, []);

  // メモをローカルストレージに保存
  const saveMemosToLocalStorage = (updatedMemos) => {
    localStorage.setItem('memos', JSON.stringify(updatedMemos));
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  // 空白メモの追加を防止
  const addMemo = (memo) => {
    if (memo.trim() === '') return;
    const dateString = date.toDateString();
    const updatedMemos = {
      ...memos,
      [dateString]: [...(memos[dateString] || []), memo],
    };
    setMemos(updatedMemos);
    saveMemosToLocalStorage(updatedMemos); // ローカルストレージに保存
  };


  return (
    <div className="calendar-page">
      <h1>カレンダー</h1>
      <Calendar onChange={handleDateChange} value={date} />
      <MemoSection date={date} memos={memos} onAddMemo={addMemo} />
    </div>
  );
}

function MemoSection({ date, memos, onAddMemo }) {
  const [newMemo, setNewMemo] = useState('');

  const handleAddMemo = () => {
    if (newMemo.trim() !== '') {
      onAddMemo(newMemo);
      setNewMemo('');
    }
  };

  return (
    <div className="memo-section">
      <ul>
        {(memos[date.toDateString()] || []).map((memo, index) => (
          <li key={index}>{memo}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newMemo}
        onChange={(e) => setNewMemo(e.target.value)}
        placeholder="メモを追加"
      />
      <button onClick={handleAddMemo}>追加</button>
    </div>
  );
}

export default CalendarPage;

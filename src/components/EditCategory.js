import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../style.css';

function EditCategory({ categories, setCategories }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const category = categories.find((cat) => cat.id === parseInt(id));
  const [newName, setNewName] = useState(category.name);

  const saveCategory = () => {
    const updatedCategories = categories.map((cat) =>
      cat.id === category.id ? { ...cat, name: newName } : cat
    );
    setCategories(updatedCategories);
    navigate('/');
  };

  return (
    <div className="App">
      <h1>種類名を編集</h1>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={saveCategory}>保存</button>
      <br />
      <button onClick={() => navigate('/')}>キャンセル</button>
    </div>
  );
}

export default EditCategory;

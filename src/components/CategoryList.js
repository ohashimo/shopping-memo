import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit } from 'react-icons/fa';
import '../style.css';

function CategoryList({ categories, setCategories }) {
  const [newCategory, setNewCategory] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedCategories, setEditedCategories] = useState(categories);

  const addCategory = () => {
    if (newCategory.trim() !== '') {
      const newId = categories.length > 0 ? Math.max(...categories.map((c) => c.id)) + 1 : 1;
      const updatedCategories = [...categories, { id: newId, name: newCategory, memos: [] }];
      setCategories(updatedCategories);
      setEditedCategories(updatedCategories);
      setNewCategory('');
    }
  };

  const handleEditChange = (id, newName) => {
    const updatedCategories = editedCategories.map((category) =>
      category.id === id ? { ...category, name: newName } : category
    );
    setEditedCategories(updatedCategories);
  };

  const saveChanges = () => {
    const invalidCategory = editedCategories.find((category) => !category.name.trim());
    if (invalidCategory) {
      alert('空の名前のカテゴリは保存できません。');
      return;
    }
    setCategories(editedCategories);
    setEditMode(false);
  };

  return (
    <div className="App">
      <h1>種類一覧</h1>
      <ul>
        {editedCategories.map((category) => (
          <li key={category.id}>
            {editMode ? (
              <input
                type="text"
                value={category.name}
                onChange={(e) => handleEditChange(category.id, e.target.value)}
              />
            ) : (
              <Link to={`/category/${category.id}`} className="categoryLink">
                {category.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <div className="button-container">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="新しいカテゴリ名を入力"
        />
        <button onClick={addCategory} className="link-button">
          <FaPlus /> 追加
        </button>
        {editMode ? (
          <button onClick={saveChanges} className="link-button">
            変更を保存
          </button>
        ) : (
          <button onClick={() => setEditMode(true)} className="link-button">
            <FaEdit /> 編集
          </button>
        )}
      </div>
    </div>
  );
}

export default CategoryList;
